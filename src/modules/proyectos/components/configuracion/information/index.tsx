import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "@modules/general/components/alertDialog";
import AlertDialogError from "@modules/general/components/alertDialogError";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import GeneralButton from "@modules/general/components/button";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import { ParamsContext } from "@modules/general/context/paramasContext";
import { StepperContext } from "@modules/general/context/stepper.Contex";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { buttonTypes } from "@modules/general/types/buttons";
import { getAllAcademicInformation } from "@modules/materias/services/get.materias.services";
import { patchEditProject } from "@modules/proyectos/services/patch.edit.project";
import { postCreateProject } from "@modules/proyectos/services/post.create.project";
import {
  ProyectoSchema,
  ProyectoInformationSchema,
} from "@modules/proyectos/utils/forms/proyecto.schema";
import { getProjectTypesMap } from "@modules/proyectos/utils/getProjectTypes";
import { Box, Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useFormContext, Controller, useForm } from "react-hook-form";

type Props = {
  type: "edit" | "create";
};
export const Information = ({ type }: Props) => {
  const { getValues: getValuesPrincipal } = useFormContext<ProyectoSchema>();

  const { updateSearchParams, searchParams } = useContext(ParamsContext);

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    getValues,
  } = useForm<ProyectoInformationSchema>({
    defaultValues: getValuesPrincipal(),
    resolver: zodResolver(ProyectoInformationSchema),
  });
  const { token } = useAuth().accountInformation;

  const { handleNext } = useContext(StepperContext);

  // 🔹 Error al obtener información académica
  const {
    handleClose: handleCloseGetAcademycInfoError,
    handleOpen: handleOpenGetAcademycInfoError,
    open: openGetAcademycInfoError,
  } = useAlertDialog();

  // 🔹 Error al crear proyecto
  const {
    handleClose: handleCloseCreateProjectError,
    handleOpen: handleOpenCreateProjectError,
    open: openCreateProjectError,
  } = useAlertDialog();

  // 🔹 Error al editar proyecto
  const {
    handleClose: handleCloseEditProjectError,
    handleOpen: handleOpenEditProjectError,
    open: openEditProjectError,
  } = useAlertDialog();

  const {
    handleClose: handleCloseEditProjectSuccess,
    handleOpen: handleOpenEditProjectSuccess,
    open: openEditProjectSuccess,
  } = useAlertDialog();

  const {
    handleClose: handleCloseEditProjectConfirmation,
    handleOpen: handleOpenEditProjectConfirmation,
    open: openEditProjectConfirmation,
  } = useAlertDialog();

  const {
    data: dataMaterias,
    isLoading: isLoadingMaterias,
    error: errorDataMaterias,
  } = useQuery({
    queryFn: () => getAllAcademicInformation(token),
    queryKey: ["Get All Academic Information"],
  });

  useEffect(() => {
    if (errorDataMaterias) {
      handleOpenGetAcademycInfoError();
    }
  }, [errorDataMaterias]);

  const {
    mutate: mutateCreate,
    isPending: isPendingCreate,
    data: dataCreate,
    isSuccess: isSuccessCreate,
    error: errorCreate,
  } = useMutation({
    mutationFn: () => postCreateProject(token, getValues()),
    mutationKey: ["Create Project"],
    onError: handleOpenCreateProjectError,
  });

  const {
    mutate: mutateEdit,
    isPending: isPendingEdit,
    error: errorEdit,
  } = useMutation({
    mutationFn: () => patchEditProject(token, getValues()),
    mutationKey: ["Edit Project"],
    onError: handleOpenEditProjectError,
    onSuccess: () => {
      handleCloseEditProjectConfirmation();
      handleOpenEditProjectSuccess();
    },
  });

  useEffect(() => {
    if (!dataCreate || !isSuccessCreate) return;
    updateSearchParams("id", dataCreate.id.toString());
  }, [dataCreate, isSuccessCreate]);

  useEffect(() => {
    if (dataCreate && isSuccessCreate) handleNext();
  }, [searchParams]);

  function onSubmit() {
    if (type == "edit") {
      handleOpenEditProjectConfirmation();
    } else mutateCreate();
  }

  if (!dataMaterias) return <LoaderElement />;

  const { getCursosByMateria, getSeccionByCurso, selectCurso, selectMaterias, selectSeccion } =
    dataMaterias;

  return (
    <>
      <AlertDialog
        handleAccept={mutateEdit}
        open={openEditProjectConfirmation}
        title="Editar Información Básica del Proyecto"
        handleCancel={handleCloseEditProjectConfirmation}
        isLoading={isPendingEdit}
      />
      <AlertDialogSuccess
        handleClose={handleCloseEditProjectSuccess}
        message="Información actualizada correctamente"
        open={openEditProjectSuccess}
        title="Editar Información Básica del Proyecto"
      />
      {errorEdit && (
        <AlertDialogError
          error={errorEdit}
          handleClose={handleCloseEditProjectError}
          open={openEditProjectError}
          title="Editar Información Básica del Proyecto"
        />
      )}
      {errorDataMaterias && (
        <AlertDialogError
          error={errorDataMaterias}
          handleClose={handleCloseGetAcademycInfoError}
          open={openGetAcademycInfoError}
          title="Información de Materias"
        />
      )}
      {errorCreate && (
        <AlertDialogError
          error={errorCreate}
          handleClose={handleCloseCreateProjectError}
          open={openCreateProjectError}
          title="Creación Información Básica del Proyecto"
        />
      )}
      {isLoadingMaterias && !dataMaterias ? (
        <LoaderElement />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Typography variant="h5">Información</Typography>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Controller
                  name="titulo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      fullWidth
                      label="Nombre del proyecto"
                      error={!!errors.titulo}
                      helperText={errors.titulo?.message?.toString()}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={12}>
                <Controller
                  name="descripcion"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      fullWidth
                      label="Descripción"
                      multiline
                      rows={4}
                      error={!!errors.descripcion}
                      helperText={errors.descripcion?.message?.toString()}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={4}>
                {
                  <Controller
                    name="materiaInformacion.materiaId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        fullWidth
                        {...field}
                        select
                        label="Descripción"
                        multiline
                        rows={4}
                        error={!!errors.descripcion}
                        helperText={errors.descripcion?.message?.toString()}
                      >
                        {Array.from(selectMaterias.entries() || []).map(([value, label]) => (
                          <MenuItem value={value} key={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                }
              </Grid2>
              <Grid2 size={4}>
                {getCursosByMateria.get(watch("materiaInformacion.materiaId")) && (
                  <Controller
                    name="materiaInformacion.cursoId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        fullWidth
                        {...field}
                        select
                        label="Descripción"
                        multiline
                        rows={4}
                        error={!!errors.descripcion}
                        helperText={errors.descripcion?.message?.toString()}
                      >
                        {Array.from(
                          getCursosByMateria.get(watch("materiaInformacion.materiaId")) || []
                        ).map((curso) => (
                          <MenuItem value={curso} key={curso}>
                            {selectCurso.get(curso)}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                )}
              </Grid2>
              {getSeccionByCurso.get(watch("materiaInformacion.cursoId")) && (
                <Grid2 size={4}>
                  {
                    <Controller
                      name="materiaInformacion.seccionId"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          fullWidth
                          {...field}
                          select
                          label="Descripción"
                          multiline
                          rows={4}
                          error={!!errors.descripcion}
                          helperText={errors.descripcion?.message?.toString()}
                        >
                          {Array.from(
                            getSeccionByCurso.get(watch("materiaInformacion.cursoId")) || []
                          ).map((seccionId) => (
                            <MenuItem value={seccionId}>{selectSeccion.get(seccionId)}</MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  }
                </Grid2>
              )}
            </Grid2>
           {type == 'create' && <Grid2 size={8}>
              {
                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      fullWidth
                      {...field}
                      select
                      label="Descripción"
                      multiline
                      rows={4}
                      error={!!errors.descripcion}
                      helperText={errors.descripcion?.message?.toString()}
                    >
                      {Array.from(getProjectTypesMap.entries()).map(([key, label]) => (
                        <MenuItem value={key} key={key}>
                          {label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              }
            </Grid2>}
            <Stack alignItems={"end"}>
              <Box>
                <GeneralButton
                  size="small"
                  loading={isPendingCreate}
                  type="submit"
                  mode={buttonTypes.next}
                />
              </Box>
            </Stack>
          </Stack>
        </form>
      )}
    </>
  );
};
