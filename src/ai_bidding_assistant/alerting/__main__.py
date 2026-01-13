from __future__ import annotations

import argparse
import json

from .notifier import build_alert, send_alert


def main() -> int:
    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.alerting")
    parser.add_argument("--message", required=True, help="Alert message.")
    parser.add_argument("--severity", default="critical", help="Severity (placeholder).")
    parser.add_argument("--log-file", default="./.aiba/alerts.jsonl", help="Alert log path.")
    args = parser.parse_args()

    alert = build_alert(message=args.message, severity=args.severity, source={"cli": True})
    result = send_alert(alert, path=args.log_file)
    print(json.dumps(result.to_dict(), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

