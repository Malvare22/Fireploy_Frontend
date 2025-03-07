import { ApiResponse } from "@core/services";
import AlertDialog from "../components/alertDialog";
import useAlertDialog from "./useAlertDialog";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { LabelGeneral } from "../enums/labelGeneral";
import { useNavigate } from "react-router-dom";
import { rutasGeneral } from "../router/router";
import { LabelDialog } from "../enums/labelDialog";

export default function useQuery<T>(
  query: () => Promise<ApiResponse<T>>,
  title: string,
  withConfirmation: boolean,
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

  /**
   * -1 Momento No visible (no se llama a la consulta aún)
   * 0 Momento previo a la consulta (confirmación)
   * 1 Momento post ejecución
   */
  const [stage, setStage] = useState(0);

  const navigate = useNavigate();

  const [responseData, setResposenData] = useState<T | undefined>(undefined);

  const [alertClose, setAlertClose] = useState<() => void>(() => {});

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
   * Función de ejecución de la consulta
   */
  const queryResponse = async () => {
    const response = await query();
    setStage(1);
    setOpen(true);
    setAlertClose(() => () => onCloseAlert(response.error?.statusCode));
    if (response.error) {
      setMessage(response.error.message[0]);
      setTitle(LabelDialog.seHaPresentadoUnError);
    } else {
      if (response.data) {
        setMessage(LabelDialog.guardadoExitoso);
        return setResposenData(response.data);
      }
    }
    return setResposenData(undefined);
  };

  const init = async () => {
    if (!withConfirmation) {
      await queryResponse();
    } else {
      setStage(0);
      setOpen(true);
    }
  };

  const ConfirmationModal = () => {
    return (
      <>
        <AlertDialog
          open={open}
          setOpen={setOpen}
          cuerpo={confirmationText}
          titulo={title}
          botones={
            <Box>
              <Box>
                <Button onClick={() => queryResponse()}>
                  {LabelGeneral.aceptar}
                </Button>
              </Box>
              <Box>
                <Button onClick={() => setOpen(false)}>
                  {LabelGeneral.cancelar}
                </Button>
              </Box>
            </Box>
          }
        />
      </>
    );
  };

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
                <Button onClick={alertClose}>{LabelGeneral.aceptar}</Button>
              </Box>
            </Box>
          }
        />
      </>
    );
  };

  const ValidationRender = () => (
    <>{stage == 0 ? <ConfirmationModal /> : <PostExecutionModal />}</>
  );

  const RenderAlertDialog = () => <>{open && <ValidationRender />}</>;

  return { responseData, RenderAlertDialog, init };
}
