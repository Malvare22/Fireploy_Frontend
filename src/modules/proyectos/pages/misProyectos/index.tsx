import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrderSelect";
import LayoutList from "@modules/general/layouts/list";
import ProjectForList from "@modules/proyectos/components/projectForList";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import { Proyecto, proyectos } from "@modules/proyectos/types/proyecto.tipo";
import { getDatabaseTypesArray } from "@modules/proyectos/utils/getDatabaseTypes";
import { getDataForSelects } from "@modules/proyectos/utils/getDataForSelects";
import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import { Box, Card, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";

function MisProyectos() {
  const { filterData, toggleFilter, filters } = useFilters<Proyecto>();
  const { handleRequestSort, orderBy, stableSort } = useOrderSelect<Proyecto>();
  const selectFilters = getDataForSelects(proyectos);

  const Filters = () => {
    return (
      <Card sx={{ height: "100%" }}>
        <Stack margin={2} spacing={2}>
          <Typography>{labelProjectForList.ordenarPor}</Typography>
          <Typography>{labelProjectForList.puntuacion}</Typography>
          <Select
            sx={{ width: "100%" }}
            onChange={(e) => handleRequestSort("calificacion", e.target.value || undefined)}
            value={orderBy["calificacion"] ?? ""}
            displayEmpty
          >
            <MenuItem value={undefined}>No aplicado</MenuItem>
            <MenuItem value="asc">Mayor</MenuItem>
            <MenuItem value="desc">Menor</MenuItem>
          </Select>
          <Typography>{labelProjectForList.fecha}</Typography>
          <Select
            sx={{ width: "100%" }}
            onChange={(e) => handleRequestSort("fechaUltimaModificacion", e.target.value || undefined)}
            value={orderBy["fechaUltimaModificacion"] ?? ""}
            displayEmpty
          >
            <MenuItem value={undefined}>No aplicado</MenuItem>
            <MenuItem value="asc">Mayor</MenuItem>
            <MenuItem value="desc">Menor</MenuItem>
          </Select>
        </Stack>
      </Card>
    );
  };

  return (
    <Stack spacing={2} paddingBottom={4}>
      <Stack>
        <Typography variant="h4" textTransform={"uppercase"}>
          {labelProjectForList.titulo}
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
          <Box>
            <Typography>Estado de Ejecución</Typography>
            <Select
              sx={{ width: "100%" }}
              onChange={(e) => toggleFilter("estadoDeEjecucion", e.target.value || undefined)}
              value={filters["estadoDeEjecucion"] ?? ""}
              displayEmpty
            >
              <MenuItem value={undefined}>No aplicado</MenuItem>
              {getExecutionStateArray.map(([value, key]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography>Backend</Typography>
            <Select
              sx={{ width: "100%" }}
              onChange={(e) => toggleFilter("backend.tecnologia.nombre", e.target.value || undefined)}
              value={filters["backend.tecnologia.nombre"] ?? ""}
              displayEmpty
            >
              <MenuItem value={undefined}>No aplicado</MenuItem>
              {selectFilters.backends.map((value, key) => (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography>Frontend</Typography>
            <Select
              sx={{ width: "100%" }}
              onChange={(e) => toggleFilter("frontend.tecnologia.nombre", e.target.value || undefined)}
              value={filters["frontend.tecnologia.nombre"] ?? ""}
              displayEmpty
            >
              <MenuItem value={undefined}>No aplicado</MenuItem>
              {selectFilters.frontends.map((value, key) => (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Stack>
      </Stack>
      <LayoutList options={<Filters />}>
        <Stack spacing={2}>
          {filterData(stableSort(proyectos)).map((proyecto, key) => (
            <ProjectForList proyecto={proyecto} key={key} />
          ))}
        </Stack>
      </LayoutList>
    </Stack>
  );
}

export default MisProyectos;
