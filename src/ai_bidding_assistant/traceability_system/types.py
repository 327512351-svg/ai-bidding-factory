from __future__ import annotations

"""
Type aliases for Traceability System (Task 8).

The design spec references several return types but does not define their schema:
- OriginTrace
- AuditReport
- TraceabilityResult
- LogEntry (we reuse models.AuditLogEntry for the log entry structure)

To avoid inventing spec-undefined fields, we keep these opaque mappings.
"""

from typing import Any, Mapping, TypeAlias

OriginTrace: TypeAlias = Mapping[str, Any]
AuditReport: TypeAlias = Mapping[str, Any]
TraceabilityResult: TypeAlias = Mapping[str, Any]

