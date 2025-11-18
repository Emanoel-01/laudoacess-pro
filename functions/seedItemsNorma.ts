import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Apenas administradores podem executar seed' }, { status: 403 });
    }

    // Verificar se já existem itens
    const itensExistentes = await base44.asServiceRole.entities.ItemNorma.filter({ versao_norma: "2020" });
    
    if (itensExistentes.length > 0) {
      return Response.json({ 
        mensagem: 'Itens da norma 2020 já existem no sistema',
        total: itensExistentes.length 
      });
    }

    const itens = [
      // Passeio Público
      {
        versao_norma: "2020",
        categoria: "passeio_publico",
        referencia_item: "passeio_publico.faixa_livre",
        descricao: "Faixa livre de circulação com largura mínima de 1,20m",
        criterio_aceite: "Largura mínima de 1,20m livre de obstáculos, com superfície regular, firme, estável e antiderrapante",
        secao_norma: "6.12.1",
        ordem: 1,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },
      {
        versao_norma: "2020",
        categoria: "passeio_publico",
        referencia_item: "passeio_publico.inclinacao_longitudinal",
        descricao: "Inclinação longitudinal da faixa livre máxima de 8,33%",
        criterio_aceite: "Inclinação longitudinal máxima de 8,33% (1:12)",
        secao_norma: "6.12.2",
        ordem: 2,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },
      {
        versao_norma: "2020",
        categoria: "passeio_publico",
        referencia_item: "passeio_publico.inclinacao_transversal",
        descricao: "Inclinação transversal da faixa livre máxima de 2%",
        criterio_aceite: "Inclinação transversal máxima de 2%",
        secao_norma: "6.12.2",
        ordem: 3,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },
      {
        versao_norma: "2020",
        categoria: "passeio_publico",
        referencia_item: "passeio_publico.rebaixamento_guia",
        descricao: "Rebaixamento de guia com largura mínima de 1,20m",
        criterio_aceite: "Rebaixamento com largura mínima de 1,20m e piso tátil de alerta",
        secao_norma: "6.12.5",
        ordem: 4,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },
      
      // Rampas
      {
        versao_norma: "2020",
        categoria: "rampas",
        referencia_item: "rampas.inclinacao_maxima",
        descricao: "Inclinação longitudinal máxima de 8,33% (1:12)",
        criterio_aceite: "Inclinação longitudinal máxima de 8,33% (1:12)",
        secao_norma: "6.6.2",
        ordem: 1,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo", "uso_privado"]
      },
      {
        versao_norma: "2020",
        categoria: "rampas",
        referencia_item: "rampas.largura_minima",
        descricao: "Largura mínima de 1,20m",
        criterio_aceite: "Largura livre mínima de 1,20m (admite-se 0,90m em trechos até 4m)",
        secao_norma: "6.6.2.1",
        ordem: 2,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo", "uso_privado"]
      },
      {
        versao_norma: "2020",
        categoria: "rampas",
        referencia_item: "rampas.corrimao_duplo",
        descricao: "Corrimãos em duas alturas (0,70m e 0,92m)",
        criterio_aceite: "Corrimãos em ambos os lados nas alturas de 0,70m e 0,92m do piso",
        secao_norma: "6.9.2",
        ordem: 3,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo", "uso_privado"]
      },
      {
        versao_norma: "2020",
        categoria: "rampas",
        referencia_item: "rampas.piso_tatil",
        descricao: "Piso tátil de alerta no início e fim",
        criterio_aceite: "Piso tátil de alerta com largura de 0,25m a 0,60m no início e fim da rampa",
        secao_norma: "5.14.1.2",
        ordem: 4,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },

      // Escadas
      {
        versao_norma: "2020",
        categoria: "escadas",
        referencia_item: "escadas.dimensao_degraus",
        descricao: "Dimensões dos degraus: espelho entre 0,16m e 0,18m, piso entre 0,28m e 0,32m",
        criterio_aceite: "Espelho (h) entre 0,16m e 0,18m; Piso (b) entre 0,28m e 0,32m. Fórmula: 0,63m ≤ (2h + b) ≤ 0,65m",
        secao_norma: "6.7.1.5",
        ordem: 1,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo", "uso_privado"]
      },
      {
        versao_norma: "2020",
        categoria: "escadas",
        referencia_item: "escadas.sinalizacao_visual",
        descricao: "Sinalização visual no bordo do piso",
        criterio_aceite: "Faixa de 0,02m a 0,03m de largura em cor contrastante em todos os degraus",
        secao_norma: "5.14.2.2",
        ordem: 2,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },
      {
        versao_norma: "2020",
        categoria: "escadas",
        referencia_item: "escadas.corrimao_duplo",
        descricao: "Corrimãos em duas alturas (0,70m e 0,92m)",
        criterio_aceite: "Corrimãos em ambos os lados nas alturas de 0,70m e 0,92m",
        secao_norma: "6.9.2",
        ordem: 3,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo", "uso_privado"]
      },

      // Sanitários
      {
        versao_norma: "2020",
        categoria: "sanitarios",
        referencia_item: "sanitarios.area_manobra",
        descricao: "Área de manobra para rotação de 360° (diâmetro 1,50m)",
        criterio_aceite: "Espaço livre para giro de 360° de cadeira de rodas (diâmetro mínimo 1,50m)",
        secao_norma: "7.3.2.1",
        ordem: 1,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },
      {
        versao_norma: "2020",
        categoria: "sanitarios",
        referencia_item: "sanitarios.bacia_altura",
        descricao: "Altura da bacia sanitária entre 0,43m e 0,45m",
        criterio_aceite: "Altura do assento entre 0,43m e 0,45m do piso acabado",
        secao_norma: "7.3.2.3",
        ordem: 2,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },
      {
        versao_norma: "2020",
        categoria: "sanitarios",
        referencia_item: "sanitarios.barras_apoio",
        descricao: "Barras de apoio junto à bacia",
        criterio_aceite: "Barras laterais e de fundo com altura de 0,75m, diâmetro entre 3cm e 4,5cm",
        secao_norma: "7.3.2.4",
        ordem: 3,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },

      // Portas
      {
        versao_norma: "2020",
        categoria: "portas",
        referencia_item: "portas.vao_livre",
        descricao: "Vão livre mínimo de 0,80m",
        criterio_aceite: "Vão livre da porta com largura mínima de 0,80m",
        secao_norma: "6.11.2.1",
        ordem: 1,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo", "uso_privado"]
      },
      {
        versao_norma: "2020",
        categoria: "portas",
        referencia_item: "portas.area_aproximacao",
        descricao: "Área de aproximação e manobra",
        criterio_aceite: "Espaço para aproximação frontal ou lateral da porta conforme seção 4.3",
        secao_norma: "6.11.2.3",
        ordem: 2,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },

      // Circulação
      {
        versao_norma: "2020",
        categoria: "circulacao",
        referencia_item: "circulacao.largura_minima",
        descricao: "Largura mínima de corredores",
        criterio_aceite: "Até 4m: 0,90m; de 4m a 10m: 1,20m; acima de 10m: 1,50m",
        secao_norma: "6.12.3",
        ordem: 1,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo"]
      },
      {
        versao_norma: "2020",
        categoria: "circulacao",
        referencia_item: "circulacao.piso_regular",
        descricao: "Piso regular, firme, estável e antiderrapante",
        criterio_aceite: "Superfície regular, sem desníveis, firme e antiderrapante",
        secao_norma: "6.3.1",
        ordem: 2,
        obrigatorio: true,
        aplicavel_a: ["uso_publico", "uso_coletivo", "uso_privado"]
      }
    ];

    const itensCriados = [];
    for (const item of itens) {
      const itemCriado = await base44.asServiceRole.entities.ItemNorma.create(item);
      itensCriados.push(itemCriado);
    }

    return Response.json({ 
      mensagem: 'Itens da norma NBR 9050:2020 criados com sucesso',
      total: itensCriados.length,
      itens: itensCriados 
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});