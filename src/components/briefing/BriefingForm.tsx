"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AssetFile, Briefing, Format, Objective, Platform, VisualContext } from "@/types";
import AssetUpload from "@/components/briefing/AssetUpload";

const MAX_COPIES = 6;
const MIN_COPIES = 2;
const MAX_CTAS = 4;
const MIN_CTAS = 2;

const objetivoOptions: { value: Objective; label: string }[] = [
  { value: "conversao", label: "Conversão" },
  { value: "trafego", label: "Tráfego" },
  { value: "awareness", label: "Awareness" },
  { value: "leads", label: "Captação de leads" },
  { value: "engajamento", label: "Engajamento" },
];

const formatoOptions: { value: Format; label: string }[] = [
  { value: "feed", label: "Feed" },
  { value: "stories", label: "Stories" },
  { value: "carrossel", label: "Carrossel" },
  { value: "banner", label: "Banner" },
  { value: "search", label: "Search" },
  { value: "display", label: "Display" },
];

const plataformaOptions: { value: Platform; label: string }[] = [
  { value: "meta", label: "Meta" },
  { value: "google", label: "Google Ads" },
  { value: "ambas", label: "Ambas" },
];

const contextoOptions: { value: VisualContext; label: string; desc: string }[] = [
  { value: "claro", label: "Fundo claro", desc: "Branco / cinza claro" },
  { value: "escuro", label: "Fundo escuro", desc: "Preto / navy" },
  { value: "ambos", label: "Ambos", desc: "Testar os dois" },
];

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between mb-2">
      <label className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
        {children}
      </label>
      {hint && (
        <span className="text-xs text-[var(--color-muted)] normal-case tracking-normal font-normal">
          {hint}
        </span>
      )}
    </div>
  );
}

function RemoveItemButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Remover"
      className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:text-red-400 hover:bg-red-400/10 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="1" y1="1" x2="11" y2="11" />
        <line x1="11" y1="1" x2="1" y2="11" />
      </svg>
    </button>
  );
}

function AddButton({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-colors self-start"
      style={{ color: "var(--color-accent)" }}
    >
      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-base leading-none">+</span>
      {children}
    </button>
  );
}

const inputBase =
  "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[#005fff] focus:border-transparent transition-all duration-200";

const selectBase =
  "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5 text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[#005fff] focus:border-transparent transition-all duration-200 appearance-none cursor-pointer";

