from __future__ import annotations

import json
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Any, Dict, List, Optional

from ai_bidding_assistant.core.error_handling import preserve_work_on_error


@dataclass
class Check:
    name: str
    status: str
    notes: Optional[str] = None

    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in asdict(self).items() if v is not None}


def run_checkpoint() -> Dict[str, Any]:
    """
    Task 15: Final checkpoint - System readiness validation (placeholder).

    Fail-closed; no real tests/compliance are executed.
    """

    checks: List[Check] = []
    requires_human = False

    # Audit files presence
    with preserve_work_on_error(hint="task15.audit_presence"):
        audit_files = [
            Path("./.aiba/pipeline_audit.jsonl"),
            Path("./.aiba/app_audit.jsonl"),
            Path("./.aiba/alerts.jsonl"),
        ]
        missing = [str(p) for p in audit_files if not p.exists()]
        if missing:
            checks.append(Check(name="audit_files", status="REQUIRES_HUMAN_CONFIRMATION", notes=f"Missing: {missing}"))
            requires_human = True
        else:
            checks.append(Check(name="audit_files", status="PASS"))

    # Compliance readiness (placeholder)
    checks.append(
        Check(
            name="compliance_readiness",
            status="REQUIRES_HUMAN_CONFIRMATION",
            notes="Compliance readiness not implemented (Task 15 placeholder).",
        )
    )
    requires_human = True

    # Testing readiness (placeholder)
    checks.append(
        Check(
            name="testing_readiness",
            status="REQUIRES_HUMAN_CONFIRMATION",
            notes="No automated tests executed (Task 15 placeholder).",
        )
    )
    requires_human = True

    # Human review readiness (placeholder)
    checks.append(
        Check(
            name="human_review_readiness",
            status="REQUIRES_HUMAN_CONFIRMATION",
            notes="Human review enforcement not validated (Task 15 placeholder).",
        )
    )
    requires_human = True

    status = "FAIL" if requires_human else "PASS"
    return {
        "status": status,
        "requiresHumanConfirmation": requires_human,
        "checks": [c.to_dict() for c in checks],
        "questions": [
            "Do you want to implement real compliance/tests/human-review enforcement to reach PASS?",
        ],
    }


if __name__ == "__main__":
    print(json.dumps(run_checkpoint(), ensure_ascii=False, indent=2))

