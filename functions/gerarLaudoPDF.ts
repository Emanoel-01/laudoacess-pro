import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';
import { jsPDF } from 'npm:jspdf@2.5.2';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { laudoData } = await req.json();
    const doc = new jsPDF();
    let yPos = 20;

    // Função auxiliar para adicionar texto
    const addText = (text, x, y, fontSize = 12, isBold = false) => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, isBold ? 'bold' : 'normal');
      doc.text(text, x, y);
    };

    // Função para verificar se precisa de nova página
    const checkNewPage = (neededSpace = 30) => {
      if (yPos > 270 - neededSpace) {
        doc.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    // CAPA
    addText('LAUDO TÉCNICO DE ACESSIBILIDADE', 105, 100, 20, true);
    addText(laudoData.nome_imovel || 'MODELO', 105, 115, 16);
    addText(`${laudoData.data_vistoria || 'DATA'} | ${laudoData.numero_revisao || 'R00'}`, 105, 130, 12);
    
    // Símbolo Internacional de Acesso (representação textual)
    doc.setFillColor(41, 128, 185);
    doc.rect(85, 140, 40, 40, 'F');
    doc.setTextColor(255, 255, 255);
    addText('♿', 105, 165, 30);
    doc.setTextColor(0, 0, 0);

    // OBJETIVO (Página 2)
    doc.addPage();
    yPos = 20;
    addText('Objetivo', 20, yPos, 16, true);
    yPos += 10;
    const objetivoText = laudoData.objetivo || `Este laudo técnico de acessibilidade tem como objetivo analisar as condições físicas das instalações do edifício localizado em ${laudoData.endereco}.`;
    const objetivoLines = doc.splitTextToSize(objetivoText, 170);
    doc.text(objetivoLines, 20, yPos);
    yPos += objetivoLines.length * 7 + 10;

    // PREMISSA
    addText('Premissa', 20, yPos, 16, true);
    yPos += 10;
    const premissaText = 'O laudo foi elaborado com base na legislação específica sobre acessibilidade, em vigor nas esferas federais, estaduais e municipais.\n\nNeste documento estão contempladas as problemáticas verificadas em relação à acessibilidade, ou seja, itens que estão em acordo com legislação vigente não são mencionados neste documento.';
    const premissaLines = doc.splitTextToSize(premissaText, 170);
    doc.text(premissaLines, 20, yPos);
    yPos += premissaLines.length * 7 + 10;

    // MÉTODO
    checkNewPage();
    addText('Método', 20, yPos, 16, true);
    yPos += 10;
    const metodoText = 'O laudo traz a explicação de cada item relacionado à acessibilidade, das necessidades e exigências solicitadas por legislação e normas técnicas, para posteriormente relatar itens em desacordo localizados em diferentes pavimentos.\n\nAs adaptações seguem as seguintes premissas:\nSIM - Adaptações Simples\nINS - Adaptações de Instalação\nCIV - Adaptações Civis';
    const metodoLines = doc.splitTextToSize(metodoText, 170);
    doc.text(metodoLines, 20, yPos);
    yPos += metodoLines.length * 7 + 10;

    // REFERÊNCIAS NORMATIVAS
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

    // DOCUMENTOS BASE
    doc.addPage();
    yPos = 20;
    addText('Documentos base', 20, yPos, 16, true);
    yPos += 10;
    addText('Plantas fornecidas.', 20, yPos, 10);
    yPos += 7;
    addText('Documentos fornecidos.', 20, yPos, 10);
    yPos += 15;

    // PROFISSIONAL RESPONSÁVEL
    addText('Profissional Responsável', 20, yPos, 14, true);
    yPos += 10;
    addText(laudoData.responsavel_nome || user.full_name, 20, yPos, 12);
    yPos += 7;
    addText(`${laudoData.responsavel_formacao || ''} - ${laudoData.responsavel_registro || ''} ${laudoData.responsavel_numero_registro || ''}`, 20, yPos, 10);
    yPos += 7;
    if (laudoData.responsavel_art_rrt) {
      addText(`RRT nº ${laudoData.responsavel_art_rrt}`, 20, yPos, 10);
      yPos += 7;
    }

    // CONCLUSÃO
    if (laudoData.conclusao) {
      doc.addPage();
      yPos = 20;
      addText('CONCLUSÃO', 20, yPos, 16, true);
      yPos += 10;
      const conclusaoLines = doc.splitTextToSize(laudoData.conclusao, 170);
      doc.text(conclusaoLines, 20, yPos);
      yPos += conclusaoLines.length * 7 + 10;
    }

    // RECOMENDAÇÕES
    if (laudoData.recomendacoes) {
      checkNewPage(50);
      addText('RECOMENDAÇÕES E ADEQUAÇÕES NECESSÁRIAS', 20, yPos, 16, true);
      yPos += 10;
      const recomendacoesLines = doc.splitTextToSize(laudoData.recomendacoes, 170);
      doc.text(recomendacoesLines, 20, yPos);
    }

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