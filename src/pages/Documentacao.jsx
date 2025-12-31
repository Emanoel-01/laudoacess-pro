import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, FileText, Database, Network, BookOpen, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

  const guiaAbnt = `**GUIA DE ACESSIBILIDADE LAUDOACCESS: NBR 9050:2020**

Manual de referência técnica rápido para profissionais, arquitetos e fiscais.

**1. PASSEIO PÚBLICO E PERCURSOS**

• Piso: Firme, estável, regular e antiderrapante em qualquer condição climática. Evitar desníveis.
• Largura Livre: Mínimo de 1,20 m para percursos. Altura livre de 2,10 m.
• Faixa de Serviço: Largura de 0,70 m (ideal), destinada ao mobiliário urbano e arborização.
• Declividade: Longitudinais até 5% (ideal). Transversais até 2% (para drenagem).
• Sinalização Tátil: Pisos táteis de alerta (mudança de direção, obstáculos) e direcionais (guiando o percurso).

⚠️ Não Conformidades Comuns:
- Grelhas/Ralos: Vãos superiores a 1,5 cm na direção do percurso, ou desníveis abruptos não sinalizados.
- Postes/Placas/Lixeiras: Instalados dentro da largura livre de 1,20 m, obstruindo a passagem.
- Mobiliário que invade a Faixa Livre de 1,20 m.
- Declividades maiores que 5% sem patamares de descanso.
- Sinalização tátil sem contraste de cor/luminosidade com o piso adjacente.

**2. CIRCULAÇÃO HORIZONTAL (CORREDORES E MANOBRAS)**

• Largura Corredores: Até 4m = 0,90m | 4-10m = 1,20m | Acima de 10m = 1,50m
• Manobra 90°: Espaço livre de 1,20 m × 1,20 m para curvas de 90°.
• Manobra 360°: Círculo de diâmetro mínimo de 1,50 m para rotação completa da cadeira de rodas.

⚠️ Não Conformidades Comuns:
- Colunas ou móveis invadindo a largura mínima exigida.
- Raio de giro na curva de 90° obstruído por balcões ou expositores.
- Áreas de espera (halls) que não comportam o círculo de manobra livre de 1,50 m.

**3. RAMPAS**

• Largura Livre: 1,20 m
• Inclinação (i): ≤ 8,33% (determinado pela altura do desnível H. Ex: H ≤ 0,50m ⟹ i ≤ 8,33% - 1:12)
• Patamares: Comprimento mínimo de 1,20 m em cada extremidade, a cada 50 m ou mudança de direção
• Corrimãos: Duplos em dois níveis (0,70 m e 0,92 m). Prolongados 0,30 m além do início/fim

⚠️ Não Conformidades Comuns:
- Largura menor que 1,20 m devido a pilares ou guarda-corpos salientes.
- Inclinação acima do limite (8,33%).
- Patamar com inclinação longitudinal/transversal maior que 2%, ou comprimento insuficiente.
- Corrimão interrompido na área do patamar ou sem prolongamento de 0,30 m.

**4. ESCADAS**

• Degraus: Altura (h) e profundidade (p) uniformes. Fórmula de Blondel: 60 cm ≤ (2h + p) ≤ 64 cm
• Corrimãos: Duplos (0,70 m e 0,92 m). Prolongados 0,30 m no início e fim
• Sinalização: Faixa visual e tátil no piso/espelho do primeiro e último degrau

⚠️ Não Conformidades Comuns:
- Pisos ou espelhos com dimensões não uniformes no mesmo lance.
- Ausência de corrimão duplo ou corrimão muito próximo à parede.
- Sinalização visual sem contraste tátil e/ou visual claro.

**5. PORTAS E VÃOS**

• Largura Livre: Geral = 0,80m | Sanitários Acessíveis = 0,90m
• Manuseio (Maçaneta): Tipo alavanca. Altura entre 0,90 m e 1,10 m
• Visibilidade: Faixas de contraste em portas de vidro nas alturas de 0,90 m e 1,50 m

⚠️ Não Conformidades Comuns:
- Vão livre reduzido para menos de 0,80 m quando porta aberta a 90°.
- Maçanetas redondas tipo bola que exigem torção fina.
- Portas de vidro transparentes sem sinalização visual.

**6. SANITÁRIOS ACESSÍVEIS**

• Espaço de Manobra: Círculo de Ø 1,50 m
• Vaso Sanitário: Altura da borda superior 0,46m (com assento) a 0,47m
• Barras de Apoio: Altura da barra horizontal 0,75m. Comprimento mínimo de 0,80m (barra lateral)
• Lavatório: Altura Superior Máxima 0,85m. Altura Livre Inferior Mínima 0,73m (para joelhos)

⚠️ Não Conformidades Comuns:
- Círculo de manobra invadido pela lixeira, porta abrindo para dentro.
- Altura da bacia fora da faixa especificada.
- Barras instaladas com altura ou distância da parede não conforme.
- Lavatórios com coluna/gabinete impedindo aproximação frontal.

**7. ESTACIONAMENTO**

• Número de Vagas: Mínimo 2% do total, garantindo no mínimo 1 vaga
• Dimensões: Vaga 2,50m × 5,00m + Faixa de Transbordo 1,20m ao lado (compartilhável)
• Sinalização: Horizontal (pintura no piso) e Vertical (Placa com SIA)

⚠️ Não Conformidades Comuns:
- Estacionamentos sem a vaga mínima de 1 ou sem localização preferencial.
- Faixa de transbordo inexistente ou obstruída.
- Ausência da placa vertical (SIA).

**8. ELEVADORES E PLATAFORMAS**

• Cabine: Dimensões mínimas para giro de 180°. Pelo menos um espelho na parede de fundo
• Botoeiras: Altura acessível (0,89m a 1,35m). Botões com Braile e em relevo
• Avisos Sonoros: Indicadores sonoros (voz) para identificação de pavimento e direção

⚠️ Não Conformidades Comuns:
- Cabines pequenas impedindo a manobra.
- Botões sem sinalização tátil (Braile/relevo) ou fora da altura de alcance.
- Elevador silencioso ou com som muito baixo.

**9. SINALIZAÇÃO E COMUNICAÇÃO**

• Visual: Contraste de cores, tamanho e tipo de letra adequados. Altura de instalação acessível
• Tátil (Braile): Uso de Braile e caracteres em relevo. Altura de alcance tátil 0,90m a 1,10m
• Emergência: Alarmes sonoros e visuais (luzes estroboscópicas)

⚠️ Não Conformidades Comuns:
- Painéis com letras pequenas, baixo contraste.
- Sinalização tátil instalada muito alta ou muito baixa (fora de 0,90m a 1,10m).
- Sistemas de alarme que emitem apenas som.

**REFERÊNCIAS NORMATIVAS:**
• ABNT NBR 9050:2020 - Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos
• ABNT NBR 16537/2017 - Sinalização tátil no piso
• ABNT NM 313/2007 - Elevadores de passageiros
• Lei Federal nº 10.098/2000 - Lei de Acessibilidade
• Lei Federal nº 13.146/2015 - Lei Brasileira de Inclusão (LBI)
• Decreto Federal nº 5.296/2004`;

  const formularioChecklist = `**FORMULÁRIO NOVO LAUDO DE ACESSIBILIDADE - CHECKLIST COMPLETO**

O formulário de Novo Laudo está dividido em 7 etapas principais:

**ETAPA 1: INFORMAÇÕES GERAIS**
- Nome/Identificação do Imóvel
- Endereço Completo (Logradouro, Número, Complemento, Bairro)
- Cidade, Estado, CEP
- Tipo de Edificação: Uso Público / Uso Coletivo / Uso Privado
- Detalhamento do Tipo (ex: comercial, residencial, educacional)
- Total de Pavimentos/Andares (1 a 25)
- Área Total (m²)
- Ano de Construção
- Data da Vistoria
- Dados do Responsável Técnico:
  * Nome
  * Formação (Arquiteto(a), Engenheiro(a), etc.)
  * Tipo de Registro (CAU, CREA, Outro)
  * Número do Registro
  * UF do Registro
  * Número ART/RRT
  * URL da Assinatura Digital

**ETAPA 2: ÁREAS EXTERNAS**

**2.1 PASSEIO PÚBLICO**
✓ O piso é firme, estável, regular e antiderrapante?
✓ A largura livre de circulação é de no mínimo 1,20m?
✓ A inclinação transversal é de no máximo 2%?
✓ Há rebaixamento de calçada (rampa) nas travessias?

**2.2 ESTACIONAMENTO**
✓ Existe estacionamento?
✓ Há vagas reservadas para PCD e idosos (2% do total, mínimo 1)?
✓ As vagas PCD possuem dimensões mínimas (2,50m × 5,00m)?
✓ Há sinalização horizontal e vertical adequada?

**ETAPA 3: CIRCULAÇÃO E ACESSOS**

**3.1 CIRCULAÇÃO HORIZONTAL**
✓ O piso interno é regular, firme e antiderrapante?
✓ A largura dos corredores atende aos requisitos (0,90m a 1,50m conforme extensão)?
✓ Há piso tátil direcional nos corredores?

**3.2 RAMPAS**
✓ Existe rampa no imóvel?
✓ A inclinação está conforme NBR 9050 (≤ 8,33%)?
✓ A largura livre é de no mínimo 1,20m?
✓ Há corrimãos duplos em duas alturas (0,70m e 0,92m)?
✓ Há piso tátil de alerta no início e fim da rampa?

**3.3 ESCADAS**
✓ Existe escada no imóvel?
✓ Há corrimãos em ambos os lados?
✓ Há sinalização tátil e visual nos degraus?
✓ As dimensões dos degraus são uniformes e atendem à fórmula de Blondel?

**3.4 PORTAS**
✓ As portas possuem vão livre mínimo de 0,80m?
✓ As maçanetas são tipo alavanca?
✓ Estão em altura acessível (0,90m a 1,10m)?

**3.5 ELEVADORES**
✓ Existe elevador no imóvel?
✓ A cabine possui dimensões adequadas para giro de 180° da cadeira de rodas?
✓ As botoeiras estão em altura acessível (0,89m a 1,35m)?
✓ Os botões possuem identificação em Braile?
✓ Há indicadores sonoros e visuais de pavimento?

**ETAPA 4: SANITÁRIOS E VESTIÁRIOS**

**4.1 SANITÁRIOS ACESSÍVEIS**
✓ Existe sanitário acessível?
✓ Há área de manobra livre (círculo de Ø 1,50m)?
✓ A altura do vaso sanitário é adequada (0,46m a 0,47m)?
✓ Há barras de apoio laterais e de fundo?
✓ O lavatório possui altura adequada (máx. 0,85m) e área livre inferior (mín. 0,73m)?

**4.2 VESTIÁRIOS ACESSÍVEIS**
✓ Existem vestiários no imóvel?
✓ Há entrada independente ou localização que garante privacidade?
✓ O boxe do chuveiro possui dimensões mínimas (0,90m × 0,95m)?
✓ Há banco articulado/dobrável?
✓ Há barras de apoio?

**ETAPA 5: MOBILIÁRIO E EQUIPAMENTOS**

**5.1 BALCÕES DE ATENDIMENTO**
✓ Há balcão com altura máxima de 0,90m para atendimento prioritário?
✓ Há área de aproximação frontal (largura 0,80m × profundidade 1,20m)?

**5.2 LAVATÓRIOS E PIAS**
✓ A altura superior do lavatório é de no máximo 0,85m?
✓ A altura livre inferior é de no mínimo 0,73m (para joelhos)?
✓ Há torneiras de fácil manuseio (alavanca, sensor)?

**5.3 VAGAS PARA PCD**
✓ Existe estacionamento com mais de 10 vagas?
✓ Há 3% do total de vagas reservadas para PCD (mínimo 1)?
✓ As dimensões são de 5,50m × 2,50m com área de desembarque zebrada de 1,20m?
✓ Há sinalização vertical com SIA e horizontal no piso?

**5.4 SUPERFÍCIES DE TRABALHO**
✓ Há superfícies com altura livre inferior de 0,73m e profundidade de 0,50m?
✓ A altura do tampo está entre 0,75m e 0,85m?
✓ A largura permite aproximação frontal de M.R. (0,80m × 1,20m)?

**5.5 SUPERFÍCIES DE REFEIÇÃO**
✓ Há superfícies com altura livre inferior de 0,73m e profundidade de 0,50m?
✓ A altura do tampo está entre 0,75m e 0,85m?
✓ Há 5% das mesas adaptadas e sinalizadas com SIA?

**5.6 ASSENTOS FIXOS**
✓ Há assentos para pessoa obesa (largura mínima 0,75m, espaço 1,20m × 0,80m)?
✓ Há módulo de referência livre (0,80m × 1,20m) para P.M.R.?
✓ As dimensões dos assentos fixos permitem transferência lateral?

**5.7 CAMAS E MACAS**
✓ As camas/macas possuem altura máxima de 0,46m (para transferência)?
✓ Há área livre lateral mínima de 0,80m para transferência de cadeira de rodas?

**5.8 DISPOSITIVOS E COMANDOS**
✓ Dispositivos de comando (interruptores, tomadas) estão entre 0,40m e 1,20m?
✓ Dispensers (gel, papel, sabonete) estão em altura acessível (0,80m a 1,20m)?
✓ Bebedouros possuem bica a no máximo 0,90m de altura?

**ETAPA 6: ANEXOS**
- Upload de fotos, plantas baixas, documentos PDF, Word, Excel
- Categorização por tipo (passeio, estacionamento, circulação, etc.)
- Descrição e pavimento/andar de cada anexo

**ETAPA 7: CONCLUSÃO**
- Geração automática com IA da Conclusão Geral
- Geração automática das Recomendações e Adequações Necessárias
- Avaliação: A edificação é acessível? (Sim / Não / Parcialmente)
- Avaliação: É possível adaptar? (Sim / Não / Parcialmente)
- Campos editáveis para ajustes manuais`;

  const tabelasBanco = `**TABELAS DO BANCO DE DADOS:**

• **User** (Entidade padrão Base44 com campos adicionais):
  - id, created_date, updated_date, created_by, full_name, email, role
  - empresa, cnpj_cpf, telefone, whatsapp
  - endereco_profissional, formacao
  - registro_tipo, registro_numero, registro_uf
  - logo_url, assinatura_digital_url, cor_primaria
  - tipo_licenca, nome_licenca

• **Laudo**:
  - id, created_date, updated_date, created_by
  - nome_imovel, endereco, cidade, estado, cep
  - tipo_edificacao, tipo_edificacao_detalhe
  - total_pavimentos, area_total, ano_construcao, data_vistoria
  - responsavel_nome, responsavel_formacao, responsavel_registro
  - responsavel_numero_registro, responsavel_art_rrt, responsavel_assinatura_url
  - status, objetivo, conclusao, conclusao_gerada_ia
  - recomendacoes, recomendacoes_gerada_ia
  - edificacao_acessivel, edificacao_acessivel_ia
  - adaptacao_possivel, adaptacao_possivel_ia
  - numero_revisao, ultima_etapa_visitada, ultima_aba_visitada

• **Ambiente**:
  - id, created_date, updated_date, created_by
  - laudo_id, nome, pavimento, categoria
  - planta_baixa_url, ordem

• **LaudoRevisao**:
  - id, created_date, updated_date, created_by
  - laudo_id, numero_revisao, dados_laudo
  - descricao_alteracao, autor_email, autor_nome

• **Anexo**:
  - id, created_date, updated_date, created_by
  - laudo_id, tipo, url, nome_arquivo
  - categoria, pavimento, descricao, ordem

• **Template**:
  - id, created_date, updated_date, created_by
  - nome, tipo_edificacao, descricao
  - objetivo_padrao, secoes_ativas, dados_padrao, is_padrao

• **NaoConformidade**:
  - id, created_date, updated_date, created_by
  - laudo_id, ambiente_id, referencia_item_laudo
  - categoria, item, pavimento, status
  - observacao_audio_id, observacao_texto
  - justificativa, justificativa_gerada_ia
  - tipo_adaptacao, tipo_adaptacao_ia
  - necessita_projeto, necessita_projeto_ia
  - prioridade, prioridade_ia

• **ItemNorma**:
  - id, created_date, updated_date, created_by
  - versao_norma, categoria, referencia_item
  - descricao, criterio_aceite, secao_norma
  - imagem_referencia_url, ordem, obrigatorio, aplicavel_a

• **Foto**:
  - id, created_date, updated_date, created_by
  - laudo_id, url, pavimento
  - descricao, ordem, categoria`;

  const schemaSql = `-- DDL Completo para as entidades do aplicativo LaudoAcess

CREATE TABLE User (
    id VARCHAR(36) PRIMARY KEY,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(255),
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

  const erdDescricao = `**DIAGRAMA DE RELAÇÕES (ERD):**

