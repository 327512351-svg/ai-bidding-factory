import { appTheme } from "../theme";
import { workflowSteps } from "../data/workflowData";

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
  marginBottom: "1rem",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.6rem 1rem",
  borderRadius: "6px",
  border: `1px solid ${appTheme.colors.border}`,
  background: "#0b1220",
  color: appTheme.colors.text,
  cursor: "pointer",
};

const muted = { color: appTheme.colors.muted, fontSize: "0.9rem" };

const propertyChecks = [
  {
    id: "属性16",
    description: "工作流程至少包含 4 个阶段，且有 fail-closed 状态（blocked/needs_review）",
    status: workflowSteps.length >= 4 && workflowSteps.some((s) => s.status === "blocked" || s.status === "needs_review") ? "PASS" : "WARN",
    notes: "Task 13.2 属性测试占位；真实状态由后端或 pipeline 接入。",
  },
  {
    id: "属性15",
    description: "阶段顺序固定，避免跳跃执行（只支持按序推进）",
    status: "WARN",
    notes: "尚未实现真实顺序校验；需 Task 13+ 状态机接入后验证。",
  },
];

function statusBadge(status: string) {
  const colors: Record<string, string> = {
    completed: "#16a34a",
    in_progress: "#38bdf8",
    blocked: "#f59e0b",
    needs_review: "#f97316",
    pending: "#94a3b8",
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.15rem 0.5rem",
        borderRadius: "6px",
        background: colors[status] || "#334155",
        color: "#0b1220",
        fontSize: "0.85rem",
        fontWeight: 600,
        minWidth: "88px",
        textAlign: "center",
      }}
    >
      {status}
    </span>
  );
}

export function Workflow() {
  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>工作流程控制（占位）</h1>
      <p style={{ ...muted, marginBottom: "1rem" }}>
        Task 13.1/13.2/13.3 骨架：展示阶段、占位控制按钮、属性测试说明；不含真实状态机或计时。
      </p>

      <section style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <button style={buttonStyle} disabled title="占位，未接真实后端">
          启动流程（占位）
        </button>
        <button style={buttonStyle} disabled title="占位，未接真实后端">
          推进到下一阶段（占位）
        </button>
        <button style={buttonStyle} disabled title="占位，未接真实后端">
          回滚上一步（占位）
        </button>
        <span style={muted}>后续 Task 13 将接入 pipeline 状态机与时间记录。</span>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>阶段列表</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {workflowSteps.map((step, index) => (
            <div
              key={step.id}
              style={{
                border: `1px dashed ${appTheme.colors.border}`,
                borderRadius: "8px",
                padding: "0.75rem",
                background: "#0b1220",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 600 }}>
                  {index + 1}. {step.title}
                </div>
                {statusBadge(step.status)}
              </div>
              <p style={{ ...muted, margin: "0.35rem 0" }}>{step.notes}</p>
              <div style={{ ...muted, fontSize: "0.85rem" }}>ID: {step.id}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>属性测试占位</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
          {propertyChecks.map((check) => (
            <li key={check.id} style={{ marginBottom: "0.6rem" }}>
              <strong>{check.id}：</strong> {check.description}
              <div style={{ ...muted, fontSize: "0.85rem" }}>
                [{check.status}] {check.notes}
              </div>
            </li>
          ))}
        </ul>
        <p style={{ ...muted, fontSize: "0.85rem", marginTop: "0.5rem" }}>
          TODO: 接入真实状态机、耗时记录和进度校验；此处仅为 UI 骨架与属性说明。
        </p>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>时间跟踪占位</h3>
        <p style={muted}>Task 13.3 要求的阶段耗时/预估尚未接入，这里预留展示区域。</p>
        <div
          style={{
            border: `1px dashed ${appTheme.colors.border}`,
            borderRadius: "8px",
            padding: "0.75rem",
            color: appTheme.colors.muted,
          }}
        >
          无真实计时数据（占位）
        </div>
      </section>
    </main>
  );
}

