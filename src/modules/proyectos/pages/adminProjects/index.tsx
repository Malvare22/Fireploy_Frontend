import LoaderElement from "@modules/general/components/loaderElement";
import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { AlertDialogProvider } from "@modules/general/context/alertDialogContext";
import useSearch from "@modules/general/hooks/useSearch";
import TablaProyectos from "@modules/proyectos/components/tablaProyectos";
import { getAllPublicProjects } from "@modules/proyectos/services/get.project";
import { EstadoEjecucionProyecto, Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import { getExecutionState } from "@modules/proyectos/utils/getExecutionState";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

function VistaAdministrarProyectos() {
  const { data: projectList, refetch } = useQuery({
    queryFn: async () => {
      const projectsDTO = await getAllPublicProjects();
      return projectsDTO.map(adaptProject);
    },
    queryKey: ["get all projects"],
    refetchInterval: () => 10000,
  });

  const [selectMateria, setSelectMateria] = useState("");
  const [selectEstado, setSelectEstado] = useState("");
  const { filteredData, setSearchValue, searchValue } = useSearch();

  const filterByText = (a: String, b: String) => {
    return a.toLowerCase().includes(b.toLowerCase());
  };

  const { materias, estados } = useMemo(() => {
    const materiasSet = new Set<string>();
    const estadosSet = new Set<string>();

    projectList?.forEach((p: Proyecto) => {
      if (p.materiaInformacion?.nombre) materiasSet.add(p.materiaInformacion.nombre);
      if (p.estadoDeEjecucion) estadosSet.add(p.estadoDeEjecucion);
    });

    return {
      materias: Array.from(materiasSet),
      estados: Array.from(estadosSet),
    };
  }, [projectList]);

  const dataToRender = useMemo(() => {
    let data = filteredData(projectList, (x: Proyecto[]) =>
      x.filter((y) => filterByText(y.titulo, searchValue))
    );

    if (selectMateria) {
      data = data.filter((p: Proyecto) => p.materiaInformacion.nombre === selectMateria);
    }
    if (selectEstado) {
      data = data.filter((p: Proyecto) => p.estadoDeEjecucion === selectEstado);
    }

    return data;
  }, [searchValue, selectMateria, selectEstado, projectList]);

  return (
    <>
      {projectList == undefined ? (
        <LoaderElement />
      ) : (
        <AlertDialogProvider>
          <Container component={Stack} spacing={3}>
            <Typography variant="h4">{"Proyectos registrados"}</Typography>
            <Stack spacing={2}>
              <Stack>
                <TextFieldSearch setSearchValue={setSearchValue} label="Buscar proyecto" />
              </Stack>
              <Stack direction="row" spacing={2}>
                {/* Select Materia */}
                <FormControl sx={{ minWidth: 160 }}>
                  <InputLabel>Materia</InputLabel>
                  <Select
                    value={selectMateria}
                    label="Materia"
                    onChange={(e) => setSelectMateria(e.target.value)}
                    
                  >
                    <MenuItem value="">Todas</MenuItem>
                    {materias.map((materia) => (
                      <MenuItem key={materia} value={materia}>
                        {materia}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Select Estado */}
                <FormControl sx={{ minWidth: 160 }}>
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={selectEstado}
                    label="Estado"
                    onChange={(e) => setSelectEstado(e.target.value)}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    {estados.map((estado) => (
                      <MenuItem key={estado} value={estado}>
                        {getExecutionState[estado as EstadoEjecucionProyecto]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <TablaProyectos proyectos={dataToRender ?? []} trigger={refetch} />
          </Container>
        </AlertDialogProvider>
      )}
    </>
  );
}

export default VistaAdministrarProyectos;
