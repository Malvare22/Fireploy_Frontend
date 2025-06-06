import { GitlabIcon } from "@modules/general/components/customIcons";
import { RedSocialUsuario } from "@modules/usuarios/types/usuario";
import { Facebook, Instagram, LinkedIn, GitHub, Twitter } from "@mui/icons-material";
import ErrorIcon from "@mui/icons-material/Error";
import { SvgIconProps } from "@mui/material";

type SocialNetworkProps = {
  redSocial: keyof RedSocialUsuario;
} & SvgIconProps;

/**
 * SocialNetworkIcon component – renders the corresponding icon for a user's social media based on the provided key.
 *
 * This component maps a given social network key (e.g., "facebook", "github") to its
 * appropriate Material UI icon. It is primarily used to display social media icons
 * on a user’s profile or portfolio view.
 *
 * @component
 * @param {SocialNetworkProps} props - Component props
 * @param {keyof RedSocialUsuario} props.redSocial - The social network key to display the icon for
 * @returns {JSX.Element | null} The corresponding social media icon or null if no match is found
 *
 * @example
 * ```tsx
 * <SocialNetworkIcon redSocial="facebook" />
 * ```
 */
const SocialNetworkIcon: React.FC<SocialNetworkProps> = ({ redSocial, ...props }) => {
  /**
   * Returns the appropriate Material UI icon component based on the provided social network key.
   *
   * @returns {JSX.Element | null} The icon corresponding to the social network, or null if not matched
   */
  const getSocialIcon = () => {
    switch (redSocial) {
      case "facebook":
        return <Facebook {...props} />;
      case "instagram":
        return <Instagram {...props} />;
      case "linkedin":
        return <LinkedIn {...props} />;
      case "x":
        return <Twitter {...props} />;
      case "github":
        return <GitHub {...props} />;
      case "gitLab":
        return <GitlabIcon {...props} />;
      default:
        return <ErrorIcon></ErrorIcon>;
    }
  };

  return <>{getSocialIcon()}</>;
};

export default SocialNetworkIcon;
