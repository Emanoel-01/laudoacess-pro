import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, AlertTriangle, Ruler, TrendingUp, HandMetal, DoorOpen, Package } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ParametroCard = ({ icone: Icone, titulo, valor, requisito, children }) => (
  <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
        {Icone && <Icone className="w-5 h-5 text-blue-600" />}
        {titulo}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="text-3xl font-bold text-blue-700 flex items-center gap-2">
        <Ruler className="w-6 h-6" />
        {valor}
      </div>
      <p className="text-slate-700 text-sm leading-relaxed">
        {requisito}
      </p>
      {children}
    </CardContent>
  </Card>
);

const AlertaNaoConformidade = ({ children }) => (
  <Alert className="border-orange-300 bg-orange-50 mt-6">
    <AlertTriangle className="w-5 h-5 text-orange-600" />
    <AlertDescription className="text-slate-800">
      <div className="font-semibold text-orange-900 mb-2 text-base">
        ⚠️ Alerta de Não Conformidade Comum
      </div>
      {children}
    </AlertDescription>
  </Alert>
);

export default function Guia() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-blue-600" />
            Guia de Acessibilidade LaudoAcess: NBR 9050:2020
          </h1>
          <p className="text-slate-600 text-lg">
            Manual de referência técnica rápido para profissionais, arquitetos e fiscais
          </p>
        </div>

        <Alert className="mb-6 border-blue-300 bg-blue-50">
          <BookOpen className="w-5 h-5 text-blue-700" />
          <AlertDescription className="text-slate-800">
            <strong>Referência Técnica e Conformidade:</strong> Utilize este guia para confirmar os parâmetros exatos da ABNT NBR 9050:2020 e identificar falhas comuns durante a elaboração do seu laudo.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="passeio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-9 bg-white border border-slate-200">
            <TabsTrigger value="passeio">Passeio</TabsTrigger>
            <TabsTrigger value="circulacao">Circulação</TabsTrigger>
            <TabsTrigger value="rampas">Rampas</TabsTrigger>
            <TabsTrigger value="escadas">Escadas</TabsTrigger>
            <TabsTrigger value="portas">Portas</TabsTrigger>
            <TabsTrigger value="sanitarios">Sanitários</TabsTrigger>
            <TabsTrigger value="estacionamento">Estacionamento</TabsTrigger>
            <TabsTrigger value="elevadores">Elevadores</TabsTrigger>
            <TabsTrigger value="sinalizacao">Sinalização</TabsTrigger>
          </TabsList>

          {/* ABA 1: PASSEIO PÚBLICO */}
          <TabsContent value="passeio" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Passeio Público e Percursos</h2>
              <p className="text-slate-600">Requisitos para percursos horizontais e calçadas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParametroCard
                titulo="Piso"
                valor="Firme e Estável"
                requisito="Firme, estável, regular e antiderrapante em qualquer condição climática. Evitar desníveis."
              />

              <ParametroCard
                titulo="Largura Livre"
                valor="1,20 m"
                requisito="Mínimo de 1,20 m para percursos. Altura livre de 2,10 m."
              />

              <ParametroCard
                titulo="Faixa de Serviço"
                valor="0,70 m"
                requisito="Largura de 0,70 m (ideal), destinada ao mobiliário urbano e arborização."
              />

              <ParametroCard
                titulo="Declividade"
                valor="≤ 5% / ≤ 2%"
                requisito="Longitudinais: até 5% (ideal). Transversais: até 2% (para drenagem)."
              />

              <ParametroCard
                titulo="Sinalização Tátil"
                valor="Alerta + Direcional"
                requisito="Pisos táteis de alerta (mudança de direção, obstáculos) e direcionais (guiando o percurso)."
              />
            </div>

            <AlertaNaoConformidade>
              <ul className="space-y-2 text-sm">
                <li><strong>Grelhas/Ralos:</strong> Vãos superiores a 1,5 cm na direção do percurso, ou desníveis abruptos (degraus) não sinalizados.</li>
                <li><strong>Postes/Placas/Lixeiras:</strong> Instalados dentro da largura livre de 1,20 m, obstruindo a passagem.</li>
                <li><strong>Mobiliário:</strong> Que invade a Faixa Livre de 1,20 m.</li>
                <li><strong>Declividades:</strong> Maiores que 5% sem patamares de descanso são consideradas rampas não conformes.</li>
                <li><strong>Sinalização tátil:</strong> Sem contraste de cor/luminosidade com o piso adjacente.</li>
              </ul>
            </AlertaNaoConformidade>
          </TabsContent>

          {/* ABA 2: CIRCULAÇÃO HORIZONTAL */}
          <TabsContent value="circulacao" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Circulação Horizontal (Corredores e Manobras)</h2>
              <p className="text-slate-600">Dimensões e espaços livres internos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParametroCard
                titulo="Largura Corredores"
                valor="0,90 m a 1,50 m"
                requisito="Até 4 m de extensão: 0,90 m. De 4 m a 10 m: 1,20 m. Acima de 10 m: 1,50 m."
              />

              <ParametroCard
                titulo="Manobra 90°"
                valor="1,20 m × 1,20 m"
                requisito="Espaço livre de 1,20 m × 1,20 m para curvas de 90°."
              />

              <ParametroCard
                titulo="Manobra 360°"
                valor="Ø 1,50 m"
                requisito="Círculo de diâmetro mínimo de 1,50 m para rotação completa da cadeira de rodas."
              />
            </div>

            <AlertaNaoConformidade>
              <ul className="space-y-2 text-sm">
                <li><strong>Colunas ou móveis:</strong> Invadindo a largura mínima exigida para a extensão total do corredor.</li>
                <li><strong>Raio de giro:</strong> Na curva de 90° é obstruído por balcões ou expositores.</li>
                <li><strong>Áreas de espera (halls):</strong> Que não comportam o círculo de manobra livre de 1,50 m.</li>
              </ul>
            </AlertaNaoConformidade>
          </TabsContent>

          {/* ABA 3: RAMPAS */}
          <TabsContent value="rampas" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Rampas</h2>
              <p className="text-slate-600">Requisitos para rampas que garantam a circulação segura e acessível</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParametroCard
                icone={Ruler}
                titulo="Largura Livre"
                valor="1,20 m"
                requisito="Mínimo de 1,20 m para permitir a passagem segura de cadeira de rodas."
              />

              <ParametroCard
                icone={TrendingUp}
                titulo="Inclinação (i)"
                valor="≤ 8,33%"
                requisito="Determinado pela altura do desnível (H). Ex: H ≤ 0,50 m ⟹ i ≤ 8,33% (1:12). Sempre consultar a Tabela da Norma."
              />

              <ParametroCard
                icone={Package}
                titulo="Patamares"
                valor="1,20 m"
                requisito="Comprimento mínimo de 1,20 m em cada extremidade, a cada 50 m de percurso ou mudança de direção."
              />

              <ParametroCard
                icone={HandMetal}
                titulo="Corrimãos"
                valor="0,70 m e 0,92 m"
                requisito="Duplos em dois níveis (0,70 m e 0,92 m). Prolongados 0,30 m além do início/fim da rampa."
              />
            </div>

            <AlertaNaoConformidade>
              <ul className="space-y-2 text-sm">
                <li><strong>Largura:</strong> Rampa com largura menor que 1,20 m devido a pilares ou guarda-corpos salientes.</li>
                <li><strong>Inclinação excessiva:</strong> A não conformidade mais comum é a inclinação acima do limite (8,33%). Declividades muito altas exigem patamares intermediários muito mais curtos, o que é frequentemente ignorado.</li>
                <li><strong>Patamar:</strong> Com inclinação longitudinal ou transversal maior que 2%, ou de comprimento insuficiente.</li>
                <li><strong>Corrimão:</strong> Interrompido na área do patamar ou sem o prolongamento de 0,30 m nas extremidades.</li>
              </ul>
            </AlertaNaoConformidade>
          </TabsContent>

          {/* ABA 4: ESCADAS */}
          <TabsContent value="escadas" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Escadas</h2>
              <p className="text-slate-600">Requisitos para escadas que garantam a circulação segura</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParametroCard
                titulo="Degraus"
                valor="60 cm ≤ (2h + p) ≤ 64 cm"
                requisito="Uniformidade: Altura (h) e profundidade (p) uniformes. Fórmula de Blondel: 60 cm ≤ (2h + p) ≤ 64 cm."
              />

              <ParametroCard
                icone={HandMetal}
                titulo="Corrimãos"
                valor="0,70 m e 0,92 m"
                requisito="Duplos: Alturas de 0,70 m e 0,92 m. Prolongados 0,30 m no início e fim."
              />

              <ParametroCard
                titulo="Sinalização"
                valor="Visual + Tátil"
                requisito="Faixa de sinalização visual e tátil no piso/espelho do primeiro e último degrau."
              />
            </div>

            <AlertaNaoConformidade>
              <ul className="space-y-2 text-sm">
                <li><strong>Pisos ou espelhos:</strong> Com dimensões não uniformes no mesmo lance, dificultando a previsibilidade do passo.</li>
                <li><strong>Ausência de corrimão duplo:</strong> Ou corrimão muito próximo à parede, impedindo o bom agarre.</li>
                <li><strong>Sinalização:</strong> Visual sem contraste tátil e/ou visual claro com o piso adjacente.</li>
              </ul>
            </AlertaNaoConformidade>
          </TabsContent>

          {/* ABA 5: PORTAS */}
          <TabsContent value="portas" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Portas e Vãos</h2>
              <p className="text-slate-600">Critérios para portas e vãos que permitam a passagem e o uso por pessoas com deficiência</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParametroCard
                icone={DoorOpen}
                titulo="Largura Livre"
                valor="0,80 m / 0,90 m"
                requisito="Geral: Mínimo 0,80 m. Sanitários Acessíveis: Mínimo 0,90 m."
              />

              <ParametroCard
                titulo="Manuseio (Maçaneta)"
                valor="0,90 m a 1,10 m"
                requisito="Tipo alavanca. Altura entre 0,90 m e 1,10 m do piso."
              />

              <ParametroCard
                titulo="Visibilidade"
                valor="0,90 m e 1,50 m"
                requisito="Faixas de contraste em portas de vidro nas alturas de 0,90 m e 1,50 m."
              />
            </div>

            <AlertaNaoConformidade>
              <ul className="space-y-2 text-sm">
                <li><strong>Vão livre:</strong> A folha da porta (aberta a 90°) invade o vão, reduzindo a passagem livre para menos de 0,80 m.</li>
                <li><strong>Maçanetas redondas:</strong> Tipo bola que exigem torção fina, sendo inacessíveis para pessoas com mobilidade reduzida nas mãos.</li>
                <li><strong>Portas de vidro:</strong> Transparentes sem sinalização visual adequada, gerando risco de colisão.</li>
              </ul>
            </AlertaNaoConformidade>
          </TabsContent>

          {/* ABA 6: SANITÁRIOS */}
          <TabsContent value="sanitarios" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sanitários Acessíveis</h2>
              <p className="text-slate-600">Detalhes críticos para uso autônomo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParametroCard
                titulo="Espaço de Manobra"
                valor="Ø 1,50 m"
                requisito="Área livre mínima: Círculo de 1,50 m de diâmetro."
              />

              <ParametroCard
                titulo="Vaso Sanitário"
                valor="0,46 m a 0,47 m"
                requisito="Altura da borda superior: 0,46 m (com assento) a 0,47 m do piso acabado."
              />

              <ParametroCard
                titulo="Barras de Apoio"
                valor="0,75 m"
                requisito="Altura da barra horizontal: 0,75 m do piso. Comprimento mínimo de 0,80 m (barra lateral)."
              />

              <ParametroCard
                titulo="Lavatório"
                valor="≤ 0,85 m / ≥ 0,73 m"
                requisito="Altura Superior Máxima: 0,85 m. Altura Livre Inferior Mínima: 0,73 m (para joelhos)."
              />
            </div>

            <AlertaNaoConformidade>
              <ul className="space-y-2 text-sm">
                <li><strong>Círculo de manobra:</strong> Invadido pela lixeira, porta abrindo para dentro, ou outros acessórios fixos.</li>
                <li><strong>Altura da bacia:</strong> Fora da faixa especificada, ou o acionamento da descarga é de difícil alcance/manuseio.</li>
                <li><strong>Barras de apoio:</strong> Instaladas com altura ou distância da parede não conforme, comprometendo a transferência e segurança.</li>
                <li><strong>Lavatórios:</strong> Com coluna, gabinete ou sifão que impede a aproximação frontal da cadeira de rodas.</li>
              </ul>
            </AlertaNaoConformidade>
          </TabsContent>

          {/* ABA 7: ESTACIONAMENTO */}
          <TabsContent value="estacionamento" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Estacionamento</h2>
              <p className="text-slate-600">Vagas acessíveis e sinalização</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParametroCard
                titulo="Número de Vagas"
                valor="2% (mín. 1)"
                requisito="Mínimo de 2% do total, garantindo no mínimo 1 vaga."
              />

              <ParametroCard
                titulo="Dimensões"
                valor="2,50 m × 5,00 m"
                requisito="Vaga: 2,50 m × 5,00 m. Faixa de Transbordo: 1,20 m ao lado (compartilhável)."
              />

              <ParametroCard
                titulo="Sinalização"
                valor="Horizontal + Vertical"
                requisito="Horizontal (pintura no piso) e Vertical (Placa com Símbolo Internacional de Acesso - SIA)."
              />
            </div>

            <AlertaNaoConformidade>
              <ul className="space-y-2 text-sm">
                <li><strong>Vagas mínimas:</strong> Estacionamentos de pequeno porte sem a vaga mínima de 1 ou sem localização preferencial.</li>
                <li><strong>Faixa de transbordo:</strong> Inexistente ou obstruída por pilares/paredes, impedindo a transferência da cadeira de rodas.</li>
                <li><strong>Sinalização vertical:</strong> Ausência da placa vertical (SIA), tornando a vaga irregular do ponto de vista legal e de fiscalização.</li>
              </ul>
            </AlertaNaoConformidade>
          </TabsContent>

          {/* ABA 8: ELEVADORES */}
          <TabsContent value="elevadores" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Elevadores e Plataformas</h2>
              <p className="text-slate-600">Requisitos para equipamentos de transporte vertical</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParametroCard
                titulo="Cabine"
                valor="Giro 180°"
                requisito="Dimensões mínimas para giro de 180° (consultar NBR). Pelo menos um espelho na parede de fundo."
              />

              <ParametroCard
                titulo="Botoeiras"
                valor="0,89 m a 1,35 m"
                requisito="Altura acessível (entre 0,89 m e 1,35 m). Botões com Braile e em relevo."
              />

              <ParametroCard
                titulo="Avisos Sonoros"
                valor="Indicadores Sonoros"
                requisito="Indicadores sonoros (voz) para identificação de pavimento e direção."
              />
            </div>

            <AlertaNaoConformidade>
              <ul className="space-y-2 text-sm">
                <li><strong>Cabines pequenas:</strong> Impedindo a manobra e o posicionamento lateral para uso do painel.</li>
                <li><strong>Botões:</strong> Sem sinalização tátil (Braile/relevo) ou instalados fora da altura de alcance.</li>
                <li><strong>Elevador silencioso:</strong> Ou com som muito baixo, não alertando pessoas com deficiência visual sobre a chegada ao andar.</li>
              </ul>
            </AlertaNaoConformidade>
          </TabsContent>

          {/* ABA 9: SINALIZAÇÃO E COMUNICAÇÃO */}
          <TabsContent value="sinalizacao" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sinalização e Comunicação</h2>
              <p className="text-slate-600">Sinalização informativa e de emergência</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ParametroCard
                titulo="Visual"
                valor="Contraste + Tamanho"
                requisito="Contraste de cores, tamanho e tipo de letra adequados. Altura de instalação acessível."
              />

              <ParametroCard
                titulo="Tátil (Braile)"
                valor="0,90 m a 1,10 m"
                requisito="Uso de Braile e caracteres em relevo para identificação (portas, elevadores). Altura de alcance tátil: 0,90 m a 1,10 m."
              />

              <ParametroCard
                titulo="Emergência"
                valor="Sonoro + Visual"
                requisito="Alarmes sonoros e visuais (luzes estroboscópicas) para emergências."
              />
            </div>

            <AlertaNaoConformidade>
              <ul className="space-y-2 text-sm">
                <li><strong>Painéis e placas:</strong> Com letras pequenas, baixo contraste (ex: branco sobre bege) ou cores inadequadas para daltônicos.</li>
                <li><strong>Sinalização tátil:</strong> Instalada muito alta ou muito baixa, fora da faixa de alcance tátil (0,90 m a 1,10 m).</li>
                <li><strong>Sistemas de alarme:</strong> Que emitem apenas som, ignorando a necessidade de alerta visual para pessoas com deficiência auditiva.</li>
              </ul>
            </AlertaNaoConformidade>
          </TabsContent>
        </Tabs>

        {/* REFERÊNCIAS NORMATIVAS */}
        <Card className="mt-8 border-blue-300 bg-gradient-to-br from-blue-50 to-slate-50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2 text-blue-900">
              <BookOpen className="w-6 h-6" />
              Referências Normativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-700">
              <li>• <strong>ABNT NBR 9050:2020</strong> - Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos</li>
              <li>• <strong>ABNT NBR 16537/2017</strong> - Sinalização tátil no piso</li>
              <li>• <strong>ABNT NM 313/2007</strong> - Elevadores de passageiros</li>
              <li>• <strong>Lei Federal nº 10.098/2000</strong> - Lei de Acessibilidade</li>
              <li>• <strong>Lei Federal nº 13.146/2015</strong> - Lei Brasileira de Inclusão (LBI)</li>
              <li>• <strong>Decreto Federal nº 5.296/2004</strong></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}