import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { useFiltersByConditions } from "@modules/general/hooks/useFiltersByCondition";
import useSearch from "@modules/general/hooks/useSearch";
import RepositoryCard from "@modules/proyectos/components/cardRepository";
import { labelRepositorios } from "@modules/proyectos/enum/labelRepositorios";
import {
  exampleRepositorios,
  Repositorio,
} from "@modules/proyectos/types/repositorio";
import { getNoRepeatValuesRepositorios } from "@modules/proyectos/utils/getNoRepeatValues.repositorios";
import { getRepositoryTypesArray } from "@modules/proyectos/utils/repository";
import {
  Divider,
  Grid2,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";

function VistaRepositorios() {
  const [repositorios, _useStateRepositorios] =
    useState<Repositorio[]>(exampleRepositorios);

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
            getNoRepeatValuesRepositorios(repositorios, "proyecto")
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
        {getRepositoryTypesArray.map(([value, key]) => (
          <MenuItem value={value} key={key}>
            {key}
          </MenuItem>
        ))}
      </TextField>
    );
  }, []);

  const filterDocker = useMemo(() => {
    return (
      <TextField
        select
        size="small"
        label={labelRepositorios.filtrarPorImagenDocker}
        variant="standard"
        fullWidth
        onChange={(e) => {
          const value = e.target.value || "";
          if (value != "") toggleFilter("dockerText", (x: any) => x == value);
          else toggleFilter("dockerText", (_x: any) => true);
        }}
        defaultValue={""}
      >
        <MenuItem value="">{labelSelects.noAplicar}</MenuItem>
        {Array.from(
          getNoRepeatValuesRepositorios(repositorios, "dockerText")
        ).map((element) => (
          <MenuItem value={element} key={element}>
            {element}
          </MenuItem>
        ))}
      </TextField>
    );
  }, []);

  const dataToRender = useMemo(() => {
    const filterText = (x: Repositorio[]) => {
      const textValue = searchValue.toLowerCase();
      if (searchValue == "") return x;
      return x.filter((y) => y.proyecto.toLowerCase().includes(textValue));
    };

    return filterData(filterByText(repositorios, filterText)) as Repositorio[];
  }, [filters, searchValue]);

  return (
    <Stack spacing={3}>
      <Stack>
        <Typography variant="h4">{labelRepositorios.titulo}</Typography>
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
          <Grid2 size={{ xs: 12, md: 4 }}>{filterDocker}</Grid2>
        </Grid2>
      </Stack>
      <Grid2 container justifyContent={"center"} rowSpacing={3}>
        {dataToRender.map((repo) => (
          <Grid2 size={{ md: 8, xs: 12 }}>
            <RepositoryCard repositorio={repo} key={repo.id}/>
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}

export default VistaRepositorios;
