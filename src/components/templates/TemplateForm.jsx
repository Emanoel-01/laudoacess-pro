import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function TemplateForm({ template, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nome: template?.nome || "",
    tipo_edificacao: template?.tipo_edificacao || "uso_publico",
    descricao: template?.descricao || "",
    objetivo_padrao: template?.objetivo_padrao || "",
    secoes_ativas: template?.secoes_ativas || [],
    is_padrao: template?.is_padrao || false
  });

  const [isSaving, setIsSaving] = useState(false);

  const secoesDisponiveis = [
    { id: "passeio_publico", label: "Passeio Público" },
    { id: "estacionamento", label: "Estacionamento" },
    { id: "circulacao_horizontal", label: "Circulação Horizontal" },
    { id: "rampas", label: "Rampas" },
    { id: "escadas", label: "Escadas" },
    { id: "portas", label: "Portas" },
    { id: "sanitarios", label: "Sanitários" },
    { id: "vestiarios", label: "Vestiários" },
    { id: "elevadores", label: "Elevadores" },
    { id: "balcoes", label: "Balcões" },
    { id: "lavatorios", label: "Lavatórios" },
    { id: "vagas_pcd", label: "Vagas PCD" },
    { id: "superficies_trabalho", label: "Superfícies de Trabalho" },
    { id: "superficies_refeicao", label: "Superfícies de Refeição" },
    { id: "assentos_fixos", label: "Assentos Fixos" },
    { id: "camas_macas", label: "Camas e Macas" },
    { id: "dispositivos", label: "Dispositivos" }
  ];

  const handleSecaoToggle = (secaoId) => {
    setFormData(prev => ({
      ...prev,
      secoes_ativas: prev.secoes_ativas.includes(secaoId)
        ? prev.secoes_ativas.filter(s => s !== secaoId)
        : [...prev.secoes_ativas, secaoId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.tipo_edificacao) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    setIsSaving(true);

    if (template?.id) {
      await base44.entities.Template.update(template.id, formData);
    } else {
      await base44.entities.Template.create(formData);
    }

    setIsSaving(false);
    onSave();
  };

  return (
    <Card className="border-slate-200 shadow-lg">
      <CardHeader>
        <CardTitle>{template ? "Editar Template" : "Novo Template"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome do Template *</Label>
              <Input
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: Edifício Comercial Padrão"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo de Edificação *</Label>
              <Select
                value={formData.tipo_edificacao}
                onValueChange={(value) => setFormData({ ...formData, tipo_edificacao: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uso_publico">Uso Público</SelectItem>
                  <SelectItem value="uso_coletivo">Uso Coletivo</SelectItem>
                  <SelectItem value="uso_privado">Uso Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Breve descrição do template..."
              className="min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label>Objetivo Padrão</Label>
            <Textarea
              value={formData.objetivo_padrao}
              onChange={(e) => setFormData({ ...formData, objetivo_padrao: e.target.value })}
              placeholder="Texto padrão para o objetivo do laudo quando usar este template..."
              className="min-h-24"
            />
          </div>

          <div className="space-y-3">
            <Label>Seções Incluídas no Template</Label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-4 border border-slate-200 rounded-lg bg-slate-50">
              {secoesDisponiveis.map((secao) => (
                <div key={secao.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={secao.id}
                    checked={formData.secoes_ativas.includes(secao.id)}
                    onCheckedChange={() => handleSecaoToggle(secao.id)}
                  />
                  <Label htmlFor={secao.id} className="text-sm cursor-pointer">
                    {secao.label}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-600">
              {formData.secoes_ativas.length} seções selecionadas
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_padrao"
              checked={formData.is_padrao}
              onCheckedChange={(checked) => setFormData({ ...formData, is_padrao: checked })}
            />
            <Label htmlFor="is_padrao" className="cursor-pointer">
              Definir como template padrão para este tipo de edificação
            </Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
              {isSaving ? "Salvando..." : template ? "Salvar Alterações" : "Criar Template"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}