import { RedSocialUsuario } from "@modules/usuarios/types/usuario.redSocial";
import {
  Facebook,
  Instagram,
  LinkedIn,
  GitHub,
  Twitter,
} from "@mui/icons-material";

type SocialNetworkProps = {
  redSocial: keyof RedSocialUsuario;
};
const SocialNetworkIcon: React.FC<SocialNetworkProps> = ({ redSocial }) => {
  const getSocialIcon = () => {
    switch (redSocial) {
      case "facebook":
        return <Facebook />;
      case "instagram":
        return <Instagram />;
      case "linkedin":
        return <LinkedIn />;
      case "x":
        return <Twitter />;
      case "github":
        return <GitHub />;
      default:
        return null;
    }
  };
  return <>{getSocialIcon()}</>;
};

export default SocialNetworkIcon;