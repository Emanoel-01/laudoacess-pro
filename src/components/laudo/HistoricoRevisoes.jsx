import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, RotateCcw, Eye, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function HistoricoRevisoes({ laudoId, onClose, onRestaurar }) {
  const [revisaoSelecionada, setRevisaoSelecionada] = useState(null);
  const [comparando, setComparando] = useState(false);
  const queryClient = useQueryClient();

  const { data: revisoes = [], isLoading } = useQuery({
    queryKey: ['laudoRevisoes', laudoId],
    queryFn: () => base44.entities.LaudoRevisao.filter({ laudo_id: laudoId }, '-created_date'),
    enabled: !!laudoId
  });

  const restaurarMutation = useMutation({
    mutationFn: async (revisao) => {
      const { dados_laudo } = revisao;
      await base44.entities.Laudo.update(laudoId, {
        ...dados_laudo,
        numero_revisao: incrementarRevisao(revisoes[0]?.numero_revisao || 'R00')
      });
      
      const user = await base44.auth.me();
      await base44.entities.LaudoRevisao.create({
        laudo_id: laudoId,
        numero_revisao: incrementarRevisao(revisoes[0]?.numero_revisao || 'R00'),
        dados_laudo: dados_laudo,
        descricao_alteracao: `Restaurado da revisão ${revisao.numero_revisao}`,
        autor_email: user.email,
        autor_nome: user.full_name
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laudoRevisoes', laudoId] });
      if (onRestaurar) onRestaurar();
      alert('Revisão restaurada com sucesso!');
    }
  });

  const incrementarRevisao = (revisaoAtual) => {
    const numero = parseInt(revisaoAtual.substring(1)) + 1;
    return `R${String(numero).padStart(2, '0')}`;
  };

  const handleRestaurar = (revisao) => {
    if (confirm(`Tem certeza que deseja restaurar o laudo para a revisão ${revisao.numero_revisao}? Isso criará uma nova revisão com os dados antigos.`)) {
      restaurarMutation.mutate(revisao);
    }
  };

  const CompararDados = ({ revisaoA, revisaoB }) => {
    const diferencas = [];
    const camposImportantes = [
      'nome_imovel', 'endereco', 'cidade', 'estado', 'tipo_edificacao',
      'responsavel_nome', 'status', 'conclusao', 'recomendacoes'
    ];

    camposImportantes.forEach(campo => {
      if (revisaoA.dados_laudo[campo] !== revisaoB.dados_laudo[campo]) {
        diferencas.push({
          campo,
          valorAnterior: revisaoA.dados_laudo[campo],
          valorNovo: revisaoB.dados_laudo[campo]
        });
      }
    });

    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-900">Alterações detectadas:</h3>
        {diferencas.length === 0 ? (
          <p className="text-sm text-slate-600">Nenhuma alteração detectada nos campos principais</p>
        ) : (
          diferencas.map((diff, idx) => (
            <Card key={idx} className="border-slate-200">
              <CardContent className="p-3">
                <p className="text-xs font-medium text-slate-700 mb-2">{diff.campo}</p>
                <div className="grid md:grid-cols-2 gap-2">
                  <div className="bg-red-50 p-2 rounded border border-red-200">
                    <p className="text-xs text-red-700 font-medium mb-1">Anterior:</p>
                    <p className="text-xs text-slate-900">{diff.valorAnterior || '(vazio)'}</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded border border-green-200">
                    <p className="text-xs text-green-700 font-medium mb-1">Novo:</p>
                    <p className="text-xs text-slate-900">{diff.valorNovo || '(vazio)'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Histórico de Revisões</h2>
          <p className="text-slate-600">Visualize e restaure versões anteriores do laudo</p>
        </div>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        )}
      </div>

      {revisoes.length === 0 && (
        <Alert>
          <AlertDescription>
            Nenhuma revisão encontrada para este laudo. As revisões são criadas automaticamente quando você salva alterações.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        {revisoes.map((revisao, index) => (
          <Card key={revisao.id} className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={index === 0 ? "bg-green-600" : "bg-slate-600"}>
                      {revisao.numero_revisao}
                    </Badge>
                    {index === 0 && (
                      <Badge variant="outline" className="text-green-700 border-green-300">
                        Atual
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{format(new Date(revisao.created_date), 'dd/MM/yyyy HH:mm')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <User className="w-4 h-4" />
                      <span>{revisao.autor_nome || revisao.autor_email}</span>
                    </div>
                    {revisao.descricao_alteracao && (
                      <p className="text-slate-700 mt-2">{revisao.descricao_alteracao}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setRevisaoSelecionada(revisao);
                      setComparando(true);
                    }}
                    disabled={index === 0}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Comparar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRestaurar(revisao)}
                    disabled={index === 0 || restaurarMutation.isPending}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Restaurar
                  </Button>
                </div>
              </div>

              {comparando && revisaoSelecionada?.id === revisao.id && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-slate-900">
                      Comparando com a versão atual
                    </h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setComparando(false);
                        setRevisaoSelecionada(null);
                      }}
                    >
                      Fechar
                    </Button>
                  </div>
                  <CompararDados revisaoA={revisao} revisaoB={revisoes[0]} />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}