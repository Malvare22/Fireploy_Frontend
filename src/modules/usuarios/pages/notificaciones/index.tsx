import LoaderElement from "@modules/general/components/loaderElement";
import { FilterOptions, SelectFilters } from "@modules/general/components/selects";
import TransitionAlert from "@modules/general/components/transitionAlert";
import { useNotificationContext } from "@modules/general/context/notificationContext";
import TablaNotificaciones from "@modules/usuarios/components/tablaNotificaciones";
import { labelNotificaciones } from "@modules/usuarios/enum/labelNotificaciones";
import { NotificationMessage } from "@modules/usuarios/types/notification";
import { Alert, Box, Link, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * `NotificacionesView` – React component for displaying and filtering user notifications.
 *
 * This view fetches notification messages using the `useNotificationContext` hook, displays
 * a loader while loading, and shows the data in a filterable table format.
 *
 * Features include:
 * - Filter options for read/unread notifications
 * - Contextual alert linking to documentation for error codes
 * - Fallback alert when no notifications match the selected filters
 *
 * @component
 *
 * @returns {JSX.Element} A component that renders a filterable list of user notifications.
 *
 * @example
 * ```tsx
 * <NotificacionesView />
 * ```
 */
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
        <Box>
          <TransitionAlert severity="info">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography>{"¿Tienes dudas sobre los códigos de errores? Entra a:"}</Typography>
              <Link href="https://app103.proyectos.fireploy.online/docs/proyecto/codigos-error" target="_blank">
                {"Documentación de errores"}
              </Link>
            </Box>
          </TransitionAlert>
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
        </Box>
      )}
    </>
  );
}

export default NotificacionesView;
