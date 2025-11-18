
import { useState } from "react";
import { InvokeLLM } from "@/integrations/Core";
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
    
    const prompt = `Você é um especialista em acessibilidade arquitetônica conforme ABNT NBR 9050:2015.

Com base nos dados completos do laudo de acessibilidade abaixo, gere uma ANÁLISE COMPLETA E PROFISSIONAL:

**Dados do Imóvel:**
- Nome: ${laudoCompleto.nome_imovel}
- Endereço: ${laudoCompleto.endereco}, ${laudoCompleto.cidade} - ${laudoCompleto.estado}
- Tipo: ${laudoCompleto.tipo_edificacao_detalhe || laudoCompleto.tipo_edificacao}
- Pavimentos: ${laudoCompleto.total_pavimentos || "não informado"}
- Área Total: ${laudoCompleto.area_total || "não informada"} m²

**Contexto da Vistoria:**
Data: ${laudoCompleto.data_vistoria || "não informada"}

**Não Conformidades Identificadas:**
[Aqui você incluiria um resumo das não conformidades por categoria]

Gere uma análise técnica profissional que inclua:

1. **CONCLUSÃO GERAL** (200-400 palavras):
   - Resumo do estado geral de acessibilidade da edificação
   - Principais conformidades e não conformidades
   - Avaliação da viabilidade de adaptação
   - Tom profissional adequado para laudo técnico oficial

2. **RECOMENDAÇÕES E ADEQUAÇÕES NECESSÁRIAS** (lista detalhada):
   - Adaptações necessárias priorizadas
   - Classificação de cada adaptação (SIM/INS/CIV)
   - Normas ABNT NBR 9050:2015 aplicáveis
   - Indicação de necessidade de projeto executivo quando aplicável
   - Estimativa de prazos realistas

3. **EDIFICAÇÃO É ACESSÍVEL?**
   - Responda: "sim", "nao" ou "parcialmente"

4. **ADAPTAÇÃO É POSSÍVEL?**
   - Responda: "sim", "nao" ou "parcialmente"

Retorne um JSON estruturado com todos esses campos.`;

    const response = await InvokeLLM({
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
    setIsGeneratingConclusao(false);
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
