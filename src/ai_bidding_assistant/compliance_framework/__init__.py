"""
Compliance Framework component (Task 5).

Task 5 scope (from tasks.md):
- 5.1 operation validation + blocking system (skeleton)
- 5.3 risk detection + escalation (skeleton)
- 5.5 compliance reporting + audit integration (skeleton)

IMPORTANT:
- No real compliance logic is implemented here (placeholders only).
- stdlib-only; no network access; no external APIs.
"""

from .framework import (
    audit_compliance,
    block_prohibited_action,
    enforce_constraints,
    validate_operation,
)
from .types import (
    Action,
    BlockResult,
    ComplianceReport,
    EnforcementResult,
    ValidationResult,
    WorkSession,
)

__all__ = [
    "Action",
    "WorkSession",
    "ValidationResult",
    "BlockResult",
    "ComplianceReport",
    "EnforcementResult",
    "validate_operation",
    "block_prohibited_action",
    "audit_compliance",
    "enforce_constraints",
]

