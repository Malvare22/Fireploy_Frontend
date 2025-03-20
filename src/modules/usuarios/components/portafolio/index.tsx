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
import useOrderSelect, { Order } from "@modules/general/hooks/useOrderSelect";
import { ShowGoal } from "@modules/general/components/portafolioCard";

// interface Props {
//   usuario: Usuario;
//   proyectos: ProyectoCard[];
// }

const Portafolio = () => {
  const usuario = usuarioEjemplo;

  const { mode } = useContext(ModeContext);

  const [fase, setFase] = useState(0);

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

  const { handleRequestSort, orderBy, stableSort } =
    useOrderSelect<ProyectoCard>();

  const logros = { titulo: "Repositorios en GitHub", valor: "50+" };

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
            <Button variant="text" onClick={() => setFase(0)}>
              <Typography variant="h5">{labelPortafolio.proyectos}</Typography>
            </Button>
            <Button variant="text" onClick={() => setFase(1)}>
              <Typography variant="h5">{labelPortafolio.acercaDe}</Typography>
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            {showSocialNetworks(usuario.redSocial)}
          </Stack>
        </Stack>
      </Card>
      <Stack
        direction={{ md: "row", xs: "column" }}
        spacing={4}
        marginTop={3}
        display={fase == 0 ? "flex" : "none"}
      >
        <Card sx={{ width: { md: 360, xs: "100%" }, height: "100%" }}>
          <Stack spacing={2} sx={{ margin: 2, marginBottom: 4 }}>
            <InputLabel>
              <Typography variant="h6" fontWeight={"bold"}>
                {labelPortafolio.ordenarPor}
              </Typography>
            </InputLabel>
            <Stack>
              <Typography variant="body1" fontWeight={"bold"}>
                {labelPortafolio.puntuacion}
              </Typography>
              <Select
                onChange={(e) =>
                  handleRequestSort(
                    "puntuacion",
                    (e.target.value as Order) ?? "asc"
                  )
                }
                value={orderBy.puntuacion}
              >
                <MenuItem value="asc">{labelPortafolio.mayor}</MenuItem>
                <MenuItem value="desc">{labelPortafolio.menor}</MenuItem>
              </Select>
            </Stack>
            <Stack>
              <Typography variant="body1" fontWeight={"bold"}>
                {labelPortafolio.semestre}
              </Typography>
              <Select
                onChange={(e) =>
                  handleRequestSort(
                    "semestre",
                    (e.target.value as Order) ?? "asc"
                  )
                }
                value={orderBy.semestre}
              >
                <MenuItem value="asc">{labelPortafolio.mayor}</MenuItem>
                <MenuItem value="desc">{labelPortafolio.menor}</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </Card>
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
      <Stack
        alignItems={"center"}
        marginTop={3}
        spacing={4}
        display={fase == 1 ? "flex" : "none"}
      >
        <Stack spacing={2}>
          <Typography variant="h4" textAlign={"center"}>
            {labelPortafolio.acercaDe}
          </Typography>
          <Typography variant="body1" textAlign={"center"} width={500}>
            {usuario.descripcion}
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={4}>
          <ShowGoal logro={logros} />
          <ShowGoal logro={logros} />
          <ShowGoal logro={logros} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Portafolio;
