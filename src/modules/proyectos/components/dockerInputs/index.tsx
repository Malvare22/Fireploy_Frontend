import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ProyectoRepositoriesSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import { inputSelectTecnology, keysOfTecnologies } from "@modules/proyectos/utils/docker";

type DockerInputsProps = {
  fieldName?: KeysOfRepository;
};

/**
 * DockerInputs component – This component provides input fields for configuring Docker-related settings for a project repository.
 * It allows the user to select a technology, version (tag), and framework for the selected technology. These fields are rendered 
 * dynamically based on the selected technology, using the `inputSelectTecnology` object to pull available versions and frameworks 
 * for each technology.
 * 
 * The component uses `react-hook-form` to manage form state and validation. It provides a `Controller` to connect each input 
 * field with the form context, and displays error messages if validation fails.
 * 
 * The available input fields are:
 * - **Tecnología**: A dropdown to select the Docker technology (e.g., Node).
 * - **Version**: A dropdown to select the version of the chosen technology.
 * - **Framework**: A dropdown to select the framework, available for certain technologies.
 * 
 * @component
 * 
 * @param {Object} props - Component props.
 * @param {KeysOfRepository} props.fieldName - Optional field name for determining which repository's Docker configuration 
 * to display (defaults to "backend").
 * 
 * @returns {JSX.Element} A set of form inputs for selecting Docker technology, version, and framework for a project repository.
 * 
 * @example
 * ```tsx
 * <DockerInputs fieldName="backend" />
 * ```
 */
export const DockerInputs: React.FC<DockerInputsProps> = ({ fieldName = "backend" }) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<ProyectoRepositoriesSchema>();

  const tecnologiaSeleccionada = watch(`${fieldName}.docker.tecnologia`) as keyof typeof inputSelectTecnology;

  const selectedTecnologia = tecnologiaSeleccionada && inputSelectTecnology[tecnologiaSeleccionada];
  
  let versiones: string[] | undefined = selectedTecnologia?.versions;
  let frameworks: string[] | undefined = selectedTecnologia?.frameworks;

  return (
    <>
      <Controller
        control={control}
        name={`${fieldName}.docker.tecnologia`}
        render={({ field }) => (
          <TextField
            size="small"
            select
            label="Versión de Node"
            placeholder="Escribe para buscar..."
            fullWidth
            inputRef={field.ref}
            value={field.value}
            onChange={field.onChange}
            error={!!errors?.[fieldName]?.docker?.tecnologia}
            helperText={errors?.[fieldName]?.docker?.tecnologia?.message?.toString() || ""}
          >
            {keysOfTecnologies.map((key) => {
              return (
                <MenuItem value={key} key={key}>
                  {key}
                </MenuItem>
              );
            })}
          </TextField>
        )}
      />

      {versiones && (
        <Controller
          control={control}
          name={`${fieldName}.docker.version`}
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
              error={!!errors?.[fieldName]?.docker?.version}
              helperText={errors?.[fieldName]?.docker?.version?.message?.toString() || ""}
            >
              {versiones.map((ver) => {
                return (
                  <MenuItem key={ver} value={ver}>
                    {ver}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
      )}

      {/* Repositorio */}
      {frameworks && <Controller
        control={control}
        name={`${fieldName}.docker.framework`}
        render={({ field }) => (
          <TextField
            size="small"
            select
            label="Framework"
            placeholder="Escribe para buscar..."
            fullWidth
            inputRef={field.ref}
            value={field.value}
            onChange={field.onChange}
            error={!!errors?.[fieldName]?.docker?.framework}
            helperText={errors?.[fieldName]?.docker?.framework?.message?.toString() || ""}
          >
            {frameworks.map((framework) => (
              <MenuItem key={framework} value={framework}>
                {framework}
              </MenuItem>
            ))}
          </TextField>
        )}
      />}
    </>
  );
};

export default DockerInputs;
