import { Box, Tooltip, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { obtenerColorEstado } from "@modules/proyectos/utils/obtenerColorEstado";
import { Proyecto } from "@modules/proyectos/types/proyecto";
import { obtenerEstado } from "@modules/proyectos/utils/obtenerEstado copy";
import IconoRedondo from "@modules/general/components/iconoRedondo";
import { obtenerInformacionTipoBaseDeDatos } from "@modules/proyectos/utils/obtenerInformacionTipoBaseDeDatos";

interface Props {
  proyecto: Proyecto;
}

const ProjectCard: React.FC<Props> = ({ proyecto }: Props) => {
  return (
    <Box sx={{ backgroundColor: "white", padding: 4, paddingX: { md: 14 } }}>
      <Link href={`ver/${proyecto.id}`}>
        <Typography variant="h5Bold" color="info">
          {proyecto.titulo}
        </Typography>
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box
          component={"img"}
          sx={{
            backgroundColor: "blue",
            width: 128,
            height: 128,
          }}
        ></Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              margin: 2,
              gap: 2,
            }}
          >
            {/* Estado */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6">Estado:</Typography>
              <Tooltip
                title={obtenerEstado[proyecto.estadoDeEjecucion]}
                placement="top"
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: obtenerColorEstado(
                      proyecto.estadoDeEjecucion
                    ),
                    borderRadius: 1,
                  }}
                />
              </Tooltip>
            </Box>

            {/* Ultima Modificación */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box>
                <Typography variant="h6">Última Modificación:</Typography>
              </Box>
              <Box>
                <Typography variant="h6">{"proyecto."}</Typography>
              </Box>
            </Box>
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
            {proyecto.repositorios.map((repositorio) => (
              <IconoRedondo
                imagen={repositorio.tecnologia.logo}
                nombre={repositorio.tecnologia.nombre}
              ></IconoRedondo>
            ))}
            <IconoRedondo
              nombre={
                obtenerInformacionTipoBaseDeDatos[proyecto.baseDeDatos.tipo]
                  .nombre
              }
              imagen={
                obtenerInformacionTipoBaseDeDatos[proyecto.baseDeDatos.tipo]
                  .imagen
              }
            ></IconoRedondo>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectCard;
