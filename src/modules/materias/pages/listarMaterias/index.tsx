/**
 * Component to list and manage subjects (materias) in the system.
 * It handles data fetching, filtering, and displaying the table of subjects.
 */

import TablaMaterias from "@modules/materias/components/tablaMaterias";
import { labelListarMaterias } from "@modules/materias/enums/labelListarMaterias";
import { getMateriasService } from "@modules/materias/services/get.materias.services";
import { MateriaTabla } from "@modules/materias/types/materia.tabla";
import { adaptMateriaService } from "@modules/materias/utils/adapters/materia.service";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { getMateriasSemestresLabels } from "@modules/materias/utils/materias";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { useNavigate } from "react-router";
import { rutasMaterias } from "@modules/materias/router/router";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { FilterOptions, SelectFilters } from "@modules/general/components/selects";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HiddenButton from "@modules/materias/components/hiddenInput";
import { postCargaMasivaMaterias } from "@modules/materias/services/post.cargar.materias";
import useSearch from "@modules/general/hooks/useSearch";
import TextFieldSearch from "@modules/general/components/textFieldSearch";

/**
 * ListarMaterias component – A component that handles listing, searching, filtering, and displaying subjects (materias).
 * It also includes functionality for error handling, subject data fetching, and navigation for adding new subjects.
 * The component supports mass upload of subjects via file.
 *
 * @component
 *
 * @returns {JSX.Element} A React component that lists subjects, includes filtering options, and handles file uploads.
 */

/**
 * Filter options for the refine panel. Allows filtering by active groups, status, and semester.
 */
const filterOptions: FilterOptions = [
  {
    key: "cantidadGruposActivos",
    label: "Grupos Activos",
    options: [
      ["Grupos Activos", (x) => x != 0],
      ["Sin Grupos Activos", (x) => x == 0],
    ],
  },
  {
    key: "estado",
    label: "Estado",
    options: [
      ["Activo", (x) => x == "A"],
      ["Inactivo", (x) => x == "I"],
    ],
  },
  {
    label: "Semestre",
    key: "semestre",
    options: getMateriasSemestresLabels().map(([value, text]) => [text, (x) => x == value]),
  },
];

/**
 * Handles subject listing, search, filtering, error handling, and navigation.
 * It fetches subjects using a token and supports file upload functionality.
 *
 * @returns {JSX.Element} React component
 */
function ListarMaterias() {
  /** Authentication context */
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  /**
   * React Query hook to fetch subjects using the token.
   * Fetches the list of subjects from the server.
   *
   * @returns {Object} Response containing subject data, loading status, and error information.
   */
  const { data, isLoading, error } = useQuery({
    queryFn: () => getMateriasService(token),
    queryKey: ["Get Materias", token],
  });

  /** Alert dialog control hook */
  const {
    showDialog,
    open,
    title,
    message,
    type,
    handleAccept,
    handleCancel,
    handleOpen,
    handleClose,
    setIsLoading,
    isLoading: isLoadingAlert,
  } = useAlertDialog();

  /** Error handling hook */
  const { setError } = useErrorReader(showDialog);

  /** Transformed subject data for display */
  const materias = data ? data.map(adaptMateriaService) : [];

  function handleSearchFn(x: MateriaTabla[], s: string) {
    return x.filter((y) => `${y.codigo}${y.nombre}`.toLowerCase().includes(s.toLowerCase()));
  }

  /**
   * Mutation function to upload a file for bulk import of subjects.
   * Sends the file to the server for processing.
   *
   * @param {File} file - The file to be uploaded.
   */
  const { mutate: updateFile } = useMutation({
    mutationFn: async (file: File) => {
      setIsLoading(true);
      await postCargaMasivaMaterias(token, file);
    },
    onSuccess: () => {
      showDialog({
        message: "Se han cargado las materias correctamente",
        title: "Gestión de materias",
        onAccept: handleAccept,
        type: "success",
        reload: true,
      });
    },
    onError: (err) => setError(err),
  });

  /** Local state for the buffer of filtered subjects */
  const [buffer, setBuffer] = useState<MateriaTabla[]>(materias);

  const { filteredData, searchValue, setSearchValue } = useSearch();

  const dataToShow = useMemo(() => {
    return filteredData(buffer, handleSearchFn);
  }, [searchValue, filterOptions, buffer]);

  /**
   * Handles the file selection for bulk upload of subjects.
   * Displays a confirmation dialog before uploading the file.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event.
   */
  function setFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;

    if (file)
      showDialog({
        message: "¿Estás seguro de cargar este documento para la carga masiva de materias?",
        title: "Gestión de materias",
        onCancel: handleClose,
        onAccept: () => updateFile(file),
        type: "default",
      });

    handleOpen();
  }

  /**
   * Effect that handles error setting when fetching fails.
   * Sets the error state in case of an error during the fetch process.
   */
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error]);

  /** React Router navigation hook */
  const navigate = useNavigate();

  return (
    <>
      {/* Alert Dialog for errors or confirmations */}
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={open}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoadingAlert}
      />

      {/* Show loader while fetching data */}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={3}>
          {/* Page title */}
          <Typography variant="h4">{labelListarMaterias.titulo}</Typography>

          <Grid2 container>
            <Grid2 size={{ md: 4, xs: 12 }}>
              <TextFieldSearch fullWidth setSearchValue={setSearchValue} />
            </Grid2>
          </Grid2>

          <SelectFilters data={materias} setRefineData={setBuffer} filterOptions={filterOptions} />

          {materias && <TablaMaterias materias={dataToShow} />}
          {/* Action button to navigate to create new subject */}
          <Stack direction={"row"} justifyContent={"end"} spacing={2}>
            <Box>
              <GeneralButton
                onClick={() => navigate(rutasMaterias.crearMateria)}
                mode={buttonTypes.add}
              />
            </Box>
            <Box>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Carga Masiva
                <HiddenButton type="file" onChange={setFile} multiple accept=".xlsx" />
              </Button>
            </Box>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default ListarMaterias;
