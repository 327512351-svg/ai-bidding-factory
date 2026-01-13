import { appTheme } from "../theme";

interface Check {
  name: string;
  status: "PASS" | "WARN";
  notes?: string;
}

export function DocumentsCheckpoint() {
  const checks: Check[] = [
    { name: "上传入口可见（拖拽/点击）", status: "PASS" },
    { name: "格式/大小校验（PDF/DOC/DOCX, ≤5MB）", status: "PASS" },
    { name: "上传队列/进度展示", status: "PASS" },
    {
      name: "批量操作/取消",
      status: "WARN",
      notes: "目前仅从本地列表移除文档；无后端同步（占位）",
    },
    {
      name: "文档预览/下载",
      status: "WARN",
      notes: "下载提示为占位，预览仅显示文件信息",
    },
    {
      name: "审计/上传日志",
      status: "WARN",
      notes: "未接入 traceability/audit，需 Task 8+ 完善",
    },
  ];

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1>文档管理检查点（占位）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 7 checkpoint：手动自检文档管理模块是否按占位要求存在。
      </p>
      <section
        style={{
          border: `1px solid ${appTheme.colors.border}`,
          borderRadius: "8px",
          padding: "1rem",
          background: appTheme.colors.panel,
          maxWidth: "720px",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {checks.map((check) => (
            <li
              key={check.name}
              style={{
                padding: "0.5rem 0",
                borderBottom: `1px solid ${appTheme.colors.border}`,
              }}
            >
              <strong style={{ color: check.status === "PASS" ? "#34d399" : "#f97316" }}>
                [{check.status}]
              </strong>{" "}
              {check.name}
              {check.notes ? (
                <div style={{ color: appTheme.colors.muted, fontSize: "0.95rem" }}>{check.notes}</div>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

