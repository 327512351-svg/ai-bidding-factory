import { useSelector } from "react-redux";
import { appTheme } from "../theme";
import { RootState } from "../state/types";
import { auditEntries, complianceOverview } from "../data/complianceData";
import { workflowSteps } from "../data/workflowData";
import { sampleNotifications } from "../data/notificationsData";

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
  marginBottom: "1rem",
};

const muted = { color: appTheme.colors.muted, fontSize: "0.9rem" };

export function Monitoring() {
  const notifState = useSelector((s: RootState) => s.notifications);

  const indicators = [
    {
      label: "通知通道",
      value: notifState?.status ?? "disconnected",
      notes: notifState?.lastError ? `警告：${notifState.lastError}` : "占位：未接真实 WS",
    },
    {
      label: "审计条目数",
      value: auditEntries.length.toString(),
      notes: "占位：静态样例",
    },
    {
      label: "流程阶段数",
      value: workflowSteps.length.toString(),
      notes: "占位：静态阶段列表",
    },
    {
      label: "合规概览项",
      value: complianceOverview.length.toString(),
      notes: "占位：静态概览",
    },
  ];

  const recentNotifications = [...sampleNotifications, ...notifState.items ?? []]
    .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
    .slice(0, 5);

  return (
    <main style={{ padding: "1.5rem", maxWidth: "1080px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>系统监控（占位）</h1>
      <p style={{ ...muted, marginBottom: "1rem" }}>
        Task 17.3 骨架：聚合通知/审计/流程/合规状态，均为占位数据，未接真实后端。
      </p>

      <section style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {indicators.map((ind) => (
          <div key={ind.label} style={{ ...cardStyle, flex: "1 1 220px", minWidth: "220px" }}>
            <h3 style={{ margin: 0 }}>{ind.label}</h3>
            <div style={{ fontSize: "1.3rem", fontWeight: 600 }}>{ind.value}</div>
            <div style={{ ...muted, fontSize: "0.9rem" }}>{ind.notes}</div>
          </div>
        ))}
      </section>

      <section style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ marginTop: 0 }}>通知与告警（占位）</h3>
          <span style={{ ...muted, fontSize: "0.9rem" }}>最多显示 5 条</span>
        </div>
        {recentNotifications.length === 0 ? (
          <p style={muted}>暂无通知（占位）</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {recentNotifications.map((n) => (
              <div
                key={`${n.id}-${n.timestamp}`}
                style={{
                  border: `1px dashed ${appTheme.colors.border}`,
                  borderRadius: "8px",
                  padding: "0.75rem",
                  background: "#0b1220",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 600 }}>{n.title}</div>
                  <span
                    style={{
                      padding: "0.15rem 0.5rem",
                      borderRadius: "6px",
                      background: n.level === "error" ? "#ef4444" : n.level === "warning" ? "#f59e0b" : "#38bdf8",
                      color: "#0b1220",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    {n.level}
                  </span>
                </div>
                <p style={{ ...muted, margin: "0.35rem 0" }}>{n.message}</p>
                <div style={{ ...muted, fontSize: "0.85rem" }}>
                  {n.timestamp} · {n.read ? "已读" : "未读"}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>属性测试占位</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>属性23：</strong> 监控聚合通知/审计/流程状态 <span style={{ ...muted, fontSize: "0.85rem" }}>[WARN] 占位数据，需后端数据源</span>
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>属性17.3：</strong> 连接状态可视化 <span style={{ ...muted, fontSize: "0.85rem" }}>[WARN] 通知通道状态基于本地 mock</span>
          </li>
        </ul>
      </section>
    </main>
  );
}

