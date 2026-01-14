import { useMemo, useState } from "react";
import { appTheme } from "../theme";
import { downloadJson } from "../utils/download";
import { auditEntries } from "../data/complianceData";
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

type TemplateId = "summary" | "audit" | "notifications" | "workflow";

const templates: { id: TemplateId; title: string; desc: string }[] = [
  { id: "summary", title: "系统概览（占位）", desc: "聚合合规/审计/通知/流程的摘要，占位模板" },
  { id: "audit", title: "审计报告（占位）", desc: "展示审计条目，仍为静态数据" },
  { id: "notifications", title: "通知报告（占位）", desc: "展示最近通知列表，静态样例" },
  { id: "workflow", title: "流程进度（占位）", desc: "展示当前流程阶段列表，占位数据" },
];

function buildPayload(id: TemplateId) {
  switch (id) {
    case "audit":
      return { template: id, entries: auditEntries };
    case "notifications":
      return { template: id, items: sampleNotifications };
    case "workflow":
      return { template: id, steps: workflowSteps };
    case "summary":
    default:
      return {
        template: id,
        summary: {
          complianceStatus: "占位：未接入",
          auditCount: auditEntries.length,
          notificationCount: sampleNotifications.length,
          workflowSteps: workflowSteps.length,
        },
        auditPreview: auditEntries.slice(0, 2),
        notificationPreview: sampleNotifications.slice(0, 2),
        workflowPreview: workflowSteps.slice(0, 3),
      };
  }
}

export function Reports() {
  const [selected, setSelected] = useState<TemplateId>("summary");
  const payload = useMemo(() => buildPayload(selected), [selected]);

  return (
    <main style={{ padding: "1.5rem", maxWidth: "1080px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>报告生成（占位）</h1>
      <p style={{ ...muted, marginBottom: "1rem" }}>
        Task 16.1/16.2 骨架：提供报告模板选择与导出占位，不含真实后端/样式导出，仅下载 JSON。
      </p>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>选择报告模板</h3>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setSelected(tpl.id)}
              style={{
                padding: "0.6rem 0.9rem",
                borderRadius: "6px",
                border: `1px solid ${appTheme.colors.border}`,
                background: selected === tpl.id ? "#38bdf8" : "#0b1220",
                color: selected === tpl.id ? "#0b1220" : appTheme.colors.text,
                cursor: "pointer",
              }}
              aria-pressed={selected === tpl.id}
            >
              {tpl.title}
            </button>
          ))}
        </div>
        <p style={{ ...muted, marginTop: "0.75rem" }}>{templates.find((t) => t.id === selected)?.desc}</p>
      </section>

      <section style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ marginTop: 0 }}>报告预览（占位）</h3>
          <button
            onClick={() => downloadJson(payload, `${selected}_report_placeholder.json`)}
            style={{ padding: "0.6rem 0.9rem", borderRadius: "6px", border: `1px solid ${appTheme.colors.border}`, background: "#0b1220", color: appTheme.colors.text, cursor: "pointer" }}
            aria-label="导出报告 JSON"
          >
            导出 JSON
          </button>
        </div>
        <pre
          style={{
            background: "#0b1220",
            border: `1px solid ${appTheme.colors.border}`,
            borderRadius: "8px",
            padding: "0.75rem",
            overflowX: "auto",
            color: "#e5e7eb",
            fontSize: "0.9rem",
          }}
        >
{JSON.stringify(payload, null, 2)}
        </pre>
        <p style={{ ...muted, marginTop: "0.5rem" }}>
          TODO: 后续可接入真实后端生成报告、模板配置和文件导出（PDF/CSV）。当前仅占位 JSON。
        </p>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>属性测试占位</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>属性20：</strong> 报告模板可选且可导出（占位） <span style={{ ...muted, fontSize: "0.85rem" }}>[PASS] 模板可切换并导出 JSON，占位</span>
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>属性20-扩展：</strong> 报告包含审计/通知/流程片段 <span style={{ ...muted, fontSize: "0.85rem" }}>[WARN] 数据为静态样例，需后续接入真实数据源</span>
          </li>
        </ul>
      </section>
    </main>
  );
}

