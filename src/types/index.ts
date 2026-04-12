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

export type AssetFile = {
  id: string;
  file: File;
  preview: string | null; // object URL para imagens, null para PDF
};

export type Briefing = {
  assets: AssetFile[];
  copy: string;
  cta: string;
  objetivo: Objective;
  publicoAlvo: string;
  formato: Format;
  plataforma: Platform;
};

export type Suggestion = {
  id: string;
  score: number;
  plataforma: Platform;
  formato: Format;
  copy: string;
  cta: string;
  justificativa: string;
  tags: string[];
};
