import { useState, useEffect } from "react";
import { Foto } from "@/entities/Foto";
import { UploadFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export default function AnexoFotografico({ laudoId }) {
  const [fotos, setFotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (laudoId) {
      loadFotos();
    }
  }, [laudoId]);

  const loadFotos = async () => {
    if (!laudoId) return;
    const data = await Foto.filter({ laudo_id: laudoId }, "ordem");
    setFotos(data);
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    
    try {
      for (const file of files) {
        const { file_url } = await UploadFile({ file });
        
        if (laudoId) {
          await Foto.create({
            laudo_id: laudoId,
            url: file_url,
            ordem: fotos.length + 1,
            descricao: file.name
          });
        } else {
          setFotos(prev => [...prev, {
            url: file_url,
            descricao: file.name,
            ordem: prev.length + 1
          }]);
        }
      }
      
      if (laudoId) {
        await loadFotos();
      }
      
      alert("Fotos carregadas com sucesso!");
    } catch (error) {
      alert("Erro ao fazer upload das fotos");
      console.error(error);
    }
    
    setIsUploading(false);
  };

  const handleRemoveFoto = async (index) => {
    if (laudoId && fotos[index].id) {
      await Foto.delete(fotos[index].id);
      await loadFotos();
    } else {
      setFotos(prev => prev.filter((_, i) => i !== index));
    }
    alert("Foto removida");
  };

  const updateFoto = async (index, field, value) => {
    const updatedFotos = [...fotos];
    updatedFotos[index] = { ...updatedFotos[index], [field]: value };
    
    if (laudoId && updatedFotos[index].id) {
      await Foto.update(updatedFotos[index].id, { [field]: value });
    }
    
    setFotos(updatedFotos);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Anexo Fotográfico</h2>
        <p className="text-slate-600">Registre e organize as fotos da vistoria</p>
      </div>

      <Card className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8">
          <label htmlFor="foto-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="font-medium text-slate-900 mb-1">
                  Clique para fazer upload de fotos
                </p>
                <p className="text-sm text-slate-500">
                  PNG, JPG ou JPEG até 10MB cada
                </p>
              </div>
            </div>
            <input
              id="foto-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </CardContent>
      </Card>

      {fotos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fotos.map((foto, index) => (
            <Card key={index} className="overflow-hidden border-slate-200">
              <div className="relative">
                <img
                  src={foto.url}
                  alt={foto.descricao}
                  className="w-full h-48 object-cover"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveFoto(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="space-y-2">
                  <Label>Pavimento</Label>
                  <Input
                    value={foto.pavimento || ""}
                    onChange={(e) => updateFoto(index, "pavimento", e.target.value)}
                    placeholder="Ex: Térreo, 1º andar"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select
                    value={foto.categoria || ""}
                    onValueChange={(value) => updateFoto(index, "categoria", value)}
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
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Input
                    value={foto.descricao || ""}
                    onChange={(e) => updateFoto(index, "descricao", e.target.value)}
                    placeholder="Descrição da foto"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {fotos.length === 0 && !isUploading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600">Nenhuma foto adicionada ainda</p>
        </div>
      )}
    </div>
  );
}