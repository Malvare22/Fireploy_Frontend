import Contents from "@modules/projects/components/projectFrame/contents";
import IconMenu from "@modules/projects/components/projectFrame/menu";
import { projectsDummy } from "@modules/projects/utils/dataDummy/projects";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";

function ViewProject() {
  const proyectos = projectsDummy;
  const [currentOption, setCurrentOption] = useState(0);


  return (
    <Box sx={{ width: "100%", display: 'flex', backgroundColor: 'white', border: '1px solid' }}>
      {/* <Box sx={{ textAlign: "center", margin: 2 }}>
        <Typography variant="h3Bold">Mi Proyecto!</Typography>
      </Box> */}
      {/* Project Container */}
      {/* <Box sx={{paddingX: {md: 10, xs: 4}, marginY: 4}}>
        

        
      </Box> */}
     <IconMenu currentOption={currentOption} setCurrentOption={setCurrentOption}/>
     <Contents currentOption={currentOption} setCurrentOption={setCurrentOption}/>
    </Box>
  );
}

export default ViewProject;
