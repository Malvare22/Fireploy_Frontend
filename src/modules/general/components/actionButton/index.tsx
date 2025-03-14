import { IconButton, Tooltip, IconButtonProps } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FaceIcon from "@mui/icons-material/Face";
import FaceRetouchingOffIcon from "@mui/icons-material/FaceRetouchingOff";
import { ReactNode } from "react";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import DoNotDisturbOffIcon from "@mui/icons-material/DoNotDisturbOff";
import { actionButtonTypes } from "@modules/general/types/actionButtons";

/**
 * Mapa de iconos asociados a cada tipo de acción.
 */
const iconMap = {
  [actionButtonTypes.ver]: <VisibilityIcon />,
  [actionButtonTypes.editar]: <EditIcon />,
  [actionButtonTypes.eliminar]: <DeleteIcon />,
  [actionButtonTypes.habilitarUsuario]: <FaceIcon />,
  [actionButtonTypes.deshabilitarUsuario]: <FaceRetouchingOffIcon />,
  [actionButtonTypes.habilitar]: <DoNotDisturbOffIcon />,
  [actionButtonTypes.deshabilitar]: <DoDisturbOnIcon />,
};

/**
 * Mapa de etiquetas asociadas a cada tipo de acción.
 */
const labelMap = {
  [actionButtonTypes.ver]: "ver",
  [actionButtonTypes.editar]: "editar",
  [actionButtonTypes.eliminar]: "eliminar",
  [actionButtonTypes.habilitarUsuario]: "habilitar usuario",
  [actionButtonTypes.deshabilitarUsuario]: "deshabilitar usuario",
  [actionButtonTypes.habilitar]: "habilitar",
  [actionButtonTypes.deshabilitar]: "deshabilitar",
};

/**
 * @interface ActionButtonProps
 * @extends {IconButtonProps}
 * @property {actionButtonTypes} mode - Tipo de acción que representa el botón.
 * @property {ReactNode} [icon] - Icono personalizado opcional para el botón.
 */
interface ActionButtonProps extends IconButtonProps {
  mode: actionButtonTypes;
  icon?: ReactNode;
}

/**
 * Componente de botón de acción que muestra un icono y un tooltip descriptivo.
 *
 * @component
 * @param {ActionButtonProps} props - Propiedades del botón de acción.
 * @param {actionButtonTypes} props.mode - Define el tipo de acción que representa el botón.
 * @param {ReactNode} [props.icon] - Icono personalizado opcional para el botón.
 * @returns {JSX.Element} Un botón interactivo con un icono y tooltip descriptivo.
 */
const ActionButton: React.FC<ActionButtonProps> = ({ mode, icon, ...props }) => {
  return (
    <Tooltip title={labelMap[mode]}>
      <IconButton {...props}>{icon || iconMap[mode]}</IconButton>
    </Tooltip>
  );
};

export default ActionButton;
