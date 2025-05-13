import LoaderElement from "@modules/general/components/loaderElement";
import { FilterOptions, SelectFilters } from "@modules/general/components/selects";
import { useNotificationContext } from "@modules/general/context/notificationContext";
import TablaNotificaciones from "@modules/usuarios/components/tablaNotificaciones";
import { labelNotificaciones } from "@modules/usuarios/enum/labelNotificaciones";
import { NotificationMessage } from "@modules/usuarios/types/notification";
import { Alert, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function NotificacionesView() {
  const { isPending, notificaciones, refetch } = useNotificationContext();

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

  useEffect(() => {
    if (notificaciones) setBuffer(notificaciones);
  }, [notificaciones]);

  return (
    <>
      {isPending ? (
        <LoaderElement />
      ) : (
        <>
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
              <TablaNotificaciones notificaciones={buffer} refetch={refetch} />
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
