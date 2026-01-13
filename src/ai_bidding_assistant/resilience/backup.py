from __future__ import annotations

import shutil
from datetime import datetime, timezone
from pathlib import Path

from .types import BackupResult, RestoreResult


def _ts() -> str:
    return datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")


def backup_aiba_dir(base_dir: str = "./.aiba") -> BackupResult:
    src = Path(base_dir)
    if not src.exists():
        return BackupResult(
            status="FAIL",
            requiresHumanConfirmation=True,
            source=str(src),
            destination="",
            message="Source .aiba directory not found",
        )
    dest = src.parent / ".aiba_backups" / _ts()
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        shutil.copytree(src, dest, ignore=shutil.ignore_patterns("backups", ".aiba_backups"))
        return BackupResult(
            status="PASS",
            requiresHumanConfirmation=False,
            source=str(src),
            destination=str(dest),
            message="Backup completed (placeholder, no compression)",
        )
    except Exception as exc:  # noqa: BLE001
        return BackupResult(
            status="FAIL",
            requiresHumanConfirmation=True,
            source=str(src),
            destination=str(dest),
            message=f"Backup failed: {exc}",
        )


def restore_aiba_dir(backup_path: str, base_dir: str = "./.aiba") -> RestoreResult:
    src = Path(backup_path)
    dest = Path(base_dir)
    if not src.exists():
        return RestoreResult(
            status="FAIL",
            requiresHumanConfirmation=True,
            source=str(src),
            restoredTo=str(dest),
            message="Backup path does not exist",
        )

    dest.parent.mkdir(parents=True, exist_ok=True)
    pre_backup = dest.parent / f"_pre_restore_{_ts()}"
    try:
        if dest.exists():
            shutil.move(str(dest), str(pre_backup))
        shutil.copytree(src, dest)
        return RestoreResult(
            status="PASS",
            requiresHumanConfirmation=False,
            source=str(src),
            restoredTo=str(dest),
            message=f"Restored; previous state moved to {pre_backup}" if pre_backup.exists() else None,
        )
    except Exception as exc:  # noqa: BLE001
        return RestoreResult(
            status="FAIL",
            requiresHumanConfirmation=True,
            source=str(src),
            restoredTo=str(dest),
            message=f"Restore failed: {exc}",
        )

