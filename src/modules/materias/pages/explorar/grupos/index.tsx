/**
 * Component to display all course groups (cursos) for a specific subject (materia).
 *
 * This component fetches a materia by its ID from the URL, renders its name,
 * and shows a list of available cursos (course groups). Users can also register
 * to a course, and the component manages dialogs, loading states, and errors.
 *
 * @component
 */

import AlertDialog from "@modules/general/components/alertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import CardCurso from "@modules/materias/components/cardCurso";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import { getCursoById, getCursos } from "@modules/materias/services/get.curso";
import { getMateriaById } from "@modules/materias/services/get.materia.services";
import { patchEstudiantesCurso } from "@modules/materias/services/patch.curso.estudiantes";
import { postCreateSolicitudCurso } from "@modules/materias/services/post.solicitud.curso";
import { Materia } from "@modules/materias/types/materia";
import { adaptMateriaServiceToMateria } from "@modules/materias/utils/adapters/materia.service";
import { Alert, Card, Grid2, Stack, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerCursosMateria() {
  /** Get subject ID from URL parameters */
  const { idMateria } = useParams();

  /** Map of course IDs the user is registered in */
  const [myGroupsIds, setMyGroupsIds] = useState<Map<string, boolean> | undefined>(undefined);

  /** Alert dialog control hook */
  const { showDialog, open, title, message, type, handleAccept, isLoading, setIsLoading } =
    useAlertDialog();

  /** Error handling hook */
  const { setError } = useErrorReader(showDialog);

  /** Authentication context */
  const { accountInformation } = useAuth();
  const { token, id, tipo } = accountInformation;

  const IS_STUDENT = tipo == "E";

  /**
   * Query to get subject (materia) details by ID
   */
  const { data, error } = useQuery({
    queryFn: async () => {
      let response = await getMateriaById(token, parseInt(idMateria ?? "-1"));
  
      if (response.cursos) {
        const updatedCursos = await Promise.all(
          response.cursos.map(async (curso) => {
            const { docente } = await getCursoById(token, curso.id);
            return { ...curso, docente };
          })
        );
        response.cursos = updatedCursos;
      }
  
      return response;
    },
    queryKey: ["Get Groups Explore", parseInt(idMateria ?? "-1")],
  });

  /** Course ID to register */
  const [idCurso, setIdCurso] = useState<string | undefined>(undefined);

  /** Handle API error for getting materia */
  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  /**
   * Query to get the user's registered courses (cursos)
   */
  const {
    data: dataMyGroups,
    isLoading: isLoadingMyGroups,
    error: errorMyGroups,
  } = useQuery({
    queryFn: async () => {
      return IS_STUDENT
        ? await getCursos(token, { estudiantes: id })
        : await getCursos(token, { docente: id });
    },
    queryKey: ["Get My Groups For Explore", id],
  });

  /** Handle API error for user groups */
  useEffect(() => {
    if (errorMyGroups) setError(errorMyGroups);
  }, [errorMyGroups]);

  /** When user's courses are available, convert to map for lookup */
  useEffect(() => {
    if (dataMyGroups) setMyGroupsIds(new Map(dataMyGroups.map((data) => [data.id, true])));
  }, [dataMyGroups]);

  /**
   * Mutation to register student to a course
   */
  const { isPending: isPendingRegister, mutate: mutateRegister } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      if (IS_STUDENT) return await patchEstudiantesCurso(token, [id], "A", idCurso ?? "");
      else return await postCreateSolicitudCurso(token, id, idCurso ?? "");
    },
    mutationKey: ["Register In Group", id, idCurso ?? ""],
    onSuccess: () => {
      const isStudentNow = IS_STUDENT; // leer el valor actualizado aquí
      showDialog({
        title: isStudentNow ? "Registrar en Curso" : "Solicitar Curso",
        message: isStudentNow
          ? "Te has matriculado en el curso correctamente"
          : "Se ha enviado la solicitud de administración de curso",
        reload: true,
        type: "success",
        onAccept: () => {},
      });
    },
    onError: (error) => setError(error),
  });

  /** Adapted materia object for rendering */
  const [materia, setMateria] = useState<Materia | undefined>(undefined);

  /** When API data is ready, adapt it for the UI */
  useEffect(() => {
    if (data) {
      setMateria(adaptMateriaServiceToMateria(data));
    }
  }, [data]);

  /** Confirm registration when user accepts modal */
  function handleAcceptConfirmation() {
    mutateRegister();
  }

  /** Modal dialog hook */
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  /**
   * Sets course ID and opens modal to confirm registration
   *
   * @param {string | undefined} id - Course ID to register
   */
  function handleIdGroup(id: string | undefined) {
    setIdCurso(id);
    handleOpenModal();
  }

  return (
    <>
      {/* Confirmation dialog for course registration */}
      <AlertDialog
        open={openModal}
        handleAccept={handleAcceptConfirmation}
        title={IS_STUDENT ? "Registrar en grupo académico" : "Solicitar Curso"}
        isLoading={isPendingRegister}
        handleCancel={handleCloseModal}
        textBody={
          IS_STUDENT
            ? "¿Está seguro de que desea registrarse en el grupo seleccionado?"
            : "¿Está seguro de que desea solicitar el curso seleccionado?"
        }
      />

      {/* Generic alert dialog for success/error */}
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoading}
      />

      {/* Show loader while data is loading */}
      {isLoading || isLoadingMyGroups ? (
        <LoaderElement />
      ) : (
        <>
          {/* Render content only if materia is available */}
          {materia && (
            <Stack spacing={3} paddingX={6}>
              {/* Subject name */}
              <Card>
                <Stack spacing={3} margin={4}>
                  <Typography variant="h3">{materia.nombre}</Typography>
                </Stack>
              </Card>

              {/* List of course groups or warning if none available */}
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
                          type={IS_STUDENT ? "student" : "teacher"}
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
