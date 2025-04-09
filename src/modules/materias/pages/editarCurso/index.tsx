import { Curso } from "@modules/materias/types/curso";
import { CursoSchema } from "@modules/materias/utils/forms/form.schema";
import {
  Box,
  Chip,
  Divider,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { useParams, useSearchParams } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import { getMateriaStatesArray } from "@modules/materias/utils/materias";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCursoById } from "@modules/materias/services/get.curso";
import { useEffect, useState } from "react";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import { patchEditCurso } from "@modules/materias/services/patch.curso";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import TablaGestionarSecciones from "@modules/materias/components/tablaSecciones";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import AlertDialogError, { CustomError } from "@modules/general/components/alertDialogError";
import LoaderElement from "@modules/general/components/loaderElement";
import GestionarEstudiantesCurso from "@modules/materias/components/gestionarEstudiantesCurso";
import { useSearchUsers, UsuarioCampoBusqueda } from "@modules/general/hooks/useSearchUsers";
import SearchUsers from "@modules/general/components/searchUsers";
import { adaptUserServiceToCB } from "@modules/usuarios/utils/adapt.usuario";
import { getUsuariosByTypeService } from "@modules/usuarios/services/get.usuarios.[tipo]";
import SchoolIcon from "@mui/icons-material/School";
import InfoIcon from "@mui/icons-material/Info";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export enum labelEditarCurso {
  titulo = "Editar Curso",
  descripcion = "Descripción",
  estado = "Estado",
  secciones = "Secciones",
  tituloModalEstudiante = "Agregar Estudiantes",
  noHayEstudiantes = "Actualmente no hay estudiantes registrados",
  noHaySecciones = "Actualmente no hay secciones registradas",
  modificarSecciones = "Guardar Cambios Secciones",
}

