import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { FilterOptions, SelectFilters } from "@modules/general/components/selects";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import TablaNotificaciones from "@modules/usuarios/components/tablaNotificaciones";
import { labelNotificaciones } from "@modules/usuarios/enum/labelNotificaciones";
import { getNotificaciones } from "@modules/usuarios/services/get.notificaciones";
import { NotificationMessage } from "@modules/usuarios/types/notification";
import { Alert, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function NotificacionesView() {
  const { id, token } = useAuth().accountInformation;

  const { handleAccept, message, open, showDialog, title, type } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const filters: FilterOptions = [
    {
      key: "visto",
      label: "Leído",
      options: [
        ["Leídos", (x) => x],
        ["No leídos", (x) => !x],
      ],
    },
  ];

  const [buffer, setBuffer] = useState<NotificationMessage[]>([]);

  const {
    data: notificaciones,
    error,
    isPending,
  } = useQuery({
    queryFn: () => getNotificaciones(id, token),
    queryKey: ["Notificaciones", id, token],
  });

  useEffect(() => {
    if (!error) return;
    setError(error);
  }, [error]);

  useEffect(() => {
    if (notificaciones) setBuffer(notificaciones);
  }, [notificaciones]);

  console.log(buffer);

  return (
    <>
      {isPending ? (
        <LoaderElement />
      ) : (
        <>
          <AlertDialog
            handleAccept={handleAccept}
            open={open}
            title={title}
            textBody={message}
            type={type}
          />
          <Stack spacing={3}>
            <Typography variant="h4">{labelNotificaciones.tituloVista}</Typography>
            {notificaciones && (
              <SelectFilters
                data={notificaciones}
                filterOptions={filters}
                setRefineData={setBuffer}
              />
            )}
            {buffer.length > 0 ? (
              <TablaNotificaciones notificacionesBase={buffer} />
            ) : (
              <Alert severity="info">
                No se han encontrado notificaciones (revisa los filtros)
              </Alert>
            )}
          </Stack>
        </>
      )}
    </>
  );
}

export default NotificacionesView;
