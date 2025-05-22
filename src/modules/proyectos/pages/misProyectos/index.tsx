import ProjectForList from "@modules/proyectos/components/projectForList";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
// import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import { Alert, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProjectByUserId } from "@modules/proyectos/services/get.project";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import AlertDialog from "@modules/general/components/alertDialog";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { useNavigate } from "react-router";
import { rutasProyectos } from "@modules/proyectos/router";
import {
  FilterOptions,
  SelectFilters,
} from "@modules/general/components/selects";
import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import useSearch from "@modules/general/hooks/useSearch";
import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { getNoRepeatValues } from "@modules/general/utils/getNoRepeatValues";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";

/**
 * MisProyectos component – A page that lists the projects belonging to the authenticated user.
 *
 * This component displays the user's projects in a list, along with a notification section
 * that provides information and a button to navigate to the databases section. The component
 * handles loading states, errors, and displays an alert dialog for error handling.
 * It also allows users to navigate between different sections of the app (such as databases).
 *
 * @component
 *
 * @returns {JSX.Element} A page that shows a list of the user's projects with a notification section.
 *
 * @example
 * ```tsx
 * <MisProyectos />
 * ```
 */
function MisProyectos() {
  const proyectosSectionRef = useRef<HTMLDivElement>(null);

  const { token, id } = useAuth().accountInformation;

  const { data, isLoading, error } = useQuery({
    queryFn: () => getProjectByUserId(token, id),
    queryKey: ["Get All Project by User Id", id, token],
  });

  const [projects, setProjects] = useState<Proyecto[]>([]);

  useEffect(() => {
    if (data) {
      setProjects(data.map(adaptProject));
    }
  }, [data]);

  const { handleAccept, message, open, showDialog, type } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  const navigate = useNavigate();

  function handleCreateProject() {
    navigate(rutasProyectos.crear);
  }

  function searchFn(x: Proyecto[], s: string){
    const _s = s.toLowerCase();
    return x.filter((y) => y.titulo.toLowerCase().includes(_s));
  }

  const filterOptions: FilterOptions = [
    {
      key: "estadoDeEjecucion",
      label: "Estado",
      options: getExecutionStateArray.map(
        ([value, key]) => [key, (x: any) => x == value] as [string, (x: any) => boolean]
      ),
    },
    {
      key: "backend.informacion.framework",
      label: "Framework Backend",
      options: getNoRepeatValues(projects, (x) => x.backend?.informacion?.framework).map(
        ((value) => [value, (x: any) => x == value] as [string, (x: any) => boolean]
      )),
    },
     {
      key: "frontend.informacion.framework",
      label: "Framework Frontend",
      options: getNoRepeatValues(projects, (x) => x.frontend?.informacion?.framework).map(
        ((value) => [value, (x: any) => x == value] as [string, (x: any) => boolean]
      )),
    },
    {
      key: "integrado.informacion.framework",
      label: "Framework Integrado",
      options: getNoRepeatValues(projects, (x) => x.frontend?.informacion?.framework).map(
        ((value) => [value, (x: any) => x == value] as [string, (x: any) => boolean]
      )),
    },
  ];

  const {filteredData: applySearch, searchValue, setSearchValue} = useSearch();

  const [buffer, setBuffer] = useState<Proyecto[]>(projects);

  useEffect(() => {
    if (projects) setBuffer(projects);
  }, [projects]);

   const renderData = useMemo(()  => {
      return applySearch(buffer, searchFn);
    }, [searchValue, buffer]);

    function handleButtonAdd(){
      navigate(rutasProyectos.crear);
    }

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title="Consultar Proyectos"
        textBody={message}
        type={type}
      />
      {isLoading ? (
        <LoaderElement />
      ) : (
        <Stack spacing={4}>
          <Box id="misProyectos" ref={proyectosSectionRef}>
            <Stack spacing={2} paddingX={2}>
              <Typography variant="h4" textTransform={"capitalize"}>
                {labelProjectForList.titulo}
              </Typography>
              {/* <Alert
                severity="info"
                sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
              >
                <Stack spacing={1}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {labelProjectForList.notificationHeader}
                  </Typography>
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <Typography>{labelProjectForList.notificationBody}</Typography>
                    <Button
                      variant="outlined"
                      size={"small"}
                      onClick={() => navigate(rutasProyectos.basesDeDatos)}
                    >
                      {labelProjectForList.listarBD}
                    </Button>
                  </Stack>
                </Stack>
              </Alert> */}
            </Stack>
          </Box>
          <Stack spacing={2} paddingX={{ md: 6, xs: 2 }}>
            <SelectFilters<Proyecto>
              data={projects}
              filterOptions={filterOptions}
              setRefineData={setBuffer}
              
            />
            <TextFieldSearch setSearchValue={setSearchValue} label='Buscar proyecto'/>
            <Stack alignItems={'end'}>
              <Box><GeneralButton mode={buttonTypes.add} onClick={handleButtonAdd}/></Box>
            </Stack>
          </Stack>
          {/*  */}
          <Grid2 container spacing={2} paddingX={{ md: 6, xs: 2 }}>
            {renderData && renderData.length > 0 ? (
              renderData.map((proyecto, key) => (
                <Grid2 size={{ md: 6, xs: 12 }}>
                  <ProjectForList proyecto={proyecto} key={key} />
                </Grid2>
              ))
            ) : (
              <Alert
                severity="info"
                color="warning"
                sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography>Actualmente no cuentas con proyectos</Typography>
                  <Button variant="outlined" size="small" onClick={handleCreateProject}>
                    Crear
                  </Button>
                </Stack>
              </Alert>
            )}
          </Grid2>
        </Stack>
      )}
    </>
  );
}

export default MisProyectos;
