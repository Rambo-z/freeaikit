"""
FreeAIKit Growth Engine — DataForSEO API Client

Replaces pytrends with DataForSEO for reliable Google Trends data
and adds search volume lookup.

Environment variables:
    DATAFORSEO_LOGIN    — DataForSEO account email
    DATAFORSEO_PASSWORD — DataForSEO account password
"""

import base64
import json
import os
import urllib.request

DATAFORSEO_LOGIN = os.environ.get("DATAFORSEO_LOGIN", "")
DATAFORSEO_PASSWORD = os.environ.get("DATAFORSEO_PASSWORD", "")
BASE_URL = "https://api.dataforseo.com/v3"


def _auth_header():
    """Build Basic Auth header."""
    creds = f"{DATAFORSEO_LOGIN}:{DATAFORSEO_PASSWORD}"
    encoded = base64.b64encode(creds.encode()).decode()
    return f"Basic {encoded}"


def _post(endpoint, payload):
    """Make authenticated POST request to DataForSEO."""
    url = f"{BASE_URL}{endpoint}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={
        "Authorization": _auth_header(),
        "Content-Type": "application/json",
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"  DataForSEO API error: {e}")
        return None


def get_rising_queries(keyword, location_code=2840, language_code="en"):
    """Get Google Trends rising queries for a keyword.

    Returns list of {"query": str, "value": int} dicts.
    Cost: ~$0.009 per call.
    """
    result = _post("/keywords_data/google_trends/explore/live", [
        {
            "keywords": [keyword],
            "location_code": location_code,
            "language_code": language_code,
            "type": "web",
            "time_range": "past_12_months",
            "item_types": ["google_trends_queries_list"],
        }
    ])

    if not result or result.get("status_code") != 20000:
        msg = result.get("status_message", "unknown") if result else "no response"
        print(f"  Trends API error: {msg}")
        return []

    rising = []
    try:
        tasks = result.get("tasks", [])
        for task in tasks:
            if task.get("status_code") != 20000:
                continue
            for res in task.get("result", []):
                for item in res.get("items", []):
                    if item.get("type") != "google_trends_queries_list":
                        continue
                    data = item.get("data", {})
                    for entry in data.get("rising", []):
                        rising.append({
                            "query": entry.get("query", ""),
                            "value": entry.get("value", 0),
                        })
    except Exception as e:
        print(f"  Error parsing trends response: {e}")

    return rising


def get_search_volume(keywords, location_code=2840, language_code="en"):
    """Get Google Ads search volume for a batch of keywords.

    Accepts up to 1000 keywords per call.
    Cost: ~$0.05 per 1000 keywords.

    Returns dict: {keyword: {"volume": int, "cpc": float, "competition": str}}
    """
    if not keywords:
        return {}

    result = _post("/keywords_data/google_ads/search_volume/live", [
        {
            "keywords": keywords,
            "location_code": location_code,
            "language_code": language_code,
        }
    ])

    if not result or result.get("status_code") != 20000:
        msg = result.get("status_message", "unknown") if result else "no response"
        print(f"  Search volume API error: {msg}")
        return {}

    volumes = {}
    try:
        tasks = result.get("tasks", [])
        for task in tasks:
            for item in task.get("result", []):
                kw = item.get("keyword", "")
                vol = item.get("search_volume") or 0
                cpc = item.get("cpc") or 0
                # competition can be a string like "LOW"/"MEDIUM"/"HIGH" or a number
                comp_raw = item.get("competition")
                if isinstance(comp_raw, str):
                    comp = {"LOW": 0.2, "MEDIUM": 0.5, "HIGH": 0.8}.get(comp_raw.upper(), 0)
                else:
                    comp = comp_raw or 0
                volumes[kw.lower()] = {
                    "volume": vol,
                    "cpc": round(cpc, 2) if isinstance(cpc, float) else cpc,
                    "competition": comp,
                }
    except Exception as e:
        print(f"  Error parsing volume response: {e}")

    return volumes


def check_credentials():
    """Verify DataForSEO credentials are set."""
    if not DATAFORSEO_LOGIN or not DATAFORSEO_PASSWORD:
        return False
    return True
