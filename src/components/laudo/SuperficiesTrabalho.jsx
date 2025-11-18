import ChecklistItem from "./ChecklistItem";

export default function SuperficiesTrabalho({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Superfícies de Trabalho</h2>
        <p className="text-slate-600">Mesas, bancadas e estações de trabalho</p>
      </div>

      <ChecklistItem
        label="Há superfícies de trabalho com altura livre inferior de 0,73m e profundidade de 0,50m?"
        categoria="superficies_trabalho"
        value={data.altura_livre}
        onChange={(value) => handleChange("altura_livre", value)}
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
        label="A altura do tampo está entre 0,75m e 0,85m?"
        categoria="superficies_trabalho"
        value={data.altura_tampo}
        onChange={(value) => handleChange("altura_tampo", value)}
        observationValue={data.tampo_obs}
        onObservationChange={(value) => handleChange("tampo_obs", value)}
        justificativaValue={data.tampo_justificativa}
        onJustificativaChange={(value) => handleChange("tampo_justificativa", value)}
        tipoAdaptacaoValue={data.tampo_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("tampo_tipo", value)}
        necessitaProjetoValue={data.tampo_projeto}
        onNecessitaProjetoChange={(value) => handleChange("tampo_projeto", value)}
        anexosValue={data.tampo_anexos}
        onAnexosChange={(value) => handleChange("tampo_anexos", value)}
      />

      <ChecklistItem
        label="A largura permite aproximação frontal de M.R. (0,80m x 1,20m)?"
        categoria="superficies_trabalho"
        value={data.largura_mr}
        onChange={(value) => handleChange("largura_mr", value)}
        observationValue={data.mr_obs}
        onObservationChange={(value) => handleChange("mr_obs", value)}
        justificativaValue={data.mr_justificativa}
        onJustificativaChange={(value) => handleChange("mr_justificativa", value)}
        tipoAdaptacaoValue={data.mr_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("mr_tipo", value)}
        necessitaProjetoValue={data.mr_projeto}
        onNecessitaProjetoChange={(value) => handleChange("mr_projeto", value)}
        anexosValue={data.mr_anexos}
        onAnexosChange={(value) => handleChange("mr_anexos", value)}
      />
    </div>
  );
}