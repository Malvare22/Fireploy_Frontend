import CardCurso from "@modules/materias/components/cardCurso";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import { materiasEjemplo } from "@modules/materias/types/materia";
import { Card, Grid2, Stack, Typography } from "@mui/material";

function ListarCursos() {
  const materia = materiasEjemplo[0];

  return (
    <Stack spacing={3} paddingX={6}>
      <Card>
        <Stack spacing={3} margin={4}>
          <Typography variant="h3">{materia.nombre}</Typography>
          <Typography variant="h6" sx={{ wordWrap: "break-word", overflowWrap: "break-word" }}>{materia.descripcion}</Typography>
        </Stack>
      </Card>
      <Typography variant="h4">{labelListarCursos.grupos}</Typography>
      <Grid2 container spacing={4}>
        {materia.cursos.map((curso, key) => (
          <Grid2 size={{md: 4, sm: 6, xs: 12}}>
            <CardCurso curso={curso} key={key} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}

export default ListarCursos;
