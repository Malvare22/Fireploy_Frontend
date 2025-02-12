import ProjectCard from "@modules/proyectos/components/projectCard";
import { LabelProyecto } from "@modules/proyectos/enum/labelProyecto";
import { proyectosPrueba } from "@modules/proyectos/test/datos/proyectos.prueba";
import { Box, Button, Divider, Typography } from "@mui/material";

function VerProyectos() {
  const proyectos = proyectosPrueba;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ textAlign: "center", margin: 2 }}>
        <Typography variant="h3Bold">{LabelProyecto.misProyectos}</Typography>
      </Box>
      {/* Project Container */}
      <Box sx={{paddingX: {md: 10, xs: 4}, marginY: 4}}>
        <Box sx={{ display: "flex", justifyContent: "end", marginY: 2 }}>
          <Button variant="contained">{LabelProyecto.nuevoProyeco}</Button>
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

export default VerProyectos;
