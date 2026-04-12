"use client";

import { Suggestion } from "@/types";

const platformLabel: Record<string, string> = {
  meta: "Meta",
  google: "Google Ads",
  ambas: "Meta + Google",
};

const platformColors: Record<string, string> = {
  meta: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  google: "bg-red-500/10 text-red-400 border border-red-500/20",
  ambas: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

const platformColorsLight: Record<string, string> = {
  meta: "bg-blue-50 text-blue-700 border border-blue-200",
  google: "bg-red-50 text-red-700 border border-red-200",
  ambas: "bg-purple-50 text-purple-700 border border-purple-200",
};

const formatLabel: Record<string, string> = {
  feed: "Feed",
  stories: "Stories",
  carrossel: "Carrossel",
  banner: "Banner",
  search: "Search",
  display: "Display",
};

function ScoreBar({ score }: { score: number }) {
  const label =
    score >= 80 ? "Alto potencial" : score >= 60 ? "Potencial médio" : "Potencial baixo";
  const labelColor =
    score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-red-400";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Potencial de performance
        </span>
        <span className={`text-xs font-bold ${labelColor}`}>{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${score}%`,
              background: "linear-gradient(90deg, #005fff 0%, #d701b8 100%)",
            }}
          />
        </div>
        <span className="text-sm font-bold tabular-nums" style={{ color: score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#f87171" }}>
          {score}
        </span>
      </div>
    </div>
  );
}

export default function SuggestionCard({
  suggestion,
  rank,
}: {
  suggestion: Suggestion;
  rank: number;
}) {
  const isTop = rank === 1;

  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col gap-5 transition-all duration-200 hover:translate-y-[-2px] ${
        isTop
          ? "gradient-border bg-[var(--color-surface)] shadow-lg"
          : "border border-[var(--color-border)] bg-[var(--color-surface)]"
      }`}
    >
      {isTop && (
        <div
          className="absolute -top-3 left-6 text-xs font-bold px-3 py-1 rounded-full text-white"
          style={{ background: "linear-gradient(135deg, #005fff, #d701b8)" }}
        >
          Melhor combinação
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full dark:${platformColors[suggestion.plataforma]} ${platformColorsLight[suggestion.plataforma]}`}>
            {platformLabel[suggestion.plataforma]}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--color-border)] text-[var(--color-muted)]">
            {formatLabel[suggestion.formato]}
          </span>
        </div>
        <span className="text-xs font-bold text-[var(--color-muted)] shrink-0 mt-0.5">
          #{rank}
        </span>
      </div>

      {/* Score */}
      <ScoreBar score={suggestion.score} />

      {/* Copy + CTA */}
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-1.5">
            Copy
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-foreground)]">
            &ldquo;{suggestion.copy}&rdquo;
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-1.5">
            CTA
          </p>
          <span
            className="inline-block text-sm font-bold px-4 py-1.5 rounded-full"
            style={{ background: "linear-gradient(135deg, #005fff22, #d701b822)", color: "#005fff" }}
          >
            {suggestion.cta}
          </span>
        </div>
      </div>

      {/* Justificativa */}
      <div className="border-t border-[var(--color-border)] pt-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">
          Por que vai funcionar
        </p>
        <p className="text-sm leading-relaxed text-[var(--color-muted)]">
          {suggestion.justificativa}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {suggestion.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              background: "linear-gradient(135deg, #005fff15, #d701b815)",
              color: "#005fff",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
