import { MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ProyectoRepositoriesSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import { inputSelectFramework } from "@modules/proyectos/utils/technologies";

type DockerInputsProps = {
  fieldName?: KeysOfRepository;
  disabled: boolean;
};

/**
 * TechnologyInputs component – renders two dropdown selectors integrated with React Hook Form.
 * One selector is for choosing a technology type (e.g., Node.js, Java), and the second appears
 * conditionally to allow selecting a framework related to the chosen technology (e.g., Express, Spring).
 * 
 * This component is dynamic and will reset the framework value if the selected technology changes.
 * It supports disabling both inputs and displays validation messages when present.
 * 
 * @component
 * 
 * @param fieldName - A string key representing the repository section being edited (e.g., "backend", "frontend", "integrado").
 * @param disabled - A boolean that disables both selectors when set to true.
 * 
 * @returns A React fragment containing Material UI Select inputs for technology and framework,
 * bound to the form via React Hook Form's Controller.
 * 
 * @example
 * ```tsx
 * <TechnologyInputs fieldName="backend" disabled={false} />
 * ```
 */
export const TechnologyInputs: React.FC<DockerInputsProps> = ({
  fieldName = "backend",
  disabled,
}) => {
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
            disabled={disabled}
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
              label="Framework"
              placeholder="Escribe para buscar..."
              fullWidth
              disabled={disabled}
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
