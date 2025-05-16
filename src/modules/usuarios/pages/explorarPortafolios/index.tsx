import { labelListarPortafolios } from "@modules/usuarios/enum/labelListarPortafolios";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { Grid2, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import PortafolioCard from "@modules/general/components/portafolioCard";
import { getUsuariosByTypeService } from "@modules/usuarios/services/get.usuarios.[tipo]";
import { adaptUser, adaptUserToPC } from "@modules/usuarios/utils/adapt.usuario";
import { useAuth } from "@modules/general/context/accountContext";
import { useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { SelectOrders, SorterOptions } from "@modules/general/components/selects";
import useSearch from "@modules/general/hooks/useSearch";
import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { usePagination } from "@modules/general/hooks/usePagination";

/**
 * ExplorarPortafolios component – A component for exploring all available user portfolios.
 * 
 * This component:
 * - Fetches a list of users of type "todos" from the API.
 * - Adapts and displays the user data in portfolio cards.
 * - Supports search filtering by user name and portfolio ID.
 * - Handles loading and error states with a loader and alert dialogs.
 * 
 * It also provides sorting functionality for portfolio listings and pagination.
 * 
 * @component
 * 
 * @returns {JSX.Element} A UI to explore user portfolios, including search, sort, and pagination.
 * 
 * @example
 * ```tsx
 * <ExplorarPortafolios />
 * ```
 */
function ExplorarPortafolios() {
  // Retrieve user token from authentication context
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  const { data, isLoading, error, isSuccess } = useQuery({
    queryFn: () => getUsuariosByTypeService("todos", token),
    queryKey: ["Portafolios", "todos", token],
  });

  // Local state to store adapted user portfolio data
  const [usuarios, setUsuarios] = useState<UsuarioPortafolioCard[]>([]);

  const { showDialog, open, title, message, handleCancel, type, handleAccept } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

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

  const [buffer, setBuffer] = useState<UsuarioPortafolioCard[]>([]);

  useEffect(() => {
    setBuffer(usuarios);
  }, [usuarios]);

  const orderOptions: SorterOptions = [
    { key: "nombres", label: "Nombre", options: { asc: "A-Z", desc: "Z-A" } },
  ];

  const { searchValue, setSearchValue } = useSearch();

  function searchFn(x: UsuarioPortafolioCard[], s: string) {
    return x.filter((a) => (a.nombres + a.id).trim().toLowerCase().includes(s.toLowerCase()));
  }

  const dataToRender = useMemo(() => {
    return searchFn(buffer, searchValue);
  }, [buffer, searchValue]);

  const { goToPage, hasNextPage, hasPrevPage, paginatedData, totalPages } =
    usePagination<UsuarioPortafolioCard>(dataToRender, 10, 1);

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
            <Typography variant="h3" textAlign={"center"}>
              {labelListarPortafolios.titulo}
            </Typography>
            {/* Optional icon can go here */}
          </Stack>

          <Grid2 container display={"flex"} justifyContent={"center"} spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFieldSearch fullWidth setSearchValue={setSearchValue} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <SelectOrders
                data={usuarios}
                setRefineData={setBuffer}
                sorterOptions={orderOptions}
                label="Ordenar Por"
                type="single"
              />
            </Grid2>
          </Grid2>

          {/* Portfolio card grid */}
          <Grid2 container spacing={5} display={"flex"} justifyContent={"center"}>
            {paginatedData.map((usuario, key) => (
              <Grid2 size={{ xl: 8, xs: 10 }} key={key}>
                <PortafolioCard usuario={usuario} />
              </Grid2>
            ))}
          </Grid2>
          <Stack alignItems={"center"}>
            <Pagination
              count={totalPages}
              hideNextButton={!hasNextPage}
              hidePrevButton={!hasPrevPage}
              onChange={(_e, page) => goToPage(page)}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default ExplorarPortafolios;
