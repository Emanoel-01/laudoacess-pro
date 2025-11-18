import { useState, useEffect } from "react";
import { Laudo } from "@/entities/Laudo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Plus, 
  FileText, 
  Calendar, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Edit,
  Trash2
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const statusConfig = {
  rascunho: { 
    label: "Rascunho", 
    color: "bg-slate-100 text-slate-700 border-slate-300",
    icon: Clock 
  },
  em_andamento: { 
    label: "Em Andamento", 
    color: "bg-blue-100 text-blue-700 border-blue-300",
    icon: AlertCircle 
  },
  concluido: { 
    label: "Concluído", 
    color: "bg-green-100 text-green-700 border-green-300",
    icon: CheckCircle2 
  }
};

export default function Dashboard() {
  const [laudos, setLaudos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLaudos();
  }, []);

  const loadLaudos = async () => {
    setIsLoading(true);
    const data = await Laudo.list("-created_date");
    setLaudos(data);
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este laudo?")) {
      await Laudo.delete(id);
      loadLaudos();
    }
  };

  const stats = {
    total: laudos.length,
    rascunho: laudos.filter(l => l.status === "rascunho").length,
    em_andamento: laudos.filter(l => l.status === "em_andamento").length,
    concluido: laudos.filter(l => l.status === "concluido").length
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Laudos de Acessibilidade
            </h1>
            <p className="text-slate-600">
              Gerencie e acompanhe seus laudos técnicos
            </p>
          </div>
          <Link to={createPageUrl("NovoLaudo")}>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-5 h-5 mr-2" />
              Novo Laudo
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Total de Laudos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Rascunhos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-700">{stats.rascunho}</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.em_andamento}</div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.concluido}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse border-none shadow-md">
                <CardHeader>
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : laudos.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Nenhum laudo cadastrado
              </h3>
              <p className="text-slate-600 mb-6 max-w-md">
                Comece criando seu primeiro laudo de acessibilidade
              </p>
              <Link to={createPageUrl("NovoLaudo")}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-5 h-5 mr-2" />
                  Criar Primeiro Laudo
                </Button>
              </Link>
            </div>
          ) : (
            laudos.map((laudo) => {
              const StatusIcon = statusConfig[laudo.status]?.icon || Clock;
              return (
                <Card 
                  key={laudo.id} 
                  className="border-none shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Building2 className="w-8 h-8 text-blue-600" />
                      <Badge 
                        variant="outline" 
                        className={`${statusConfig[laudo.status]?.color} border`}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig[laudo.status]?.label}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {laudo.nome_imovel}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{laudo.cidade}, {laudo.estado}</span>
                      </div>
                      {laudo.data_vistoria && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span>
                            {format(new Date(laudo.data_vistoria), "dd/MM/yyyy", { locale: ptBR })}
                          </span>
                        </div>
                      )}
                      {laudo.total_pavimentos && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-slate-400" />
                          <span>{laudo.total_pavimentos} pavimento(s)</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 pt-4 border-t border-slate-100">
                      <Link to={createPageUrl(`EditarLaudo?id=${laudo.id}`)} className="flex-1">
                        <Button 
                          variant="outline" 
                          className="w-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                        onClick={() => handleDelete(laudo.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}