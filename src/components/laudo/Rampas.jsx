import { useEffect } from "react";
import ChecklistItem from "./ChecklistItem";

export default function Rampas({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  useEffect(() => {
    if (data.existe === "nao" || data.existe === "nao_se_aplica") {
      onChange({
        ...data,
        inclinacao: "nao_se_aplica",
        largura: "nao_se_aplica",
        corrimao: "nao_se_aplica",
        sinalizacao_tatil: "nao_se_aplica"
      });
    }
  }, [data.existe]);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Rampas</h2>
        <p className="text-slate-600">Avaliação de rampas de acesso</p>
      </div>

      <ChecklistItem
        label="Existe rampa no imóvel?"
        value={data.existe}
        onChange={(value) => handleChange("existe", value)}
        showObservation={false}
      />

      {data.existe === "sim" && (
        <>
          <ChecklistItem
            label="A inclinação longitudinal máxima é de 8,33% e a transversal de no máximo 2%?"
            value={data.inclinacao}
            onChange={(value) => handleChange("inclinacao", value)}
            observationValue={data.inclinacao_obs}
            onObservationChange={(value) => handleChange("inclinacao_obs", value)}
          />

          <ChecklistItem
            label="A largura da rampa é de no mínimo 1,20m?"
            value={data.largura}
            onChange={(value) => handleChange("largura", value)}
            observationValue={data.largura_obs}
            onObservationChange={(value) => handleChange("largura_obs", value)}
          />

          <ChecklistItem
            label="Há corrimãos em duas alturas (0,92m e 0,70m) em ambas as laterais com prolongamento de 30cm?"
            value={data.corrimao}
            onChange={(value) => handleChange("corrimao", value)}
            observationValue={data.corrimao_obs}
            onObservationChange={(value) => handleChange("corrimao_obs", value)}
          />

          <ChecklistItem
            label="Há faixa de piso tátil de alerta no início e no fim da rampa?"
            value={data.sinalizacao_tatil}
            onChange={(value) => handleChange("sinalizacao_tatil", value)}
            observationValue={data.sinalizacao_obs}
            onObservationChange={(value) => handleChange("sinalizacao_obs", value)}
          />
        </>
      )}
    </div>
  );
}