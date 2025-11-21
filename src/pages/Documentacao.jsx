import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Database, Layers, Code, Users, Bot } from "lucide-react";

export default function Documentacao() {
  const [markdown, setMarkdown] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    gerarDocumentacao();
  }, []);

  const gerarDocumentacao = async () => {
    setIsGenerating(true);

    let doc = `# Documentação Técnica - LaudoAcess\n\n`;
    doc += `**Versão:** 1.0\n`;
    doc += `**Data:** ${new Date().toLocaleDateString('pt-BR')}\n`;
    doc += `**Plataforma:** Base44\n\n`;
    doc += `---\n\n`;

    // 1. VISÃO GERAL DO SISTEMA
    doc += `## 1. Visão Geral do Sistema\n\n`;
    doc += `### 1.1 Descrição\n`;
    doc += `O **LaudoAcess** é uma aplicação SaaS especializada em laudos técnicos de acessibilidade arquitetônica conforme ABNT NBR 9050:2020. O sistema permite que profissionais da área de arquitetura e engenharia realizem vistorias, registrem conformidades e não-conformidades, e gerem relatórios técnicos profissionais.\n\n`;

    doc += `### 1.2 Funcionalidades Principais\n`;
    doc += `- ✅ Criação e gestão de laudos técnicos\n`;
    doc += `- ✅ Checklist detalhado baseado na NBR 9050:2020\n`;
    doc += `- ✅ Captura de observações via texto e áudio\n`;
    doc += `- ✅ Análise automatizada com IA para justificativas técnicas\n`;
    doc += `- ✅ Gestão de ambientes e anexos (fotos, plantas, documentos)\n`;
    doc += `- ✅ Geração automatizada de PDF profissional\n`;
    doc += `- ✅ Sistema de templates personalizáveis\n`;
    doc += `- ✅ Controle de revisões e histórico de alterações\n`;
    doc += `- ✅ Gestão de perfil profissional (CAU/CREA)\n\n`;

    doc += `### 1.3 Arquitetura Tecnológica\n`;
    doc += `| Camada | Tecnologia |\n`;
    doc += `|--------|------------|\n`;
    doc += `| Frontend | React + TailwindCSS + Shadcn/UI |\n`;
    doc += `| Backend | Base44 Backend as a Service |\n`;
    doc += `| Banco de Dados | Base44 Managed Database |\n`;
    doc += `| Autenticação | Base44 Auth (OAuth + JWT) |\n`;
    doc += `| IA/ML | OpenAI GPT-4 (via Base44 Integrations) |\n`;
    doc += `| PDF Generation | Custom Backend Function |\n`;
    doc += `| Storage | Base44 File Storage |\n\n`;

    // 2. ENTIDADES E MODELO DE DADOS
    doc += `## 2. Entidades e Modelo de Dados\n\n`;

    const entidades = [
      { 
        nome: "Laudo", 
        descricao: "Entidade principal do sistema, armazena todas as informações do laudo técnico"
      },
      { 
        nome: "Ambiente", 
        descricao: "Representa os ambientes/espaços vistoriados dentro de uma edificação"
      },
      { 
        nome: "NaoConformidade", 
        descricao: "Registra não-conformidades identificadas durante a vistoria"
      },
      { 
        nome: "Anexo", 
        descricao: "Armazena arquivos anexados ao laudo (fotos, plantas, documentos)"
      },
      { 
        nome: "Foto", 
        descricao: "Registro específico de fotografias categorizadas"
      },
      { 
        nome: "LaudoRevisao", 
        descricao: "Histórico de revisões e alterações do laudo"
      },
      { 
        nome: "Template", 
        descricao: "Templates pré-configurados para diferentes tipos de edificação"
      },
      { 
        nome: "ItemNorma", 
        descricao: "Base de conhecimento com itens da NBR 9050 (2015 e 2020)"
      }
    ];

    for (const entidade of entidades) {
      doc += `### 2.${entidades.indexOf(entidade) + 1} Entidade: ${entidade.nome}\n\n`;
      doc += `**Descrição:** ${entidade.descricao}\n\n`;

      try {
        const schema = await base44.entities[entidade.nome].schema();
        
        doc += `**Campos:**\n\n`;
        doc += `| Campo | Tipo | Obrigatório | Descrição |\n`;
        doc += `|-------|------|-------------|----------|\n`;

        const properties = schema.properties || {};
        const required = schema.required || [];

        for (const [campo, config] of Object.entries(properties)) {
          const tipo = config.type || "string";
          const obrigatorio = required.includes(campo) ? "✅ Sim" : "❌ Não";
          const descricao = config.description || "-";
          doc += `| \`${campo}\` | ${tipo} | ${obrigatorio} | ${descricao} |\n`;
        }

        doc += `\n`;
      } catch (error) {
        doc += `_Erro ao carregar schema da entidade_\n\n`;
      }
    }

    // 3. ESTRUTURA DE PÁGINAS
    doc += `## 3. Estrutura de Páginas\n\n`;

    const paginas = [
      {
        nome: "Dashboard",
        rota: "/Dashboard",
        descricao: "Página inicial com visão geral dos laudos e estatísticas",
        componentes: ["Card de estatísticas", "Lista de laudos", "Filtros de status"]
      },
      {
        nome: "NovoLaudo",
        rota: "/NovoLaudo",
        descricao: "Wizard de criação de novo laudo com navegação por etapas",
        componentes: ["Stepper", "Formulários de checklist", "Sistema de anexos"]
      },
      {
        nome: "EditarLaudo",
        rota: "/EditarLaudo?id={id}",
        descricao: "Edição completa de laudo existente com abas",
        componentes: ["Tabs de navegação", "Histórico de revisões", "Gestão de ambientes"]
      },
      {
        nome: "Templates",
        rota: "/Templates",
        descricao: "Gerenciamento de templates personalizados",
        componentes: ["Lista de templates", "Formulário de criação/edição"]
      },
      {
        nome: "MeuPerfil",
        rota: "/MeuPerfil",
        descricao: "Configurações do perfil profissional do usuário",
        componentes: ["Dados profissionais", "Upload de assinatura", "Informações de registro"]
      },
      {
        nome: "Guia",
        rota: "/Guia",
        descricao: "Guia de referência da ABNT NBR 9050",
        componentes: ["Base de conhecimento", "Itens técnicos", "Referências normativas"]
      }
    ];

    doc += `| Página | Rota | Descrição | Componentes Principais |\n`;
    doc += `|--------|------|-----------|------------------------|\n`;
    for (const pagina of paginas) {
      doc += `| **${pagina.nome}** | \`${pagina.rota}\` | ${pagina.descricao} | ${pagina.componentes.join(", ")} |\n`;
    }
    doc += `\n`;

    // 4. COMPONENTES PRINCIPAIS
    doc += `## 4. Componentes Principais\n\n`;

    const componentes = [
      {
        nome: "ChecklistItem",
        caminho: "components/laudo/ChecklistItem.jsx",
        descricao: "Componente reutilizável para itens de checklist com suporte a IA",
        props: ["label", "value", "onChange", "observationValue", "justificativaValue", "tipoAdaptacaoValue"]
      },
      {
        nome: "Conclusao",
        caminho: "components/laudo/Conclusao.jsx",
        descricao: "Geração automatizada de conclusão técnica com IA",
        props: ["data", "onChange", "laudoCompleto"]
      },
      {
        nome: "GestaoAnexos",
        caminho: "components/laudo/GestaoAnexos.jsx",
        descricao: "Upload e gerenciamento de anexos (fotos, PDFs, plantas)",
        props: ["laudoId"]
      },
      {
        nome: "GestaoAmbientes",
        caminho: "components/laudo/GestaoAmbientes.jsx",
        descricao: "CRUD de ambientes vistoriados na edificação",
        props: ["laudoId"]
      },
      {
        nome: "HistoricoRevisoes",
        caminho: "components/laudo/HistoricoRevisoes.jsx",
        descricao: "Visualização e restauração de revisões anteriores",
        props: ["laudoId", "onRestaurar"]
      },
      {
        nome: "ConfiguracaoPDF",
        caminho: "components/laudo/ConfiguracaoPDF.jsx",
        descricao: "Modal de configuração para geração de PDF personalizado",
        props: ["open", "onClose", "onGenerate", "laudoData"]
      }
    ];

    for (const comp of componentes) {
      doc += `### 4.${componentes.indexOf(comp) + 1} ${comp.nome}\n\n`;
      doc += `**Caminho:** \`${comp.caminho}\`\n\n`;
      doc += `**Descrição:** ${comp.descricao}\n\n`;
      doc += `**Props:**\n`;
      for (const prop of comp.props) {
        doc += `- \`${prop}\`\n`;
      }
      doc += `\n`;
    }

    // 5. LÓGICA DE NEGÓCIO
    doc += `## 5. Lógica de Negócio e Fluxos\n\n`;

    doc += `### 5.1 Fluxo de Criação de Laudo\n\n`;
    doc += `1. **Seleção de Template** (Opcional)\n`;
    doc += `   - Usuário pode selecionar template pré-configurado\n`;
    doc += `   - Template aplica configurações padrão e seções específicas\n\n`;
    doc += `2. **Preenchimento de Informações Gerais**\n`;
    doc += `   - Dados do imóvel (nome, endereço, tipo de edificação)\n`;
    doc += `   - Dados do profissional responsável (CAU/CREA, ART/RRT)\n\n`;
    doc += `3. **Checklist por Categorias**\n`;
    doc += `   - Passeio Público, Estacionamento, Circulação\n`;
    doc += `   - Rampas, Escadas, Portas, Elevadores\n`;
    doc += `   - Sanitários, Vestiários, Mobiliário\n`;
    doc += `   - Para cada item: Sim/Não/N/A + Observações + IA Assist\n\n`;
    doc += `4. **Gestão de Ambientes**\n`;
    doc += `   - Cadastro de ambientes vistoriados\n`;
    doc += `   - Upload de plantas baixas por ambiente\n\n`;
    doc += `5. **Anexos e Documentação**\n`;
    doc += `   - Upload de fotos categorizadas\n`;
    doc += `   - Upload de documentos complementares\n\n`;
    doc += `6. **Geração de Conclusão com IA**\n`;
    doc += `   - IA analisa todas as não-conformidades\n`;
    doc += `   - Gera conclusão técnica profissional\n`;
    doc += `   - Sugere recomendações priorizadas\n`;
    doc += `   - Avalia acessibilidade e viabilidade de adaptação\n\n`;
    doc += `7. **Geração de PDF**\n`;
    doc += `   - Seleção de seções a incluir\n`;
    doc += `   - Customização de cabeçalho/rodapé\n`;
    doc += `   - Download do relatório final\n\n`;

    doc += `### 5.2 Sistema de Revisões\n\n`;
    doc += `- Cada alteração no laudo incrementa o número de revisão (R00 → R01 → R02...)\n`;
    doc += `- Snapshot completo dos dados é armazenado na entidade \`LaudoRevisao\`\n`;
    doc += `- Usuário pode visualizar e restaurar revisões anteriores\n`;
    doc += `- Histórico inclui autor, data e descrição da alteração\n\n`;

    doc += `### 5.3 Análise com IA\n\n`;
    doc += `**Funcionalidades de IA implementadas:**\n\n`;
    doc += `1. **Justificativas Técnicas Automáticas**\n`;
    doc += `   - Baseadas em não-conformidades identificadas\n`;
    doc += `   - Citam artigos específicos da NBR 9050:2020\n`;
    doc += `   - Sugerem tipo de adaptação (SIM/INS/CIV)\n\n`;
    doc += `2. **Conclusão e Recomendações**\n`;
    doc += `   - Análise completa do contexto da edificação\n`;
    doc += `   - Considera todos os ambientes e não-conformidades\n`;
    doc += `   - Gera recomendações priorizadas\n`;
    doc += `   - Avalia viabilidade técnica de adaptações\n\n`;
    doc += `3. **Transcrição de Áudio** (Planejado)\n`;
    doc += `   - Observações via gravação de áudio\n`;
    doc += `   - Transcrição automática para texto\n\n`;

    // 6. SEGURANÇA E CONTROLE DE ACESSO
    doc += `## 6. Segurança e Controle de Acesso\n\n`;

    doc += `### 6.1 Row Level Security (RLS)\n\n`;
    doc += `Todas as entidades do sistema implementam RLS para garantir isolamento de dados entre usuários:\n\n`;
    doc += `| Operação | Regra |\n`;
    doc += `|----------|-------|\n`;
    doc += `| **CREATE** | Usuário autenticado (role != guest) |\n`;
    doc += `| **READ** | \`created_by == user.email\` |\n`;
    doc += `| **UPDATE** | \`created_by == user.email\` |\n`;
    doc += `| **DELETE** | \`created_by == user.email\` |\n\n`;

    doc += `### 6.2 Autenticação\n\n`;
    doc += `- Sistema de autenticação gerenciado pelo Base44\n`;
    doc += `- Suporte a OAuth (Google, Microsoft, etc.)\n`;
    doc += `- Tokens JWT para sessões seguras\n`;
    doc += `- Refresh tokens automáticos\n\n`;

    doc += `### 6.3 Roles e Permissões\n\n`;
    doc += `| Role | Permissões |\n`;
    doc += `|------|------------|\n`;
    doc += `| **Admin** | Gestão de \`ItemNorma\`, acesso total |\n`;
    doc += `| **User** | CRUD de laudos próprios, templates próprios |\n`;
    doc += `| **Guest** | Somente leitura (se app for público) |\n\n`;

    // 7. INTEGRAÇÕES
    doc += `## 7. Integrações e Backend Functions\n\n`;

    doc += `### 7.1 Core Integrations (Base44)\n\n`;
    doc += `| Integração | Uso |\n`;
    doc += `|------------|-----|\n`;
    doc += `| **InvokeLLM** | Análise com IA, geração de conclusões e justificativas |\n`;
    doc += `| **UploadFile** | Upload de anexos, fotos e documentos |\n`;
    doc += `| **GenerateImage** | (Reservado para futuras funcionalidades) |\n`;
    doc += `| **SendEmail** | (Reservado para notificações) |\n\n`;

    doc += `### 7.2 Backend Functions\n\n`;
    doc += `#### gerarLaudoPDF\n`;
    doc += `**Função:** Gera PDF profissional do laudo técnico\n\n`;
    doc += `**Parâmetros de entrada:**\n`;
    doc += `\`\`\`json\n`;
    doc += `{\n`;
    doc += `  "laudoData": {...},  // Dados completos do laudo\n`;
    doc += `  "config": {\n`;
    doc += `    "secoes": [],      // Seções a incluir\n`;
    doc += `    "incluir_header": true,\n`;
    doc += `    "incluir_footer": true,\n`;
    doc += `    "sumario_executivo": "...",\n`;
    doc += `    "conclusao_customizada": "..."\n`;
    doc += `  }\n`;
    doc += `}\n`;
    doc += `\`\`\`\n\n`;
    doc += `**Saída:** Arquivo PDF binário\n\n`;

    // 8. DESIGN PATTERNS E BOAS PRÁTICAS
    doc += `## 8. Design Patterns e Boas Práticas\n\n`;

    doc += `### 8.1 Componentização\n\n`;
    doc += `- Componentes reutilizáveis (\`ChecklistItem\`, \`GestaoAnexos\`)\n`;
    doc += `- Separação de responsabilidades (UI vs Lógica)\n`;
    doc += `- Props tipadas e documentadas\n\n`;

    doc += `### 8.2 Estado e Gerenciamento de Dados\n\n`;
    doc += `- React Hooks (\`useState\`, \`useEffect\`)\n`;
    doc += `- React Query para cache e sincronização\n`;
    doc += `- Propagação de mudanças via callbacks (\`onChange\`)\n\n`;

    doc += `### 8.3 UX/UI\n\n`;
    doc += `- Design responsivo (mobile-first)\n`;
    doc += `- Feedback visual (loading states, confirmações)\n`;
    doc += `- Navegação intuitiva (wizard, tabs)\n`;
    doc += `- Acessibilidade (WCAG 2.1 AA)\n\n`;

    // 9. ESTILOS E DESIGN SYSTEM
    doc += `## 9. Estilos e Design System\n\n`;

    doc += `### 9.1 Paleta de Cores\n\n`;
    doc += `| Cor | Código Hex | Uso |\n`;
    doc += `|-----|------------|-----|\n`;
    doc += `| **Primary** | \`#2563eb\` (blue-600) | Botões principais, links |\n`;
    doc += `| **Secondary** | \`#475569\` (slate-600) | Texto secundário |\n`;
    doc += `| **Success** | \`#16a34a\` (green-600) | Conformidades, sucesso |\n`;
    doc += `| **Warning** | \`#eab308\` (yellow-500) | Parcial, alertas |\n`;
    doc += `| **Danger** | \`#dc2626\` (red-600) | Não-conformidades, erros |\n`;
    doc += `| **Info** | \`#7c3aed\` (purple-600) | IA, assistente |\n\n`;

    doc += `### 9.2 Componentes UI (Shadcn/UI)\n\n`;
    doc += `- **Button**: Ações primárias e secundárias\n`;
    doc += `- **Card**: Agrupamento de conteúdo\n`;
    doc += `- **Input/Textarea**: Entrada de dados\n`;
    doc += `- **Select**: Seleção de opções\n`;
    doc += `- **Tabs**: Navegação entre seções\n`;
    doc += `- **Dialog/Modal**: Confirmações e formulários\n`;
    doc += `- **Badge**: Status e categorias\n`;
    doc += `- **Alert**: Mensagens informativas\n\n`;

    doc += `### 9.3 Iconografia\n\n`;
    doc += `- **Biblioteca:** Lucide React\n`;
    doc += `- **Estilo:** Outline, 24x24px padrão\n`;
    doc += `- **Cores:** Herdadas do contexto ou customizadas\n\n`;

    // 10. ROADMAP
    doc += `## 10. Roadmap e Próximas Funcionalidades\n\n`;

    doc += `### 10.1 Em Desenvolvimento\n\n`;
    doc += `- [ ] Transcrição automática de áudio para observações\n`;
    doc += `- [ ] Relatórios analíticos (dashboard avançado)\n`;
    doc += `- [ ] Exportação para outros formatos (Word, Excel)\n\n`;

    doc += `### 10.2 Planejado\n\n`;
    doc += `- [ ] Aplicativo móvel (React Native)\n`;
    doc += `- [ ] Colaboração em tempo real (multi-usuário)\n`;
    doc += `- [ ] Integração com AutoCAD (importação de plantas)\n`;
    doc += `- [ ] Sistema de notificações (e-mail, push)\n`;
    doc += `- [ ] Marketplace de templates da comunidade\n`;
    doc += `- [ ] Análise preditiva de custos de adaptação\n\n`;

    // APÊNDICES
    doc += `## Apêndices\n\n`;

    doc += `### A. Glossário\n\n`;
    doc += `| Termo | Definição |\n`;
    doc += `|-------|----------|\n`;
    doc += `| **ABNT** | Associação Brasileira de Normas Técnicas |\n`;
    doc += `| **NBR 9050** | Norma Brasileira de Acessibilidade |\n`;
    doc += `| **PCD** | Pessoa com Deficiência |\n`;
    doc += `| **CAU** | Conselho de Arquitetura e Urbanismo |\n`;
    doc += `| **CREA** | Conselho Regional de Engenharia e Agronomia |\n`;
    doc += `| **ART** | Anotação de Responsabilidade Técnica |\n`;
    doc += `| **RRT** | Registro de Responsabilidade Técnica |\n`;
    doc += `| **RLS** | Row Level Security (Segurança em Nível de Linha) |\n\n`;

    doc += `### B. Referências Técnicas\n\n`;
    doc += `- ABNT NBR 9050:2020 - Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos\n`;
    doc += `- Lei Federal 13.146/2015 - Lei Brasileira de Inclusão da Pessoa com Deficiência\n`;
    doc += `- Decreto 5.296/2004 - Regulamenta as Leis de acessibilidade\n`;
    doc += `- Base44 Documentation - https://docs.base44.com\n\n`;

    doc += `---\n\n`;
    doc += `**Documento gerado automaticamente pelo sistema LaudoAcess**\n`;
    doc += `_Este é um documento vivo e será atualizado conforme o sistema evolui._\n`;

    setMarkdown(doc);
    setIsGenerating(false);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LaudoAcess_Documentacao_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">📚 Documentação Técnica</h1>
            <p className="text-slate-600">Documentação completa do sistema LaudoAcess</p>
          </div>
          <Button
            onClick={downloadMarkdown}
            disabled={isGenerating || !markdown}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <Download className="w-5 h-5" />
            Baixar Markdown
          </Button>
        </div>

        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-slate-600 text-lg">Gerando documentação técnica...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Database className="w-5 h-5" />
                    Entidades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900">8</div>
                  <p className="text-sm text-blue-700">Modelos de dados</p>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <Layers className="w-5 h-5" />
                    Páginas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-900">6</div>
                  <p className="text-sm text-green-700">Rotas principais</p>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Code className="w-5 h-5" />
                    Componentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-900">25+</div>
                  <p className="text-sm text-purple-700">Reutilizáveis</p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-orange-900">
                    <Bot className="w-5 h-5" />
                    IA Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-900">3</div>
                  <p className="text-sm text-orange-700">Recursos de IA</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  Preview da Documentação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 rounded-lg p-6 overflow-auto max-h-[600px]">
                  <pre className="text-slate-100 text-sm font-mono whitespace-pre-wrap">{markdown}</pre>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}