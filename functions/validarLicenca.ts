import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    console.log('[validarLicenca] Iniciando validação para usuário:', user?.email || 'não autenticado');

    if (!user) {
      console.log('[validarLicenca] Usuário não autenticado');
      return Response.json({ 
        valida: false, 
        mensagem: 'Usuário não autenticado' 
      }, { status: 401 });
    }

    // Buscar TODAS as assinaturas do usuário (sem cache)
    console.log('[validarLicenca] Buscando assinaturas para:', user.email);
    
    const todasAssinaturas = await base44.asServiceRole.entities.Assinatura.filter({ 
      user_email: user.email
    });

    console.log('[validarLicenca] Total de assinaturas encontradas:', todasAssinaturas.length);
    console.log('[validarLicenca] Assinaturas:', JSON.stringify(todasAssinaturas, null, 2));

    // Filtrar assinaturas ativas
    const assinaturasAtivas = todasAssinaturas.filter(a => a.status === 'active');
    console.log('[validarLicenca] Assinaturas ativas:', assinaturasAtivas.length);

    if (assinaturasAtivas.length === 0) {
      // Verificar se está em trial
      const assinaturasTrial = todasAssinaturas.filter(a => a.status === 'trial');
      console.log('[validarLicenca] Assinaturas trial:', assinaturasTrial.length);

      if (assinaturasTrial.length > 0) {
        const trial = assinaturasTrial[0];
        const dataAtual = new Date();
        const dataFimTrial = new Date(trial.trial_ate);

        console.log('[validarLicenca] Verificando trial - Data atual:', dataAtual, 'Data fim:', dataFimTrial);

        if (dataAtual > dataFimTrial) {
          console.log('[validarLicenca] Trial expirado');
          return Response.json({
            valida: false,
            mensagem: 'Seu período de teste expirou. Por favor, assine um plano para continuar.',
            tipo: 'trial_expirado'
          });
        }

        // Trial ainda válido
        const plano = await base44.asServiceRole.entities.Plano.get(trial.plano_id);
        console.log('[validarLicenca] Trial válido - Plano:', plano.nome);
        
        return Response.json({
          valida: true,
          assinatura: trial,
          plano: plano,
          em_trial: true
        });
      }

      console.log('[validarLicenca] Sem assinatura ativa ou trial');
      return Response.json({
        valida: false,
        mensagem: 'Nenhuma assinatura ativa encontrada. Por favor, assine um plano.',
        tipo: 'sem_assinatura'
      });
    }

    const assinatura = assinaturasAtivas[0];
    console.log('[validarLicenca] Assinatura ativa encontrada:', assinatura.id);

    const plano = await base44.asServiceRole.entities.Plano.get(assinatura.plano_id);
    console.log('[validarLicenca] Plano:', plano.nome, '- Limite:', plano.limite_laudos_mes);

    // Verificar data de validade
    const dataAtual = new Date();
    const dataFim = new Date(assinatura.data_fim);

    console.log('[validarLicenca] Verificando validade - Data atual:', dataAtual, 'Data fim:', dataFim);

    if (dataAtual > dataFim) {
      console.log('[validarLicenca] Assinatura expirada');
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
      console.log('[validarLicenca] Último reset:', ultimoReset, '- Mês atual:', dataAtual.getMonth());
      
      if (dataAtual.getMonth() !== ultimoReset.getMonth() || 
          dataAtual.getFullYear() !== ultimoReset.getFullYear()) {
        console.log('[validarLicenca] Resetando contador mensal');
        // Reset do contador mensal
        await base44.asServiceRole.entities.Assinatura.update(assinatura.id, {
          laudos_criados_mes_atual: 0,
          ultimo_reset_contador: dataAtual.toISOString()
        });
        assinatura.laudos_criados_mes_atual = 0;
      }

      console.log('[validarLicenca] Laudos criados:', assinatura.laudos_criados_mes_atual, '/ Limite:', plano.limite_laudos_mes);

      if (assinatura.laudos_criados_mes_atual >= plano.limite_laudos_mes) {
        console.log('[validarLicenca] Limite de laudos atingido');
        return Response.json({
          valida: false,
          mensagem: `Você atingiu o limite de ${plano.limite_laudos_mes} laudos por mês do plano ${plano.nome}. Faça upgrade para continuar.`,
          tipo: 'limite_atingido',
          plano: plano,
          assinatura: assinatura
        });
      }
    }

    console.log('[validarLicenca] Licença válida!');
    return Response.json({
      valida: true,
      assinatura: assinatura,
      plano: plano,
      laudos_restantes: plano.limite_laudos_mes > 0 ? 
        plano.limite_laudos_mes - assinatura.laudos_criados_mes_atual : 
        'ilimitado'
    });

  } catch (error) {
    console.error('[validarLicenca] Erro:', error.message);
    console.error('[validarLicenca] Stack:', error.stack);
    return Response.json({ 
      valida: false,
      mensagem: `Erro na validação: ${error.message}` 
    }, { status: 500 });
  }
});