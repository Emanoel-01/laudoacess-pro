import ChecklistItem from "./ChecklistItem";

export default function Mobiliario({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Mobiliário e Equipamentos</h2>
        <p className="text-slate-600">Avaliação de bebedouros, balcões e assentos</p>
      </div>

      <ChecklistItem
        label="Os bebedouros possuem no mínimo duas alturas de bica (0,90m e entre 1,00m e 1,10m)?"
        value={data.bebedouros}
        onChange={(value) => handleChange("bebedouros", value)}
        observationValue={data.bebedouros_obs}
        onObservationChange={(value) => handleChange("bebedouros_obs", value)}
      />

      <ChecklistItem
        label="O balcão acessível está entre 0,75m e 0,85m de altura, com altura livre inferior de 0,73m?"
        value={data.balcoes}
        onChange={(value) => handleChange("balcoes", value)}
        observationValue={data.balcoes_obs}
        onObservationChange={(value) => handleChange("balcoes_obs", value)}
      />

      <ChecklistItem
        label="Em áreas de espera com assentos fixos, há 5% dos assentos para P.O. e espaço para M.R.?"
        value={data.assentos}
        onChange={(value) => handleChange("assentos", value)}
        observationValue={data.assentos_obs}
        onObservationChange={(value) => handleChange("assentos_obs", value)}
      />
    </div>
  );
}