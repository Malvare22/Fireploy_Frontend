import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  view: boolean;
  setView: React.Dispatch<boolean>;
  message: string;
  success: boolean;
};

/**
 * Componente de notificación emergente (Snackbar) con mensaje de éxito o error.
 *
 * @param {boolean} view - Indica si el Snackbar está visible.
 * @param {React.Dispatch<boolean>} setView - Función para actualizar la visibilidad del Snackbar.
 * @param {string} message - Mensaje que se mostrará en la alerta.
 * @param {boolean} success - Determina si el mensaje es de éxito (`true`) o error (`false`).
 * @returns {JSX.Element} Componente de Snackbar.
 */
export default function SnackBar({ view, setView, message, success }: Props) {
  /**
   * Maneja el cierre del Snackbar.
   *
   * @param {React.SyntheticEvent | Event} [_event] - Evento que dispara el cierre.
   * @param {SnackbarCloseReason} [reason] - Razón del cierre (ej. "clickaway").
   */
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setView(false);
  };

  /**
   * Determina el tipo de alerta a mostrar.
   *
   * @returns {string} `"success"` si `success` es `true`, de lo contrario `"error"`.
   */
  const successV = () => (success == true ? "success" : "error");

  return (
    <Snackbar open={view} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={successV()}
        variant="filled"
        sx={{ width: "100%", color: "white" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
