import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ 
        valida: false, 
        mensagem: 'Usuário não autenticado' 
      }, { status: 401 });
    }

    // Buscar assinatura ativa do usuário
    const assinaturas = await base44.entities.Assinatura.filter({ 
      user_email: user.email,
      status: 'active'
    });

    if (assinaturas.length === 0) {
      // Verificar se está em trial
      const assinaturaTrial = await base44.entities.Assinatura.filter({
        user_email: user.email,
        status: 'trial'
      });

      if (assinaturaTrial.length > 0) {
        const trial = assinaturaTrial[0];
        const dataAtual = new Date();
        const dataFimTrial = new Date(trial.trial_ate);

        if (dataAtual > dataFimTrial) {
          return Response.json({
            valida: false,
            mensagem: 'Seu período de teste expirou. Por favor, assine um plano para continuar.',
            tipo: 'trial_expirado'
          });
        }

        // Trial ainda válido
        const plano = await base44.entities.Plano.get(trial.plano_id);
        return Response.json({
          valida: true,
          assinatura: trial,
          plano: plano,
          em_trial: true
        });
      }

      return Response.json({
        valida: false,
        mensagem: 'Nenhuma assinatura ativa encontrada. Por favor, assine um plano.',
        tipo: 'sem_assinatura'
      });
    }

    const assinatura = assinaturas[0];
    const plano = await base44.entities.Plano.get(assinatura.plano_id);

    // Verificar data de validade
    const dataAtual = new Date();
    const dataFim = new Date(assinatura.data_fim);

    if (dataAtual > dataFim) {
      return Response.json({
        valida: false,
        mensagem: 'Sua assinatura expirou. Por favor, renove para continuar.',
        tipo: 'assinatura_expirada'
      });
    }

    // Verificar limite de laudos (se aplicável)
    if (plano.limite_laudos_mes > 0) {
      // Resetar contador se mudou o mês
      const ultimoReset = new Date(assinatura.ultimo_reset_contador || assinatura.data_inicio);
      if (dataAtual.getMonth() !== ultimoReset.getMonth() || 
          dataAtual.getFullYear() !== ultimoReset.getFullYear()) {
        // Reset do contador mensal
        await base44.entities.Assinatura.update(assinatura.id, {
          laudos_criados_mes_atual: 0,
          ultimo_reset_contador: dataAtual.toISOString()
        });
        assinatura.laudos_criados_mes_atual = 0;
      }

      if (assinatura.laudos_criados_mes_atual >= plano.limite_laudos_mes) {
        return Response.json({
          valida: false,
          mensagem: `Você atingiu o limite de ${plano.limite_laudos_mes} laudos por mês do plano ${plano.nome}. Faça upgrade para continuar.`,
          tipo: 'limite_atingido',
          plano: plano,
          assinatura: assinatura
        });
      }
    }

    return Response.json({
      valida: true,
      assinatura: assinatura,
      plano: plano,
      laudos_restantes: plano.limite_laudos_mes > 0 ? 
        plano.limite_laudos_mes - assinatura.laudos_criados_mes_atual : 
        'ilimitado'
    });

  } catch (error) {
    return Response.json({ 
      valida: false,
      mensagem: error.message 
    }, { status: 500 });
  }
});