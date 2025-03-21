import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrderSelect";
import LayoutList from "@modules/general/layouts/list";
import ProjectForList from "@modules/proyectos/components/projectForList";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import { Proyecto, proyectos } from "@modules/proyectos/types/proyecto.tipo";
import { getDatabaseTypesArray } from "@modules/proyectos/utils/getDatabaseTypes";
import { getDataForSelects } from "@modules/proyectos/utils/getDataForSelects";
import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import {
  Box,
  Card,
  colors,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

function MisProyectos() {
  const { filterData, toggleFilter, filters } = useFilters<Proyecto>();
  const { handleRequestSort, orderBy, stableSort } = useOrderSelect<Proyecto>();
  const selectFilters = getDataForSelects(proyectos);

  const Filters = () => {
    return (
        <Stack direction={{xs: 'column', sm: 'row'}} spacing={4} alignContent={'center'}>
          <Box ><Typography marginTop={2.5}>{labelProjectForList.ordenarPor}</Typography></Box>
  
          <FormControl variant="standard" sx={{ width: {sm: 200, xs: '100%'} }}>
            <InputLabel id="puntuacion-label">{labelProjectForList.puntuacion}</InputLabel>
            <Select
              labelId="puntuacion-label"
              value={orderBy["calificacion"] ?? ""}
              onChange={(e) => handleRequestSort("calificacion", e.target.value as Order|| undefined)}
            >
              <MenuItem value="">
                <em>No aplicado</em>
              </MenuItem>
              <MenuItem value="asc">Mayor</MenuItem>
              <MenuItem value="desc">Menor</MenuItem>
            </Select>
          </FormControl>
  
          <FormControl variant="standard" sx={{ width: {sm: 200, xs: '100%'} }}>
            <InputLabel id="fecha-label">{labelProjectForList.fecha}</InputLabel>
            <Select
              labelId="fecha-label"
              value={orderBy["fechaUltimaModificacion"] ?? ""}
              onChange={(e) => handleRequestSort("fechaUltimaModificacion", e.target.value as Order|| undefined)}
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
  

  return (
    <Stack spacing={4} paddingBottom={4}>
      <Stack spacing={2}>
        <Typography variant="h4" textTransform={"uppercase"}>
          {labelProjectForList.titulo}
        </Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={4}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} marginY={2}>
        <Box ><Typography marginTop={2.5}>{labelProjectForList.filtrarPor}</Typography></Box>

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
        <Filters/>
        </Stack>

      </Stack>
        <Stack alignItems={'center'} width={'100%'}>
        <Stack spacing={2} >
          {filterData(stableSort(proyectos)).map((proyecto, key) => (
            <ProjectForList proyecto={proyecto} key={key} />
          ))}
        </Stack>
        </Stack>
    </Stack>
  );
}

export default MisProyectos;
