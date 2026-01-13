from __future__ import annotations

from dataclasses import asdict, dataclass
from enum import Enum
from typing import Any, Dict, List

from .common import ApprovalRequest, BlockedOperation, ComplianceStatus, ReviewPoint


class WorkflowPhase(str, Enum):
    """
    WorkflowPhase enum from design.md.
    """

    DOCUMENT_ANALYSIS = "document_analysis"
    STRUCTURE_PLANNING = "structure_planning"
    CONTENT_GENERATION = "content_generation"
    QUALITY_ASSURANCE = "quality_assurance"
    SUBMISSION_PREPARATION = "submission_preparation"


@dataclass(frozen=True)
class WorkflowState:
    """
    WorkflowState model from design.md.
    """

    currentPhase: WorkflowPhase
    completedReviews: List[ReviewPoint]
    pendingApprovals: List[ApprovalRequest]
    blockedOperations: List[BlockedOperation]
    complianceStatus: ComplianceStatus

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    def validate(self) -> None:
        # TODO(Task 2.5): implement validation in a later task.
        return None

