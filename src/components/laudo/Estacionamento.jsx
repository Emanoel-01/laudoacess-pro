import { useEffect } from "react";
import ChecklistItem from "./ChecklistItem";

export default function Estacionamento({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  useEffect(() => {
    if (data.existe === "nao" || data.existe === "nao_se_aplica") {
      onChange({
        ...data,
        vagas_pcd: "nao_se_aplica",
        dimensoes_vagas: "nao_se_aplica",
        sinalizacao: "nao_se_aplica"
      });
    }
  }, [data.existe]);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Estacionamento</h2>
        <p className="text-slate-600">Verificação de vagas para PCD e Idosos</p>
      </div>

      <ChecklistItem
        label="Existe estacionamento no imóvel?"
        value={data.existe}
        onChange={(value) => handleChange("existe", value)}
        showObservation={false}
      />

      {data.existe === "sim" && (
        <>
          <ChecklistItem
            label="Há 2% de vagas para PCD e 5% para idosos (mínimo 10 vagas totais)?"
            value={data.vagas_pcd}
            onChange={(value) => handleChange("vagas_pcd", value)}
            observationValue={data.vagas_pcd_obs}
            onObservationChange={(value) => handleChange("vagas_pcd_obs", value)}
          />

          <ChecklistItem
            label="As vagas possuem dimensões mínimas adequadas e área de desembarque?"
            value={data.dimensoes_vagas}
            onChange={(value) => handleChange("dimensoes_vagas", value)}
            observationValue={data.dimensoes_vagas_obs}
            onObservationChange={(value) => handleChange("dimensoes_vagas_obs", value)}
          />

          <ChecklistItem
            label="As vagas possuem sinalização vertical e horizontal com S.I.A.?"
            value={data.sinalizacao}
            onChange={(value) => handleChange("sinalizacao", value)}
            observationValue={data.sinalizacao_obs}
            onObservationChange={(value) => handleChange("sinalizacao_obs", value)}
          />
        </>
      )}
    </div>
  );
}