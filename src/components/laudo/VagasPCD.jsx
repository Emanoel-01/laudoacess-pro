import { useEffect } from "react";
import ChecklistItem from "./ChecklistItem";

export default function VagasPCD({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  useEffect(() => {
    if (data.existe === "nao" || data.existe === "nao_se_aplica") {
      onChange({
        ...data,
        quantidade: "nao_se_aplica",
        dimensoes: "nao_se_aplica",
        sinalizacao: "nao_se_aplica"
      });
    }
  }, [data.existe]);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Vagas de Veículos para P.C.D.</h2>
        <p className="text-slate-600">Vagas reservadas para pessoas com deficiência</p>
      </div>

      <ChecklistItem
        label="Existe estacionamento com mais de 10 vagas no imóvel?"
        categoria="vagas_pcd"
        value={data.existe}
        onChange={(value) => handleChange("existe", value)}
        showObservation={false}
      />

      {data.existe === "sim" && (
        <>
          <ChecklistItem
            label="Há 3% do total de vagas reservadas para P.C.D. (mínimo 1 vaga)?"
            categoria="vagas_pcd"
            value={data.quantidade}
            onChange={(value) => handleChange("quantidade", value)}
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

          <ChecklistItem
            label="As dimensões são de 5,50m x 2,50m com área de desembarque zebrada de 1,20m?"
            categoria="vagas_pcd"
            value={data.dimensoes}
            onChange={(value) => handleChange("dimensoes", value)}
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

          <ChecklistItem
            label="Há sinalização vertical com S.I.A. e sinalização horizontal no piso?"
            categoria="vagas_pcd"
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
        </>
      )}
    </div>
  );
}