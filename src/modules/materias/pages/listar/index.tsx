import CardMateria from "@modules/materias/components/cardMateria";
import { Materia } from "@modules/materias/types/materia";
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
import { useContext, useEffect, useMemo, useState } from "react";
import { labelSelects } from "@modules/general/enums/labelSelects";
import useQuery from "@modules/general/hooks/useQuery";
import { MateriaService } from "@modules/materias/types/materia.service";
import { getMateriasService } from "@modules/materias/services/get.materias.services";
import { AccountContext } from "@modules/general/context/accountContext";
import AlertDialog from "@modules/general/components/alertDialog";
import { adaptarMateriaService } from "@modules/materias/utils/adapters/adaptar.materiaService.materia";

function ListarMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);

  const token = useContext(AccountContext).localUser?.token;

  const { error, handleAlertClose, initQuery, message, open, responseData } =
    useQuery<MateriaService[]>(() => getMateriasService(token!!), false);

  const { handleRequestSort, stableSort, setOrderBy } =
    useOrderSelect<Materia>();

  useEffect(() => {
    if (token) initQuery();
  }, [token]);

  useEffect(() => {
    if (responseData)
      setMaterias(
        responseData.map((materia) => adaptarMateriaService(materia))
      );
  }, [responseData]);

  const [search, setSearch] = useState<string>("");

  const filterSearchData = useMemo(() => {
    if (search != "")
      return stableSort(materias).filter((materia) =>
        materia.nombre.toLowerCase().includes(search.toLowerCase())
      );
    return stableSort(materias);
  }, [search, materias, stableSort]);

  return (
    <>
      {error && (
        <AlertDialog
          handleAccept={handleAlertClose}
          open={open}
          title="Obtener Materias"
          textBody={message}
        />
      )}
      <Stack spacing={5}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          <Typography
            variant="h3"
            textAlign={"center"}
            textTransform={"uppercase"}
          >
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
              const selectedValue = JSON.parse(e.target.value);
              if (
                selectedValue.key == undefined ||
                selectedValue.order == undefined
              )
                setOrderBy({});
              else handleRequestSort(selectedValue.key, selectedValue.order);
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
            <MenuItem
              value={JSON.stringify({ key: "semestre", order: "desc" })}
            >
              {labelSelects.semestreMenor}
            </MenuItem>
          </Select>
        </Stack>
        <Grid2 container spacing={5} paddingX={{ md: 10 }}>
          {filterSearchData.map((materia, key) => (
            <Grid2 size={{ xl: 4, sm: 6, xs: 12 }}>
              <CardMateria materia={materia} key={key} />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </>
  );
}

export default ListarMaterias;
