import CardMateria from "@modules/materias/components/cardMateria";
import { Materia, materiasEjemplo } from "@modules/materias/types/materia";
import {
  Grid2,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useOrderSelect from "@modules/general/hooks/useOrderSelect";
import { labelListarMateria } from "@modules/materias/enums/labelListarMateria";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useMemo, useState } from "react";
import { labelSelects } from "@modules/general/enums/labelSelects";

function ListarMaterias() {
  const materias = [...materiasEjemplo, ...materiasEjemplo, ...materiasEjemplo];

  const { handleRequestSort, stableSort } = useOrderSelect<Materia>();

  const [search, setSearch] = useState<string>("");

  const filterSearchData = useMemo(() => {
    if (search != "")
      return stableSort(materias).filter((materia) =>
        materia.nombre.toLowerCase().includes(search.toLowerCase())
      );
    return stableSort(materias);
  }, [search]);

  return (
    <Stack spacing={5}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
      >
        <Typography variant="h3" textAlign={"center"}>
          {labelListarMateria.titulo}
        </Typography>
        <MenuBookIcon sx={{ fontSize: 48 }} />
      </Stack>
      <Stack
        direction={{ sm: "row", xs: "column" }}
        justifyContent={"center"}
        spacing={1}
      >
        <TextField
          label="Buscar Materia"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: { md: 600, xs: "100%" } }}
          onChange={(e) => setSearch(e.currentTarget.value as string)}
          value={search}
        />
        <Select
          onChange={(e) => {
            const selectedValue = JSON.parse(e.target.value as string);
            handleRequestSort(selectedValue.key, selectedValue.order);
          }}
          defaultValue={JSON.stringify({ key: undefined, order: undefined })}
        >
          <MenuItem
            value={JSON.stringify({ key: undefined, order: undefined })}
          >
            {labelSelects.noAplicar}
          </MenuItem>
          <MenuItem value={JSON.stringify({ key: "nombre", order: "asc" })}>
            {labelSelects.alfabeticamenteMayor}
          </MenuItem>
          <MenuItem value={JSON.stringify({ key: "nombre", order: "desc" })}>
            {labelSelects.alfabeticamenteMenor}
          </MenuItem>
          <MenuItem value={JSON.stringify({ key: "semestre", order: "asc" })}>
            {labelSelects.semestreMayor}
          </MenuItem>
          <MenuItem value={JSON.stringify({ key: "semestre", order: "desc" })}>
            {labelSelects.semestreMenor}
          </MenuItem>
        </Select>
      </Stack>
      <Grid2 container spacing={5} paddingX={{md: 10}}>
        {filterSearchData.map((materia, key) => (
          <Grid2 size={{ xl: 4, sm: 6, xs: 12 }}>
            <CardMateria materia={materia} key={key} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}

export default ListarMaterias;
