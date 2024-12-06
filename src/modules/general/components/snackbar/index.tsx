import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Props = {
  view: boolean,
  setView: React.Dispatch<boolean>,
  message: string,
  success: boolean
}
export default function SnackBar({view, setView, message, success}: Props) {

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setView(false);
  };

  const successV = () => (success == true ? 'success': 'error')

  return (
    <Snackbar open={view} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={successV()}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
