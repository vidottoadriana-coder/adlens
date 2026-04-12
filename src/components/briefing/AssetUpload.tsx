"use client";

import { useCallback, useRef, useState } from "react";
import { AssetFile } from "@/types";

const ACCEPTED = ["image/png", "image/jpeg", "image/svg+xml", "application/pdf"];
const ACCEPTED_EXT = ".png,.jpg,.jpeg,.svg,.pdf";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function PdfIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-red-400">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="18" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remover arquivo"
      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-red-400 hover:border-red-400 transition-colors shadow-sm"
    >
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="1" y1="1" x2="11" y2="11"/>
        <line x1="11" y1="1" x2="1" y2="11"/>
      </svg>
    </button>
  );
}

export default function AssetUpload({
  assets,
  onChange,
}: {
  assets: AssetFile[];
  onChange: (assets: AssetFile[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const processFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newAssets: AssetFile[] = [];

      Array.from(files).forEach((file) => {
        if (!ACCEPTED.includes(file.type)) return;

        const isImage = file.type !== "application/pdf";
        const preview = isImage ? URL.createObjectURL(file) : null;

        newAssets.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
          preview,
        });
      });

      onChange([...assets, ...newAssets]);
    },
    [assets, onChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Reset input so o mesmo arquivo pode ser enviado novamente
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const removeAsset = (id: string) => {
    const asset = assets.find((a) => a.id === id);
    if (asset?.preview) URL.revokeObjectURL(asset.preview);
    onChange(assets.filter((a) => a.id !== id));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 cursor-pointer transition-all duration-200 select-none ${
          dragOver
            ? "border-[#005fff] bg-[#005fff]/5"
            : "border-[var(--color-border)] hover:border-[#005fff]/50 hover:bg-[var(--color-surface)]"
        }`}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: dragOver ? "linear-gradient(135deg, #005fff, #d701b8)" : "var(--color-surface)" }}
        >
          <span className={dragOver ? "text-white" : "text-[var(--color-muted)]"}>
            <UploadIcon />
          </span>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-[var(--color-foreground)]">
            {dragOver ? "Solte para adicionar" : "Arraste os assets aqui"}
          </p>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">
            ou{" "}
            <span className="text-[#005fff] font-semibold">clique para selecionar</span>
            {" "}— PNG, JPG, SVG ou PDF
          </p>
        </div>

        {assets.length > 0 && (
          <p className="text-xs text-[var(--color-muted)]">
            {assets.length} {assets.length === 1 ? "arquivo adicionado" : "arquivos adicionados"} · clique para adicionar mais
          </p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXT}
          multiple
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {/* Previews */}
      {assets.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {assets.map((asset) => (
            <div key={asset.id} className="relative group">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                {asset.preview ? (
                  /* Preview de imagem */
                  <div className="aspect-video relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.preview}
                      alt={asset.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  /* Placeholder para PDF */
                  <div className="aspect-video flex flex-col items-center justify-center gap-1 bg-red-500/5">
                    <PdfIcon />
                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">PDF</span>
                  </div>
                )}

                <div className="px-2.5 py-2 border-t border-[var(--color-border)]">
                  <p className="text-xs font-medium text-[var(--color-foreground)] truncate">
                    {asset.file.name}
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {formatBytes(asset.file.size)}
                  </p>
                </div>
              </div>

              <RemoveButton onClick={() => removeAsset(asset.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
