import { Box, Tooltip, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import RoundedIcon from "@modules/general/components/roundedIcon";
import { obtenerImagen } from "@modules/general/components/roundedIcon/utils";

interface Props {
  proyecto: ProyectoCard;
}

const ProjectForList: React.FC<Props> = ({ proyecto }: Props) => {
  return (
    <Box sx={{ backgroundColor: "white", padding: 4, paddingX: { md: 14 } }}>
        <Typography variant="h5" color="info">
          {proyecto.titulo}
        </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          paddingY: 2,
        }}
      >
        <Box
          component={"img"}
          src={proyecto.imagen}
          sx={{
            width: 256,
            height: 164,
          }}
        ></Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: 2,
              gap: 2,
            }}
          >
            Estado
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6">Estado:</Typography>
              <Tooltip
                title={obtenerEstado[proyecto.estadoDeEjecucion]}
                placement="top"
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: '',
                    borderRadius: 1,
                  }}
                />
              </Tooltip>
            </Box> */}

            {/* Ultima Modificación */}
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box>
                <Typography variant="h6">Última Modificación:</Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  {proyecto.fechaUltimaModificacion}
                </Typography>
              </Box>
            </Box> */}
          </Box>

          {/* Tecnlogías */}
          <Box
            sx={{
              display: { xs: "grid", sm: "flex" },
              gridTemplateColumns: "repeat(2, 1fr)",
              alignItems: "center",
              marginLeft: 2,
              gap: 3,
            }}
          >
            {/* {proyecto.repositorios.map((_, indice) => (
              <RoundedIcon
                imagen={obtenerImagen[repositoriosPrueba[indice].tecnologia.logo].ruta}
                nombre={obtenerImagen[repositoriosPrueba[indice].tecnologia.logo].nombre}
              ></RoundedIcon>
            ))} */}
            <RoundedIcon
              imagen={obtenerImagen['mongodb'].ruta}
              nombre={obtenerImagen['mongodb'].nombre}
            ></RoundedIcon>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectForList;
