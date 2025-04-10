import { Box, Button, ButtonProps } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { ReactNode } from "react";
import { buttonTypes } from "@modules/general/types/buttons";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import LoginIcon from "@mui/icons-material/Login";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

/**
 * Map of icons associated with each button type.
 */
const iconMap = {
  [buttonTypes.save]: <SaveAsIcon />,
  [buttonTypes.cancel]: <CancelIcon />,
  [buttonTypes.add]: <AddCircleIcon />,
  [buttonTypes.accept]: <CheckIcon />,
  [buttonTypes.remove]: <DeleteSweepIcon />,
  [buttonTypes.login]: <LoginIcon />,
  [buttonTypes.next]: <NavigateNextIcon />,
};

/**
 * Map of labels associated with each button type.
 */
const labelMap = {
  [buttonTypes.save]: "guardar",
  [buttonTypes.cancel]: "cancelar",
  [buttonTypes.add]: "agregar",
  [buttonTypes.accept]: "aceptar",
  [buttonTypes.remove]: "eliminar",
  [buttonTypes.login]: "iniciar sesión",
  [buttonTypes.next]: "siguiente",
};

/**
 * @interface GeneralButtonProps
 * @description Properties for the GeneralButton component.
 * @extends {ButtonProps}
 * @property {buttonTypes} mode - The type of button to render.
 * @property {boolean} [withIcon=true] - Determines whether the button should display an icon.
 * @property {ReactNode} [icon] - Custom icon to display instead of the default one.
 */
interface GeneralButtonProps extends ButtonProps {
  mode: buttonTypes;
  withIcon?: boolean;
  icon?: ReactNode;
}

/**
 * GeneralButton Component
 *
 * Renders a styled button with an icon and label based on the selected button type.
 *
 * @component
 * @param {GeneralButtonProps} props - Component properties.
 * @param {buttonTypes} props.mode - Defines the type of button.
 * @param {boolean} [props.withIcon=true] - Determines whether an icon should be displayed.
 * @param {ReactNode} [props.icon] - Custom icon to use instead of the predefined one.
 * @returns {JSX.Element} A button component.
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
      endIcon={withIcon && (icon || iconMap[mode])}
      variant="contained"
    >
      {labelMap[mode]}
    </Button>
  );
};

/**
 * @interface ButtonContainerProps
 * @description Properties for the ButtonContainer component.
 * @property {React.ReactNode} children - Buttons to be displayed inside the container.
 */
interface ButtonContainerProps {
  children: React.ReactNode;
}

/**
 * ButtonContainer Component
 *
 * A flexible container for grouping buttons with defined spacing.
 *
 * @component
 * @param {ButtonContainerProps} props - Component properties.
 * @param {React.ReactNode} props.children - Buttons to be displayed inside the container.
 * @returns {JSX.Element} A button container.
 */
export const ButtonContainer: React.FC<ButtonContainerProps> = ({
  children,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      width: "100%",
    }}
  >
    {children}
  </Box>
);

export default GeneralButton;
