import { ChangeEvent, CSSProperties, DragEvent, useRef, useState } from "react";
import { appTheme } from "../theme";

type DocumentStatus = "queued" | "uploaded" | "error";

interface DocumentRecord {
  id: string;
  name: string;
  size: number;
  type: string;
  status: DocumentStatus;
  message?: string;
  progress: number;
  timestamp: string;
}

const SUPPORTED_EXTENSIONS = ["pdf", "doc", "docx"];
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB

const cardStyle: CSSProperties = {
  border: `1px solid ${appTheme.colors.border}`,
  borderRadius: "8px",
  padding: "1rem",
  background: appTheme.colors.panel,
};

const formatBytes = (size: number) => {
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  if (size >= 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${size} B`;
};

const createId = () => {
  if (globalThis.crypto?.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export function Documents() {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getExtension = (name: string) => name.split(".").pop()?.toLowerCase() ?? "";

  const rejectFile = (name: string, reason: string) => {
    setFeedback(`文件 “${name}” 无法上传：${reason}`);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    setDragging(false);
    const newDocs: DocumentRecord[] = [];

    Array.from(files).forEach((file) => {
      const ext = getExtension(file.name);
      if (!SUPPORTED_EXTENSIONS.includes(ext)) {
        rejectFile(file.name, "不支持的格式，仅限 PDF/DOC/DOCX");
        newDocs.push({
          id: createId(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: "error",
          message: "格式不支持",
          progress: 0,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      if (file.size > MAX_UPLOAD_SIZE) {
        rejectFile(file.name, "文件大小超过 5MB");
        newDocs.push({
          id: createId(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: "error",
          message: "超过大小限制",
          progress: 0,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      newDocs.push({
        id: createId(),
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        status: "uploaded",
        message: "占位：本地模拟上传完成，实际上传待实现",
        progress: 100,
        timestamp: new Date().toISOString(),
      });
      setFeedback(`已添加 ${file.name} 至文档列表（占位上传）`);
    });

    setDocuments((prev) => [...newDocs, ...prev]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleCancel = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    if (selectedDocument === id) {
      setSelectedDocument(null);
    }
  };

  const docCounts = {
    total: documents.length,
    uploaded: documents.filter((doc) => doc.status === "uploaded").length,
    errors: documents.filter((doc) => doc.status === "error").length,
  };

  const activeDocument = documents.find((doc) => doc.id === selectedDocument);

  return (
    <main style={{ padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>文档管理（占位交互）</h1>
      <p style={{ color: appTheme.colors.muted, marginBottom: "1rem" }}>
        Task 6：实现上传/列表/查看占位控制。当前逻辑仅在浏览器内模拟上传流程，所有操作都保留 fail-closed 提示。
      </p>

      <section
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "1fr 1fr",
          marginBottom: "1rem",
        }}
      >
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>文档上传区（拖拽/点击）</h3>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={() => setDragging(true)}
            onDragLeave={() => setDragging(false)}
            style={{
              border: `1px dashed ${dragging ? appTheme.colors.link : appTheme.colors.border}`,
              borderRadius: "8px",
              padding: "1.25rem",
              textAlign: "center",
              color: appTheme.colors.muted,
              cursor: "pointer",
              minHeight: "120px",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            拖拽文件到此或点击选择（PDF/DOC/DOCX，≤5MB）
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />
          <p style={{ marginTop: "0.75rem", color: appTheme.colors.muted }}>
            {feedback || "未上传文件。"}
          </p>
        </div>

        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>上传状态（占位）</h3>
          <p style={{ margin: 0 }}>
            总计：{docCounts.total}，已上传：{docCounts.uploaded}，失败：{docCounts.errors}
          </p>
          <p style={{ color: appTheme.colors.muted, marginTop: "0.5rem" }}>
            进度展示即为完成提示，取消按钮可从列表移除占位文档。
          </p>
        </div>
      </section>

      <section style={{ ...cardStyle, marginTop: "0.5rem" }}>
        <h3 style={{ marginTop: 0 }}>文档列表</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {documents.length === 0 ? (
            <div style={{ color: appTheme.colors.muted }}>目前没有文档（占位空状态）。</div>
          ) : (
            documents.map((doc) => (
              <div
                key={doc.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem",
                  borderRadius: "6px",
                  background:
                    doc.status === "error"
                      ? "rgba(245, 158, 11, 0.15)"
                      : "rgba(16, 185, 129, 0.1)",
                }}
              >
                <div>
                  <strong>{doc.name}</strong>
                  <div style={{ fontSize: "0.85rem", color: appTheme.colors.muted }}>
                    {formatBytes(doc.size)} · {doc.status.toUpperCase()}
                    {doc.message ? ` · ${doc.message}` : ""}
                  </div>
                  <progress
                    value={doc.progress}
                    max={100}
                    style={{ width: "100%", marginTop: "0.25rem" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <button
                    onClick={() => setSelectedDocument(doc.id)}
                    style={{ ...actionButtonStyle }}
                  >
                    预览
                  </button>
                  <button
                    onClick={() => alert("下载占位：真实下载功能待实现")}
                    style={{ ...actionButtonStyle }}
                  >
                    下载
                  </button>
                  <button onClick={() => handleCancel(doc.id)} style={{ ...actionButtonStyle }}>
                    取消
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section style={{ ...cardStyle, marginTop: "1rem" }}>
        <h3 style={{ marginTop: 0 }}>文档查看器（占位）</h3>
        {activeDocument ? (
          <div>
            <p style={{ margin: 0 }}>
              当前预览：<strong>{activeDocument.name}</strong>
            </p>
            <p style={{ color: appTheme.colors.muted, marginTop: "0.5rem" }}>
              状态：{activeDocument.status} · ({activeDocument.timestamp})
            </p>
            <p style={{ color: appTheme.colors.muted, marginTop: "0.5rem" }}>
              TODO：PDF/Word 预览、导航、缩放/标注功能尚未接入。
            </p>
          </div>
        ) : (
          <p style={{ color: appTheme.colors.muted }}>请选择一份文档以查看详情（占位）。</p>
        )}
      </section>
    </main>
  );
}

const actionButtonStyle: React.CSSProperties = {
  padding: "0.25rem 0.75rem",
  borderRadius: "6px",
  border: "1px solid rgba(148, 163, 184, 0.4)",
  background: "transparent",
  color: appTheme.colors.text,
  cursor: "pointer",
};

