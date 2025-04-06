import useSearch from "@modules/general/hooks/useSearch";
import TablaSolicitudes from "@modules/usuarios/components/promover";
import { labelSolicitudes } from "@modules/usuarios/enum/labelSolicitudes";
import { getDatesSolicitudes, SolicitudPromover } from "@modules/usuarios/types/solicitud.promover";
import { Divider, Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { useFiltersByConditions } from "@modules/general/hooks/useFiltersByCondition";
import { useContext, useEffect, useMemo, useState } from "react";
import useQuery from "@modules/general/hooks/useQuery";
import { SolicitudService } from "@modules/usuarios/types/solicitud.service";
import { getSolicitudesServices } from "@modules/usuarios/services/get.solicitud";
import AlertDialog from "@modules/general/components/alertDialog";
import { adaptSolicitudService } from "@modules/usuarios/utils/adapt.solicitudes";
import { useAuth } from "@modules/general/context/accountContext";

function VistaSolicitudes() {
  const { searchValue, setSearchValue, filteredData: filterDataFunction } = useSearch();

  const [solicitudes, setSolicitudes] = useState<SolicitudPromover[]>([]);

  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const { initQuery, error, handleAlertClose, open, message, responseData } = useQuery<
    SolicitudService[]
  >(() => getSolicitudesServices(token));

  useEffect(() => {
    initQuery();
  }, []);

  useEffect(() => {
    if (responseData) setSolicitudes(responseData.map((res) => adaptSolicitudService(res)));
  }, [responseData]);

  const { filterData, toggleFilter, filters } = useFiltersByConditions();

  const solicitudesToRender = useMemo(() => {
    const y = searchValue.toLowerCase();
    return filterDataFunction(
      filterData(solicitudes) as SolicitudPromover[],
      (item: SolicitudPromover[]) => {
        if (y == "") return item;
        return item.filter((solicitud) => {
          const x = (solicitud.id + solicitud.usuario.id + solicitud.usuario.nombres).toLowerCase();
          return x.includes(y);
        });
      }
    );
  }, [searchValue, filters, solicitudes]);

  const selectDatesReceipt = useMemo(() => {
    return (
      <TextField
        select
        size="small"
        variant="standard"
        label={labelSolicitudes.fechaSolicitud}
        fullWidth
        onChange={(e) => {
          const value = e.target.value || "";
          if (value != "") toggleFilter("usuario.fechaRecepcion", (x: any) => x == value);
          else toggleFilter("usuario.fechaRecepcion", (_x: any) => true);
        }}
        defaultValue={""}
      >
        <MenuItem value="">{labelSelects.noAplicar}</MenuItem>
        {getDatesSolicitudes(solicitudes, "fechaRecepcion").map((element) => (
          <MenuItem value={element}>{element}</MenuItem>
        ))}
      </TextField>
    );
  }, [solicitudes]);

  const selectDatesAnswer = useMemo(() => {
    return (
      <TextField
        select
        size="small"
        variant="standard"
        label={labelSolicitudes.fechaAceptacion}
        fullWidth
        onChange={(e) => {
          const value = e.target.value || "";
          if (value != "") toggleFilter("usuario.fechaAceptacion", (x: any) => x == value);
          else toggleFilter("usuario.fechaAceptacion", (_x: any) => true);
        }}
        defaultValue={""}
      >
        <MenuItem value="">{labelSelects.noAplicar}</MenuItem>
        {getDatesSolicitudes(solicitudes, "fechaAceptacion").map((element) => (
          <MenuItem value={element}>{element}</MenuItem>
        ))}
      </TextField>
    );
  }, [solicitudes]);

  return (
    <>
      {error && (
        <AlertDialog
          handleAccept={handleAlertClose}
          open={open}
          title="Consultar Solicitudes"
          textBody={message}
        />
      )}
      <Stack spacing={3}>
        <Stack>
          <Typography variant="h4">{labelSolicitudes.solicitudes}</Typography>
          <Divider />
        </Stack>
        <Grid2 container>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <TextFieldSearch
              setSearchValue={setSearchValue}
              label={labelSolicitudes.buscarSolicitud}
              fullWidth
            />
          </Grid2>
        </Grid2>
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
                console.log(value);
                if (value != "") toggleFilter("estado", (x: any) => x == value);
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
        <TablaSolicitudes solicitudes={solicitudesToRender} />
      </Stack>
    </>
  );
}

export default VistaSolicitudes;
