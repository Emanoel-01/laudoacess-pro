import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SelecaoTemplate({ onSelect }) {
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => base44.entities.Template.list('-is_padrao', 50),
  });

  const tipoEdificacaoLabels = {
    uso_publico: "Uso Público",
    uso_coletivo: "Uso Coletivo",
    uso_privado: "Uso Privado"
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Escolha um Template</h1>
          <p className="text-slate-600">Selecione um template para iniciar seu laudo ou comece do zero</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card 
            className="border-2 border-dashed border-slate-300 hover:border-blue-500 transition-all cursor-pointer hover:shadow-lg"
            onClick={() => onSelect('sem_template')}
          >
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">Laudo em Branco</h3>
              <p className="text-sm text-slate-600 mb-4">Iniciar sem template, com todas as seções disponíveis</p>
              <Button variant="outline" className="w-full">
                Começar do Zero
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {templates.map((template) => (
            <Card 
              key={template.id}
              className="border-slate-200 hover:shadow-lg transition-all cursor-pointer hover:border-blue-500"
              onClick={() => onSelect(template.id)}
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {template.nome}
                  {template.is_padrao && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  )}
                </CardTitle>
                <Badge variant="outline" className="w-fit">
                  {tipoEdificacaoLabels[template.tipo_edificacao]}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {template.descricao && (
                  <p className="text-sm text-slate-600">{template.descricao}</p>
                )}
                
                {template.secoes_ativas && (
                  <div>
                    <p className="text-xs font-medium text-slate-700 mb-1">
                      {template.secoes_ativas.length} seções incluídas
                    </p>
                  </div>
                )}

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Usar este Template
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {templates.length === 0 && (
          <Card className="border-slate-200">
            <CardContent className="p-8 text-center">
              <p className="text-slate-600 mb-4">Você ainda não possui templates salvos</p>
              <Button variant="outline" onClick={() => onSelect('sem_template')}>
                Continuar sem Template
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}