import { Box, Typography } from "@mui/material";
import { TypeProject } from "../utils/TypeProject";

interface Props {
  proyecto: TypeProject;
}

const ProjectCard: React.FC<Props> = ({ proyecto }: Props) => {
  return (
    <Box sx={{ backgroundColor: "white", padding: 2 }}>
      <Box>
        <Typography variant="h5Bold" color="info">
          {proyecto.titulo}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: {'xs': 'column', 'sm': 'row'}, alignItems: 'center', padding: 2 }}>
        <Box
          component={"img"}
          sx={{
            backgroundColor: "blue",
            width: 128,
            height: 128,
          }}
        ></Box>
        <Box>
          <Box sx={{ display: "flex", flexDirection: {'xs': 'column', 'sm': 'row'}, margin: 2, gap: 2 }}>
            {/* Estado */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6">Estado:</Typography>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: "black",
                }}
              />
            </Box>

            {/* Ultima Modificación */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box>
                <Typography variant="h6">Última Modificación:</Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  {proyecto.ultimaModificacion}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Tecnlogías */}
          <Box sx={{ display: {xs: "grid", sm: 'flex'}, gridTemplateColumns: "repeat(2, 1fr)", alignItems: "center", marginLeft: 2, gap: 3 }}>
            {proyecto.tecnologias.map((tecnologia, index) => (
              <Tecnology tecnologia={tecnologia} key={index} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

interface TecnlogyProps {
  tecnologia: TypeProject["tecnologias"][number];
}
const Tecnology: React.FC<TecnlogyProps> = ({ tecnologia }: TecnlogyProps) => (
  <Box sx={{ display: "flex", alignItems: 'center' }}>
    <Box
      component={"img"}
      sx={{ width: 32, height: 32 }}
      src={tecnologia.imagen}
    ></Box>
    <Box sx={{marginLeft: 1}}>
      <Typography variant="h6">{tecnologia.nombre}</Typography>
    </Box>
  </Box>
);

export default ProjectCard;
