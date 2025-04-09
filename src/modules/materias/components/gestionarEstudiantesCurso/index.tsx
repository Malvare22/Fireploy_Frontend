import { Alert, Box, Stack, Typography } from "@mui/material";
import TablaEstudiantesEditarCurso from "../tablaEstudiantesEditarCurso";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { useMemo, useState } from "react";
import { UsuarioCampoBusqueda } from "@modules/general/hooks/useSearchUsers";
import { useMutation } from "@tanstack/react-query";
import { patchEstudiantesCurso } from "@modules/materias/services/patch.curso.estudiantes";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import { labelEditarCurso } from "@modules/materias/pages/editarCurso";
import AlertDialog from "@modules/general/components/alertDialog";
import AddUsers from "@modules/usuarios/components/addUsers";
import Modal from "@modules/general/components/modal";
import { Curso } from "@modules/materias/types/curso";
import { useAuth } from "@modules/general/context/accountContext";
import AlertDialogError, { CustomError } from "@modules/general/components/alertDialogError";
import { useCustomTableStyles } from "@modules/general/styles";
import SpringModal from "@modules/general/components/springModal";

type Props = {
  curso: Curso;
  idCurso: string;
};

function GestionarEstudiantesCurso({ curso, idCurso }: Props) {
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useAlertDialog();

  const token = useAuth().accountInformation.token;

  const {
    handleClose: handleCloseRemoveStudents,
    handleOpen: handleOpenRemoveStudents,
    open: openRemoveStudents,
  } = useAlertDialog();

  const {
    handleClose: handleCloseAddStudents,
    handleOpen: handleOpenAddStudents,
    open: openAddStudents,
  } = useAlertDialog();

  const {
    handleOpen: handleOpenError,
    handleClose: handleCloseError,
    open: openError,
  } = useAlertDialog();

  const {
    handleOpen: handleOpenSuccess,
    handleClose: handleCloseSuccess,
    open: openSuccess,
  } = useAlertDialog();

  const [usersSelected, setUsersSelected] = useState<UsuarioCampoBusqueda[]>([]);

  const [selectStudentsToRemove, setSelectStudentsToRemove] = useState<number[]>([]);

  const usersToAddCodes = useMemo(() => usersSelected.map((user) => user.id), [usersSelected]);

  const {
    mutate: mutateAddStudents,
    isPending: isPendingAddStudents,
    error: errorAddStudents,
  } = useMutation({
    mutationFn: () => patchEstudiantesCurso(token, usersToAddCodes, "A", idCurso ?? "-1"),
    mutationKey: ["addStudents"],
    onSuccess: handleOpenSuccess,
    onError: handleOpenError,
  });
  const {
    mutate: mutateRemoveStudents,
    isPending: isPendingRemoveStudents,
    error: errorRemoveStudents,
  } = useMutation({
    mutationFn: () => patchEstudiantesCurso(token, selectStudentsToRemove, "D", idCurso ?? "-1"),
    mutationKey: ["removeStudents"],
    onSuccess: handleOpenSuccess,
    onError: handleOpenError,
  });

  return (
    <>
      <AlertDialogSuccess
        handleClose={handleCloseSuccess}
        message="Operación realizada exitosamente"
        open={openSuccess}
        title="Edición de Curso"
      />
      <AlertDialog
        handleAccept={mutateRemoveStudents}
        open={openRemoveStudents}
        handleCancel={handleCloseRemoveStudents}
        title="Información del Curso"
        textBody={"¿Está seguro de remover a los usuarios seleccionados?"}
        isLoading={isPendingRemoveStudents}
      />
      {(errorAddStudents || errorRemoveStudents) && (
        <AlertDialogError
          error={(errorAddStudents || errorRemoveStudents) as CustomError}
          title="Gestión de Cursos"
          handleClose={handleCloseError}
          open={openError}
        />
      )}
      <AlertDialog
        handleAccept={() => {
          mutateAddStudents();
          handleCloseAddStudents();
        }}
        open={openAddStudents}
        title="Agregar Estudiantes"
        textBody={"¿Desea agregar a los estudiantes seleccionados?"}
        isLoading={isPendingAddStudents}
        handleCancel={handleCloseAddStudents}
      />
      <SpringModal sx={{ width: 800 }} handleClose={handleCloseModal} open={openModal}>
        <AddUsers
          typeUsers="Estudiante"
          selectUsers={usersSelected}
          setSelectUsers={setUsersSelected}
          handleAccept={handleOpenAddStudents}
          handleCancel={handleCloseModal}
        />
      </SpringModal>
      <Stack spacing={3}>
        {!curso?.estudiantes || curso.estudiantes.length != 0 ? (
          <TablaEstudiantesEditarCurso
            estudiante={curso?.estudiantes || []}
            setSelectUsers={setSelectStudentsToRemove}
          />
        ) : (
          <Alert severity="warning">{labelEditarCurso.noHayEstudiantes}</Alert>
        )}

        <Stack justifyContent="end" spacing={2} alignContent={"end"} direction={"row"}>
          <GeneralButton
            color="error"
            mode={buttonTypes.remove}
            disabled={selectStudentsToRemove.length == 0}
            onClick={handleOpenRemoveStudents}
          />
          <GeneralButton mode={buttonTypes.add} onClick={handleOpenModal} />
        </Stack>
      </Stack>
    </>
  );
}

export default GestionarEstudiantesCurso;
