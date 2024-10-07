import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Props = {
  status: boolean,
  init: boolean,
  msg: string
}
export default function NotificationMsg({status, init, msg}: Props) {
  const [open, setOpen] = React.useState(init);


  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={status ? 'success': 'error'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
