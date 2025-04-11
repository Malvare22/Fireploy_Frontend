import { useNavigate } from "react-router";
import { CustomError } from "../components/alertDialogError";
import { rutasGeneral } from "../router/router";
import useAlertDialog from "./useAlertDialog";
import { useEffect, useMemo, useState } from "react";

function useErrorReader() {
  const [error, setError] = useState<CustomError | null>(null);

  const errorMessage = useMemo(() => {
    return error?.message;
  }, [error]);

  const {
    handleClose: handleCloseError,
    handleOpen: handleOpenError,
    open: openError,
  } = useAlertDialog();

  useEffect(() => {
    if (error) handleOpenError();
  }, [error]);

  const navigate = useNavigate();

  function onCloseError() {
    if (error?.statusCode == 401) {
      localStorage.clear();
      navigate(rutasGeneral.login);
    } else handleCloseError();
  }

  return {
    errorMessage,
    setError,
    onCloseError,
    openError,
  };
}

export default useErrorReader;
