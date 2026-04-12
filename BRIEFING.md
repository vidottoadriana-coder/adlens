# BRIEFING — Ferramenta de Análise e Sugestão de Ads

## Status
Em definição. Stack e nome do projeto ainda indefinidos.

## Problema
Designers de performance recebem briefings com copy, CTA, objetivo, público-alvo e formato, e precisam decidir quais combinações produzir sem ter dados que indiquem o que vai performar. O resultado é retrabalho, produção de variações desnecessárias e decisões baseadas em feeling.

## Solução
Web app simples e visual que usa IA para analisar o briefing recebido e sugerir as combinações de visual + copy + CTA com maior potencial de performance — antes de qualquer produção ser iniciada.

## Usuária
Designer senior de performance. Não é desenvolvedora. Trabalha com:
- **Figma** — produção dos criativos (ferramenta principal)
- **Buzz** — replicação e publicação dos anúncios
- **Meta Ads** e **Google Ads** — plataformas de veiculação

## Escopo Inicial
Uso pessoal, com arquitetura pensada para escalar para times no futuro.

## O Que Chega no Briefing
| Campo | Descrição |
|-------|-----------|
| Copy | Texto principal do anúncio |
| CTA | Chamada para ação (ex: "Saiba mais", "Compre agora") |
| Objetivo | Objetivo da campanha (ex: conversão, tráfego, awareness) |
| Público-alvo | Descrição do público (ex: mulheres 25-40, interesse em moda) |
| Formato | Formato do anúncio (ex: feed, stories, carrossel, banner) |

## Plataformas Suportadas (escopo inicial)
- Meta Ads (Facebook + Instagram)
- Google Ads

## Integração com Figma
A ferramenta deve se integrar diretamente ao Figma — ferramenta principal da usuária. A integração deve permitir:
- Acessar os assets, cores e tipografia do brandguide da marca
- Sugerir combinações visuais respeitando a identidade visual
- Potencialmente enviar sugestões diretamente para o arquivo Figma

## Brandguide
A ferramenta deve respeitar e aplicar o brandguide da marca nos Ads — cores, tipografia e assets. Consistência visual é requisito, não opcional.

## O Que a IA Deve Fazer
1. Receber os dados do briefing
2. Pontuar as variações de copy e CTA recebidas (qual tende a converter melhor por plataforma e formato)
3. Sugerir combinações de visual + copy + CTA com maior potencial de performance
4. Justificar as sugestões em linguagem simples — sem jargão técnico

## Base de Dados
Começa do zero. Sem histórico de campanhas existente. A IA trabalhará com:
- Conhecimento geral de boas práticas de Ads (embutido no modelo)
- Histórico que será acumulado com o uso da ferramenta ao longo do tempo

## Não Está no Escopo (por ora)
- Criação ou edição de campanhas nas plataformas
- Dashboard de métricas de performance em tempo real
- Integração com Buzz
- Uso por times (fase 2)
