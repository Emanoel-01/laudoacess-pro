import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Save, FileText, Download, Building2, Package, ChevronLeft, ChevronRight } from "lucide-react";

import InformacoesGerais from "../components/laudo/InformacoesGerais";
import PasseioPublico from "../components/laudo/PasseioPublico";
import Estacionamento from "../components/laudo/Estacionamento";
import CirculacaoHorizontal from "../components/laudo/CirculacaoHorizontal";
import Rampas from "../components/laudo/Rampas";
import Escadas from "../components/laudo/Escadas";
import Portas from "../components/laudo/Portas";
import Sanitarios from "../components/laudo/Sanitarios";
import Vestiarios from "../components/laudo/Vestiarios";
import Elevadores from "../components/laudo/Elevadores";
import Balcoes from "../components/laudo/Balcoes";
import Lavatorios from "../components/laudo/Lavatorios";
import VagasPCD from "../components/laudo/VagasPCD";
import SuperficiesTrabalho from "../components/laudo/SuperficiesTrabalho";
import SuperficiesRefeicao from "../components/laudo/SuperficiesRefeicao";
import AssentosFixos from "../components/laudo/AssentosFixos";
import CamasMacas from "../components/laudo/CamasMacas";
import Dispositivos from "../components/laudo/Dispositivos";
import Conclusao from "../components/laudo/Conclusao";
import GestaoAnexos from "../components/laudo/GestaoAnexos";

import { gerarLaudoPDF } from "@/functions/gerarLaudoPDF";

