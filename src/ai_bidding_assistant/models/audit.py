from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Any, Dict, List

from .common import Actor, ComplianceStatus, DateTime, Operation, ReviewDecision, ReviewType, Reviewer
from .content import Content, ReviewStatus


@dataclass(frozen=True)
class AuditLogEntry:
    """
    AuditLogEntry model from design.md.

    Task 2.5 mentions "immutable logging capabilities"; this model is the *data structure*
    only. Actual immutability guarantees/storage belong to later tasks.
    """

    id: str
    timestamp: DateTime
    operation: Operation
    actor: Actor
    inputs: List[Any]
    outputs: List[Any]
    complianceStatus: ComplianceStatus
    traceabilityChain: List[str]

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    def validate(self) -> None:
        # TODO(Task 2.5): implement validation in a later task.
        return None


@dataclass(frozen=True)
class ReviewSession:
    """
    ReviewSession model from design.md.
    """

    id: str
    content: Content
    reviewer: Reviewer
    reviewType: ReviewType
    status: ReviewStatus
    decision: ReviewDecision
    comments: str
    timestamp: DateTime

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    def validate(self) -> None:
        # TODO(Task 2.5): implement validation in a later task.
        return None

