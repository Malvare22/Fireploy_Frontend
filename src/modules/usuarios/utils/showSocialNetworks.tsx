import SocialNetworkIcon from "../components/socialNetwork";
import { RedSocialUsuario } from "../types/usuario";

/**
 * Renders a list of social network icons based on the user's social media data.
 *
 * @param redSocial An object containing the user's social media profiles.
 * @returns An array of JSX elements representing each social network icon.
 */
export function showSocialNetworks(redSocial: RedSocialUsuario) {
  const iconos = [];

  for (const key in redSocial) {
    const validKey = key as keyof RedSocialUsuario;

    if (redSocial[validKey] && redSocial[validKey] !== "") {
      iconos.push(<SocialNetworkIcon redSocial={validKey} />);
    }
  }

  return iconos;
};
