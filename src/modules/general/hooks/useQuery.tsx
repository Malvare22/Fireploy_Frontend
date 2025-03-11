import { ApiResponse } from "@core/services";
import AlertDialog from "../components/alertDialog";
import useAlertDialog from "./useAlertDialog";
import { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { rutasGeneral } from "../router/router";
import { LabelDialog } from "../enums/labelDialog";
import GeneralButton, { ButtonContainer } from "../components/buttons";
import { buttonTypes } from "../types/buttons";

/**
 * Hook para manejar consultas asíncronas con opciones de confirmación y mensajes de éxito/error.
 *
 * @template T - Tipo de datos esperados en la respuesta.
 * @param {() => Promise<ApiResponse<T>>} query - Función que ejecuta la consulta.
 * @param {string} title - Título del cuadro de diálogo de confirmación.
 * @param {boolean} withConfirmation - Indica si se debe mostrar un cuadro de confirmación antes de ejecutar la consulta.
 * @param {boolean} withSuccessMessage - Indica si se debe mostrar un mensaje de éxito tras una consulta exitosa.
 * @param {string} confirmationText - Texto opcional para el mensaje de confirmación.
 * @param {boolean} withReload - Indica si se debe recargar la página después de cerrar el cuadro de diálogo.
 *
 * @returns {{
 *   responseData: T | undefined;
 *   RenderAlertDialog: () => JSX.Element;
 *   init: () => Promise<void>;
 * }} - Retorna los datos de la consulta, el componente de alerta y la función de inicialización.
 */

export default function useQuery<T>(
  query: () => Promise<ApiResponse<T>>,
  title: string,
  withConfirmation: boolean,
  withSuccessMessage: boolean,
  confirmationText?: string,
  withReload?: boolean
) {
  const {
    message,
    open,
    setMessage,
    title: _title,
    setOpen,
    setTitle,
  } = useAlertDialog();

  const [stage, setStage] = useState(0);

  const navigate = useNavigate();

  const [responseData, setResposeData] = useState<T | undefined>(undefined);

  const [alertClose, setAlertClose] = useState<() => void>(() => {});

  /**
   * Establecimiento de lo que va a suceder al aceptar luego de aplicada la consulta
   * En caso de éxito (no se da un código de error), se aplica un refresh de ser deseado
   * En caso de error, se mira el código de error para establecer posibles soluciones
   * @param statusCode Código de la respuesta fallida de la consulta
   */
  const onCloseAlert = (statusCode: number | undefined) => {
    setOpen(false);
    if (statusCode == undefined && withReload) {
      window.location.reload();
    }
    if (statusCode == 401) {
      navigate(rutasGeneral.login);
    }
  };

  /**
   * Ejecución de la consulta
   * @returns resultado de la consulta (data)
   */
  const queryResponse = async () => {
    const response = await query();
    setStage(1);
    setAlertClose(() => () => onCloseAlert(response.error?.statusCode));
    if (response.error) {
      setMessage(response.error.message[0]);
      setTitle(LabelDialog.seHaPresentadoUnError);
      setOpen(true);
    } else {
      if (response.data) {
        setMessage(LabelDialog.guardadoExitoso);
        if (withSuccessMessage) setOpen(true);
        else setOpen(false);
        return setResposeData(response.data);
      }
    }
    return setResposeData(undefined);
  };

  /**
   * Iniciador de la ventana modal, en caso de no ser necesaria confirmación para ejecutar
   * la consulta, se realiza de una vez
   */
  const init = async () => {
    if (!withConfirmation) {
      await queryResponse();
    } else {
      setStage(0);
      setOpen(true);
    }
  };

  /**
   * Elemento visual para aceptar la ejecución de consultas
   * @returns {Component} ventana modal de confirmación para aplicar la consulta
   */
  const ConfirmationModal = () => {
    return (
      <>
        <AlertDialog
          open={open}
          setOpen={setOpen}
          cuerpo={confirmationText}
          titulo={title}
          botones={
            <ButtonContainer _justifyContent="flex-end">
              <Box>
                <GeneralButton
                  mode={buttonTypes.accept}
                  withIcon={false}
                  onClick={() => queryResponse()}
                />
              </Box>
              <Box>
                <GeneralButton
                  mode={buttonTypes.cancel}
                  withIcon={false}
                  onClick={() => setOpen(false)}
                />
              </Box>
            </ButtonContainer>
          }
        />
      </>
    );
  };

  /**
   * Elemento visual para la protección del flujo correcto de información de consultas
   * @returns {Components} ventana modal que muestra si fue correcto o no el resultado
   * de la consulta
   */
  const PostExecutionModal = () => {
    return (
      <>
        <AlertDialog
          open={open}
          setOpen={setOpen}
          cuerpo={message}
          titulo={_title}
          botones={
            <Box>
              <Box>
                <GeneralButton
                  mode={buttonTypes.accept}
                  withIcon={false}
                  onClick={alertClose}
                />
              </Box>
            </Box>
          }
        />
      </>
    );
  };

  /**
   * Condicionador de la ventana de dialogo pertinente 
   * @returns {component} Ventana de dialogo a mostrar según la fase
   */
  const ValidationRender = () => (
    <>{stage == 0 ? <ConfirmationModal /> : <PostExecutionModal />}</>
  );

  /**
   * Condicionador de renderizado de las ventanas de dialogo 
   * @returns {component} Ventana de dialogo a mostrar según la fase
   */
  const RenderAlertDialog = () => <>{open && <ValidationRender />}</>;

  return { responseData, RenderAlertDialog, init };
}
