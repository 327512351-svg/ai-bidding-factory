from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict


def _unique_name(base: str) -> str:
    ts = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    return f"{base}_{ts}.json"


def preserve_state(state: Dict[str, Any], path: str) -> str:
    """
    Persist work/context state to a JSON file.

    - Writes a unique file (timestamp suffix) under the given path's directory.
    - Optionally also writes a latest pointer file with the original name.
    """

    base_path = Path(path)
    directory = base_path.parent if base_path.suffix else base_path
    directory.mkdir(parents=True, exist_ok=True)

    base_name = base_path.stem if base_path.suffix else "work_state"
    unique_file = directory / _unique_name(base_name)

    with unique_file.open("w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)

    # Optional: update latest pointer (best-effort)
    latest_path = directory / f"{base_name}_latest.json"
    try:
        with latest_path.open("w", encoding="utf-8") as f:
            json.dump(state, f, ensure_ascii=False, indent=2)
    except Exception:
        pass

    return str(unique_file)

