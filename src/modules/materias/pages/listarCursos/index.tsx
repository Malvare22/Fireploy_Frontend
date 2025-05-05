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
import { rutasMaterias } from "@modules/materias/router/router";
import HiddenButton from "@modules/materias/components/hiddenInput";
import { postCargaMasivaCursos } from "@modules/materias/services/post.cargar.cursos";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
    queryKey: [`Fetch Cursos`, idMateria],
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
                <HiddenButton type="file" onChange={setFile} multiple accept=".xls, .xsls" />
              </Button>
            </Box>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default ListarCursos;
