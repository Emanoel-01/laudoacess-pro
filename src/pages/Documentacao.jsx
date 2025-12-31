import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, FileText, Database, Network } from "lucide-react";
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

  const tabelasBanco = `**Tabelas e campos do banco de dados:**

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

  const erdDescricao = `**Diagrama de Entidade-Relacionamento (ERD) e Relações:**

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
          <h1 className="text-4xl font-bold text-slate-900 mb-3">📚 Documentação Técnica</h1>
          <p className="text-slate-600 text-lg">
            Documentação completa do sistema LaudoAcess para desenvolvedores e administradores
          </p>
          <Badge className="mt-3 bg-amber-100 text-amber-800 border-amber-300">
            ⚠️ Apenas para uso administrativo e de desenvolvimento
          </Badge>
        </div>

        <Tabs defaultValue="prd" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="prd" className="gap-2">
              <FileText className="w-4 h-4" />
              PRD
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

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900">Tabelas e Campos</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(tabelasBanco, 'tabelas')}
                      >
                        {copiedSection === 'tabelas' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <pre className="text-slate-700 bg-slate-50 p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                      {tabelasBanco}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB: DATABASE */}
          <TabsContent value="database">
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
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
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
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