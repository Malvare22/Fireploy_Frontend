import { Alert, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import AlertDialog from "@modules/general/components/alertDialog";
import ProjectCard from "@modules/general/components/projectCard";
import SpringModal from "@modules/general/components/springModal";
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
import { AlertDialogProvider } from "@modules/general/context/alertDialogContext";
import {
  filterByFrameworkPC,
  getOptionsFrameworksPC,
} from "@modules/proyectos/utils/getInputsFramework";
import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import { labelSelects } from "@modules/general/enums/labelSelects";

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

  // Estado para la opción de ordenamiento
  const [sortOption, setSortOption] = useState<string>("puntuacion-desc");

  // Estados para los nuevos filtros (replicados de MisProyectos)
  const [selectFramework, setSelectFramework] = useState("");
  const [selectExecutionState, setSelectExecutionState] = useState("");

  // Manejador para el cambio de opción de ordenamiento
  const handleChangeOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value as string);
  };

  // Manejador para el cambio de selección del framework (replicado de MisProyectos)
  function handleFramework(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectFramework(e.target.value);
  }

  // Manejador para el cambio de selección del estado de ejecución (replicado de MisProyectos)
  function handleExecutionState(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectExecutionState(e.target.value);
  }

  const { handleClose: closeModal, handleOpen: openModal, open: modalOpen } = useModal();

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

  const sortedData = useMemo(() => {
    // Es importante crear una copia del array antes de ordenar para no mutar el estado original
    const dataToSort = [...proyectos];
    return dataToSort.sort((a, b) => {
      switch (sortOption) {
        case "puntuacion-asc":
          return a.fav_usuarios.length - b.fav_usuarios.length;
        case "puntuacion-desc":
          return b.fav_usuarios.length - a.fav_usuarios.length;
        case "titulo-desc":
          return b.titulo.localeCompare(a.titulo);
        case "titulo-asc":
          return a.titulo.localeCompare(b.titulo);
        default:
          return 0;
      }
    });
  }, [proyectos, sortOption]);

  const renderData = useMemo(() => {
    let _projects = [...sortedData]; // Empezamos con los datos ya ordenados

    // Aplicar filtro por framework
    if (selectFramework !== "") {
      _projects = filterByFrameworkPC(_projects, selectFramework);
    }

    // Aplicar filtro por estado de ejecución
    if (selectExecutionState !== "") {
      // Asumiendo que ProyectoCard tiene una propiedad 'estadoDeEjecucion'
      _projects = _projects.filter((p) => p.estado === selectExecutionState);
    }

    // Finalmente, aplicar la búsqueda
    return filteredData(_projects, searchFn);
  }, [searchValue, selectFramework, selectExecutionState, sortedData, filteredData, searchFn]);

  return (
    <AlertDialogProvider>
      {/* Modal */}
      <SpringModal open={modalOpen} handleClose={closeModal}>
        {selectProyecto && <ModalProyectoPortafolio callback={refetch} project={selectProyecto} />}
      </SpringModal>

      {/* Alerta de error */}
      <AlertDialog
        open={isError}
        handleAccept={refetch}
        title="Error al cargar proyectos"
        textBody={(error as Error)?.message || "Ocurrió un error inesperado"}
      />

      {/* Contenido */}
      <Stack spacing={3}>
        {/* Título */}
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <Typography variant="h3" textAlign="center">
            {labelExplorarProyectos.explorarProyectos}
          </Typography>
          <TravelExploreIcon sx={{ fontSize: 48 }} />
        </Stack>

        {/* Filtros */}
        <Stack alignItems={'center'}>
          <TextFieldSearch
          fullWidth
          sx={{ width: { md: "70%", xs: "100%" } }}
          setSearchValue={setSearchValue}
        />
        </Stack>
        <Stack direction={{ sm: "row", xs: "column" }} justifyContent="center" spacing={1}>
          <TextField select size="small" sx={{ width: 250 }} label="Ordenar" onChange={handleChangeOption}>
            <MenuItem value={"titulo-asc"}>{"A-Z"}</MenuItem>
            <MenuItem value={"titulo-desc"}>{"Z-A"}</MenuItem>
            <MenuItem value={"puntuacion-asc"}>{"Mayor puntuación"}</MenuItem>
            <MenuItem value={"puntuacion-desc"}>{"Menor puntuación"}</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            sx={{ maxWidth: 250 }}
            label="Framework"
            fullWidth
            onChange={handleFramework}
          >
            {getOptionsFrameworksPC(proyectos).map((op) => {
              return (
                <MenuItem key={op} value={op}>
                  {op}
                </MenuItem>
              );
            })}
            <MenuItem value={""}>{labelSelects.noAplicar}</MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            fullWidth
            sx={{ maxWidth: 250 }}
            label="Estado de Ejecución"
            onChange={handleExecutionState}
          >
            {getExecutionStateArray.map(([value, label]) => {
              return (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              );
            })}
            <MenuItem value={""}>{labelSelects.noAplicar}</MenuItem>
          </TextField>
        </Stack>

        {/* Lista de proyectos */}
        <Stack>
          {isLoading ? (
            <LoaderElement />
          ) : renderData.length === 0 ? (
            <Alert severity="info">{"No se encontraron proyectos"}</Alert>
          ) : (
            <Grid container spacing={4} marginTop={4} marginBottom={6}>
              {renderData.map((proyecto) => (
                <Grid
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
                    callback={refetch}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </Stack>
    </AlertDialogProvider>
  );
}

export default ExplorarProyectos;
