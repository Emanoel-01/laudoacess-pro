import ChecklistItem from "./ChecklistItem";

export default function PasseioPublico({ data, onChange }) {
  const handleItemChange = (field, subfield, value) => {
    onChange({ 
      ...data, 
      [field]: {
        ...data[field],
        [subfield]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Passeio Público</h2>
        <p className="text-slate-600">Avaliação conforme ABNT NBR 9050:2015</p>
      </div>

      <ChecklistItem
        label="O piso da calçada é estável, regular e antiderrapante em todas as circunstâncias?"
        categoria="passeio_publico"
        value={data.piso_estavel?.status}
        onChange={(value) => handleItemChange("piso_estavel", "status", value)}
        observationValue={data.piso_estavel?.observacao}
        onObservationChange={(value) => handleItemChange("piso_estavel", "observacao", value)}
        justificativaValue={data.piso_estavel?.justificativa}
        onJustificativaChange={(value) => handleItemChange("piso_estavel", "justificativa", value)}
        tipoAdaptacaoValue={data.piso_estavel?.tipo_adaptacao}
        onTipoAdaptacaoChange={(value) => handleItemChange("piso_estavel", "tipo_adaptacao", value)}
        necessitaProjetoValue={data.piso_estavel?.necessita_projeto}
        onNecessitaProjetoChange={(value) => handleItemChange("piso_estavel", "necessita_projeto", value)}
      />

      <ChecklistItem
        label="A faixa de circulação (Faixa Livre) possui no mínimo 1,20m de largura?"
        categoria="passeio_publico"
        value={data.faixa_livre?.status}
        onChange={(value) => handleItemChange("faixa_livre", "status", value)}
        observationValue={data.faixa_livre?.observacao}
        onObservationChange={(value) => handleItemChange("faixa_livre", "observacao", value)}
        justificativaValue={data.faixa_livre?.justificativa}
        onJustificativaChange={(value) => handleItemChange("faixa_livre", "justificativa", value)}
        tipoAdaptacaoValue={data.faixa_livre?.tipo_adaptacao}
        onTipoAdaptacaoChange={(value) => handleItemChange("faixa_livre", "tipo_adaptacao", value)}
        necessitaProjetoValue={data.faixa_livre?.necessita_projeto}
        onNecessitaProjetoChange={(value) => handleItemChange("faixa_livre", "necessita_projeto", value)}
      />

      <ChecklistItem
        label="A inclinação longitudinal é de no máximo 8,33% e a transversal no máximo 2%?"
        categoria="passeio_publico"
        value={data.inclinacao?.status}
        onChange={(value) => handleItemChange("inclinacao", "status", value)}
        observationValue={data.inclinacao?.observacao}
        onObservationChange={(value) => handleItemChange("inclinacao", "observacao", value)}
        justificativaValue={data.inclinacao?.justificativa}
        onJustificativaChange={(value) => handleItemChange("inclinacao", "justificativa", value)}
        tipoAdaptacaoValue={data.inclinacao?.tipo_adaptacao}
        onTipoAdaptacaoChange={(value) => handleItemChange("inclinacao", "tipo_adaptacao", value)}
        necessitaProjetoValue={data.inclinacao?.necessita_projeto}
        onNecessitaProjetoChange={(value) => handleItemChange("inclinacao", "necessita_projeto", value)}
      />

      <ChecklistItem
        label="O rebaixamento de calçada possui largura de 1,20m e piso tátil de alerta?"
        categoria="passeio_publico"
        value={data.rebaixamento?.status}
        onChange={(value) => handleItemChange("rebaixamento", "status", value)}
        observationValue={data.rebaixamento?.observacao}
        onObservationChange={(value) => handleItemChange("rebaixamento", "observacao", value)}
        justificativaValue={data.rebaixamento?.justificativa}
        onJustificativaChange={(value) => handleItemChange("rebaixamento", "justificativa", value)}
        tipoAdaptacaoValue={data.rebaixamento?.tipo_adaptacao}
        onTipoAdaptacaoChange={(value) => handleItemChange("rebaixamento", "tipo_adaptacao", value)}
        necessitaProjetoValue={data.rebaixamento?.necessita_projeto}
        onNecessitaProjetoChange={(value) => handleItemChange("rebaixamento", "necessita_projeto", value)}
      />
    </div>
  );
}