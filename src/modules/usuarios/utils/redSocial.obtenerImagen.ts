import { RedSocialUsuario } from "../types/usuario.redSocial";
import Facebook from "@modules/general/assets/redesSociales/facebook.png";
import Instagram from "@modules/general/assets/redesSociales/instagram.png";
import X from "@modules/general/assets/redesSociales/x.png";
import Linkedin from "@modules/general/assets/redesSociales/linkedin.png";

export const obtenerImagenRedSocial = (red: keyof RedSocialUsuario) => {
  const images: Record<keyof RedSocialUsuario, string> = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
    x: X,
  };

  return images[red];
};
