import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ProyectoRepositoriesSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import { dockerImagesMap, DockerSet } from "@modules/proyectos/utils/docker";

type DockerInputsProps = {
  fieldName?: KeysOfRepository;
};

export const DockerInputs: React.FC<DockerInputsProps> = ({ fieldName = "backend" }) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<ProyectoRepositoriesSchema>();

  const docker = watch(`${fieldName}.docker`);

  // useEffect(() => {
  //   if (selectTag && selectTecnology) {
  //     setValue(`${fieldName}.docker`, { tecnologia: selectTecnology, tag: tagselectTag });
  //   }
  // }, [selec]);

  return (
    <>
      {/* Repositorio */}
      <Controller
        control={control}
        name={`${fieldName}.docker.tecnologia`}
        render={({ field }) => (
          <TextField
            size="small"
            select
            label="Repositorio"
            placeholder="Escribe para buscar..."
            fullWidth
            inputRef={field.ref}
            value={field.value}
            onChange={field.onChange}
            error={!!errors?.[fieldName]?.docker?.tecnologia}
            helperText={errors?.[fieldName]?.docker?.tecnologia?.message?.toString() || ""}
          >
            {Array.from(dockerImagesMap.entries()).map(([key, { label }]) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Tag */}
      <Controller
        control={control}
        name={`${fieldName}.docker.tag`}
        render={({ field }) => (
          <TextField
            size="small"
            select
            label="Tag"
            placeholder="Escribe para buscar..."
            fullWidth
            inputRef={field.ref}
            value={field.value}
            onChange={field.onChange}
            error={!!errors?.[fieldName]?.docker?.tag}
            helperText={errors?.[fieldName]?.docker?.tag?.message?.toString() || ""}
          >
            {docker?.tecnologia &&
              dockerImagesMap.get(docker?.tecnologia as keyof DockerSet) &&
              dockerImagesMap.get(docker?.tecnologia as keyof DockerSet)?.tag!!.map((label) => (
                <MenuItem key={label} value={label}>
                  {label}
                </MenuItem>
              ))}
          </TextField>
        )}
      />
    </>
  );
};

export default DockerInputs;
