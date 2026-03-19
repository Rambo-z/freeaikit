"""
FreeAIKit Growth Engine — Opportunity Report Generator

Merges Google Trends + Google Suggest data into a unified opportunity report.
Deduplicates, ranks, and generates both JSON and Markdown output.

Usage:
    python report_generator.py [--date 2026-03-19]
"""

import json
import os
import sys
from datetime import datetime, timezone

from config import DATA_DIR, DIFFICULTY_RULES, EXISTING_SLUGS, TOOL_SIGNAL_WORDS

os.makedirs(DATA_DIR, exist_ok=True)


def load_json(path):
    """Load JSON file, return empty dict if not found."""
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def merge_opportunities(trends_data, suggest_data):
    """Merge trends and suggest data, deduplicate, rank."""
    all_keywords = {}

    # Process trends data
    for item in trends_data.get("opportunities", []):
        kw = item["keyword"]
        if kw not in all_keywords:
            all_keywords[kw] = {
                "keyword": kw,
                "sources": [],
                "trend_score": 0,
                "suggested_slug": item.get("suggested_slug", ""),
                "root": item.get("root", ""),
                "already_have": item.get("already_have", False),
            }
        all_keywords[kw]["sources"].append("trends_rising")
        all_keywords[kw]["trend_score"] = max(
            all_keywords[kw]["trend_score"],
            item.get("trend_score", 0),
        )

    # Process suggest data
    for item in suggest_data.get("opportunities", []):
        kw = item["keyword"]
        if kw not in all_keywords:
            all_keywords[kw] = {
                "keyword": kw,
                "sources": [],
                "trend_score": 0,
                "suggested_slug": item.get("suggested_slug", ""),
                "root": item.get("root", ""),
                "already_have": item.get("already_have", False),
            }
        if "suggest" not in all_keywords[kw]["sources"]:
            all_keywords[kw]["sources"].append("suggest")

    # Filter out already-have and existing slugs
    opportunities = []
    for kw, data in all_keywords.items():
        if data["already_have"]:
            continue
        if data["suggested_slug"] in EXISTING_SLUGS:
            continue
        # Smart scoring
        kw_lower = kw.lower()
        score = data["trend_score"]

        # +50 for each tool-signal word in the keyword
        tool_hits = sum(1 for w in TOOL_SIGNAL_WORDS if w in kw_lower)
        score += tool_hits * 50

        # +30 for containing "free" or "online" (high commercial intent)
        if "free" in kw_lower:
            score += 30
        if "online" in kw_lower:
            score += 30

        # +200 bonus if found in both Trends and Suggest
        if len(data["sources"]) > 1:
            score += 200

        # Shorter keywords tend to have higher search volume
        word_count = len(kw.split())
        if word_count <= 3:
            score += 40
        elif word_count <= 4:
            score += 20

        data["combined_score"] = score

        # Auto-estimate difficulty
        difficulty = ""
        for keywords_list, level in DIFFICULTY_RULES:
            if any(dk in kw_lower for dk in keywords_list):
                difficulty = level
                break
        data["difficulty"] = difficulty

        opportunities.append(data)

    # Sort by combined score
    opportunities.sort(key=lambda x: x["combined_score"], reverse=True)
    return opportunities


