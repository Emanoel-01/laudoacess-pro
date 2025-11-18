import { useEffect } from "react";
import ChecklistItem from "./ChecklistItem";

export default function Vestiarios({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  useEffect(() => {
    if (data.existe === "nao" || data.existe === "nao_se_aplica") {
      onChange({
        ...data,
        entrada_independente: "nao_se_aplica",
        boxe_chuveiro: "nao_se_aplica",
        banco_articulado: "nao_se_aplica",
        barras_apoio: "nao_se_aplica"
      });
    }
  }, [data.existe]);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Vestiários</h2>
        <p className="text-slate-600">Avaliação de vestiários acessíveis</p>
      </div>

      <ChecklistItem
        label="Existe vestiário no imóvel?"
        value={data.existe}
        onChange={(value) => handleChange("existe", value)}
        showObservation={false}
      />

      {data.existe === "sim" && (
        <>
          <ChecklistItem
            label="O vestiário acessível possui entrada independente (uso com acompanhante de sexo oposto)?"
            value={data.entrada_independente}
            onChange={(value) => handleChange("entrada_independente", value)}
            observationValue={data.entrada_obs}
            onObservationChange={(value) => handleChange("entrada_obs", value)}
            justificativaValue={data.entrada_justificativa}
            onJustificativaChange={(value) => handleChange("entrada_justificativa", value)}
            tipoAdaptacaoValue={data.entrada_tipo}
            onTipoAdaptacaoChange={(value) => handleChange("entrada_tipo", value)}
            necessitaProjetoValue={data.entrada_projeto}
            onNecessitaProjetoChange={(value) => handleChange("entrada_projeto", value)}
          />

          <ChecklistItem
            label="O boxe de chuveiro possui dimensão mínima de 0,90m x 0,95m?"
            value={data.boxe_chuveiro}
            onChange={(value) => handleChange("boxe_chuveiro", value)}
            observationValue={data.boxe_obs}
            onObservationChange={(value) => handleChange("boxe_obs", value)}
            justificativaValue={data.boxe_justificativa}
            onJustificativaChange={(value) => handleChange("boxe_justificativa", value)}
            tipoAdaptacaoValue={data.boxe_tipo}
            onTipoAdaptacaoChange={(value) => handleChange("boxe_tipo", value)}
            necessitaProjetoValue={data.boxe_projeto}
            onNecessitaProjetoChange={(value) => handleChange("boxe_projeto", value)}
          />

          <ChecklistItem
            label="Há banco articulado/removível (0,45m x 0,70m a 0,46m de altura, suporta 150kg)?"
            value={data.banco_articulado}
            onChange={(value) => handleChange("banco_articulado", value)}
            observationValue={data.banco_obs}
            onObservationChange={(value) => handleChange("banco_obs", value)}
            justificativaValue={data.banco_justificativa}
            onJustificativaChange={(value) => handleChange("banco_justificativa", value)}
            tipoAdaptacaoValue={data.banco_tipo}
            onTipoAdaptacaoChange={(value) => handleChange("banco_tipo", value)}
            necessitaProjetoValue={data.banco_projeto}
            onNecessitaProjetoChange={(value) => handleChange("banco_projeto", value)}
          />

          <ChecklistItem
            label="As barras de apoio (diâmetro 3,0-4,5cm) garantem a transferência para o banco?"
            value={data.barras_apoio}
            onChange={(value) => handleChange("barras_apoio", value)}
            observationValue={data.barras_obs}
            onObservationChange={(value) => handleChange("barras_obs", value)}
            justificativaValue={data.barras_justificativa}
            onJustificativaChange={(value) => handleChange("barras_justificativa", value)}
            tipoAdaptacaoValue={data.barras_tipo}
            onTipoAdaptacaoChange={(value) => handleChange("barras_tipo", value)}
            necessitaProjetoValue={data.barras_projeto}
            onNecessitaProjetoChange={(value) => handleChange("barras_projeto", value)}
          />
        </>
      )}
    </div>
  );
}