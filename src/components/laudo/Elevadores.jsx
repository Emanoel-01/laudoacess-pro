import { useEffect } from "react";
import ChecklistItem from "./ChecklistItem";

export default function Elevadores({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  useEffect(() => {
    if (data.existe === "nao" || data.existe === "nao_se_aplica") {
      onChange({
        ...data,
        dimensoes_cabina: "nao_se_aplica",
        abertura_porta: "nao_se_aplica",
        corrimao_interno: "nao_se_aplica",
        botoeira_interna: "nao_se_aplica",
        botoeira_externa: "nao_se_aplica",
        sinalizacao: "nao_se_aplica"
      });
    }
  }, [data.existe]);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Elevadores</h2>
        <p className="text-slate-600">Conforme ABNT NM 313/2007</p>
      </div>

      <ChecklistItem
        label="Existe elevador no imóvel?"
        value={data.existe}
        onChange={(value) => handleChange("existe", value)}
        showObservation={false}
      />

      {data.existe === "sim" && (
        <>
          <ChecklistItem
            label="A cabina possui dimensões mínimas de 1,10m (largura) x 1,40m (profundidade)?"
            value={data.dimensoes_cabina}
            onChange={(value) => handleChange("dimensoes_cabina", value)}
            observationValue={data.dimensoes_obs}
            onObservationChange={(value) => handleChange("dimensoes_obs", value)}
            justificativaValue={data.dimensoes_justificativa}
            onJustificativaChange={(value) => handleChange("dimensoes_justificativa", value)}
            tipoAdaptacaoValue={data.dimensoes_tipo}
            onTipoAdaptacaoChange={(value) => handleChange("dimensoes_tipo", value)}
            necessitaProjetoValue={data.dimensoes_projeto}
            onNecessitaProjetoChange={(value) => handleChange("dimensoes_projeto", value)}
          />

          <ChecklistItem
            label="A abertura da porta é de no mínimo 0,80m?"
            value={data.abertura_porta}
            onChange={(value) => handleChange("abertura_porta", value)}
            observationValue={data.abertura_obs}
            onObservationChange={(value) => handleChange("abertura_obs", value)}
            justificativaValue={data.abertura_justificativa}
            onJustificativaChange={(value) => handleChange("abertura_justificativa", value)}
            tipoAdaptacaoValue={data.abertura_tipo}
            onTipoAdaptacaoChange={(value) => handleChange("abertura_tipo", value)}
            necessitaProjetoValue={data.abertura_projeto}
            onNecessitaProjetoChange={(value) => handleChange("abertura_projeto", value)}
          />

          <ChecklistItem
            label="Há corrimãos (altura 0,875m-0,90m, cor contrastante) nos painéis laterais e fundo?"
            value={data.corrimao_interno}
            onChange={(value) => handleChange("corrimao_interno", value)}
            observationValue={data.corrimao_obs}
            onObservationChange={(value) => handleChange("corrimao_obs", value)}
            justificativaValue={data.corrimao_justificativa}
            onJustificativaChange={(value) => handleChange("corrimao_justificativa", value)}
            tipoAdaptacaoValue={data.corrimao_tipo}
            onTipoAdaptacaoChange={(value) => handleChange("corrimao_tipo", value)}
            necessitaProjetoValue={data.corrimao_projeto}
            onNecessitaProjetoChange={(value) => handleChange("corrimao_projeto", value)}
          />

          <ChecklistItem
            label="Os botões internos estão entre 0,90m e 1,30m de altura?"
            value={data.botoeira_interna}
            onChange={(value) => handleChange("botoeira_interna", value)}
            observationValue={data.botoeira_int_obs}
            onObservationChange={(value) => handleChange("botoeira_int_obs", value)}
            justificativaValue={data.botoeira_int_justificativa}
            onJustificativaChange={(value) => handleChange("botoeira_int_justificativa", value)}
            tipoAdaptacaoValue={data.botoeira_int_tipo}
            onTipoAdaptacaoChange={(value) => handleChange("botoeira_int_tipo", value)}
            necessitaProjetoValue={data.botoeira_int_projeto}
            onNecessitaProjetoChange={(value) => handleChange("botoeira_int_projeto", value)}
          />

          <ChecklistItem
            label="A botoeira externa está entre 0,90m e 1,10m de altura?"
            value={data.botoeira_externa}
            onChange={(value) => handleChange("botoeira_externa", value)}
            observationValue={data.botoeira_ext_obs}
            onObservationChange={(value) => handleChange("botoeira_ext_obs", value)}
            justificativaValue={data.botoeira_ext_justificativa}
            onJustificativaChange={(value) => handleChange("botoeira_ext_justificativa", value)}
            tipoAdaptacaoValue={data.botoeira_ext_tipo}
            onTipoAdaptacaoChange={(value) => handleChange("botoeira_ext_tipo", value)}
            necessitaProjetoValue={data.botoeira_ext_projeto}
            onNecessitaProjetoChange={(value) => handleChange("botoeira_ext_projeto", value)}
          />

          <ChecklistItem
            label="Há S.I.A. na área externa, sinalização em Braille nos batentes e piso tátil de alerta?"
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
          />
        </>
      )}
    </div>
  );
}