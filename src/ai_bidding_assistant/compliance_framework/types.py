from __future__ import annotations

"""
Type aliases for Compliance Framework component (Task 5).

The design spec references these types but does not define their internal schema:
- Action
- WorkSession
- ValidationResult
- BlockResult
- ComplianceReport
- EnforcementResult

To avoid inventing spec-undefined fields, we represent these as opaque mappings.
"""

from typing import Any, Mapping, TypeAlias

Action: TypeAlias = Mapping[str, Any]
WorkSession: TypeAlias = Mapping[str, Any]

ValidationResult: TypeAlias = Mapping[str, Any]
BlockResult: TypeAlias = Mapping[str, Any]
ComplianceReport: TypeAlias = Mapping[str, Any]
EnforcementResult: TypeAlias = Mapping[str, Any]

