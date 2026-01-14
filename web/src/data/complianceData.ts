export type ComplianceOverviewItem = {
  label: string;
  value: string;
  details: string;
  severity: "info" | "warning" | "critical";
};

export type AuditEntry = {
  id: string;
  action: string;
  status: "PASS" | "WARN" | "FAIL";
  actor: string;
  timestamp: string;
};

export type TraceabilityNode = {
  label: string;
  detail: string;
  status: string;
};

export const complianceOverview: ComplianceOverviewItem[] = [
  { label: "合规状态", value: "部分通过（占位）", details: "部分任务需人工复核", severity: "warning" },
  { label: "风险等级", value: "中（占位）", details: "需后续 Task 12+ 提供评分", severity: "warning" },
  { label: "违规告警", value: "2 条（占位）", details: "提示后续 Task 12.4 需跟踪", severity: "critical" },
];

export const auditEntries: AuditEntry[] = [
  { id: "audit-20260114-01", action: "document.analysis", status: "PASS", actor: "analyzer", timestamp: "2026-01-14T08:00:00Z" },
  { id: "audit-20260114-02", action: "compliance.check", status: "WARN", actor: "compliance-engine", timestamp: "2026-01-14T08:05:00Z" },
  { id: "audit-20260114-03", action: "content.generation", status: "FAIL", actor: "content-generator", timestamp: "2026-01-14T08:10:00Z" },
];

export const traceabilityNodes: TraceabilityNode[] = [
  { label: "源文档", detail: "文档分析模块 -> 需求树 (placeholder)", status: "已捕获" },
  { label: "内容生成", detail: "Boilerplate 模板 v0.1", status: "待审" },
  { label: "合规检查", detail: "默认 fail-closed，requires_human_review", status: "未运行" },
  { label: "人工审核", detail: "审计日志 pending", status: "等待决策" },
];

