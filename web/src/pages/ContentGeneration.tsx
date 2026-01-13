import { FormEvent, useMemo, useState } from "react";
import { appTheme } from "../theme";

type GenerationStatus = "idle" | "queued" | "in_progress" | "ready" | "requires_human_review";

interface TemplateOption {
  id: string;
  name: string;
  focus: string;
  description: string;
}

interface PreviewData {
  title: string;
  summary: string;
  slots: string[];
}

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
};

const templates: TemplateOption[] = [
  {
    id: "template-01",
    name: "标准合规响应",
    focus: "合规偏好",
    description: "聚焦风险缓释措施与合规宣言，强调 fail-closed 语义。",
  },
  {
    id: "template-02",
    name: "技术能力简述",
    focus: "技术亮点",
    description: "强调交付能力和工程实践，占位说明未来可接真实模型。",
  },
  {
    id: "template-03",
    name: "执行计划大纲",
    focus: "计划与里程碑",
    description: "强调阶段化执行、审计与追溯，内容仅占位。",
  },
];

export function ContentGeneration() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0].id);
  const [tone, setTone] = useState("professional");
  const [detailLevel, setDetailLevel] = useState("summary");
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? templates[0],
    [selectedTemplateId]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("queued");
    setProgress(20);
    setTimeout(() => {
      setStatus("in_progress");
      setProgress(60);
      const placeholder = buildPreview(selectedTemplate, tone, detailLevel);
      setPreview(placeholder);
      setTimeout(() => {
        setStatus("ready");
        setProgress(100);
      }, 250);
    }, 250);
  };

  const handlePreviewReset = () => {
    setPreview(null);
    setStatus("idle");
    setProgress(0);
  };

  const history = [
    { id: "run-001", bundle: "标准合规响应", timestamp: "just now", result: "requires_human_review" },
    { id: "run-000", bundle: "技术能力简述", timestamp: "placeholder", result: "ready" },
  ];

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.25rem" }}>内容生成（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1.25rem" }}>
        Task 9：模板选择、参数配置、生成进度与预览均为占位交互。实际生成/模型调用尚未实现。
      </p>

      <section style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}>
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>模板选择</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {templates.map((template) => (
              <label
                key={template.id}
                style={{
                  border: `1px solid ${
                    template.id === selectedTemplateId ? appTheme.colors.link : appTheme.colors.border
                  }`,
                  borderRadius: "8px",
                  padding: "0.75rem",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="template"
                  value={template.id}
                  checked={template.id === selectedTemplateId}
                  onChange={() => setSelectedTemplateId(template.id)}
                  style={{ marginRight: "0.5rem" }}
                />
                <strong>{template.name}</strong>
                <div style={{ color: appTheme.colors.muted, fontSize: "0.9rem" }}>
                  {template.description}
                </div>
                <div style={{ color: appTheme.colors.muted, fontSize: "0.85rem" }}>
                  重点：{template.focus}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>参数 & 生成控制</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              语气
              <select value={tone} onChange={(event) => setTone(event.target.value)}>
                <option value="professional">正式</option>
                <option value="concise">简洁</option>
                <option value="assertive">坚定</option>
              </select>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              细节层级
              <select value={detailLevel} onChange={(event) => setDetailLevel(event.target.value)}>
                <option value="summary">概述</option>
                <option value="detail">细节</option>
                <option value="bullet">条列</option>
              </select>
            </label>
            <button type="submit" style={generateButtonStyle}>
              生成（占位）
            </button>
            <button type="button" onClick={handlePreviewReset} style={actionButtonStyle}>
              重置占位
            </button>
          </form>
          <div style={{ marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>状态：{status}</span>
              <span>进度：{progress}%</span>
            </div>
            <progress value={progress} max={100} style={{ width: "100%", marginTop: "0.25rem" }} />
            <p style={{ color: appTheme.colors.muted, marginTop: "0.5rem" }}>
              fail-closed：需要人工审查的路径会在后续 Task 10/11 明确。
            </p>
          </div>
        </div>
      </section>

      <section style={{ ...cardStyle, marginTop: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>预览（占位）</h3>
        {preview ? (
          <div>
            <h4 style={{ margin: "0 0 0.25rem 0" }}>{preview.title}</h4>
            <p style={{ margin: 0 }}>{preview.summary}</p>
            <ul style={{ marginTop: "0.5rem", paddingLeft: "1rem", color: appTheme.colors.muted }}>
              {preview.slots.map((slot, idx) => (
                <li key={`${slot}-${idx}`}>{slot}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p style={{ color: appTheme.colors.muted, margin: 0 }}>
            尚未生成内容，点击“生成（占位）”后展示。
          </p>
        )}
      </section>

      <section style={{ ...cardStyle, marginTop: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>历史占位运行</h3>
        <ul style={{ margin: 0, paddingLeft: "1rem", color: appTheme.colors.muted }}>
          {history.map((entry) => (
            <li key={entry.id}>
              {entry.bundle} · {entry.timestamp} · 结果：{entry.result}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );

  function buildPreview(template: TemplateOption, tone: string, detail: string): PreviewData {
    return {
      title: `${template.name} · ${tone} · ${detail}`,
      summary: `占位摘要：按 ${template.focus} 构建（无实际生成）。`,
      slots: [
        "Slot 1：合规声明占位",
        "Slot 2：技术能力框架占位",
        "Slot 3：执行计划/里程碑占位",
      ],
    };
  }
}

const generateButtonStyle: React.CSSProperties = {
  padding: "0.65rem 1rem",
  borderRadius: "6px",
  border: "none",
  background: appTheme.colors.link,
  color: appTheme.colors.background,
  cursor: "pointer",
};

const actionButtonStyle: React.CSSProperties = {
  padding: "0.35rem 0.9rem",
  borderRadius: "6px",
  border: "1px solid rgba(148, 163, 184, 0.4)",
  background: "transparent",
  color: appTheme.colors.text,
  cursor: "pointer",
};
