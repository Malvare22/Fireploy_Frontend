import LoaderElement from "@modules/general/components/loaderElement";
import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { AlertDialogProvider } from "@modules/general/context/alertDialogContext";
import useSearch from "@modules/general/hooks/useSearch";
import TablaProyectos from "@modules/proyectos/components/tablaProyectos";
import { getAllPublicProjects } from "@modules/proyectos/services/get.project";
import { EstadoEjecucionProyecto, Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import { getDataBaseTypesMap } from "@modules/proyectos/utils/database";
import { getExecutionState } from "@modules/proyectos/utils/getExecutionState";
import {
  Box,
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
  const [selectTechnologies, setSelectTechnologies] = useState("");
  const [selectDatabase, setSelectDatabase] = useState("");
  const { filteredData, setSearchValue, searchValue } = useSearch();

  const filterByText = (a: String, b: String) => {
    return a.toLowerCase().includes(b.toLowerCase());
  };

  const { materias, estados, basesDeDatos, tecnologias } = useMemo(() => {
    const materiasSet = new Set<string>();
    const estadosSet = new Set<string>();
    const tecnologiasSet = new Set<string>();
    const basesDeDatosSet = new Set<string>();

    projectList?.forEach((p: Proyecto) => {
      if (p.materiaInformacion?.nombre) materiasSet.add(p.materiaInformacion.nombre);
      if (p.estadoDeEjecucion) estadosSet.add(p.estadoDeEjecucion);
      if (p.frontend?.informacion?.framework) tecnologiasSet.add(p.frontend.informacion.framework);
      if (p.backend?.informacion?.framework) tecnologiasSet.add(p.backend.informacion.framework);
      if (p.baseDeDatos?.tipo)
        basesDeDatosSet.add(getDataBaseTypesMap.get(p.baseDeDatos.tipo) as string);
    });

    return {
      materias: Array.from(materiasSet),
      estados: Array.from(estadosSet),
      tecnologias: Array.from(tecnologiasSet),
      basesDeDatos: Array.from(basesDeDatosSet),
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
    if (selectTechnologies) {
      data = data.filter((p: Proyecto) =>
        [p.frontend?.informacion?.framework, p.backend?.informacion?.framework].includes(
          selectTechnologies
        )
      );
    }

    if (selectDatabase) {
      data = data.filter((p: Proyecto) => {
        if (p.baseDeDatos?.tipo)
          return selectDatabase === (getDataBaseTypesMap.get(p.baseDeDatos.tipo) as string);
      });
    }

    return data;
  }, [searchValue, selectMateria, selectEstado, projectList, selectDatabase, selectTechnologies]);

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
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2}}>
                <FormControl sx={{ minWidth: {xs: 160, md: 240} }}>
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

                <FormControl sx={{ minWidth: 160 }}>
                  <InputLabel>Tecnología</InputLabel>
                  <Select
                    value={selectTechnologies}
                    label="Tecnología"
                    onChange={(e) => setSelectTechnologies(e.target.value)}
                  >
                    <MenuItem value="">Todas</MenuItem>
                    {tecnologias.map((tecnologia) => (
                      <MenuItem key={tecnologia} value={tecnologia}>
                        {tecnologia}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 160 }}>
                  <InputLabel>Base de Datos</InputLabel>
                  <Select
                    value={selectDatabase}
                    label="Base de Datos"
                    onChange={(e) => setSelectDatabase(e.target.value)}
                  >
                    <MenuItem value="">Todas</MenuItem>
                    {basesDeDatos.map((db) => (
                      <MenuItem key={db} value={db}>
                        {db}
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
              </Box>
            </Stack>
            <TablaProyectos proyectos={dataToRender ?? []} trigger={refetch} />
          </Container>
        </AlertDialogProvider>
      )}
    </>
  );
}

export default VistaAdministrarProyectos;
