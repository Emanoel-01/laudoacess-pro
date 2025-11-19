import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Upload, Image as ImageIcon, Edit2, Check, X } from "lucide-react";

export default function GestaoAmbientes({ laudoId }) {
  const [ambientes, setAmbientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    pavimento: "",
    categoria: "",
    planta_baixa_url: ""
  });

  useEffect(() => {
    if (laudoId) {
      loadAmbientes();
    }
  }, [laudoId]);

  const loadAmbientes = async () => {
    setIsLoading(true);
    const data = await base44.entities.Ambiente.filter({ laudo_id: laudoId }, "ordem");
    setAmbientes(data);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome) {
      alert("Preencha o nome do ambiente");
      return;
    }

    try {
      if (editingId) {
        await base44.entities.Ambiente.update(editingId, formData);
      } else {
        await base44.entities.Ambiente.create({
          ...formData,
          laudo_id: laudoId,
          ordem: ambientes.length + 1
        });
      }
    } catch (error) {
      alert(`Erro ao salvar ambiente: ${error.message}`);
      return;
    }

    setFormData({ nome: "", pavimento: "", categoria: "", planta_baixa_url: "" });
    setShowForm(false);
    setEditingId(null);
    loadAmbientes();
  };

  const handleEdit = (ambiente) => {
    setFormData({
      nome: ambiente.nome,
      pavimento: ambiente.pavimento || "",
      categoria: ambiente.categoria || "",
      planta_baixa_url: ambiente.planta_baixa_url || ""
    });
    setEditingId(ambiente.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir este ambiente?")) {
      await base44.entities.Ambiente.delete(id);
      loadAmbientes();
    }
  };

  const handlePlantaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setFormData(prev => ({ ...prev, planta_baixa_url: file_url }));
    setIsUploading(false);
  };

  const cancelEdit = () => {
    setFormData({ nome: "", pavimento: "", categoria: "", planta_baixa_url: "" });
    setShowForm(false);
    setEditingId(null);
  };

  if (!laudoId) {
    return (
      <div className="text-center p-8 text-slate-500">
        Salve o laudo primeiro para gerenciar ambientes
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Ambientes do Laudo</h3>
          <p className="text-sm text-slate-600">
            Registre os ambientes vistoriados e associe plantas baixas
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Ambiente
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">
              {editingId ? "Editar Ambiente" : "Novo Ambiente"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome do Ambiente *</Label>
                  <Input
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    placeholder="Ex: Banheiro Térreo, Rampa Principal"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Pavimento</Label>
                  <Input
                    value={formData.pavimento}
                    onChange={(e) => setFormData({...formData, pavimento: e.target.value})}
                    placeholder="Ex: Térreo, 1º Andar"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select 
                  value={formData.categoria} 
                  onValueChange={(val) => setFormData({...formData, categoria: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passeio_publico">Passeio Público</SelectItem>
                    <SelectItem value="estacionamento">Estacionamento</SelectItem>
                    <SelectItem value="circulacao">Circulação</SelectItem>
                    <SelectItem value="rampas">Rampas</SelectItem>
                    <SelectItem value="escadas">Escadas</SelectItem>
                    <SelectItem value="portas">Portas</SelectItem>
                    <SelectItem value="sanitarios">Sanitários</SelectItem>
                    <SelectItem value="vestiarios">Vestiários</SelectItem>
                    <SelectItem value="elevadores">Elevadores</SelectItem>
                    <SelectItem value="balcoes">Balcões</SelectItem>
                    <SelectItem value="lavatorios">Lavatórios</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Planta Baixa do Ambiente</Label>
                <div className="flex gap-4 items-center">
                  {formData.planta_baixa_url && (
                    <img 
                      src={formData.planta_baixa_url} 
                      alt="Planta baixa" 
                      className="h-24 w-24 object-cover border border-slate-200 rounded-lg" 
                    />
                  )}
                  <label htmlFor="planta-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                      <div className="flex items-center gap-2">
                        <Upload className="w-5 h-5 text-slate-600" />
                        <span className="text-sm text-slate-600">
                          {isUploading ? "Enviando..." : "Escolher planta"}
                        </span>
                      </div>
                    </div>
                    <input
                      id="planta-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePlantaUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  <Check className="w-4 h-4 mr-2" />
                  {editingId ? "Salvar" : "Adicionar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : ambientes.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Nenhum ambiente cadastrado</p>
            <p className="text-sm text-slate-500 mt-1">
              Adicione ambientes para organizar melhor suas inspeções
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ambientes.map((ambiente) => (
            <Card key={ambiente.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{ambiente.nome}</CardTitle>
                    {ambiente.pavimento && (
                      <p className="text-sm text-slate-500 mt-1">{ambiente.pavimento}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleEdit(ambiente)}
                      className="h-8 w-8"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleDelete(ambiente.id)}
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {ambiente.categoria && (
                  <p className="text-xs text-slate-500 mb-2 capitalize">
                    {ambiente.categoria.replace(/_/g, ' ')}
                  </p>
                )}
                {ambiente.planta_baixa_url ? (
                  <img 
                    src={ambiente.planta_baixa_url} 
                    alt={ambiente.nome}
                    className="w-full h-32 object-cover rounded-lg border border-slate-200"
                  />
                ) : (
                  <div className="w-full h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-slate-400" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}