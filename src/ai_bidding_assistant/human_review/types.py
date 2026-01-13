from __future__ import annotations

"""
Type aliases for Human Review Interface (Task 9).

The spec references these types but does not define their schemas:
- ReviewType
- Decision
- ApprovalStatus
- ReviewResult

We keep them opaque to avoid inventing fields.
"""

from typing import Any, Mapping, TypeAlias

ReviewType: TypeAlias = str
Decision: TypeAlias = str
ApprovalStatus: TypeAlias = Mapping[str, Any]
ReviewResult: TypeAlias = Mapping[str, Any]

