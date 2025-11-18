import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Upload, User as UserIcon, Building2, FileText, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function MeuPerfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [formData, setFormData] = useState({
    empresa: "",
    cnpj_cpf: "",
    telefone: "",
    whatsapp: "",
    endereco_profissional: "",
    formacao: "",
    registro_tipo: "",
    registro_numero: "",
    registro_uf: "",
    logo_url: "",
    assinatura_digital_url: "",
    cor_primaria: "#2563eb"
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const currentUser = await base44.auth.me();
    setUser(currentUser);
    setFormData({
      empresa: currentUser.empresa || "",
      cnpj_cpf: currentUser.cnpj_cpf || "",
      telefone: currentUser.telefone || "",
      whatsapp: currentUser.whatsapp || "",
      endereco_profissional: currentUser.endereco_profissional || "",
      formacao: currentUser.formacao || "",
      registro_tipo: currentUser.registro_tipo || "",
      registro_numero: currentUser.registro_numero || "",
      registro_uf: currentUser.registro_uf || "",
      logo_url: currentUser.logo_url || "",
      assinatura_digital_url: currentUser.assinatura_digital_url || "",
      cor_primaria: currentUser.cor_primaria || "#2563eb"
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingLogo(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    handleChange("logo_url", file_url);
    setIsUploadingLogo(false);
  };

  const handleAssinaturaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingLogo(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    handleChange("assinatura_digital_url", file_url);
    setIsUploadingLogo(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await base44.auth.updateMe(formData);
    alert("Perfil atualizado com sucesso!");
    setIsSaving(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(createPageUrl("Dashboard"))}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Meu Perfil</h1>
              <p className="text-slate-600">Configure seus dados profissionais</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </div>

        <Tabs defaultValue="pessoais" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
            <TabsTrigger value="profissionais">Dados Profissionais</TabsTrigger>
            <TabsTrigger value="personalizacao">Personalização</TabsTrigger>
            <TabsTrigger value="assinatura">Assinatura</TabsTrigger>
          </TabsList>

          <TabsContent value="pessoais">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-blue-600" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input value={user.full_name} disabled className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user.email} disabled className="bg-slate-50" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input
                      value={formData.telefone}
                      onChange={(e) => handleChange("telefone", e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>WhatsApp (para notificações)</Label>
                    <Input
                      value={formData.whatsapp}
                      onChange={(e) => handleChange("whatsapp", e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profissionais">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Dados Profissionais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Empresa/Escritório</Label>
                  <Input
                    value={formData.empresa}
                    onChange={(e) => handleChange("empresa", e.target.value)}
                    placeholder="Nome da empresa ou escritório"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>CNPJ/CPF</Label>
                    <Input
                      value={formData.cnpj_cpf}
                      onChange={(e) => handleChange("cnpj_cpf", e.target.value)}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Endereço Profissional</Label>
                    <Input
                      value={formData.endereco_profissional}
                      onChange={(e) => handleChange("endereco_profissional", e.target.value)}
                      placeholder="Rua, número, bairro, cidade - UF"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Formação *</Label>
                    <Input
                      value={formData.formacao}
                      onChange={(e) => handleChange("formacao", e.target.value)}
                      placeholder="Ex: Arquiteto(a), Engenheiro(a) Civil"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de Registro *</Label>
                    <Select value={formData.registro_tipo} onValueChange={(val) => handleChange("registro_tipo", val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CAU">CAU</SelectItem>
                        <SelectItem value="CREA">CREA</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Número do Registro *</Label>
                    <Input
                      value={formData.registro_numero}
                      onChange={(e) => handleChange("registro_numero", e.target.value)}
                      placeholder="Ex: 127687-5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>UF do Registro</Label>
                    <Input
                      value={formData.registro_uf}
                      onChange={(e) => handleChange("registro_uf", e.target.value)}
                      placeholder="Ex: SP"
                      maxLength={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personalizacao">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  Personalização (White-Label)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Logo da Empresa</Label>
                  <div className="flex gap-4 items-center">
                    {formData.logo_url && (
                      <img src={formData.logo_url} alt="Logo" className="h-20 w-20 object-contain border border-slate-200 rounded-lg p-2 bg-white" />
                    )}
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                        <div className="flex items-center gap-2">
                          <Upload className="w-5 h-5 text-slate-600" />
                          <span className="text-sm text-slate-600">
                            {isUploadingLogo ? "Enviando..." : "Escolher logo"}
                          </span>
                        </div>
                      </div>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        disabled={isUploadingLogo}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-slate-500">
                    O logo aparecerá no cabeçalho dos laudos em PDF
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Assinatura Digital</Label>
                  <div className="flex gap-4 items-center">
                    {formData.assinatura_digital_url && (
                      <img src={formData.assinatura_digital_url} alt="Assinatura" className="h-20 w-auto object-contain border border-slate-200 rounded-lg p-2 bg-white" />
                    )}
                    <label htmlFor="assinatura-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                        <div className="flex items-center gap-2">
                          <Upload className="w-5 h-5 text-slate-600" />
                          <span className="text-sm text-slate-600">
                            {isUploadingLogo ? "Enviando..." : "Escolher assinatura"}
                          </span>
                        </div>
                      </div>
                      <input
                        id="assinatura-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAssinaturaUpload}
                        disabled={isUploadingLogo}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-slate-500">
                    A assinatura aparecerá no rodapé dos laudos em PDF
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Cor Primária (Tema)</Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="color"
                      value={formData.cor_primaria}
                      onChange={(e) => handleChange("cor_primaria", e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={formData.cor_primaria}
                      onChange={(e) => handleChange("cor_primaria", e.target.value)}
                      placeholder="#2563eb"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Define a cor principal dos seus laudos em PDF
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assinatura">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Minha Assinatura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Informações sobre seu plano de assinatura serão exibidas aqui em breve.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}