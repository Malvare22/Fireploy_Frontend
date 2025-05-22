import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { Box, Chip, Typography } from "@mui/material";

function ProjectTags({ proyecto }: { proyecto: ProyectoCard }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center"}}>
      {proyecto.integrado && (
        <Box>
          <Chip
            label={<Typography variant="caption">{proyecto.integrado.framework}</Typography>}
            key={proyecto.integrado.framework}
            color="info"
          />
        </Box>
      )}
      {proyecto.backend && (
        <Box>
          <Chip
            label={<Typography variant="caption">{proyecto.backend.framework}</Typography>}
            key={proyecto.backend.framework}
            color="info"
          />
        </Box>
      )}
      {proyecto.frontend && (
        <Box>
          <Chip
            label={<Typography variant="caption">{proyecto.frontend.framework}</Typography>}
            key={proyecto.frontend.framework}
            color="info"
          />
        </Box>
      )}
      {proyecto.dataBase && (
        <Box>
          <Chip
            color="warning"
            label={
              <Typography color="white" variant="caption">
                {proyecto.dataBase}
              </Typography>
            }
            key={proyecto.dataBase}
          />
        </Box>
      )}
      <Box>
        <Chip
          label={<Typography variant="caption">{proyecto.materia}</Typography>}
          key={proyecto.materia}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default ProjectTags;
