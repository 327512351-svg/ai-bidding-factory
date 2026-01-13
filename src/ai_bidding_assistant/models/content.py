from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any, Dict, List, Mapping, TypeAlias

from .common import ApprovalRecord, GenerationMetadata, SourceReference

# The spec references these types but does not define allowed values.
ContentType: TypeAlias = str
ReviewStatus: TypeAlias = str


@dataclass(frozen=True)
class Content:
    """
    Content model from design.md.

    Task 2.3:
    - Content
    - GenerationMetadata
    - SourceReference
    - review status tracking and approval history
    """

    id: str
    type: ContentType
    text: str
    sourceReferences: List[SourceReference]
    generationMetadata: GenerationMetadata
    reviewStatus: ReviewStatus
    approvalHistory: List[ApprovalRecord]

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    def validate(self) -> None:
        # TODO(Task 2.3): implement validation in a later task.
        return None

