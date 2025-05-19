import CardMateria from "@modules/materias/components/cardMateria";
import { Materia } from "@modules/materias/types/materia";
import {
  Grid2,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import useOrderSelect from "@modules/general/hooks/useOrder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useEffect, useMemo, useState } from "react";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { adaptMateriaServiceToMateria } from "@modules/materias/utils/adapters/materia.service";
import { labelListarMaterias } from "@modules/materias/enums/labelListarMaterias";
import { getMateriasService } from "@modules/materias/services/get.materias.services";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import useSearch from "@modules/general/hooks/useSearch";
import TextFieldSearch from "@modules/general/components/textFieldSearch";

/**
 * ExplorarMaterias component – Displays a list of available subjects (materias) with search and sorting capabilities.
 * It fetches the list of materias from an API, allows filtering them by name through a search bar,
 * and sorting them by different criteria (e.g., alphabetically or by semester).
 *
 * The component displays a list of materias in cards and provides user feedback with loading spinners and error dialogs.
 * 
 * @component
 * 
 * @example
 * ```tsx
 * <ExplorarMaterias />
 * ```
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
    queryKey: ["Cursos for Materia", token],
  });

  // Dialog control for handling fetch errors
  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();

  const {setError} = useErrorReader(showDialog);

  // Hook to manage sorting behavior
  const {handleOrder, orderDataFn,order } = useOrderSelect<Materia>();

  // Update materias state when data is fetched
  useEffect(() => {
    if (data) {
      setMaterias(data.map((materia) => adaptMateriaServiceToMateria(materia)));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  const {filteredData, setSearchValue, searchValue} = useSearch();

  /**
   * Filters and sorts materias based on search input.
   * If a search string is present, it filters by name (case-insensitive),
   * otherwise it returns the sorted list.
   */
  const searchFn = (x: Materia[], s: string) => {
    if (s != "")
      return x.filter((materia) =>
        materia.nombre.toLowerCase().includes(s.toLowerCase())
      );
    return x;
  };

  const dataToLoad =useMemo( () => {
    return orderDataFn(filteredData(materias, searchFn))
  }, [materias, searchValue, order])

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />

      {/* Loader or main content */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={5}>
          {/* Title and icon */}
          <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2}>
            <Typography variant="h3" textAlign={"center"}>
              {labelListarMaterias.titulo}
            </Typography>
            <MenuBookIcon sx={{ fontSize: 48 }} />
          </Stack>

          {/* Search and sort controls */}
          <Stack direction={{ sm: "row", xs: "column" }} justifyContent={"center"} spacing={1}>
            {/* Search input */}
            <TextFieldSearch setSearchValue={setSearchValue}/>

            {/* Sorting select */}
            <Select
              onChange={(e) => {
                const selectedValue = JSON.parse(e.target.value);
                handleOrder(selectedValue.key, selectedValue.order);
              }}
              size="small"
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
          <Grid2 container spacing={5} paddingX={{ md: 4 }}>
            {dataToLoad.map((materia, key) => (
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
