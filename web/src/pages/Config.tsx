import { useState } from "react";
import { appTheme } from "../theme";

type ConfigItem = {
  key: string;
  label: string;
  value: string;
  description: string;
  editable: boolean;
};

const cardStyle: React.CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
  marginBottom: "1rem",
};

const muted = { color: appTheme.colors.muted, fontSize: "0.9rem" };

const sampleConfigs: ConfigItem[] = [
  { key: "feature.realtime", label: "实时通知", value: "enabled", description: "占位：后端控制实时通道", editable: false },
  { key: "feature.audit", label: "审计记录", value: "enabled", description: "占位：不可关闭", editable: false },
  { key: "workflow.approvalRequired", label: "人审必选", value: "true", description: "占位：默认 fail-closed", editable: false },
  { key: "ui.theme", label: "主题", value: "dark", description: "占位：仅本地主题", editable: true },
  { key: "export.format", label: "导出格式", value: "json", description: "占位：仅支持 JSON", editable: true },
];

export function Config() {
  const [configs, setConfigs] = useState<ConfigItem[]>(sampleConfigs);

  const onToggle = (key: string) => {
    setConfigs((prev) =>
      prev.map((c) =>
        c.key === key
          ? { ...c, value: c.value === "enabled" ? "disabled" : "enabled" }
          : c,
      ),
    );
  };

  return (
    <main style={{ padding: "1.5rem", maxWidth: "960px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>系统配置（占位）</h1>
      <p style={{ ...muted, marginBottom: "1rem" }}>
        Task 17.5 骨架：只读为主，带少量可视修改占位按钮，并提示需要后端/权限。
      </p>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>配置项</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {configs.map((cfg) => (
            <div
              key={cfg.key}
              style={{
                border: `1px dashed ${appTheme.colors.border}`,
                borderRadius: "8px",
                padding: "0.75rem",
                background: "#0b1220",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{cfg.label}</div>
                  <div style={{ ...muted, fontSize: "0.85rem" }}>{cfg.description}</div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span
                    style={{
                      padding: "0.15rem 0.5rem",
                      borderRadius: "6px",
                      background: cfg.value === "enabled" ? "#16a34a" : "#f97316",
                      color: "#0b1220",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    {cfg.value}
                  </span>
                  {cfg.editable ? (
                    <button
                      onClick={() => onToggle(cfg.key)}
                      style={{
                        padding: "0.45rem 0.75rem",
                        borderRadius: "6px",
                        border: `1px solid ${appTheme.colors.border}`,
                        background: "#0b1220",
                        color: appTheme.colors.text,
                        cursor: "pointer",
                      }}
                      aria-label={`切换 ${cfg.label}`}
                    >
                      切换（占位）
                    </button>
                  ) : (
                    <span style={{ ...muted, fontSize: "0.85rem" }}>只读</span>
                  )}
                </div>
              </div>
              {!cfg.editable && (
                <p style={{ ...muted, margin: "0.35rem 0 0 0", fontSize: "0.85rem" }}>
                  需后端与权限控制，当前仅展示。
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>保存与权限（占位）</h3>
        <p style={{ ...muted, marginBottom: "0.75rem" }}>
          当前页面不写入后端。实际保存需要后端 API 与角色权限，默认 fail-closed。
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            style={{
              padding: "0.6rem 0.9rem",
              borderRadius: "6px",
              border: `1px solid ${appTheme.colors.border}`,
              background: "#0b1220",
              color: appTheme.colors.text,
              cursor: "pointer",
            }}
            disabled
            title="占位：未接后端"
          >
            保存（占位）
          </button>
          <button
            style={{
              padding: "0.6rem 0.9rem",
              borderRadius: "6px",
              border: `1px solid ${appTheme.colors.border}`,
              background: "#0b1220",
              color: appTheme.colors.text,
              cursor: "pointer",
            }}
            disabled
            title="占位：未接权限系统"
          >
            角色/权限设置（占位）
          </button>
        </div>
      </section>

      <section style={cardStyle}>
        <h3 style={{ marginTop: 0 }}>属性测试占位</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>属性22：</strong> 配置项默认只读，变更需权限 <span style={{ ...muted, fontSize: "0.85rem" }}>[PASS] 只读为主，少量可视切换</span>
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>属性23：</strong> 变更操作需后端确认 <span style={{ ...muted, fontSize: "0.85rem" }}>[WARN] 未接后端，保存按钮禁用</span>
          </li>
        </ul>
      </section>
    </main>
  );
}

