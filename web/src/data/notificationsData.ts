import { NotificationItem } from "../state/slices/notificationSlice";

export const sampleNotifications: NotificationItem[] = [
  {
    id: "notif-20260114-001",
    title: "内容生成待审",
    message: "生成结果需要人工审核（占位）",
    level: "warning",
    timestamp: "2026-01-14T10:00:00Z",
    read: false,
  },
  {
    id: "notif-20260114-002",
    title: "合规校验未完成",
    message: "合规模块未返回结果，默认 fail-closed（占位）",
    level: "error",
    timestamp: "2026-01-14T09:50:00Z",
    read: false,
  },
  {
    id: "notif-20260114-003",
    title: "审计日志同步",
    message: "审计事件已记录（占位）",
    level: "info",
    timestamp: "2026-01-14T09:40:00Z",
    read: true,
  },
];

