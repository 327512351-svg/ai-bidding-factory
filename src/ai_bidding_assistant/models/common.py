from __future__ import annotations

"""
Common / shared type definitions used across models.

IMPORTANT (Spec compliance):
- Several types are referenced by the spec but not structurally defined (e.g. Operation, Actor,
  DocumentSection, SourceLocation). To avoid inventing fields/concepts, we represent these as
  opaque mappings (or strings) for now.
- Do NOT add fields to these opaque types unless the spec explicitly defines them.
"""

from datetime import datetime
from typing import Any, Mapping, TypeAlias

# Timestamp type used by design.md ("DateTime")
DateTime: TypeAlias = datetime

# Opaque types referenced by spec/interfaces but not structurally defined.
Operation: TypeAlias = Mapping[str, Any]
Actor: TypeAlias = Mapping[str, Any]
Context: TypeAlias = Mapping[str, Any]

DocumentSection: TypeAlias = Mapping[str, Any]
SubmissionGuideline: TypeAlias = Mapping[str, Any]
DocumentMetadata: TypeAlias = Mapping[str, Any]

SourceLocation: TypeAlias = Mapping[str, Any]

SourceReference: TypeAlias = Mapping[str, Any]
GenerationMetadata: TypeAlias = Mapping[str, Any]
ApprovalRecord: TypeAlias = Mapping[str, Any]

Reviewer: TypeAlias = Mapping[str, Any]
ReviewType: TypeAlias = str
ReviewDecision: TypeAlias = str
ReviewPoint: TypeAlias = Mapping[str, Any]
ApprovalRequest: TypeAlias = Mapping[str, Any]
BlockedOperation: TypeAlias = Mapping[str, Any]
ComplianceStatus: TypeAlias = str