export default function NovoLaudo() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const steps = [
    { id: "informacoes", label: "Informações Gerais", icon: FileText },
    { id: "areas-externas", label: "Áreas Externas", icon: Building2 },
    { id: "circulacao", label: "Circulação e Acessos", icon: ArrowLeft },
    { id: "sanitarios", label: "Sanitários e Vestiários", icon: Building2 },
    { id: "mobiliario", label: "Mobiliário e Equipamentos", icon: Package },
    { id: "anexos", label: "Anexos", icon: Download },
    { id: "conclusao", label: "Conclusão", icon: FileText }
  ];
  const [laudoData, setLaudoData] = useState({
    status: "rascunho",
    numero_revisao: "R00",
    passeio_publico: {},
    estacionamento: {},
    circulacao_horizontal: {},
    rampas: {},
    escadas: {},
    portas: {},
    sanitarios: {},
    vestiarios: {},
    elevadores: {},
    balcoes: {},
    lavatorios: {},
    vagas_pcd: {},
    superficies_trabalho: {},
    superficies_refeicao: {},
    assentos_fixos: {},
    camas_macas: {},
    dispositivos: {}
  });

  const updateLaudoData = (section, data) => {
    setLaudoData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSave = async (status = "rascunho") => {
    if (!laudoData.nome_imovel || !laudoData.endereco) {
      alert("Preencha os campos obrigatórios: Nome e Endereço do imóvel");
      setCurrentStep(0);
      return;
    }

    setIsSaving(true);
    const objetivo = `Este laudo técnico de acessibilidade tem como objetivo analisar as condições físicas das instalações do edifício localizado em ${laudoData.endereco}, ${laudoData.cidade} - ${laudoData.estado}.`;
    
    await base44.entities.Laudo.create({
      ...laudoData,
      objetivo,
      status
    });
    
    alert(status === "concluido" ? "Laudo concluído com sucesso!" : "Laudo salvo como rascunho");
    navigate(createPageUrl("Dashboard"));
    setIsSaving(false);
  };

  const handleGerarPDF = async () => {
    if (!laudoData.nome_imovel) {
      alert("Preencha os dados básicos do laudo antes de gerar o PDF");
      return;
    }

    setIsGeneratingPDF(true);
    
    const response = await gerarLaudoPDF({ laudoData });
    
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laudo_${laudoData.nome_imovel.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
    
    setIsGeneratingPDF(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(createPageUrl("Dashboard"))}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Novo Laudo de Acessibilidade
              </h1>
              <p className="text-slate-600">Preencha as informações conforme ABNT NBR 9050:2015</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleGerarPDF}
              disabled={isGeneratingPDF}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              {isGeneratingPDF ? "Gerando PDF..." : "Gerar PDF"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSave("rascunho")}
              disabled={isSaving}
              className="hover:bg-slate-100"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button
              onClick={() => handleSave("concluido")}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 hidden md:flex"
            >
              <FileText className="w-4 h-4 mr-2" />
              Concluir
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-xl">
          <CardContent className="p-0">
            {/* Indicador de Progresso */}
            <div className="bg-white border-b border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <button
                          onClick={() => setCurrentStep(index)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isActive 
                              ? 'bg-blue-600 text-white shadow-lg' 
                              : isCompleted 
                              ? 'bg-green-500 text-white' 
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          <StepIcon className="w-5 h-5" />
                        </button>
                        <span className={`text-xs mt-2 text-center hidden md:block ${
                          isActive ? 'text-blue-600 font-semibold' : 'text-slate-500'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`h-0.5 flex-1 mx-2 ${
                          isCompleted ? 'bg-green-500' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="text-center md:hidden">
                <p className="text-sm font-semibold text-slate-700">
                  {steps[currentStep].label}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Etapa {currentStep + 1} de {steps.length}
                </p>
              </div>
            </div>

            <div className="p-6 bg-white min-h-[500px]">
              {/* Etapa 1: Informações Gerais */}
              {currentStep === 0 && (
                <InformacoesGerais 
                  data={laudoData} 
                  onChange={(data) => setLaudoData({...laudoData, ...data})} 
                />
              )}

              {/* Etapa 2: Áreas Externas */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Áreas Externas</h2>
                    <p className="text-slate-600 mb-6">Avalie o passeio público e estacionamento</p>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Passeio Público</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <PasseioPublico 
                          data={laudoData.passeio_publico} 
                          onChange={(data) => updateLaudoData('passeio_publico', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Estacionamento</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Estacionamento 
                          data={laudoData.estacionamento} 
                          onChange={(data) => updateLaudoData('estacionamento', data)} 
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Etapa 3: Circulação e Acessos */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Circulação e Acessos</h2>
                    <p className="text-slate-600 mb-6">Avalie corredores, rampas, escadas, portas e elevadores</p>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Circulação Horizontal</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CirculacaoHorizontal 
                          data={laudoData.circulacao_horizontal} 
                          onChange={(data) => updateLaudoData('circulacao_horizontal', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Rampas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Rampas 
                          data={laudoData.rampas} 
                          onChange={(data) => updateLaudoData('rampas', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Escadas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Escadas 
                          data={laudoData.escadas} 
                          onChange={(data) => updateLaudoData('escadas', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Portas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Portas 
                          data={laudoData.portas} 
                          onChange={(data) => updateLaudoData('portas', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Elevadores</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Elevadores 
                          data={laudoData.elevadores} 
                          onChange={(data) => updateLaudoData('elevadores', data)} 
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Etapa 4: Sanitários e Vestiários */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Sanitários e Vestiários</h2>
                    <p className="text-slate-600 mb-6">Avalie sanitários e vestiários acessíveis</p>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Sanitários Acessíveis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Sanitarios 
                          data={laudoData.sanitarios} 
                          onChange={(data) => updateLaudoData('sanitarios', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Vestiários Acessíveis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Vestiarios 
                          data={laudoData.vestiarios} 
                          onChange={(data) => updateLaudoData('vestiarios', data)} 
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Etapa 5: Mobiliário e Equipamentos */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Mobiliário e Equipamentos</h2>
                    <p className="text-slate-600 mb-6">Avalie balcões, superfícies, vagas e demais equipamentos</p>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Balcões de Atendimento</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Balcoes 
                          data={laudoData.balcoes} 
                          onChange={(data) => updateLaudoData('balcoes', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Lavatórios e Pias</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Lavatorios 
                          data={laudoData.lavatorios} 
                          onChange={(data) => updateLaudoData('lavatorios', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Vagas para PCD</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <VagasPCD 
                          data={laudoData.vagas_pcd} 
                          onChange={(data) => updateLaudoData('vagas_pcd', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Superfícies de Trabalho</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SuperficiesTrabalho 
                          data={laudoData.superficies_trabalho} 
                          onChange={(data) => updateLaudoData('superficies_trabalho', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Superfícies de Refeição</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SuperficiesRefeicao 
                          data={laudoData.superficies_refeicao} 
                          onChange={(data) => updateLaudoData('superficies_refeicao', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Assentos Fixos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AssentosFixos 
                          data={laudoData.assentos_fixos} 
                          onChange={(data) => updateLaudoData('assentos_fixos', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Camas e Macas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CamasMacas 
                          data={laudoData.camas_macas} 
                          onChange={(data) => updateLaudoData('camas_macas', data)} 
                        />
                      </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle>Dispositivos e Comandos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Dispositivos 
                          data={laudoData.dispositivos} 
                          onChange={(data) => updateLaudoData('dispositivos', data)} 
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Etapa 6: Anexos */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Anexos e Documentação</h2>
                    <p className="text-slate-600 mb-6">Adicione fotos, plantas e outros documentos</p>
                  </div>
                  <GestaoAnexos laudoId={null} />
                </div>
              )}

              {/* Etapa 7: Conclusão */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Conclusão do Laudo</h2>
                    <p className="text-slate-600 mb-6">Revise e finalize o laudo de acessibilidade</p>
                  </div>
                  <Conclusao 
                    data={laudoData} 
                    onChange={(data) => setLaudoData({...laudoData, ...data})}
                    laudoCompleto={laudoData}
                  />
                </div>
              )}
            </div>

            {/* Navegação entre Etapas */}
            <div className="border-t border-slate-200 bg-slate-50 p-6">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <div className="text-sm text-slate-600">
                  Etapa {currentStep + 1} de {steps.length}
                </div>

                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    className="bg-blue-600 hover:bg-blue-700 gap-2"
                  >
                    Próximo
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSave("concluido")}
                    disabled={isSaving}
                    className="bg-green-600 hover:bg-green-700 gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Finalizar Laudo
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}