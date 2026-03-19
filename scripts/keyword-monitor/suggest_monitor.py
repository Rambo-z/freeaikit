"""
FreeAIKit Growth Engine — Google Suggest (Autocomplete) Monitor

Queries Google Suggest API for 122 keyword roots × 4 patterns,
collects autocomplete suggestions, outputs JSON report.

No API key needed. Free and unlimited (with rate limiting).

Usage:
    python suggest_monitor.py [--dry-run]
"""

import json
import os
import random
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone

from config import (
    DATA_DIR,
    EXISTING_KEYWORDS,
    KEYWORD_ROOTS,
    SUGGEST_PATTERNS,
    get_batch_roots,
)

os.makedirs(DATA_DIR, exist_ok=True)

SUGGEST_URL = "https://suggestqueries.google.com/complete/search?client=firefox&q={query}&hl=en"


def fetch_suggestions(query):
    """Fetch Google autocomplete suggestions for a query."""
    url = SUGGEST_URL.format(query=urllib.parse.quote(query))
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    req = urllib.request.Request(url, headers=headers)

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            # Response format: [query, [suggestions]]
            if isinstance(data, list) and len(data) >= 2:
                return data[1]
    except Exception as e:
        print(f"  Error fetching suggestions for '{query}': {e}")

    return []


def get_suggest_keywords(roots=None):
    """Fetch suggestions for all root × pattern combinations."""
    if roots is None:
        roots = KEYWORD_ROOTS

    results = []
    total = len(roots) * len(SUGGEST_PATTERNS)
    count = 0

    for root in roots:
        for pattern in SUGGEST_PATTERNS:
            query = pattern.format(root=root)
            count += 1
            print(f"[{count}/{total}] Querying: {query}")

            suggestions = fetch_suggestions(query)

            for suggestion in suggestions:
                suggestion_lower = suggestion.lower().strip()

                # Skip if it's just the query itself
                if suggestion_lower == query.lower():
                    continue

                # Check if this relates to existing tools
                already_have = any(
                    ek in suggestion_lower or suggestion_lower in ek
                    for ek in EXISTING_KEYWORDS
                )

                # Generate suggested slug
                suggested_slug = (
                    suggestion_lower
                    .replace("free ", "")
                    .replace("ai ", "")
                    .replace("online ", "")
                    .replace(" tool", "")
                    .replace("best ", "")
                    .strip()
                    .replace(" ", "-")
                )

                results.append({
                    "keyword": suggestion_lower,
                    "root": root,
                    "pattern": pattern,
                    "source": "google_suggest",
                    "discovered": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                    "already_have": already_have,
                    "suggested_slug": suggested_slug,
                })

            # Rate limit: ~1 req/sec
            time.sleep(random.uniform(0.8, 1.5))

    # Also try space tricks from the handbook
    print("\n=== Space tricks (词后空格/词前空格) ===")
    space_roots = random.sample(list(roots), min(len(roots), 10))
    for root in space_roots:
        for query in [f"ai {root} ", f" ai {root}", f"free {root} "]:
            count += 1
            suggestions = fetch_suggestions(query.strip())
            for suggestion in suggestions:
                suggestion_lower = suggestion.lower().strip()
                already_have = any(
                    ek in suggestion_lower for ek in EXISTING_KEYWORDS
                )
                suggested_slug = (
                    suggestion_lower
                    .replace("free ", "").replace("ai ", "")
                    .replace("online ", "").replace(" tool", "")
                    .replace("best ", "").strip().replace(" ", "-")
                )
                results.append({
                    "keyword": suggestion_lower,
                    "root": root,
                    "pattern": "space_trick",
                    "source": "google_suggest",
                    "discovered": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                    "already_have": already_have,
                    "suggested_slug": suggested_slug,
                })
            time.sleep(random.uniform(0.8, 1.5))

    return results


def deduplicate(results):
    """Remove duplicates, keep first occurrence."""
    seen = set()
    unique = []
    for item in results:
        kw = item["keyword"]
        if kw not in seen:
            seen.add(kw)
            unique.append(item)
    return unique


def main():
    dry_run = "--dry-run" in sys.argv

    # Batch mode: --batch N (0-11)
    batch_index = None
    for i, arg in enumerate(sys.argv):
        if arg == "--batch" and i + 1 < len(sys.argv):
            batch_index = int(sys.argv[i + 1])

    # Optional limit: --limit N
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
        queries = len(roots) * len(SUGGEST_PATTERNS)
        print("=== DRY RUN MODE ===")
        print(f"Would query {len(roots)} roots × {len(SUGGEST_PATTERNS)} patterns = {queries} combos")
        print(f"Estimated time: ~{queries} seconds ({queries // 60} minutes)")
        return

    print(f"Starting Google Suggest monitor at {datetime.now(timezone.utc).isoformat()}")
    print(f"Roots: {len(roots)}, Patterns: {len(SUGGEST_PATTERNS)}")
    print()

    results = get_suggest_keywords(roots)
    deduped = deduplicate(results)

    new_opportunities = [r for r in deduped if not r["already_have"]]
    existing_matches = [r for r in deduped if r["already_have"]]

    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    output_path = os.path.join(DATA_DIR, f"suggest_{date_str}.json")

    # In batch mode, merge with existing day's data
    if batch_index is not None and os.path.exists(output_path):
        with open(output_path, "r", encoding="utf-8") as f:
            prev = json.load(f)
        prev_opps = prev.get("opportunities", [])
        prev_existing = prev.get("existing", [])
        # Merge and deduplicate
        all_opps = {o["keyword"]: o for o in prev_opps}
        for o in new_opportunities:
            all_opps[o["keyword"]] = o
        new_opportunities = list(all_opps.values())
        all_existing = {o["keyword"]: o for o in prev_existing}
        for o in existing_matches:
            all_existing[o["keyword"]] = o
        existing_matches = list(all_existing.values())

    report = {
        "date": date_str,
        "batch": batch_index,
        "total_suggestions": len(new_opportunities) + len(existing_matches),
        "new_opportunities": len(new_opportunities),
        "existing_matches": len(existing_matches),
        "opportunities": new_opportunities,
        "existing": existing_matches[:20],
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print(f"\n=== RESULTS ===")
    print(f"Total unique suggestions: {len(deduped)}")
    print(f"New opportunities: {len(new_opportunities)}")
    print(f"Already have: {len(existing_matches)}")
    print(f"Saved to: {output_path}")

    print(f"\n=== SAMPLE NEW OPPORTUNITIES (first 20) ===")
    for i, opp in enumerate(new_opportunities[:20], 1):
        print(f"{i:2d}. {opp['keyword']} → /{opp['suggested_slug']} (from: {opp['pattern']})")


if __name__ == "__main__":
    main()
