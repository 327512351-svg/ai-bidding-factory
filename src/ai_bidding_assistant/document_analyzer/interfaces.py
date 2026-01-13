from __future__ import annotations

from ai_bidding_assistant.core.constants import REQUIRES_HUMAN_CONFIRMATION_TOKEN
from ai_bidding_assistant.core.error_handling import preserve_work_on_error
from ai_bidding_assistant.models import TenderDocument

from .types import AnalysisResult, AmbiguityReport, CriteriaSet, RequirementSet


def analyze_tender_document(document: TenderDocument) -> AnalysisResult:
    """
    Interface from design.md:
    - analyzeTenderDocument(document: TenderDocument): AnalysisResult

    Task 3 skeleton behavior:
    - Calls other placeholder extraction steps
    - Returns an opaque mapping containing extracted sets and minimal status
    """

    with preserve_work_on_error(hint="analyze_tender_document"):
        # Task 3 is a skeleton: do not implement parsing/extraction algorithms here.
        # We keep AnalysisResult as TenderDocument (see types.py) to avoid inventing
        # a new AnalysisResult schema not defined by the spec.
        #
        # TODO(Task 3.1+): populate document.sections / requirements / criteria / guidelines.
        return document


def extract_requirements(document: TenderDocument) -> RequirementSet:
    """
    Interface from design.md:
    - extractRequirements(document: TenderDocument): RequirementSet

    Task 3: placeholder only (no extraction logic).
    """

    with preserve_work_on_error(hint="extract_requirements"):
        # TODO(Task 3.1): implement real requirement extraction with SourceLocation traceability.
        return []


def identify_evaluation_criteria(document: TenderDocument) -> CriteriaSet:
    """
    Interface from design.md:
    - identifyEvaluationCriteria(document: TenderDocument): CriteriaSet

    Task 3: placeholder only (no extraction logic).
    """

    with preserve_work_on_error(hint="identify_evaluation_criteria"):
        # TODO(Task 3.1): implement real evaluation criteria extraction.
        return []


def flag_ambiguous_requirements(requirements: RequirementSet) -> AmbiguityReport:
    """
    Interface from design.md:
    - flagAmbiguousRequirements(requirements: RequirementSet): AmbiguityReport

    Task 3: placeholder only (no ambiguity detection logic).
    """

    with preserve_work_on_error(hint="flag_ambiguous_requirements"):
        # TODO(Task 3.3): implement ambiguity detection + flagging for human review.
        return {"status": REQUIRES_HUMAN_CONFIRMATION_TOKEN, "items": []}

