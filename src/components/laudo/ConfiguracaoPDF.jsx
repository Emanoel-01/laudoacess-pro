import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download } from "lucide-react";

const secoesPadroes = [
  { id: "objetivo", label: "Objetivo", required: true },
  { id: "premissa", label: "Premissa", required: false },
  { id: "metodo", label: "Método", required: false },
  { id: "referencias", label: "Referências Normativas", required: false },
  { id: "documentos", label: "Documentos Base", required: false },
  { id: "profissional", label: "Profissional Responsável", required: true },
  { id: "passeio_publico", label: "Passeio Público", required: false },
  { id: "estacionamento", label: "Estacionamento", required: false },
  { id: "circulacao", label: "Circulação Horizontal", required: false },
  { id: "rampas", label: "Rampas", required: false },
  { id: "escadas", label: "Escadas", required: false },
  { id: "portas", label: "Portas", required: false },
  { id: "elevadores", label: "Elevadores", required: false },
  { id: "sanitarios", label: "Sanitários", required: false },
  { id: "vestiarios", label: "Vestiários", required: false },
  { id: "balcoes", label: "Balcões", required: false },
  { id: "lavatorios", label: "Lavatórios", required: false },
  { id: "vagas_pcd", label: "Vagas PCD", required: false },
  { id: "conclusao", label: "Conclusão", required: true },
  { id: "recomendacoes", label: "Recomendações", required: false }
];

export default function ConfiguracaoPDF({ open, onClose, onGenerate, laudoData }) {
  const [secoesSelecionadas, setSecoesSelecionadas] = useState(
    secoesPadroes.filter(s => s.required).map(s => s.id)
  );
  const [sumarioExecutivo, setSumarioExecutivo] = useState("");
  const [conclusaoPersonalizada, setConclusaoPersonalizada] = useState(laudoData?.conclusao || "");
  const [incluirCabecalho, setIncluirCabecalho] = useState(true);
  const [incluirRodape, setIncluirRodape] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (laudoData?.conclusao) {
      setConclusaoPersonalizada(laudoData.conclusao);
    }
  }, [laudoData]);

  const toggleSecao = (secaoId) => {
    const secao = secoesPadroes.find(s => s.id === secaoId);
    if (secao?.required) return;

    setSecoesSelecionadas(prev => 
      prev.includes(secaoId) 
        ? prev.filter(id => id !== secaoId)
        : [...prev, secaoId]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await onGenerate({
      secoesSelecionadas,
      sumarioExecutivo,
      conclusaoPersonalizada,
      incluirCabecalho,
      incluirRodape
    });
    setIsGenerating(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Configurar Relatório PDF
          </DialogTitle>
          <DialogDescription>
            Personalize as seções e o conteúdo do seu laudo em PDF
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Sumário Executivo */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Sumário Executivo (Opcional)</Label>
              <p className="text-sm text-slate-600">
                Adicione um resumo executivo que aparecerá no início do documento
              </p>
              <Textarea
                value={sumarioExecutivo}
                onChange={(e) => setSumarioExecutivo(e.target.value)}
                placeholder="Digite aqui um resumo executivo destacando os principais pontos do laudo..."
                className="min-h-[100px]"
              />
            </div>

            {/* Conclusão Personalizada */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">Conclusão Personalizada</Label>
              <p className="text-sm text-slate-600">
                Edite a conclusão que aparecerá no final do documento
              </p>
              <Textarea
                value={conclusaoPersonalizada}
                onChange={(e) => setConclusaoPersonalizada(e.target.value)}
                placeholder="Digite a conclusão do laudo..."
                className="min-h-[120px]"
              />
            </div>

            {/* Cabeçalho e Rodapé */}
            <div className="space-y-3 border-t pt-4">
              <Label className="text-base font-semibold">Cabeçalho e Rodapé</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cabecalho"
                  checked={incluirCabecalho}
                  onCheckedChange={setIncluirCabecalho}
                />
                <label htmlFor="cabecalho" className="text-sm cursor-pointer">
                  Incluir cabeçalho personalizado (logo, nome da empresa, data)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rodape"
                  checked={incluirRodape}
                  onCheckedChange={setIncluirRodape}
                />
                <label htmlFor="rodape" className="text-sm cursor-pointer">
                  Incluir rodapé personalizado (assinatura digital, contato)
                </label>
              </div>
            </div>

            {/* Seções do Laudo */}
            <div className="space-y-3 border-t pt-4">
              <Label className="text-base font-semibold">Seções a Incluir no PDF</Label>
              <p className="text-sm text-slate-600">
                Selecione quais seções deseja incluir no relatório final
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {secoesPadroes.map((secao) => (
                  <div key={secao.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={secao.id}
                      checked={secoesSelecionadas.includes(secao.id)}
                      onCheckedChange={() => toggleSecao(secao.id)}
                      disabled={secao.required}
                    />
                    <label
                      htmlFor={secao.id}
                      className={`text-sm cursor-pointer ${
                        secao.required ? 'text-slate-500 font-medium' : ''
                      }`}
                    >
                      {secao.label} {secao.required && '(obrigatório)'}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isGenerating}>
            Cancelar
          </Button>
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? "Gerando PDF..." : "Gerar PDF"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}