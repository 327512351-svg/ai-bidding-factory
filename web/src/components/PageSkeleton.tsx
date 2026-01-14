import { appTheme } from "../theme";

export function PageSkeleton({ title }: { title: string }) {
  return (
    <section
      style={{
        padding: "1.5rem",
        margin: "1rem",
        borderRadius: "12px",
        background: appTheme.colors.panel,
        border: `1px solid ${appTheme.colors.border}`,
      }}
    >
      <div
        style={{
          width: "40%",
          height: "24px",
          background: "#1f2937",
          borderRadius: "6px",
          marginBottom: "1rem",
        }}
      />
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {[...Array(3)].map((_, idx) => (
          <div
            key={idx}
            style={{
              width: "120px",
              height: "12px",
              background: "#1f2937",
              borderRadius: "4px",
            }}
          />
        ))}
      </div>
      <p style={{ color: appTheme.colors.muted, marginTop: "1rem" }}>
        {title} 正在加载，当前为占位加载提示。
      </p>
    </section>
  );
}
