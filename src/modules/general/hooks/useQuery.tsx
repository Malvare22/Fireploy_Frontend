import { useState, useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { rutasGeneral } from "../router/router";
import { LabelDialog } from "../enums/labelDialog";
import { ApiResponse } from "@core/services";
import useAlertDialog from "./useAlertDialog";

/**
 * Estado inicial del hook
 */
const initialState = {
  stage: 0,
  responseData: undefined,
};

/**
 * Reducer para manejar el estado del hook
 */
function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_STAGE":
      return { ...state, stage: action.payload };
    case "SET_RESPONSE":
      return { ...state, responseData: action.payload };
    default:
      return state;
  }
}

/**
 * Hook para manejar consultas asíncronas con opciones de confirmación y mensajes de éxito/error.
 */
export default function useQuery<T>(
  query: () => Promise<ApiResponse<T>>,
  title: string,
  withConfirmation: boolean,
  withSuccessMessage: boolean,
  confirmationText?: string,
  withReload?: boolean,
  successAction?: () => void,
  customContent?: React.ReactNode
) {
  const { message, open, setMessage, title: _title, setOpen, setTitle } = useAlertDialog();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const [alertClose, setAlertClose] = useState<() => void>(() => {});

  /**
   * Manejo del cierre de la alerta
   */
  const onCloseAlert = useCallback(
    (statusCode: number | undefined) => {
      setOpen(false);
      if (statusCode === undefined) {
        if (withReload) window.location.reload();
        if (successAction) successAction();
      }
      if (statusCode === 401) {
        navigate(rutasGeneral.login);
      }
    },
    [setOpen, navigate, withReload, successAction]
  );

  /**
   * Ejecución de la consulta asíncrona
   */
  const queryResponse = useCallback(async () => {
    const response = await query();
    dispatch({ type: "SET_STAGE", payload: 1 });
    setAlertClose(() => () => onCloseAlert(response.error?.statusCode));

    if (response.error) {
      setMessage(response.error.message);
      setTitle(LabelDialog.seHaPresentadoUnError);
      setOpen(true);
    } else {
      if (response.data) {
        setMessage(LabelDialog.guardadoExitoso);
        if (withSuccessMessage) setOpen(true);
        else setOpen(false);
        dispatch({ type: "SET_RESPONSE", payload: response.data });
      }
    }
  }, [query, setMessage, setTitle, setOpen, withSuccessMessage, onCloseAlert]);

  /**
   * Inicialización del proceso de consulta
   */
  const init = useCallback(async () => {
    if (!withConfirmation) {
      await queryResponse();
    } else {
      dispatch({ type: "SET_STAGE", payload: 0 });
      setOpen(true);
    }
  }, [withConfirmation, queryResponse, setOpen]);

  return { responseData: state.responseData, open, init, queryResponse, alertClose, title, confirmationText, customContent, message };
}
