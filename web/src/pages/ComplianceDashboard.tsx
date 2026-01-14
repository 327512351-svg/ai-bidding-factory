import { appTheme } from "../theme";
import { complianceOverview } from "../data/complianceData";
import { downloadJson } from "../utils/download";

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
  marginBottom: "1rem",
};

const listBaseStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: "1rem",
  color: appTheme.colors.muted,
};

const propertyChecks = [
  {
    id: "属性12",
    description: "合规状态监控概览中至少应有三项配置项",
    status: complianceOverview.length >= 3 ? "PASS" : "WARN",
    notes: complianceOverview.map((item) => item.label).join(", "),
  },
  {
    id: "属性13",
    description: "合规卡片提供 severity 信息以驱动指示颜色/语义",
    status: complianceOverview.every((item) => typeof item.severity === "string") ? "PASS" : "WARN",
    notes: "severity 字段暂用占位值，后续 Task 12.2 需绑定真实级别",
  },
];

export function ComplianceDashboard() {
  return (
    <main style={{ padding: "1.5rem", maxWidth: "1080px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>合规监控（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 12.1/12.2 骨架：展示合规状态、警告与评分趋势，并附带 property 测试说明。
      </p>

      <section style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
        {complianceOverview.map((item) => (
          <div key={item.label} style={{ ...cardStyle, flex: "1 1 220px" }}>
            <h3 style={{ margin: "0 0 0.5rem 0" }}>{item.label}</h3>
            <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>{item.value}</div>
            <div style={{ color: appTheme.colors.muted, fontSize: "0.9rem" }}>{item.details}</div>
          </div>
        ))}
      </section>

      <section style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ marginTop: 0 }}>违规警告列表（占位）</h3>
          <button
            onClick={() => downloadJson(complianceOverview, "compliance_overview_placeholder.json")}
            style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", border: `1px solid ${appTheme.colors.border}`, background: "#0b1220", color: appTheme.colors.text, cursor: "pointer" }}
            aria-label="导出合规概览 JSON"
          >
            导出 JSON
          </button>
        </div>
        <ul style={listBaseStyle}>
          <li>
            <strong>WARNING</strong>：文档分析上下文缺失 - 待 Task 8 输入
          </li>
          <li>
            <strong>INFO</strong>：审计日志未同步 - Task 12.3/12.4 负责接入
          </li>
          <li>
            <strong>CRITICAL</strong>：内容生成未审批 - 默认 fail-closed
          </li>
        </ul>
        <p style={{ color: appTheme.colors.muted, fontSize: "0.9rem" }}>
          TODO: 12.2 属性测试/条件、12.3 列表刷新与原始数据对齐。
        </p>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>合规评分趋势（占位）</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 180px" }}>
            <strong>本周合规评分</strong>
            <p style={{ margin: "0.25rem 0", color: appTheme.colors.muted }}>65 分（占位）</p>
          </div>
          <div style={{ flex: "1 1 180px" }}>
            <strong>上周违规次数</strong>
            <p style={{ margin: "0.25rem 0", color: appTheme.colors.muted }}>3 次（占位）</p>
          </div>
          <div style={{ flex: "1 1 180px" }}>
            <strong>风险趋势</strong>
            <p style={{ margin: "0.25rem 0", color: appTheme.colors.muted }}>上升（占位）</p>
          </div>
        </div>
        <p style={{ color: appTheme.colors.muted, fontSize: "0.9rem" }}>
          图表与动态数据将在 Task 12.1+ 之后实现，此处仅保留数据结构说明。
        </p>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>属性测试占位</h3>
        <ul style={{ ...listBaseStyle, paddingLeft: "0.75rem" }}>
          {propertyChecks.map((check) => (
            <li key={check.id} style={{ marginBottom: "0.5rem" }}>
              <strong>{check.id}：</strong> {check.description}
              <div style={{ fontSize: "0.85rem", color: appTheme.colors.muted }}>
                [{check.status}] {check.notes}
              </div>
            </li>
          ))}
        </ul>
        <p style={{ color: appTheme.colors.muted, fontSize: "0.85rem" }}>
          TODO: 用 Task 12.2 定义的真实策略替换上述 PASS/WARN 状态，并连接实际指标。
        </p>
      </section>
    </main>
  );
}

