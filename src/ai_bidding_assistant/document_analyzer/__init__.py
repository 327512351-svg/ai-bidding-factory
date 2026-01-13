"""
Document Analyzer component (Task 3).

Task 3 scope:
- Input/ingest + parsing pipeline skeleton
- Function signatures per design.md
- Placeholder outputs (no real parsing algorithms)
- stdlib-only
"""

from .interfaces import (
    analyze_tender_document,
    extract_requirements,
    flag_ambiguous_requirements,
    identify_evaluation_criteria,
)
from .pipeline import ingest_tender_file
from .types import AnalysisResult, AmbiguityReport, CriteriaSet, RequirementSet

__all__ = [
    "AnalysisResult",
    "AmbiguityReport",
    "CriteriaSet",
    "RequirementSet",
    "ingest_tender_file",
    "analyze_tender_document",
    "extract_requirements",
    "identify_evaluation_criteria",
    "flag_ambiguous_requirements",
]

