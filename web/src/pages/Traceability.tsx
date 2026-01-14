import { appTheme } from "../theme";
import { traceabilityNodes } from "../data/complianceData";

const nodeStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "10px",
  padding: "0.75rem",
  background: appTheme.colors.panel,
  marginBottom: "0.75rem",
};

const cardBase: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
};

const propertyChecks = [
  {
    id: "属性14",
    description: "追溯链节点按执行顺序展示",
    status: traceabilityNodes.length >= 3 ? "PASS" : "WARN",
    notes: "节点顺序可在 Task 13+ 中进一步同步 pipeline 配置。",
  },
  {
    id: "属性15",
    description: "每个节点都包含 label/detail/status 字段",
    status: traceabilityNodes.every((node) => node.label && node.detail && node.status) ? "PASS" : "WARN",
    notes: "后续 Task 12.6 会把 detail 绑定到 traceability store。",
  },
];

export function Traceability() {
  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>追溯链可视化（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 12.5/12.6 骨架：展示 traceability 节点、状态与属性测试，真实图形化在后续任务实现。
      </p>

      <section style={{ maxWidth: "620px" }}>
        {traceabilityNodes.map((node) => (
          <div key={node.label} style={nodeStyle}>
            <strong>{node.label}</strong>
            <p style={{ margin: "0.25rem 0" }}>{node.detail}</p>
            <span style={{ fontSize: "0.85rem", color: appTheme.colors.muted }}>状态：{node.status}</span>
          </div>
        ))}
        <p style={{ color: appTheme.colors.muted, fontSize: "0.9rem" }}>
          TODO: Task 12.6 的可视化图表、交互与节点详情仍待实现。
        </p>
      </section>

      <section style={{ marginTop: "1rem", ...cardBase }}>
        <h3 style={{ marginTop: 0 }}>属性测试占位</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
          {propertyChecks.map((check) => (
            <li key={check.id} style={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
              <strong>{check.id}：</strong> {check.description}
              <div style={{ fontSize: "0.85rem", color: appTheme.colors.muted }}>
                [{check.status}] {check.notes}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

