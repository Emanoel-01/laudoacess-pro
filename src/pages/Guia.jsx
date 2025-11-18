import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ExternalLink, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Guia() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Guia de Acessibilidade
          </h1>
          <p className="text-slate-600">
            Referências e diretrizes da ABNT NBR 9050:2015
          </p>
        </div>

        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="w-4 h-4 text-blue-600" />
          <AlertDescription>
            Este guia apresenta as principais diretrizes técnicas para avaliação de acessibilidade.
            Use-o como referência durante a vistoria e preenchimento do checklist.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="passeio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="passeio">Passeio</TabsTrigger>
            <TabsTrigger value="circulacao">Circulação</TabsTrigger>
            <TabsTrigger value="rampas">Rampas</TabsTrigger>
            <TabsTrigger value="escadas">Escadas</TabsTrigger>
            <TabsTrigger value="sanitarios">Sanitários</TabsTrigger>
          </TabsList>

          <TabsContent value="passeio" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Passeio Público - Requisitos ABNT NBR 9050:2015</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Faixa Livre</h3>
                  <p className="text-slate-600">
                    Largura mínima de 1,20m, livre de obstáculos, com piso estável, regular e antiderrapante.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Faixa de Serviço</h3>
                  <p className="text-slate-600">
                    Largura de 0,70m junto à guia, com tonalidade contrastante, para mobiliário urbano e vegetação.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Inclinação</h3>
                  <p className="text-slate-600">
                    Longitudinal: máximo 8,33% (1:12) | Transversal: máximo 2%
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Rebaixamento</h3>
                  <p className="text-slate-600">
                    Largura mínima de 1,20m com piso tátil de alerta a 0,50m da guia.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="circulacao" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Circulação Horizontal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Largura dos Corredores</h3>
                  <p className="text-slate-600">
                    • Até 4m de extensão: 0,90m<br />
                    • De 4m a 10m: 1,20m<br />
                    • Acima de 10m: 1,50m
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Manobras</h3>
                  <p className="text-slate-600">
                    • Rotação 90°: 1,20m x 1,20m<br />
                    • Rotação 180°: 1,50m x 1,20m<br />
                    • Rotação 360°: diâmetro 1,50m
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Piso Tátil</h3>
                  <p className="text-slate-600">
                    Direcional e de alerta com cor contrastante em relação ao piso adjacente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rampas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rampas de Acesso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Inclinação</h3>
                  <p className="text-slate-600">
                    Máxima de 8,33% (1:12) longitudinal e 2% transversal
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Largura Mínima</h3>
                  <p className="text-slate-600">
                    1,20m (podendo ser 0,90m em casos específicos com máx. 4m de comprimento)
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Corrimãos</h3>
                  <p className="text-slate-600">
                    Duas alturas: 0,92m e 0,70m, em ambos os lados, com prolongamento de 30cm e diâmetro de 3,0 a 4,5cm
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Sinalização</h3>
                  <p className="text-slate-600">
                    Piso tátil de alerta no início e fim (máx. 0,32m das extremidades) e sinalização em Braille nos corrimãos
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escadas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Escadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Dimensões</h3>
                  <p className="text-slate-600">
                    Espelho: 0,16m a 0,18m | Piso: 0,28m a 0,30m<br />
                    Fórmula: 0,63m ≤ 2e + p ≤ 0,65m
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Corrimãos</h3>
                  <p className="text-slate-600">
                    Duas alturas: 0,92m e 0,70m em ambos os lados, com prolongamento de 30cm
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Sinalização Visual</h3>
                  <p className="text-slate-600">
                    Faixa 3cm x 7cm contrastante nas bordas de cada degrau
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Área de Resgate</h3>
                  <p className="text-slate-600">
                    Em escadas de emergência: 1 M.R. (0,80m x 1,20m) por pavimento, fora do fluxo principal
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sanitarios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sanitários Acessíveis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Quantificação</h3>
                  <p className="text-slate-600">
                    • Público: 5% do total (mín. 1 por sexo/pavimento)<br />
                    • Coletivo: 5% ou 1 por pavimento<br />
                    • Saúde: 10% do total
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Área de Manobra</h3>
                  <p className="text-slate-600">
                    Espaço para giro de 360° de cadeira de rodas (diâmetro mínimo de 1,50m)
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Bacia Sanitária</h3>
                  <p className="text-slate-600">
                    Altura máxima de 0,46m (sem abertura frontal) com barras de apoio (diâmetro 3,0-4,5cm)
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Lavatório</h3>
                  <p className="text-slate-600">
                    Altura máxima de 0,80m permitindo aproximação frontal
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-900 mb-3">Referências Normativas</h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                ABNT NBR 9050:2015 - Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                ABNT NBR 16537/2017 - Sinalização tátil no piso
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                ABNT NM 313/2007 - Elevadores de passageiros
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                Lei Federal nº 10.098/2000 - Lei de Acessibilidade
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                Lei Federal nº 13.146/2015 - Lei Brasileira de Inclusão (LBI)
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                Decreto Federal nº 5.296/2004
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}