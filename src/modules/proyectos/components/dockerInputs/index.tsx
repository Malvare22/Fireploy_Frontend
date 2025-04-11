import {
  getDockerRepositories,
  getDockerTags,
} from "@modules/proyectos/services/get.docker.information";
import { Autocomplete, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog2";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { ProyectoRepositoriesSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";

type DockerInputsProps = {
  fieldName?: KeysOfRepository;
};

export const DockerInputs: React.FC<DockerInputsProps> = ({ fieldName = "backend" }) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProyectoRepositoriesSchema>();

  const docker = watch(`${fieldName}.docker`);
  const tag = docker?.tag ?? "";
  const tecnologia = docker?.tecnologia ?? "";

  const [buffer, setBuffer] = useState(tecnologia || "");
  const [tagsResults, setTagsResults] = useState<string[]>([]);

  const { showDialog } = useAlertDialog2();
  const { setError } = useErrorReader(showDialog);

  const {
    data: repositoriesDocker,
    mutate: mutateRepositories,
    isPending: isPendingRepositories,
  } = useMutation({
    mutationFn: () => getDockerRepositories(buffer ?? ""),
    onError: (error) => {
      setError(error);
    },
  });

  const { mutate: mutateTags, isPending: isPendingTags } = useMutation({
    mutationFn: () => getDockerTags(tecnologia),
    onSuccess: setTagsResults,
    onError: (error) => {
      setError(error);
    },
  });

  // Actualiza dockerText cuando cambian ambos
  useEffect(() => {
    const dockerValue = tecnologia && tag ? `${tecnologia}:${tag}` : null;
    setValue(`${fieldName}.dockerText`, dockerValue);
  }, [tecnologia, tag]);

  // Repositorios (input principal)
  useEffect(() => {
    if (!buffer.trim()) return;
    const timer = setTimeout(() => {
      mutateRepositories();
    }, 300);
    return () => clearTimeout(timer);
  }, [buffer]);

  // Tags (basado en selección de tecnología)
  useEffect(() => {
    if (!tecnologia) return;
    const timer = setTimeout(() => {
      mutateTags();
    }, 300);
    return () => clearTimeout(timer);
  }, [tecnologia]);

  return (
    <>
      {/* Repositorio */}
      <Controller
        control={control}
        name={`${fieldName}.docker.tecnologia`}
        render={({ field }) => (
          <Autocomplete
            freeSolo
            disablePortal
            loading={isPendingRepositories}
            options={repositoriesDocker || []}
            sx={{ width: 300 }}
            onInputChange={(_e, value) => setBuffer(value)}
            inputValue={buffer}
            onChange={(_e, value) => field.onChange(value)}
            value={field.value}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Repositorio"
                placeholder="Escribe para buscar..."
                fullWidth
                error={!!errors?.[fieldName]?.docker?.tecnologia}
                helperText={errors?.[fieldName]?.docker?.tecnologia?.message?.toString() || ""}
              />
            )}
          />
        )}
      />

      {/* Tag */}
      <Controller
        control={control}
        name={`${fieldName}.docker.tag`}
        render={({ field }) => (
          <Autocomplete
            freeSolo
            disablePortal
            options={tagsResults}
            sx={{ width: 300 }}
            disabled={!tecnologia}
            loading={isPendingTags}
            onChange={(_e, value) => field.onChange(value)}
            value={field.value}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tag"
                placeholder="Selecciona una versión"
                fullWidth
                error={!!errors?.[fieldName]?.docker?.tag}
                helperText={errors?.[fieldName]?.docker?.tag?.message?.toString() || ""}
              />
            )}
          />
        )}
      />
    </>
  );
};

export default DockerInputs;
