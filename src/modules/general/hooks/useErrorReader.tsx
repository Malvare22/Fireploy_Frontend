import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CustomError } from "../components/alertDialogError";
import { rutasGeneral } from "../router/router";
import { ShowDialogParams } from "./useAlertDialog2";



type ShowDialogFn = (params: ShowDialogParams) => void;

/**
 * Hook para manejar errores centralizados, recibiendo una función showDialog en la inicialización.
 *
 * @param showDialog - Función que muestra el diálogo.
 */
function useErrorReader(showDialog: ShowDialogFn) {
  const [error, setError] = useState<CustomError | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!error) return;

    showDialog({
      type: "error",
      title: "Error",
      message: error.message,
      isLoading: false,
      onAccept: () => {
        if (error.statusCode === 401) {
          localStorage.clear();
          navigate(rutasGeneral.login);
        }
      },
      onClose: () => {
        setError(null);
      },
      reload: false
    });
  }, [error]);

  return {
    setError,
  };
}

export default useErrorReader;
