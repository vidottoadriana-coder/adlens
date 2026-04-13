export type Platform = "meta" | "google" | "ambas";

export type Format =
  | "feed"
  | "stories"
  | "carrossel"
  | "banner"
  | "search"
  | "display";

export type Objective =
  | "conversao"
  | "trafego"
  | "awareness"
  | "leads"
  | "engajamento";

export type VisualContext = "claro" | "escuro" | "ambos";

export type AssetFile = {
  id: string;
  file: File;
  preview: string | null;
};

export type Briefing = {
  assets: AssetFile[];
  copies: string[];       // mín 2, máx 6
  ctas: string[];         // mín 2, máx 4
  contextoVisual: VisualContext;
  objetivo: Objective;
  publicoAlvo: string;
  formato: Format;
  plataforma: Platform;
};

export type Suggestion = {
  id: string;
  score: number;
  copy: string;
  cta: string;
  contextoVisual: VisualContext;
  justificativa: string;
  tags: string[];
};
