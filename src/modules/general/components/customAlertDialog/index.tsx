import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

interface Props {
  title: string;
  content: React.ReactNode;
  actions: React.ReactNode;
  open: boolean;
}

const AlertDialogCustom: React.FC<Props> = ({ actions, content, open, title }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{ maxHeight: "70vh", overflowY: "scroll" }}
      >
        <Box>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        </Box>
        <DialogContent>{content}</DialogContent>
        <DialogActions>{actions}</DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialogCustom;
