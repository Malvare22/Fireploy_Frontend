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
 * This map links each button type to its corresponding Material-UI icon.
 * 
 * @constant
 * @type {Record<string, ReactNode>}
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
 * This map provides the label (text) for each button type in the appropriate language.
 * 
 * @constant
 * @type {Record<string, string>}
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
 * @property {buttonTypes} mode - The type of button to render, determining the icon and label.
 * @property {boolean} [withIcon=true] - If `true`, displays the icon associated with the button type.
 * @property {ReactNode} [icon] - Custom icon to use instead of the default one.
 */
interface GeneralButtonProps extends ButtonProps {
  mode: buttonTypes;
  withIcon?: boolean;
  icon?: ReactNode;
}

/**
 * GeneralButton Component
 *
 * Renders a Material-UI button with an icon and label based on the selected button type.
 * The button type determines the icon and label that will be displayed. Custom icons 
 * can be provided to replace the default ones.
 *
 * @component
 * @param {GeneralButtonProps} props - Component properties.
 * @param {buttonTypes} props.mode - Defines the button type, which determines the icon and label.
 * @param {boolean} [props.withIcon=true] - If `true`, the button displays an icon.
 * @param {ReactNode} [props.icon] - Custom icon to replace the default one.
 * @returns {JSX.Element} A Material-UI button component.
 *
 * @example
 * ```tsx
 * <GeneralButton mode={buttonTypes.save} />
 * ```
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
 * @property {React.ReactNode} children - The buttons to be displayed inside the container.
 */
interface ButtonContainerProps {
  children: React.ReactNode;
}

/**
 * ButtonContainer Component
 *
 * A flexible container component that groups buttons together and defines their layout.
 * It renders the children (buttons) passed to it in a row with flexbox styling.
 *
 * @component
 * @param {ButtonContainerProps} props - Component properties.
 * @param {React.ReactNode} props.children - Buttons to be rendered inside the container.
 * @returns {JSX.Element} A box containing the grouped buttons.
 *
 * @example
 * ```tsx
 * <ButtonContainer>
 *   <GeneralButton mode={buttonTypes.add} />
 *   <GeneralButton mode={buttonTypes.cancel} />
 * </ButtonContainer>
 * ```
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
