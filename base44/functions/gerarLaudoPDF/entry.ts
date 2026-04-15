import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';
import { jsPDF } from 'npm:jspdf@2.5.2';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { laudoData, config = {} } = await req.json();
    const { 
      secoesSelecionadas = [], 
      sumarioExecutivo = '', 
      conclusaoPersonalizada = '',
      incluirCabecalho = true,
      incluirRodape = true
    } = config;
    const doc = new jsPDF();
    let yPos = 20;
    const corPrimaria = user.cor_primaria ? hexToRgb(user.cor_primaria) : { r: 41, g: 128, b: 185 };

    // Função auxiliar para converter hex em RGB
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 41, g: 128, b: 185 };
    }

    // Função para adicionar cabeçalho
    const addHeader = () => {
      if (!incluirCabecalho) return;
      
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.setFillColor(corPrimaria.r, corPrimaria.g, corPrimaria.b);
      doc.rect(0, 0, pageWidth, 15, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(user.empresa || user.full_name, 10, 10);
      doc.setTextColor(0, 0, 0);
    };

    // Função para adicionar rodapé
    const addFooter = (pageNum) => {
      if (!incluirRodape) return;
      
      const pageHeight = doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      doc.setDrawColor(200, 200, 200);
      doc.line(10, pageHeight - 20, pageWidth - 10, pageHeight - 20);
      
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(user.empresa || user.full_name, 10, pageHeight - 12);
      
      if (user.telefone) {
        doc.text(`Tel: ${user.telefone}`, 10, pageHeight - 7);
      }
      
      doc.text(`Página ${pageNum}`, pageWidth - 30, pageHeight - 10);
      doc.setTextColor(0, 0, 0);
    };

    // Função auxiliar para adicionar texto
    const addText = (text, x, y, fontSize = 12, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? 'bold' : 'normal');
      doc.text(text, x, y);
    };

    // Função para verificar se precisa de nova página
    const checkNewPage = (neededSpace = 30) => {
      if (yPos > 270 - neededSpace - (incluirRodape ? 25 : 0)) {
        const currentPage = doc.internal.pages.length - 1;
        addFooter(currentPage);
        doc.addPage();
        addHeader();
        yPos = incluirCabecalho ? 25 : 20;
        return true;
      }
      return false;
    };

    // Função para verificar se seção está habilitada
    const isSecaoHabilitada = (secaoId) => {
      return secoesSelecionadas.length === 0 || secoesSelecionadas.includes(secaoId);
    };

    // CAPA
    if (user.logo_url) {
      // Se houver logo, tentar adicionar (em produção, usar biblioteca de imagens)
    }
    
    addText('LAUDO TÉCNICO DE ACESSIBILIDADE', 105, 100, 20, true);
    addText(laudoData.nome_imovel || 'MODELO', 105, 115, 16);
    addText(`${laudoData.data_vistoria || 'DATA'} | ${laudoData.numero_revisao || 'R00'}`, 105, 130, 12);
    
    doc.setFillColor(corPrimaria.r, corPrimaria.g, corPrimaria.b);
    doc.rect(85, 140, 40, 40, 'F');
    doc.setTextColor(255, 255, 255);
    addText('♿', 105, 165, 30);
    doc.setTextColor(0, 0, 0);

    // SUMÁRIO EXECUTIVO (se fornecido)
    if (sumarioExecutivo) {
      doc.addPage();
      addHeader();
      yPos = incluirCabecalho ? 25 : 20;
      addText('SUMÁRIO EXECUTIVO', 20, yPos, 16, true);
      yPos += 10;
      const sumarioLines = doc.splitTextToSize(sumarioExecutivo, 170);
      doc.text(sumarioLines, 20, yPos);
      yPos += sumarioLines.length * 7 + 10;
      addFooter(2);
    }

    // OBJETIVO (Nova página)
    doc.addPage();
    addHeader();
    yPos = incluirCabecalho ? 25 : 20;
    if (isSecaoHabilitada('objetivo')) {
      addText('Objetivo', 20, yPos, 16, true);
      yPos += 10;
      const objetivoText = laudoData.objetivo || `Este laudo técnico de acessibilidade tem como objetivo analisar as condições físicas das instalações do edifício localizado em ${laudoData.endereco}.`;
      const objetivoLines = doc.splitTextToSize(objetivoText, 170);
      doc.text(objetivoLines, 20, yPos);
      yPos += objetivoLines.length * 7 + 10;
    }

    if (isSecaoHabilitada('premissa')) {
      checkNewPage();
      addText('Premissa', 20, yPos, 16, true);
      yPos += 10;
      const premissaText = 'O laudo foi elaborado com base na legislação específica sobre acessibilidade, em vigor nas esferas federais, estaduais e municipais.\n\nNeste documento estão contempladas as problemáticas verificadas em relação à acessibilidade, ou seja, itens que estão em acordo com legislação vigente não são mencionados neste documento.';
      const premissaLines = doc.splitTextToSize(premissaText, 170);
      doc.text(premissaLines, 20, yPos);
      yPos += premissaLines.length * 7 + 10;
    }

    if (isSecaoHabilitada('metodo')) {
      checkNewPage();
      addText('Método', 20, yPos, 16, true);
      yPos += 10;
      const metodoText = 'O laudo traz a explicação de cada item relacionado à acessibilidade, das necessidades e exigências solicitadas por legislação e normas técnicas, para posteriormente relatar itens em desacordo localizados em diferentes pavimentos.\n\nAs adaptações seguem as seguintes premissas:\nSIM - Adaptações Simples\nINS - Adaptações de Instalação\nCIV - Adaptações Civis';
      const metodoLines = doc.splitTextToSize(metodoText, 170);
      doc.text(metodoLines, 20, yPos);
      yPos += metodoLines.length * 7 + 10;
    }

    if (isSecaoHabilitada('referencias')) {
      checkNewPage();
      addText('Referências normativas e legislativas', 20, yPos, 16, true);
      yPos += 10;
      const referencias = [
        'Decreto Federal nº 5.296/2004.',
        'ABNT NBR 9050/2015 – Acessibilidade a edificações',
        'ABNT NBR 16537/2017 - Sinalização tátil no piso',
        'ABNT NM 313/2007 – Elevadores de passageiros'
      ];
      referencias.forEach(ref => {
        addText(`• ${ref}`, 20, yPos, 10);
        yPos += 7;
      });
    }

    if (isSecaoHabilitada('documentos')) {
      checkNewPage();
      addText('Documentos base', 20, yPos, 16, true);
      yPos += 10;
      addText('Plantas fornecidas.', 20, yPos, 10);
      yPos += 7;
      addText('Documentos fornecidos.', 20, yPos, 10);
      yPos += 15;
    }

    if (isSecaoHabilitada('profissional')) {
      checkNewPage();
      addText('Profissional Responsável', 20, yPos, 14, true);
      yPos += 10;
      addText(laudoData.responsavel_nome || user.full_name, 20, yPos, 12);
      yPos += 7;
      addText(`${laudoData.responsavel_formacao || user.formacao || ''} - ${laudoData.responsavel_registro || user.registro_tipo || ''} ${laudoData.responsavel_numero_registro || user.registro_numero || ''}`, 20, yPos, 10);
      yPos += 7;
      if (laudoData.responsavel_art_rrt) {
        addText(`RRT nº ${laudoData.responsavel_art_rrt}`, 20, yPos, 10);
        yPos += 7;
      }
    }

    if (isSecaoHabilitada('conclusao')) {
      checkNewPage();
      addText('CONCLUSÃO', 20, yPos, 16, true);
      yPos += 10;
      const conclusaoText = conclusaoPersonalizada || laudoData.conclusao || '';
      if (conclusaoText) {
        const conclusaoLines = doc.splitTextToSize(conclusaoText, 170);
        doc.text(conclusaoLines, 20, yPos);
        yPos += conclusaoLines.length * 7 + 10;
      }
    }

    if (isSecaoHabilitada('recomendacoes') && laudoData.recomendacoes) {
      checkNewPage(50);
      addText('RECOMENDAÇÕES E ADEQUAÇÕES NECESSÁRIAS', 20, yPos, 16, true);
      yPos += 10;
      const recomendacoesLines = doc.splitTextToSize(laudoData.recomendacoes, 170);
      doc.text(recomendacoesLines, 20, yPos);
    }

    // Adicionar rodapé na última página
    const totalPages = doc.internal.pages.length - 1;
    addFooter(totalPages);

    const pdfBytes = doc.output('arraybuffer');

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=Laudo_${laudoData.nome_imovel?.replace(/\s+/g, '_') || 'Acessibilidade'}.pdf`
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});