import { proyecto1, ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { Usuario, usuarioEjemplo } from "@modules/usuarios/types/usuario";
import { showSocialNetworks } from "@modules/usuarios/utils/showSocialNetworks";
import {
  Box,
  Button,
  Card,
  Divider,
  Palette,
  PaletteMode,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useContext, useState } from "react";
import SocialNetworkIcon from "../socialNetwork";
import { ModeContext } from "@modules/general/context/modeContext";
import { getTheme } from "@core/themes";
import ProjectCard, {
  ProjectCardPortafolio,
} from "@modules/general/components/projectCard";
import { labelPortafolio } from "@modules/usuarios/enum/labelPortafolio";
import useSpringModal from "@modules/general/hooks/useSpringModal";
import SpringModal from "@modules/general/components/springModal";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";

// interface Props {
//   usuario: Usuario;
//   proyectos: ProyectoCard[];
// }

const Portafolio = () => {
  const usuario = usuarioEjemplo;

  const { mode } = useContext(ModeContext);

  const theme = getTheme(mode as PaletteMode);

  const { handleClose, handleOpen, open } = useSpringModal();

  return (
    <Box>
      <SpringModal handleClose={handleClose} handleOpen={handleOpen} open={open}>
        <ModalProyectoPortafolio/>
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
        <ProjectCard tipo="portafolio" handleOpen={handleOpen} />
      </Box>
    </Box>
  );
};

export default Portafolio;
