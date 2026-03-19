"""
FreeAIKit Growth Engine — Feishu Bitable Integration

Writes keyword opportunities to Feishu Bitable (多维表格).
Used by report_generator.py to sync results to the shared table.

Environment variables:
    FEISHU_APP_ID       — Feishu app ID
    FEISHU_APP_SECRET   — Feishu app secret
    FEISHU_BITABLE_APP  — Bitable app_token (default: JEAMbCEtQaXV6KsGLI9cOgfynpe)
    FEISHU_BITABLE_TABLE — Table ID (default: tbl9yk0J67xFBJ2N)
"""

import json
import os
import sys
import time
import urllib.request
from datetime import datetime, timezone

# Bitable config
BITABLE_APP = os.environ.get("FEISHU_BITABLE_APP", "JEAMbCEtQaXV6KsGLI9cOgfynpe")
BITABLE_TABLE = os.environ.get("FEISHU_BITABLE_TABLE", "tbl9yk0J67xFBJ2N")
FEISHU_APP_ID = os.environ.get("FEISHU_APP_ID", "")
FEISHU_APP_SECRET = os.environ.get("FEISHU_APP_SECRET", "")

BASE_URL = "https://open.feishu.cn/open-apis"


def get_tenant_access_token():
    """Get Feishu tenant access token."""
    if not FEISHU_APP_ID or not FEISHU_APP_SECRET:
        print("ERROR: FEISHU_APP_ID and FEISHU_APP_SECRET must be set")
        return None

    url = f"{BASE_URL}/auth/v3/tenant_access_token/internal"
    payload = json.dumps({
        "app_id": FEISHU_APP_ID,
        "app_secret": FEISHU_APP_SECRET,
    }).encode("utf-8")

    req = urllib.request.Request(url, data=payload, headers={
        "Content-Type": "application/json",
    })

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("code") == 0:
                return data["tenant_access_token"]
            else:
                print(f"Token error: {data}")
    except Exception as e:
        print(f"Error getting token: {e}")
    return None


def search_existing_keywords(token):
    """Get all existing keywords in the table to avoid duplicates."""
    url = f"{BASE_URL}/bitable/v1/apps/{BITABLE_APP}/tables/{BITABLE_TABLE}/records/search"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    existing = set()
    page_token = None

    while True:
        payload = {"page_size": 500}
        if page_token:
            payload["page_token"] = page_token

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST",
        )

        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                if data.get("code") == 0:
                    items = data.get("data", {}).get("items", [])
                    for item in items:
                        kw = item.get("fields", {}).get("\u5173\u952e\u8bcd", "")
                        if kw:
                            existing.add(kw.lower())

                    if data.get("data", {}).get("has_more"):
                        page_token = data["data"]["page_token"]
                    else:
                        break
                else:
                    print(f"Search error: {data.get('msg')}")
                    break
        except Exception as e:
            print(f"Error searching records: {e}")
            break

    return existing


def create_record(token, opportunity):
    """Create a single record in Bitable."""
    url = f"{BASE_URL}/bitable/v1/apps/{BITABLE_APP}/tables/{BITABLE_TABLE}/records"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    # Map source
    sources = opportunity.get("sources", [])
    if "trends_rising" in sources and "suggest" in sources:
        source = "Trends + Suggest"
    elif "trends_rising" in sources:
        source = "Trends Rising"
    else:
        source = "Google Suggest"

    # Convert date to millisecond timestamp
    date_str = opportunity.get("discovered", datetime.now(timezone.utc).strftime("%Y-%m-%d"))
    try:
        dt = datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
        date_ms = int(dt.timestamp() * 1000)
    except Exception:
        date_ms = int(datetime.now(timezone.utc).timestamp() * 1000)

    score = opportunity.get("combined_score", opportunity.get("trend_score", 0))

    fields = {
        "\u5173\u952e\u8bcd": opportunity["keyword"],
        "\u5206\u6570": score,
        "\u6765\u6e90": source,
        "\u8bcd\u6839": opportunity.get("root", ""),
        "\u5efa\u8baeSlug": opportunity.get("suggested_slug", ""),
        "\u72b6\u6001": "\u5f85\u8bc4\u4f30",
        "\u53d1\u73b0\u65e5\u671f": date_ms,
    }

    # Add difficulty if estimated
    difficulty = opportunity.get("difficulty", "")
    if difficulty:
        fields["\u96be\u5ea6"] = difficulty

    payload = json.dumps({"fields": fields}).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers=headers)

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("code") == 0:
                return True
            else:
                print(f"  Create error: {data.get('msg')}")
    except Exception as e:
        print(f"  Error creating record: {e}")
    return False


def sync_opportunities(opportunities, max_records=50):
    """Sync opportunities to Feishu Bitable, skip duplicates."""
    print(f"\n=== Syncing to Feishu Bitable ===")
    print(f"App: {BITABLE_APP}, Table: {BITABLE_TABLE}")

    # Get access token
    token = get_tenant_access_token()
    if not token:
        print("Failed to get access token. Skipping Bitable sync.")
        return 0

    # Get existing keywords to avoid duplicates
    print("Fetching existing keywords...")
    existing = search_existing_keywords(token)
    print(f"Found {len(existing)} existing keywords in table")

    # Filter new opportunities
    new_opps = [
        opp for opp in opportunities
        if opp["keyword"].lower() not in existing
    ]
    print(f"New opportunities to add: {len(new_opps)} (of {len(opportunities)} total)")

    # Create records (limit to max_records per run)
    created = 0
    for opp in new_opps[:max_records]:
        if create_record(token, opp):
            created += 1
            print(f"  Added: {opp['keyword']} (score: {opp.get('combined_score', opp.get('trend_score', 0))})")
        time.sleep(0.3)  # Rate limit

    print(f"\n=== Bitable sync complete: {created} new records added ===")
    return created


if __name__ == "__main__":
    # Test with sample data
    test_opps = [
        {
            "keyword": "test keyword tool",
            "sources": ["google_suggest"],
            "trend_score": 100,
            "combined_score": 200,
            "root": "test",
            "suggested_slug": "test-keyword",
            "discovered": "2026-03-19",
        }
    ]
    sync_opportunities(test_opps)
