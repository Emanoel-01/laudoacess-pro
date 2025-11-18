import ChecklistItem from "./ChecklistItem";

export default function Portas({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Portas</h2>
        <p className="text-slate-600">Avaliação de portas e acessos</p>
      </div>

      <ChecklistItem
        label="O vão livre da porta, quando aberta, é de no mínimo 0,80m de largura e 2,10m de altura?"
        value={data.vao_livre}
        onChange={(value) => handleChange("vao_livre", value)}
        observationValue={data.vao_livre_obs}
        onObservationChange={(value) => handleChange("vao_livre_obs", value)}
      />

      <ChecklistItem
        label="Há espaço lateral à porta para aproximação à maçaneta (0,60m no lado da abertura e 0,30m no oposto)?"
        value={data.espaco_aproximacao}
        onChange={(value) => handleChange("espaco_aproximacao", value)}
        observationValue={data.espaco_obs}
        onObservationChange={(value) => handleChange("espaco_obs", value)}
      />

      <ChecklistItem
        label="As portas possuem sinalização visual e tátil em relevo e Braille (entre 1,20m e 1,60m de altura)?"
        value={data.sinalizacao}
        onChange={(value) => handleChange("sinalizacao", value)}
        observationValue={data.sinalizacao_obs}
        onObservationChange={(value) => handleChange("sinalizacao_obs", value)}
      />
    </div>
  );
}