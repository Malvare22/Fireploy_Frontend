import { zodResolver } from "@hookform/resolvers/zod";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { msgDescription } from "@modules/general/utils/formConstrains";
import { labelFormSection } from "@modules/materias/enums/labelFormSection";
import { Seccion } from "@modules/materias/types/seccion";
import {
  SeccionesSchema,
  SeccionSchema,
} from "@modules/materias/utils/forms/form.schema";
import { getMateriaStatesArray } from "@modules/materias/utils/materias";
import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";

type Props = {
  onCancel: () => void;
  onAccept: () => void;
  index: number;
};

/**
 * SeccionesForm component – allows editing a specific section (sección) of a course.
 *
 * This form is embedded in a larger form context and provides a temporary buffer form for editing
 * individual section data. It syncs with the parent form using `useFormContext`, validates inputs with Zod,
 * and handles save or cancel actions for the specified section index.
 *
 * @component
 *
 * @param onAccept Callback function invoked after a successful save.
 * @param onCancel Callback function invoked when cancelling the form.
 * @param index Index of the section in the array being edited.
 *
 * @returns A form UI for editing section details like title, dates, description, and status.
 *
 * @example
 * ```tsx
 * <SeccionesForm
 *   onAccept={() => handleAccept()}
 *   onCancel={() => handleCancel()}
 *   index={2}
 * />
 * ```
 */
function SeccionesForm({ onAccept, onCancel, index }: Props) {
  const { getValues, setValue } = useFormContext<SeccionesSchema>();
  const {
    reset: resetBuffer,
    control: controlBuffer,
    formState: { errors: errorsBuffer },
    register: registerBuffer,
    handleSubmit: handleSubmitForm,
    watch,
  } = useForm<Seccion>({
    defaultValues: getValues(`secciones.${index}`),
    resolver: zodResolver(SeccionSchema),
  });

  useEffect(() => {
    resetBuffer(getValues(`secciones.${index}`));
  }, [index]);

  function onCancelForm() {
    resetBuffer(getValues(`secciones.${index}`));
    onCancel();
  }

  function onSaveForm(data: Seccion) {
    const secciones = getValues("secciones") ?? [];
    const nuevasSecciones = [...secciones];
    nuevasSecciones[index] = data;
    setValue("secciones", nuevasSecciones);
    onAccept();
  }

  return (
    <Stack
      spacing={3}
      padding={3}
      component={"form"}
      onSubmit={handleSubmitForm(onSaveForm)}
    >
      <Typography variant="h5" textAlign={"center"}>
        {labelFormSection.editSection}
      </Typography>

      <TextField
        label="Título"
        error={!!errorsBuffer?.titulo}
        helperText={errorsBuffer?.titulo?.message as string}
        {...registerBuffer("titulo")}
      />

      <TextField
        label="Fecha de inicio"
        type="date"
        error={!!errorsBuffer?.fechaDeInicio}
        helperText={errorsBuffer?.fechaDeInicio?.message as string}
        {...registerBuffer("fechaDeInicio")}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Fecha límite"
        type="date"
        error={!!errorsBuffer?.fechaDeCierre}
        helperText={errorsBuffer?.fechaDeCierre?.message as string}
        {...registerBuffer("fechaDeCierre")}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Descripción"
        multiline
        minRows={2}
        error={!!errorsBuffer?.descripcion}
        helperText={
          errorsBuffer?.descripcion?.message ??
          msgDescription(watch("descripcion").length)
        }
        {...registerBuffer("descripcion")}
      />

      <Controller
        name="estado"
        control={controlBuffer}
        defaultValue="A"
        render={({ field }) => (
          <TextField
            {...field}
            label="Estado"
            select
            error={!!errorsBuffer?.estado}
            helperText={errorsBuffer?.estado?.message as string}
          >
            {getMateriaStatesArray.map(([clave, valor]) => (
              <MenuItem value={clave} key={clave}>
                {valor}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Stack spacing={2} direction={"row"} justifyContent={"center"}>
        <GeneralButton mode={buttonTypes.save} type="submit" />
        <GeneralButton mode={buttonTypes.cancel} onClick={onCancelForm} />
      </Stack>
    </Stack>
  );
}

export default SeccionesForm;
