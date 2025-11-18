import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Star, Crown } from "lucide-react";

export default function Planos() {
  const [planos, setPlanos] = useState([]);
  const [assinatura, setAssinatura] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const planosData = await base44.entities.Plano.filter({ ativo: true });
    setPlanos(planosData.sort((a, b) => a.preco_mensal - b.preco_mensal));
    
    const user = await base44.auth.me();
    const assinaturas = await base44.entities.Assinatura.filter({ 
      user_email: user.email 
    });
    if (assinaturas.length > 0) {
      setAssinatura(assinaturas[0]);
    }
    setIsLoading(false);
  };

  const handleSelectPlan = (plano) => {
    alert(`Em breve: integração com gateway de pagamento para o plano ${plano.nome}`);
  };

  const planoIcons = {
    "Básico": Zap,
    "Profissional": Star,
    "Empresarial": Crown
  };

  const planoColors = {
    "Básico": "border-slate-300 hover:border-slate-400",
    "Profissional": "border-blue-400 hover:border-blue-500 shadow-lg",
    "Empresarial": "border-purple-400 hover:border-purple-500 shadow-xl"
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Selecione o plano ideal para suas necessidades de laudos de acessibilidade
          </p>
          {assinatura && (
            <Badge className="mt-4 bg-green-100 text-green-700 border-green-300">
              Você está no plano: {assinatura.status === 'trial' ? 'Trial' : 'Ativo'}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planos.map((plano) => {
            const Icon = planoIcons[plano.nome] || Zap;
            const isProfissional = plano.nome === "Profissional";
            
            return (
              <Card 
                key={plano.id} 
                className={`relative border-2 transition-all hover:scale-105 ${planoColors[plano.nome]}`}
              >
                {isProfissional && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plano.nome}</CardTitle>
                  <CardDescription className="text-sm mt-2">
                    {plano.descricao}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="text-center border-b pb-6">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-slate-900">
                        R$ {plano.preco_mensal.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-slate-500">/mês</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                      ou R$ {plano.preco_anual.toFixed(2).replace('.', ',')} /ano
                      <span className="text-green-600 font-semibold ml-1">
                        (economize {Math.round((1 - plano.preco_anual / (plano.preco_mensal * 12)) * 100)}%)
                      </span>
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-slate-700">
                        {plano.limite_laudos_mes === 0 ? 'Laudos ilimitados' : `${plano.limite_laudos_mes} laudos/mês`}
                      </span>
                    </div>
                    
                    {plano.tem_ia && (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-slate-700">IA para análise e sugestões</span>
                      </div>
                    )}
                    
                    {plano.tem_whatsapp && (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-slate-700">Notificações WhatsApp</span>
                      </div>
                    )}
                    
                    {plano.tem_white_label && (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-slate-700">White-label (logo e cores)</span>
                      </div>
                    )}
                    
                    {plano.suporte_prioritario && (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-slate-700">Suporte prioritário</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={() => handleSelectPlan(plano)}
                    className={`w-full ${isProfissional ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-800'}`}
                  >
                    Escolher {plano.nome}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            Todos os planos incluem:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Armazenamento seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Geração de PDF profissional</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Conforme NBR 9050:2020</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Suporte técnico</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}