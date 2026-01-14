import { appTheme } from "../theme";

type Props = {
  title: string;
  message: string;
  details?: string;
  onRetry?: () => void;
  onHome?: () => void;
};

export function ErrorNotice({ title, message, details, onRetry, onHome }: Props) {
  return (
    <div
      style={{
        padding: "1.5rem",
        maxWidth: "720px",
        margin: "2rem auto",
        border: `1px solid ${appTheme.colors.border}`,
        borderRadius: "10px",
        background: appTheme.colors.panel,
      }}
      role="alert"
    >
      <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>{title}</h2>
      <p style={{ color: appTheme.colors.muted, margin: "0.35rem 0" }}>{message}</p>
      {details && <p style={{ color: appTheme.colors.muted, margin: "0.35rem 0" }}>{details}</p>}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
        {onRetry && (
          <button
            onClick={onRetry}
            style={buttonStyle}
            aria-label="重试（占位）"
          >
            重试（占位）
          </button>
        )}
        {onHome && (
          <button
            onClick={onHome}
            style={buttonStyle}
            aria-label="返回首页"
          >
            返回首页
          </button>
        )}
        {!onRetry && !onHome && (
          <span style={{ color: appTheme.colors.muted, fontSize: "0.9rem" }}>
            当前无自动恢复，请人工检查（占位）。
          </span>
        )}
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: "0.65rem 1rem",
  borderRadius: "6px",
  border: `1px solid ${appTheme.colors.border}`,
  background: "#0b1220",
  color: appTheme.colors.text,
  cursor: "pointer",
};

