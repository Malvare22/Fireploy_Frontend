import { capitalizeFirstLetter } from "@modules/general/utils/capitalCase";
import { Box, IconButton, Tooltip } from "@mui/material";

export enum Imagenes {
  // Fireploy
  logo_fireploy = "/assets/fireploy/LogoFireploy.png",

  // Redes Sociales
  facebook_logo = "/assets/redesSociales/facebookLogo.png",
  instagram_logo = "/assets/redesSociales/instagramLogo.png",
  linkedin_logo = "/assets/redesSociales/linkedinLogo.png",
  x_logo = "/assets/redesSociales/xLogo.png",

  // Tecnologías
  mongodb = "/assets/tecnologias/mongoDB.png",
  mysql = "/assets/tecnologias/mySQL.png",
  nodejs = "/assets/tecnologias/nodeJS.png",
  react = "/assets/tecnologias/react.png",
  springboot = "/assets/tecnologias/springBoot.png",

  // UFPS
  ing_sistemas_logo = "/assets/ufps/ingSistemasLogo.png",
  ufps_logo = "/assets/ufps/UFPSLogo.png",
  ufps_logo_completo = "/assets/ufps/UFPSLogoCompleto.png",
}

/**
 * Obtiene la ruta de una imagen basada en el enum de imágenes.
 * 
 * @param nombre - El nombre de la imagen en formato `imagenes`
 * @returns La ruta de la imagen como una cadena de texto.
 */
export const obtenerRutaImagen = (nombre: Imagenes): string => {
  return nombre;
};

// Mapa para obtener las imágenes con sus rutas y nombres en minúscula
export const mapaImagenes: Record<string, { nombre: string; ruta: string }> = Object.keys(Imagenes).reduce((mapa, clave) => {
  return { ...mapa, [clave]: { nombre: capitalizeFirstLetter(clave), ruta: Imagenes[clave as keyof typeof Imagenes] } };
}, {});


export interface IconoRedondoProps{
  nombre: string;
  imagen: string;
  url?: string | null;
  dimensiones?: {
    height: number | string | { xs: number | string; md: number | string };
    width: number | string | { xs: number | string; md: number | string };
  };
};

/**
 * Componente `IconoRedondo` que muestra una imagen redonda en un `IconButton`.
 * Al hacer clic en el icono, redirige a la URL proporcionada en una nueva pestaña.
 * También muestra un tooltip con el nombre del icono.
 *
 * @component
 * @param {IconoRedondoProps} props - Propiedades del componente.
 * @param {string} props.nombre - Nombre del icono, usado en el tooltip.
 * @param {string} [props.imagen] - Ruta de la imagen a mostrar en el icono.
 * @param {string | null} [props.url] - URL a la que se redirige al hacer clic en el icono. Si es `null`, no redirige.
 * @param { height: number | string | { xs: number | string; md: number | string }; width: number | string | { xs: number | string; md: number | string } } [props.dimensiones] - Tamaño del icono, admite valores individuales o un objeto con `xs` y `md`.
* @returns {JSX.Element} Componente `IconoRedondo` que muestra un icono redondo con un tooltip y opción de redirección.
*/
const IconoRedondo: React.FC<IconoRedondoProps> = ({
  imagen,
  nombre,
  url,
  dimensiones = { height: { md: 32, xs: 24 }, width: { md: 32, xs: 24 } },
}) => {

  return (
    <Tooltip title={capitalizeFirstLetter(nombre)}>
      <IconButton
        onClick={() => {
          if (url) window.open(url, "_blank");
        }}
      >
        <Box
          component={"img"}
          sx={{
            height: dimensiones?.height,
            width: dimensiones?.width,
            borderRadius: "100%",
          }}
          src={imagen}
        ></Box>
      </IconButton>
    </Tooltip>
  );
};

export default IconoRedondo;
