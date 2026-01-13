from __future__ import annotations

"""
Type definitions for the Document Analyzer (Task 3).

The design spec references several return types but does not define their structure:
- AnalysisResult
- RequirementSet
- CriteriaSet
- AmbiguityReport

To avoid inventing fields, we represent these as opaque mappings/lists.
"""

from typing import Any, Mapping, Sequence, TypeAlias

from ai_bidding_assistant.models import EvaluationCriterion, Requirement
from ai_bidding_assistant.models import TenderDocument

RequirementSet: TypeAlias = Sequence[Requirement]
CriteriaSet: TypeAlias = Sequence[EvaluationCriterion]

AnalysisResult: TypeAlias = TenderDocument
AmbiguityReport: TypeAlias = Mapping[str, Any]

