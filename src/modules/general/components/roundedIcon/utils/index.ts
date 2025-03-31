import { capitalizeFirstLetter } from "@modules/general/utils/capitalCase";

// Importar todas las imágenes
import logoFireploy from "@modules/general/assets/fireploy/fireployLogo.png";
import facebookLogo from "@modules/general/assets/redesSociales/facebookLogo.png";
import instagramLogo from "@modules/general/assets/redesSociales/instagramLogo.png";
import linkedinLogo from "@modules/general/assets/redesSociales/linkedinLogo.png";
import xLogo from "@modules/general/assets/redesSociales/xLogo.png";
import mongodb from "@modules/general/assets/tecnologias/mongoDB.png";
import mysql from "@modules/general/assets/tecnologias/mySQL.png";
import nodejs from "@modules/general/assets/tecnologias/nodeJS.png";
import react from "@modules/general/assets/tecnologias/react.png";
import springboot from "@modules/general/assets/tecnologias/springBoot.png";
import angular from "@modules/general/assets/tecnologias/angular.png";
import ingSistemasLogo from "@modules/general/assets/ufps/ingSistemasLogo.png";
import ufpsLogo from "@modules/general/assets/ufps/UFPSLogo.png";
import ufpsLogoCompleto from "@modules/general/assets/ufps/UFPSLogoCompleto.png";
import defaultProfileImage from "@modules/general/assets/profile/defaultProfileImage.png";
import defaultProjectImage from "@modules/general/assets/project/defaultImage.jpg";

export const Imagenes = {
  // Fireploy
  logo_fireploy: logoFireploy,

  // Redes Sociales
  facebook_logo: facebookLogo,
  instagram_logo: instagramLogo,
  linkedin_logo: linkedinLogo,
  x_logo: xLogo,

  // Tecnologías
  mongodb: mongodb,
  mysql: mysql,
  nodejs: nodejs,
  react: react,
  springboot: springboot,
  angular: angular,

  // UFPS
  ing_sistemas_logo: ingSistemasLogo,
  ufps_logo: ufpsLogo,
  ufps_logo_completo: ufpsLogoCompleto,

  defaultProfileImage: defaultProfileImage,

  defaultProjectImage: defaultProjectImage,

} as const; // "as const" asegura que los valores sean de solo lectura

// Mapa para obtener las imágenes con sus rutas y nombres
export const getImage: Record<
  keyof typeof Imagenes,
  { nombre: string; ruta: string }
> = Object.keys(Imagenes).reduce(
  (mapa, clave) => {
    return {
      ...mapa,
      [clave]: {
        nombre: capitalizeFirstLetter(clave),
        ruta: Imagenes[clave as keyof typeof Imagenes],
      },
    };
  },
  {} as Record<keyof typeof Imagenes, { nombre: string; ruta: string }>
);
