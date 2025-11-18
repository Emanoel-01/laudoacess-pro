import React, { useState, useEffect } from "react";
import { Anexo } from "@/entities/Anexo";
import { UploadFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, FileText, Image as ImageIcon, File, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tipoIcons = {
  foto: ImageIcon,
  pdf: FileText,
  word: FileText,
  excel: FileText,
  planta: File,
  outro: File
};

const tipoColors = {
  foto: "bg-blue-100 text-blue-700",
  pdf: "bg-red-100 text-red-700",
  word: "bg-indigo-100 text-indigo-700",
  excel: "bg-green-100 text-green-700",
  planta: "bg-purple-100 text-purple-700",
  outro: "bg-slate-100 text-slate-700"
};

export default function GestaoAnexos({ laudoId }) {
  const [anexos, setAnexos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (laudoId) {
      loadAnexos();
    }
  }, [laudoId]);

  const loadAnexos = async () => {
    if (!laudoId) return;
    const data = await Anexo.filter({ laudo_id: laudoId }, "ordem");
    setAnexos(data);
  };

  const handleFileUpload = async (e, tipo) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    
    for (const file of files) {
      const { file_url } = await UploadFile({ file });
      
      if (laudoId) {
        await Anexo.create({
          laudo_id: laudoId,
          tipo: tipo,
          url: file_url,
          nome_arquivo: file.name,
          ordem: anexos.length + 1
        });
      } else {
        setAnexos(prev => [...prev, {
          tipo: tipo,
          url: file_url,
          nome_arquivo: file.name,
          ordem: prev.length + 1
        }]);
      }
    }
    
    if (laudoId) {
      await loadAnexos();
    }
    
    setIsUploading(false);
  };

  const handleRemoveAnexo = async (index) => {
    if (laudoId && anexos[index].id) {
      await Anexo.delete(anexos[index].id);
      await loadAnexos();
    } else {
      setAnexos(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateAnexo = async (index, field, value) => {
    const updatedAnexos = [...anexos];
    updatedAnexos[index] = { ...updatedAnexos[index], [field]: value };
    
    if (laudoId && updatedAnexos[index].id) {
      await Anexo.update(updatedAnexos[index].id, { [field]: value });
    }
    
    setAnexos(updatedAnexos);
  };

  const anexosPorTipo = {
    foto: anexos.filter(a => a.tipo === "foto"),
    pdf: anexos.filter(a => a.tipo === "pdf"),
    word: anexos.filter(a => a.tipo === "word"),
    excel: anexos.filter(a => a.tipo === "excel"),
    planta: anexos.filter(a => a.tipo === "planta"),
    outro: anexos.filter(a => a.tipo === "outro")
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Gestão de Anexos</h2>
        <p className="text-slate-600">Todos os arquivos anexados ao laudo (das abas e uploads diretos)</p>
      </div>

      <Tabs defaultValue="foto" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="foto">Fotos ({anexosPorTipo.foto.length})</TabsTrigger>
          <TabsTrigger value="pdf">PDFs ({anexosPorTipo.pdf.length})</TabsTrigger>
          <TabsTrigger value="word">Word ({anexosPorTipo.word.length})</TabsTrigger>
          <TabsTrigger value="excel">Excel ({anexosPorTipo.excel.length})</TabsTrigger>
          <TabsTrigger value="planta">Plantas ({anexosPorTipo.planta.length})</TabsTrigger>
          <TabsTrigger value="outro">Outros ({anexosPorTipo.outro.length})</TabsTrigger>
        </TabsList>

        {["foto", "pdf", "word", "excel", "planta", "outro"].map((tipo) => (
          <TabsContent key={tipo} value={tipo} className="space-y-4">
            <Card className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors">
              <CardContent className="p-8">
                <label htmlFor={`${tipo}-upload`} className="cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-slate-900 mb-1">
                        Clique para fazer upload de {tipo === "foto" ? "fotos" : "arquivos"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {tipo === "foto" && "PNG, JPG ou JPEG"}
                        {tipo === "pdf" && "Arquivos PDF"}
                        {tipo === "word" && "Arquivos DOC ou DOCX"}
                        {tipo === "excel" && "Arquivos XLS ou XLSX"}
                        {tipo === "planta" && "Plantas em PDF, DWG ou imagem"}
                        {tipo === "outro" && "Outros documentos"}
                      </p>
                    </div>
                  </div>
                  <input
                    id={`${tipo}-upload`}
                    type="file"
                    multiple
                    accept={
                      tipo === "foto" ? "image/*" : 
                      tipo === "pdf" ? ".pdf" : 
                      tipo === "word" ? ".doc,.docx" : 
                      tipo === "excel" ? ".xls,.xlsx" : 
                      tipo === "planta" ? ".pdf,.dwg,.dxf,image/*" : "*"
                    }
                    onChange={(e) => handleFileUpload(e, tipo)}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </CardContent>
            </Card>

            {anexosPorTipo[tipo].length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {anexosPorTipo[tipo].map((anexo, index) => {
                  const Icon = tipoIcons[anexo.tipo];
                  return (
                    <Card key={index} className="overflow-hidden border-slate-200">
                      {anexo.tipo === "foto" ? (
                        <div className="relative">
                          <img
                            src={anexo.url}
                            alt={anexo.descricao}
                            className="w-full h-48 object-cover"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2"
                            onClick={() => handleRemoveAnexo(anexos.indexOf(anexo))}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="p-6 bg-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-lg ${tipoColors[anexo.tipo]}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{anexo.nome_arquivo}</p>
                              <Badge className={`${tipoColors[anexo.tipo]} mt-1`}>
                                {anexo.tipo.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a href={anexo.url} target="_blank" rel="noopener noreferrer">
                              <Button size="icon" variant="outline">
                                <Download className="w-4 h-4" />
                              </Button>
                            </a>
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => handleRemoveAnexo(anexos.indexOf(anexo))}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      <CardContent className="p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Pavimento</Label>
                            <Input
                              value={anexo.pavimento || ""}
                              onChange={(e) => updateAnexo(anexos.indexOf(anexo), "pavimento", e.target.value)}
                              placeholder="Ex: Térreo, 1º andar"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Categoria</Label>
                            <Select
                              value={anexo.categoria || ""}
                              onValueChange={(value) => updateAnexo(anexos.indexOf(anexo), "categoria", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="passeio_publico">Passeio Público</SelectItem>
                                <SelectItem value="estacionamento">Estacionamento</SelectItem>
                                <SelectItem value="circulacao">Circulação</SelectItem>
                                <SelectItem value="rampas">Rampas</SelectItem>
                                <SelectItem value="escadas">Escadas</SelectItem>
                                <SelectItem value="portas">Portas</SelectItem>
                                <SelectItem value="sanitarios">Sanitários</SelectItem>
                                <SelectItem value="mobiliario">Mobiliário</SelectItem>
                                <SelectItem value="elevadores">Elevadores</SelectItem>
                                <SelectItem value="vestiarios">Vestiários</SelectItem>
                                <SelectItem value="balcao">Balcão</SelectItem>
                                <SelectItem value="geral">Geral</SelectItem>
                                <SelectItem value="outro">Outro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Descrição / Legenda</Label>
                          <Input
                            value={anexo.descricao || ""}
                            onChange={(e) => updateAnexo(anexos.indexOf(anexo), "descricao", e.target.value)}
                            placeholder="Descrição do anexo"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {anexosPorTipo[tipo].length === 0 && !isUploading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(tipoIcons[tipo], { className: "w-8 h-8 text-slate-400" })}
                </div>
                <p className="text-slate-600">Nenhum anexo adicionado ainda</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}