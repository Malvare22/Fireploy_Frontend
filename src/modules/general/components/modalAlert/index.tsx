import { Box, Button, Typography } from "@mui/material";
import CustomModal from "../../../general/components/modal";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  action?: void;
  message: string
}

function ModalAlert({ open, setOpen, message, action }: Props) {
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography id="transition-modal-title" variant="h5" component="h2">
          {message}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4
        }}
      >
        <Box sx={{ marginRight: 4 }}>
          <Button variant="action">{'Aceptar'}</Button>
        </Box>
        <Box>
          <Button variant="cancel" onClick={() => setOpen(false)}>
            {'Cancelar'}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
}

export default ModalAlert;