function VistaEditarCurso() {
  const { idCurso } = useParams();
  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const [curso, setCurso] = useState<Curso | undefined>(undefined);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "0";

  const [tabIndex, setTabIndex] = useState(page);

  useEffect(() => {
    setTabIndex(page);
  }, [page]);

  function handleChangeTab(_event: React.SyntheticEvent, value: string) {
    setTabIndex(value);
    setSearchParams({ ["page"]: value });
  }

  const methods = useForm<Curso>({
    resolver: zodResolver(CursoSchema),
    defaultValues: {} as Curso,
  });

  const { getValues, control, formState, watch } = methods;

  const { errors, isDirty } = formState;

  console.log(errors);

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

  const onSubmit = async () => {
    await mutatePatchCurso();
  };

  useEffect(() => {
    if (dataPatchCurso) {
      handleOpenSuccess();
    }
  }, [dataPatchCurso]);

  return (
    <>
      {(errorFetchCurso || errorPatchCurso) && (
        <AlertDialogError
          error={(errorFetchCurso || errorPatchCurso) as CustomError}
          handleClose={handleCloseError}
          open={openError}
          title="Edición de Curso"
        />
      )}

      <AlertDialogSuccess
        handleClose={handleCloseSuccess}
        message="Operación realizada exitosamente"
        open={openSuccess}
        title="Edición de Curso"
        reload={false}
      />

      {isLoadingFetchCurso ? (
        <LoaderElement />
      ) : (
        <FormProvider {...methods}>
          <Stack spacing={3} component={Paper} sx={{ padding: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <EditIcon color="primary" />
              <Typography variant="h5" fontWeight="bold">
                {labelEditarCurso.titulo}
              </Typography>
            </Stack>
            <Tabs
              value={tabIndex}
              onChange={handleChangeTab}
              sx={{ borderBottom: 1, borderColor: "divider", textTransform: "none" }}
            >
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <InfoIcon />
                    <Typography fontWeight={500}>Información</Typography>
                  </Stack>
                }
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <PeopleAltIcon />
                    <Typography fontWeight={500}>Estudiantes</Typography>
                  </Stack>
                }
                sx={{ textTransform: "capitalize" }}
              />
            </Tabs>

            {tabIndex == "0" && (
              <>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                    <TeacherCard />
                    <TextField
                      label={labelEditarCurso.descripcion}
                      {...methods.register("descripcion")}
                      error={!!methods.formState.errors.descripcion}
                      helperText={methods.formState.errors.descripcion?.message}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                    <Controller
                      name="estado"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          size="small"
                          fullWidth
                          label="Estado"
                          error={!!errors.estado}
                          helperText={errors.estado?.message}
                          value={watch("estado") || "A"}
                        >
                          {getMateriaStatesArray.map(([clave, valor]) => (
                            <MenuItem value={clave} key={clave}>
                              {valor}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                    <Box>
                      {isDirty && (
                        <GeneralButton
                          mode={buttonTypes.save}
                          loading={isPendingPatchCurso}
                          type="submit"
                        />
                      )}
                    </Box>
                    <Divider />
                  </Stack>
                </form>
                <Stack spacing={2}>
                  <TablaGestionarSecciones />
                </Stack>
              </>
            )}
            {tabIndex == "1" && (
              <Box>
                <GestionarEstudiantesCurso curso={getValues()} idCurso={idCurso || ""} />
              </Box>
            )}
          </Stack>
        </FormProvider>
      )}
    </>
  );
}

function TeacherCard() {
  const { setValue: setValuesCurso, watch: watchCurso } = useFormContext<Curso>();
  const [docentes, setDocentes] = useState<UsuarioCampoBusqueda[]>([]);

  const token = useAuth().accountInformation.token;

  const { handleClose: handleCloseFetchDocentes, open: openFetchDocentes } = useAlertDialog();

  const {
    data: dataFetchDocentes,
    isLoading: isLoadingFetchDocentes,
    error: errorFetchDocentes,
  } = useQuery({
    queryFn: () => getUsuariosByTypeService("Docente", token),
    queryKey: ["Get Docentes"],
  });

  useEffect(() => {
    if (dataFetchDocentes)
      setDocentes(dataFetchDocentes.map((docente) => adaptUserServiceToCB(docente)));
  }, [dataFetchDocentes]);

  const { selectUser, setSelectUser } = useSearchUsers();

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (selectUser && selectUser?.nombreCompleto) {
      setValuesCurso("docente.id", selectUser?.id, { shouldDirty: true });
      setValuesCurso("docente.nombre", selectUser?.nombreCompleto!!, { shouldDirty: true });
    }
  }, [selectUser]);

  function Field() {
    if (!edit) {
      if (watchCurso().docente == null)
        return (
          <Chip
            icon={<InfoIcon />}
            label={<Typography variant="body1">Docente sin asignar</Typography>}
          />
        );
      else {
        return (
          <Chip
            icon={<SchoolIcon />}
            color="info"
            label={
              <Typography variant="body1" sx={{ padding: 1 }}>
                {watchCurso("docente.nombre")}
              </Typography>
            }
          />
        );
      }
    } else {
      return (
        <SearchUsers
          loading={isLoadingFetchDocentes}
          selectUser={selectUser}
          setSelectUser={setSelectUser}
          users={docentes}
        />
      );
    }
  }

  function handleMode() {
    setEdit(!edit);
  }

  function handleDelete() {
    setValuesCurso("docente", null, { shouldDirty: true });
  }

  function ButtonMode() {
    return !edit ? (
      <>
        <ActionButton mode={actionButtonTypes.editar} onClick={handleMode} />
        <ActionButton mode={actionButtonTypes.eliminar} onClick={handleDelete} />
      </>
    ) : (
      <>
        <ActionButton mode={actionButtonTypes.guardar} onClick={handleMode} />
        <ActionButton mode={actionButtonTypes.cancelar} onClick={handleMode} />
      </>
    );
  }

  return (
    <>
      {errorFetchDocentes && (
        <AlertDialogError
          open={openFetchDocentes}
          error={errorFetchDocentes}
          handleClose={handleCloseFetchDocentes}
          title="Obtener docentes"
        />
      )}
      <Stack direction={"row"} alignItems={"center"} spacing={1} width={500}>
        <Field />
        <ButtonMode />
      </Stack>
    </>
  );
}

export default VistaEditarCurso;
