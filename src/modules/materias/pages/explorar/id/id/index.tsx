import { ProjectCardAvatar } from "@modules/general/components/avatar";
import CardSeccion from "@modules/materias/components/cardSeccion";
import { labelCardCurso } from "@modules/materias/enums/labelCardCurso";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { exampleCursos } from "@modules/materias/types/curso";
import { exampleSecciones } from "@modules/materias/types/seccion";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { adaptarUsuarioAUsuarioCardPortafolio } from "@modules/usuarios/utils/adaptar.usuario";
import { StackedBarChart } from "@mui/icons-material";
import { Box, Card, Grid2, Stack, Typography, useTheme } from "@mui/material";

function VerInformacionCurso() {
  const curso = exampleCursos[0];

  // const docenteAdapt = adaptarUsuarioAUsuarioCardPortafolio(curso.docente);

  return (
    <Stack spacing={3} paddingX={{lg: 5}}>
      <Stack direction={"row"} spacing={2}>
        <Typography variant="h3">{curso.materia?.nombre}</Typography>
        <Card>
          <Typography variant="h3" paddingX={2}>
            {curso.grupo}
          </Typography>
        </Card>
      </Stack>
      <Typography variant="h5">{curso.descripcion}</Typography>
      <Typography variant="h4">{LabelCurso.secciones}</Typography>
      <Grid2 container spacing={3} direction={{xs:'column-reverse', xl: 'row'}}>
        <Grid2 size={{xl: 10, xs: 12}}><Stack spacing={2}>
          {exampleSecciones.map((seccion, key) => (
            <CardSeccion seccion={seccion} key={key} />
          ))}
        </Stack></Grid2>
        <Grid2 size={{xl: 2, xs: 10, sm: 4}}>
          {/* <FrameDocente docente={docenteAdapt}/> */}
          </Grid2>
      </Grid2>
    </Stack>
  );
}

type FrameDocenteProps = {
  docente: UsuarioPortafolioCard;
};
const FrameDocente: React.FC<FrameDocenteProps> = ({ docente }) => {

  const theme = useTheme();

  return (
    <Card sx={{height: 'auto', padding: 2, color: 'white', backgroundColor: theme.palette.terciary.main}}>
      <Stack>
        <Typography variant="h5">{labelCardCurso.docente}</Typography>
        <Stack>
          <ProjectCardAvatar usuario={docente} sx={{width: 64, height: 64}}/>
          <Typography variant="h6">{docente.nombres}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default VerInformacionCurso;
