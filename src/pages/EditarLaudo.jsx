import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
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
import Mobiliario from "../components/laudo/Mobiliario";
import Conclusao from "../components/laudo/Conclusao";
import GestaoAnexos from "../components/laudo/GestaoAnexos";
import GestaoAmbientes from "../components/laudo/GestaoAmbientes";
import HistoricoRevisoes from "../components/laudo/HistoricoRevisoes";

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

import { gerarLaudoPDF } from "@/functions/gerarLaudoPDF";

export default function EditarLaudo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("informacoes");
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [laudoData, setLaudoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLaudo();
  }, []);

  const loadLaudo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
      navigate(createPageUrl("Dashboard"));
      return;
    }

    const laudo = await Laudo.get(id);
    setLaudoData(laudo);
    
    // Restaurar última aba visitada
    if (laudo.ultima_aba_visitada) {
      setActiveTab(laudo.ultima_aba_visitada);
    }
    
    setIsLoading(false);
  };

  const updateLaudoData = (section, data) => {
    setLaudoData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSave = async (status = "rascunho") => {
    if (!laudoData.nome_imovel || !laudoData.endereco) {
      alert("Preencha os campos obrigatórios");
      setActiveTab("informacoes");
      return;
    }

    setIsSaving(true);
    await Laudo.update(laudoData.id, {
      ...laudoData,
      status,
      ultima_aba_visitada: activeTab
    });
    alert("Laudo salvo com sucesso!");
    setIsSaving(false);
  };

  const handleGerarPDF = async () => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Carregando laudo...</p>
        </div>
      </div>
    );
  }

  if (!laudoData) return null;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(createPageUrl("Dashboard"))}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Editar Laudo</h1>
              <p className="text-slate-600">{laudoData.nome_imovel}</p>
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
              {isGeneratingPDF ? "Gerando..." : "Gerar PDF"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSave("rascunho")}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button
              onClick={() => handleSave("concluido")}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700"
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
                  <TabsTrigger value="informacoes">Informações</TabsTrigger>
                  <TabsTrigger value="passeio">Passeio</TabsTrigger>
                  <TabsTrigger value="estacionamento">Estacionamento</TabsTrigger>
                  <TabsTrigger value="circulacao">Circulação</TabsTrigger>
                  <TabsTrigger value="portas">Portas</TabsTrigger>
                  <TabsTrigger value="dispositivos">Dispositivos</TabsTrigger>
                  <TabsTrigger value="rampas">Rampas</TabsTrigger>
                  <TabsTrigger value="escadas">Escadas</TabsTrigger>
                  <TabsTrigger value="elevadores">Elevadores</TabsTrigger>
                  <TabsTrigger value="sanitarios">Sanitários</TabsTrigger>
                  <TabsTrigger value="vestiarios">Vestiários</TabsTrigger>
                  <TabsTrigger value="balcoes">Balcões</TabsTrigger>
                  <TabsTrigger value="lavatorios">Lavatórios</TabsTrigger>
                  <TabsTrigger value="vagas">Vagas PCD</TabsTrigger>
                  <TabsTrigger value="trabalho">Trabalho</TabsTrigger>
                  <TabsTrigger value="refeicao">Refeição</TabsTrigger>
                  <TabsTrigger value="mobiliario">Mobiliário</TabsTrigger>
                  <TabsTrigger value="assentos">Assentos</TabsTrigger>
                  <TabsTrigger value="camas">Camas/Macas</TabsTrigger>
                  <TabsTrigger value="ambientes">Ambientes</TabsTrigger>
                  <TabsTrigger value="anexos">Anexos</TabsTrigger>
                  <TabsTrigger value="historico">Histórico</TabsTrigger>
                  <TabsTrigger value="conclusao">Conclusão</TabsTrigger>
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
                    data={laudoData.passeio_publico || {}} 
                    onChange={(data) => updateLaudoData('passeio_publico', data)} 
                  />
                </TabsContent>

                <TabsContent value="estacionamento" className="mt-0">
                  <Estacionamento 
                    data={laudoData.estacionamento || {}} 
                    onChange={(data) => updateLaudoData('estacionamento', data)} 
                  />
                </TabsContent>

                <TabsContent value="circulacao" className="mt-0">
                  <CirculacaoHorizontal 
                    data={laudoData.circulacao_horizontal || {}} 
                    onChange={(data) => updateLaudoData('circulacao_horizontal', data)} 
                  />
                </TabsContent>

                <TabsContent value="portas" className="mt-0">
                  <Portas 
                    data={laudoData.portas || {}} 
                    onChange={(data) => updateLaudoData('portas', data)} 
                  />
                </TabsContent>

                <TabsContent value="dispositivos" className="mt-0">
                  <Dispositivos 
                    data={laudoData.dispositivos || {}} 
                    onChange={(data) => updateLaudoData('dispositivos', data)} 
                  />
                </TabsContent>

                <TabsContent value="rampas" className="mt-0">
                  <Rampas 
                    data={laudoData.rampas || {}} 
                    onChange={(data) => updateLaudoData('rampas', data)} 
                  />
                </TabsContent>

                <TabsContent value="escadas" className="mt-0">
                  <Escadas 
                    data={laudoData.escadas || {}} 
                    onChange={(data) => updateLaudoData('escadas', data)} 
                  />
                </TabsContent>

                <TabsContent value="elevadores" className="mt-0">
                  <Elevadores 
                    data={laudoData.elevadores || {}} 
                    onChange={(data) => updateLaudoData('elevadores', data)} 
                  />
                </TabsContent>

                <TabsContent value="sanitarios" className="mt-0">
                  <Sanitarios 
                    data={laudoData.sanitarios || {}} 
                    onChange={(data) => updateLaudoData('sanitarios', data)} 
                  />
                </TabsContent>

                <TabsContent value="vestiarios" className="mt-0">
                  <Vestiarios 
                    data={laudoData.vestiarios || {}} 
                    onChange={(data) => updateLaudoData('vestiarios', data)} 
                  />
                </TabsContent>

                <TabsContent value="balcoes" className="mt-0">
                  <Balcoes 
                    data={laudoData.balcoes || {}} 
                    onChange={(data) => updateLaudoData('balcoes', data)} 
                  />
                </TabsContent>

                <TabsContent value="lavatorios" className="mt-0">
                  <Lavatorios 
                    data={laudoData.lavatorios || {}} 
                    onChange={(data) => updateLaudoData('lavatorios', data)} 
                  />
                </TabsContent>

                <TabsContent value="vagas" className="mt-0">
                  <VagasPCD 
                    data={laudoData.vagas_pcd || {}} 
                    onChange={(data) => updateLaudoData('vagas_pcd', data)} 
                  />
                </TabsContent>

                <TabsContent value="trabalho" className="mt-0">
                  <SuperficiesTrabalho 
                    data={laudoData.superficies_trabalho || {}} 
                    onChange={(data) => updateLaudoData('superficies_trabalho', data)} 
                  />
                </TabsContent>

                <TabsContent value="refeicao" className="mt-0">
                  <SuperficiesRefeicao 
                    data={laudoData.superficies_refeicao || {}} 
                    onChange={(data) => updateLaudoData('superficies_refeicao', data)} 
                  />
                </TabsContent>

                <TabsContent value="mobiliario" className="mt-0">
                  <Mobiliario 
                    data={laudoData.mobiliario || {}} 
                    onChange={(data) => updateLaudoData('mobiliario', data)} 
                  />
                </TabsContent>

                <TabsContent value="assentos" className="mt-0">
                  <AssentosFixos 
                    data={laudoData.assentos_fixos || {}} 
                    onChange={(data) => updateLaudoData('assentos_fixos', data)} 
                  />
                </TabsContent>

                <TabsContent value="camas" className="mt-0">
                  <CamasMacas 
                    data={laudoData.camas_macas || {}} 
                    onChange={(data) => updateLaudoData('camas_macas', data)} 
                  />
                </TabsContent>

                <TabsContent value="ambientes" className="mt-0">
                  <GestaoAmbientes laudoId={laudoData.id} />
                </TabsContent>

                <TabsContent value="anexos" className="mt-0">
                  <GestaoAnexos laudoId={laudoData.id} />
                </TabsContent>

                <TabsContent value="historico" className="mt-0">
                  <HistoricoRevisoes 
                    laudoId={laudoData.id}
                    onRestaurar={() => loadLaudo()}
                  />
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