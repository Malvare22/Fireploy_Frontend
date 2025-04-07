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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useEffect, useMemo, useState } from "react";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { adaptMateriaServiceToMateria } from "@modules/materias/utils/adapters/materia.service";
import { labelListarMaterias } from "@modules/materias/enums/labelListarMaterias";
import { getMateriasService } from "@modules/materias/services/get.materias.services";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialogError from "@modules/general/components/alertDialogError";
import LoaderElement from "@modules/general/components/loaderElement";

/**
 * Component to explore and list available subjects (materias).
 *
 * This component fetches all available materias from the API,
 * allows the user to filter them by name through a search bar,
 * and sort them using a select input.
 *
 * @component
 */
function ExplorarMaterias() {
  // State to hold all materias fetched from the API
  const [materias, setMaterias] = useState<Materia[]>([]);

  // Get authentication token from context
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  // Fetch materias using React Query
  const { data, isLoading, error } = useQuery({
    queryFn: () => getMateriasService(token),
    queryKey: ["cursos for materia"],
  });

  // Dialog control for handling fetch errors
  const { handleClose: handleCloseFailFetch, open: openFailFetch } = useAlertDialog();

  // Hook to manage sorting behavior
  const { handleRequestSort, stableSort, setOrderBy } = useOrderSelect<Materia>();

  // Update materias state when data is fetched
  useEffect(() => {
    if (data) {
      setMaterias(data.map((materia) => adaptMateriaServiceToMateria(materia)));
    }
  }, [data]);

  // State for search input
  const [search, setSearch] = useState<string>("");

  /**
   * Filters and sorts materias based on search input.
   * If a search string is present, it filters by name (case-insensitive),
   * otherwise it returns the sorted list.
   */
  const filterSearchData = useMemo(() => {
    if (search != "")
      return stableSort(materias).filter((materia) =>
        materia.nombre.toLowerCase().includes(search.toLowerCase())
      );
    return stableSort(materias);
  }, [search, materias, stableSort]);

  return (
    <>
      {/* Error Dialog when fetch fails */}
      {error && (
        <AlertDialogError
          handleClose={handleCloseFailFetch}
          open={openFailFetch}
          title="Obtener Materias"
          error={error}
        />
      )}

      {/* Loader or main content */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={5}>
          {/* Title and icon */}
          <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2}>
            <Typography variant="h3" textAlign={"center"} textTransform={"uppercase"}>
              {labelListarMaterias.titulo}
            </Typography>
            <MenuBookIcon sx={{ fontSize: 48 }} />
          </Stack>

          {/* Search and sort controls */}
          <Stack direction={{ sm: "row", xs: "column" }} justifyContent={"center"} spacing={1}>
            {/* Search input */}
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

            {/* Sorting select */}
            <Select
              onChange={(e) => {
                const selectedValue = JSON.parse(e.target.value);
                if (selectedValue.key == undefined || selectedValue.order == undefined)
                  setOrderBy({});
                else handleRequestSort(selectedValue.key, selectedValue.order);
              }}
              defaultValue={JSON.stringify({ key: undefined, order: undefined })}
            >
              <MenuItem value={JSON.stringify({ key: undefined, order: undefined })}>
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

          {/* List of filtered/sorted materias */}
          <Grid2 container spacing={5} paddingX={{ md: 10 }}>
            {filterSearchData.map((materia, key) => (
              <Grid2 size={{ xl: 4, sm: 6, xs: 12 }} key={key}>
                <CardMateria materia={materia} />
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      )}
    </>
  );
}

export default ExplorarMaterias;
