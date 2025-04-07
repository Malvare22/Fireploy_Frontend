import { Curso } from "@modules/materias/types/curso";
import { CursoSchema } from "@modules/materias/utils/forms/form.schema";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import { getMateriaStatesArray } from "@modules/materias/utils/materias";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCursoById } from "@modules/materias/services/get.curso";
import { useEffect, useMemo, useState } from "react";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import AlertDialog from "@modules/general/components/alertDialog";
import { patchEditCurso } from "@modules/materias/services/patch.curso";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import TablaEstudiantesEditarCurso from "@modules/materias/components/tablaEstudiantesEditarCurso";
import Modal from "@modules/general/components/modal";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import AddUsers from "@modules/usuarios/components/addUsers";
import { patchEstudiantesCurso } from "@modules/materias/services/patch.curso.estudiantes";
import TablaGestionarSecciones from "@modules/materias/components/tablaSecciones";
import { UsuarioCampoBusqueda } from "@modules/general/hooks/useSearchUsers";
import { patchEditSeccion } from "@modules/materias/services/patch.modificar.seccion";
import { Seccion } from "@modules/materias/types/seccion";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import AlertDialogError, { CustomError } from "@modules/general/components/alertDialogError";
import LoaderElement from "@modules/general/components/loaderElement";

export enum labelEditarCurso {
  titulo = "Editar Curso",
  descripcion = "Descripción",
  estado = "Estado",
  secciones = "Secciones",
  tituloModalEstudiante = "Agregar Estudiantes",
}

function EstadoField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<Curso>();

  return (
    <Controller
      name="estado"
      control={control}
      render={({ field }) => (
        <TextField
          select
          size="small"
          {...field}
          error={!!errors.estado}
          helperText={errors.estado?.message}
        >
          {getMateriaStatesArray.map(([clave, valor]) => (
            <MenuItem value={clave} key={clave}>
              {valor}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}

function VistaEditarCurso() {
  const { idCurso } = useParams();
  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const [curso, setCurso] = useState<Curso | undefined>(undefined);

  const methods = useForm<Curso>({
    resolver: zodResolver(CursoSchema),
    defaultValues: {} as Curso,
  });

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
    data: dataFetchCurso,
    isLoading: isLoadingFetchCurso,
    error: errorFetchCurso,
  } = useQuery({
    queryKey: ["fetchCurso"],
    queryFn: () => getCursoById(token, idCurso ?? "-1"),
  });

  const {
    mutate: mutatePatchCurso,
    isPending: isPendingPatchCurso,
    error: errorPatchCurso,
    data: dataPatchCurso,
  } = useMutation({
    mutationFn: () => patchEditCurso(token, methods.getValues()),
    mutationKey: ["patchCurso"],
    onSuccess: handleOpenSuccess,
    onError: handleOpenError,
  });

  useEffect(() => {
    if (dataFetchCurso) {
      setCurso(adaptCursoService(dataFetchCurso));
    }
  }, [dataFetchCurso]);

  useEffect(() => {
    if (curso) {
      methods.reset(curso);
    }
  }, [curso, methods.reset]);

  const { handleClose, handleOpen, open } = useModal();

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

  const requestSetForSections = async (secciones: Seccion[]) => {
    const seccionesConId = secciones.filter((seccion) => seccion.id);

    await Promise.all(
      seccionesConId.map(async (seccion) => {
        await patchEditSeccion(token, seccion);
      })
    );

    handleOpenSuccess();
  };

  const onSubmit = async () => {
    await mutatePatchCurso();
  };

  const { getValues } = methods;

  useEffect(() => {
    if (dataPatchCurso) {
      if (getValues("secciones")) requestSetForSections(getValues("secciones") || []);
      else {
        handleOpenSuccess();
      }
    }
  }, [dataPatchCurso]);

  return (
    <>
      <AlertDialog
        handleAccept={mutateAddStudents}
        open={openAddStudents}
        title="Agregar Estudiantes"
        textBody={"¿Desea agregar a los estudiantes seleccionados?"}
        isLoading={isPendingAddStudents}
        handleCancel={handleCloseAddStudents}
      />
      <Modal sx={{ maxWidth: 700 }} handleClose={handleClose} open={open}>
        <AddUsers
          typeUsers="Estudiante"
          selectUsers={usersSelected}
          setSelectUsers={setUsersSelected}
          handleAccept={handleOpenAddStudents}
          handleCancel={handleCloseAddStudents}
        />
      </Modal>
      {(errorFetchCurso || errorAddStudents || errorRemoveStudents || errorPatchCurso) && (
        <AlertDialogError
          error={
            (errorFetchCurso ||
              errorPatchCurso ||
              errorAddStudents ||
              errorRemoveStudents) as CustomError
          }
          handleClose={handleCloseError}
          open={openError}
          title="Edición de Curso"
        />
      )}
      <AlertDialog
        handleAccept={mutateRemoveStudents}
        open={openRemoveStudents}
        handleCancel={handleCloseRemoveStudents}
        title="Información del Curso"
        textBody={"¿Está seguro de remover a los usuarios seleccionados?"}
        isLoading={isPendingRemoveStudents}
      />

      <AlertDialogSuccess
        handleClose={handleCloseSuccess}
        message="Operación realizada exitosamente"
        open={openSuccess}
        title="Edición de Curso"
      />

      {isLoadingFetchCurso ? (
        <LoaderElement />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EditIcon color="primary" />
                <Typography variant="h5" fontWeight="bold">
                  {labelEditarCurso.titulo}
                </Typography>
              </Stack>

              <TextField
                label={labelEditarCurso.descripcion}
                {...methods.register("descripcion")}
                error={!!methods.formState.errors.descripcion}
                helperText={methods.formState.errors.descripcion?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />

              <EstadoField />

              <Stack>
                <TablaEstudiantesEditarCurso
                  estudiante={curso?.estudiantes || []}
                  setSelectUsers={setSelectStudentsToRemove}
                />
                <Stack alignItems="end">
                  <Box>
                    <GeneralButton
                      color="error"
                      mode={buttonTypes.remove}
                      disabled={selectStudentsToRemove.length == 0}
                      onClick={handleOpenRemoveStudents}
                    />
                    <GeneralButton mode={buttonTypes.add} onClick={handleOpen} />
                  </Box>
                </Stack>
              </Stack>

              <Stack>
                <TablaGestionarSecciones />
              </Stack>

              <GeneralButton mode={buttonTypes.save} loading={isPendingPatchCurso} type="submit" />
            </Stack>
          </form>
        </FormProvider>
      )}
    </>
  );
}

export default VistaEditarCurso;
