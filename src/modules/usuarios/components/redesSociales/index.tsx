import { Usuario } from "@modules/usuarios/types/usuario";
import { RedSocialUsuario } from "@modules/usuarios/types/usuario.redSocial";
import React, { ReactNode } from "react";
import RoundedIcon from "@modules/general/components/RoundedIcon";
import {
  Imagenes,
  getImage,
} from "@modules/general/components/RoundedIcon/utils";

const RedesSociales: React.FC<{ usuario: Usuario }> = ({ usuario }) => {
  const RenderRedesSociales = () => {
    const redesSociales: ReactNode[] = [];
    for (const key in usuario.redSocial) {
      const validKey = key as keyof RedSocialUsuario;
      const urlRed = usuario.redSocial[validKey];
      let x: keyof typeof Imagenes;
      switch (validKey) {
        case "facebook":
          x = "facebook_logo";
          break;
        case "instagram":
          x = "instagram_logo";
          break;
        case "linkedin":
          x = "linkedin_logo";
          break;
        case "x":
          x = "x_logo";
          break;
        default:
          x = "x_logo";
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let elemento: any;
      if (urlRed != null && urlRed != "" && urlRed != undefined) {
        elemento = (
          <RoundedIcon nombre={getImage[x].nombre} imagen={getImage[x].ruta} url={urlRed} />
        );
      }
      redesSociales.push(elemento);
    }

    return redesSociales;
  };

  return <RenderRedesSociales />;
};

export default RedesSociales;
