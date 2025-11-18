import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UploadFile } from "@/integrations/Core";
import { InvokeLLM } from "@/integrations/Core";
import { Upload, Mic, StopCircle, Sparkles, Loader2, Check, FileText, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ChecklistItem({
  label,
  categoria,
  value,
  onChange,
  observationValue,
  onObservationChange,
  justificativaValue,
  onJustificativaChange,
  tipoAdaptacaoValue,
  onTipoAdaptacaoChange,
  necessitaProjetoValue,
  onNecessitaProjetoChange,
  showObservation = true,
  anexosValue = [],
  onAnexosChange
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [isGeneratingIA, setIsGeneratingIA] = useState(false);
  const [sugestoesIA, setSugestoesIA] = useState(null);
  const [anexosLocais, setAnexosLocais] = useState(anexosValue || []);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploadingFiles(true);
    const novosAnexos = [];

    for (const file of files) {
      const { file_url } = await UploadFile({ file });
      const tipoArquivo = file.type.includes('image') ? 'foto' : 
                         file.type.includes('pdf') ? 'pdf' : 
                         file.type.includes('word') ? 'word' : 'outro';
      
      novosAnexos.push({
        url: file_url,
        nome: file.name,
        tipo: tipoArquivo
      });
    }

    const todosAnexos = [...anexosLocais, ...novosAnexos];
    setAnexosLocais(todosAnexos);
    if (onAnexosChange) {
      onAnexosChange(todosAnexos);
    }
    setIsUploadingFiles(false);
  };

  const removerAnexo = (index) => {
    const novosAnexos = anexosLocais.filter((_, i) => i !== index);
    setAnexosLocais(novosAnexos);
    if (onAnexosChange) {
      onAnexosChange(novosAnexos);
    }
  };

  const handleRecordAudio = () => {
    // Implementação de gravação de áudio (simplificada)
    setIsRecording(!isRecording);
    if (!isRecording) {
      alert("Gravação de áudio iniciada (funcionalidade será implementada com MediaRecorder API)");
    } else {
      alert("Gravação de áudio finalizada");
    }
  };

  const gerarAnaliseIA = async () => {
    if (!observationValue && anexosLocais.length === 0) {
      alert("Por favor, adicione observações ou anexe arquivos antes de usar a IA");
      return;
    }

    setIsGeneratingIA(true);

    // Preparar URLs de fotos para enviar à IA
    const fotosUrls = anexosLocais.filter(a => a.tipo === 'foto').map(a => a.url);

    const prompt = `Você é um especialista em acessibilidade conforme ABNT NBR 9050:2015.

Item avaliado: "${label}"
Categoria: ${categoria}
Status: NÃO CONFORME

Observações do profissional: ${observationValue || "Nenhuma observação textual fornecida"}

${fotosUrls.length > 0 ? `Foram anexadas ${fotosUrls.length} foto(s) do problema identificado.` : ''}

Com base nessas informações, forneça uma análise técnica completa:

1. JUSTIFICATIVA TÉCNICA detalhada citando as normas ABNT NBR 9050:2015 aplicáveis
2. LEGENDAS para cada foto anexada (se houver), descrevendo o problema visível
3. TIPO DE ADAPTAÇÃO necessária:
   - SIM (Adaptação Simples: sinalização, placas, movimentação de mobiliário)
   - INS (Instalação: barras de apoio, corrimãos, maçanetas)
   - CIV (Civil: reforma estrutural, rampas, sanitários)
4. NECESSITA PROJETO EXECUTIVO? (true/false)
5. PRIORIDADE da adaptação (baixa, media, alta, critica)

Retorne um JSON estruturado.`;

    const response = await InvokeLLM({
      prompt,
      file_urls: fotosUrls,
      response_json_schema: {
        type: "object",
        properties: {
          justificativa: { type: "string" },
          legendas_fotos: {
            type: "array",
            items: { type: "string" }
          },
          tipo_adaptacao: {
            type: "string",
            enum: ["SIM", "INS", "CIV"]
          },
          necessita_projeto: { type: "boolean" },
          prioridade: {
            type: "string",
            enum: ["baixa", "media", "alta", "critica"]
          }
        }
      }
    });

    setSugestoesIA(response);
    setIsGeneratingIA(false);
  };

  const aplicarSugestoesIA = () => {
    if (!sugestoesIA) return;

    if (onJustificativaChange) {
      onJustificativaChange(sugestoesIA.justificativa);
    }
    if (onTipoAdaptacaoChange) {
      onTipoAdaptacaoChange(sugestoesIA.tipo_adaptacao);
    }
    if (onNecessitaProjetoChange) {
      onNecessitaProjetoChange(sugestoesIA.necessita_projeto);
    }

    // Aplicar legendas às fotos
    if (sugestoesIA.legendas_fotos && anexosLocais.length > 0) {
      const anexosAtualizados = anexosLocais.map((anexo, index) => ({
        ...anexo,
        legenda: sugestoesIA.legendas_fotos[index] || anexo.legenda
      }));
      setAnexosLocais(anexosAtualizados);
      if (onAnexosChange) {
        onAnexosChange(anexosAtualizados);
      }
    }

    setSugestoesIA(null);
    alert("Sugestões da IA aplicadas com sucesso!");
  };

  return (
    <Card className="border-slate-200">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <Label className="text-base font-medium text-slate-900 leading-relaxed">
            {label}
          </Label>
          <div className="flex gap-2">
            <Select value={value || ""} onValueChange={onChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Avaliar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">
                  <span className="text-green-700">✓ SIM</span>
                </SelectItem>
                <SelectItem value="nao">
                  <span className="text-red-700">✗ NÃO</span>
                </SelectItem>
                <SelectItem value="nao_se_aplica">
                  <span className="text-slate-500">N/A</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {value === "nao" && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            {showObservation && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Observações</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleRecordAudio}
                    className={isRecording ? "bg-red-50 text-red-600" : ""}
                  >
                    {isRecording ? (
                      <>
                        <StopCircle className="w-4 h-4 mr-2" />
                        Parar Gravação
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Gravar Áudio
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={observationValue || ""}
                  onChange={(e) => onObservationChange && onObservationChange(e.target.value)}
                  placeholder="Descreva o problema identificado..."
                  className="min-h-20"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Anexar Arquivos (Fotos, Plantas, PDFs)</Label>
              <div className="flex gap-2">
                <label htmlFor={`file-upload-${label}`} className="flex-1">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="flex items-center justify-center gap-2 text-slate-600">
                      <Upload className="w-5 h-5" />
                      <span className="text-sm">
                        {isUploadingFiles ? "Enviando..." : "Clique para anexar arquivos"}
                      </span>
                    </div>
                  </div>
                  <input
                    id={`file-upload-${label}`}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.dwg,.dxf"
                    onChange={handleFileUpload}
                    disabled={isUploadingFiles}
                    className="hidden"
                  />
                </label>
              </div>

              {anexosLocais.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {anexosLocais.map((anexo, index) => (
                    <div key={index} className="relative group">
                      {anexo.tipo === 'foto' ? (
                        <div className="relative">
                          <img
                            src={anexo.url}
                            alt={anexo.nome}
                            className="w-full h-24 object-cover rounded-lg border border-slate-200"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removerAnexo(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                          {anexo.legenda && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 rounded-b-lg">
                              {anexo.legenda}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg bg-slate-50">
                          <FileText className="w-4 h-4 text-slate-600" />
                          <span className="text-xs truncate flex-1">{anexo.nome}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6"
                            onClick={() => removerAnexo(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {(observationValue || anexosLocais.length > 0) && !sugestoesIA && (
              <Button
                type="button"
                onClick={gerarAnaliseIA}
                disabled={isGeneratingIA}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isGeneratingIA ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analisando com IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Análise Técnica com IA
                  </>
                )}
              </Button>
            )}

            {sugestoesIA && (
              <Alert className="border-purple-200 bg-purple-50">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <AlertDescription>
                  <div className="space-y-3">
                    <p className="font-medium text-purple-900">Sugestões da IA:</p>
                    
                    <div className="space-y-2">
                      <Label className="text-sm text-purple-800">Justificativa Técnica:</Label>
                      <p className="text-sm text-slate-700 bg-white p-3 rounded border border-purple-200">
                        {sugestoesIA.justificativa}
                      </p>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <Badge className="bg-purple-600">
                        Adaptação: {sugestoesIA.tipo_adaptacao}
                      </Badge>
                      <Badge variant="outline">
                        Projeto Executivo: {sugestoesIA.necessita_projeto ? "SIM" : "NÃO"}
                      </Badge>
                      <Badge className={
                        sugestoesIA.prioridade === 'critica' ? 'bg-red-600' :
                        sugestoesIA.prioridade === 'alta' ? 'bg-orange-600' :
                        sugestoesIA.prioridade === 'media' ? 'bg-yellow-600' : 'bg-blue-600'
                      }>
                        Prioridade: {sugestoesIA.prioridade}
                      </Badge>
                    </div>

                    {sugestoesIA.legendas_fotos && sugestoesIA.legendas_fotos.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm text-purple-800">Legendas para Fotos:</Label>
                        {sugestoesIA.legendas_fotos.map((legenda, idx) => (
                          <p key={idx} className="text-xs text-slate-600 bg-white p-2 rounded border border-purple-200">
                            Foto {idx + 1}: {legenda}
                          </p>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={aplicarSugestoesIA}
                        className="bg-green-600 hover:bg-green-700 flex-1"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Aplicar Sugestões
                      </Button>
                      <Button
                        type="button"
                        size="sm"
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

            {onJustificativaChange && (
              <div className="space-y-2">
                <Label>Justificativa Técnica</Label>
                <Textarea
                  value={justificativaValue || ""}
                  onChange={(e) => onJustificativaChange(e.target.value)}
                  placeholder="Justificativa técnica conforme ABNT NBR 9050:2015..."
                  className="min-h-24"
                />
              </div>
            )}

            {onTipoAdaptacaoChange && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Adaptação</Label>
                  <Select value={tipoAdaptacaoValue || ""} onValueChange={onTipoAdaptacaoChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SIM">SIM - Adaptação Simples</SelectItem>
                      <SelectItem value="INS">INS - Instalação</SelectItem>
                      <SelectItem value="CIV">CIV - Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Checkbox
                      checked={necessitaProjetoValue || false}
                      onCheckedChange={onNecessitaProjetoChange}
                    />
                    Necessita Projeto Executivo?
                  </Label>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}