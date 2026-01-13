from __future__ import annotations

import argparse
import json

from .backup import backup_aiba_dir, restore_aiba_dir
from .recovery import recover_from_latest, recover_from_path


def main() -> int:
    parser = argparse.ArgumentParser(prog="ai_bidding_assistant.resilience")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("backup")

    restore_p = sub.add_parser("restore")
    restore_p.add_argument("--from-path", required=True, help="Path to backup directory.")

    sub.add_parser("recover-from-latest")
    recover_p = sub.add_parser("recover-from")
    recover_p.add_argument("--path", required=True, help="Path to recovery JSON file.")

    args = parser.parse_args()

    if args.cmd == "backup":
        result = backup_aiba_dir()
    elif args.cmd == "restore":
        result = restore_aiba_dir(args.from_path)
    elif args.cmd == "recover-from-latest":
        result = recover_from_latest()
    else:
        result = recover_from_path(args.path)

    print(json.dumps(result.to_dict(), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

