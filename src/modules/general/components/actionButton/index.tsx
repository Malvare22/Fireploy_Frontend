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
 * The icons represent various actions such as view, edit, delete, etc.
 *
 * @type {Record<actionButtonTypes, ReactNode>}
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
 * These labels describe the action when hovered over in a tooltip.
 *
 * @type {Record<actionButtonTypes, string>}
 */
const labelMap = {
  [actionButtonTypes.ver]: "Ver",
  [actionButtonTypes.editar]: "Editar",
  [actionButtonTypes.eliminar]: "Eliminar",
  [actionButtonTypes.habilitarUsuario]: "Habilitar usuario",
  [actionButtonTypes.deshabilitarUsuario]: "Deshabilitar usuario",
  [actionButtonTypes.habilitar]: "Habilitar",
  [actionButtonTypes.deshabilitar]: "Deshabilitar",
  [actionButtonTypes.cancelar]: "Cancelar",
  [actionButtonTypes.guardar]: "Guardar",
};

/**
 * @interface ActionButtonProps
 * @extends {IconButtonProps}
 * @property {actionButtonTypes} mode - Type of action represented by the button.
 * Defines what action this button will perform (e.g., view, edit, delete, etc.).
 * @property {ReactNode} [icon] - Optional custom icon for the button. If provided, it overrides the default icon based on the mode.
 */
interface ActionButtonProps extends IconButtonProps {
  mode: actionButtonTypes;
  icon?: ReactNode;
}

/**
 * Action button component that displays an icon and a descriptive tooltip.
 * This component renders a button with an icon and a tooltip that explains the action.
 * 
 * The icon and label are automatically determined by the `mode` prop.
 * 
 * @component
 * @param {ActionButtonProps} props - The properties for this action button.
 * @param {actionButtonTypes} props.mode - The action this button represents (view, edit, delete, etc.).
 * @param {ReactNode} [props.icon] - A custom icon for the button (optional).
 * @returns {JSX.Element} An interactive button with an icon and a tooltip.
 * 
 * @example
 * ```tsx
 * <ActionButton mode={actionButtonTypes.ver} />
 * ```
 */
const ActionButton: React.FC<ActionButtonProps> = ({ mode, icon, ...props }) => {
  return (
    <Tooltip title={labelMap[mode]}>
      <IconButton {...props}>{icon || iconMap[mode]}</IconButton>
    </Tooltip>
  );
};

export default ActionButton;
