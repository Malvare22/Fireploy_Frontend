import AlertDialog from "@modules/general/components/alertDialog";
import AlertDialogError, { CustomError } from "@modules/general/components/alertDialogError";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import CardCurso from "@modules/materias/components/cardCurso";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import { getCursosByIdStudent } from "@modules/materias/services/get.curso";
import { getMateriaById } from "@modules/materias/services/get.materia.services";
import { patchEstudiantesCurso } from "@modules/materias/services/patch.curso.estudiantes";
import { Materia } from "@modules/materias/types/materia";
import { adaptMateriaServiceToMateria } from "@modules/materias/utils/adapters/materia.service";
import { Alert, Card, Grid2, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Component to display all course groups (cursos) for a specific subject (materia).
 *
 * This component fetches a materia by its ID (from URL params), and renders
 * the materia's name and a list of its associated cursos. If no cursos are
 * present, it shows a warning alert. Errors and loading states are also handled.
 *
 * @component
 */
function VerCursosMateria() {
  // Get subject ID from the route parameters
  const { idMateria } = useParams();

  const [myGroupsIds, setMyGroupsIds] = useState<Map<string, boolean> | undefined>(undefined);

  // Get auth token from context
  const { accountInformation } = useAuth();
  const { token, id } = accountInformation;

  // React Query hook to fetch the materia by its ID
  const { data, isLoading, error } = useQuery({
    queryFn: () => getMateriaById(token, parseInt(idMateria ?? "-1")),
    queryKey: ["get groups explore"],
  });

  const [idCurso, setIdCurso] = useState<string | undefined>(undefined);

  // Alert dialog control for error handling
  const {
    handleClose: handleCloseFailFetch,
    open: openFailFetch,
    handleOpen: handleOpenFailFetch,
  } = useAlertDialog();

  const {
    handleOpen: handleOpenSuccessRegister,
    handleClose: handleCloseSuccessRegister,
    open: openSuccessRegister,
  } = useAlertDialog();

  const {
    handleOpen: handleOpenConfirmationRegister,
    handleClose: handleCloseConfirmationRegister,
    open: openConfirmationRegister,
  } = useAlertDialog();

  const {
    data: dataMyGroups,
    isLoading: isLoadingMyGroups,
    error: errorMyGroups,
  } = useQuery({
    queryFn: () => getCursosByIdStudent(token, id),
    queryKey: ["get my groups explore"],
  });

  useEffect(() => {
    if (dataMyGroups) setMyGroupsIds(new Map(dataMyGroups.map((data) => [data.id, true])));
  }, [dataMyGroups]);

  const {
    isPending: isPendingRegister,
    error: errorRegister,
    isSuccess: isSuccessRegister,
    mutate: mutateRegister,
  } = useMutation({
    mutationFn: () => patchEstudiantesCurso(token, [id], "A", idCurso ?? ""),
    mutationKey: ["register in group"],
    onSuccess: () => {
      handleOpenSuccessRegister();
      handleCloseConfirmationRegister();
    },
    onError: handleOpenFailFetch,
  });

  // State to hold the adapted materia object
  const [materia, setMateria] = useState<Materia | undefined>(undefined);

  // Update materia state when data is available
  useEffect(() => {
    if (data) {
      setMateria(adaptMateriaServiceToMateria(data));
    }
  }, [data]);

  function handleAcceptConfirmation() {
    mutateRegister();
  }

  function handleIdGroup(id: string | undefined) {
    setIdCurso(id);
    handleOpenConfirmationRegister();
  }

  return (
    <>
      <AlertDialog
        open={openConfirmationRegister}
        handleAccept={handleAcceptConfirmation}
        title="Registrar en grupo académico"
        isLoading={isPendingRegister}
        handleCancel={handleCloseConfirmationRegister}
        textBody="¿Está seguro de que desea registrarse en el grupo seleccionado?"
      />
      {isSuccessRegister && (
        <AlertDialogSuccess
          open={openSuccessRegister}
          handleClose={handleCloseSuccessRegister}
          title="Registrar en grupo acádemico"
          message={"Ingreso reportado de manera correcta"}
        />
      )}

      {/* Display an error dialog if there's a fetch error */}
      {(error || errorRegister || errorMyGroups) && (
        <AlertDialogError
          error={(error || errorRegister || errorMyGroups) as CustomError}
          handleClose={handleCloseFailFetch}
          open={openFailFetch}
          title="Consultar Grupos Materia"
        />
      )}
      {/* Show loading indicator or main content */}
      {isLoading || isLoadingMyGroups ? (
        <LoaderElement />
      ) : (
        <>
          {/* Only render if materia exists */}
          {materia && (
            <Stack spacing={3} paddingX={6}>
              {/* Materia name in a card */}
              <Card>
                <Stack spacing={3} margin={4}>
                  <Typography variant="h3">{materia.nombre}</Typography>
                </Stack>
              </Card>

              {/* List of cursos or warning message */}
              {materia.cursos && materia.cursos.length > 0 ? (
                <>
                  <Typography variant="h4">{labelListarCursos.grupos}</Typography>
                  <Grid2 container spacing={4}>
                    {materia.cursos?.map((curso, key) => (
                      <Grid2 size={{ md: 3, sm: 6, xs: 12 }} key={key}>
                        <CardCurso
                          isRegister={myGroupsIds?.get(curso.id ?? "-1") ?? false}
                          onClick={() => handleIdGroup(curso.id)}
                          curso={curso}
                        />
                      </Grid2>
                    ))}
                  </Grid2>
                </>
              ) : (
                <Alert severity="warning" sx={{ fontSize: 64 }}>
                  <Typography>{labelListarCursos.noHayGrupos}</Typography>
                </Alert>
              )}
            </Stack>
          )}
        </>
      )}
    </>
  );
}

export default VerCursosMateria;
