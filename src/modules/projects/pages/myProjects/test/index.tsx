import ProjectCard from "@modules/projects/components/projectCard";
import MiniDrawer from "@modules/projects/components/projectFrame";
import { projectsDummy } from "@modules/projects/utils/dataDummy/projects";
import { Box, Button, Divider, Typography } from "@mui/material";

function ViewProject() {
  const proyectos = projectsDummy;

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Box sx={{ textAlign: "center", margin: 2 }}>
        <Typography variant="h3Bold">Mi Proyecto!</Typography>
      </Box> */}
      {/* Project Container */}
      {/* <Box sx={{paddingX: {md: 10, xs: 4}, marginY: 4}}>
        

        
      </Box> */}
     <MiniDrawer/>
    </Box>
  );
}

export default ViewProject;
