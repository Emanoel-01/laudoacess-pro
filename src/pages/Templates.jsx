import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Copy, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TemplateForm from "../components/templates/TemplateForm";

export default function Templates() {
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const queryClient = useQueryClient();

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => base44.entities.Template.list('-created_date'),
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: (id) => base44.entities.Template.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });

  const duplicateTemplateMutation = useMutation({
    mutationFn: async (template) => {
      const { id, created_date, updated_date, created_by, ...templateData } = template;
      return base44.entities.Template.create({
        ...templateData,
        nome: `${templateData.nome} (Cópia)`,
        is_padrao: false
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir este template?")) {
      deleteTemplateMutation.mutate(id);
    }
  };

  const handleDuplicate = (template) => {
    duplicateTemplateMutation.mutate(template);
  };

  const tipoEdificacaoLabels = {
    uso_publico: "Uso Público",
    uso_coletivo: "Uso Coletivo",
    uso_privado: "Uso Privado"
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Templates de Laudo</h1>
            <p className="text-slate-600">Crie templates personalizados para agilizar seus laudos</p>
          </div>
          <Button
            onClick={() => {
              setEditingTemplate(null);
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Template
          </Button>
        </div>

        {showForm && (
          <div className="mb-6">
            <TemplateForm
              template={editingTemplate}
              onSave={() => {
                setShowForm(false);
                setEditingTemplate(null);
                queryClient.invalidateQueries({ queryKey: ['templates'] });
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingTemplate(null);
              }}
            />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {template.nome}
                      {template.is_padrao && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {tipoEdificacaoLabels[template.tipo_edificacao]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {template.descricao && (
                  <p className="text-sm text-slate-600">{template.descricao}</p>
                )}
                
                {template.secoes_ativas && (
                  <div>
                    <p className="text-xs font-medium text-slate-700 mb-2">
                      Seções: {template.secoes_ativas.length}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.secoes_ativas.slice(0, 3).map((secao) => (
                        <Badge key={secao} variant="secondary" className="text-xs">
                          {secao}
                        </Badge>
                      ))}
                      {template.secoes_ativas.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.secoes_ativas.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(template)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDuplicate(template)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(template.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {templates.length === 0 && !showForm && (
          <Card className="border-slate-200">
            <CardContent className="p-12 text-center">
              <p className="text-slate-600 mb-4">Nenhum template criado ainda</p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar Primeiro Template
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}