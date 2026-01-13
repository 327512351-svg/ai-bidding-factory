from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from ai_bidding_assistant.models import WorkflowPhase, WorkflowState


def _default_state() -> WorkflowState:
    return WorkflowState(
        currentPhase=WorkflowPhase.DOCUMENT_ANALYSIS,
        completedReviews=[],
        pendingApprovals=[],
        blockedOperations=[],
        complianceStatus="unknown",
    )


def init_state(path: str = "./.aiba/workflow_state.json") -> WorkflowState:
    state = _default_state()
    save_state(state, path=path)
    return state


def save_state(state: WorkflowState, *, path: str = "./.aiba/workflow_state.json") -> str:
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    data = state.to_dict()
    # add persisted timestamp (without altering model schema)
    data["_persistedAt"] = datetime.now(timezone.utc).isoformat()
    with p.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return str(p)


def load_state(path: str = "./.aiba/workflow_state.json") -> WorkflowState:
    p = Path(path)
    if not p.exists():
        return _default_state()
    data = json.loads(p.read_text(encoding="utf-8"))
    # ignore extra fields like _persistedAt
    return WorkflowState(
        currentPhase=WorkflowPhase(data["currentPhase"]),
        completedReviews=data.get("completedReviews", []),
        pendingApprovals=data.get("pendingApprovals", []),
        blockedOperations=data.get("blockedOperations", []),
        complianceStatus=data.get("complianceStatus", "unknown"),
    )

