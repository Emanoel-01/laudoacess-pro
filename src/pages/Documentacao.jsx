import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, FileText, Database, Network, BookOpen, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Documentacao() {
  const [copiedSection, setCopiedSection] = useState(null);

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const prdData = {
    nome: "LaudoAcess",
    descricao: `LaudoAcess é uma plataforma SaaS abrangente projetada para simplificar a criação e gerenciamento de laudos de acessibilidade, em conformidade com a ABNT NBR 9050:2020 e outras regulamentações brasileiras. A aplicação oferece um fluxo de trabalho intuitivo para arquitetos e engenheiros, permitindo a geração de relatórios detalhados com base em checklists pré-definidos para diversas categorias de ambientes (ex: circulação, rampas, sanitários). Inclui funcionalidades robustas de banco de dados para armazenar informações de imóveis, ambientes, não conformidades, fotos e anexos, além de um sistema de histórico de revisões para cada laudo. Uma integração avançada com IA é utilizada para gerar automaticamente conclusões e recomendações técnicas, otimizando o processo de elaboração do laudo. A plataforma gerencia autenticação de usuários, perfis personalizados com dados profissionais e a possibilidade de white-label (logo e assinatura digital nos PDFs). Além disso, oferece um modelo de licença educacional com restrições de edição de perfil. A interface do usuário é responsiva, moderna e construída para facilitar a navegação e a entrada de dados.`,
    industria: "Arquitetura, Engenharia Civil, Consultoria de Acessibilidade, Conformidade Regulatória, Auditoria Predial.",
    publicoAlvo: "Arquitetos, Engenheiros, Consultores de Acessibilidade, Empresas de Construção e Órgãos Públicos.",
    complexidade: "Avançado"
  };

  const guiaABNT = `**GUIA DE ACESSIBILIDADE - ABNT NBR 9050:2020**

═══════════════════════════════════════════════════════════════════

1. PASSEIO PÚBLICO E PERCURSOS

• Piso: Firme, estável, regular e antiderrapante em qualquer condição climática. Evitar desníveis.
• Largura Livre: Mínimo de 1,20 m para percursos. Altura livre de 2,10 m.
• Faixa de Serviço: 0,70 m (ideal), destinada ao mobiliário urbano e arborização.
• Declividade: Longitudinais: até 5% (ideal). Transversais: até 2% (para drenagem).
• Sinalização Tátil: Pisos táteis de alerta (mudança de direção, obstáculos) e direcionais (guiando o percurso).

⚠️ Não Conformidades Comuns:
- Grelhas/Ralos com vãos superiores a 1,5 cm na direção do percurso
- Postes/Placas/Lixeiras dentro da largura livre de 1,20 m
- Mobiliário que invade a Faixa Livre de 1,20 m
- Declividades maiores que 5% sem patamares de descanso
- Sinalização tátil sem contraste de cor/luminosidade

═══════════════════════════════════════════════════════════════════

2. CIRCULAÇÃO HORIZONTAL (Corredores e Manobras)

• Largura Corredores: Até 4 m de extensão: 0,90 m. De 4 m a 10 m: 1,20 m. Acima de 10 m: 1,50 m.
• Manobra 90°: Espaço livre de 1,20 m × 1,20 m para curvas de 90°.
• Manobra 360°: Círculo de diâmetro mínimo de 1,50 m para rotação completa da cadeira de rodas.

⚠️ Não Conformidades Comuns:
- Colunas ou móveis invadindo a largura mínima exigida
- Raio de giro na curva de 90° obstruído por balcões ou expositores
- Áreas de espera (halls) que não comportam o círculo de manobra livre de 1,50 m

═══════════════════════════════════════════════════════════════════

3. RAMPAS

• Largura Livre: Mínimo de 1,20 m para permitir a passagem segura de cadeira de rodas.
• Inclinação (i): ≤ 8,33%. Determinado pela altura do desnível (H). Ex: H ≤ 0,50 m ⟹ i ≤ 8,33% (1:12).
• Patamares: Comprimento mínimo de 1,20 m em cada extremidade, a cada 50 m de percurso ou mudança de direção.
• Corrimãos: Duplos em dois níveis (0,70 m e 0,92 m). Prolongados 0,30 m além do início/fim da rampa.

⚠️ Não Conformidades Comuns:
- Largura menor que 1,20 m devido a pilares ou guarda-corpos salientes
- Inclinação acima do limite (8,33%)
- Patamar com inclinação longitudinal ou transversal maior que 2%
- Corrimão interrompido na área do patamar ou sem prolongamento de 0,30 m

═══════════════════════════════════════════════════════════════════

4. ESCADAS

• Degraus: Uniformidade: Altura (h) e profundidade (p) uniformes. Fórmula de Blondel: 60 cm ≤ (2h + p) ≤ 64 cm.
• Corrimãos: Duplos: Alturas de 0,70 m e 0,92 m. Prolongados 0,30 m no início e fim.
• Sinalização: Faixa de sinalização visual e tátil no piso/espelho do primeiro e último degrau.

⚠️ Não Conformidades Comuns:
- Pisos ou espelhos com dimensões não uniformes no mesmo lance
- Ausência de corrimão duplo ou corrimão muito próximo à parede
- Sinalização visual sem contraste tátil e/ou visual claro

═══════════════════════════════════════════════════════════════════

5. PORTAS E VÃOS

• Largura Livre: Geral: Mínimo 0,80 m. Sanitários Acessíveis: Mínimo 0,90 m.
• Manuseio (Maçaneta): Tipo alavanca. Altura entre 0,90 m e 1,10 m do piso.
• Visibilidade: Faixas de contraste em portas de vidro nas alturas de 0,90 m e 1,50 m.

⚠️ Não Conformidades Comuns:
- Folha da porta (aberta a 90°) invade o vão, reduzindo a passagem livre
- Maçanetas redondas tipo bola que exigem torção fina
- Portas de vidro transparentes sem sinalização visual adequada

═══════════════════════════════════════════════════════════════════

6. SANITÁRIOS ACESSÍVEIS

• Espaço de Manobra: Área livre mínima: Círculo de 1,50 m de diâmetro.
• Vaso Sanitário: Altura da borda superior: 0,46 m (com assento) a 0,47 m do piso acabado.
• Barras de Apoio: Altura da barra horizontal: 0,75 m do piso. Comprimento mínimo de 0,80 m (barra lateral).
• Lavatório: Altura Superior Máxima: 0,85 m. Altura Livre Inferior Mínima: 0,73 m (para joelhos).

⚠️ Não Conformidades Comuns:
- Círculo de manobra invadido pela lixeira, porta abrindo para dentro
- Altura da bacia fora da faixa especificada
- Barras de apoio com altura ou distância da parede não conforme
- Lavatórios com coluna, gabinete ou sifão que impede a aproximação frontal

═══════════════════════════════════════════════════════════════════

7. ESTACIONAMENTO

• Número de Vagas: Mínimo de 2% do total, garantindo no mínimo 1 vaga.
• Dimensões: Vaga: 2,50 m × 5,00 m. Faixa de Transbordo: 1,20 m ao lado (compartilhável).
• Sinalização: Horizontal (pintura no piso) e Vertical (Placa com Símbolo Internacional de Acesso - SIA).

⚠️ Não Conformidades Comuns:
- Estacionamentos sem a vaga mínima de 1 ou sem localização preferencial
- Faixa de transbordo inexistente ou obstruída por pilares/paredes
- Ausência da placa vertical (SIA)

═══════════════════════════════════════════════════════════════════

8. ELEVADORES E PLATAFORMAS

• Cabine: Dimensões mínimas para giro de 180°. Pelo menos um espelho na parede de fundo.
• Botoeiras: Altura acessível (entre 0,89 m e 1,35 m). Botões com Braile e em relevo.
• Avisos Sonoros: Indicadores sonoros (voz) para identificação de pavimento e direção.

⚠️ Não Conformidades Comuns:
- Cabines pequenas impedindo a manobra
- Botões sem sinalização tátil (Braile/relevo)
- Elevador silencioso ou com som muito baixo

═══════════════════════════════════════════════════════════════════

9. SINALIZAÇÃO E COMUNICAÇÃO

• Visual: Contraste de cores, tamanho e tipo de letra adequados.
• Tátil (Braile): Uso de Braile e caracteres em relevo. Altura de alcance tátil: 0,90 m a 1,10 m.
• Emergência: Alarmes sonoros e visuais (luzes estroboscópicas) para emergências.

⚠️ Não Conformidades Comuns:
- Painéis e placas com letras pequenas, baixo contraste
- Sinalização tátil instalada fora da faixa de alcance tátil (0,90 m a 1,10 m)
- Sistemas de alarme que emitem apenas som

═══════════════════════════════════════════════════════════════════

REFERÊNCIAS NORMATIVAS:
• ABNT NBR 9050:2020 - Acessibilidade a edificações
• ABNT NBR 16537/2017 - Sinalização tátil no piso
• ABNT NM 313/2007 - Elevadores de passageiros
• Lei Federal nº 10.098/2000 - Lei de Acessibilidade
• Lei Federal nº 13.146/2015 - Lei Brasileira de Inclusão (LBI)
• Decreto Federal nº 5.296/2004`;

  const formularioLaudo = `**FORMULÁRIO COMPLETO - NOVO LAUDO DE ACESSIBILIDADE**

═══════════════════════════════════════════════════════════════════

SEÇÃO 1: INFORMAÇÕES GERAIS

DADOS DO IMÓVEL:
- Nome/Identificação do Imóvel *
- Classificação de Uso: [Uso Público / Uso Coletivo / Uso Privado]
- Detalhamento do Tipo (Ex: Comercial, Residencial, Educacional)
- Endereço Completo *
- Cidade *
- Estado *
- CEP
- Total de Pavimentos
- Área Total (m²)
- Ano de Construção
- Data da Vistoria

PROFISSIONAL RESPONSÁVEL:
- Nome Completo
- Formação (Ex: Arquiteto(a), Engenheiro(a))
- Tipo de Registro (CAU, CREA, etc)
- Número do Registro
- Número ART/RRT

═══════════════════════════════════════════════════════════════════

SEÇÃO 2: PASSEIO PÚBLICO

Questões a Avaliar:

1. O piso é firme, estável e antiderrapante em qualquer condição? [SIM/NÃO/N/A]
   - Observações
   - Justificativa Técnica
   - Tipo de Adaptação: [SIM/INS/CIV]
   - Necessita Projeto Executivo? [SIM/NÃO]
   - Anexos (Fotos, Plantas, PDFs)

2. A largura livre de circulação é de no mínimo 1,20 m? [SIM/NÃO/N/A]

3. A inclinação longitudinal não ultrapassa 5%? [SIM/NÃO/N/A]

4. Há rampa rebaixada de calçada com largura mínima de 1,20 m? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 3: ESTACIONAMENTO

1. Há estacionamento no local? [SIM/NÃO/N/A]

SE SIM:
2. Pelo menos 2% das vagas são destinadas a pessoas com deficiência/idosos (mínimo 1)? [SIM/NÃO/N/A]

3. As vagas PCD têm dimensões de 2,50 m × 5,00 m + faixa de transbordo de 1,20 m? [SIM/NÃO/N/A]

4. As vagas estão sinalizadas (horizontal e vertical) com o Símbolo Internacional de Acesso? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 4: CIRCULAÇÃO HORIZONTAL

1. O piso é regular, firme e antiderrapante? [SIM/NÃO/N/A]

2. A largura dos corredores está adequada (0,90m a 1,50m conforme extensão)? [SIM/NÃO/N/A]

3. Há sinalização tátil direcional em rotas acessíveis? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 5: RAMPAS

1. Há rampa(s) no local? [SIM/NÃO/N/A]

SE SIM:
2. A inclinação está dentro dos limites da norma (≤ 8,33% para H ≤ 0,50m)? [SIM/NÃO/N/A]

3. A largura livre é de no mínimo 1,20 m? [SIM/NÃO/N/A]

4. Há corrimãos duplos (0,70m e 0,92m) prolongados 0,30m? [SIM/NÃO/N/A]

5. Há piso tátil de alerta no início e fim da rampa? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 6: ESCADAS

1. Há escada(s) no local? [SIM/NÃO/N/A]

SE SIM:
2. Há corrimãos duplos (0,70m e 0,92m) prolongados 0,30m? [SIM/NÃO/N/A]

3. Há sinalização visual e tátil no início e fim dos lances? [SIM/NÃO/N/A]

4. As dimensões dos degraus atendem à fórmula de Blondel? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 7: PORTAS

1. A largura livre dos vãos é de no mínimo 0,80 m? [SIM/NÃO/N/A]

2. O espaço de aproximação junto à porta permite manobra de cadeira de rodas? [SIM/NÃO/N/A]

3. As maçanetas são do tipo alavanca, instaladas entre 0,90m e 1,10m? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 8: DISPOSITIVOS E COMANDOS

1. Comandos (interruptores, tomadas) estão entre 0,40m e 1,20m de altura? [SIM/NÃO/N/A]

2. Dispensadores (gel, papel, sabão) estão a uma altura acessível (0,80m a 1,20m)? [SIM/NÃO/N/A]

3. Bebedouros possuem altura de bica acessível (0,90m)? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 9: SANITÁRIOS

1. Há sanitário acessível no local? [SIM/NÃO/N/A]

SE SIM:
2. O sanitário possui entrada independente ou está em cabine individual acessível? [SIM/NÃO/N/A]

3. A largura da porta é de no mínimo 0,90 m? [SIM/NÃO/N/A]

4. Há área de manobra livre (círculo de Ø 1,50 m)? [SIM/NÃO/N/A]

5. O vaso sanitário está a 0,46m de altura (com assento)? [SIM/NÃO/N/A]

6. Há barras de apoio junto ao vaso, instaladas a 0,75m de altura? [SIM/NÃO/N/A]

7. O lavatório é suspenso, com altura máxima de 0,85m e livre inferior de 0,73m? [SIM/NÃO/N/A]

8. Os acessórios (saboneteira, papeleira) estão em altura acessível? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 10: VESTIÁRIOS

1. Há vestiários no local? [SIM/NÃO/N/A]

SE SIM:
2. Há vestiário acessível com entrada independente? [SIM/NÃO/N/A]

3. O boxe de chuveiro tem dimensões mínimas de 0,90m × 0,95m? [SIM/NÃO/N/A]

4. Há banco articulado/rebatível com 0,45m × 0,70m? [SIM/NÃO/N/A]

5. Há barras de apoio junto ao chuveiro? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 11: ELEVADORES

1. Há elevador(es) no edifício? [SIM/NÃO/N/A]

SE SIM:
2. A cabine tem dimensões que permitem giro de 180°? [SIM/NÃO/N/A]

3. O tempo de abertura das portas é adequado (mínimo 3 segundos)? [SIM/NÃO/N/A]

4. Os corrimãos estão instalados em três lados da cabine? [SIM/NÃO/N/A]

5. Os botões internos e externos estão entre 0,89m e 1,35m de altura? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 12: BALCÕES DE ATENDIMENTO

1. Há balcão de atendimento acessível com altura entre 0,75m e 0,85m? [SIM/NÃO/N/A]

2. Há altura livre inferior de no mínimo 0,73m para aproximação? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 13: LAVATÓRIOS (fora de sanitários)

1. Os lavatórios são suspensos, com altura máxima de 0,85m? [SIM/NÃO/N/A]

2. Há altura livre inferior de 0,73m para joelhos? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 14: VAGAS PARA PESSOAS COM DEFICIÊNCIA

1. Além das vagas de estacionamento, há vagas reservadas em outros locais (teatros, cinemas)? [SIM/NÃO/N/A]

2. Estas vagas correspondem a pelo menos 1% do total? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 15: SUPERFÍCIES DE TRABALHO

1. Há mesas/superfícies de trabalho acessíveis? [SIM/NÃO/N/A]

2. A altura da superfície está entre 0,75m e 0,85m? [SIM/NÃO/N/A]

3. Há altura livre inferior de 0,73m? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 16: SUPERFÍCIES DE REFEIÇÃO

1. Há mesas de refeição acessíveis? [SIM/NÃO/N/A]

2. A altura está entre 0,75m e 0,85m, com altura livre de 0,73m? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 17: MOBILIÁRIO - ASSENTOS FIXOS

1. Em áreas com assentos fixos, há 5% para pessoas obesas? [SIM/NÃO/N/A]

2. Há espaço para módulo de referência (0,80m × 1,20m) para cadeira de rodas? [SIM/NÃO/N/A]

3. As dimensões dos assentos fixos atendem às especificações da norma? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 18: CAMAS E MACAS

1. As camas/macas têm altura máxima de 0,46m para transferência? [SIM/NÃO/N/A]

2. Há espaço lateral de no mínimo 0,80m para transferência lateral? [SIM/NÃO/N/A]

═══════════════════════════════════════════════════════════════════

SEÇÃO 19: AMBIENTES

Lista de ambientes vistoriados:
- Cada ambiente deve ter: Nome, Pavimento, Categoria, Planta Baixa (opcional)

═══════════════════════════════════════════════════════════════════

SEÇÃO 20: ANEXOS E FOTOS

- Upload de fotos organizadas por categoria
- Plantas baixas
- Documentos complementares
- Áudios de observações

═══════════════════════════════════════════════════════════════════

SEÇÃO 21: HISTÓRICO DE REVISÕES

- Controle de versões do laudo (R00, R01, R02...)
- Descrição das alterações
- Autor e data de cada revisão

═══════════════════════════════════════════════════════════════════

SEÇÃO 22: CONCLUSÃO (Gerada por IA)

1. CONCLUSÃO GERAL (gerada automaticamente pela IA)
   - Contextualização
   - Diagnóstico geral de acessibilidade
   - Principais conformidades e não conformidades
   - Viabilidade técnica de adequação

2. RECOMENDAÇÕES E ADEQUAÇÕES NECESSÁRIAS
   - Lista estruturada e priorizada de adaptações
   - Classificação (SIM/INS/CIV)
   - Seção da NBR 9050:2020 aplicável
   - Necessidade de projeto executivo

3. EDIFICAÇÃO É ACESSÍVEL?
   - [SIM / PARCIALMENTE / NÃO]

4. ADAPTAÇÃO É POSSÍVEL?
   - [SIM / PARCIALMENTE / NÃO]

═══════════════════════════════════════════════════════════════════

OBSERVAÇÕES IMPORTANTES:

• Todos os itens marcados como "NÃO" geram automaticamente não conformidades
• A IA analisa fotos e observações para gerar justificativas técnicas
• As justificativas seguem a ABNT NBR 9050:2020
• Cada não conformidade recebe classificação de prioridade (Baixa/Média/Alta/Crítica)
• O sistema sugere tipo de adaptação necessária para correção
• Histórico completo de revisões é mantido automaticamente`;

  const tabelasBanco = `**TABELAS E CAMPOS DO BANCO DE DADOS:**

• **User** (Entidade padrão Base44 com campos adicionais):
  - id, created_date, updated_date, created_by, full_name, email, role (campos padrão)
  - empresa: string
  - cnpj_cpf: string
  - telefone: string
  - whatsapp: string
  - endereco_profissional: string
  - formacao: string
  - registro_tipo: enum ["CAU", "CREA", "Outro"]
  - registro_numero: string
  - registro_uf: string
  - logo_url: string
  - assinatura_digital_url: string
  - cor_primaria: string
  - tipo_licenca: enum ["completa", "educacional"]
  - nome_licenca: string

• **Laudo**:
  - id, created_date, updated_date, created_by (campos padrão)
  - nome_imovel: string
  - endereco: string
  - cidade: string
  - estado: string
  - cep: string
  - tipo_edificacao: enum ["uso_publico", "uso_coletivo", "uso_privado"]
  - tipo_edificacao_detalhe: string
  - total_pavimentos: number
  - area_total: number
  - ano_construcao: number
  - data_vistoria: string (formato data)
  - responsavel_nome: string
  - responsavel_formacao: string
  - responsavel_registro: string
  - responsavel_numero_registro: string
  - responsavel_art_rrt: string
  - responsavel_assinatura_url: string
  - status: enum ["rascunho", "em_andamento", "concluido"]
  - objetivo: string
  - conclusao: string
  - conclusao_gerada_ia: string
  - recomendacoes: string
  - recomendacoes_gerada_ia: string
  - edificacao_acessivel: enum ["sim", "nao", "parcialmente"]
  - edificacao_acessivel_ia: string
  - adaptacao_possivel: enum ["sim", "nao", "parcialmente"]
  - adaptacao_possivel_ia: string
  - numero_revisao: string
  - ultima_etapa_visitada: number
  - ultima_aba_visitada: string

• **Ambiente**:
  - id, created_date, updated_date, created_by (campos padrão)
  - laudo_id: string
  - nome: string
  - pavimento: string
  - categoria: string (enum)
  - planta_baixa_url: string
  - ordem: number

• **LaudoRevisao**:
  - id, created_date, updated_date, created_by (campos padrão)
  - laudo_id: string
  - numero_revisao: string
  - dados_laudo: object
  - descricao_alteracao: string
  - autor_email: string
  - autor_nome: string

• **Anexo**:
  - id, created_date, updated_date, created_by (campos padrão)
  - laudo_id: string
  - tipo: enum ["foto", "pdf", "word", "excel", "planta", "outro"]
  - url: string
  - nome_arquivo: string
  - categoria: string (enum)
  - pavimento: string
  - descricao: string
  - ordem: number

• **Template**:
  - id, created_date, updated_date, created_by (campos padrão)
  - nome: string
  - tipo_edificacao: enum ["uso_publico", "uso_coletivo", "uso_privado"]
  - descricao: string
  - objetivo_padrao: string
  - secoes_ativas: array of string
  - dados_padrao: object
  - is_padrao: boolean

• **NaoConformidade**:
  - id, created_date, updated_date, created_by (campos padrão)
  - laudo_id: string
  - ambiente_id: string
  - referencia_item_laudo: string
  - categoria: string (enum)
  - item: string
  - pavimento: string
  - status: enum ["sim", "nao", "nao_se_aplica"]
  - observacao_audio_id: string
  - observacao_texto: string
  - justificativa: string
  - justificativa_gerada_ia: string
  - tipo_adaptacao: enum ["SIM", "INS", "CIV", ""]
  - tipo_adaptacao_ia: string
  - necessita_projeto: boolean
  - necessita_projeto_ia: boolean
  - prioridade: enum ["baixa", "media", "alta", "critica", ""]
  - prioridade_ia: string

• **ItemNorma**:
  - id, created_date, updated_date, created_by (campos padrão)
  - versao_norma: enum ["2015", "2020"]
  - categoria: string (enum)
  - referencia_item: string
  - descricao: string
  - criterio_aceite: string
  - secao_norma: string
  - imagem_referencia_url: string
  - ordem: number
  - obrigatorio: boolean
  - aplicavel_a: array of enum

• **Foto**:
  - id, created_date, updated_date, created_by (campos padrão)
  - laudo_id: string
  - url: string
  - pavimento: string
  - descricao: string
  - ordem: number
  - categoria: string (enum)`;

  const schemaSql = `-- DDL para as entidades do aplicativo LaudoAcess

-- Tabela: User (Usuários do sistema - entidade padrão Base44 com campos estendidos)
CREATE TABLE User (
    id VARCHAR(36) PRIMARY KEY, -- UUID gerado automaticamente
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255), -- Email do usuário que criou o registro
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    role ENUM('admin', 'user') DEFAULT 'user',
    empresa VARCHAR(255),
    cnpj_cpf VARCHAR(20),
    telefone VARCHAR(20),
    whatsapp VARCHAR(20),
    endereco_profissional TEXT,
    formacao VARCHAR(255),
    registro_tipo ENUM('CAU', 'CREA', 'Outro'),
    registro_numero VARCHAR(50),
    registro_uf VARCHAR(2),
    logo_url TEXT,
    assinatura_digital_url TEXT,
    cor_primaria VARCHAR(7) DEFAULT '#2563eb',
    tipo_licenca ENUM('completa', 'educacional') DEFAULT 'completa',
    nome_licenca VARCHAR(255)
);

-- Tabela: Laudo (Relatórios de Acessibilidade)
CREATE TABLE Laudo (
    id VARCHAR(36) PRIMARY KEY,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    nome_imovel VARCHAR(255) NOT NULL,
    endereco TEXT NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    cep VARCHAR(10),
    tipo_edificacao ENUM('uso_publico', 'uso_coletivo', 'uso_privado'),
    tipo_edificacao_detalhe VARCHAR(255),
    total_pavimentos INTEGER,
    area_total DECIMAL(10, 2),
    ano_construcao INTEGER,
    data_vistoria DATE,
    responsavel_nome VARCHAR(255),
    responsavel_formacao VARCHAR(255),
    responsavel_registro VARCHAR(50),
    responsavel_numero_registro VARCHAR(50),
    responsavel_art_rrt VARCHAR(50),
    responsavel_assinatura_url TEXT,
    status ENUM('rascunho', 'em_andamento', 'concluido') DEFAULT 'rascunho',
    objetivo TEXT,
    conclusao TEXT,
    conclusao_gerada_ia TEXT,
    recomendacoes TEXT,
    recomendacoes_gerada_ia TEXT,
    edificacao_acessivel ENUM('sim', 'nao', 'parcialmente'),
    edificacao_acessivel_ia TEXT,
    adaptacao_possivel ENUM('sim', 'nao', 'parcialmente'),
    adaptacao_possivel_ia TEXT,
    numero_revisao VARCHAR(10) DEFAULT 'R00',
    ultima_etapa_visitada INTEGER,
    ultima_aba_visitada VARCHAR(50)
);

-- Tabela: Ambiente (Ambientes vistoriados dentro de um laudo)
CREATE TABLE Ambiente (
    id VARCHAR(36) PRIMARY KEY,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    laudo_id VARCHAR(36) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    pavimento VARCHAR(50),
    categoria ENUM('passeio_publico', 'estacionamento', 'circulacao', 'rampas', 'escadas', 'portas', 'sanitarios', 'vestiarios', 'elevadores', 'balcoes', 'lavatorios', 'outro'),
    planta_baixa_url TEXT,
    ordem INTEGER,
    FOREIGN KEY (laudo_id) REFERENCES Laudo(id) ON DELETE CASCADE
);

-- Tabela: LaudoRevisao (Histórico de revisões de um laudo)
CREATE TABLE LaudoRevisao (
    id VARCHAR(36) PRIMARY KEY,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    laudo_id VARCHAR(36) NOT NULL,
    numero_revisao VARCHAR(10) NOT NULL,
    dados_laudo JSONB NOT NULL,
    descricao_alteracao TEXT,
    autor_email VARCHAR(255),
    autor_nome VARCHAR(255),
    FOREIGN KEY (laudo_id) REFERENCES Laudo(id) ON DELETE CASCADE
);

-- Tabela: Anexo (Arquivos anexados a um laudo)
CREATE TABLE Anexo (
    id VARCHAR(36) PRIMARY KEY,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    laudo_id VARCHAR(36) NOT NULL,
    tipo ENUM('foto', 'pdf', 'word', 'excel', 'planta', 'outro') NOT NULL,
    url TEXT NOT NULL,
    nome_arquivo VARCHAR(255),
    categoria ENUM('passeio_publico', 'estacionamento', 'circulacao', 'rampas', 'escadas', 'portas', 'sanitarios', 'mobiliario', 'elevadores', 'vestiarios', 'balcao', 'geral', 'outro'),
    pavimento VARCHAR(50),
    descricao TEXT,
    ordem INTEGER,
    FOREIGN KEY (laudo_id) REFERENCES Laudo(id) ON DELETE CASCADE
);

-- Tabela: Template (Modelos pré-definidos para criação de laudos)
CREATE TABLE Template (
    id VARCHAR(36) PRIMARY KEY,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    nome VARCHAR(255) NOT NULL,
    tipo_edificacao ENUM('uso_publico', 'uso_coletivo', 'uso_privado') NOT NULL,
    descricao TEXT,
    objetivo_padrao TEXT,
    secoes_ativas JSONB,
    dados_padrao JSONB,
    is_padrao BOOLEAN DEFAULT FALSE
);

-- Tabela: NaoConformidade (Itens não conformes identificados na vistoria)
CREATE TABLE NaoConformidade (
    id VARCHAR(36) PRIMARY KEY,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    laudo_id VARCHAR(36) NOT NULL,
    ambiente_id VARCHAR(36),
    referencia_item_laudo VARCHAR(255) NOT NULL,
    categoria ENUM('passeio_publico', 'estacionamento', 'circulacao', 'rampas', 'escadas', 'portas', 'sanitarios', 'vestiarios', 'elevadores', 'balcoes', 'lavatorios', 'vagas_pcd', 'superficies_trabalho', 'superficies_refeicao', 'assentos_fixos', 'camas_macas', 'dispositivos') NOT NULL,
    item TEXT NOT NULL,
    pavimento VARCHAR(50),
    status ENUM('sim', 'nao', 'nao_se_aplica') NOT NULL,
    observacao_audio_id VARCHAR(36),
    observacao_texto TEXT,
    justificativa TEXT,
    justificativa_gerada_ia TEXT,
    tipo_adaptacao ENUM('SIM', 'INS', 'CIV', ''),
    tipo_adaptacao_ia ENUM('SIM', 'INS', 'CIV', ''),
    necessita_projeto BOOLEAN DEFAULT FALSE,
    necessita_projeto_ia BOOLEAN,
    prioridade ENUM('baixa', 'media', 'alta', 'critica', ''),
    prioridade_ia ENUM('baixa', 'media', 'alta', 'critica', ''),
    FOREIGN KEY (laudo_id) REFERENCES Laudo(id) ON DELETE CASCADE,
    FOREIGN KEY (ambiente_id) REFERENCES Ambiente(id) ON DELETE SET NULL
);

-- Tabela: ItemNorma (Itens de checklist baseados na ABNT NBR 9050)
CREATE TABLE ItemNorma (
    id VARCHAR(36) PRIMARY KEY,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    versao_norma ENUM('2015', '2020') DEFAULT '2020' NOT NULL,
    categoria ENUM('passeio_publico', 'estacionamento', 'circulacao', 'rampas', 'escadas', 'portas', 'sanitarios', 'vestiarios', 'elevadores', 'balcoes', 'lavatorios', 'vagas_pcd', 'superficies_trabalho', 'superficies_refeicao', 'assentos_fixos', 'camas_macas', 'dispositivos') NOT NULL,
    referencia_item VARCHAR(255) NOT NULL UNIQUE,
    descricao TEXT NOT NULL,
    criterio_aceite TEXT,
    secao_norma VARCHAR(50),
    imagem_referencia_url TEXT,
    ordem INTEGER,
    obrigatorio BOOLEAN DEFAULT TRUE,
    aplicavel_a JSONB
);

-- Tabela: Foto (Fotos tiradas durante a vistoria)
CREATE TABLE Foto (
    id VARCHAR(36) PRIMARY KEY,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
    laudo_id VARCHAR(36) NOT NULL,
    url TEXT NOT NULL,
    pavimento VARCHAR(50),
    descricao TEXT,
    ordem INTEGER,
    categoria ENUM('passeio_publico', 'estacionamento', 'circulacao', 'rampas', 'escadas', 'portas', 'sanitarios', 'mobiliario', 'outro'),
    FOREIGN KEY (laudo_id) REFERENCES Laudo(id) ON DELETE CASCADE
);`;

  const erdDescricao = `**DIAGRAMA DE ENTIDADE-RELACIONAMENTO (ERD) E RELAÇÕES:**

As relações entre as tabelas são principalmente do tipo "Um para Muitos" (1:N):

1. **User (Usuário)**:
   • 1:N Laudo: Um User pode criar muitos Laudos
   • 1:N Ambiente: Um User pode criar muitos Ambientes
   • 1:N LaudoRevisao: Um User pode criar muitas Revisões
   • 1:N Anexo, Template, NaoConformidade, ItemNorma, Foto

2. **Laudo**:
   • 1:N Ambiente: Um Laudo pode conter muitos Ambientes
   • 1:N LaudoRevisao: Um Laudo pode ter muitas Revisões
   • 1:N Anexo: Um Laudo pode ter muitos Anexos
   • 1:N NaoConformidade: Um Laudo pode ter muitas Não Conformidades
   • 1:N Foto: Um Laudo pode ter muitas Fotos

3. **Ambiente**:
   • N:1 Laudo: Muitos Ambientes pertencem a um Laudo
   • 1:N NaoConformidade: Um Ambiente pode ter muitas Não Conformidades

4. **ItemNorma**:
   • Tabela de referência (checklist base)
   • Não possui FK diretas, mas referencia_item é usado em NaoConformidade

**Constraints e Integridade:**
• ON DELETE CASCADE: Quando um Laudo é excluído, todos os registros relacionados (Ambientes, Revisões, Anexos, Não Conformidades, Fotos) são automaticamente excluídos.
• ON DELETE SET NULL: Quando um Ambiente é excluído, as Não Conformidades associadas têm ambiente_id definido como NULL, mas não são excluídas.`;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">📚 Documentação Técnica Completa</h1>
          <p className="text-slate-600 text-lg">
            Documentação completa do sistema LaudoAcess - PRD, Guia ABNT, Formulário, Banco de Dados e ERD
          </p>
          <Badge className="mt-3 bg-amber-100 text-amber-800 border-amber-300">
            ⚠️ Apenas para uso administrativo e de desenvolvimento
          </Badge>
        </div>

        <Tabs defaultValue="prd" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="prd" className="gap-2">
              <FileText className="w-4 h-4" />
              PRD
            </TabsTrigger>
            <TabsTrigger value="guia" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Guia ABNT
            </TabsTrigger>
            <TabsTrigger value="formulario" className="gap-2">
              <ClipboardList className="w-4 h-4" />
              Formulário
            </TabsTrigger>
            <TabsTrigger value="database" className="gap-2">
              <Database className="w-4 h-4" />
              Banco de Dados
            </TabsTrigger>
            <TabsTrigger value="erd" className="gap-2">
              <Network className="w-4 h-4" />
              Relações (ERD)
            </TabsTrigger>
          </TabsList>

          {/* TAB: PRD */}
          <TabsContent value="prd">
            <div className="space-y-6">
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span>Product Requirement Document (PRD)</span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => copyToClipboard(
                        `Nome: ${prdData.nome}\n\nDescrição: ${prdData.descricao}\n\nIndústria: ${prdData.industria}\n\nPúblico-alvo: ${prdData.publicoAlvo}\n\nComplexidade: ${prdData.complexidade}\n\n${tabelasBanco}`,
                        'prd-completo'
                      )}
                    >
                      {copiedSection === 'prd-completo' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900">Nome do Aplicativo</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(prdData.nome, 'nome')}
                      >
                        {copiedSection === 'nome' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg font-semibold text-xl">
                      {prdData.nome}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900">Descrição Detalhada</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(prdData.descricao, 'descricao')}
                      >
                        {copiedSection === 'descricao' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg leading-relaxed text-justify">
                      {prdData.descricao}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-slate-900">Indústria</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(prdData.industria, 'industria')}
                        >
                          {copiedSection === 'industria' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                      <p className="text-slate-700 bg-blue-50 p-3 rounded-lg text-sm">
                        {prdData.industria}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-slate-900">Público-alvo</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(prdData.publicoAlvo, 'publico')}
                        >
                          {copiedSection === 'publico' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                      <p className="text-slate-700 bg-green-50 p-3 rounded-lg text-sm">
                        {prdData.publicoAlvo}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-bold text-slate-900">Complexidade</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(prdData.complexidade, 'complexidade')}
                        >
                          {copiedSection === 'complexidade' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                      <p className="text-slate-700 bg-purple-50 p-3 rounded-lg text-sm font-semibold">
                        {prdData.complexidade}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB: GUIA ABNT */}
          <TabsContent value="guia">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Guia de Acessibilidade ABNT NBR 9050:2020</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(guiaABNT, 'guia')}
                  >
                    {copiedSection === 'guia' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-slate-700 bg-slate-50 p-6 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap font-mono max-h-[600px] overflow-y-auto leading-relaxed">
                  {guiaABNT}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: FORMULÁRIO */}
          <TabsContent value="formulario">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Formulário Completo - Novo Laudo</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(formularioLaudo, 'formulario')}
                  >
                    {copiedSection === 'formulario' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-slate-700 bg-slate-50 p-6 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap font-mono max-h-[600px] overflow-y-auto leading-relaxed">
                  {formularioLaudo}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: DATABASE */}
          <TabsContent value="database">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Esquema SQL / DDL</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(schemaSql, 'sql')}
                  >
                    {copiedSection === 'sql' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-slate-700 bg-slate-900 text-green-400 p-6 rounded-lg text-xs overflow-x-auto whitespace-pre font-mono max-h-[600px] overflow-y-auto">
                  {schemaSql}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: ERD */}
          <TabsContent value="erd">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Diagrama de Relações (ERD)</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(erdDescricao, 'erd')}
                  >
                    {copiedSection === 'erd' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-slate-700 bg-slate-50 p-6 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
                  {erdDescricao}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}