import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CursoTabla } from "@modules/materias/types/curso.tabla";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import TablaCursos from "@modules/materias/components/tablaCursosAdmin";
import { useNavigate, useParams } from "react-router";
import { getCursoByMateriaId } from "@modules/materias/services/get.curso";
import { adaptCursoTabla } from "@modules/materias/utils/adapters/curso";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
// import RefinePanel, { FilterOptions } from "@modules/general/components/selects";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { FilterOptions, SelectFilters } from "@modules/general/components/selects";
import HiddenButton from "@modules/materias/components/hiddenInput";
import { postCargaMasivaCursos } from "@modules/materias/services/post.cargar.cursos";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { rutasMaterias } from "@modules/materias/router/routes";

const filterOptions: FilterOptions = [
  {
    key: "estado",
    label: "Estado",
    options: [
      ["Activo", (x: any) => x == "A"],
      ["Inactivo", (x: any) => x == "I"],
    ],
  },
];

/**
 * ListarCursos component – Displays a list of courses for a specific subject (Materia).
 * 
 * This component fetches and displays courses associated with a subject, allowing for:
 * - Viewing courses with state filters (active/inactive).
 * - Uploading courses in bulk via file upload (Excel format).
 * - Navigating to the course creation page.
 * 
 * It uses dialogs for file upload confirmations and shows alerts if there are no courses available.
 * 
 * @component
 * 
 * @example
 * ```tsx
 * <ListarCursos />
 * ```
 * 
 * @returns {JSX.Element} The rendered component displaying the list of courses.
 * 
 * @notes
 * - Displays courses associated with a subject, showing them in a table.
 * - Provides an option to upload courses in bulk.
 * - Provides filters to refine the list of courses based on status (active/inactive).
 * - Handles loading and error states, displaying appropriate feedback messages.
 * 
 * @methods
 * - `setFile(e: React.ChangeEvent<HTMLInputElement>)`: Handles file selection and triggers bulk upload confirmation dialog.
 * - `updateFile(file: File)`: Handles the bulk file upload via mutation.
 * - `setError(err)`: Handles errors related to data fetching or upload process.
 * 
 * @props
 * - `idMateria` (from route params): The ID of the subject to fetch and display courses for.
 */
function ListarCursos() {
  const { idMateria } = useParams();

  const [cursos, setCursos] = useState<CursoTabla[]>([]);

  const [cursosBuffer, setCursosBuffer] = useState<CursoTabla[]>([]);

  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error: errorQuery,
  } = useQuery({
    queryFn: () => getCursoByMateriaId(token, idMateria ?? ""),
    queryKey: [`Get Cursos`, idMateria, token],
  });

  const {
    showDialog,
    open,
    title,
    message,
    handleCancel,
    type,
    handleAccept,
    setIsLoading,
    handleClose,
    handleOpen,
  } = useAlertDialog();

  const { mutate: updateFile } = useMutation({
    mutationFn: async (file: File) => {
      setIsLoading(true);
      await postCargaMasivaCursos(token, file);
    },
    onSuccess: () => {
      showDialog({
        message: "Se han cargado las cursos correctamente",
        title: "Gestión de cursos",
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
        message: "¿Estás seguro de cargar este documento para la carga masiva de cursos?",
        title: "Gestión de cursos",
        onCancel: handleClose,
        onAccept: () => updateFile(file),
        type: "default",
      });

    handleOpen();
  }

  const { setError } = useErrorReader(showDialog);

  useEffect(() => {
    if (errorQuery) setError(errorQuery);
  }, [errorQuery]);

  useEffect(() => {
    if (data) {
      setCursos(data.map((curso) => adaptCursoTabla(adaptCursoService(curso))));
    }
  }, [data]);

  useEffect(() => {
    setCursosBuffer(cursos);
  }, [cursos]);

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        handleCancel={handleCancel}
        type={type}
      />

      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={3}>
          <Typography variant="h4">{labelListarCursos.titulo}</Typography>
          <SelectFilters
            data={cursos}
            filterOptions={filterOptions}
            setRefineData={setCursosBuffer}
          />
          {cursos.length > 0 ? (
            <TablaCursos cursos={cursosBuffer} />
          ) : (
            <Alert severity="warning">
              Esta materia no presenta cursos registrados actualmente
            </Alert>
          )}
          <Stack justifyContent={"end"} direction={"row"} spacing={2}>
            <Box>
              <GeneralButton
                mode={buttonTypes.add}
                onClick={() =>
                  navigate(rutasMaterias.crearCurso.replace(":idMateria", idMateria || "-1"))
                }
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

export default ListarCursos;
