import { ProjectCardAvatar } from "@modules/general/components/avatar";
import CardSeccion from "@modules/materias/components/cardSeccion";
import { labelCardCurso } from "@modules/materias/enums/labelCardCurso";
import { LabelCurso } from "@modules/materias/enums/labelCurso";
import { materiasEjemplo } from "@modules/materias/types/materia";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { adaptarUsuarioAUsuarioCardPortafolio } from "@modules/usuarios/utils/adaptar.usuario";
import { StackedBarChart } from "@mui/icons-material";
import { Card, Stack, Typography } from "@mui/material";

function VerInformacionCurso() {
  const curso = materiasEjemplo[0].cursos[0];

  const docenteAdapt = adaptarUsuarioAUsuarioCardPortafolio(curso.docente);

  return (
    <Stack spacing={3}>
        <Stack direction={'row'} spacing={2}>
          <Typography variant="h3">{curso.materia}</Typography>
          <Card><Typography variant="h3" paddingX={2}>{curso.grupo}</Typography></Card>
        </Stack>
        <Typography variant="h5">{curso.descripcion}</Typography>
        <Typography variant="h4">{LabelCurso.secciones}</Typography>
      <Stack spacing={2}>
        {
          curso.secciones.map((seccion, key) => <CardSeccion seccion={seccion} key={key}/>)
        }
      </Stack>
    </Stack>
  );
}

type FrameDocenteProps = {
  docente: UsuarioPortafolioCard;
}
const FrameDocente: React.FC<FrameDocenteProps> = ({docente}) => {
  return <Card>
    <Stack>
      <Typography>{labelCardCurso.docente}</Typography>
      <Stack>
        <ProjectCardAvatar usuario={docente}/>
        <Typography>{docente.nombres}</Typography>
      </Stack>
    </Stack>
  </Card>
}

export default VerInformacionCurso;
