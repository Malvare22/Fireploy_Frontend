import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { Box, Chip, Typography } from "@mui/material";

/**
 * ProjectTags component – renders a set of visual tags (chips) that represent
 * key technologies and subject matter associated with a project.
 * 
 * Tags may include frameworks used in the frontend, backend, and integrated stacks,
 * the database technology, and the academic subject of the project.
 * 
 * Each tag is styled using Material UI's Chip component and displayed responsively.
 * 
 * @component
 * 
 * @param {an object containing project data including associated technologies and subject area} proyecto - The project whose tags are being displayed.
 * 
 * @returns {a flexible horizontal layout of labeled tags representing technologies and academic subject}
 * 
 * @example
 * ```tsx
 * <ProjectTags proyecto={projectData} />
 * ```
 */
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
};


export function ProjectTagsForList({ proyecto }: { proyecto: ProyectoCard }) {
  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
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
    </Box>
  );
}

export default ProjectTags;

