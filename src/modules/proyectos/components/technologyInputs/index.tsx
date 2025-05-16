import { MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ProyectoRepositoriesSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import { inputSelectFramework } from "@modules/proyectos/utils/technologies";

type DockerInputsProps = {
  fieldName?: KeysOfRepository;
};

/**
 * DockerInputs component – This component provides input fields for configuring informacion-related settings for a project repository.
 * It allows the user to select a technology, version (tag), and framework for the selected technology. These fields are rendered
 * dynamically based on the selected technology, using the `inputSelectTecnology` object to pull available versions and frameworks
 * for each technology.
 *
 * The component uses `react-hook-form` to manage form state and validation. It provides a `Controller` to connect each input
 * field with the form context, and displays error messages if validation fails.
 *
 * The available input fields are:
 * - **Tecnología**: A dropdown to select the informacion technology (e.g., Node).
 * - **Version**: A dropdown to select the version of the chosen technology.
 * - **Framework**: A dropdown to select the framework, available for certain technologies.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {KeysOfRepository} props.fieldName - Optional field name for determining which repository's informacion configuration
 * to display (defaults to "backend").
 *
 * @returns {JSX.Element} A set of form inputs for selecting informacion technology, version, and framework for a project repository.
 *
 * @example
 * ```tsx
 * <DockerInputs fieldName="backend" />
 * ```
 */
export const TechnologyInputs: React.FC<DockerInputsProps> = ({ fieldName = "backend" }) => {
  const {
    control,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<ProyectoRepositoriesSchema>();

  const selectedTechnology = watch(`${fieldName}.informacion.tecnologia`);

  const technologyOptions = Object.keys(inputSelectFramework);

  const frameworksOptions = selectedTechnology
    ? inputSelectFramework[selectedTechnology as keyof typeof inputSelectFramework].frameworks
    : null;

  if (fieldName == "frontend") console.log("X ", watch());

  useEffect(() => {
    setValue(`${fieldName}.informacion.framework`, null);
  }, [watch(`${fieldName}.informacion.tecnologia`)]);

  return (
    <>
      <Controller
        control={control}
        name={`${fieldName}.informacion.tecnologia`}
        render={({ field }) => (
          <TextField
            size="small"
            select
            label="Tecnología"
            placeholder="Escribe para buscar..."
            fullWidth
            inputRef={field.ref}
            value={field.value}
            onChange={field.onChange}
            error={!!errors?.[fieldName]?.informacion?.tecnologia}
            helperText={errors?.[fieldName]?.informacion?.tecnologia?.message?.toString() || ""}
          >
            {technologyOptions.map((key) => {
              return (
                <MenuItem value={key} key={key}>
                  {key}
                </MenuItem>
              );
            })}
          </TextField>
        )}
      />

      {frameworksOptions && (
        <Controller
          control={control}
          name={`${fieldName}.informacion.framework`}
          render={({ field }) => (
            <TextField
              size="small"
              select
              label="Tecnología"
              placeholder="Escribe para buscar..."
              fullWidth
              inputRef={field.ref}
              value={field.value}
              onChange={field.onChange}
              error={!!errors?.[fieldName]?.informacion?.framework}
              helperText={errors?.[fieldName]?.informacion?.framework?.message?.toString() || ""}
            >
              {frameworksOptions.map((framwork) => {
                return (
                  <MenuItem key={framwork} value={framwork}>
                    {framwork}
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
      )}
    </>
  );
};

export default TechnologyInputs;
