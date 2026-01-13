from __future__ import annotations

import argparse
import json

from ai_bidding_assistant.core.bootstrap import bootstrap
from ai_bidding_assistant.models import Content
from ai_bidding_assistant.traceability_system.store import JsonlAuditLogStore

from .review import capture_review_decision, present_for_review


def main() -> int:
    """
    Minimal runnable entry point for Task 9 skeleton (human review interface).

    Usage:
      PYTHONPATH=.../src python3 -m ai_bidding_assistant.human_review \
        --content-id <id> --decision approve|reject --comment "optional"

    Behavior:
    - Creates a placeholder Content (no real generation)
    - Presents for review, then applies the requested decision
    - Emits JSON to stdout (ReviewSession)
    - Audit log is written to the provided log file (JSONL)
    """

    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.human_review")
    parser.add_argument("--content-id", required=True, help="Content id to review.")
    parser.add_argument(
        "--decision",
        required=True,
        choices=["approve", "reject", "other"],
        help="Review decision (fail-closed: unknown => requires_human_review).",
    )
    parser.add_argument("--comment", default="", help="Optional reviewer comment.")
    parser.add_argument(
        "--log-file",
        default="./.aiba/review_audit.jsonl",
        help="Append-only JSONL audit log path (default: ./.aiba/review_audit.jsonl).",
    )
    args = parser.parse_args()

    bootstrap()
    store = JsonlAuditLogStore(args.log_file)

    # Placeholder Content (fail-closed, no real text).
    content = Content(
        id=args.content_id,
        type="placeholder",
        text="[REQUIRES HUMAN CONFIRMATION] (Task 9 demo content placeholder)",
        sourceReferences=[],
        generationMetadata={},
        reviewStatus="requires_human_review",
        approvalHistory=[],
    )

    session = present_for_review(content, review_type="content", reviewer={}, store=store)
    decided = capture_review_decision(
        session,
        decision=args.decision,
        reviewer={},
        comment=args.comment,
        store=store,
    )

    # Serialize datetime to ISO for CLI output.
    result = decided.to_dict()
    if "timestamp" in result:
        ts = result["timestamp"]
        if hasattr(ts, "isoformat"):
            result["timestamp"] = ts.isoformat()

    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

