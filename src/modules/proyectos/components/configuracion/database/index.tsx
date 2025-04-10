// components/DataBase.tsx
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { getDataBaseTypesArray } from "@modules/proyectos/utils/database";
import { ProyectoSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import { Divider, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export const DataBase = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProyectoSchema>();

  return (
    <Stack spacing={3}>
      <Typography variant="h5">Base de Datos</Typography>
      <Divider />
      <Controller
        name="baseDeDatos.nombre"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            label="Nombre"
            {...field}
            size="small"
            sx={{ width: "50%" }}
            error={!!errors.baseDeDatos?.nombre}
            helperText={errors.baseDeDatos?.nombre?.message}
          />
        )}
      />
      <Controller
        name="baseDeDatos.contrasenia"
        control={control}
        render={({ field }) => (
          <TextFieldPassword
            fullWidth
            label="Contraseña"
            {...field}
            size="small"
            sx={{ width: "50%" }}
            error={!!errors.baseDeDatos?.contrasenia}
            helperText={errors.baseDeDatos?.contrasenia?.message}
          />
        )}
      />
      <Controller
        name="baseDeDatos.tipo"
        control={control}
        render={({ field }) => (
          <TextField
            select
            fullWidth
            {...field}
            size="small"
            sx={{ width: "50%" }}
            error={!!errors.baseDeDatos?.tipo}
            helperText={errors.baseDeDatos?.tipo?.message}
          >
            {getDataBaseTypesArray.map(([key, value]) => (
              <MenuItem value={key} key={key}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </Stack>
  );
};
