import Contents from "@modules/projects/components/projectFrame/contents";
import IconMenu from "@modules/projects/components/projectFrame/menu";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import { proyectosDummy } from "@modules/projects/utils/data/proyectos";
import { TypeProyecto } from "@modules/projects/utils/type/typeProyecto";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewProject() {
  // const proyectos = projectsDummy;
  const [currentOption, setCurrentOption] = useState(0);
  const [open, setOpen] = useState(true);
  const [proyecto, setProyecto] = useState<undefined | TypeProyecto>(undefined);
  const [buffer, setBuffer] = useState<undefined | TypeProyecto>(undefined);

  const { id } = useParams();

  useEffect(() => {
    const projectId = id ? parseInt(id) : 0;
    const proyecto = proyectosDummy.find((p) => p.id == projectId);
    setProyecto(proyecto);
    setBuffer(proyecto);
  }, []);

  return (
    <ProyectoContext.Provider
      value={{ proyecto: proyecto, buffer: buffer, setBuffer: setBuffer }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          backgroundColor: "white",
          border: "1px solid red",
        }}
      >
        {/* <Box sx={{ textAlign: "center", margin: 2 }}>
        <Typography variant="h3Bold">Mi Proyecto!</Typography>
      </Box> */}
        {/* Project Container */}
        {/* <Box sx={{paddingX: {md: 10, xs: 4}, marginY: 4}}>
        

        
      </Box> */}
        <IconMenu
          currentOption={currentOption}
          setCurrentOption={setCurrentOption}
          open={open}
          setOpen={setOpen}
        />
        {!open && (
          <Box sx={{ display: { sm: "none", width: "auto" }, width: "80%" }}>
            <Contents
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
            />
          </Box>
        )}
        <Box sx={{ display: { sm: "block", xs: "none" }, width: "70%" }}>
          <Contents
            currentOption={currentOption}
            setCurrentOption={setCurrentOption}
          />
        </Box>
      </Box>
    </ProyectoContext.Provider>
  );
}

export default ViewProject;
