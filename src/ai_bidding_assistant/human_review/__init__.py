"""
Human Review Interface component (Task 9).

Scope (tasks.md):
- 9.1 review workflow management (session create + approval/rejection handling + status tracking)
- 9.3 review history and audit integration

Constraints:
- Fail-closed: any unknown decision/status → requires human review
- stdlib-only; no business logic; no real content generation
"""

from .review import (
    capture_review_decision,
    generate_review_report,
    present_for_review,
    track_approval_status,
)
from .types import ApprovalStatus, Decision, ReviewResult, ReviewType

__all__ = [
    "Decision",
    "ReviewType",
    "ApprovalStatus",
    "ReviewResult",
    "present_for_review",
    "capture_review_decision",
    "track_approval_status",
    "generate_review_report",
]

