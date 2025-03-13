import { Box, Button, ButtonProps } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from '@mui/icons-material/Check';
import { ReactNode } from "react";
import { buttonTypes } from "@modules/general/types/buttons";
import { palette } from "@core/themes";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const iconMap = {
  [buttonTypes.save]: <SaveAsIcon />,
  [buttonTypes.cancel]: <CancelIcon />,
  [buttonTypes.add]: <AddCircleIcon />,
  [buttonTypes.accept]: <CheckIcon />,
  [buttonTypes.remove]: <DeleteSweepIcon />,
};

const labelMap = {
  [buttonTypes.save]: "guardar",
  [buttonTypes.cancel]: "cancelar",
  [buttonTypes.add]: "agregar",
  [buttonTypes.accept]: "aceptar",
  [buttonTypes.remove]: "eliminar",
};

interface GeneralButtonProps extends ButtonProps {
  mode: buttonTypes;
  withIcon?: boolean;
  icon?: ReactNode;
}

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
      sx={{
        backgroundColor: mode == buttonTypes.cancel ? palette.customGrey.main : palette.navbar.main,
      }}
    >
      {labelMap[mode]}
    </Button>
  );
};

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
