import { useEffect } from "react";
import ChecklistItem from "./ChecklistItem";

export default function Sanitarios({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  useEffect(() => {
    if (data.existe_acessivel === "nao" || data.existe_acessivel === "nao_se_aplica") {
      onChange({
        ...data,
        localizacao: "nao_se_aplica",
        area_manobra: "nao_se_aplica",
        barras_apoio: "nao_se_aplica",
        lavatorio: "nao_se_aplica"
      });
    }
  }, [data.existe_acessivel]);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Sanitários</h2>
        <p className="text-slate-600">Avaliação de sanitários acessíveis</p>
      </div>

      <ChecklistItem
        label="Existe sanitário acessível no imóvel?"
        value={data.existe_acessivel}
        onChange={(value) => handleChange("existe_acessivel", value)}
        showObservation={false}
      />

      {data.existe_acessivel === "sim" && (
        <>
          <ChecklistItem
            label="Os sanitários acessíveis estão em rotas acessíveis, próximos à circulação principal e sinalizados?"
            value={data.localizacao}
            onChange={(value) => handleChange("localizacao", value)}
            observationValue={data.localizacao_obs}
            onObservationChange={(value) => handleChange("localizacao_obs", value)}
          />

          <ChecklistItem
            label="O banheiro permite um giro de 360° e transferência para a bacia sanitária?"
            value={data.area_manobra}
            onChange={(value) => handleChange("area_manobra", value)}
            observationValue={data.area_obs}
            onObservationChange={(value) => handleChange("area_obs", value)}
          />

          <ChecklistItem
            label="A bacia está a altura máxima de 0,46m e possui barras de apoio adequadas?"
            value={data.barras_apoio}
            onChange={(value) => handleChange("barras_apoio", value)}
            observationValue={data.barras_obs}
            onObservationChange={(value) => handleChange("barras_obs", value)}
          />

          <ChecklistItem
            label="O lavatório possibilita aproximação frontal e está a altura máxima de 0,80m?"
            value={data.lavatorio}
            onChange={(value) => handleChange("lavatorio", value)}
            observationValue={data.lavatorio_obs}
            onObservationChange={(value) => handleChange("lavatorio_obs", value)}
          />
        </>
      )}
    </div>
  );
}