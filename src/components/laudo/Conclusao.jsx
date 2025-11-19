import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Added this import
import { FileText, Sparkles, Loader2, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Conclusao({ data, onChange, laudoCompleto }) {
  const [isGeneratingConclusao, setIsGeneratingConclusao] = useState(false);
  const [sugestoesIA, setSugestoesIA] = useState(null);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const gerarConclusaoCompletaIA = async () => {
    setIsGeneratingConclusao(true);
    
    try {
      // Buscar ambientes cadastrados no laudo
      const ambientes = await base44.entities.Ambiente.filter({ laudo_id: laudoCompleto.id });
      
      // Buscar não conformidades do laudo
      const naoConformidades = await base44.entities.NaoConformidade.filter({ laudo_id: laudoCompleto.id });
      
      // Preparar dados dos ambientes para o prompt
      let ambientesInfo = "";
      if (ambientes && ambientes.length > 0) {
        ambientesInfo = "\n**AMBIENTES VISTORIADOS:**\n";
        ambientes.forEach((amb, index) => {
          ambientesInfo += `${index + 1}. ${amb.nome} (${amb.pavimento || 'sem pavimento'}) - Categoria: ${amb.categoria || 'não especificada'}\n`;
        });
      }
      
      // Preparar dados das não conformidades
      let naoConformidadesInfo = "";
      if (naoConformidades && naoConformidades.length > 0) {
        naoConformidadesInfo = "\n**NÃO CONFORMIDADES IDENTIFICADAS:**\n";
        const categorias = {};
        
        naoConformidades.forEach(nc => {
          if (nc.status === 'nao') {
            if (!categorias[nc.categoria]) {
              categorias[nc.categoria] = [];
            }
            categorias[nc.categoria].push({
              item: nc.item,
              observacao: nc.observacao_texto,
              pavimento: nc.pavimento
            });
          }
        });
        
        Object.keys(categorias).forEach(cat => {
          naoConformidadesInfo += `\n${cat.replace(/_/g, ' ').toUpperCase()}:\n`;
          categorias[cat].forEach(item => {
            naoConformidadesInfo += `  • ${item.item}${item.pavimento ? ' (Pavimento: ' + item.pavimento + ')' : ''}${item.observacao ? ' - ' + item.observacao : ''}\n`;
          });
        });
      }
    
      const prompt = `Você é um arquiteto especialista em acessibilidade arquitetônica conforme ABNT NBR 9050:2020.

**DADOS DO IMÓVEL VISTORIADO:**
- Nome/Identificação: ${laudoCompleto.nome_imovel}
- Endereço Completo: ${laudoCompleto.endereco}, ${laudoCompleto.cidade} - ${laudoCompleto.estado}
- Classificação de Uso: ${laudoCompleto.tipo_edificacao_detalhe || laudoCompleto.tipo_edificacao || "não especificado"}
- Total de Pavimentos: ${laudoCompleto.total_pavimentos || "não informado"}
- Área Total Construída: ${laudoCompleto.area_total ? laudoCompleto.area_total + " m²" : "não informada"}
- Data da Vistoria: ${laudoCompleto.data_vistoria || "não informada"}
${ambientesInfo}
${naoConformidadesInfo}

**CONTEXTO:**
Este laudo foi elaborado para avaliar as condições de acessibilidade da edificação conforme os requisitos da ABNT NBR 9050:2020, legislação vigente (Lei Federal 13.146/2015 - LBI) e Decreto 5.296/2004.

**TAREFA:**
Com base nos dados fornecidos acima sobre o imóvel, os ambientes vistoriados e as não conformidades identificadas, elabore uma conclusão técnica profissional e completa para o laudo de acessibilidade. Use APENAS as não conformidades que foram efetivamente identificadas. Se não houver não conformidades listadas, considere a edificação acessível ou parcialmente acessível.

Sua análise deve ser estruturada em:

1. **CONCLUSÃO GERAL** (250-400 palavras):
   - Parágrafo 1: Contextualização (tipo de edificação, localização, finalidade)
   - Parágrafo 2: Resumo do diagnóstico geral de acessibilidade (considerando o tipo de edificação)
   - Parágrafo 3: Principais conformidades e não conformidades típicas para esse tipo de edificação
   - Parágrafo 4: Viabilidade técnica de adequação e considerações finais
   - Tom formal, técnico e objetivo, adequado para laudo oficial
   - Citar sempre "ABNT NBR 9050:2020" e não outras versões

2. **RECOMENDAÇÕES E ADEQUAÇÕES NECESSÁRIAS** (300-500 palavras):
   - Liste de forma estruturada e priorizada as adaptações típicas necessárias para esse tipo de edificação
   - Para cada recomendação, indique:
     * Descrição clara da adequação
     * Classificação: SIM (simples), INS (instalação) ou CIV (civil)
     * Seção específica da NBR 9050:2020 aplicável
     * Se necessita projeto executivo
   - Organize por prioridade (críticas primeiro, depois altas, médias e baixas)
   - Use marcadores (•) ou numeração para facilitar leitura
   - Seja realista e considere as características da edificação

3. **EDIFICAÇÃO É ACESSÍVEL?**
   Avalie objetivamente e responda:
   - "sim": Edificação atende integralmente aos requisitos da NBR 9050:2020
   - "parcialmente": Atende alguns requisitos mas possui não conformidades que podem ser corrigidas
   - "nao": Não atende aos requisitos mínimos e possui barreiras significativas

4. **ADAPTAÇÃO É POSSÍVEL?**
   Avalie a viabilidade técnica e responda:
   - "sim": É plenamente viável adaptar a edificação
   - "parcialmente": Algumas adaptações são viáveis mas há limitações técnicas/estruturais/legais
   - "nao": Inviável tecnicamente ou economicamente

**DIRETRIZES IMPORTANTES:**
- Seja preciso, técnico e objetivo
- Use APENAS "ABNT NBR 9050:2020" (não 2015 ou outras versões)
- Baseie-se no tipo de edificação informado
- Não seja genérico: adapte a análise ao contexto específico do imóvel
- Evite jargões excessivos, mantenha clareza profissional
- Não invente dados que não foram fornecidos

Retorne APENAS o JSON estruturado conforme o schema fornecido.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: false,
        response_json_schema: {
          type: "object",
          properties: {
            conclusao: { type: "string" },
            recomendacoes: { type: "string" },
            edificacao_acessivel: { 
              type: "string",
              enum: ["sim", "nao", "parcialmente"]
            },
            adaptacao_possivel: { 
              type: "string",
              enum: ["sim", "nao", "parcialmente"]
            }
          }
        }
      });

      setSugestoesIA(response);
    } catch (error) {
      alert(`Erro ao gerar análise: ${error.message}`);
    } finally {
      setIsGeneratingConclusao(false);
    }
  };

  const aplicarSugestoesIA = () => {
    if (!sugestoesIA) return;

    handleChange("conclusao", sugestoesIA.conclusao);
    handleChange("conclusao_gerada_ia", sugestoesIA.conclusao);
    handleChange("recomendacoes", sugestoesIA.recomendacoes);
    handleChange("recomendacoes_gerada_ia", sugestoesIA.recomendacoes);
    handleChange("edificacao_acessivel", sugestoesIA.edificacao_acessivel);
    handleChange("edificacao_acessivel_ia", sugestoesIA.edificacao_acessivel);
    handleChange("adaptacao_possivel", sugestoesIA.adaptacao_possivel);
    handleChange("adaptacao_possivel_ia", sugestoesIA.adaptacao_possivel);

    setSugestoesIA(null);
    alert("Análise da IA aplicada com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Conclusão do Laudo</h2>
        <p className="text-slate-600">Análise final gerada automaticamente pela IA</p>
      </div>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-purple-900">
            <Sparkles className="w-5 h-5" />
            Geração Automática com IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-800 mb-4">
            A IA analisará todos os dados do laudo e gerará automaticamente a conclusão completa, 
            recomendações técnicas e avaliação de acessibilidade.
          </p>
          <Button
            type="button"
            onClick={gerarConclusaoCompletaIA}
            disabled={isGeneratingConclusao || !laudoCompleto.nome_imovel}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isGeneratingConclusao ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gerando Análise Completa...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Conclusão Completa com IA
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {sugestoesIA && (
        <Alert className="border-purple-200 bg-purple-50">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <AlertDescription>
            <div className="space-y-4">
              <p className="font-bold text-purple-900 text-lg">Análise Gerada pela IA</p>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-purple-800 font-semibold">Conclusão Geral:</Label>
                  <div className="mt-2 p-4 bg-white rounded border border-purple-200 text-sm text-slate-700 whitespace-pre-wrap">
                    {sugestoesIA.conclusao}
                  </div>
                </div>

                <div>
                  <Label className="text-purple-800 font-semibold">Recomendações e Adequações:</Label>
                  <div className="mt-2 p-4 bg-white rounded border border-purple-200 text-sm text-slate-700 whitespace-pre-wrap">
                    {sugestoesIA.recomendacoes}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-purple-800 font-semibold">Edificação Acessível?</Label>
                    <div className="mt-2 p-3 bg-white rounded border border-purple-200">
                      <Badge className={
                        sugestoesIA.edificacao_acessivel === 'sim' ? 'bg-green-600' :
                        sugestoesIA.edificacao_acessivel === 'nao' ? 'bg-red-600' : 'bg-yellow-600'
                      }>
                        {sugestoesIA.edificacao_acessivel === 'sim' ? 'SIM' :
                         sugestoesIA.edificacao_acessivel === 'nao' ? 'NÃO' : 'PARCIALMENTE'}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-purple-800 font-semibold">Adaptação Possível?</Label>
                    <div className="mt-2 p-3 bg-white rounded border border-purple-200">
                      <Badge className={
                        sugestoesIA.adaptacao_possivel === 'sim' ? 'bg-green-600' :
                        sugestoesIA.adaptacao_possivel === 'nao' ? 'bg-red-600' : 'bg-yellow-600'
                      }>
                        {sugestoesIA.adaptacao_possivel === 'sim' ? 'SIM' :
                         sugestoesIA.adaptacao_possivel === 'nao' ? 'NÃO' : 'PARCIALMENTE'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-purple-200">
                <Button
                  type="button"
                  onClick={aplicarSugestoesIA}
                  className="bg-green-600 hover:bg-green-700 flex-1"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Aplicar Análise da IA
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSugestoesIA(null)}
                >
                  Recusar
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-blue-600" />
            Análise Final (Editável)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edificacao_acessivel">A edificação é acessível?</Label>
              <Select 
                value={data.edificacao_acessivel || ""} 
                onValueChange={(value) => handleChange("edificacao_acessivel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">SIM - Totalmente acessível</SelectItem>
                  <SelectItem value="parcialmente">PARCIALMENTE - Com ressalvas</SelectItem>
                  <SelectItem value="nao">NÃO - Não é acessível</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adaptacao_possivel">É possível adaptar?</Label>
              <Select 
                value={data.adaptacao_possivel || ""} 
                onValueChange={(value) => handleChange("adaptacao_possivel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sim">SIM - Totalmente viável</SelectItem>
                  <SelectItem value="parcialmente">PARCIALMENTE - Com limitações</SelectItem>
                  <SelectItem value="nao">NÃO - Inviável tecnicamente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="conclusao">Conclusão Geral</Label>
            <Textarea
              id="conclusao"
              value={data.conclusao || ""}
              onChange={(e) => handleChange("conclusao", e.target.value)}
              placeholder="Conclusão geral do laudo..."
              className="min-h-40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recomendacoes">Recomendações e Adequações Necessárias</Label>
            <Textarea
              id="recomendacoes"
              value={data.recomendacoes || ""}
              onChange={(e) => handleChange("recomendacoes", e.target.value)}
              placeholder="Liste as adaptações necessárias priorizadas..."
              className="min-h-48"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}