def generate_markdown(opportunities, date_str, stats):
    """Generate Markdown report."""
    lines = [
        f"# FreeAIKit Keyword Opportunity Report — {date_str}",
        "",
        f"**Generated:** {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        f"**Trends keywords found:** {stats['trends_total']}",
        f"**Suggest keywords found:** {stats['suggest_total']}",
        f"**New opportunities (after dedup):** {len(opportunities)}",
        "",
        "---",
        "",
        "## Top 30 Opportunities",
        "",
        "| # | Score | Keyword | Suggested Slug | Sources | Root |",
        "|---|-------|---------|---------------|---------|------|",
    ]

    for i, opp in enumerate(opportunities[:30], 1):
        score = "BREAKOUT" if opp["trend_score"] == 99999 else str(opp["combined_score"])
        sources = " + ".join(opp["sources"])
        lines.append(
            f"| {i} | {score} | {opp['keyword']} | /{opp['suggested_slug']} | {sources} | {opp['root']} |"
        )

    lines.extend([
        "",
        "---",
        "",
        "## Implementation Difficulty Estimate",
        "",
        "| Difficulty | Criteria |",
        "|-----------|----------|",
        "| Easy (pure frontend) | Text tools, converters, generators |",
        "| Medium (WASM) | Image/PDF processing, needs WASM library |",
        "| Hard (needs API) | Requires external API calls, has cost |",
        "",
        "---",
        "",
        "## Full Opportunity List",
        "",
    ])

    for i, opp in enumerate(opportunities[:100], 1):
        score = "BREAKOUT" if opp["trend_score"] == 99999 else str(opp["combined_score"])
        lines.append(f"{i}. **{opp['keyword']}** (score: {score}) → `/{opp['suggested_slug']}`")

    return "\n".join(lines)


def main():
    # Determine date
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    for i, arg in enumerate(sys.argv):
        if arg == "--date" and i + 1 < len(sys.argv):
            date_str = sys.argv[i + 1]

    print(f"Generating report for {date_str}")

    # Load data files
    trends_path = os.path.join(DATA_DIR, f"trends_{date_str}.json")
    suggest_path = os.path.join(DATA_DIR, f"suggest_{date_str}.json")

    trends_data = load_json(trends_path)
    suggest_data = load_json(suggest_path)

    if not trends_data and not suggest_data:
        print(f"No data files found for {date_str}")
        print(f"  Looked for: {trends_path}")
        print(f"  Looked for: {suggest_path}")
        sys.exit(1)

    stats = {
        "trends_total": trends_data.get("total_rising_found", 0),
        "suggest_total": suggest_data.get("total_suggestions", 0),
    }

    # Merge and rank
    opportunities = merge_opportunities(trends_data, suggest_data)

    # Save JSON report
    report_json_path = os.path.join(DATA_DIR, f"report_{date_str}.json")
    report = {
        "date": date_str,
        "stats": stats,
        "total_opportunities": len(opportunities),
        "top_50": opportunities[:50],
    }
    with open(report_json_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    # Save Markdown report
    report_md_path = os.path.join(DATA_DIR, f"report_{date_str}.md")
    markdown = generate_markdown(opportunities, date_str, stats)
    with open(report_md_path, "w", encoding="utf-8") as f:
        f.write(markdown)

    print(f"\n=== REPORT GENERATED ===")
    print(f"Total opportunities: {len(opportunities)}")
    print(f"JSON: {report_json_path}")
    print(f"Markdown: {report_md_path}")

    # Print top 20 for console
    print(f"\n=== TOP 20 ===")
    for i, opp in enumerate(opportunities[:20], 1):
        score = "BREAKOUT" if opp["trend_score"] == 99999 else str(opp["combined_score"])
        print(f"{i:2d}. [{score:>8s}] {opp['keyword']} → /{opp['suggested_slug']}")

    # Sync to Feishu Bitable (if credentials are configured)
    if os.environ.get("FEISHU_APP_ID") and os.environ.get("FEISHU_APP_SECRET"):
        try:
            from feishu_bitable import sync_opportunities
            # Add discovered date to each opportunity for Bitable
            for opp in opportunities:
                if "discovered" not in opp:
                    opp["discovered"] = date_str
            sync_opportunities(opportunities[:50])
        except Exception as e:
            print(f"WARNING: Bitable sync failed: {e}")
    else:
        print("\nSkipping Bitable sync (FEISHU_APP_ID/SECRET not set)")

    # Return top 20 for notification script
    return opportunities[:20]


if __name__ == "__main__":
    main()
