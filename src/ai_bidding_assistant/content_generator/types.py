from __future__ import annotations

"""
Type aliases for Content Generator (Task 6).

The design spec references these types but does not define their schemas:
- SectionType
- Template
- CompanyCapabilities
- TechnicalContent
- ComplianceMatrix
- ProposalStructure

To avoid inventing spec-undefined fields, we keep them opaque.
"""

from typing import Any, Mapping, TypeAlias

SectionType: TypeAlias = str
Template: TypeAlias = Mapping[str, Any]
CompanyCapabilities: TypeAlias = Mapping[str, Any]

TechnicalContent: TypeAlias = Mapping[str, Any]
ComplianceMatrix: TypeAlias = Mapping[str, Any]
ProposalStructure: TypeAlias = Mapping[str, Any]

