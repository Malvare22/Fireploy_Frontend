import useSearch from "@modules/general/hooks/useSearch";
import TablaSolicitudes from "@modules/usuarios/components/tablaSolicitudes";
import { labelSolicitudes } from "@modules/usuarios/enum/labelSolicitudes";
import { getDatesSolicitudes, Solicitud, } from "@modules/usuarios/types/solicitud.promover";
import { Divider, Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { useEffect, useMemo, useState } from "react";
import { adaptSolicitudService } from "@modules/usuarios/utils/adapt.solicitudes";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { getSolicitudesService } from "@modules/general/services/get.solicitud";
import { useFilters } from "@modules/general/hooks/useFilters";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";

/**
 * VistaSolicitudes component – Displays a list of solicitudes (requests) with search, filtering, and loading features.
 * 
 * This component fetches solicitudes data, renders a loading state while data is being fetched, and 
 * allows filtering based on various conditions such as state, reception date, and answer date. It also 
 * supports searching for specific solicitudes by user ID or name. If an error occurs during data fetching, 
 * an error dialog is shown.
 * 
 * @component
 * 
 * @param {undefined} - No parameters are passed to the component.
 * 
 * @returns {JSX.Element} A list of solicitudes with search, filter options, and a table displaying the filtered results.
 * 
 * @example
 * ```tsx
 * <VistaSolicitudes />
 * ```
 */
function VistaSolicitudes() {
  // 🔍 Search and filter hooks
  const { searchValue, setSearchValue, filteredData: filterDataFunction } = useSearch();
  const { filterDataFn, handleFilter, filters } = useFilters();

  // 🗂️ State for solicitudes
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);

  // 🔐 Auth context for token
  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  // 📦 React Query: fetch solicitudes
  const { data, isLoading, error, isSuccess } = useQuery({
    queryFn: () => getSolicitudesService(token, {tipo: 1}),
    queryKey: ["Solicitudes"],
  });

  // 🛠️ Adapt and store fetched solicitudes
  useEffect(() => {
    if (isSuccess && data) {
      setSolicitudes(data.map((solicitud) => adaptSolicitudService(solicitud)));
    }
  }, [isSuccess, data]);

  // 🛑 Handle fetch errors
  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  // 🔍 Filtered data with conditions and search
  const solicitudesToRender = useMemo(() => {
    const y = searchValue.toLowerCase();
    return filterDataFunction(
      filterDataFn(solicitudes) as Solicitud[],
      (items: Solicitud[]) => {
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
          if (value !== "") handleFilter("usuario.fechaRecepcion", (x: any) => x === value);
          else handleFilter("usuario.fechaRecepcion", (_x: any) => true);
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
          if (value !== "") handleFilter("usuario.fechaAceptacion", (x: any) => x === value);
          else handleFilter("usuario.fechaAceptacion", (_x: any) => true);
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
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />

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
                  if (value !== "") handleFilter("estado", (x: any) => x === value);
                  else handleFilter("estado", (_x: any) => true);
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
          <TablaSolicitudes solicitudes={solicitudesToRender} tipo={1}/>
        </Stack>
      )}
    </>
  );
}

export default VistaSolicitudes;
