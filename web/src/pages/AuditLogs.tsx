import { appTheme } from "../theme";
import { auditEntries } from "../data/complianceData";

const panelStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
  marginBottom: "1rem",
};

const logRowStyle: React.CSSProperties = {
  marginBottom: "0.75rem",
  padding: "0.5rem",
  borderBottom: `1px solid ${appTheme.colors.border}`,
  color: appTheme.colors.muted,
};

const propertyChecks = [
  {
    id: "属性13",
    description: "审计条目包含 action/status/actor/timestamp 字段",
    status: auditEntries.every((entry) => entry.action && entry.status && entry.actor && entry.timestamp) ? "PASS" : "WARN",
    notes: "当前用占位数组模拟，后续 Task 12.4 将接入真实 JSONL",
  },
  {
    id: "属性14",
    description: "审计日志按时间顺序递减排序",
    status: auditEntries.every((entry, idx, arr) => {
      if (idx === 0) return true;
      return arr[idx - 1].timestamp >= entry.timestamp;
    })
      ? "PASS"
      : "WARN",
    notes: "后续需从 traceability/alerting 的 audit store 读取。",
  },
];

export function AuditLogs() {
  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>审计日志查看器（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 12.3/12.4 骨架：提供日志搜索、筛选、与 property 测试占位。
      </p>

      <section style={panelStyle}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>搜索（占位）：</label>
        <input
          placeholder="输入关键字..."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #1f2937",
            background: "#0b1220",
            color: "#e5e7eb",
          }}
        />
        <p style={{ color: appTheme.colors.muted, fontSize: "0.85rem", marginTop: "0.5rem" }}>
          TODO: 12.4 属性测试 + 连接实际审计流。本内置过滤器仅展示静态布局。
        </p>
      </section>

      <section style={panelStyle}>
        <h3 style={{ marginTop: 0 }}>审计条目（占位）</h3>
        {auditEntries.map((log) => (
          <div key={log.id} style={logRowStyle}>
            <div>
              <strong>{log.action}</strong> · {log.status} · {log.actor}
            </div>
            <div style={{ fontSize: "0.9rem" }}>
              ID: {log.id} · {log.timestamp}
            </div>
          </div>
        ))}
        <p style={{ color: appTheme.colors.muted, fontSize: "0.85rem" }}>
          真实日志应来自 compliance/traceability/alerting 模块的持久数据，当前仅展示结构说明。
        </p>
      </section>

      <section style={panelStyle}>
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

