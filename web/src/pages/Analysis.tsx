import { appTheme } from "../theme";

type Confidence = "high" | "medium" | "low" | "unknown";

interface RequirementItem {
  id: string;
  title: string;
  type: "mandatory" | "optional" | "ambiguous";
  confidence: Confidence;
  notes?: string;
  trace?: { documentId: string; location: string };
}

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
};

function ConfidenceBadge({ value }: { value: Confidence }) {
  const color =
    value === "high"
      ? "#34d399"
      : value === "medium"
        ? "#fbbf24"
        : value === "low"
          ? "#fb7185"
          : appTheme.colors.muted;
  const label = value.toUpperCase();
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "999px",
        border: `1px solid ${appTheme.colors.border}`,
        color,
        fontSize: "0.85rem",
      }}
    >
      {label}
    </span>
  );
}

export function Analysis() {
  // Placeholder analysis output (Task 8.1): no backend integration.
  const requirements: RequirementItem[] = [
    {
      id: "req-001",
      title: "示例需求（占位）",
      type: "mandatory",
      confidence: "unknown",
      notes: "TODO：接入后端分析结果并展示真实字段",
      trace: { documentId: "doc-demo", location: "p.1#L1-L3 (placeholder)" },
    },
    {
      id: "req-002",
      title: "示例可选项（占位）",
      type: "optional",
      confidence: "unknown",
      notes: "TODO：分类展示 + 评分/置信度来源说明",
      trace: { documentId: "doc-demo", location: "p.2#L8-L10 (placeholder)" },
    },
    {
      id: "req-003",
      title: "示例模糊条款（占位）",
      type: "ambiguous",
      confidence: "unknown",
      notes: "TODO：标记模糊内容并提示人工确认",
      trace: { documentId: "doc-demo", location: "p.3#L2-L6 (placeholder)" },
    },
  ];

  const groups = {
    mandatory: requirements.filter((r) => r.type === "mandatory"),
    optional: requirements.filter((r) => r.type === "optional"),
    ambiguous: requirements.filter((r) => r.type === "ambiguous"),
  };

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>分析结果（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 8：分析结果展示骨架。当前仅渲染静态占位结构，不做真实评分/解析/跳转。
      </p>

      <section style={{ ...cardStyle, marginBottom: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>概览（占位）</h3>
        <ul style={{ margin: 0, paddingLeft: "1rem", color: appTheme.colors.muted }}>
          <li>总需求数：{requirements.length}</li>
          <li>强制：{groups.mandatory.length}，可选：{groups.optional.length}，模糊：{groups.ambiguous.length}</li>
          <li>置信度/评分：占位（unknown）</li>
        </ul>
      </section>

      <section style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>强制要求（占位）</h3>
          <RequirementList items={groups.mandatory} />
        </div>
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>可选要求（占位）</h3>
          <RequirementList items={groups.optional} />
        </div>
      </section>

      <section style={{ ...cardStyle, marginTop: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>模糊内容与标注（占位）</h3>
        <p style={{ color: appTheme.colors.muted, marginTop: 0 }}>
          Task 8.3：后续会实现高亮/颜色编码/提示组件。当前仅列表展示并提醒人工确认。
        </p>
        <RequirementList items={groups.ambiguous} />
      </section>

      <section style={{ ...cardStyle, marginTop: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>可追溯性链接（占位）</h3>
        <p style={{ color: appTheme.colors.muted, marginTop: 0 }}>
          Task 8.4：后续会把 trace 跳转到文档查看器（含定位/历史）。当前仅显示占位位置字符串。
        </p>
        <ul style={{ margin: 0, paddingLeft: "1rem", color: appTheme.colors.muted }}>
          {requirements.map((r) => (
            <li key={r.id}>
              <strong>{r.id}</strong> → {r.trace?.documentId ?? "—"} / {r.trace?.location ?? "—"}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );

  function RequirementList({ items }: { items: RequirementItem[] }) {
    if (items.length === 0) {
      return <div style={{ color: appTheme.colors.muted }}>无数据（占位）。</div>;
    }
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: `1px solid ${appTheme.colors.border}`,
              borderRadius: "8px",
              padding: "0.75rem",
              background:
                item.type === "mandatory"
                  ? "rgba(16, 185, 129, 0.08)"
                  : item.type === "optional"
                    ? "rgba(59, 130, 246, 0.08)"
                    : "rgba(245, 158, 11, 0.10)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem" }}>
              <div>
                <strong>{item.title}</strong>
                <div style={{ color: appTheme.colors.muted, fontSize: "0.9rem" }}>
                  ID: {item.id} · 类型: {item.type}
                </div>
              </div>
              <ConfidenceBadge value={item.confidence} />
            </div>
            {item.notes ? (
              <div style={{ color: appTheme.colors.muted, marginTop: "0.5rem" }}>{item.notes}</div>
            ) : null}
            {item.trace ? (
              <div style={{ color: appTheme.colors.muted, marginTop: "0.25rem", fontSize: "0.9rem" }}>
                Trace: {item.trace.documentId} / {item.trace.location}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
}

