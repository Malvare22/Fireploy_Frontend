import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm, useFormContext } from "react-hook-form";
import EnviromentVariablesEditor from "../enviroment";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import DockerInputs from "../../dockerInputs";
import {
  ProyectoRepositoriesSchema,
  ProyectoSchema,
} from "@modules/proyectos/utils/forms/proyecto.schema";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@modules/general/context/accountContext";
import { useContext, useEffect } from "react";
import { StepperContext } from "@modules/general/context/stepper.Contex";
import { patchEditRepository } from "@modules/proyectos/services/patch.edit.repositories";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { zodResolver } from "@hookform/resolvers/zod";

export function Repositories() {
  const { getValues: getValuesProject } = useFormContext<ProyectoSchema>();

  const { token } = useAuth().accountInformation;

  const { handleNext } = useContext(StepperContext);

  const { getValues, control, watch, setValue, handleSubmit, reset } =
    useForm<ProyectoRepositoriesSchema>({
      defaultValues: getValuesProject(),
      resolver: zodResolver(ProyectoRepositoriesSchema),
    });

  useEffect(() => {
    reset(getValuesProject());
  }, [getValuesProject("backend")]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => patchEditRepository(token, getValues()),
    onSuccess: handleNext,
  });

  const onChangeDocker = (
    repository: string | null,
    tag: string | null,
    key: keyof Pick<Proyecto, "backend" | "frontend" | "integrado">
  ) => {
    const vals = { tecnologia: repository, tag: tag };
    setValue(
      `${key}.dockerText`,
      !vals.tecnologia || !vals.tag ? null : vals.tecnologia + ":" + vals.tag
    );
    setValue(`${key}.docker`, vals);
  };

  function onSubmit() {
    console.log(getValues());
    mutate();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack>
          <Typography variant="h5">{labelConfiguracion.repositorios}</Typography>
          <Divider />
        </Stack>
        <Typography variant="body2">{labelConfiguracion.repositoriosParrafo}</Typography>

        <Stack spacing={2}>
          {/* FRONTEND */}
          {watch("frontend") && (
            <>
              <Typography variant="h6">{labelConfiguracion.frontend}</Typography>
              <Controller
                name="frontend.url"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label={labelConfiguracion.urlFrontend}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{ width: "50%" }}
                  />
                )}
              />
              <DockerInputs
                onChange={(repository, tag) => onChangeDocker(repository, tag, "frontend")}
                repositoryInitial={getValues("frontend.docker.tecnologia")}
                tagInitial={getValues("frontend.docker.tag")}
              />
              <EnviromentVariablesEditor type="F" />
            </>
          )}

          {/* BACKEND */}
          {watch("backend") && (
            <>
              <Typography variant="h6">{labelConfiguracion.backend}</Typography>
              <Controller
                name="backend.url"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label={labelConfiguracion.urlBackend}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{ width: "50%" }}
                  />
                )}
              />
              <DockerInputs
                onChange={(repository, tag) => onChangeDocker(repository, tag, "backend")}
                repositoryInitial={getValues("backend.docker.tecnologia")}
                tagInitial={getValues("backend.docker.tag")}
              />
              <EnviromentVariablesEditor type="B" />
            </>
          )}

          {/* INTEGRADO */}
          {watch("integrado") && (
            <>
              <Typography variant="h6">Repositorio Integrado</Typography>
              <Controller
                name="integrado.url"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    label="URL del Monolito"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{ width: "50%" }}
                  />
                )}
              />
              <DockerInputs
                onChange={(repository, tag) => onChangeDocker(repository, tag, "integrado")}
                repositoryInitial={getValues("integrado.docker.tecnologia")}
                tagInitial={getValues("integrado.docker.tag")}
              />
              <EnviromentVariablesEditor type="I" />
            </>
          )}
        </Stack>
        <GeneralButton loading={isPending} mode={buttonTypes.next} type="submit" />
      </Stack>
    </form>
  );
}