As relações entre as tabelas são principalmente do tipo "Um para Muitos" (1:N):

1. **User (Usuário)**:
   • 1:N Laudo: Um User pode criar muitos Laudos
   • 1:N Ambiente, LaudoRevisao, Anexo, Template, NaoConformidade, ItemNorma, Foto

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
• ON DELETE CASCADE: Quando um Laudo é excluído, todos os registros relacionados são automaticamente excluídos
• ON DELETE SET NULL: Quando um Ambiente é excluído, as Não Conformidades têm ambiente_id = NULL`;

  const conteudoCompleto = `${prdData.nome}

${prdData.descricao}

Indústria: ${prdData.industria}
Público-alvo: ${prdData.publicoAlvo}
Complexidade: ${prdData.complexidade}

${guiaAbnt}

${formularioChecklist}

${tabelasBanco}`;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">📚 Documentação Técnica Completa</h1>
          <p className="text-slate-600 text-lg">
            Documentação completa do sistema LaudoAcess: PRD, Guia ABNT NBR 9050:2020, Formulário e Banco de Dados
          </p>
          <Badge className="mt-3 bg-amber-100 text-amber-800 border-amber-300">
            ⚠️ Apenas para uso administrativo e de desenvolvimento
          </Badge>
        </div>

        <Tabs defaultValue="prd" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
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
              Banco
            </TabsTrigger>
            <TabsTrigger value="erd" className="gap-2">
              <Network className="w-4 h-4" />
              ERD
            </TabsTrigger>
          </TabsList>

          {/* TAB: PRD */}
          <TabsContent value="prd">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Product Requirement Document (PRD)</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copyToClipboard(conteudoCompleto, 'prd-completo')}
                  >
                    {copiedSection === 'prd-completo' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">Nome do Aplicativo</h3>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(prdData.nome, 'nome')}>
                      {copiedSection === 'nome' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg font-semibold text-xl">{prdData.nome}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">Descrição Detalhada</h3>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(prdData.descricao, 'descricao')}>
                      {copiedSection === 'descricao' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg leading-relaxed text-justify">{prdData.descricao}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Indústria</h3>
                    <p className="text-slate-700 bg-blue-50 p-3 rounded-lg text-sm">{prdData.industria}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Público-alvo</h3>
                    <p className="text-slate-700 bg-green-50 p-3 rounded-lg text-sm">{prdData.publicoAlvo}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">Complexidade</h3>
                    <p className="text-slate-700 bg-purple-50 p-3 rounded-lg text-sm font-semibold">{prdData.complexidade}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: GUIA ABNT */}
          <TabsContent value="guia">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Guia de Acessibilidade ABNT NBR 9050:2020</span>
                  <Button variant="secondary" size="sm" onClick={() => copyToClipboard(guiaAbnt, 'guia')}>
                    {copiedSection === 'guia' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-slate-700 bg-slate-50 p-6 rounded-lg text-sm leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-y-auto">
                  {guiaAbnt}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: FORMULÁRIO */}
          <TabsContent value="formulario">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Formulário Novo Laudo - Checklist Completo</span>
                  <Button variant="secondary" size="sm" onClick={() => copyToClipboard(formularioChecklist, 'formulario')}>
                    {copiedSection === 'formulario' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-slate-700 bg-slate-50 p-6 rounded-lg text-sm leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-y-auto">
                  {formularioChecklist}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: DATABASE */}
          <TabsContent value="database">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>Esquema SQL / DDL Completo</span>
                  <Button variant="secondary" size="sm" onClick={() => copyToClipboard(schemaSql, 'sql')}>
                    {copiedSection === 'sql' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="text-slate-700 bg-slate-900 text-green-400 p-6 rounded-lg text-xs leading-relaxed whitespace-pre font-mono max-h-[600px] overflow-y-auto">
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
                  <Button variant="secondary" size="sm" onClick={() => copyToClipboard(erdDescricao, 'erd')}>
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

        {/* INFORMAÇÕES ADICIONAIS */}
        <Card className="mt-8 border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-blue-900">
              ℹ️ Informações Técnicas da Plataforma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• <strong>Plataforma:</strong> Base44 (Backend as a Service)</li>
              <li>• <strong>Frontend:</strong> React + Tailwind CSS + shadcn/ui + TypeScript</li>
              <li>• <strong>Autenticação:</strong> Gerenciada pela plataforma Base44</li>
              <li>• <strong>Banco de Dados:</strong> NoSQL gerenciado automaticamente</li>
              <li>• <strong>Integrações:</strong> IA (OpenAI) para geração de conclusões e recomendações</li>
              <li>• <strong>Geração de PDF:</strong> Função backend customizada (jsPDF)</li>
              <li>• <strong>White-Label:</strong> Personalização de logo, cores e assinatura digital</li>
              <li>• <strong>Normas de Referência:</strong> ABNT NBR 9050:2020, NBR 16537/2017, NM 313/2007</li>
              <li>• <strong>Legislação:</strong> Lei 10.098/2000, Lei 13.146/2015 (LBI), Decreto 5.296/2004</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}