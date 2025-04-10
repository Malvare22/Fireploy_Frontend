import { zodResolver } from "@hookform/resolvers/zod";
import GeneralButton from "@modules/general/components/button";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import { StepperContext } from "@modules/general/context/stepper.Contex";
import { buttonTypes } from "@modules/general/types/buttons";
import { getAllAcademicInformation } from "@modules/materias/services/get.materias.services";
import { postCreateProject } from "@modules/proyectos/services/post.create.project";
import {
  ProyectoSchema,
  ProyectoInformationSchema,
} from "@modules/proyectos/utils/forms/proyecto.schema";
import { getProjectTypesMap } from "@modules/proyectos/utils/getProjectTypes";
import { Box, Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useFormContext, Controller, useForm } from "react-hook-form";

export const Information = () => {
  const { getValues: getValuesPrincipal } = useFormContext<ProyectoSchema>();

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

  const { data: dataMaterias, isLoading: isLoadingMaterias } = useQuery({
    queryFn: () => getAllAcademicInformation(token),
    queryKey: ["Get All Academic Information"],
  });

  const { handleNext } = useContext(StepperContext);

  console.log(errors);

  const { mutate: mutateCreate, isPending: isPendingCreate } = useMutation({
    mutationFn: () => postCreateProject(token, getValues()),
    mutationKey: ["Create Project"],
    onSuccess: handleNext,
  });

  function onSubmit() {
    mutateCreate();
  }

  if (!dataMaterias) return <LoaderElement />;

  const { getCursosByMateria, getSeccionByCurso, selectCurso, selectMaterias, selectSeccion } =
    dataMaterias;

  return (
    <>
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
            <Grid2 size={8}>
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
            </Grid2>
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
