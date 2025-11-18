import { useState } from "react";
import { Laudo } from "@/entities/Laudo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Save, FileText, Download } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("informacoes");
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
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
      setActiveTab("informacoes");
      return;
    }

    setIsSaving(true);
    const objetivo = `Este laudo técnico de acessibilidade tem como objetivo analisar as condições físicas das instalações do edifício localizado em ${laudoData.endereco}, ${laudoData.cidade} - ${laudoData.estado}.`;
    
    await Laudo.create({
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
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b border-slate-200 bg-white px-6 overflow-x-auto">
                <TabsList className="bg-transparent h-auto p-0 gap-1">
                  <TabsTrigger value="informacoes" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Informações</TabsTrigger>
                  <TabsTrigger value="passeio" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Passeio</TabsTrigger>
                  <TabsTrigger value="estacionamento" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Estacionamento</TabsTrigger>
                  <TabsTrigger value="circulacao" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Circulação</TabsTrigger>
                  <TabsTrigger value="rampas" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Rampas</TabsTrigger>
                  <TabsTrigger value="escadas" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Escadas</TabsTrigger>
                  <TabsTrigger value="portas" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Portas</TabsTrigger>
                  <TabsTrigger value="dispositivos" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Dispositivos</TabsTrigger>
                  <TabsTrigger value="elevadores" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Elevadores</TabsTrigger>
                  <TabsTrigger value="sanitarios" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Sanitários</TabsTrigger>
                  <TabsTrigger value="vestiarios" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Vestiários</TabsTrigger>
                  <TabsTrigger value="balcoes" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Balcões</TabsTrigger>
                  <TabsTrigger value="lavatorios" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Lavatórios</TabsTrigger>
                  <TabsTrigger value="vagas" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Vagas PCD</TabsTrigger>
                  <TabsTrigger value="trabalho" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Trabalho</TabsTrigger>
                  <TabsTrigger value="refeicao" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Refeição</TabsTrigger>
                  <TabsTrigger value="assentos" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Assentos</TabsTrigger>
                  <TabsTrigger value="camas" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Camas/Macas</TabsTrigger>
                  <TabsTrigger value="anexos" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Anexos</TabsTrigger>
                  <TabsTrigger value="conclusao" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-t-lg border-b-2 border-transparent data-[state=active]:border-blue-600">Conclusão</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6 bg-white">
                <TabsContent value="informacoes" className="mt-0">
                  <InformacoesGerais 
                    data={laudoData} 
                    onChange={(data) => setLaudoData({...laudoData, ...data})} 
                  />
                </TabsContent>

                <TabsContent value="passeio" className="mt-0">
                  <PasseioPublico 
                    data={laudoData.passeio_publico} 
                    onChange={(data) => updateLaudoData('passeio_publico', data)} 
                  />
                </TabsContent>

                <TabsContent value="estacionamento" className="mt-0">
                  <Estacionamento 
                    data={laudoData.estacionamento} 
                    onChange={(data) => updateLaudoData('estacionamento', data)} 
                  />
                </TabsContent>

                <TabsContent value="circulacao" className="mt-0">
                  <CirculacaoHorizontal 
                    data={laudoData.circulacao_horizontal} 
                    onChange={(data) => updateLaudoData('circulacao_horizontal', data)} 
                  />
                </TabsContent>

                <TabsContent value="rampas" className="mt-0">
                  <Rampas 
                    data={laudoData.rampas} 
                    onChange={(data) => updateLaudoData('rampas', data)} 
                  />
                </TabsContent>

                <TabsContent value="escadas" className="mt-0">
                  <Escadas 
                    data={laudoData.escadas} 
                    onChange={(data) => updateLaudoData('escadas', data)} 
                  />
                </TabsContent>

                <TabsContent value="portas" className="mt-0">
                  <Portas 
                    data={laudoData.portas} 
                    onChange={(data) => updateLaudoData('portas', data)} 
                  />
                </TabsContent>

                <TabsContent value="dispositivos" className="mt-0">
                  <Dispositivos 
                    data={laudoData.dispositivos} 
                    onChange={(data) => updateLaudoData('dispositivos', data)} 
                  />
                </TabsContent>

                <TabsContent value="elevadores" className="mt-0">
                  <Elevadores 
                    data={laudoData.elevadores} 
                    onChange={(data) => updateLaudoData('elevadores', data)} 
                  />
                </TabsContent>

                <TabsContent value="sanitarios" className="mt-0">
                  <Sanitarios 
                    data={laudoData.sanitarios} 
                    onChange={(data) => updateLaudoData('sanitarios', data)} 
                  />
                </TabsContent>

                <TabsContent value="vestiarios" className="mt-0">
                  <Vestiarios 
                    data={laudoData.vestiarios} 
                    onChange={(data) => updateLaudoData('vestiarios', data)} 
                  />
                </TabsContent>

                <TabsContent value="balcoes" className="mt-0">
                  <Balcoes 
                    data={laudoData.balcoes} 
                    onChange={(data) => updateLaudoData('balcoes', data)} 
                  />
                </TabsContent>

                <TabsContent value="lavatorios" className="mt-0">
                  <Lavatorios 
                    data={laudoData.lavatorios} 
                    onChange={(data) => updateLaudoData('lavatorios', data)} 
                  />
                </TabsContent>

                <TabsContent value="vagas" className="mt-0">
                  <VagasPCD 
                    data={laudoData.vagas_pcd} 
                    onChange={(data) => updateLaudoData('vagas_pcd', data)} 
                  />
                </TabsContent>

                <TabsContent value="trabalho" className="mt-0">
                  <SuperficiesTrabalho 
                    data={laudoData.superficies_trabalho} 
                    onChange={(data) => updateLaudoData('superficies_trabalho', data)} 
                  />
                </TabsContent>

                <TabsContent value="refeicao" className="mt-0">
                  <SuperficiesRefeicao 
                    data={laudoData.superficies_refeicao} 
                    onChange={(data) => updateLaudoData('superficies_refeicao', data)} 
                  />
                </TabsContent>

                <TabsContent value="assentos" className="mt-0">
                  <AssentosFixos 
                    data={laudoData.assentos_fixos} 
                    onChange={(data) => updateLaudoData('assentos_fixos', data)} 
                  />
                </TabsContent>

                <TabsContent value="camas" className="mt-0">
                  <CamasMacas 
                    data={laudoData.camas_macas} 
                    onChange={(data) => updateLaudoData('camas_macas', data)} 
                  />
                </TabsContent>

                <TabsContent value="anexos" className="mt-0">
                  <GestaoAnexos laudoId={null} />
                </TabsContent>

                <TabsContent value="conclusao" className="mt-0">
                  <Conclusao 
                    data={laudoData} 
                    onChange={(data) => setLaudoData({...laudoData, ...data})}
                    laudoCompleto={laudoData}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}