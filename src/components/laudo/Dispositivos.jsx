import ChecklistItem from "./ChecklistItem";

export default function Dispositivos({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Dispositivos e Comandos</h2>
        <p className="text-slate-600">Dispensers, interruptores, tomadas, registros, etc.</p>
      </div>

      <ChecklistItem
        label="Dispositivos de comando (interruptores, tomadas) estão entre 0,40m e 1,20m de altura?"
        categoria="dispositivos"
        value={data.altura_comandos}
        onChange={(value) => handleChange("altura_comandos", value)}
        observationValue={data.comandos_obs}
        onObservationChange={(value) => handleChange("comandos_obs", value)}
        justificativaValue={data.comandos_justificativa}
        onJustificativaChange={(value) => handleChange("comandos_justificativa", value)}
        tipoAdaptacaoValue={data.comandos_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("comandos_tipo", value)}
        necessitaProjetoValue={data.comandos_projeto}
        onNecessitaProjetoChange={(value) => handleChange("comandos_projeto", value)}
        anexosValue={data.comandos_anexos}
        onAnexosChange={(value) => handleChange("comandos_anexos", value)}
      />

      <ChecklistItem
        label="Dispensers (álcool gel, papel, sabão) estão a altura adequada (até 1,20m)?"
        categoria="dispositivos"
        value={data.altura_dispensers}
        onChange={(value) => handleChange("altura_dispensers", value)}
        observationValue={data.dispensers_obs}
        onObservationChange={(value) => handleChange("dispensers_obs", value)}
        justificativaValue={data.dispensers_justificativa}
        onJustificativaChange={(value) => handleChange("dispensers_justificativa", value)}
        tipoAdaptacaoValue={data.dispensers_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("dispensers_tipo", value)}
        necessitaProjetoValue={data.dispensers_projeto}
        onNecessitaProjetoChange={(value) => handleChange("dispensers_projeto", value)}
        anexosValue={data.dispensers_anexos}
        onAnexosChange={(value) => handleChange("dispensers_anexos", value)}
      />

      <ChecklistItem
        label="Bebedouros possuem duas alturas de bica (0,90m e entre 1,00m-1,10m)?"
        categoria="dispositivos"
        value={data.bebedouros}
        onChange={(value) => handleChange("bebedouros", value)}
        observationValue={data.bebedouros_obs}
        onObservationChange={(value) => handleChange("bebedouros_obs", value)}
        justificativaValue={data.bebedouros_justificativa}
        onJustificativaChange={(value) => handleChange("bebedouros_justificativa", value)}
        tipoAdaptacaoValue={data.bebedouros_tipo}
        onTipoAdaptacaoChange={(value) => handleChange("bebedouros_tipo", value)}
        necessitaProjetoValue={data.bebedouros_projeto}
        onNecessitaProjetoChange={(value) => handleChange("bebedouros_projeto", value)}
        anexosValue={data.bebedouros_anexos}
        onAnexosChange={(value) => handleChange("bebedouros_anexos", value)}
      />
    </div>
  );
}