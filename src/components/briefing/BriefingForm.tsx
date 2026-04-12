"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AssetFile, Briefing, Format, Objective, Platform } from "@/types";
import AssetUpload from "@/components/briefing/AssetUpload";

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

const plataformaOptions: { value: Platform; label: string; icon: string }[] = [
  { value: "meta", label: "Meta", icon: "f" },
  { value: "google", label: "Google Ads", icon: "G" },
  { value: "ambas", label: "Ambas", icon: "+" },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">
      {children}
    </label>
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
    copy: "",
    cta: "",
    objetivo: "conversao",
    publicoAlvo: "",
    formato: "feed",
    plataforma: "meta",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setBriefing((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simula chamada à IA — será substituída pela Claude API
    await new Promise((res) => setTimeout(res, 1600));
    router.push("/results");
  };

  const isValid =
    briefing.copy.trim().length > 0 &&
    briefing.cta.trim().length > 0 &&
    briefing.publicoAlvo.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      {/* Asset */}
      <div>
        <FieldLabel>Assets visuais</FieldLabel>
        <AssetUpload
          assets={briefing.assets}
          onChange={(assets: AssetFile[]) =>
            setBriefing((prev) => ({ ...prev, assets }))
          }
        />
      </div>

      {/* Copy */}
      <div>
        <FieldLabel>Copy do anúncio</FieldLabel>
        <textarea
          name="copy"
          value={briefing.copy}
          onChange={handleChange}
          placeholder="Cole aqui o texto principal do anúncio recebido no briefing..."
          rows={4}
          className={inputBase}
          required
        />
      </div>

      {/* CTA */}
      <div>
        <FieldLabel>CTA — Chamada para ação</FieldLabel>
        <input
          type="text"
          name="cta"
          value={briefing.cta}
          onChange={handleChange}
          placeholder="Ex: Saiba mais, Compre agora, Quero conhecer..."
          className={inputBase}
          required
        />
      </div>

      {/* Objetivo + Formato */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel>Objetivo da campanha</FieldLabel>
          <div className="relative">
            <select
              name="objetivo"
              value={briefing.objetivo}
              onChange={handleChange}
              className={selectBase}
            >
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
            <select
              name="formato"
              value={briefing.formato}
              onChange={handleChange}
              className={selectBase}
            >
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
                onClick={() =>
                  setBriefing((prev) => ({ ...prev, publicoAlvo: exemplo }))
                }
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
                  ? "border-[#005fff] text-[#005fff] bg-[#005fff]/10"
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
        className="w-full gradient-bg rounded-xl py-4 text-sm font-bold text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 mt-1 flex items-center justify-center gap-2"
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
    </form>
  );
}
