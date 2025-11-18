import ChecklistItem from "./ChecklistItem";

export default function Lavatorios({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Lavatórios e Cozinha</h2>
        <p className="text-slate-600">Avaliação de lavatórios e bancadas acessíveis</p>
      </div>

      <ChecklistItem
        label="Lavatórios/pias possuem altura máxima de 0,85m?"
        categoria="lavatorios"
        value={data.altura_maxima}
        onChange={(value) => handleChange("altura_maxima", value)}
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
        label="Há altura livre inferior de 0,73m e largura de no mínimo 0,85m?"
        categoria="lavatorios"
        value={data.altura_livre}
        onChange={(value) => handleChange("altura_livre", value)}
        observationValue={data.livre_obs}
        onObservationChange={(value) => handleChange("livre_obs", value)}
        justificativaValue={data.livre_justificativa}
        onJustificativaChange={(value) => handleChange("livre_justificativa", value)}
        tipoAdaptacaoValue={data.livre_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("livre_tipo", value)}
        necessitaProjetoValue={data.livre_projeto}
        onNecessitaProjetoChange={(value) => handleChange("livre_projeto", value)}
        anexosValue={data.livre_anexos}
        onAnexosChange={(value) => handleChange("livre_anexos", value)}
      />

      <ChecklistItem
        label="O acionamento de misturadores/torneiras está a no máximo 0,50m do início da bancada?"
        categoria="lavatorios"
        value={data.acionamento}
        onChange={(value) => handleChange("acionamento", value)}
        observationValue={data.acionamento_obs}
        onObservationChange={(value) => handleChange("acionamento_obs", value)}
        justificativaValue={data.acionamento_justificativa}
        onJustificativaChange={(value) => handleChange("acionamento_justificativa", value)}
        tipoAdaptacaoValue={data.acionamento_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("acionamento_tipo", value)}
        necessitaProjetoValue={data.acionamento_projeto}
        onNecessitaProjetoChange={(value) => handleChange("acionamento_projeto", value)}
        anexosValue={data.acionamento_anexos}
        onAnexosChange={(value) => handleChange("acionamento_anexos", value)}
      />

      <ChecklistItem
        label="Há área de no mínimo 0,30m abaixo da bancada para aproximação de P.C.R.?"
        categoria="lavatorios"
        value={data.area_aproximacao}
        onChange={(value) => handleChange("area_aproximacao", value)}
        observationValue={data.area_obs}
        onObservationChange={(value) => handleChange("area_obs", value)}
        justificativaValue={data.area_justificativa}
        onJustificativaChange={(value) => handleChange("area_justificativa", value)}
        tipoAdaptacaoValue={data.area_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("area_tipo", value)}
        necessitaProjetoValue={data.area_projeto}
        onNecessitaProjetoChange={(value) => handleChange("area_projeto", value)}
        anexosValue={data.area_anexos}
        onAnexosChange={(value) => handleChange("area_anexos", value)}
      />
    </div>
  );
}