import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Apenas administradores podem executar seed' }, { status: 403 });
    }

    // Verificar se já existem planos
    const planosExistentes = await base44.asServiceRole.entities.Plano.list();
    
    if (planosExistentes.length > 0) {
      return Response.json({ 
        mensagem: 'Planos já existem no sistema',
        planos: planosExistentes 
      });
    }

    // Criar planos padrão
    const planos = [
      {
        nome: "Básico",
        descricao: "Ideal para profissionais autônomos que fazem poucos laudos por mês",
        preco_mensal: 97.00,
        preco_anual: 970.00,
        limite_laudos_mes: 5,
        tem_ia: false,
        tem_whatsapp: false,
        tem_white_label: false,
        suporte_prioritario: false,
        ativo: true
      },
      {
        nome: "Profissional",
        descricao: "Para profissionais que precisam de mais laudos e recursos de IA",
        preco_mensal: 197.00,
        preco_anual: 1970.00,
        limite_laudos_mes: 20,
        tem_ia: true,
        tem_whatsapp: true,
        tem_white_label: true,
        suporte_prioritario: false,
        ativo: true
      },
      {
        nome: "Empresarial",
        descricao: "Para escritórios e empresas com alto volume de laudos",
        preco_mensal: 497.00,
        preco_anual: 4970.00,
        limite_laudos_mes: 0, // Ilimitado
        tem_ia: true,
        tem_whatsapp: true,
        tem_white_label: true,
        suporte_prioritario: true,
        ativo: true
      }
    ];

    const planosCriados = [];
    for (const plano of planos) {
      const planoCriado = await base44.asServiceRole.entities.Plano.create(plano);
      planosCriados.push(planoCriado);
    }

    return Response.json({ 
      mensagem: 'Planos criados com sucesso',
      planos: planosCriados 
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});