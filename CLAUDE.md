@AGENTS.md

# CLAUDE.md — Instruções para o Assistente

## Contexto do Projeto
Ferramenta de análise e sugestão de Ads para **Meta (Facebook/Instagram)** e **Google Ads**.

O objetivo central é resolver o principal gargalo no fluxo de produção de anúncios: **prever quais combinações de visual + copy + CTA têm maior probabilidade de performar bem antes de a peça ser produzida**, economizando tempo e evitando retrabalho.

## Sobre a Usuária
- Designer senior de performance/mídia paga
- Recebe briefings e copies de terceiros
- Produz os criativos no **Figma**
- Replica e publica os anúncios no **Buzz**
- Não é desenvolvedora — a interface precisa ser simples, visual e orientada a decisões práticas

## Problema Central
Antes de produzir uma peça, a designer não tem como saber com segurança qual combinação de elementos vai performar melhor. Isso gera:
- Produção de variações desnecessárias
- Retrabalho após veiculação com baixa performance
- Decisões baseadas em feeling, não em dados

## O Que a Ferramenta Deve Fazer
1. **Analisar** o histórico de campanhas (Meta e Google) para identificar padrões de performance por combinação de visual + copy + CTA
2. **Sugerir** as combinações com maior potencial antes da produção, com base nos dados históricos
3. **Pontuar** variações de copy e CTA recebidas no briefing, indicando quais tendem a converter melhor em cada plataforma
4. **Apresentar** os insights de forma simples — sem jargão técnico excessivo, orientada à tomada de decisão

## Fluxo de Trabalho da Usuária (contexto para sugestões)
```
Briefing + Copies recebidos
        ↓
[FERRAMENTA] Análise e sugestão de combinações
        ↓
Produção no Figma (visual)
        ↓
Publicação no Buzz
        ↓
Performance real → alimenta o histórico da ferramenta
```

## Stack do Projeto
- **Next.js** (App Router) — frontend + backend em um projeto só
- **Tailwind CSS** — estilização
- **Claude API** — IA para análise e sugestões
- **Supabase** — banco de dados e autenticação
- **Figma REST API** — leitura do brandguide
- **Vercel** — deploy

## Diretrizes para o Assistente
- Sempre leia `BRIEFING.md` e `SPEC.md` antes de propor implementações
- A interface deve ser pensada para uma designer, não para um analista de dados
- Prefira visualizações e linguagem direta a tabelas densas e jargão técnico
- Não adicione features além do que foi solicitado
- Pergunte antes de tomar ações destrutivas ou irreversíveis
- Prefira editar arquivos existentes a criar novos desnecessariamente
- Leia `AGENTS.md` antes de escrever qualquer código Next.js

## Arquivos do Projeto
- `BRIEFING.md` — contexto de negócio e objetivos
- `SPEC.md` — especificações técnicas e requisitos funcionais
- `AGENTS.md` — instruções específicas sobre esta versão do Next.js
- `CLAUDE.md` — este arquivo; guia de comportamento para o assistente
