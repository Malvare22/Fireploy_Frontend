import SocialNetworkIcon from "../components/socialNetwork";
import { RedSocialUsuario } from "../types/usuario";

/**
 * Renders a list of social network icons based on the user's social media data.
 *
 * This function iterates over the `redSocial` object, checking each social media key 
 * for valid (non-null and non-empty) URLs. For each valid social network, it renders 
 * the corresponding social media icon.
 *
 * @param redSocial An object containing the user's social media profiles, where keys
 *                  are social media platform names (e.g., "facebook", "instagram") 
 *                  and values are URLs to the user's profiles.
 * @returns An array of JSX elements representing each social network icon, which 
 *          are displayed based on the available social media profiles.
 * 
 * @example
 * const redSocial = {
 *   facebook: "https://facebook.com/juanperez",
 *   instagram: "https://instagram.com/juanperez",
 *   linkedin: "",
 *   x: "https://x.com/juanperez"
 * };
 * const socialIcons = showSocialNetworks(redSocial);
 * // This will return JSX with SocialNetworkIcon components for Facebook, Instagram, and X.
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
