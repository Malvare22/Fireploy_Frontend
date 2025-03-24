import AlertDialog from "@modules/general/components/alertDialog";
import { labelSelects } from "@modules/general/enums/labelSelects";
import useOrderSelect from "@modules/general/hooks/useOrderSelect";
import useQuery from "@modules/general/hooks/useQuery";
import { labelExplorarProyectos } from "@modules/proyectos/enum/labelExplorarProyectos";
import { getProyectosAllService } from "@modules/proyectos/services/get.proyectos.all";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { ProyectoService } from "@modules/proyectos/types/proyecto.service";
import { adaptaProyectoService } from "@modules/proyectos/utils/adapt.proyecto";
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
import SearchIcon from "@mui/icons-material/Search";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ProjectCard from "@modules/general/components/projectCard";
import useSpringModal from "@modules/general/hooks/useSpringModal";
import SpringModal from "@modules/general/components/springModal";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";

function ExplorarProyectos() {
  const { error, handleAlertClose, initQuery, open, responseData } =
    useQuery<ProyectoService[]>(
      () => getProyectosAllService(),
      false,
      "Error la cargar los proyectos"
    );

  const [proyectos, setProyectos] = useState<ProyectoCard[]>([]);

  const [selectProyecto, setSelectProyecto] = useState<
    ProyectoCard | undefined
  >(undefined);

  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useSpringModal();

  useEffect(() => {
    initQuery();
  }, []);

  useEffect(() => {
    if (responseData)
      setProyectos(
        responseData.map((proyecto) => adaptaProyectoService(proyecto))
      );
  }, [responseData]);

  console.log(proyectos);

  const [search, setSearch] = useState<string>("");

  const { handleRequestSort, stableSort } =
    useOrderSelect<ProyectoCard>();

  const filterSearchData = useMemo(() => {
    if (search != "")
      return stableSort(proyectos).filter((proyecto) =>
        proyecto.titulo.toLowerCase().includes(search.toLowerCase())
      );
    return stableSort(proyectos);
  }, [search, proyectos]);

  return (
    <>
      <SpringModal
        handleClose={handleCloseModal}
        handleOpen={handleOpenModal}
        open={openModal}
      >
        {selectProyecto != undefined && (
          <ModalProyectoPortafolio proyecto={selectProyecto} />
        )}
      </SpringModal>
      <Stack>
        {error && (
          <AlertDialog
            handleAccept={handleAlertClose}
            open={open}
            title="Cargar Proyectos"
          />
        )}
      </Stack>
      <Stack spacing={5}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          <Typography variant="h3" textAlign={"center"}>
            {labelExplorarProyectos.explorarProyectos}
          </Typography>
          <TravelExploreIcon sx={{ fontSize: 48 }} />
        </Stack>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          justifyContent={"center"}
          spacing={1}
        >
          <TextField
            label="Buscar Materia"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: { md: 600, xs: "100%" } }}
            onChange={(e) => setSearch(e.currentTarget.value as string)}
            value={search}
          />
          <Select
            onChange={(e) => {
              const selectedValue = JSON.parse(e.target.value as string);
              handleRequestSort(selectedValue.key, selectedValue.order);
            }}
            defaultValue={JSON.stringify({ key: undefined, order: undefined })}
          >
            <MenuItem
              value={JSON.stringify({ key: undefined, order: undefined })}
            >
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
            <MenuItem
              value={JSON.stringify({ key: "semestre", order: "desc" })}
            >
              {labelSelects.semestreMenor}
            </MenuItem>
            <MenuItem
              value={JSON.stringify({ key: "puntuacion", order: "asc" })}
            >
              {labelSelects.puntuacionMayor}
            </MenuItem>
            <MenuItem
              value={JSON.stringify({ key: "puntuacion", order: "desc" })}
            >
              {labelSelects.puntuacionMenor}
            </MenuItem>
          </Select>
        </Stack>
        <Stack>
          <Grid2
            container
            spacing={5}
            paddingX={{ md: 10 }}
            marginTop={4}
            marginBottom={6}
          >
            {filterSearchData.map((proyecto, key) => (
              <Grid2
                size={{ xl: 4, sm: 6, xs: 12 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ProjectCard
                  proyecto={proyecto}
                  tipo="portafolio"
                  handleOpen={() => {
                    setSelectProyecto(proyecto);
                    handleOpenModal();
                  }}
                  key={key}
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
