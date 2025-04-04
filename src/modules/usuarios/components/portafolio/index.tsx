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
  FormControl,
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
import ProjectCard from "@modules/general/components/projectCard";
import { labelPortafolio } from "@modules/usuarios/enum/labelPortafolio";
import useSpringModal from "@modules/general/hooks/useSpringModal";
import SpringModal from "@modules/general/components/springModal";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";
import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrderSelect";
import { ShowGoal } from "@modules/general/components/PortafolioCard";
import { labelSelects } from "@modules/general/enums/labelSelects";

// interface Props {
//   usuario: Usuario;
//   proyectos: ProyectoCard[];
// }

const Portafolio = () => {
  const usuario = usuarioEjemplo;

  const proyectos: ProyectoCard[] = [
    proyecto1,
    proyecto2,
    proyecto1,
    proyecto2,
  ];

  const [selectProyecto, setSelectProyecto] = useState<
    ProyectoCard | undefined
  >(undefined);

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
        <Stack spacing={3}>
          <Stack spacing={3} alignItems={"center"}>
            <Box
              component={"img"}
              sx={{ width: 96, heigth: 96 }}
              src={usuario.fotoDePerfil}
            />
            <Stack alignItems={"center"} marginTop={3} spacing={4}>
              <Stack spacing={2}>
                <Typography variant="h4" textAlign={"center"}>
                  {labelPortafolio.acercaDe}
                </Typography>
                <Typography variant="body1" textAlign={"center"} maxWidth={850}>
                  {usuario.descripcion}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack alignItems={"center"} spacing={3}>
            <Stack direction="row" spacing={2}>
              {showSocialNetworks(usuario.redSocial)}
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <ShowGoal logro={logros} />
              <ShowGoal logro={logros} />
              <ShowGoal logro={logros} />
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <Stack direction={{ md: "row", xs: "column" }} spacing={4} marginTop={3}>
      <Card sx={{ width: { md: 360, xs: "100%" }, height: "100%" }}>
  <Stack spacing={2} sx={{ margin: 2, marginBottom: 4 }}>
    <Typography variant="h6" fontWeight="bold">
      {labelPortafolio.ordenarPor}
    </Typography>

    <FormControl variant="standard" sx={{ width: "100%" }}>
      <InputLabel id="puntuacion-label">
        {labelPortafolio.puntuacion}
      </InputLabel>
      <Select
        labelId="puntuacion-label"
        value={orderBy.puntuacion}
        onChange={(e) =>
          handleRequestSort("puntuacion", (e.target.value as Order) || undefined)
        }
        displayEmpty
      >
        <MenuItem value="">
          <em>No aplicar</em>
        </MenuItem>
        <MenuItem value="asc">{labelSelects.mayor}</MenuItem>
        <MenuItem value="desc">{labelSelects.menor}</MenuItem>
      </Select>
    </FormControl>

    <FormControl variant="standard" sx={{ width: "100%" }}>
      <InputLabel id="semestre-label">
        {labelPortafolio.semestre}
      </InputLabel>
      <Select
        labelId="semestre-label"
        value={orderBy.semestre}
        onChange={(e) =>
          handleRequestSort("semestre", (e.target.value as Order) || undefined)
        }
        displayEmpty
      >
        <MenuItem value="">
          <em>No aplicar</em>
        </MenuItem>
        <MenuItem value="asc">{labelSelects.mayor}</MenuItem>
        <MenuItem value="desc">{labelSelects.menor}</MenuItem>
      </Select>
    </FormControl>
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
    </Box>
  );
};

export default Portafolio;
