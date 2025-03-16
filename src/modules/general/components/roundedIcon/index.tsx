import { capitalizeFirstLetter } from "@modules/general/utils/capitalCase";
import { Box, IconButton, Tooltip } from "@mui/material";

export interface RoundedIconProps{
  nombre: string;
  imagen: string;
  url?: string | null;
  dimensiones?: {
    height: number | string | { xs: number | string; md: number | string };
    width: number | string | { xs: number | string; md: number | string };
  };
};

/**
 * Componente `RoundedIcon` que muestra una imagen redonda en un `IconButton`.
 * Al hacer clic en el icono, redirige a la URL proporcionada en una nueva pestaña.
 * También muestra un tooltip con el nombre del icono.
 *
 * @component
 * @param {RoundedIconProps} props - Propiedades del componente.
 * @param {string} props.nombre - Nombre del icono, usado en el tooltip.
 * @param {string} [props.imagen] - Ruta de la imagen a mostrar en el icono.
 * @param {string | null} [props.url] - URL a la que se redirige al hacer clic en el icono. Si es `null`, no redirige.
 * @param { height: number | string | { xs: number | string; md: number | string }; width: number | string | { xs: number | string; md: number | string } } [props.dimensiones] - Tamaño del icono, admite valores individuales o un objeto con `xs` y `md`.
* @returns {JSX.Element} Componente `RoundedIcon` que muestra un icono redondo con un tooltip y opción de redirección.
*/
const RoundedIcon: React.FC<RoundedIconProps> = ({
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

export default RoundedIcon;
