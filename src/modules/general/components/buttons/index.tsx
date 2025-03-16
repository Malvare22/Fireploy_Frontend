import { Box, Button, ButtonProps } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from '@mui/icons-material/Check';
import { ReactNode } from "react";
import { buttonTypes } from "@modules/general/types/buttons";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

/**
 * Mapa de iconos asociados a cada tipo de botón.
 */
const iconMap = {
  [buttonTypes.save]: <SaveAsIcon />,
  [buttonTypes.cancel]: <CancelIcon />,
  [buttonTypes.add]: <AddCircleIcon />,
  [buttonTypes.accept]: <CheckIcon />,
  [buttonTypes.remove]: <DeleteSweepIcon />,
};

/**
 * Mapa de etiquetas asociadas a cada tipo de botón.
 */
const labelMap = {
  [buttonTypes.save]: "guardar",
  [buttonTypes.cancel]: "cancelar",
  [buttonTypes.add]: "agregar",
  [buttonTypes.accept]: "aceptar",
  [buttonTypes.remove]: "eliminar",
};

/**
 * @interface GeneralButtonProps
 * @description Propiedades del componente GeneralButton.
 * @extends {ButtonProps}
 * @property {buttonTypes} mode - Tipo de botón a renderizar.
 * @property {boolean} [withIcon=true] - Indica si se muestra el icono en el botón.
 * @property {ReactNode} [icon] - Icono personalizado para el botón.
 */
interface GeneralButtonProps extends ButtonProps {
  mode: buttonTypes;
  withIcon?: boolean;
  icon?: ReactNode;
}

/**
 * Componente GeneralButton
 * 
 * Renderiza un botón estilizado con un icono y una etiqueta según el tipo de botón seleccionado.
 *
 * @component
 * @param {GeneralButtonProps} props - Propiedades del componente.
 * @param {buttonTypes} props.mode - Define el tipo de botón.
 * @param {boolean} [props.withIcon=true] - Indica si debe mostrar un icono.
 * @param {ReactNode} [props.icon] - Icono personalizado a mostrar en lugar del predefinido.
 * @returns {JSX.Element} Componente de botón.
 */
const GeneralButton: React.FC<GeneralButtonProps> = ({
  mode,
  withIcon = true,
  icon,
  ...props
}) => {
  return (
    <Button
      {...props}
      startIcon={withIcon && (icon || iconMap[mode])}
      variant="contained"
    >
      {labelMap[mode]}
    </Button>
  );
};

/**
 * @interface ButtonContainerProps
 * @description Propiedades del contenedor de botones.
 * @property {React.ReactNode} children - Botones a mostrar dentro del contenedor.
 * @property {"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly"} [_justifyContent="flex-start"] - Controla la alineación horizontal de los botones.
 * @property {number} [_spacing=2] - Define el espacio entre los botones.
 */
interface ButtonContainerProps {
  children: React.ReactNode;
  _justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  _spacing?: number;
}

/**
 * Componente ButtonContainer
 * 
 * Contenedor flexible para agrupar botones con un espacio definido entre ellos.
 *
 * @component
 * @param {ButtonContainerProps} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Botones a mostrar dentro del contenedor.
 * @param {"flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly"} [props._justifyContent="flex-start"] - Define la alineación horizontal de los botones.
 * @param {number} [props._spacing=2] - Define el espacio entre los botones.
 * @returns {JSX.Element} Contenedor de botones.
 */
export const ButtonContainer: React.FC<ButtonContainerProps> = ({
  children,
  _justifyContent = "flex-start",
  _spacing = 2,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: _justifyContent,
      alignItems: "center",
      gap: _spacing,
      width: "100%",
    }}
  >
    {children}
  </Box>
);

export default GeneralButton;
