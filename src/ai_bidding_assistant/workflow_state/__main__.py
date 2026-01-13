from __future__ import annotations

import argparse
import json

from ai_bidding_assistant.models import WorkflowPhase

from .store import init_state, load_state, save_state
from .transitions import can_transition, transition
from .rollback import rollback


def main() -> int:
    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.workflow_state")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("init")

    show_p = sub.add_parser("show")
    show_p.add_argument("--path", default="./.aiba/workflow_state.json")

    trans_p = sub.add_parser("transition")
    trans_p.add_argument("--to", required=True, choices=[p.value for p in WorkflowPhase])
    trans_p.add_argument("--path", default="./.aiba/workflow_state.json")

    rb_p = sub.add_parser("rollback")
    rb_p.add_argument("--path", default="./.aiba/workflow_state.json")

    args = parser.parse_args()

    if args.cmd == "init":
        state = init_state()
        print(json.dumps(state.to_dict(), ensure_ascii=False, indent=2))
        return 0

    if args.cmd == "show":
        state = load_state(args.path)
        print(json.dumps(state.to_dict(), ensure_ascii=False, indent=2))
        return 0

    if args.cmd == "transition":
        state = load_state(args.path)
        decision = can_transition(state, WorkflowPhase(args.to))
        if decision.get("allowed"):
            new_state = transition(state, WorkflowPhase(args.to))
            save_state(new_state, path=args.path)
            print(json.dumps({"status": "MOVED", "state": new_state.to_dict()}, ensure_ascii=False, indent=2))
        else:
            print(json.dumps({"status": "HALTED", **decision}, ensure_ascii=False, indent=2))
        return 0

    if args.cmd == "rollback":
        state = load_state(args.path)
        result = rollback(state)
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return 0

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

