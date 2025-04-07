/**
 * VistaSolicitudes Component
 *
 * This component displays a list of promotion requests ("solicitudes").
 * It includes:
 * - A search bar to filter requests by user ID or name
 * - Dynamic filters by status, request date, and response date
 * - Error handling and loading states via React Query
 *
 * Data is fetched from the backend using an authentication token
 * obtained from the global auth context.
 *
 * @component
 */

import useSearch from "@modules/general/hooks/useSearch";
import TablaSolicitudes from "@modules/usuarios/components/promover";
import { labelSolicitudes } from "@modules/usuarios/enum/labelSolicitudes";
import { getDatesSolicitudes, SolicitudPromover } from "@modules/usuarios/types/solicitud.promover";
import { Divider, Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { useFiltersByConditions } from "@modules/general/hooks/useFiltersByCondition";
import { useEffect, useMemo, useState } from "react";
import { adaptSolicitudService } from "@modules/usuarios/utils/adapt.solicitudes";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import AlertDialogError from "@modules/general/components/alertDialogError";
import { getSolicitudesService } from "@modules/usuarios/services/get.solicitud";

function VistaSolicitudes() {
  // 🔍 Search and filter hooks
  const { searchValue, setSearchValue, filteredData: filterDataFunction } = useSearch();
  const { filterData, toggleFilter, filters } = useFiltersByConditions();

  // 🗂️ State for solicitudes
  const [solicitudes, setSolicitudes] = useState<SolicitudPromover[]>([]);

  // 🔐 Auth context for token
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  // ⚠️ Alert dialog handling
  const {
    open: openFetchSolicitudes,
    handleClose: handleCloseFetchSolicitudes,
    handleOpen: handleOpenFetchSolicitudes,
  } = useAlertDialog();

  // 📦 React Query: fetch solicitudes
  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryFn: () => getSolicitudesService(token),
    queryKey: ["solicitudes"],
  });

  // 🛠️ Adapt and store fetched solicitudes
  useEffect(() => {
    if (isSuccess && data) {
      setSolicitudes(data.map((solicitud) => adaptSolicitudService(solicitud)));
    }
  }, [isSuccess, data]);

  // 🛑 Handle fetch errors
  useEffect(() => {
    if (isError && error) handleOpenFetchSolicitudes();
  }, [isError, error]);

  // 🔍 Filtered data with conditions and search
  const solicitudesToRender = useMemo(() => {
    const y = searchValue.toLowerCase();
    return filterDataFunction(
      filterData(solicitudes) as SolicitudPromover[],
      (items: SolicitudPromover[]) => {
        if (y === "") return items;
        return items.filter((solicitud) => {
          const x = (solicitud.id + solicitud.usuario.id + solicitud.usuario.nombres).toLowerCase();
          return x.includes(y);
        });
      }
    );
  }, [searchValue, filters, solicitudes]);

  // 📅 Filter select by reception date
  const selectDatesReceipt = useMemo(
    () => (
      <TextField
        select
        size="small"
        variant="standard"
        label={labelSolicitudes.fechaSolicitud}
        fullWidth
        onChange={(e) => {
          const value = e.target.value || "";
          if (value !== "") toggleFilter("usuario.fechaRecepcion", (x: any) => x === value);
          else toggleFilter("usuario.fechaRecepcion", (_x: any) => true);
        }}
        defaultValue={""}
      >
        <MenuItem value="">{labelSelects.noAplicar}</MenuItem>
        {getDatesSolicitudes(solicitudes, "fechaRecepcion").map((date) => (
          <MenuItem value={date} key={date}>
            {date}
          </MenuItem>
        ))}
      </TextField>
    ),
    [solicitudes]
  );

  // 📅 Filter select by answer date
  const selectDatesAnswer = useMemo(
    () => (
      <TextField
        select
        size="small"
        variant="standard"
        label={labelSolicitudes.fechaAceptacion}
        fullWidth
        onChange={(e) => {
          const value = e.target.value || "";
          if (value !== "") toggleFilter("usuario.fechaAceptacion", (x: any) => x === value);
          else toggleFilter("usuario.fechaAceptacion", (_x: any) => true);
        }}
        defaultValue={""}
      >
        <MenuItem value="">{labelSelects.noAplicar}</MenuItem>
        {getDatesSolicitudes(solicitudes, "fechaAceptacion").map((date) => (
          <MenuItem value={date} key={date}>
            {date}
          </MenuItem>
        ))}
      </TextField>
    ),
    [solicitudes]
  );

  return (
    <>
      {/* 🧨 Error Dialog */}
      {error && (
        <AlertDialogError
          handleClose={handleCloseFetchSolicitudes}
          open={openFetchSolicitudes}
          title="Consultar Solicitudes"
          error={error}
        />
      )}

      {/* 🔄 Loading */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={3}>
          <Stack>
            <Typography variant="h4">{labelSolicitudes.solicitudes}</Typography>
            <Divider />
          </Stack>

          {/* 🔍 Search Bar */}
          <Grid2 container>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFieldSearch
                setSearchValue={setSearchValue}
                label={labelSolicitudes.buscarSolicitud}
                fullWidth
              />
            </Grid2>
          </Grid2>

          {/* ⛳ Filters */}
          <Grid2 container columnSpacing={4}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextField
                select
                size="small"
                label={labelSolicitudes.estado}
                variant="standard"
                fullWidth
                onChange={(e) => {
                  const value = e.target.value || "";
                  if (value !== "") toggleFilter("estado", (x: any) => x === value);
                  else toggleFilter("estado", (_x: any) => true);
                }}
                defaultValue={""}
              >
                <MenuItem value="">{labelSelects.noAplicar}</MenuItem>
                <MenuItem value="A">{labelSelects.aprobada}</MenuItem>
                <MenuItem value="P">{labelSelects.pendiente}</MenuItem>
                <MenuItem value="R">{labelSelects.rechazada}</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>{selectDatesAnswer}</Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>{selectDatesReceipt}</Grid2>
          </Grid2>

          {/* 📄 Solicitudes Table */}
          <TablaSolicitudes solicitudes={solicitudesToRender} />
        </Stack>
      )}
    </>
  );
}

export default VistaSolicitudes;
