import { Alert, Grid2, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import AlertDialog from "@modules/general/components/alertDialog";
import ProjectCard from "@modules/general/components/projectCard";
import SpringModal from "@modules/general/components/springModal";

import { labelSelects } from "@modules/general/enums/labelSelects";
import useOrderSelect from "@modules/general/hooks/useOrder";

import { getProyectosAllService } from "@modules/proyectos/services/get.proyectos.all";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { ProyectoService } from "@modules/proyectos/types/proyecto.service";
import { labelExplorarProyectos } from "@modules/proyectos/enum/labelExplorarProyectos";
import ModalProyectoPortafolio from "@modules/proyectos/components/modalProyectoPortafolio";
import { adaptProject, adaptProjectToCard } from "@modules/proyectos/utils/adapt.proyecto";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import LoaderElement from "@modules/general/components/loaderElement";
import useSearch from "@modules/general/hooks/useSearch";
import TextFieldSearch from "@modules/general/components/textFieldSearch";

/**
 * ExplorarProyectos component – A project exploration interface that allows users to search and filter through
 * available projects, displaying them in a list or grid format with sorting options.
 *
 * This component fetches a list of all available projects and allows users to filter them by search keywords.
 * The user can also sort projects alphabetically, by semester, or by rating. Clicking on a project card opens a
 * modal with more details about the selected project.
 *
 * The component also handles error states by showing an alert dialog when there's an issue fetching project data.
 *
 * @component
 *
 * @returns {JSX.Element} A project exploration interface with search, filter, and sorting options,
 * as well as the ability to view project details in a modal.
 *
 * @example
 * ```tsx
 * <ExplorarProyectos />
 * ```
 */
function ExplorarProyectos() {
  const [selectProyecto, setSelectProyecto] = useState<ProyectoCard | null>(null);

  const { handleClose: closeModal, handleOpen: openModal, open: modalOpen } = useModal();

  const { handleOrder, orderDataFn, order } = useOrderSelect<ProyectoCard>();

  const { data, isLoading, isError, error, refetch } = useQuery<ProyectoService[]>({
    queryKey: ["Projects All"],
    queryFn: getProyectosAllService,
    refetchOnWindowFocus: false,
  });

  const proyectos: ProyectoCard[] = useMemo(() => {
    if (!data) return [];
    return data.map((project) => adaptProjectToCard(adaptProject(project)));
  }, [data]);

  const { filteredData, searchValue, setSearchValue } = useSearch();

  function searchFn(x: ProyectoCard[], s: string) {
    return x.filter((y) => y.titulo.toLowerCase().includes(s.toLowerCase()));
  }

  const renderData = useMemo(() => {
    return filteredData(orderDataFn(proyectos), searchFn);
  }, [searchValue, proyectos, order]);

  return (
    <>
      {/* Modal */}
      <SpringModal open={modalOpen} handleClose={closeModal}>
        {selectProyecto && <ModalProyectoPortafolio proyecto={selectProyecto} />}
      </SpringModal>

      {/* Alerta de error */}
      <AlertDialog
        open={isError}
        handleAccept={refetch}
        title="Error al cargar proyectos"
        textBody={(error as Error)?.message || "Ocurrió un error inesperado"}
      />

      {/* Contenido */}
      <Stack spacing={5}>
        {/* Título */}
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <Typography variant="h3" textAlign="center">
            {labelExplorarProyectos.explorarProyectos}
          </Typography>
          <TravelExploreIcon sx={{ fontSize: 48 }} />
        </Stack>

        {/* Filtros */}
        <Stack direction={{ sm: "row", xs: "column" }} justifyContent="center" spacing={1}>
          <TextFieldSearch
            fullWidth
            sx={{ width: { md: "70%", xs: "100%" } }}
            setSearchValue={setSearchValue}
          />
          <Select
            size="small"
            sx={{ width: 250 }}
            onChange={(e) => {
              const val = JSON.parse(e.target.value as string);
              if (val.key == undefined) {
                handleOrder("titulo", undefined);
                handleOrder("semestre", undefined);
                handleOrder("puntuacion", undefined);
              } else handleOrder(val.key, val.order);
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
          </Select>
        </Stack>

        {/* Lista de proyectos */}
        <Stack>
          {isLoading ? (
            <LoaderElement />
          ) : renderData.length === 0 ? (
            <Alert severity="info">{"No se encontraron proyectos"}</Alert>
          ) : (
            <Grid2 container spacing={4} marginTop={4} marginBottom={6}>
              {orderDataFn(proyectos).map((proyecto) => (
                <Grid2
                  key={proyecto.id}
                  size={{ xl: 4, sm: 6, xs: 12 }}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <ProjectCard
                    proyecto={proyecto}
                    handleOpen={() => {
                      setSelectProyecto(proyecto);
                      openModal();
                    }}
                  />
                </Grid2>
              ))}
            </Grid2>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default ExplorarProyectos;
