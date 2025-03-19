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
  Grid2,
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
import useOrderSelect from "@modules/general/hooks/useOrderSelect";

// interface Props {
//   usuario: Usuario;
//   proyectos: ProyectoCard[];
// }

const Portafolio = () => {
  const usuario = usuarioEjemplo;

  const { mode } = useContext(ModeContext);

  const proyectos: ProyectoCard[] = [
    proyecto1,
    proyecto2,
    proyecto1,
    proyecto2,
  ];

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
    }
  };

  const { handleRequestSort, orderBy, removeSortProperty, stableSort } =
    useOrderSelect<ProyectoCard>();

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
      <Stack direction={{ md: "row", xs: "column" }} spacing={4} marginTop={3}>
        <Box sx={{ width: { sm: 300, xs: "100%" } }}>
          <Stack spacing={2}>
            <InputLabel>
              <Typography variant="h6" fontWeight={"bold"}>
                {labelPortafolio.ordenarPor}
              </Typography>
            </InputLabel>
            <Stack>
              <Typography variant="body1" fontWeight={"bold"}>
                {labelPortafolio.puntuacion}
              </Typography>
              <Select>
                <MenuItem
                  onClick={() => handleRequestSort("puntuacion", "asc")}
                >
                  {labelPortafolio.mayor}
                </MenuItem>
                <MenuItem
                  onClick={() => handleRequestSort("puntuacion", "desc")}
                >
                  {labelPortafolio.menor}
                </MenuItem>
              </Select>
            </Stack>
            <Stack>
              <Typography variant="body1" fontWeight={"bold"}>
                {labelPortafolio.semestre}
              </Typography>
              <Select>
                <MenuItem onClick={() => handleRequestSort("semestre", "asc")}>
                  {labelPortafolio.mayor}
                </MenuItem>
                <MenuItem onClick={() => handleRequestSort("semestre", "desc")}>
                  {labelPortafolio.menor}
                </MenuItem>
              </Select>
            </Stack>
          </Stack>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid2
            container
            spacing={1}
            rowSpacing={4}
            justifyContent={"space-between"}
          >
            {filterData(stableSort(proyectos)).map((proyecto) => (
              <Grid2
                size={{ xl: 4, sm: 6, xs: 12 }}
                display={"flex"}
                justifyContent={"center"}
              >
                <ProjectCard
                  tipo="portafolio"
                  handleOpen={() => handleCard(proyecto)}
                  proyecto={proyecto}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Stack>
    </Box>
  );
};

export default Portafolio;
