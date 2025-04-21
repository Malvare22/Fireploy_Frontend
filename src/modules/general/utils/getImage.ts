// Import all images
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
import team01 from "@modules/general/assets/team/reyes.jpg";
import team02 from "@modules/general/assets/team/quiroz.jpg";
import team03 from "@modules/general/assets/team/malaver.jpg";

/**
 * **Collection of imported images.**
 *
 * This object provides a structured way to access image assets across the app.
 *
 * The `as const` ensures that the object is **readonly**, preventing accidental modifications.
 *
 * @constant {Readonly<Record<string, string>>} assetImages - Object containing image paths.
 */
export const assetImages = {
  // Fireploy Logo
  logo_fireploy: logoFireploy,

  // Social Media Logos
  facebook_logo: facebookLogo,
  instagram_logo: instagramLogo,
  linkedin_logo: linkedinLogo,
  x_logo: xLogo,

  // Technologies Logos
  mongodb: mongodb,
  mysql: mysql,
  nodejs: nodejs,
  react: react,
  springboot: springboot,
  angular: angular,

  // UFPS Logos
  ing_sistemas_logo: ingSistemasLogo,
  ufps_logo: ufpsLogo,
  ufps_logo_completo: ufpsLogoCompleto,

  // Default Images
  defaultProfileImage: defaultProfileImage,
  defaultProjectImage: defaultProjectImage,

  team01: team01,
  team02: team02,
  team03: team03,
} as const;

/**
 * **Map of images with names and paths.**
 *
 * This dynamically generates an object where each key corresponds to an image in `assetImages`,
 * allowing structured access to the name and path.
 *
 * @constant {Record<string, { nombre: string; ruta: string }>} getImage - Image lookup table.
 */
export const getImage: Record<keyof typeof assetImages, { nombre: string; ruta: string }> =
  Object.keys(assetImages).reduce(
    (map, key) => ({
      ...map,
      [key]: {
        nombre: key,
        ruta: assetImages[key as keyof typeof assetImages],
      },
    }),
    {} as Record<keyof typeof assetImages, { nombre: string; ruta: string }>
  );
