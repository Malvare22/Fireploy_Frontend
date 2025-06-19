import ProjectForList from "@modules/proyectos/components/projectForList";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
// import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import { Alert, Box, Button, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
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
import { rutasProyectos } from "@modules/proyectos/router/routes";
import useSearch from "@modules/general/hooks/useSearch";
import TextFieldSearch from "@modules/general/components/textFieldSearch";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import {
  filterByFrameworkLegacy,
  getOptionsFrameworksLegacy,
} from "@modules/proyectos/utils/getInputsFramework";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import { ACCOUNT_INITIAL_VALUES } from "@modules/general/enums/accountInfoValues";

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

  const { id } = useAuth().accountInformation;

  const token =
    useAuth().accountInformation.token == ACCOUNT_INITIAL_VALUES.TOKEN
      ? null
      : useAuth().accountInformation.token;

  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      if (token) return await getProjectByUserId(id, token);
      return [];
    },
    queryKey: ["Get All Project by User Id", id, token],
  });

  const [selectFramework, setSelectFramework] = useState("");
  const [selectExecutionState, setSelectExecutionState] = useState("");

  function handleFramework(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectFramework(e.target.value as string);
  }

  function handleExecutionState(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectExecutionState(e.target.value as string);
  }

  const [projects, setProjects] = useState<Proyecto[]>([]);

  useEffect(() => {
    if (data) {
      console.log(data)
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

  function searchFn(x: Proyecto[], s: string) {
    const _s = s.toLowerCase();
    return x.filter((y) => y.titulo.toLowerCase().includes(_s));
  }

  const { filteredData: applySearch, searchValue, setSearchValue } = useSearch();

  const renderData = useMemo(() => {
    let _projects =
      selectFramework == "" ? projects : filterByFrameworkLegacy(projects, selectFramework);

    if (selectExecutionState != "")
      _projects = _projects.filter((p) => p.estadoDeEjecucion == selectExecutionState);

    return applySearch(_projects, searchFn);
  }, [searchValue, selectFramework, selectExecutionState, projects]);

  function handleButtonAdd() {
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
            <TextFieldSearch setSearchValue={setSearchValue} label="Buscar proyecto" />
            <Stack direction={"row"} spacing={1}>
              <TextField
                select
                size="small"
                sx={{ maxWidth: 250 }}
                label="Framework"
                fullWidth
                onChange={handleFramework}
              >
                {getOptionsFrameworksLegacy(projects).map((op) => {
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
            <Stack alignItems={"end"}>
              <Box>
                <GeneralButton mode={buttonTypes.add} onClick={handleButtonAdd} />
              </Box>
            </Stack>
          </Stack>
          <Grid container spacing={4} paddingX={{ md: 6, xs: 2 }}>
            {renderData && renderData.length > 0 ? (
              renderData.map((proyecto, key) => (
                <Grid size={12}>
                  <ProjectForList proyecto={proyecto} key={key} />
                </Grid>
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
          </Grid>
        </Stack>
      )}
    </>
  );
}

export default MisProyectos;
