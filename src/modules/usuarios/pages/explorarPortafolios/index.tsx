import { labelListarPortafolios } from "@modules/usuarios/enum/labelListarPortafolios";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import {
  Grid2,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useOrderSelect from "@modules/general/hooks/useOrder";
import { labelSelects } from "@modules/general/enums/labelSelects";
import PortafolioCard from "@modules/general/components/portafolioCard";
import { getUsuariosByTypeService } from "@modules/usuarios/services/get.usuarios.[tipo]";
import { adaptUser, adaptUserToPC } from "@modules/usuarios/utils/adapt.usuario";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";

/**
 * Component for exploring all available user portfolios.
 * 
 * This component:
 * - Fetches a list of users of type "todos"
 * - Adapts and displays them in portfolio cards
 * - Supports search filtering and sorting
 * - Handles loading and error states
 *
 * @component
 */
function ExplorarPortafolios() {
  // Retrieve user token from authentication context
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  /**
   * Query to fetch all users of type "todos" using the provided token.
   * Handles loading, error, and success states.
   */
  const { data, isLoading, error, isSuccess } = useQuery({
    queryFn: () => getUsuariosByTypeService("todos", token),
    queryKey: ["Portafolios", "todos"],
  });

  // Local state to store adapted user portfolio data
  const [usuarios, setUsuarios] = useState<UsuarioPortafolioCard[]>([]);

  const { showDialog, open, title, message, handleCancel, type, handleAccept } = useAlertDialog();

  const {setError} = useErrorReader(showDialog);

  /**
   * Effect triggered when user data is successfully fetched.
   * Transforms raw user data into a portfolio card-friendly format.
   */
  useEffect(() => {
    if (isSuccess && data) {
      setUsuarios(data.map((user) => adaptUserToPC(adaptUser(user))));
    }
  }, [isSuccess, data]);

  /**
   * Effect triggered when an error occurs during the fetch.
   * Opens the alert dialog with the error message.
   */
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  // Hook to manage sorting logic for the portfolio list
  const { handleOrder } = useOrderSelect();

  // Local state for the search input
  const [search, setSearch] = useState<string>("");

  return (
    <>
      {/* Display alert dialog if an error occurred */}
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />

      {/* Show loading spinner or main content based on loading state */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={5}>
          {/* Title section */}
          <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2}>
            <Typography variant="h3" textAlign={"center"} textTransform={"uppercase"}>
              {labelListarPortafolios.titulo}
            </Typography>
            {/* Optional icon can go here */}
          </Stack>

          {/* Search and sort controls */}
          <Stack direction={{ sm: "row", xs: "column" }} justifyContent={"center"} spacing={1}>
            {/* Search input */}
            <TextField
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

            {/* Sort dropdown */}
            <Select
              onChange={(e) => {
                const selectedValue = JSON.parse(e.target.value as any);
                if(!selectedValue.key){
                  handleOrder("nombre", undefined);
                  handleOrder("semestre", undefined);
                }
                else handleOrder(selectedValue.key, selectedValue.order);
              }}
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

          {/* Portfolio card grid */}
          <Grid2 container spacing={5} display={"flex"} justifyContent={"center"}>
            {usuarios.map((usuario, key) => (
              <Grid2 size={{ xl: 8, xs: 10 }} key={key}>
                <PortafolioCard usuario={usuario} />
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      )}
    </>
  );
}

export default ExplorarPortafolios;
