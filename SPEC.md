# SPEC — Especificações Técnicas

## Status
Stack definida. Arquitetura inicial estabelecida.

## Tipo de Aplicação
Web app — simples, visual, orientada a decisões. Pensada para designer, não para analista de dados.

## Stack
| Camada | Tecnologia | Notas |
|--------|-----------|-------|
| Frontend + Backend | Next.js (App Router) | Um único projeto; rotas de API embutidas |
| Estilização | Tailwind CSS | Utility-first, intuitivo para quem pensa em design |
| IA | Claude API (Anthropic) | Análise de copy, pontuação e sugestões |
| Banco de dados | Supabase (PostgreSQL) | Interface visual, gratuito para começar |
| Autenticação | Supabase Auth | Já incluso no Supabase |
| Figma | Figma REST API | Leitura de brandguide: cores, tipografia, assets |
| Deploy | Vercel | Integração automática com GitHub, gratuito para uso pessoal |

## Arquitetura de Pastas
```
projeto-ads/
├── src/
│   ├── app/                        # Páginas e rotas (Next.js App Router)
│   │   ├── page.tsx                # Página inicial
│   │   ├── briefing/               # Página de input do briefing
│   │   ├── history/                # Histórico de análises (fase futura)
│   │   └── api/                    # Rotas de API (backend)
│   │       ├── analyze/            # Endpoint: envia briefing para Claude API
│   │       └── figma/              # Endpoint: lê brandguide do Figma
│   ├── components/                 # Componentes visuais reutilizáveis
│   │   ├── ui/                     # Botões, inputs, cards, etc.
│   │   ├── briefing/               # Formulário de input do briefing
│   │   └── results/                # Cards de sugestão e pontuação
│   ├── lib/                        # Integrações e utilitários
│   │   ├── claude/                 # Cliente e prompts da Claude API
│   │   ├── figma/                  # Cliente da Figma REST API
│   │   └── supabase/               # Cliente do banco de dados
│   └── types/                      # Definições de tipos TypeScript
├── BRIEFING.md
├── CLAUDE.md
└── SPEC.md
```

## Integrações Necessárias

### Figma (prioritária)
- Leitura do brandguide da marca: cores, tipografia, assets
- Leitura de componentes e frames para sugestão de combinações visuais
- Potencial: envio de sugestões diretamente para arquivo Figma
- Protocolo: Figma REST API ou Figma Plugin

### Meta Ads API (fase futura)
- Autenticação OAuth com conta do usuário
- Leitura de dados históricos de campanhas para enriquecer sugestões ao longo do tempo
- Escopos necessários: `ads_read`, `insights`

### Google Ads API (fase futura)
- Autenticação via Google OAuth 2.0
- Leitura de dados históricos de campanhas
- Acesso via Google Ads API (v14+)

## Funcionalidades

### F-01 — Input do Briefing
O usuário informa:
- Copy (texto do anúncio)
- CTA (chamada para ação)
- Objetivo da campanha
- Público-alvo
- Formato do anúncio (feed, stories, carrossel, banner, etc.)
- Plataforma(s) alvo (Meta, Google, ou ambas)

### F-02 — Análise por IA
A partir do briefing, a IA deve:
- Pontuar as variações de copy e CTA recebidas (score de potencial por plataforma)
- Identificar a combinação com maior probabilidade de performance
- Justificar as sugestões em linguagem direta e simples
- Adaptar as sugestões ao formato e plataforma selecionados

### F-03 — Respeito ao Brandguide
- Ao integrar com o Figma, a ferramenta lê as cores, tipografia e assets da marca
- As sugestões visuais devem respeitar esses parâmetros
- Se não houver Figma conectado, o usuário pode inserir o brandguide manualmente

### F-04 — Apresentação dos Resultados
- Interface visual, não tabular
- Cards de sugestão com score de potencial, justificativa e elementos recomendados
- Indicação clara de "o que usar" e "por quê"
- Linguagem acessível para designer, sem jargão de mídia paga

### F-05 — Histórico (fase futura)
- Armazenar os briefings e sugestões geradas
- Registrar o resultado real das campanhas (via integração com Meta/Google Ads)
- Usar o histórico para refinar as sugestões futuras

## Requisitos Não Funcionais
- Interface responsiva (web)
- Tempo de resposta da IA: < 10 segundos para geração de sugestões
- Sem exposição de credenciais (API keys apenas via variáveis de ambiente)
- Arquitetura preparada para múltiplos usuários (mesmo que o MVP seja uso pessoal)

## Brandguide — Dados Esperados do Figma
| Elemento | Exemplo |
|----------|---------|
| Cores primárias | Hex das cores da marca |
| Cores secundárias | Hex das cores de suporte |
| Tipografia | Família(s) de fonte, pesos usados |
| Assets | Logos, ícones, ilustrações recorrentes |

## Critérios de Aceitação do MVP
- [ ] Usuário insere briefing completo e recebe sugestões de combinações
- [ ] Sugestões incluem pontuação e justificativa em linguagem simples
- [ ] Ferramenta diferencia sugestões por plataforma (Meta vs Google)
- [ ] Ferramenta diferencia sugestões por formato (feed, stories, banner, etc.)
- [ ] Integração com Figma lê cores e tipografia do brandguide corretamente
- [ ] Sugestões visuais respeitam o brandguide da marca
- [ ] Interface é usável por uma designer sem conhecimento técnico

## Fora do Escopo no MVP
- Integração com Meta Ads API e Google Ads API
- Histórico de campanhas e aprendizado contínuo
- Multiusuário / times
- Integração com Buzz
- Criação ou edição de campanhas nas plataformas
