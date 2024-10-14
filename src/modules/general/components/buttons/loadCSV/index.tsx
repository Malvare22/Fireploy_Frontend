import { ButtonLabel } from "@modules/general/enums/buttonLabel";
import { Button, ButtonProps } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

function LoadCSVButton(props: ButtonProps) {
  return (
    <Button variant="action" endIcon={<NoteAddIcon />} {...props}>
      {ButtonLabel.loadCSV}
    </Button>
  );
}

export default LoadCSVButton;
