import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { UploadFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Upload, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function MeuPerfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [formData, setFormData] = useState({
    formacao: "",
    registro_profissional: "",
    numero_registro: "",
    telefone: "",
    empresa: "",
    logo_url: ""
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const currentUser = await User.me();
    setUser(currentUser);
    setFormData({
      formacao: currentUser.formacao || "",
      registro_profissional: currentUser.registro_profissional || "",
      numero_registro: currentUser.numero_registro || "",
      telefone: currentUser.telefone || "",
      empresa: currentUser.empresa || "",
      logo_url: currentUser.logo_url || ""
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploadingLogo(true);
    const { file_url } = await UploadFile({ file });
    handleChange("logo_url", file_url);
    setIsUploadingLogo(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await User.updateMyUserData(formData);
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

        <div className="space-y-6">
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dados Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <Label>Registro Profissional *</Label>
                  <Input
                    value={formData.registro_profissional}
                    onChange={(e) => handleChange("registro_profissional", e.target.value)}
                    placeholder="Ex: CAU, CREA"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Número do Registro *</Label>
                  <Input
                    value={formData.numero_registro}
                    onChange={(e) => handleChange("numero_registro", e.target.value)}
                    placeholder="Ex: 127687-5"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input
                    value={formData.telefone}
                    onChange={(e) => handleChange("telefone", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Empresa/Escritório</Label>
                <Input
                  value={formData.empresa}
                  onChange={(e) => handleChange("empresa", e.target.value)}
                  placeholder="Nome da empresa ou escritório"
                />
              </div>

              <div className="space-y-2">
                <Label>Logo da Empresa</Label>
                <div className="flex gap-4 items-center">
                  {formData.logo_url && (
                    <img src={formData.logo_url} alt="Logo" className="h-20 w-20 object-contain border border-slate-200 rounded-lg p-2" />
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}