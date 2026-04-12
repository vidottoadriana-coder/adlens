import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import SuggestionCard from "@/components/results/SuggestionCard";
import { Suggestion } from "@/types";

const MOCK_SUGGESTIONS: Suggestion[] = [
  {
    id: "1",
    score: 93,
    plataforma: "meta",
    formato: "feed",
    copy: "Seu time de TI não precisa de mais código — precisa de menos gargalo. O Pipefy automatiza aprovações, integrações e workflows sem uma linha de código. ROI em 30 dias.",
    cta: "Ver demonstração",
    justificativa:
      "Para líderes de TI, o medo de aumentar a dívida técnica é maior do que o custo da ferramenta. Copies que antecipam essa objeção ('sem código') e entregam um prazo concreto de ROI têm CTR significativamente maior em Feed B2B.",
    tags: ["sem código", "ROI rápido", "objeção antecipada", "liderança de TI"],
  },
  {
    id: "2",
    score: 81,
    plataforma: "google",
    formato: "search",
    copy: "Automatize aprovações de AP e reduza o ciclo de pagamento em até 60%. Pipefy conecta ERP, time financeiro e fornecedores em um único workflow — sem planilha, sem e-mail.",
    cta: "Calcular meu ROI",
    justificativa:
      "CFOs buscam ativamente por soluções de AP automation no Google. O CTA 'Calcular meu ROI' tem conversão superior a 'Saiba mais' para personas financeiras — transforma clique em intenção de negócio qualificada.",
    tags: ["AP automation", "CFO", "ROI mensurável", "search de intenção alta"],
  },
  {
    id: "3",
    score: 74,
    plataforma: "ambas",
    formato: "carrossel",
    copy: "Onboarding que demora semanas agora leva dias. O Pipefy AI Agent coleta documentos, dispara tarefas e notifica gestores automaticamente — para RH focar no que importa.",
    cta: "Começar grátis",
    justificativa:
      "Carrossel funciona bem para mostrar o antes e depois de um processo. Para RH, destacar a eliminação de tarefas manuais (documentos, notificações) com AI Agents gera engajamento alto em audiences de mid-market.",
    tags: ["AI Agents", "onboarding", "RH", "antes e depois", "mid-market"],
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
            <span className="text-sm font-bold text-[var(--color-foreground)]">
              AdLens
            </span>
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
              Resultado da análise
            </p>
            <h1 className="text-3xl sm:text-4xl font-black leading-tight">
              <span className="gradient-text">3 combinações</span>{" "}
              <span className="text-[var(--color-foreground)]">com maior potencial</span>
            </h1>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              Ordenadas por potencial de performance para o público B2B selecionado. Comece pela #1 no Figma.
            </p>
          </div>

          {/* Divider */}
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
              Quer analisar outro briefing?
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
