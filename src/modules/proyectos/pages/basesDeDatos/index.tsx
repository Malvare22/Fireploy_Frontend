import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { useFiltersByConditions } from "@modules/general/hooks/useFiltersByCondition";
import useSearch from "@modules/general/hooks/useSearch";
import TablaBasesDeDatos from "@modules/proyectos/components/tablaBasesDeDatos";
import { labelBaseDeDatos } from "@modules/proyectos/enum/labelBaseDeDatos";
import { labelRepositorios } from "@modules/proyectos/enum/labelRepositorios";
import { BaseDeDatos, exampleBasesDeDatos } from "@modules/proyectos/types/baseDeDatos";
import { getDataBaseTypesArray } from "@modules/proyectos/utils/database";
import { getNoRepeatValuesBasesDeDatos } from "@modules/proyectos/utils/getNoRepeatValues.basesDeDatos";

import {
  Divider,
  Grid2,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

function VistaBasesDeDatos() {
  const [basesDeDatos, _setBasesDeDatos] =
    useState<BaseDeDatos[]>(exampleBasesDeDatos);

  const {
    searchValue,
    setSearchValue,
    filteredData: filterByText,
  } = useSearch();

  const { filterData, filters, toggleFilter } = useFiltersByConditions();

  const filterProject = useMemo(() => {
    return (
      <>
        <TextField
          select
          size="small"
          label={labelRepositorios.filtrarPorProyecto}
          variant="standard"
          fullWidth
          onChange={(e) => {
            const value = e.target.value || "";
            if (value != "") toggleFilter("proyecto", (x: any) => x == value);
            else toggleFilter("proyecto", (_x: any) => true);
          }}
          defaultValue={""}
        >
          <MenuItem value="">{labelSelects.noAplicar}</MenuItem>
          {Array.from(
            getNoRepeatValuesBasesDeDatos(basesDeDatos, "proyecto")
          ).map((element) => (
            <MenuItem value={element} key={element}>
              {element}
            </MenuItem>
          ))}
        </TextField>
      </>
    );
  }, []);

  const filterType = useMemo(() => {
    return (
      <TextField
        select
        size="small"
        label={labelRepositorios.filtrarPorTipo}
        variant="standard"
        fullWidth
        onChange={(e) => {
          const value = e.target.value || "";
          if (value != "") toggleFilter("tipo", (x: any) => x == value);
          else toggleFilter("tipo", (_x: any) => true);
        }}
        defaultValue={""}
      >
        <MenuItem value="">{labelSelects.noAplicar}</MenuItem>
        {getDataBaseTypesArray.map(([value, key]) => (
          <MenuItem value={value} key={key}>
            {key}
          </MenuItem>
        ))}
      </TextField>
    );
  }, []);

  const dataToRender = useMemo(() => {
    const filterText = (x: BaseDeDatos[]) => {
      const textValue = searchValue.toLowerCase();
      if (searchValue == "") return x;
      return x.filter((y) => y.proyecto.toLowerCase().includes(textValue));
    };

    return filterData(filterByText(basesDeDatos, filterText)) as BaseDeDatos[];
  }, [filters, searchValue]);

  return (
    <Stack spacing={3}>
      <Stack>
        <Typography variant="h4">{labelBaseDeDatos.basesDeDatos}</Typography>
        <Divider />
      </Stack>
      <Stack spacing={1}>
        <TextFieldSearch
          setSearchValue={setSearchValue}
          sx={{ maxWidth: 500 }}
        />
        <Grid2 container columnSpacing={4}>
          <Grid2 size={{ xs: 12, md: 4 }}>{filterProject}</Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>{filterType}</Grid2>
        </Grid2>
      </Stack>
      <TablaBasesDeDatos basesDeDatos={dataToRender}/>
    </Stack>
  );
}

export default VistaBasesDeDatos;
