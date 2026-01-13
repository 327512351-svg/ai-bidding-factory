"""
Content Generator component (Task 6).

Scope:
- Provide stdlib-only skeleton with stable, placeholder outputs (fail-closed).
- Do NOT generate any real bid/proposal text.
"""

from .generator import (
    create_compliance_matrix,
    format_technical_response,
    generate_boilerplate_content,
    generate_document_structure,
)
from .types import (
    CompanyCapabilities,
    ComplianceMatrix,
    ProposalStructure,
    SectionType,
    Template,
    TechnicalContent,
)

__all__ = [
    "SectionType",
    "Template",
    "CompanyCapabilities",
    "TechnicalContent",
    "ComplianceMatrix",
    "ProposalStructure",
    "generate_boilerplate_content",
    "format_technical_response",
    "create_compliance_matrix",
    "generate_document_structure",
]

