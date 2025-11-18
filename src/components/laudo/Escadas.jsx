import { useEffect } from "react";
import ChecklistItem from "./ChecklistItem";

export default function Escadas({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  useEffect(() => {
    if (data.existe === "nao" || data.existe === "nao_se_aplica") {
      onChange({
        ...data,
        corrimao: "nao_se_aplica",
        sinalizacao: "nao_se_aplica",
        dimensoes: "nao_se_aplica"
      });
    }
  }, [data.existe]);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Escadas</h2>
        <p className="text-slate-600">Avaliação de escadas</p>
      </div>

      <ChecklistItem
        label="Existe escada no imóvel?"
        value={data.existe}
        onChange={(value) => handleChange("existe", value)}
        showObservation={false}
      />

      {data.existe === "sim" && (
        <>
          <ChecklistItem
            label="A escada possui corrimãos em duas alturas (0,92m e 0,70m) em ambas as laterais?"
            value={data.corrimao}
            onChange={(value) => handleChange("corrimao", value)}
            observationValue={data.corrimao_obs}
            onObservationChange={(value) => handleChange("corrimao_obs", value)}
          />

          <ChecklistItem
            label="Há sinalização tátil de alerta no início e fim e sinalização visual nas bordas dos degraus?"
            value={data.sinalizacao}
            onChange={(value) => handleChange("sinalizacao", value)}
            observationValue={data.sinalizacao_obs}
            onObservationChange={(value) => handleChange("sinalizacao_obs", value)}
          />

          <ChecklistItem
            label="As dimensões de espelho e piso são constantes e obedecem à fórmula 0,63m ≤ 2e+p ≤ 0,65m?"
            value={data.dimensoes}
            onChange={(value) => handleChange("dimensoes", value)}
            observationValue={data.dimensoes_obs}
            onObservationChange={(value) => handleChange("dimensoes_obs", value)}
          />
        </>
      )}
    </div>
  );
}