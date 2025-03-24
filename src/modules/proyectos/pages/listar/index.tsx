import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrderSelect";
import LayoutList from "@modules/general/layouts/list";
import ProjectForList from "@modules/proyectos/components/projectForList";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import { labelListarProyecto } from "@modules/proyectos/enum/labelListarProyectos";
import { Proyecto, proyectos } from "@modules/proyectos/types/proyecto.tipo";
import { getDatabaseTypesArray } from "@modules/proyectos/utils/getDatabaseTypes";
import { getDataForSelects } from "@modules/proyectos/utils/getDataForSelects";
import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import {
  Alert,
  Box,
  Button,
  Card,
  colors,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useNavigate } from "react-router-dom";
import { rutasProyectos } from "@modules/proyectos/router";
import useQuery from "@modules/general/hooks/useQuery";

function ListarProyectos() {
  const { filterData, toggleFilter, filters } = useFilters<Proyecto>();
  const { handleRequestSort, orderBy, stableSort } = useOrderSelect<Proyecto>();
  const selectFilters = getDataForSelects(proyectos);

  const navigate = useNavigate();

  // const {error, handleAlertClose, initQuery, message, open, responseData} = useQuery<unknown>();

  const Filters = () => {
    return (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        alignContent={"center"}
      >
        <Box>
          <Typography marginTop={2.5}>
            {labelProjectForList.ordenarPor}
          </Typography>
        </Box>

        <FormControl variant="standard" sx={{ width: { sm: 200, xs: "100%" } }}>
          <InputLabel id="puntuacion-label">
            {labelProjectForList.puntuacion}
          </InputLabel>
          <Select
            labelId="puntuacion-label"
            value={orderBy["calificacion"] ?? ""}
            onChange={(e) =>
              handleRequestSort(
                "calificacion",
                (e.target.value as Order) || undefined
              )
            }
          >
            <MenuItem value="">
              <em>No aplicado</em>
            </MenuItem>
            <MenuItem value="asc">Mayor</MenuItem>
            <MenuItem value="desc">Menor</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ width: { sm: 200, xs: "100%" } }}>
          <InputLabel id="fecha-label">{labelProjectForList.fecha}</InputLabel>
          <Select
            labelId="fecha-label"
            value={orderBy["fechaUltimaModificacion"] ?? ""}
            onChange={(e) =>
              handleRequestSort(
                "fechaUltimaModificacion",
                (e.target.value as Order) || undefined
              )
            }
          >
            <MenuItem value="">
              <em>No aplicado</em>
            </MenuItem>
            <MenuItem value="asc">Mayor</MenuItem>
            <MenuItem value="desc">Menor</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    );
  };

  function CardElement(title: string, text: string, icon: ReactNode) {
    return (
      <Grid2
        container
        direction={"row"}
        sx={{ width: 400, height: 200, padding: 2, alignItems: "center" }}
        component={Paper}
      >
        <Grid2 size={3}>{icon}</Grid2>
        <Grid2 size={9}>
          <Stack spacing={3}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle2">{text}</Typography>
          </Stack>
        </Grid2>
      </Grid2>
    );
  }

  return (
    <Stack spacing={4} paddingBottom={4}>
      <Typography variant="h3" textTransform={'uppercase'} textAlign={'center'}>{labelListarProyecto.proyectos}</Typography>
      <Stack alignItems={'center'}><Alert severity="info" sx={{maxWidth: 500}}>{labelListarProyecto.notificacion}</Alert></Stack>
      <Stack direction={"row"} justifyContent={"center"} spacing={3}>
        <Button disabled sx={{ textTransform: "none", textAlign: "start", opacity: 0.5 }} onClick={() => navigate(rutasProyectos.crear)}>
          {CardElement(
            labelListarProyecto.nuevoProyecto,
            labelListarProyecto.nuevoProyectoParrafo,
            <NoteAddIcon sx={{ fontSize: 64 }} />
          )}
        </Button>
        <Button sx={{ textTransform: "none", textAlign: "start" }} onClick={() => navigate(rutasProyectos.explorar)}>
          {CardElement(
            labelListarProyecto.explorarProyectos,
            labelListarProyecto.explorarProyectosParrafo,
            <TravelExploreIcon sx={{ fontSize: 64 }} />
          )}
        </Button>
      </Stack>
      <Stack spacing={2} paddingX={2}>
        <Typography variant="h4" textTransform={"uppercase"}>
          {labelProjectForList.titulo}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            marginY={2}
          >
            <Box>
              <Typography marginTop={2.5}>
                {labelProjectForList.filtrarPor}
              </Typography>
            </Box>

            <FormControl variant="standard" sx={{ m: 1, width: 200 }}>
              <InputLabel id="estado-ejecucion-label">
                Estado de Ejecución
              </InputLabel>
              <Select
                labelId="estado-ejecucion-label"
                value={filters["estadoDeEjecucion"] ?? ""}
                onChange={(e) =>
                  toggleFilter("estadoDeEjecucion", e.target.value || undefined)
                }
              >
                <MenuItem value="">
                  <em>No aplicado</em>
                </MenuItem>
                {getExecutionStateArray.map(([value, key]) => (
                  <MenuItem key={key} value={value}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="backend-label">Backend</InputLabel>
              <Select
                labelId="backend-label"
                value={filters["backend.tecnologia.nombre"] ?? ""}
                onChange={(e) =>
                  toggleFilter(
                    "backend.tecnologia.nombre",
                    e.target.value || undefined
                  )
                }
              >
                <MenuItem value="">
                  <em>No aplicado</em>
                </MenuItem>
                {selectFilters.backends.map((value, key) => (
                  <MenuItem key={key} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="frontend-label">Frontend</InputLabel>
              <Select
                labelId="frontend-label"
                value={filters["frontend.tecnologia.nombre"] ?? ""}
                onChange={(e) =>
                  toggleFilter(
                    "frontend.tecnologia.nombre",
                    e.target.value || undefined
                  )
                }
              >
                <MenuItem value="">
                  <em>No aplicado</em>
                </MenuItem>
                {selectFilters.frontends.map((value, key) => (
                  <MenuItem key={key} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Filters />
        </Stack>
      </Stack>
      <Stack alignItems={"center"} width={"100%"}>
        <Stack spacing={2}>
          {filterData(stableSort(proyectos)).map((proyecto, key) => (
            <ProjectForList proyecto={proyecto} key={key} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ListarProyectos;
