import SocialNetworkIcon from "../components/socialNetwork";
import { RedSocialUsuario } from "../types/usuario.redSocial";

export function showSocialNetworks(redSocial: RedSocialUsuario) {
  const iconos = [];
  for (const key in redSocial) {
    const validKey = key as keyof RedSocialUsuario;
    if (redSocial[validKey] && redSocial[validKey] != "") {
      iconos.push(<SocialNetworkIcon redSocial={validKey} />);
    }
  }

  return iconos;
};
