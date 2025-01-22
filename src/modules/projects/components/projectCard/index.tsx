import { Box, Tooltip, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { getStatusColor } from "../../utils/getStatusColor";
import { useMemo } from "react";
import { tecnologiasDummy, TypeTecnologia } from "@modules/general/utils/data/tecnologias";
import { TypeProyecto } from "@modules/general/utils/data/proyectos";

interface Props {
  proyecto: TypeProyecto;
}

const ProjectCard: React.FC<Props> = ({ proyecto }: Props) => {
  const AllProyectTecnologies = useMemo(() => {
    const frontend = tecnologiasDummy.find(
      (t) => t.id == proyecto.repositorioFrontend?.id
    );
    const backend = tecnologiasDummy.find(
      (t) => t.id == proyecto.repositorioBackend?.id
    );
    const dataBase = tecnologiasDummy.find(
      (t) => t.id == proyecto.baseDeDatos?.id
    );

    return (
      <>
        {frontend && <Tecnology tecnologia={frontend} />}
        {backend && <Tecnology tecnologia={backend} />}
        {dataBase && <Tecnology tecnologia={dataBase} />}
      </>
    );
  }, [proyecto]);

  return (
    <Box sx={{ backgroundColor: "white", padding: 4, paddingX: { md: 14 } }}>
      <Link href={`view/${proyecto.id}`}>
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
              <Tooltip title={proyecto.estado} placement="top">
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: getStatusColor(proyecto.estado),
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
                <Typography variant="h6">
                  {proyecto.ultimaModificacion}
                </Typography>
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
            {AllProyectTecnologies}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

interface TecnlogyProps {
  tecnologia: TypeTecnologia;
}
const Tecnology: React.FC<TecnlogyProps> = ({ tecnologia }: TecnlogyProps) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Box
      component={"img"}
      sx={{ width: 32, height: 32 }}
      src={tecnologia.imagen}
    ></Box>
    <Box sx={{ marginLeft: 1 }}>
      <Typography variant="h6">{tecnologia.text}</Typography>
    </Box>
  </Box>
);

export default ProjectCard;
