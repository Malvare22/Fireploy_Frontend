import { Box, Button, ButtonProps } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { LabelButton } from "@modules/general/enums/labelButton";

type ButtonVariant = "save" | "cancel"; // Puedes agregar más variantes si las necesitas.

interface GeneralButtonProps extends ButtonProps {
  deltaVariant: ButtonVariant;
}

const GeneralButton: React.FC<GeneralButtonProps> = ({ deltaVariant, ...props }) => {
  switch (deltaVariant) {
    case "save":
      return (
        <Button {...props} startIcon={<SaveAsIcon />}>
          {LabelButton.guardar}
        </Button>
      );
    case "cancel":
      return <Button {...props}>{LabelButton.cancelar}</Button>;
    default:
      return <Button {...props}>Button</Button>;
  }
};

type ButtonContainerProps = {
  children: React.ReactNode;
  _justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  _spacing?: number; // Permite controlar el espacio entre los botones
};
export const ButtonContainer: React.FC<ButtonContainerProps> = ({
  children,
  _justifyContent = "flex-start", // Valor por defecto
  _spacing = 2
}) => (
  <Box sx={{
    display: 'flex',
    justifyContent: _justifyContent,
    alignItems: 'center',
    gap: _spacing,
    width: '100%'
  }}>
    {children}
  </Box>
);

export default GeneralButton;
