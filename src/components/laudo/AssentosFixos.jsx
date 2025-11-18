import ChecklistItem from "./ChecklistItem";

export default function AssentosFixos({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Assentos Fixos</h2>
        <p className="text-slate-600">Áreas de espera com assentos fixos</p>
      </div>

      <ChecklistItem
        label="Há 5% dos assentos reservados e adequados para P.O. (pessoa obesa)?"
        categoria="assentos_fixos"
        value={data.assentos_po}
        onChange={(value) => handleChange("assentos_po", value)}
        observationValue={data.po_obs}
        onObservationChange={(value) => handleChange("po_obs", value)}
        justificativaValue={data.po_justificativa}
        onJustificativaChange={(value) => handleChange("po_justificativa", value)}
        tipoAdaptacaoValue={data.po_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("po_tipo", value)}
        necessitaProjetoValue={data.po_projeto}
        onNecessitaProjetoChange={(value) => handleChange("po_projeto", value)}
        anexosValue={data.po_anexos}
        onAnexosChange={(value) => handleChange("po_anexos", value)}
      />

      <ChecklistItem
        label="Há espaço para M.R. (Módulo de Referência 0,80m x 1,20m) em áreas de espera?"
        categoria="assentos_fixos"
        value={data.espaco_mr}
        onChange={(value) => handleChange("espaco_mr", value)}
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

      <ChecklistItem
        label="Os assentos para P.O. possuem largura mínima de 0,75m e suportam 250kg?"
        categoria="assentos_fixos"
        value={data.dimensoes_po}
        onChange={(value) => handleChange("dimensoes_po", value)}
        observationValue={data.dimensoes_obs}
        onObservationChange={(value) => handleChange("dimensoes_obs", value)}
        justificativaValue={data.dimensoes_justificativa}
        onJustificativaChange={(value) => handleChange("dimensoes_justificativa", value)}
        tipoAdaptacaoValue={data.dimensoes_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("dimensoes_tipo", value)}
        necessitaProjetoValue={data.dimensoes_projeto}
        onNecessitaProjetoChange={(value) => handleChange("dimensoes_projeto", value)}
        anexosValue={data.dimensoes_anexos}
        onAnexosChange={(value) => handleChange("dimensoes_anexos", value)}
      />
    </div>
  );
}