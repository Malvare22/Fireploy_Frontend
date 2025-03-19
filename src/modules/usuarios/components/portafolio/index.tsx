import {
  proyecto1,
  proyecto2,
  ProyectoCard,
} from "@modules/proyectos/types/proyecto.card";
import { Usuario, usuarioEjemplo } from "@modules/usuarios/types/usuario";
import { showSocialNetworks } from "@modules/usuarios/utils/showSocialNetworks";
import {
  Box,
  Button,
  Card,
  Divider,
  InputLabel,
  MenuItem,
  Palette,
  PaletteMode,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useContext, useState } from "react";
import SocialNetworkIcon from "../socialNetwork";
import { ModeContext } from "@modules/general/context/modeContext";
import { getTheme } from "@core/themes";
import ProjectCard from "@modules/general/components/projectCard";
import { labelPortafolio } from "@modules/usuarios/enum/labelPortafolio";
import useSpringModal from "@modules/general/hooks/useSpringModal";
import SpringModal from "@modules/general/components/springModal";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";
import { useFilters } from "@modules/general/hooks/useFilters";

// interface Props {
//   usuario: Usuario;
//   proyectos: ProyectoCard[];
// }

const Portafolio = () => {
  const usuario = usuarioEjemplo;

  const { mode } = useContext(ModeContext);

  const proyectos: ProyectoCard[] = [proyecto1, proyecto2];

  const [selectProyecto, setSelectProyecto] = useState<
    ProyectoCard | undefined
  >(undefined);

  const theme = getTheme(mode as PaletteMode);

  const { handleClose, handleOpen, open } = useSpringModal();

  type Filtros = {
    backend: string;
    frontend: string;
    dataBase: string;
    semestre: string;
  };

  const [filtros, setFiltros] = useState<Filtros>({
    backend: "",
    frontend: "",
    dataBase: "",
    semestre: "",
  });

  const { filterData, toggleFilter } = useFilters<ProyectoCard>();

  const handleCard = (proyecto: ProyectoCard) => {
    setSelectProyecto(proyecto);
    handleOpen();
  };

  const handleFiltro = (key: keyof Filtros, value: unknown) => {
    setFiltros({ ...filtros, [key]: value });
    if (key == "semestre") {
      toggleFilter(key, value);
      return;
    }

    switch (key) {
      case "backend":
        toggleFilter("backend.nombre", value);
        return;
      case "frontend":
        toggleFilter("frontend.nombre", value);
        return;
      case "dataBase":
        toggleFilter("dataBase.nombre", value);
        return;

        return;
    }
  };

  return (
    <Box>
      <SpringModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      >
        {selectProyecto != undefined && (
          <ModalProyectoPortafolio proyecto={selectProyecto} />
        )}
      </SpringModal>
      <Card
        sx={{
          padding: 6,
        }}
      >
        <Stack spacing={3} alignItems={"center"}>
          <Box
            component={"img"}
            sx={{ width: 96, heigth: 96 }}
            src={usuario.fotoDePerfil}
          />
          <Stack spacing={4} direction={"row"}>
            <Typography variant="h5">{labelPortafolio.proyectos}</Typography>
            <Typography variant="h5">{labelPortafolio.acercaDe}</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            {showSocialNetworks(usuario.redSocial)}
          </Stack>
        </Stack>
      </Card>
      <Box>
        <Box>
          <InputLabel>
            <Typography>{labelPortafolio.filtrarPor}</Typography>
          </InputLabel>
          <Stack>
            <InputLabel>{labelPortafolio.semestre}</InputLabel>
            <Select onChange={(e) => handleFiltro("semestre", e.target.value)}>
              {proyectos.map((proyecto, key) => (
                <MenuItem value={proyecto.semestre}>
                  {proyecto.semestre}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack>
            <InputLabel>{labelPortafolio.frontend}</InputLabel>
            <Select onChange={(e) => handleFiltro("frontend", e.target.value)}>
              {proyectos.map((proyecto, key) => (
                <MenuItem value={proyecto.frontend.nombre}>
                  {proyecto.frontend.nombre}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack>
            <InputLabel>{labelPortafolio.backend}</InputLabel>
            <Select onChange={(e) => handleFiltro("backend", e.target.value)}>
              {proyectos.map((proyecto, key) => (
                <MenuItem value={proyecto.backend.nombre}>
                  {proyecto.backend.nombre}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack>
            <InputLabel>{labelPortafolio.database}</InputLabel>
            <Select onChange={(e) => handleFiltro("dataBase", e.target.value)}>
              {proyectos.map((proyecto, key) => (
                <MenuItem value={proyecto.dataBase.nombre}>
                  {proyecto.dataBase.nombre}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Box>
        {filterData(proyectos).map((proyecto) => (
          <ProjectCard
            tipo="portafolio"
            handleOpen={() => handleCard(proyecto)}
            proyecto={proyecto}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Portafolio;
