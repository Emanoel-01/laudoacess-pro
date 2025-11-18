import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function LicenseCheck({ onValidated }) {
  const [validation, setValidation] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkLicense();
  }, []);

  const checkLicense = async () => {
    setIsChecking(true);
    const result = await base44.functions.invoke('validarLicenca', {});
    setValidation(result.data);
    
    if (result.data.valida && onValidated) {
      onValidated(result.data);
    }
    setIsChecking(false);
  };

  if (isChecking) {
    return (
      <Alert className="border-blue-200 bg-blue-50">
        <AlertCircle className="w-4 h-4 text-blue-600" />
        <AlertDescription>Verificando sua assinatura...</AlertDescription>
      </Alert>
    );
  }

  if (!validation?.valida) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <Lock className="w-4 h-4 text-red-600" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-red-900">Acesso Bloqueado</p>
            <p className="text-red-700 mt-1">{validation?.mensagem}</p>
          </div>
          <Link to={createPageUrl("Planos")}>
            <Button className="bg-red-600 hover:bg-red-700">
              Ver Planos
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }

  if (validation.em_trial) {
    return (
      <Alert className="border-orange-200 bg-orange-50">
        <AlertCircle className="w-4 h-4 text-orange-600" />
        <AlertDescription>
          <p className="text-orange-900">
            <span className="font-semibold">Período Trial:</span> Você está usando o período de teste.
            {validation.plano && validation.plano.limite_laudos_mes > 0 && (
              <span className="ml-1">
                Limite: {validation.plano.limite_laudos_mes} laudos/mês
              </span>
            )}
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  if (validation.laudos_restantes !== 'ilimitado' && validation.laudos_restantes <= 3) {
    return (
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertCircle className="w-4 h-4 text-yellow-600" />
        <AlertDescription>
          <p className="text-yellow-900">
            <span className="font-semibold">Atenção:</span> Você tem {validation.laudos_restantes} laudo(s) 
            restante(s) neste mês.
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}