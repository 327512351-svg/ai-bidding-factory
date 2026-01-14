export type WorkflowStepStatus = "pending" | "in_progress" | "blocked" | "needs_review" | "completed";

export type WorkflowStep = {
  id: string;
  title: string;
  status: WorkflowStepStatus;
  notes: string;
};

export const workflowSteps: WorkflowStep[] = [
  { id: "step-1", title: "文档分析", status: "completed", notes: "占位：已生成初步解析" },
  { id: "step-2", title: "内容生成", status: "needs_review", notes: "默认 fail-closed，等待人审" },
  { id: "step-3", title: "合规检查", status: "blocked", notes: "占位：缺少输入，需人工确认" },
  { id: "step-4", title: "人工审核", status: "pending", notes: "等待审批决定" },
  { id: "step-5", title: "归档与追溯", status: "pending", notes: "占位：待 traceability 接入" },
];

