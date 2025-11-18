import ChecklistItem from "./ChecklistItem";

export default function Balcoes({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Balcão de Atendimento</h2>
        <p className="text-slate-600">Avaliação de balcões acessíveis</p>
      </div>

      <ChecklistItem
        label="O balcão está localizado em rota acessível e identificável?"
        categoria="balcoes"
        value={data.localizacao}
        onChange={(value) => handleChange("localizacao", value)}
        observationValue={data.localizacao_obs}
        onObservationChange={(value) => handleChange("localizacao_obs", value)}
        justificativaValue={data.localizacao_justificativa}
        onJustificativaChange={(value) => handleChange("localizacao_justificativa", value)}
        tipoAdaptacaoValue={data.localizacao_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("localizacao_tipo", value)}
        necessitaProjetoValue={data.localizacao_projeto}
        onNecessitaProjetoChange={(value) => handleChange("localizacao_projeto", value)}
        anexosValue={data.localizacao_anexos}
        onAnexosChange={(value) => handleChange("localizacao_anexos", value)}
      />

      <ChecklistItem
        label="A altura superior do tampo está entre 0,75m e 0,85m?"
        categoria="balcoes"
        value={data.altura_superior}
        onChange={(value) => handleChange("altura_superior", value)}
        observationValue={data.altura_sup_obs}
        onObservationChange={(value) => handleChange("altura_sup_obs", value)}
        justificativaValue={data.altura_sup_justificativa}
        onJustificativaChange={(value) => handleChange("altura_sup_justificativa", value)}
        tipoAdaptacaoValue={data.altura_sup_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("altura_sup_tipo", value)}
        necessitaProjetoValue={data.altura_sup_projeto}
        onNecessitaProjetoChange={(value) => handleChange("altura_sup_projeto", value)}
        anexosValue={data.altura_sup_anexos}
        onAnexosChange={(value) => handleChange("altura_sup_anexos", value)}
      />

      <ChecklistItem
        label="A altura livre inferior é de no mínimo 0,73m com profundidade de 0,30m?"
        categoria="balcoes"
        value={data.altura_inferior}
        onChange={(value) => handleChange("altura_inferior", value)}
        observationValue={data.altura_inf_obs}
        onObservationChange={(value) => handleChange("altura_inf_obs", value)}
        justificativaValue={data.altura_inf_justificativa}
        onJustificativaChange={(value) => handleChange("altura_inf_justificativa", value)}
        tipoAdaptacaoValue={data.altura_inf_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("altura_inf_tipo", value)}
        necessitaProjetoValue={data.altura_inf_projeto}
        onNecessitaProjetoChange={(value) => handleChange("altura_inf_projeto", value)}
        anexosValue={data.altura_inf_anexos}
        onAnexosChange={(value) => handleChange("altura_inf_anexos", value)}
      />

      <ChecklistItem
        label="A largura mínima do balcão é de 0,90m?"
        categoria="balcoes"
        value={data.largura_minima}
        onChange={(value) => handleChange("largura_minima", value)}
        observationValue={data.largura_obs}
        onObservationChange={(value) => handleChange("largura_obs", value)}
        justificativaValue={data.largura_justificativa}
        onJustificativaChange={(value) => handleChange("largura_justificativa", value)}
        tipoAdaptacaoValue={data.largura_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("largura_tipo", value)}
        necessitaProjetoValue={data.largura_projeto}
        onNecessitaProjetoChange={(value) => handleChange("largura_projeto", value)}
        anexosValue={data.largura_anexos}
        onAnexosChange={(value) => handleChange("largura_anexos", value)}
      />

      <ChecklistItem
        label="Há espaço para M.R. (0,80m x 1,20m) em frente ao balcão?"
        categoria="balcoes"
        value={data.espaco_mr}
        onChange={(value) => handleChange("espaco_mr", value)}
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

      <ChecklistItem
        label="O balcão está sinalizado com S.I.A. (Símbolo Internacional de Acesso)?"
        categoria="balcoes"
        value={data.sinalizacao}
        onChange={(value) => handleChange("sinalizacao", value)}
        observationValue={data.sinalizacao_obs}
        onObservationChange={(value) => handleChange("sinalizacao_obs", value)}
        justificativaValue={data.sinalizacao_justificativa}
        onJustificativaChange={(value) => handleChange("sinalizacao_justificativa", value)}
        tipoAdaptacaoValue={data.sinalizacao_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("sinalizacao_tipo", value)}
        necessitaProjetoValue={data.sinalizacao_projeto}
        onNecessitaProjetoChange={(value) => handleChange("sinalizacao_projeto", value)}
        anexosValue={data.sinalizacao_anexos}
        onAnexosChange={(value) => handleChange("sinalizacao_anexos", value)}
      />
    </div>
  );
}