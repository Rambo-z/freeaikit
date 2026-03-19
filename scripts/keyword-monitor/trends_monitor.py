"""
FreeAIKit Growth Engine — Google Trends Rising Keywords Monitor

Scans 122 keyword roots with prefixes via pytrends,
collects Rising (飙升) queries, outputs JSON report.

Usage:
    python trends_monitor.py [--dry-run]
"""

import json
import os
import random
import sys
import time
from datetime import datetime, timezone

from config import DATA_DIR, EXISTING_KEYWORDS, KEYWORD_ROOTS, TREND_PREFIXES

# Ensure data dir exists
os.makedirs(DATA_DIR, exist_ok=True)


def get_rising_keywords():
    """Fetch rising keywords from Google Trends for all root+prefix combos."""
    try:
        from pytrends.request import TrendReq
    except ImportError:
        print("ERROR: pytrends not installed. Run: pip install pytrends")
        sys.exit(1)

    pytrends = TrendReq(hl="en-US", tz=360, timeout=(10, 30))
    results = []
    errors = []
    total = len(KEYWORD_ROOTS) * len(TREND_PREFIXES)
    count = 0

    for root in KEYWORD_ROOTS:
        for prefix in TREND_PREFIXES:
            kw = f"{prefix} {root}"
            count += 1
            print(f"[{count}/{total}] Querying: {kw}")

            retries = 0
            max_retries = 3
            while retries <= max_retries:
                try:
                    pytrends.build_payload([kw], timeframe="now 7-d")
                    related = pytrends.related_queries()
                    break
                except Exception as retry_err:
                    retries += 1
                    if retries > max_retries:
                        error_msg = f"Error for '{kw}' after {max_retries} retries: {str(retry_err)}"
                        print(f"  FAILED: {error_msg}")
                        errors.append(error_msg)
                        related = {}
                        break
                    wait = 60 * retries  # 60s, 120s, 180s
                    print(f"  Rate limited, retry {retries}/{max_retries} in {wait}s...")
                    time.sleep(wait)

            try:
                if kw in related and related[kw]["rising"] is not None:
                    rising_df = related[kw]["rising"]
                    for _, row in rising_df.iterrows():
                        query = row["query"].lower().strip()
                        value = int(row["value"]) if row["value"] != "Breakout" else 99999

                        # Check if this keyword relates to an existing tool
                        already_have = any(
                            ek in query or query in ek
                            for ek in EXISTING_KEYWORDS
                        )

                        # Generate suggested slug
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

            except Exception as e:
                error_msg = f"Error processing results for '{kw}': {str(e)}"
                print(f"  WARNING: {error_msg}")
                errors.append(error_msg)

            # Rate limiting: longer sleep to avoid 429
            sleep_time = random.uniform(20, 35)
            print(f"  Sleeping {sleep_time:.1f}s...")
            time.sleep(sleep_time)

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

    if dry_run:
        print("=== DRY RUN MODE ===")
        print(f"Would query {len(KEYWORD_ROOTS)} roots × {len(TREND_PREFIXES)} prefixes = {len(KEYWORD_ROOTS) * len(TREND_PREFIXES)} combos")
        print(f"Output to: {DATA_DIR}")
        return

    print(f"Starting Google Trends monitor at {datetime.now(timezone.utc).isoformat()}")
    print(f"Roots: {len(KEYWORD_ROOTS)}, Prefixes: {len(TREND_PREFIXES)}")
    print(f"Total queries: {len(KEYWORD_ROOTS) * len(TREND_PREFIXES)}")
    print()

    results, errors = get_rising_keywords()
    deduped = deduplicate(results)

    # Separate new opportunities from existing
    new_opportunities = [r for r in deduped if not r["already_have"]]
    existing_matches = [r for r in deduped if r["already_have"]]

    # Save full results
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    output_path = os.path.join(DATA_DIR, f"trends_{date_str}.json")

    report = {
        "date": date_str,
        "total_rising_found": len(deduped),
        "new_opportunities": len(new_opportunities),
        "existing_matches": len(existing_matches),
        "errors": len(errors),
        "opportunities": new_opportunities[:50],  # Top 50
        "existing": existing_matches[:20],
        "error_log": errors[:20],
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print(f"\n=== RESULTS ===")
    print(f"Total rising keywords: {len(deduped)}")
    print(f"New opportunities: {len(new_opportunities)}")
    print(f"Already have: {len(existing_matches)}")
    print(f"Errors: {len(errors)}")
    print(f"Saved to: {output_path}")

    # Print top 20 new opportunities
    print(f"\n=== TOP 20 NEW OPPORTUNITIES ===")
    for i, opp in enumerate(new_opportunities[:20], 1):
        score = "BREAKOUT" if opp["trend_score"] == 99999 else str(opp["trend_score"])
        print(f"{i:2d}. [{score:>8s}] {opp['keyword']} → /{opp['suggested_slug']}")


if __name__ == "__main__":
    main()
