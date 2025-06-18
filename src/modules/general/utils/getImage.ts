// Import all images
import facebookLogo from "@modules/general/assets/redesSociales/facebookLogo.png";
import instagramLogo from "@modules/general/assets/redesSociales/instagramLogo.png";
import linkedinLogo from "@modules/general/assets/redesSociales/linkedinLogo.png";
import xLogo from "@modules/general/assets/redesSociales/xLogo.png";
import ingSistemasLogo from "@modules/general/assets/ufps/ingSistemasLogo.png";
import ufpsLogo from "@modules/general/assets/ufps/UFPSLogo.png";
import ufpsLogoCompleto from "@modules/general/assets/ufps/UFPSLogoCompleto.png";
import defaultProfileImage from "@modules/general/assets/profile/defaultProfileImage.png";
import defaultProjectImage from "@modules/general/assets/project/defaultImage.jpg";
import team01 from "@modules/general/assets/team/reyes.jpg";
import team02 from "@modules/general/assets/team/quiroz.jpg";
import team03 from "@modules/general/assets/team/malaver.jpg";

// Banners
import angular_banner from "@modules/general/assets/bannerLogos/angular.png";
import expressjs_banner from "@modules/general/assets/bannerLogos/expressjs.png";
import laravel_banner from "@modules/general/assets/bannerLogos/laravel.png";
import nextjs_banner from "@modules/general/assets/bannerLogos/nextjs.png";
import nodejs_banner from "@modules/general/assets/bannerLogos/nodejs.png";
import php_banner from "@modules/general/assets/bannerLogos/php.png";
import react from "@modules/general/assets/bannerLogos/react.png";
import springboot_banner from "@modules/general/assets/bannerLogos/springboot.png";
import symfony_banner from "@modules/general/assets/bannerLogos/symphony.png";
import django_banner from "@modules/general/assets/bannerLogos/django.png";



// Logos
import nextjs from "@modules/general/assets/tecnologiesLogos/nextjs.png";
import angular from "@modules/general/assets/tecnologiesLogos/angular.png";
import laravel from "@modules/general/assets/tecnologiesLogos/laravel.png";
import springboot from "@modules/general/assets/tecnologiesLogos/springBoot.png";
import html5 from "@modules/general/assets/tecnologiesLogos/html5.png";



//BD
import mongodb from "@modules/general/assets/tecnologias/mongoDB.png";
import mysql from "@modules/general/assets/tecnologias/mySQL.png";

//Home
import wallpaper_home from "@modules/general/assets/home/wallpaperHome.jpg";
import portafolio_home from "@modules/general/assets/home/portafolioHome.png";

import not_found from "@modules/general/assets/generic/image-not-found.png";

import not_found_404 from "@modules/general/assets/404.png";

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
  // Social Media Logos
  facebook_logo: facebookLogo,
  instagram_logo: instagramLogo,
  linkedin_logo: linkedinLogo,
  x_logo: xLogo,

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

  angular_banner,
  expressjs_banner,
  laravel_banner,
  nextjs_banner,
  nodejs_banner,
  php_banner,
  react,
  springboot_banner,
  symfony_banner,
  django_banner,

  // Technology Logos
  angular,
  laravel,
  nextjs,
  springboot,
  html5,

  mongodb,
  mysql,

  wallpaper_home,
  portafolio_home,

  not_found,
  not_found_404
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
