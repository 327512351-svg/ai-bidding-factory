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
    Task 14 skeleton: Final system validation and testing (placeholder).

    - No real tests are executed.
    - Performs minimal presence/traceability checks and returns fail-closed if uncertain.
    """

    checks: List[Check] = []
    requires_human = False

    # Check presence of key audit/log files (optional).
    with preserve_work_on_error(hint="task14.audit_presence"):
        audit_files = [
            Path("./.aiba/pipeline_audit.jsonl"),
            Path("./.aiba/app_audit.jsonl"),
            Path("./.aiba/alerts.jsonl"),
            Path("./.aiba/work_state_latest.json"),
        ]
        missing = [str(p) for p in audit_files if not p.exists()]
        if missing:
            checks.append(Check(name="audit_files", status="REQUIRES_HUMAN_CONFIRMATION", notes=f"Missing: {missing}"))
            requires_human = True
        else:
            checks.append(Check(name="audit_files", status="PASS"))

    # Placeholder for "compliance requirements met" — fail-closed by default.
    checks.append(
        Check(
            name="compliance_final",
            status="REQUIRES_HUMAN_CONFIRMATION",
            notes="Compliance validation not implemented (Task 14 placeholder).",
        )
    )
    requires_human = True

    # Placeholder for "all tests pass" — we did not run tests.
    checks.append(
        Check(
            name="tests_final",
            status="REQUIRES_HUMAN_CONFIRMATION",
            notes="No automated tests executed (Task 14 placeholder).",
        )
    )
    requires_human = True

    status = "FAIL" if requires_human else "PASS"
    return {
        "status": status,
        "requiresHumanConfirmation": requires_human,
        "checks": [c.to_dict() for c in checks],
        "questions": ["Do you want to run real tests/compliance validation? (not implemented)"],
    }


if __name__ == "__main__":
    print(json.dumps(run_checkpoint(), ensure_ascii=False, indent=2))

