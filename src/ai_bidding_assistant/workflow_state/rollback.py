from __future__ import annotations

from typing import Dict

from ai_bidding_assistant.models import WorkflowState


def rollback(state: WorkflowState) -> Dict[str, object]:
    """
    Placeholder rollback: does not change state, signals requires human confirmation.
    """

    return {
        "status": "NOT_PERFORMED",
        "requiresHumanConfirmation": True,
        "reason": "Rollback not implemented (Task 10 placeholder)",
        "state": state.to_dict(),
    }

