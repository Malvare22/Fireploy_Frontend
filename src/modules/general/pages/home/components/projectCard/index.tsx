import { Box, Card, Stack, Typography } from "@mui/material";
import ProjectCardAvatar from "./avatar";
import RoundedIcon from "@modules/general/components/roundedIcon";
import { mapaImagenes } from "@modules/general/components/roundedIcon/utils";
import Score from "../rating";

export type Logro = {
  titulo: string; valor: string
}

export type UsuarioPortafolioCard = {
  nombres: string;
  foto: string;
  rol: string;
  logros: Logro;
  id: string;
};

type ProyectoCard = {
  titulo: string;
  descripcion: string;
  imagen: string;
  integrandes: UsuarioPortafolioCard[];
  tecnologias: { nombre: string; imagen: string }[];
  puntuacion: number;
  calificador: UsuarioPortafolioCard;
};

export const usuarioPrueba = {
  nombres: "Carlos Pérez",
  id: "1",
  foto: "https://img.freepik.com/vector-premium/iconos-usuario-incluye-iconos-usuario-icones-personas-simbolos-elementos-diseno-grafico-calidad-premium_981536-526.jpg",
  rol: "Desarrollador Full Stack",
  logros: { titulo: "Repositorios en GitHub", valor: "50+" },
};

const proyecto1: ProyectoCard = {
  titulo: "Plataforma de Aprendizaje AI",
  descripcion:
    "Una plataforma interactiva basada en inteligencia artificial para ayudar a los estudiantes a mejorar sus habilidades.",
  imagen: "https://backiee.com/static/wallpapers/560x315/278140.jpg",
  integrandes: [
    {
      nombres: "Carlos Pérez",
      id: "1",
      foto: "https://example.com/carlos.png",
      rol: "Desarrollador Full Stack",
      logros: { titulo: "Repositorios en GitHub", valor: "50+" },
    },
    {
      nombres: "Ana Gómez",
      id: "1",
      foto: "https://example.com/ana.png",
      rol: "Diseñadora UI/UX",
      logros: { titulo: "Proyectos completados", valor: "30+" },
    },
  ],
  tecnologias: [
    { nombre: "React", imagen: "https://example.com/react.png" },
    { nombre: "Node.js", imagen: "https://example.com/node.png" },
    { nombre: "TensorFlow", imagen: "https://example.com/tensorflow.png" },
  ],
  puntuacion: 5,
  calificador: {
    id: "1",
    nombres: "Laura Martínez",
    foto: "https://example.com/laura.png",
    rol: "Gerente de Producto",
    logros: { titulo: "Años de experiencia", valor: "10+" },
  },
};

type Props = {
  proyecto?: ProyectoCard;
};

export enum LabelProjectCard {
  titulo = "Título",
  integrantes = "Integrantes",
  tecnologias = "Tecnologías",
}

export const ProjectCard: React.FC<Props> = ({ proyecto = proyecto1 }) => {
  return (
    <Card sx={{maxWidth: 400, paddingBottom: 2}}>
      <Stack direction={"column"} spacing={2}>
        <Box component={"img"} sx={{width: '100%', height: 200, border: '1px solid black'}} src={proyecto.imagen} />
        <Box textAlign={'center'}>
          <Typography variant="h4">{proyecto.titulo}</Typography>
          <Score value={proyecto.puntuacion}/>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center'}}>
          <Typography variant="h6">{LabelProjectCard.integrantes}</Typography>
          <Box>
            {
              proyecto.integrandes.map(
                (integrante) => <ProjectCardAvatar usuario={integrante}/>
              )  
            }
          </Box>
        </Box>
        <Box>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center'}}>
            <Typography variant="h6">{LabelProjectCard.tecnologias}</Typography>
            <Box>
              {
                proyecto.tecnologias.map(
                  (_tecnologia) => <RoundedIcon imagen={(mapaImagenes['nodejs']).ruta} nombre={(mapaImagenes['nodejs']).nombre}/>
                )
              }
            </Box>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
};

export default ProjectCard;
