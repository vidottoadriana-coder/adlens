"use client";

import { Suggestion } from "@/types";

const contextoLabel = {
  claro: "Fundo claro",
  escuro: "Fundo escuro",
  ambos: "Claro + Escuro",
};

const contextoIcon = {
  claro: "☀",
  escuro: "◐",
  ambos: "◑",
};

function ScoreBar({ score }: { score: number }) {
  const label =
    score >= 85 ? "Alto potencial" : score >= 70 ? "Bom potencial" : "Potencial médio";
  const labelColor =
    score >= 85 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-[var(--color-muted)]";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
          Potencial de performance
        </span>
        <span className={`text-xs font-bold ${labelColor}`}>{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[var(--color-border)]">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${score}%`,
              background: "linear-gradient(90deg, #005fff 0%, #d701b8 100%)",
            }}
          />
        </div>
        <span
          className="text-sm font-bold tabular-nums w-7 text-right"
          style={{ color: score >= 85 ? "#10b981" : score >= 70 ? "#f59e0b" : "var(--color-muted)" }}
        >
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
      className={`relative rounded-2xl p-6 flex flex-col gap-5 transition-all duration-200 hover:-translate-y-0.5 ${
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

      {/* Rank + badges */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: "linear-gradient(135deg, #005fff18, #d701b818)", color: "#005fff" }}
          >
            #{rank}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-border)] text-[var(--color-muted)]">
            {contextoIcon[suggestion.contextoVisual]} {contextoLabel[suggestion.contextoVisual]}
          </span>
        </div>
      </div>

      {/* Score */}
      <ScoreBar score={suggestion.score} />

      {/* Copy */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">
          Copy
        </p>
        <p className="text-sm leading-relaxed text-[var(--color-foreground)]">
          &ldquo;{suggestion.copy}&rdquo;
        </p>
      </div>

      {/* CTA */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">
          CTA
        </p>
        <span
          className="inline-block text-sm font-bold px-4 py-1.5 rounded-full"
          style={{
            background: "linear-gradient(135deg, #005fff14, #d701b814)",
            color: "var(--color-accent)",
          }}
        >
          {suggestion.cta}
        </span>
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
              background: "linear-gradient(135deg, #005fff12, #d701b812)",
              color: "var(--color-accent)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
