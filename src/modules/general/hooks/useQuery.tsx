import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { rutasGeneral } from "../router/router";
import { ApiResponse } from "@core/services";

/**
 * Hook para manejar consultas asíncronas con opciones de confirmación y mensajes de éxito/error.
 */
export default function useQuery<T>(
  query: () => Promise<ApiResponse<T>>,
  withReload?: boolean,
  successMessage?: string,
) {
  const navigate = useNavigate();

  const [handleAlertClose, setHandleAlertClose] = useState<() => void>(
    () => {}
  );

  const [responseData, setResponseData] = useState<T | undefined>(undefined);

  const [message, setMessage] = useState<string>('');

  const [open, setOpen] = useState(false);
  
  const handleClose = () => setOpen(false);
  /**
   * Manejo del cierre de la alerta
   */
  const onCloseAlert = useCallback(
    (statusCode: number | undefined) => {
      setOpen(false);
      if (statusCode === undefined) {
        if (withReload) window.location.reload();
      }
      if (statusCode === 401) {
        navigate(rutasGeneral.login);
      }
    },
    [navigate, withReload]
  );

  /**
   * Ejecución de la consulta asíncrona
   */
  const queryResponse = useCallback(async () => {
    const response = await query();
    setHandleAlertClose(() => () => onCloseAlert(response.error?.statusCode));
    if(response.data) setMessage(successMessage ?? '');
    else setMessage(response.error?.message ?? '');

    setResponseData(response.data);
    setOpen(true);
  }, [query, onCloseAlert]);

  /**
   * Inicialización del proceso de consulta
   */
  const initQuery = async () => {
    await queryResponse();
  };

  return { responseData, open, initQuery, handleAlertClose, setOpen, handleClose, message };
}