export default function BriefingForm() {
  const router = useRouter();
  const [briefing, setBriefing] = useState<Briefing>({
    assets: [],
    copies: ["", ""],
    ctas: ["", ""],
    contextoVisual: "ambos",
    objetivo: "conversao",
    publicoAlvo: "",
    formato: "feed",
    plataforma: "meta",
  });
  const [loading, setLoading] = useState(false);

  // Copies
  const updateCopy = (index: number, value: string) => {
    const next = [...briefing.copies];
    next[index] = value;
    setBriefing((prev) => ({ ...prev, copies: next }));
  };

  const addCopy = () => {
    if (briefing.copies.length >= MAX_COPIES) return;
    setBriefing((prev) => ({ ...prev, copies: [...prev.copies, ""] }));
  };

  const removeCopy = (index: number) => {
    if (briefing.copies.length <= MIN_COPIES) return;
    setBriefing((prev) => ({ ...prev, copies: prev.copies.filter((_, i) => i !== index) }));
  };

  // CTAs
  const updateCta = (index: number, value: string) => {
    const next = [...briefing.ctas];
    next[index] = value;
    setBriefing((prev) => ({ ...prev, ctas: next }));
  };

  const addCta = () => {
    if (briefing.ctas.length >= MAX_CTAS) return;
    setBriefing((prev) => ({ ...prev, ctas: [...prev.ctas, ""] }));
  };

  const removeCta = (index: number) => {
    if (briefing.ctas.length <= MIN_CTAS) return;
    setBriefing((prev) => ({ ...prev, ctas: prev.ctas.filter((_, i) => i !== index) }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setBriefing((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1800));
    router.push("/results");
  };

  const isValid =
    briefing.copies.filter((c) => c.trim().length > 0).length >= MIN_COPIES &&
    briefing.ctas.filter((c) => c.trim().length > 0).length >= MIN_CTAS &&
    briefing.publicoAlvo.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

      {/* Assets */}
      <div>
        <FieldLabel>Assets visuais</FieldLabel>
        <AssetUpload
          assets={briefing.assets}
          onChange={(assets: AssetFile[]) =>
            setBriefing((prev) => ({ ...prev, assets }))
          }
        />
      </div>

      <div className="h-px bg-[var(--color-border)]" />

      {/* Copies */}
      <div className="flex flex-col gap-3">
        <FieldLabel hint={`${briefing.copies.length} de ${MAX_COPIES}`}>
          Opções de copy
        </FieldLabel>
        {briefing.copies.map((copy, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-md"
                  style={{ background: "linear-gradient(135deg, #005fff22, #d701b822)", color: "var(--color-accent)" }}
                >
                  Copy {i + 1}
                </span>
              </div>
              <textarea
                value={copy}
                onChange={(e) => updateCopy(i, e.target.value)}
                placeholder={
                  i === 0
                    ? "Ex: Seu time de TI não precisa de mais código — precisa de menos gargalo..."
                    : i === 1
                    ? "Ex: Automatize aprovações de AP e reduza o ciclo de pagamento em até 60%..."
                    : "Adicione uma variação de copy..."
                }
                rows={3}
                className={inputBase}
              />
            </div>
            <div className="mt-8">
              <RemoveItemButton
                onClick={() => removeCopy(i)}
                disabled={briefing.copies.length <= MIN_COPIES}
              />
            </div>
          </div>
        ))}
        <AddButton onClick={addCopy} disabled={briefing.copies.length >= MAX_COPIES}>
          Adicionar copy {briefing.copies.length >= MAX_COPIES && `(máximo ${MAX_COPIES})`}
        </AddButton>
      </div>

      <div className="h-px bg-[var(--color-border)]" />

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <FieldLabel hint={`${briefing.ctas.length} de ${MAX_CTAS}`}>
          Opções de CTA
        </FieldLabel>
        {briefing.ctas.map((cta, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="flex-1 flex items-center gap-2">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-md shrink-0"
                style={{ background: "linear-gradient(135deg, #005fff22, #d701b822)", color: "var(--color-accent)" }}
              >
                CTA {i + 1}
              </span>
              <input
                type="text"
                value={cta}
                onChange={(e) => updateCta(i, e.target.value)}
                placeholder={
                  i === 0 ? "Ex: Ver demonstração" : i === 1 ? "Ex: Calcular meu ROI" : "Ex: Começar grátis"
                }
                className={inputBase}
              />
            </div>
            <RemoveItemButton
              onClick={() => removeCta(i)}
              disabled={briefing.ctas.length <= MIN_CTAS}
            />
          </div>
        ))}
        <AddButton onClick={addCta} disabled={briefing.ctas.length >= MAX_CTAS}>
          Adicionar CTA {briefing.ctas.length >= MAX_CTAS && `(máximo ${MAX_CTAS})`}
        </AddButton>
      </div>

      <div className="h-px bg-[var(--color-border)]" />

      {/* Contexto visual */}
      <div>
        <FieldLabel>Contexto visual</FieldLabel>
        <div className="grid grid-cols-3 gap-3">
          {contextoOptions.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setBriefing((prev) => ({ ...prev, contextoVisual: c.value }))}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-center transition-all duration-200 ${
                briefing.contextoVisual === c.value
                  ? "btn-accent-active"
                  : "border-[var(--color-border)] hover:border-[var(--color-muted)]"
              }`}
            >
              <span className={`text-sm font-semibold ${briefing.contextoVisual === c.value ? "" : "text-[var(--color-foreground)]"}`}
                style={briefing.contextoVisual === c.value ? { color: "var(--color-accent)" } : {}}
              >
                {c.label}
              </span>
              <span className="text-xs text-[var(--color-muted)]">{c.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-[var(--color-border)]" />

      {/* Objetivo + Formato */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel>Objetivo da campanha</FieldLabel>
          <div className="relative">
            <select name="objetivo" value={briefing.objetivo} onChange={handleChange} className={selectBase}>
              {objetivoOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-xs">▼</span>
          </div>
        </div>
        <div>
          <FieldLabel>Formato do anúncio</FieldLabel>
          <div className="relative">
            <select name="formato" value={briefing.formato} onChange={handleChange} className={selectBase}>
              {formatoOptions.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] text-xs">▼</span>
          </div>
        </div>
      </div>

      {/* Público-alvo */}
      <div>
        <FieldLabel>Público-alvo</FieldLabel>
        <input
          type="text"
          name="publicoAlvo"
          value={briefing.publicoAlvo}
          onChange={handleChange}
          placeholder="Descreva o perfil, cargo e dor principal do público..."
          className={inputBase}
          required
        />
        <div className="mt-2.5 flex flex-col gap-1.5">
          <p className="text-xs text-[var(--color-muted)] font-medium">Exemplos de BUs Pipefy:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "CFOs e gestores financeiros, mid-market, reduzir ciclo de AP",
              "Líderes de TI, reduzir backlog sem aumentar time",
              "Gestores de RH, +500 funcionários, onboarding manual",
              "Heads de Procurement, automatizar aprovações",
              "Times jurídicos, contratos em planilha e e-mail",
            ].map((exemplo) => (
              <button
                key={exemplo}
                type="button"
                onClick={() => setBriefing((prev) => ({ ...prev, publicoAlvo: exemplo }))}
                className="text-xs px-2.5 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[#005fff] hover:text-[#005fff] transition-all duration-150 text-left"
              >
                {exemplo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plataforma */}
      <div>
        <FieldLabel>Plataforma</FieldLabel>
        <div className="flex gap-3">
          {plataformaOptions.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setBriefing((prev) => ({ ...prev, plataforma: p.value }))}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                briefing.plataforma === p.value
                  ? "btn-accent-active"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-muted)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full rounded-xl py-4 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        style={{ background: "linear-gradient(135deg, #005fff 0%, #d701b8 100%)" }}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analisando combinações...
          </>
        ) : (
          "Analisar combinações →"
        )}
      </button>

      {!isValid && (
        <p className="text-xs text-center text-[var(--color-muted)]">
          Preencha ao menos 2 copies, 2 CTAs e o público-alvo para continuar.
        </p>
      )}
    </form>
  );
}
