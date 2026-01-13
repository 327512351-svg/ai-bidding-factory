from __future__ import annotations

from typing import Dict

from ai_bidding_assistant.models import WorkflowPhase, WorkflowState


def can_transition(state: WorkflowState, to_phase: WorkflowPhase) -> Dict[str, object]:
    """
    Fail-closed placeholder:
    - If to_phase is same as current -> allowed False with note
    - Otherwise requiresHumanConfirmation = True
    """

    if state.currentPhase == to_phase:
        return {
            "allowed": False,
            "requiresHumanConfirmation": True,
            "reason": "Already in target phase; no-op",
        }

    return {
        "allowed": False,
        "requiresHumanConfirmation": True,
        "reason": "Transition control not implemented (Task 10 placeholder)",
    }


def transition(state: WorkflowState, to_phase: WorkflowPhase) -> WorkflowState:
    """
    Wrapper: only moves if allowed == True; current placeholder never moves.
    """

    decision = can_transition(state, to_phase)
    if decision.get("allowed"):
        return WorkflowState(
            currentPhase=to_phase,
            completedReviews=state.completedReviews,
            pendingApprovals=state.pendingApprovals,
            blockedOperations=state.blockedOperations,
            complianceStatus=state.complianceStatus,
        )
    return state

