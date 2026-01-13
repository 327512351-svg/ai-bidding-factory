from __future__ import annotations

import hashlib
from datetime import datetime, timezone
from typing import Any, Dict, Mapping, Optional

from ai_bidding_assistant.core.constants import REQUIRES_HUMAN_CONFIRMATION_TOKEN
from ai_bidding_assistant.core.error_handling import preserve_work_on_error
from ai_bidding_assistant.core.logging import audit_log
from ai_bidding_assistant.models import Content, ReviewSession, Reviewer
from ai_bidding_assistant.traceability_system.store import JsonlAuditLogStore
from ai_bidding_assistant.traceability_system.system import log_operation

from .types import ApprovalStatus, Decision, ReviewResult, ReviewType

STATUS_REQUIRED = "requires_human_review"
STATUS_APPROVED = "approved"
STATUS_REJECTED = "rejected"
DECISION_PENDING = "pending"


def _deterministic_id(seed: str) -> str:
    return hashlib.sha256(seed.encode("utf-8")).hexdigest()


def _json_safe_session(session: ReviewSession) -> Dict[str, Any]:
    d = dict(session.to_dict())
    ts = d.get("timestamp")
    if isinstance(ts, datetime):
        d["timestamp"] = ts.isoformat()
    return d


def present_for_review(
    content: Content,
    review_type: ReviewType,
    reviewer: Optional[Reviewer] = None,
    *,
    store: Optional[JsonlAuditLogStore] = None,
    comment: Optional[str] = None,
) -> ReviewSession:
    """
    Interface: presentForReview(content: Content, reviewType: ReviewType): ReviewSession

    Task 9 skeleton:
    - Creates a ReviewSession with requires_human_review / pending
    - Fail-closed: no automatic approval
    """

    with preserve_work_on_error(hint="human_review.present_for_review"):
        session = ReviewSession(
            id=_deterministic_id(seed=f"review:{content.id}:{review_type}:{datetime.now(timezone.utc).isoformat()}"),
            content=content,
            reviewer=reviewer or {},
            reviewType=review_type,
            status=STATUS_REQUIRED,
            decision=DECISION_PENDING,
            comments=comment or "",
            timestamp=datetime.now(timezone.utc),
        )

        if store is not None:
            log_operation(
                store=store,
                operation={"name": "present_for_review", "content_id": content.id},
                context={"review_type": review_type},
                actor=session.reviewer,
                outputs=[_json_safe_session(session)],
                rationale="Task 9: review session created (placeholder)",
            )
        audit_log("human_review.present_for_review", fields={"session_id": session.id})
        return session


def capture_review_decision(
    session: ReviewSession,
    decision: Decision,
    reviewer: Optional[Reviewer] = None,
    comment: Optional[str] = None,
    *,
    store: Optional[JsonlAuditLogStore] = None,
) -> ReviewSession:
    """
    Interface: captureReviewDecision(session: ReviewSession, decision: Decision): ReviewResult

    Task 9 skeleton:
    - Fail-closed: unknown decision → requires_human_review + pending
    - Does NOT auto-modify Content.reviewStatus; returns updated ReviewSession only.
    """

    with preserve_work_on_error(hint="human_review.capture_review_decision"):
        normalized = (decision or "").strip().lower()
        if normalized == "approve":
            status = STATUS_APPROVED
            decision_value = "approved"
        elif normalized == "reject":
            status = STATUS_REJECTED
            decision_value = "rejected"
        else:
            status = STATUS_REQUIRED
            decision_value = DECISION_PENDING

        updated = ReviewSession(
            id=session.id,
            content=session.content,
            reviewer=reviewer or session.reviewer,
            reviewType=session.reviewType,
            status=status,
            decision=decision_value,
            comments=comment or "",
            timestamp=datetime.now(timezone.utc),
        )

        if store is not None:
            log_operation(
                store=store,
                operation={
                    "name": "capture_review_decision",
                    "session_id": session.id,
                    "decision": decision_value,
                },
                context={"review_type": session.reviewType},
                actor=updated.reviewer,
                outputs=[_json_safe_session(updated)],
                rationale="Task 9: review decision recorded (placeholder)",
            )
        audit_log(
            "human_review.capture_review_decision",
            fields={"session_id": session.id, "decision": decision_value},
        )
        return updated


def track_approval_status(content: Content) -> ApprovalStatus:
    """
    Interface: trackApprovalStatus(content: Content): ApprovalStatus

    Task 9 skeleton:
    - Returns a minimal status mapping, fail-closed if status is not 'approved'.
    """

    status = getattr(content, "reviewStatus", STATUS_REQUIRED) or STATUS_REQUIRED
    requires = status != STATUS_APPROVED
    return {
        "contentId": content.id,
        "reviewStatus": status,
        "requiresHumanConfirmation": requires,
    }


def generate_review_report(
    *,
    store: Optional[JsonlAuditLogStore] = None,
) -> ReviewResult:
    """
    Interface: generateReviewReport(timeRange: TimeRange): ReviewReport

    Task 9 skeleton:
    - If a store is provided, reports counts; otherwise returns a placeholder.
    - No timeRange filtering (schema not defined in spec).
    """

    if store is None:
        return {
            "status": "requires_human_review",
            "note": "Task 9 placeholder: no audit store provided",
        }

    with preserve_work_on_error(hint="human_review.generate_review_report"):
        records = list(store.iter_records())
        total = len(records)
        sample_ids = []
        for rec in records[-5:]:
            entry = rec.get("entry")
            if isinstance(entry, dict) and isinstance(entry.get("id"), str):
                sample_ids.append(entry["id"])

        audit_log("human_review.generate_review_report", fields={"total_records": total})
        return {
            "status": "requires_human_review",
            "totalRecords": total,
            "sampleEntryIds": sample_ids,
            "note": "Task 9 placeholder: review report generation not implemented",
        }

