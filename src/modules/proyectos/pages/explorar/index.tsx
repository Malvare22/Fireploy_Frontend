import {
  Grid2,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import SearchIcon from "@mui/icons-material/Search";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import AlertDialog from "@modules/general/components/alertDialog";
import ProjectCard from "@modules/general/components/projectCard";
import SpringModal from "@modules/general/components/springModal";

import { labelSelects } from "@modules/general/enums/labelSelects";
import useOrderSelect from "@modules/general/hooks/useOrderSelect";
import useSpringModal from "@modules/general/hooks/useSpringModal";

import { getProyectosAllService } from "@modules/proyectos/services/get.proyectos.all";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { ProyectoService } from "@modules/proyectos/types/proyecto.service";
import { labelExplorarProyectos } from "@modules/proyectos/enum/labelExplorarProyectos";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";

function ExplorarProyectos() {
  const [search, setSearch] = useState("");
  const [selectProyecto, setSelectProyecto] = useState<ProyectoCard>();
  const { handleClose: closeModal, handleOpen: openModal, open: modalOpen } = useSpringModal();

  const {
    handleRequestSort,
    stableSort,
    currentOrder,
    currentKey,
  } = useOrderSelect<ProyectoCard>();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ProyectoService[]>({
    queryKey: ["proyectos-all"],
    queryFn: getProyectosAllService,
    refetchOnWindowFocus: false,
  });

  const proyectos: ProyectoCard[] = useMemo(() => {
    if (!data) return [];
    return data.map(adaptProject);
  }, [data]);

  const filteredProyectos = useMemo(() => {
    const searchLower = search.toLowerCase();
    return stableSort(proyectos).filter((p) =>
      p.titulo.toLowerCase().includes(searchLower)
    );
  }, [search, proyectos, currentOrder, currentKey]);

  return (
    <>
      {/* Modal */}
      <SpringModal open={modalOpen} handleClose={closeModal}>
        {selectProyecto && <ModalProyectoPortafolio proyecto={selectProyecto} />}
      </SpringModal>

      {/* Alert de error */}
      <AlertDialog
        open={isError}
        handleAccept={refetch}
        title="Error al cargar proyectos"
        textBody={(error as Error)?.message || "Ocurrió un error inesperado"}
      />

      {/* Contenido */}
      <Stack spacing={5}>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <Typography variant="h3" textAlign="center">
            {labelExplorarProyectos.explorarProyectos}
          </Typography>
          <TravelExploreIcon sx={{ fontSize: 48 }} />
        </Stack>

        {/* Filtros */}
        <Stack direction={{ sm: "row", xs: "column" }} justifyContent="center" spacing={1}>
          <TextField
            label="Buscar proyecto"
            fullWidth
            sx={{ maxWidth: 600 }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            size="small"
            sx={{ width: 250 }}
            value={JSON.stringify({ key: currentKey, order: currentOrder })}
            onChange={(e) => {
              const val = JSON.parse(e.target.value);
              handleRequestSort(val.key, val.order);
            }}
          >
            <MenuItem value={JSON.stringify({ key: undefined, order: undefined })}>
              {labelSelects.noAplicar}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "titulo", order: "asc" })}>
              {labelSelects.alfabeticamenteMayor}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "titulo", order: "desc" })}>
              {labelSelects.alfabeticamenteMenor}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "semestre", order: "asc" })}>
              {labelSelects.semestreMayor}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "semestre", order: "desc" })}>
              {labelSelects.semestreMenor}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "puntuacion", order: "asc" })}>
              {labelSelects.puntuacionMayor}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "puntuacion", order: "desc" })}>
              {labelSelects.puntuacionMenor}
            </MenuItem>
          </Select>
        </Stack>

        {/* Lista de proyectos */}
        <Stack>
          <Grid2
            container
            spacing={4}
            paddingX={{ md: 10 }}
            marginTop={4}
            marginBottom={6}
          >
            {filteredProyectos.map((proyecto) => (
              <Grid2
                key={proyecto.id}
                size={{ xl: 4, sm: 6, xs: 12 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ProjectCard
                  proyecto={proyecto}
                  tipo="portafolio"
                  handleOpen={() => {
                    setSelectProyecto(proyecto);
                    openModal();
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      </Stack>
    </>
  );
}

export default ExplorarProyectos;
