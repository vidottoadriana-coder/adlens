import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import SuggestionCard from "@/components/results/SuggestionCard";
import { Suggestion } from "@/types";

const MOCK_SUGGESTIONS: Suggestion[] = [
  {
    id: "1",
    score: 94,
    copy: "Seu time de TI não precisa de mais código — precisa de menos gargalo. O Pipefy automatiza aprovações, integrações e workflows sem escrever uma linha. ROI em 30 dias.",
    cta: "Ver demonstração",
    contextoVisual: "escuro",
    justificativa:
      "Copy elimina a objeção principal de TI ('mais dívida técnica') antes mesmo de surgir. O prazo concreto de ROI gera urgência sem pressão. Fundo escuro funciona melhor para audiências técnicas em Meta Feed — transmite seriedade e contrasta com conteúdo orgânico claro do feed.",
    tags: ["sem código", "ROI concreto", "objeção antecipada", "liderança de TI"],
  },
  {
    id: "2",
    score: 82,
    copy: "Automatize aprovações de AP e reduza o ciclo de pagamento em até 60%. Pipefy conecta ERP, financeiro e fornecedores em um único workflow — sem planilha, sem e-mail.",
    cta: "Calcular meu ROI",
    contextoVisual: "claro",
    justificativa:
      "Para CFOs, o CTA 'Calcular meu ROI' converte mais que CTAs genéricos — transforma o clique em uma intenção de negócio qualificada. Fundo claro reforça clareza e confiança, atributos valorizados por personas financeiras em Search e Display.",
    tags: ["AP automation", "CFO", "ROI mensurável", "fundo claro"],
  },
  {
    id: "3",
    score: 71,
    copy: "Onboarding que levava semanas agora leva dias. O Pipefy AI Agent coleta documentos, dispara tarefas e notifica gestores — automaticamente. Para o RH focar no que importa.",
    cta: "Começar grátis",
    contextoVisual: "ambos",
    justificativa:
      "Copy com narrativa de 'antes e depois' funciona bem em carrossel e feed para RH. Testar fundo claro e escuro vale aqui — gestores de RH respondem a variações visuais mais do que CFOs ou líderes de TI, então o A/B pode revelar uma diferença significativa.",
    tags: ["AI Agents", "onboarding", "RH", "antes e depois", "A/B recomendado"],
  },
];

export default function ResultsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #005fff, #d701b8)" }}
            >
              <span className="text-white text-xs font-black">A</span>
            </div>
            <span className="text-sm font-bold text-[var(--color-foreground)]">AdLens</span>
          </div>
          <span className="text-[var(--color-border)]">|</span>
          <Link
            href="/"
            className="text-xs font-semibold text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            ← Novo briefing
          </Link>
        </div>
        <ThemeToggle />
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-6 py-12 sm:py-16">
        <div className="w-full max-w-xl flex flex-col gap-10">

          {/* Hero */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
              Ranking de combinações
            </p>
            <h1 className="text-3xl sm:text-4xl font-black leading-tight">
              <span className="gradient-text">{MOCK_SUGGESTIONS.length} combinações</span>{" "}
              <span className="text-[var(--color-foreground)]">rankeadas por potencial</span>
            </h1>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              Cada combinação reúne a melhor copy, CTA e contexto visual para o público selecionado.
              Comece pela <strong className="text-[var(--color-foreground)]">#1</strong> no Figma.
            </p>
          </div>

          {/* Legenda rápida */}
          <div className="flex items-center gap-6 px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-[var(--color-muted)]">85–100 Alto potencial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs text-[var(--color-muted)]">70–84 Bom potencial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-zinc-400" />
              <span className="text-xs text-[var(--color-muted)]">&lt;70 Médio</span>
            </div>
          </div>

          <div className="h-px bg-[var(--color-border)]" />

          {/* Cards */}
          <div className="flex flex-col gap-5">
            {MOCK_SUGGESTIONS.map((s, i) => (
              <SuggestionCard key={s.id} suggestion={s} rank={i + 1} />
            ))}
          </div>

          {/* CTA bottom */}
          <div className="flex flex-col items-center gap-3 pt-4 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-muted)] text-center">
              Quer testar outras combinações?
            </p>
            <Link
              href="/"
              className="gradient-bg text-white text-sm font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Nova análise →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
