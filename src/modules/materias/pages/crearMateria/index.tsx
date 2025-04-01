import { zodResolver } from "@hookform/resolvers/zod";
import TablaGestionarCursos from "@modules/materias/components/tablaGestionarCursos";
import { Materia } from "@modules/materias/types/materia";
import { MateriaSchema } from "@modules/materias/utils/forms/form.schema";
import {
  getMateriasSemestresLabels,
  getMateriaStatesArray,
} from "@modules/materias/utils/materias";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid2,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

enum labelCrearMateria {
  titulo = "Crear Materia",
  checkBox = "Predefinir Grupos",
  nombre = "Nombre",
  semestre = "Semestre",
  estado = "Estado",
  crearMateria = "Crear Materia",
}

function VistaCrearMateria() {
  const [createGroups, setCreateGroups] = useState<boolean>(false);
  const methods = useForm<Materia>({
    resolver: zodResolver(MateriaSchema),
  });

  const {
    formState: { errors },
    setValue,
  } = methods;

  function handleCheck() {
    if (createGroups) {
      setValue("cursos", undefined);
    }
    setCreateGroups(!createGroups);
  }

  const onSubmit: SubmitHandler<Materia> = (data, event) => {
    // Si quieres prevenir el comportamiento por defecto del formulario
    event?.preventDefault(); // Esto evita que se recargue la página
  };

  return (
    <Card sx={{ padding: 2 }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack>
            <Stack>
              <Typography variant="h4">{labelCrearMateria.titulo}</Typography>
              <Divider />
            </Stack>
            <Grid2 container spacing={3} padding={2}>
              <Grid2 size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label={labelCrearMateria.nombre}
                  {...methods.register("nombre")}
                  error={!!methods.formState.errors.nombre}
                  helperText={methods.formState.errors.nombre?.message}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  select
                  label={labelCrearMateria.semestre}
                  {...methods.register("semestre")}
                  error={!!methods.formState.errors.semestre}
                  helperText={methods.formState.errors.semestre?.message}
                >
                  {getMateriasSemestresLabels().map(([clave, valor]) => (
                    <MenuItem value={clave} key={clave}>
                      {valor}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label={labelCrearMateria.estado}
                  select
                  {...methods.register("estado")}
                  error={!!methods.formState.errors.estado}
                  helperText={methods.formState.errors.estado?.message}
                >
                  {getMateriaStatesArray.map(([clave, valor]) => (
                    <MenuItem value={clave} key={clave}>
                      {valor}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 8 }}>
                <FormControlLabel
                  control={<Checkbox onClick={handleCheck} />}
                  label={labelCrearMateria.checkBox}
                />
              </Grid2>
              <Grid2 size={{xl: 10, xs: 12}}><Card>{createGroups && <TablaGestionarCursos />}</Card></Grid2>
            </Grid2>
            <Box>
              <Button type="submit" variant="contained">
                {labelCrearMateria.crearMateria}
              </Button>
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </Card>
  );
}

export default VistaCrearMateria;
