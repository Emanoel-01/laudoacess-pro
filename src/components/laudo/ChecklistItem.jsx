import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { base44 } from "@/api/base44Client";
import { Upload, Mic, StopCircle, Sparkles, Loader2, Check, Image as ImageIcon, FileText, X, ChevronUp, ChevronDown, Edit2 } from "lucide-react";
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
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [isGeneratingIA, setIsGeneratingIA] = useState(false);
  const [sugestoesIA, setSugestoesIA] = useState(null);
  const [anexosLocais, setAnexosLocais] = useState(anexosValue || []);
  const [editandoLegenda, setEditandoLegenda] = useState(null);
  const [legendaTemp, setLegendaTemp] = useState("");

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploadingFiles(true);
    const novosAnexos = [];

    for (const file of files) {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
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

  const moverAnexo = (index, direcao) => {
    if ((direcao === 'up' && index === 0) || (direcao === 'down' && index === anexosLocais.length - 1)) {
      return;
    }

    const novosAnexos = [...anexosLocais];
    const novoIndex = direcao === 'up' ? index - 1 : index + 1;
    [novosAnexos[index], novosAnexos[novoIndex]] = [novosAnexos[novoIndex], novosAnexos[index]];
    
    setAnexosLocais(novosAnexos);
    if (onAnexosChange) {
      onAnexosChange(novosAnexos);
    }
  };

  const atualizarLegenda = (index, legenda) => {
    const novosAnexos = [...anexosLocais];
    novosAnexos[index] = { ...novosAnexos[index], legenda };
    setAnexosLocais(novosAnexos);
    if (onAnexosChange) {
      onAnexosChange(novosAnexos);
    }
  };

  const iniciarEdicaoLegenda = (index) => {
    setEditandoLegenda(index);
    setLegendaTemp(anexosLocais[index]?.legenda || "");
  };

  const salvarLegenda = (index) => {
    atualizarLegenda(index, legendaTemp);
    setEditandoLegenda(null);
    setLegendaTemp("");
  };

  const handleRecordAudio = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          const audioFile = new File([audioBlob], `audio_${Date.now()}.webm`, { type: 'audio/webm' });
          
          setIsUploadingFiles(true);
          const { file_url } = await base44.integrations.Core.UploadFile({ file: audioFile });
          
          const novoAnexo = {
            url: file_url,
            nome: audioFile.name,
            tipo: 'audio'
          };
          
          const todosAnexos = [...anexosLocais, novoAnexo];
          setAnexosLocais(todosAnexos);
          if (onAnexosChange) {
            onAnexosChange(todosAnexos);
          }
          setIsUploadingFiles(false);
          
          stream.getTracks().forEach(track => track.stop());
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (error) {
        alert("Erro ao acessar microfone: " + error.message);
      }
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setMediaRecorder(null);
        setIsRecording(false);
      }
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

    const prompt = `Você é um arquiteto especialista em acessibilidade conforme ABNT NBR 9050:2020.

**CONTEXTO DO ITEM AVALIADO:**
- Item: "${label}"
- Categoria: ${categoria}
- Status de Conformidade: NÃO CONFORME

**OBSERVAÇÕES DO PROFISSIONAL:**
${observationValue || "Nenhuma observação textual foi fornecida."}

**EVIDÊNCIAS FOTOGRÁFICAS:**
${fotosUrls.length > 0 ? `${fotosUrls.length} foto(s) anexada(s) documentando a não conformidade identificada.` : 'Nenhuma foto anexada.'}

**TAREFA:**
Com base EXCLUSIVAMENTE nas observações fornecidas e nas fotos anexadas (se houver), forneça uma análise técnica objetiva e precisa. NÃO invente ou suponha informações que não estejam nas observações ou fotos.

Sua análise deve conter:

1. **JUSTIFICATIVA TÉCNICA** (150-250 palavras):
   - Descreva tecnicamente o problema identificado
   - Cite APENAS as seções específicas da ABNT NBR 9050:2020 que estão sendo violadas
   - Explique as implicações práticas da não conformidade para usuários de cadeira de rodas, pessoas com deficiência visual, mobilidade reduzida, etc.
   - Use linguagem técnica profissional adequada para laudo oficial

2. **LEGENDAS PARA FOTOS** (se houver fotos):
   - Para cada foto, descreva de forma técnica e objetiva o que está visível na imagem
   - Destaque os elementos não conformes visíveis
   - Máximo 30 palavras por legenda

3. **TIPO DE ADAPTAÇÃO NECESSÁRIA**:
   - SIM: Adaptação simples (sinalização, pintura, reorganização de mobiliário, ajustes de altura)
   - INS: Instalação de equipamentos (barras de apoio, corrimãos, dispositivos de acionamento, portas acessíveis)
   - CIV: Obra civil (demolição/construção de rampas, alargamento de vãos, reforma de sanitários, nivelamento de pisos)

4. **NECESSITA PROJETO EXECUTIVO?**
   - true: Quando exige projeto técnico assinado (obras civis, instalações complexas, modificações estruturais)
   - false: Quando são ajustes simples que não exigem projeto formal

5. **PRIORIDADE DA ADAPTAÇÃO**:
   - critica: Impede totalmente o acesso ou representa risco de acidente
   - alta: Prejudica significativamente a autonomia e segurança do usuário
   - media: Causa desconforto ou dificuldade moderada
   - baixa: Melhoria recomendável mas não essencial

**IMPORTANTE:** Seja coerente, objetivo e baseie-se APENAS nas informações fornecidas. Evite suposições ou generalizações.

Retorne APENAS o JSON estruturado conforme o schema fornecido.`;

    const response = await base44.integrations.Core.InvokeLLM({
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

    if (onJustificativaChange && sugestoesIA.justificativa) {
      onJustificativaChange(sugestoesIA.justificativa);
    }
    if (onTipoAdaptacaoChange && sugestoesIA.tipo_adaptacao) {
      onTipoAdaptacaoChange(sugestoesIA.tipo_adaptacao);
    }
    if (onNecessitaProjetoChange && sugestoesIA.necessita_projeto !== undefined) {
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
        <div className="space-y-3">
          <Label className="text-base font-medium text-slate-900 leading-relaxed">
            {label}
          </Label>
          <RadioGroup value={value || ""} onValueChange={onChange} className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id={`${label}-sim`} />
              <Label htmlFor={`${label}-sim`} className="text-green-700 font-medium cursor-pointer">
                ✓ SIM
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id={`${label}-nao`} />
              <Label htmlFor={`${label}-nao`} className="text-red-700 font-medium cursor-pointer">
                ✗ NÃO
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao_se_aplica" id={`${label}-na`} />
              <Label htmlFor={`${label}-na`} className="text-slate-500 font-medium cursor-pointer">
                N/A
              </Label>
            </div>
          </RadioGroup>
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
                <div className="space-y-4 mt-4">
                  {anexosLocais.map((anexo, index) => (
                    <div key={index} className="relative border border-slate-200 rounded-lg p-3 bg-white hover:shadow-md transition-shadow">
                      <div className="flex gap-3">
                        {/* Preview */}
                        <div className="flex-shrink-0">
                          {anexo.tipo === 'foto' ? (
                            <img
                              src={anexo.url}
                              alt={anexo.nome}
                              className="w-24 h-24 object-cover rounded-lg border border-slate-200 cursor-pointer hover:opacity-80"
                              onClick={() => window.open(anexo.url, '_blank')}
                            />
                          ) : (
                            <div className="w-24 h-24 flex items-center justify-center bg-slate-100 rounded-lg border border-slate-200">
                              <FileText className="w-8 h-8 text-slate-600" />
                            </div>
                          )}
                        </div>

                        {/* Detalhes e Legenda */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900 truncate">{anexo.nome}</p>
                              <Badge variant="outline" className="text-xs mt-1">
                                {anexo.tipo === 'foto' ? '📷 Foto' : anexo.tipo === 'pdf' ? '📄 PDF' : '📎 Documento'}
                              </Badge>
                            </div>
                          </div>

                          {/* Legenda */}
                          {editandoLegenda === index ? (
                            <div className="space-y-2">
                              <Textarea
                                value={legendaTemp}
                                onChange={(e) => setLegendaTemp(e.target.value)}
                                placeholder="Digite a legenda descritiva do anexo..."
                                className="text-sm min-h-16"
                              />
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => salvarLegenda(index)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Salvar
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditandoLegenda(null)}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {anexo.legenda ? (
                                <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                                  {anexo.legenda}
                                </p>
                              ) : (
                                <p className="text-xs text-slate-400 italic">Sem legenda</p>
                              )}
                              <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => iniciarEdicaoLegenda(index)}
                                className="h-7 text-xs"
                              >
                                <Edit2 className="w-3 h-3 mr-1" />
                                {anexo.legenda ? 'Editar' : 'Adicionar'} Legenda
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Controles */}
                        <div className="flex flex-col gap-1">
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => moverAnexo(index, 'up')}
                            disabled={index === 0}
                          >
                            <ChevronUp className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => moverAnexo(index, 'down')}
                            disabled={index === anexosLocais.length - 1}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="h-7 w-7"
                            onClick={() => removerAnexo(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
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
                  placeholder="Justificativa técnica conforme ABNT NBR 9050:2020..."
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