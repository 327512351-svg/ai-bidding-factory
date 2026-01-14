export type UserRole = "admin" | "reviewer" | "operator" | "viewer";

export type UserStatus = "active" | "disabled" | "pending";

export type UserItem = {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
  status: UserStatus;
  lastSeen: string;
};

export const sampleUsers: UserItem[] = [
  { id: "u-001", username: "admin", displayName: "管理员（占位）", role: "admin", status: "active", lastSeen: "2026-01-14T10:00:00Z" },
  { id: "u-002", username: "reviewer1", displayName: "审核员 A（占位）", role: "reviewer", status: "active", lastSeen: "2026-01-14T09:10:00Z" },
  { id: "u-003", username: "operator1", displayName: "操作员 B（占位）", role: "operator", status: "pending", lastSeen: "—" },
  { id: "u-004", username: "viewer1", displayName: "只读用户（占位）", role: "viewer", status: "disabled", lastSeen: "2026-01-10T12:00:00Z" },
];

