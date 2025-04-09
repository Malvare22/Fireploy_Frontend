import { Curso } from "@modules/materias/types/curso";
import { CursoSchema } from "@modules/materias/utils/forms/form.schema";
import { Divider, MenuItem, Paper, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
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
import { patchEditSeccion } from "@modules/materias/services/patch.modificar.seccion";
import { Seccion } from "@modules/materias/types/seccion";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import AlertDialogError, { CustomError } from "@modules/general/components/alertDialogError";
import LoaderElement from "@modules/general/components/loaderElement";
import GestionarEstudiantesCurso from "@modules/materias/components/gestionarEstudiantesCurso";

export enum labelEditarCurso {
  titulo = "Editar Curso",
  descripcion = "Descripción",
  estado = "Estado",
  secciones = "Secciones",
  tituloModalEstudiante = "Agregar Estudiantes",
  noHayEstudiantes = "Actualmente no hay estudiantes registrados",
  noHaySecciones = "Actualmente no hay secciones registradas",
  modificarSecciones = 'Guardar Cambios Secciones'
}

function VistaEditarCurso() {
  const { idCurso } = useParams();
  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const [curso, setCurso] = useState<Curso | undefined>(undefined);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "0";

  const [tab, setTab] = useState(page);

  useEffect(() => {
    setTab(page);
  }, [page]);

  function handleChangeTab(_event: React.SyntheticEvent, value: string) {
    setTab(value);
    setSearchParams({ ["page"]: value });
  }

  const methods = useForm<Curso>({
    resolver: zodResolver(CursoSchema),
    defaultValues: {} as Curso,
  });

  const { getValues, control, formState } = methods;

  const { errors } = formState;

  console.log(errors)

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
            <Stack>
              <Tabs onChange={handleChangeTab}>
                <Tab label="Información" value={"0"} />
                <Tab label="Estudiantes" value={"1"} />
                <Tab label="Secciones" value={"2"} />
              </Tabs>
              <Divider sx={{ paddingTop: -200 }} />
            </Stack>
            {tab == "0" && (
              <>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <Stack spacing={2}>
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
                        >
                          {getMateriaStatesArray.map(([clave, valor]) => (
                            <MenuItem value={clave} key={clave}>
                              {valor}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Stack>
                  <GeneralButton
                    mode={buttonTypes.save}
                    loading={isPendingPatchCurso}
                    type="submit"
                  />
                </form>
                <Stack spacing={2}>
                  <TablaGestionarSecciones />
                </Stack>
              </>
            )}
            {tab == "1" && (
              <>
                <GestionarEstudiantesCurso curso={getValues()} idCurso={idCurso || ''} />
              </>
            )}
          </Stack>
        </FormProvider>
      )}
    </>
  );
}

export default VistaEditarCurso;
