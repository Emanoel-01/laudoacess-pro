import ChecklistItem from "./ChecklistItem";

export default function SuperficiesRefeicao({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Superfícies de Refeição</h2>
        <p className="text-slate-600">Mesas em restaurantes, refeitórios, cafés e similares</p>
      </div>

      <ChecklistItem
        label="Há superfícies de refeição com altura livre inferior de 0,73m e profundidade de 0,50m?"
        categoria="superficies_refeicao"
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
        categoria="superficies_refeicao"
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
        label="Há 5% das mesas adaptadas e sinalizadas com S.I.A.?"
        categoria="superficies_refeicao"
        value={data.quantidade_mesas}
        onChange={(value) => handleChange("quantidade_mesas", value)}
        observationValue={data.quantidade_obs}
        onObservationChange={(value) => handleChange("quantidade_obs", value)}
        justificativaValue={data.quantidade_justificativa}
        onJustificativaChange={(value) => handleChange("quantidade_justificativa", value)}
        tipoAdaptacaoValue={data.quantidade_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("quantidade_tipo", value)}
        necessitaProjetoValue={data.quantidade_projeto}
        onNecessitaProjetoChange={(value) => handleChange("quantidade_projeto", value)}
        anexosValue={data.quantidade_anexos}
        onAnexosChange={(value) => handleChange("quantidade_anexos", value)}
      />
    </div>
  );
}