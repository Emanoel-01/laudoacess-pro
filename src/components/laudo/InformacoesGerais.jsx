import { useEffect, useState } from "react";
import { User } from "@/entities/User";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, UserIcon, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function InformacoesGerais({ data, onChange }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const currentUser = await User.me();
    setUser(currentUser);
    
    if (!data.responsavel_nome && currentUser) {
      onChange({
        ...data,
        responsavel_nome: currentUser.full_name,
        responsavel_formacao: currentUser.formacao || "",
        responsavel_registro: currentUser.registro_profissional || "",
        responsavel_numero_registro: currentUser.numero_registro || ""
      });
    }
  };

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {user && (!user.formacao || !user.registro_profissional) && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="w-4 h-4 text-blue-600" />
          <AlertDescription>
            Complete seu perfil profissional na página "Meu Perfil" para pré-preenchimento automático em todos os laudos.
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="w-5 h-5 text-blue-600" />
            Dados do Imóvel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome_imovel">Nome/Identificação do Imóvel *</Label>
              <Input
                id="nome_imovel"
                value={data.nome_imovel || ""}
                onChange={(e) => handleChange("nome_imovel", e.target.value)}
                placeholder="Ex: Edifício Centro Comercial"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo_edificacao">Classificação de Uso</Label>
              <Select 
                value={data.tipo_edificacao || ""} 
                onValueChange={(value) => handleChange("tipo_edificacao", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uso_publico">Uso Público</SelectItem>
                  <SelectItem value="uso_coletivo">Uso Coletivo</SelectItem>
                  <SelectItem value="uso_privado">Uso Privado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo_detalhe">Detalhamento do Tipo</Label>
            <Input
              id="tipo_detalhe"
              value={data.tipo_edificacao_detalhe || ""}
              onChange={(e) => handleChange("tipo_edificacao_detalhe", e.target.value)}
              placeholder="Ex: Comercial, Residencial, Educacional, Saúde"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço Completo *</Label>
            <Input
              id="endereco"
              value={data.endereco || ""}
              onChange={(e) => handleChange("endereco", e.target.value)}
              placeholder="Rua, número, bairro"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade *</Label>
              <Input
                id="cidade"
                value={data.cidade || ""}
                onChange={(e) => handleChange("cidade", e.target.value)}
                placeholder="Cidade"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estado">Estado *</Label>
              <Input
                id="estado"
                value={data.estado || ""}
                onChange={(e) => handleChange("estado", e.target.value)}
                placeholder="UF"
                maxLength={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={data.cep || ""}
                onChange={(e) => handleChange("cep", e.target.value)}
                placeholder="00000-000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total_pavimentos">Total de Pavimentos</Label>
              <Input
                id="total_pavimentos"
                type="number"
                min="1"
                max="25"
                value={data.total_pavimentos || ""}
                onChange={(e) => handleChange("total_pavimentos", parseInt(e.target.value) || "")}
                placeholder="Número de andares"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area_total">Área Total (m²)</Label>
              <Input
                id="area_total"
                type="number"
                value={data.area_total || ""}
                onChange={(e) => handleChange("area_total", parseFloat(e.target.value) || "")}
                placeholder="Área em m²"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ano_construcao">Ano de Construção</Label>
              <Input
                id="ano_construcao"
                type="number"
                value={data.ano_construcao || ""}
                onChange={(e) => handleChange("ano_construcao", parseInt(e.target.value) || "")}
                placeholder="Ano"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="data_vistoria">Data da Vistoria</Label>
            <Input
              id="data_vistoria"
              type="date"
              value={data.data_vistoria || ""}
              onChange={(e) => handleChange("data_vistoria", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserIcon className="w-5 h-5 text-blue-600" />
            Profissional Responsável
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsavel_nome">Nome Completo</Label>
              <Input
                id="responsavel_nome"
                value={data.responsavel_nome || ""}
                onChange={(e) => handleChange("responsavel_nome", e.target.value)}
                placeholder="Nome do profissional"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel_formacao">Formação</Label>
              <Input
                id="responsavel_formacao"
                value={data.responsavel_formacao || ""}
                onChange={(e) => handleChange("responsavel_formacao", e.target.value)}
                placeholder="Ex: Arquiteto(a), Engenheiro(a)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responsavel_registro">Tipo de Registro</Label>
              <Input
                id="responsavel_registro"
                value={data.responsavel_registro || ""}
                onChange={(e) => handleChange("responsavel_registro", e.target.value)}
                placeholder="CAU, CREA, etc"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel_numero">Número do Registro</Label>
              <Input
                id="responsavel_numero"
                value={data.responsavel_numero_registro || ""}
                onChange={(e) => handleChange("responsavel_numero_registro", e.target.value)}
                placeholder="000000-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel_art_rrt">Número ART/RRT</Label>
              <Input
                id="responsavel_art_rrt"
                value={data.responsavel_art_rrt || ""}
                onChange={(e) => handleChange("responsavel_art_rrt", e.target.value)}
                placeholder="Número da ART ou RRT"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}