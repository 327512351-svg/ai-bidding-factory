import { useState } from "react";
import { appTheme } from "../theme";

type ReviewStatus = "requires_human_review" | "approved" | "rejected";

interface ReviewItem {
  id: string;
  title: string;
  type: "content" | "compliance" | "trace";
  status: ReviewStatus;
  priority: "high" | "normal" | "low";
  summary: string;
  updatedAt: string;
}

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
};

const actionButtonStyle: React.CSSProperties = {
  padding: "0.35rem 0.85rem",
  borderRadius: "6px",
  border: "1px solid rgba(148, 163, 184, 0.4)",
  background: "transparent",
  color: appTheme.colors.text,
  cursor: "pointer",
};

export function Review() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const items: ReviewItem[] = [
    {
      id: "rev-001",
      title: "合规检查占位",
      type: "compliance",
      status: "requires_human_review",
      priority: "high",
      summary: "占位：合规警告，需要人工确认。",
      updatedAt: "just now",
    },
    {
      id: "rev-002",
      title: "内容生成占位",
      type: "content",
      status: "requires_human_review",
      priority: "normal",
      summary: "占位：自动生成的片段需要审核。",
      updatedAt: "1 min ago",
    },
  ];

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>人工审核队列（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 10：仅提供队列/筛选/详情的占位 UI，默认 fail-closed：所有项均需人工确认，不做自动决策。
      </p>

      <section style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1.2fr" }}>
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>队列</h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
            <button style={actionButtonStyle} onClick={() => alert("筛选占位：未实现")}>
              筛选
            </button>
            <button style={actionButtonStyle} onClick={() => alert("批量操作占位：未实现")}>
              批量操作
            </button>
            <button style={actionButtonStyle} onClick={() => alert("排序占位：未实现")}>
              排序
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                style={{
                  border: `1px solid ${
                    item.id === selected.id ? appTheme.colors.link : appTheme.colors.border
                  }`,
                  borderRadius: "8px",
                  padding: "0.75rem",
                  cursor: "pointer",
                  background: "rgba(148, 163, 184, 0.06)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{item.title}</strong>
                  <span style={{ color: appTheme.colors.muted, fontSize: "0.85rem" }}>
                    {item.updatedAt}
                  </span>
                </div>
                <div style={{ color: appTheme.colors.muted, fontSize: "0.9rem" }}>
                  类型：{item.type} · 状态：{item.status} · 优先级：{item.priority}
                </div>
                <div style={{ color: appTheme.colors.muted, fontSize: "0.9rem", marginTop: "0.35rem" }}>
                  {item.summary}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>详情（占位）</h3>
          {selected ? (
            <div>
              <p style={{ margin: "0 0 0.25rem 0" }}>
                <strong>{selected.title}</strong>
              </p>
              <p style={{ color: appTheme.colors.muted, margin: "0 0 0.5rem 0" }}>
                类型：{selected.type} · 状态：{selected.status} · 优先级：{selected.priority}
              </p>
              <p style={{ margin: "0 0 0.75rem 0" }}>{selected.summary}</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button style={actionButtonStyle} onClick={() => alert("approve 占位，未实现")}>
                  审核通过（占位）
                </button>
                <button style={actionButtonStyle} onClick={() => alert("reject 占位，未实现")}>
                  审核拒绝（占位）
                </button>
              </div>

              <div style={{ marginTop: "0.9rem", paddingTop: "0.75rem", borderTop: `1px dashed ${appTheme.colors.border}` }}>
                <h4 style={{ margin: "0 0 0.35rem 0" }}>审核历史（占位）</h4>
                <p style={{ color: appTheme.colors.muted, margin: 0 }}>
                  当前未接入真实审计/留痕系统；历史记录仅为占位展示，任何结论需人工确认。
                </p>
                <ul style={{ color: appTheme.colors.muted, margin: "0.5rem 0 0 0", paddingLeft: "1.2rem" }}>
                  <li>2026-01-14 记录创建（占位）</li>
                  <li>待人工审核（占位）</li>
                </ul>
              </div>

              <p style={{ color: appTheme.colors.muted, marginTop: "0.75rem" }}>
                fail-closed：最终结论需人工确认；未接入审计/追溯/实际变更。
              </p>
            </div>
          ) : (
            <p style={{ color: appTheme.colors.muted }}>请选择一条记录。</p>
          )}
        </div>
      </section>
    </main>
  );
}

