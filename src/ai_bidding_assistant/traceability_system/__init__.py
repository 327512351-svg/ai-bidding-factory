"""
Traceability System component (Task 8).

Task 8 scope (from tasks.md):
- 8.1 comprehensive operation logging (append-only, "immutable" storage skeleton)
- 8.3 audit trail search and reporting (skeleton)

IMPORTANT:
- stdlib-only
- placeholder implementation (no full integrity/crypto guarantees)
- do NOT touch Task 9+ (human review interface)
"""

from .system import (
    generate_audit_report,
    log_operation,
    search_audit_trail,
    validate_audit_storage,
)
from .types import AuditReport, OriginTrace, TraceabilityResult

__all__ = [
    "AuditReport",
    "OriginTrace",
    "TraceabilityResult",
    "log_operation",
    "search_audit_trail",
    "generate_audit_report",
    "validate_audit_storage",
]

