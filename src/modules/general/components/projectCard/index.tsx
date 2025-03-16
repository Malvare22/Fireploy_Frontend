import { Box, Stack, Typography } from "@mui/material";

import AnimatedCard from "../animatedCard";
import Score from "../score";
import ProjectCardAvatar from "../avatar";
import RoundedIcon from "../RoundedIcon";
import { mapaImagenes } from "../RoundedIcon/utils";
import { proyecto1, ProyectoCard } from "@modules/proyectos/types/proyecto.card";

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
    <AnimatedCard
      sx={{
        maxWidth: 400,
        paddingBottom: 2,
      }}
    >
      <Stack direction={"column"} spacing={2}>
        <Box
          component={"img"}
          sx={{ width: "100%", height: 200, border: "1px solid black" }}
          src={proyecto.imagen}
        />
        <Box textAlign={"center"}>
          <Typography variant="h4">{proyecto.titulo}</Typography>
          <Score value={proyecto.puntuacion} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{LabelProjectCard.integrantes}</Typography>
          <Box>
            {proyecto.integrandes.map((integrante) => (
              <ProjectCardAvatar usuario={integrante} />
            ))}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{LabelProjectCard.tecnologias}</Typography>
            <Box>
              {proyecto.tecnologias.map((_tecnologia) => (
                <RoundedIcon
                  imagen={mapaImagenes["nodejs"].ruta}
                  nombre={mapaImagenes["nodejs"].nombre}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Stack>
    </AnimatedCard>
  );
};

export default ProjectCard;
