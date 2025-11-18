import ChecklistItem from "./ChecklistItem";

export default function CirculacaoHorizontal({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Circulação Horizontal</h2>
        <p className="text-slate-600">Corredores e áreas de circulação interna</p>
      </div>

      <ChecklistItem
        label="O piso das áreas de circulação é regular, antiderrapante e estável?"
        value={data.piso_adequado}
        onChange={(value) => handleChange("piso_adequado", value)}
        observationValue={data.piso_obs}
        onObservationChange={(value) => handleChange("piso_obs", value)}
      />

      <ChecklistItem
        label="As larguras dos corredores atendem às normas? (0,90m até 4m; 1,20m até 10m; 1,50m acima de 10m)"
        value={data.largura_corredores}
        onChange={(value) => handleChange("largura_corredores", value)}
        observationValue={data.largura_obs}
        onObservationChange={(value) => handleChange("largura_obs", value)}
      />

      <ChecklistItem
        label="As rotas acessíveis possuem pisos táteis direcionais e de alerta com cor contrastante?"
        value={data.piso_tatil}
        onChange={(value) => handleChange("piso_tatil", value)}
        observationValue={data.piso_tatil_obs}
        onObservationChange={(value) => handleChange("piso_tatil_obs", value)}
      />
    </div>
  );
}