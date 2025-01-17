import ProjectCard from "@modules/projects/components/projectCard";
import { projectsDummy } from "@modules/projects/utils/data/projects";
import { Box, Button, Divider, Typography } from "@mui/material";

function MyProjects() {
  const proyectos = projectsDummy;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ textAlign: "center", margin: 2 }}>
        <Typography variant="h3Bold">Mis Proyectos</Typography>
      </Box>
      {/* Project Container */}
      <Box sx={{paddingX: {md: 10, xs: 4}, marginY: 4}}>
        <Box sx={{ display: "flex", justifyContent: "end", marginY: 2 }}>
          <Button variant="contained">Nuevo Proyecto</Button>
        </Box>

        {proyectos.map((proyecto, index) => (
          <>
            <ProjectCard proyecto={proyecto} key={index} />
            <Divider />
          </>
        ))}
      </Box>
    </Box>
  );
}

export default MyProjects;
