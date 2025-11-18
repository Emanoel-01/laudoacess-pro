import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Buscar assinatura ativa
    const assinaturas = await base44.entities.Assinatura.filter({ 
      user_email: user.email
    });

    if (assinaturas.length === 0) {
      return Response.json({ 
        success: false,
        mensagem: 'Nenhuma assinatura encontrada' 
      });
    }

    const assinatura = assinaturas[0];

    // Incrementar contador
    await base44.entities.Assinatura.update(assinatura.id, {
      laudos_criados_mes_atual: (assinatura.laudos_criados_mes_atual || 0) + 1
    });

    return Response.json({ 
      success: true,
      contador_atualizado: (assinatura.laudos_criados_mes_atual || 0) + 1
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});