import ProjectForList from "@modules/proyectos/components/projectForList";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
// import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import { Alert, Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
    queryKey: ["Get All Project by User Id", id],
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

  // const sorterOptions: SorterOptions = [
  //   {
  //     key: "calificacion",
  //     label: 'Calificación',
  //     options: {
  //       asc: labelSelects.mayor,
  //       desc: labelSelects.menor,
  //       defaultValue: labelSelects.noAplicar
  //     }

  //   },
  //   {
  //     key: "fechaUltimaModificacion",
  //     label: 'Última Calificación',
  //     options: {
  //       asc: labelSelects.mayor,
  //       desc: labelSelects.menor,
  //       defaultValue: labelSelects.noAplicar
  //     }
  //   },
  // ];

  // const filterOptions: FilterOptions = [
  //   {
  //     key: "Estado",
  //     label: "estado",
  //     options: getExecutionStateArray.map(
  //       ([value, key]) => [key, (x: any) => x.value == value] as [string, (x: any) => boolean]
  //     ),
  //   },
  // ];

  // const [buffer, setBuffer] = useState<Proyecto[]>(projects);

  // console.log(data, projects, buffer)
  // const [bufferSort, setBufferSort] = useState<Proyecto[]>(buffer);

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
              <Alert
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
              </Alert>
            </Stack>
          </Box>
          {/* <SelectFilters<Proyecto>
            data={projects}
            filterOptions={filterOptions}
            setRefineData={setBuffer}
          />
          <SelectOrders<Proyecto>
            data={buffer}
            sorterOptions={sorterOptions}
            setRefineData={setBufferSort}
          /> */}
          <Grid2 container spacing={2} paddingX={{ md: 6, xs: 2 }}>
            {projects && projects.length > 0 ? (
              projects.map((proyecto, key) => (
                <Grid2 size={{ md: 6, xs: 12 }}>
                  <ProjectForList proyecto={proyecto} key={key} />
                </Grid2>
              ))
            ) : (
              <Alert severity="info" color="warning" sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: '100%' }}>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography>Actualmente no cuentas con proyectos</Typography>
                  <Button variant="outlined" size="small" onClick={handleCreateProject}>Crear</Button>
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
