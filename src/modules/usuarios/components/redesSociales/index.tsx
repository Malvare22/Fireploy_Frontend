import { Usuario } from "@modules/usuarios/types/usuario";
import { RedSocialUsuario } from "@modules/usuarios/types/usuario.redSocial";
import React, { ReactNode } from "react";
import RedSocial from "@modules/proyectos/components/redSocial";

const RedesSociales: React.FC<{ usuario: Usuario }> = ({ usuario }) => {
  const RenderRedesSociales = () => {
    let redesSociales: ReactNode[] = [];
    for (let key in usuario.redSocial) {
      const validKey = key as keyof RedSocialUsuario;
      const urlRed = usuario.redSocial[validKey];
      let elemento: any;
      if (urlRed != null && urlRed != "" && urlRed != undefined) {
        elemento = <RedSocial nombre={validKey} url={urlRed} />;
      }
      redesSociales.push(elemento);
    }

    return redesSociales;
  };

  return <RenderRedesSociales />;
};

export default RedesSociales;
