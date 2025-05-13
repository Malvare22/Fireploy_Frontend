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
import { Alert, Box, Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import useSearch from "@modules/general/hooks/useSearch";
import TablaUsuarios from "@modules/usuarios/components/tablaUsuarios";
import { labelListarUsuarios } from "@modules/usuarios/enum/labelListarUsuarios";
import { getUsuariosByTypeService } from "@modules/usuarios/services/get.usuarios.[tipo]";
import { Usuario } from "@modules/usuarios/types/usuario";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoaderElement from "@modules/general/components/loaderElement";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HiddenButton from "@modules/materias/components/hiddenInput";
import { postCargaMasivaUsuarios } from "@modules/usuarios/services/post.cargar.usuarios";
import { FilterOptions, SelectFilters } from "@modules/general/components/selects";
import TextFieldSearch from "@modules/general/components/textFieldSearch";

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
function ListarUsuarios() {
  // 🔐 Get authentication token from context
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  // 🔹 Stores fetched and adapted user data
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // 🔎 States for handling search input
  const { searchValue, setSearchValue, filteredData } = useSearch();

  const navigate = useNavigate();

  /**
   * Fetch users from the API using React Query
   */
  const { data, isLoading, error, isSuccess } = useQuery({
    queryFn: () => getUsuariosByTypeService("todos", token),
    queryKey: ["Usuarios", "todos"],
  });

  const {
    showDialog,
    open,
    title,
    message,
    handleCancel,
    type,
    handleAccept,
    handleClose,
    setIsLoading,
    handleOpen,
  } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const { mutate: updateFile } = useMutation({
    mutationFn: async (file: File) => {
      setIsLoading(true);
      await postCargaMasivaUsuarios(token, file);
    },
    onSuccess: () => {
      showDialog({
        message: "Se han cargado los estudiantes correctamente",
        title: "Gestión de estudiantes",
        onAccept: handleAccept,
        type: "success",
        reload: true,
      });
    },
    onError: (err) => setError(err),
  });

  function setFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;

    if (file)
      showDialog({
        message: "¿Estás seguro de cargar este documento para la carga masiva de estudiantes?",
        title: "Gestión de estudiantes",
        onCancel: handleClose,
        onAccept: () => updateFile(file),
        type: "default",
      });

    handleOpen();
  }

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

  const [buffer, setBuffer] = useState<Usuario[]>([]);

  useEffect(() => {
    if (usuarios) setBuffer(usuarios);
  }, [usuarios]);

  function handleSearchFn(users: Usuario[], s: string) {
    const search = s.toLowerCase();
    return users.filter((u) =>
      (u.apellidos + u.nombres + (u.id ?? "")).toLowerCase().includes(search)
    );
  }
  const dataToShow = useMemo(() => {
    return filteredData(buffer, handleSearchFn);
  }, [searchValue, buffer]);

  const filterOptions: FilterOptions = [
    {
      key: "estado",
      label: "Estado",
      options: [
        ["Activo", (x) => x == "A"],
        ["Deshabilitado", (x) => x == "I"],
      ],
    },
    {
      key: "tipo",
      label: "Tipo",
      options: [
        ["Estudiante", (x) => x == "E"],
        ["Docente", (x) => x == "D"],
        ["Administrador", (x) => x == "A"],
      ],
    },
  ];

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

          <Grid2 container>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextFieldSearch setSearchValue={setSearchValue} fullWidth />
            </Grid2>
          </Grid2>

          <SelectFilters data={usuarios} filterOptions={filterOptions} setRefineData={setBuffer} />

          {/* 📊 User table */}
          {dataToShow.length > 0 ? (
            <TablaUsuarios usuarios={dataToShow} />
          ) : (
            <Alert severity="info">No se han encontrado usuarios (verifica los filtros)</Alert>
          )}

          <Stack justifyContent={"end"} direction={"row"} spacing={2}>
            <Box>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Carga Masiva
                <HiddenButton type="file" onChange={setFile} multiple accept=".xls, .xsls" />
              </Button>
            </Box>
            <Box>
              <GeneralButton
                mode={buttonTypes.add}
                onClick={() => navigate(rutasUsuarios.agregarUsuario)}
              />
            </Box>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default ListarUsuarios;
