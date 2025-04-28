import { Alert, Stack } from "@mui/material";
import TablaEstudiantesEditarCurso from "../tablaEstudiantesEditarCurso";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { useMemo, useState } from "react";
import { UsuarioCampoBusqueda } from "@modules/general/hooks/useSearchUsers";
import { useMutation } from "@tanstack/react-query";
import { patchEstudiantesCurso } from "@modules/materias/services/patch.curso.estudiantes";
import AlertDialog from "@modules/general/components/alertDialog";
import AddUsers from "@modules/usuarios/components/addUsers";
import { Curso } from "@modules/materias/types/curso";
import { useAuth } from "@modules/general/context/accountContext";
import SpringModal from "@modules/general/components/springModal";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import { labelEditCourse } from "@modules/materias/enums/labelEditCourse";

type Props = {
  curso: Curso;
  idCurso: string;
};

/**
 * Component to manage the students assigned to a specific course.
 * Allows adding and removing students from a course using modal dialogs and alerts.
 *
 * @param {Curso} curso - The course data including enrolled students.
 * @param {string} idCurso - The unique identifier for the course.
 */
function GestionarEstudiantesCurso({ curso, idCurso }: Props) {
  // Handles alert dialogs for success, error, and confirmation messages
  const { showDialog, open, title, message, handleCancel, type, handleAccept, setIsLoading, isLoading } =
    useAlertDialog();

  // Hook to display errors in a readable format
  const { setError } = useErrorReader(showDialog);

  // Authentication token from context
  const token = useAuth().accountInformation.token;

  // State for selected users to add to the course
  const [usersSelected, setUsersSelected] = useState<UsuarioCampoBusqueda[]>([]);

  // State for selected student IDs to remove from the course
  const [selectStudentsToRemove, setSelectStudentsToRemove] = useState<number[]>([]);

  // Memoized list of user IDs to add
  const usersToAddCodes = useMemo(() => usersSelected.map((user) => user.id), [usersSelected]);

  /**
   * Mutation for adding students to a course.
   */
  const { mutate: mutateAddStudents } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      return await patchEstudiantesCurso(token, usersToAddCodes, "A", idCurso ?? "-1");
    },
    mutationKey: ["Add Students", usersToAddCodes],
    onSuccess: () =>
      showDialog({
        title: "Añadir Estudiantes a un Curso",
        message: "Estudiantes registrados al curso de manera correcta!",
        onAccept: () => {},
        reload: true,
        type: "success",
      }),
    onError: (error) => setError(error),
  });

  /**
   * Mutation for removing students from a course.
   */
  const { mutate: mutateRemoveStudents } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      return await patchEstudiantesCurso(token, selectStudentsToRemove, "D", idCurso ?? "-1");
    },
    mutationKey: ["Remove Students"],
    onSuccess: () =>
      showDialog({
        title: "Eliminar Estudiantes de un Curso",
        message: "Estudiantes registrados al curso de manera correcta!",
        onAccept: () => {},
        reload: true,
        type: "success",
      }),
    onError: (error) => setError(error),
  });

  /**
   * Shows confirmation dialog before removing students from the course.
   */
  function confirmRemoveStudents() {
    showDialog({
      title: "Eliminar Estudiantes de un Curso",
      message: "¿Está seguro de remover a los usuarios seleccionados?",
      onCancel: () => {},
      onAccept: () => mutateRemoveStudents(),
      type: "default",
    });
  }

  /**
   * Shows confirmation dialog before adding students to the course.
   */
  function confirmAddStudents() {
    showDialog({
      title: "Agregar Estudiantes de un Curso",
      message: "¿Está seguro de Agregar a los usuarios seleccionados?",
      onCancel: () => {},
      onAccept: () => mutateAddStudents(),
      type: "default",
    });
  }

  // Modal state and handlers for the Add Users modal
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  return (
    <>
      {/* Confirmation / Info / Error dialog */}
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
        handleCancel={handleCancel}
        isLoading={isLoading}
      />

      {/* Modal for selecting and adding users */}
      <SpringModal sx={{ width: 800 }} handleClose={handleCloseModal} open={openModal}>
        <AddUsers
          typeUsers="Estudiante"
          selectUsers={usersSelected}
          setSelectUsers={setUsersSelected}
          handleAccept={confirmAddStudents}
          handleCancel={handleCloseModal}
        />
      </SpringModal>

      {/* Main content with table and buttons */}
      <Stack spacing={3}>
        {!curso?.estudiantes || curso.estudiantes.length != 0 ? (
          <TablaEstudiantesEditarCurso
            estudiante={curso?.estudiantes || []}
            setSelectUsers={setSelectStudentsToRemove}
          />
        ) : (
          <Alert severity="warning">{labelEditCourse.notHasStudents}</Alert>
        )}

        {/* Action buttons for removing or adding students */}
        <Stack justifyContent="end" spacing={2} alignContent={"end"} direction={"row"}>
          <GeneralButton
            color="error"
            mode={buttonTypes.remove}
            disabled={selectStudentsToRemove.length == 0}
            onClick={confirmRemoveStudents}
          />
          <GeneralButton mode={buttonTypes.add} onClick={handleOpenModal} />
        </Stack>
      </Stack>
    </>
  );
}

export default GestionarEstudiantesCurso;
