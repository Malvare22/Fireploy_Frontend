import Contents from "@modules/proyectos/components/projectFrame/contents";
import IconMenu from "@modules/proyectos/components/projectFrame/menu";
import { proyectosPrueba } from "@modules/proyectos/test/data/proyectos.prueba";
import { Proyecto } from "@modules/proyectos/types/proyecto";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerProyecto() {
  const [currentOption, setCurrentOption] = useState(0);
  const [open, setOpen] = useState(true);
  const [proyecto, setProyecto] = useState<undefined | Proyecto>(undefined);

  const { id } = useParams();

  useEffect(() => {
    const projectId = id ? parseInt(id) : 0;
    const proyecto = proyectosPrueba.find((p) => p.id == projectId);
    setProyecto(proyecto);
  }, []);

  return (
    <>
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
        {proyecto && (
          <>
            <IconMenu
              currentOption={currentOption}
              setCurrentOption={setCurrentOption}
              open={open}
              setOpen={setOpen}
            />
            {!open && (
              <Box
                sx={{ display: { sm: "none", width: "auto" }, width: "80%" }}
              >
                <Contents
                  currentOption={currentOption}
                  setCurrentOption={setCurrentOption}
                  proyecto={proyecto}
                />
              </Box>
            )}
            <Box sx={{ display: { sm: "block", xs: "none" }, width: "70%" }}>
              <Contents
                currentOption={currentOption}
                setCurrentOption={setCurrentOption}
                proyecto={proyecto}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default VerProyecto;
