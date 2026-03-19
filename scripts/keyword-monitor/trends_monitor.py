"""
FreeAIKit Growth Engine — Google Trends Rising Keywords Monitor

Uses DataForSEO API for reliable Google Trends rising query data.
No rate limiting, no IP blocking, ~1 second per query.

Usage:
    python trends_monitor.py [--batch N] [--limit N] [--dry-run]
"""

import json
import os
import sys
from datetime import datetime, timezone

from config import DATA_DIR, EXISTING_KEYWORDS, KEYWORD_ROOTS, TREND_PREFIXES, get_batch_roots
from dataforseo_client import check_credentials, get_rising_queries

os.makedirs(DATA_DIR, exist_ok=True)


def fetch_all_rising(roots, prefixes):
    """Fetch rising keywords from DataForSEO for all root+prefix combos."""
    if not check_credentials():
        print("ERROR: DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD must be set")
        return [], ["Missing DataForSEO credentials"]

    results = []
    errors = []
    total = len(roots) * len(prefixes)
    count = 0

    for root in roots:
        for prefix in prefixes:
            kw = f"{prefix} {root}"
            count += 1
            print(f"[{count}/{total}] Querying: {kw}")

            try:
                rising = get_rising_queries(kw)
                for entry in rising:
                    query = entry["query"].lower().strip()
                    value = entry["value"]
                    if isinstance(value, str) and value.lower() == "breakout":
                        value = 99999
                    else:
                        value = int(value) if value else 0

                    already_have = any(
                        ek in query or query in ek
                        for ek in EXISTING_KEYWORDS
                    )

                    suggested_slug = (
                        query.replace("ai ", "")
                        .replace("free ", "")
                        .replace("online ", "")
                        .replace(" tool", "")
                        .strip()
                        .replace(" ", "-")
                    )

                    results.append({
                        "keyword": query,
                        "root": root,
                        "prefix": prefix,
                        "trend_score": value,
                        "source": "google_trends_rising",
                        "discovered": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                        "already_have": already_have,
                        "suggested_slug": suggested_slug,
                    })

                if rising:
                    print(f"  Found {len(rising)} rising queries")
                else:
                    print(f"  No rising queries")

            except Exception as e:
                error_msg = f"Error for '{kw}': {str(e)}"
                print(f"  FAILED: {error_msg}")
                errors.append(error_msg)

    return results, errors


def deduplicate(results):
    """Remove duplicate keywords, keep highest trend_score."""
    seen = {}
    for item in results:
        kw = item["keyword"]
        if kw not in seen or item["trend_score"] > seen[kw]["trend_score"]:
            seen[kw] = item
    return sorted(seen.values(), key=lambda x: x["trend_score"], reverse=True)


def main():
    dry_run = "--dry-run" in sys.argv

    batch_index = None
    for i, arg in enumerate(sys.argv):
        if arg == "--batch" and i + 1 < len(sys.argv):
            batch_index = int(sys.argv[i + 1])

    limit = None
    for i, arg in enumerate(sys.argv):
        if arg == "--limit" and i + 1 < len(sys.argv):
            limit = int(sys.argv[i + 1])

    if batch_index is not None:
        roots = get_batch_roots(batch_index)
    else:
        roots = KEYWORD_ROOTS

    if limit:
        roots = roots[:limit]

    print(f"=== {'BATCH ' + str(batch_index) if batch_index is not None else 'FULL'} MODE: {len(roots)} roots ===")

    if dry_run:
        print(f"Would query {len(roots)} roots × {len(TREND_PREFIXES)} prefixes = {len(roots) * len(TREND_PREFIXES)} combos")
        return

    print(f"Starting Google Trends monitor at {datetime.now(timezone.utc).isoformat()}")
    print(f"Roots: {len(roots)}, Prefixes: {len(TREND_PREFIXES)}")
    total_queries = len(roots) * len(TREND_PREFIXES)
    print(f"Total queries: {total_queries} (est. cost: ${total_queries * 0.001:.3f})")
    print()

    results, errors = fetch_all_rising(roots, TREND_PREFIXES)
    deduped = deduplicate(results)

    new_opportunities = [r for r in deduped if not r["already_have"]]
    existing_matches = [r for r in deduped if r["already_have"]]

    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    output_path = os.path.join(DATA_DIR, f"trends_{date_str}.json")

    # In batch mode, merge with existing day's data
    prev_opps = []
    prev_existing = []
    prev_errors = []
    if batch_index is not None and os.path.exists(output_path):
        with open(output_path, "r", encoding="utf-8") as f:
            prev = json.load(f)
            prev_opps = prev.get("opportunities", [])
            prev_existing = prev.get("existing", [])
            prev_errors = prev.get("error_log", [])

    merged_opps = {o["keyword"]: o for o in prev_opps}
    for o in new_opportunities:
        if o["keyword"] not in merged_opps or o["trend_score"] > merged_opps[o["keyword"]].get("trend_score", 0):
            merged_opps[o["keyword"]] = o
    merged_opps = sorted(merged_opps.values(), key=lambda x: x.get("trend_score", 0), reverse=True)

    merged_existing = {o["keyword"]: o for o in prev_existing}
    for o in existing_matches:
        merged_existing[o["keyword"]] = o

    merged_errors = prev_errors + errors

    report = {
        "date": date_str,
        "batch": batch_index,
        "total_rising_found": len(merged_opps) + len(merged_existing),
        "new_opportunities": len(merged_opps),
        "existing_matches": len(merged_existing),
        "errors": len(merged_errors),
        "opportunities": merged_opps[:100],
        "existing": list(merged_existing.values())[:20],
        "error_log": merged_errors[:20],
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print(f"\n=== RESULTS ===")
    print(f"Total rising keywords: {len(deduped)}")
    print(f"New opportunities: {len(new_opportunities)}")
    print(f"Already have: {len(existing_matches)}")
    print(f"Errors: {len(errors)}")
    print(f"Saved to: {output_path}")

    print(f"\n=== TOP 20 NEW OPPORTUNITIES ===")
    for i, opp in enumerate(new_opportunities[:20], 1):
        score = "BREAKOUT" if opp["trend_score"] == 99999 else str(opp["trend_score"])
        print(f"{i:2d}. [{score:>8s}] {opp['keyword']} → /{opp['suggested_slug']}")


if __name__ == "__main__":
    main()
