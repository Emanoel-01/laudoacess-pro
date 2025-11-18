import ChecklistItem from "./ChecklistItem";

export default function CamasMacas({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Camas e Macas</h2>
        <p className="text-slate-600">Em hotéis, ambulatórios e enfermarias</p>
      </div>

      <ChecklistItem
        label="Camas e macas possuem altura máxima de 0,46m para facilitar transferência de P.C.R.?"
        categoria="camas_macas"
        value={data.altura_adequada}
        onChange={(value) => handleChange("altura_adequada", value)}
        observationValue={data.altura_obs}
        onObservationChange={(value) => handleChange("altura_obs", value)}
        justificativaValue={data.altura_justificativa}
        onJustificativaChange={(value) => handleChange("altura_justificativa", value)}
        tipoAdaptacaoValue={data.altura_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("altura_tipo", value)}
        necessitaProjetoValue={data.altura_projeto}
        onNecessitaProjetoChange={(value) => handleChange("altura_projeto", value)}
        anexosValue={data.altura_anexos}
        onAnexosChange={(value) => handleChange("altura_anexos", value)}
      />

      <ChecklistItem
        label="Há espaço lateral adequado para transferência de cadeira de rodas?"
        categoria="camas_macas"
        value={data.espaco_transferencia}
        onChange={(value) => handleChange("espaco_transferencia", value)}
        observationValue={data.espaco_obs}
        onObservationChange={(value) => handleChange("espaco_obs", value)}
        justificativaValue={data.espaco_justificativa}
        onJustificativaChange={(value) => handleChange("espaco_justificativa", value)}
        tipoAdaptacaoValue={data.espaco_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("espaco_tipo", value)}
        necessitaProjetoValue={data.espaco_projeto}
        onNecessitaProjetoChange={(value) => handleChange("espaco_projeto", value)}
        anexosValue={data.espaco_anexos}
        onAnexosChange={(value) => handleChange("espaco_anexos", value)}
      />
    </div>
  );
}