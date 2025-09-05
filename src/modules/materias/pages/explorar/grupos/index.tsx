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
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import { adaptMateriaService } from "@modules/materias/utils/adapters/materia.service";
import { getSolicitudes } from "@modules/usuarios/services/get.solicitudes";
import {
  Alert,
  Card,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

type MetadataOfCourse = { misCursos: string[]; cursosConSolicitudes?: string[] | undefined };

/**
 * VerCursosMateria component – Displays all available course groups (cursos) for a specific subject (materia).
 *
 * This component fetches the details of a subject (materia) from the API, and then displays the list of available course groups (cursos).
 * It also allows users (students or teachers) to register for a course or submit a course request, depending on their role.
 * The component handles loading, success, and error states with modal dialogs and feedback messages.
 *
 * @component
 *
 * @example
 * ```tsx
 * <VerCursosMateria />
 * ```
 *
 * @returns {JSX.Element} The rendered component displaying the course groups for a subject, with registration functionality.
 *
 * @notes
 * - Students can register for available courses directly.
 * - Teachers can submit a course request for approval.
 */
function VerCursosMateria() {
  /** Get subject ID from URL parameters */
  const { idMateria } = useParams();

  /** Alert dialog control hook */
  const { showDialog, open, title, message, type, handleAccept, isLoading, setIsLoading } =
    useAlertDialog();

  /** Error handling hook */
  const { setError } = useErrorReader(showDialog);

  /** Authentication context */
  const { accountInformation } = useAuth();
  const { token, id: idUsuario, tipo: rolDeUsuario } = accountInformation;

  /**
   * Query to get subject (materia) details by ID
   */
  const { isPending, error, data } = useQuery({
    queryFn: async () => {
      const materia = await getMateriaById(token, parseInt(idMateria ?? "-1"));
      const materiaAdaptada = adaptMateriaService(materia);
      if (materia.cursos) {
        const updatedCursos = await Promise.all(
          materia.cursos.map(async (curso) => {
            return await getCursoById(token, curso.id);
          })
        );
        const cursosConsultados = updatedCursos.map((x) => adaptCursoService(x));
        const cursosConsultadosOrdenados = [...cursosConsultados].sort((a, b) =>
          a.semestre.localeCompare(b.semestre)
        );
        return { materia: materiaAdaptada, cursos: cursosConsultadosOrdenados };
      }
      return { materia: materiaAdaptada, cursos: [] };
    },
    queryKey: ["Get Groups Explore", parseInt(idMateria ?? "-1"), token],
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
    data: extraDataOfCourses,
    isLoading: isLoadingMyGroups,
    error: errorMyGroups,
  } = useQuery({
    queryFn: async (): Promise<MetadataOfCourse | null> => {
      let misCursos: string[] = [];
      switch (rolDeUsuario) {
        case "A":
          return null;

        case "D":
          misCursos = (await getCursos(token, { docente: idUsuario })).map((curso) => curso.id);
          const getCursosYaSolicitados = async () => {
            const request = await getSolicitudes(token, { usuario: idUsuario, estado: "P" });
            const cursosSolicitados: string[] = [];
            request.forEach((_request) => {
              if (_request.tipo_solicitud == 2 && _request.curso) {
                cursosSolicitados.push(_request.curso.id);
              }
            });
            return cursosSolicitados;
          };
          return { misCursos: misCursos, cursosConSolicitudes: await getCursosYaSolicitados() };

        case "E":
          misCursos = (await getCursos(token, { estudiantes: idUsuario })).map((curso) => curso.id);
          return { misCursos: misCursos };
      }
    },
    queryKey: ["Get My Groups For Explore", token, idMateria],
  });

  /** Handle API error for user groups */
  useEffect(() => {
    if (errorMyGroups) setError(errorMyGroups);
  }, [errorMyGroups]);

  const IS_TEACHER = rolDeUsuario == "D";

  /**
   * Mutation to register student to a course
   */
  const { isPending: isPendingRegister, mutate: mutateRegister } = useMutation({
    mutationFn: async ({ cursoId, studentId }: { cursoId: string; studentId: number }) => {
      setIsLoading(true);
      if (!IS_TEACHER) return await patchEstudiantesCurso(token, [studentId], "A", cursoId);
      else return await postCreateSolicitudCurso(token, idUsuario, cursoId ?? "");
    },
    mutationKey: ["Register In Group", token],
    onSuccess: () => {
      const isStudentNow = !IS_TEACHER;
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

  /** Confirm registration when user accepts modal */
  function handleAcceptConfirmation() {
    mutateRegister({ cursoId: idCurso ?? "", studentId: idUsuario });
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

  const { cursos, materia } = data ?? {};

  const avaliableCourses = useMemo(() => {
    if (!data || !materia) return [];

      const cursosDisponibles = cursos?.filter((curso) => curso.estado == "A");
     
      return cursosDisponibles;
    
  }, [data]);

  return (
    <>
      {/* Confirmation dialog for course registration */}
      <AlertDialog
        open={openModal}
        handleAccept={handleAcceptConfirmation}
        title={!IS_TEACHER ? "Registrar en grupo académico" : "Solicitar Curso"}
        isLoading={isPendingRegister}
        handleCancel={handleCloseModal}
        textBody={
          !IS_TEACHER
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
      {isPending || isLoadingMyGroups ? (
        <LoaderElement />
      ) : (
        <>
          {/* Render content only if materia is available */}
          {materia && (
            <Stack spacing={3} paddingX={2}>
              {/* Subject name */}
              <Card>
                <Stack spacing={3} margin={4}>
                  <Typography variant="h3">{materia.nombre}</Typography>
                </Stack>
              </Card>

              <Typography variant="h4">{labelListarCursos.titulo}</Typography>

              {avaliableCourses && avaliableCourses.length > 0 ? (
                <>
                  <Grid container spacing={4}>
                    {avaliableCourses.map((curso) => (
                      <Grid size={12} key={curso.grupo}>
                        <CardCurso
                          isRegister={
                            extraDataOfCourses?.misCursos.includes(curso.id || "-1") ?? false
                          }
                          onClick={() => handleIdGroup(curso.id)}
                          curso={curso}
                          materiaNombre={materia.nombre}
                          userType={rolDeUsuario}
                          hasActiveRequest={extraDataOfCourses?.cursosConSolicitudes?.includes(
                            curso.id || "-1"
                          )}
                        />
                      </Grid>
                    ))}
                  </Grid>
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
