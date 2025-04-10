import AccordionUsage from "@modules/general/components/accordionUsage";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import EnviromentVariables from "../../enviromentVariblesTable";
import EnviromentVariablesEditor from "../enviroment";

export function Repositories() {
  const { control, watch } = useFormContext();

  // Suponiendo que tienes un campo llamado "tipo" en tu formulario que determina si es monolito o separado
  const tipo = watch("integrado.tipo") === "I"; // o como manejes el tipo (B, F, I)


  return (
    <Stack spacing={3}>
      <Stack>
        <Typography variant="h5">{labelConfiguracion.repositorios}</Typography>
        <Divider />
      </Stack>
      <Typography variant="body2">{labelConfiguracion.repositoriosParrafo}</Typography>

      <Stack spacing={2}>
        {/* FRONTEND */}
        {(tipo || watch("frontend")) && (
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
            <EnviromentVariablesEditor type="F" />
          </>
        )}

        {/* BACKEND */}
        {(tipo || watch("backend")) && (
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
            <EnviromentVariablesEditor type="B" />
          </>
        )}

        {/* INTEGRADO */}
        {tipo && (
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
            <EnviromentVariablesEditor type="I" />
          </>
        )}
      </Stack>
    </Stack>
  );
}
