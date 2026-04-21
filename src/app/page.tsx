import BriefingForm from "@/components/briefing/BriefingForm";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
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
        <ThemeToggle />
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center px-6 py-12 sm:py-16">
        <div className="w-full max-w-xl flex flex-col gap-10">
          {/* Hero */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
              Análise de Ads
            </p>
            <h1 className="text-3xl sm:text-4xl leading-tight font-normal">
              <span className="text-[var(--color-foreground)]">Descubra qual combinação</span>{" "}
              <span className="gradient-text font-bold">vai performar</span>{" "}
              <span className="text-[var(--color-foreground)]">antes de produzir</span>
            </h1>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              Cole o briefing, informe o contexto e receba sugestões de visual + copy + CTA
              com maior potencial de resultado — antes de abrir o Figma.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--color-border)]" />

          {/* Form */}
          <BriefingForm />
        </div>
      </main>
    </div>
  );
}
