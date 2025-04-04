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
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

/**
 * Map of icons associated with each action type.
 */
const iconMap = {
  [actionButtonTypes.ver]: <VisibilityIcon />,
  [actionButtonTypes.editar]: <EditIcon />,
  [actionButtonTypes.eliminar]: <DeleteIcon />,
  [actionButtonTypes.habilitarUsuario]: <FaceIcon />,
  [actionButtonTypes.deshabilitarUsuario]: <FaceRetouchingOffIcon />,
  [actionButtonTypes.habilitar]: <DoNotDisturbOffIcon />,
  [actionButtonTypes.deshabilitar]: <DoDisturbOnIcon />,
  [actionButtonTypes.cancelar]: <CancelIcon />,
  [actionButtonTypes.guardar]: <SaveIcon />,
};

/**
 * Map of labels associated with each action type.
 */
const labelMap = {
  [actionButtonTypes.ver]: "ver",
  [actionButtonTypes.editar]: "editar",
  [actionButtonTypes.eliminar]: "eliminar",
  [actionButtonTypes.habilitarUsuario]: "habilitar usuario",
  [actionButtonTypes.deshabilitarUsuario]: "deshabilitar usuario",
  [actionButtonTypes.habilitar]: "habilitar",
  [actionButtonTypes.deshabilitar]: "deshabilitar",
  [actionButtonTypes.cancelar]: "cancelar",
  [actionButtonTypes.guardar]: "guardar",
};

/**
 * @interface ActionButtonProps
 * @extends {IconButtonProps}
 * @property {actionButtonTypes} mode - Type of action represented by the button.
 * @property {ReactNode} [icon] - Optional custom icon for the button.
 */
interface ActionButtonProps extends IconButtonProps {
  mode: actionButtonTypes;
  icon?: ReactNode;
}

/**
 * Action button component that displays an icon and a descriptive tooltip.
 *
 * @component
 * @param {ActionButtonProps} props - Action button properties.
 * @param {actionButtonTypes} props.mode - Defines the type of action represented by the button.
 * @param {ReactNode} [props.icon] - Optional custom icon for the button.
 * @returns {JSX.Element} An interactive button with an icon and a descriptive tooltip.
 */
const ActionButton: React.FC<ActionButtonProps> = ({ mode, icon, ...props }) => {
  return (
    <Tooltip title={labelMap[mode]}>
      <IconButton {...props}>{icon || iconMap[mode]}</IconButton>
    </Tooltip>
  );
};

export default ActionButton;
