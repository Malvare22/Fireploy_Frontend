/**
 * ListarUsuarios Component
 *
 * Displays a list of all users in a table with search functionality.
 * Fetches user data from the backend, allows filtering by name using a search input,
 * and displays a loading indicator and error dialog when appropriate.
 *
 * Features:
 * - Fetches users of type "todos"
 * - Shows search bar that filters users by name (pressing Enter triggers filtering)
 * - Displays a table of users
 * - Handles loading and error states
 * - Allows navigation to a "create user" form
 *
 * @component
 */

import { useState, useEffect, useMemo } from "react";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import useSearch from "@modules/general/hooks/useSearch";
import TablaUsuarios from "@modules/usuarios/components/tablaUsuarios";
import { labelListarUsuarios } from "@modules/usuarios/enum/labelListarUsuarios";
import { getUsuariosByTypeService } from "@modules/usuarios/services/get.usuarios.[tipo]";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import SearchIcon from "@mui/icons-material/Search";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { useQuery } from "@tanstack/react-query";
import LoaderElement from "@modules/general/components/loaderElement";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";

function ListarUsuarios() {
  // 🔐 Get authentication token from context
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  // 🔹 Stores fetched and adapted user data
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // 🔎 States for handling search input
  const [inputValue, setInputValue] = useState("");
  const { searchValue, setSearchValue } = useSearch();

  const navigate = useNavigate();

  /**
   * Fetch users from the API using React Query
   */
  const { data, isLoading, error, isSuccess } = useQuery({
    queryFn: () => getUsuariosByTypeService("todos", token),
    queryKey: ["Usuarios", "todos"],
  });

  const { showDialog, open, title, message, handleCancel, type, handleAccept } =
    useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  /**
   * Effect to set adapted users when data is successfully fetched
   */
  useEffect(() => {
    if (isSuccess && data) {
      setUsuarios(data.map((user) => adaptUser(user)));
    }
  }, [isSuccess, data]);

  /**
   * Effect to open alert dialog on fetch error
   */
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  /**
   * Filters users based on search input
   */
  const filteredData = useMemo(() => {
    if (!usuarios || searchValue.trim() === "") return usuarios;

    return usuarios.filter((usuario) =>
      `${usuario.apellidos} ${usuario.nombres}`.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, usuarios]);

  /**
   * Handles Enter key press to trigger search
   * @param e React.KeyboardEvent<HTMLInputElement>
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchValue(inputValue);
    }
  };

  return (
    <>
      {/* 🛑 Show error dialog if fetch failed */}

      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={open}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoading}
      />

      {/* ⏳ Show loading spinner or main content */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={3}>
          {/* 📋 Header and divider */}
          <Stack>
            <Typography variant="h4">{labelListarUsuarios.titulo}</Typography>
            <Divider />
          </Stack>

          {/* 🔍 Search bar and Add User button */}
          <Stack direction={"row"} justifyContent={"space-between"}>
            <TextField
              size="small"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              label="Buscar Usuario"
              sx={{ maxWidth: 400 }}
              slotProps={{
                input: {
                  endAdornment: <SearchIcon />,
                },
              }}
            />
            <GeneralButton
              mode={buttonTypes.add}
              onClick={() => navigate(rutasUsuarios.agregarUsuario)}
            />
          </Stack>

          {/* 📊 User table */}
          {filteredData && <TablaUsuarios usuarios={filteredData} />}
        </Stack>
      )}
    </>
  );
}

export default ListarUsuarios;
