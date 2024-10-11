import { Box, Button, Typography } from "@mui/material";
import CustomModal from "../../../general/components/modal";
import { UserListLabel } from "../../enums/userListLabel";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  id: number;
  action?: void;
}

function ModalRemoveUser({ open, setOpen, id, action }: Props) {
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography id="transition-modal-title" variant="h5" component="h2">
          {`${UserListLabel.confirm} (${id})`}
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
          <Button variant="action">{UserListLabel.accept}</Button>
        </Box>
        <Box>
          <Button variant="cancel" onClick={() => setOpen(false)}>
            {UserListLabel.cancel}
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
}

export default ModalRemoveUser;
