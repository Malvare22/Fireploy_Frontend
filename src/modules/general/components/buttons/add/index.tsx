import { ButtonLabel } from "@modules/general/enums/buttonLabel";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Button, ButtonProps } from "@mui/material";

function AddButton(props: ButtonProps) {
  return (
    <Button variant="action" endIcon={<AddCircleOutlineRoundedIcon />} {...props}>
      {ButtonLabel.add}
    </Button>
  );
}

export default AddButton;
