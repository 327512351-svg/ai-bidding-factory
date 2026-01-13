from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any, Dict, List, Mapping, TypeAlias

from .common import DocumentMetadata, DocumentSection, SourceLocation, SubmissionGuideline

# The spec references these types but does not define allowed values.
RequirementCategory: TypeAlias = str
Priority: TypeAlias = str
AmbiguityFlag: TypeAlias = str


EvaluationCriterion: TypeAlias = Mapping[str, Any]


@dataclass(frozen=True)
class Requirement:
    """
    Requirement model from design.md.
    """

    id: str
    text: str
    category: RequirementCategory
    priority: Priority
    sourceLocation: SourceLocation
    ambiguityFlags: List[AmbiguityFlag]

    def to_dict(self) -> Dict[str, Any]:
        # Serialization support (Task 2.1) — stdlib-only.
        return asdict(self)

    def validate(self) -> None:
        # TODO(Task 2.1): implement validation in a later task.
        return None


@dataclass(frozen=True)
class TenderDocument:
    """
    TenderDocument model from design.md.
    """

    id: str
    title: str
    sections: List[DocumentSection]
    requirements: List[Requirement]
    evaluationCriteria: List[EvaluationCriterion]
    submissionGuidelines: List[SubmissionGuideline]
    metadata: DocumentMetadata

    def to_dict(self) -> Dict[str, Any]:
        # NOTE: asdict will convert nested dataclasses too.
        return asdict(self)

    def validate(self) -> None:
        # TODO(Task 2.1): implement validation in a later task.
        return None

