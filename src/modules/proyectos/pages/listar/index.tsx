import ProjectForList from "@modules/proyectos/components/projectForList";
import { labelProjectForList } from "@modules/proyectos/enum/labelProjectForList";
import { labelListarProyecto } from "@modules/proyectos/enum/labelListarProyectos";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { getExecutionStateArray } from "@modules/proyectos/utils/getExecutionState";
import { Alert, Box, Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useNavigate } from "react-router-dom";
import { rutasProyectos } from "@modules/proyectos/router";
import { useQuery } from "@tanstack/react-query";
import { getProjectByUserId } from "@modules/proyectos/services/get.project";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import AlertDialog from "@modules/general/components/alertDialog";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { labelSelects } from "@modules/general/enums/labelSelects";
import {
  FilterOptions,
  SelectFilters,
  SelectOrders,
  SorterOptions,
} from "@modules/general/components/selects";

function ListarProyectos() {
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

  const scrollToSection = useCallback(() => {
    if (proyectosSectionRef.current) {
      proyectosSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.scrollTo({
        top: 0,
      });
    }
  }, []);

  const sorterOptions: SorterOptions = [
    {
      key: "calificacion",
      label: 'Calificación',
      options: {
        asc: labelSelects.mayor,
        desc: labelSelects.menor,
        defaultValue: labelSelects.noAplicar
      }
        
    },
    {
      key: "fechaUltimaModificacion",
      label: 'Última Calificación',
      options: {
        asc: labelSelects.mayor,
        desc: labelSelects.menor,
        defaultValue: labelSelects.noAplicar
      }
    },
  ];

  const filterOptions: FilterOptions = [
    {
      key: "Estado",
      label: "estado",
      options: getExecutionStateArray.map(
        ([value, key]) => [key, (x: any) => x.value == value] as [string, (x: any) => boolean]
      ),
    },
  ];

  function CardElement(title: string, text: string, icon: ReactNode) {
    return (
      <Grid2
        container
        direction={"row"}
        sx={{
          width: { md: 400, xs: 300 },
          height: { md: 200 },
          padding: 2,
          alignItems: "center",
        }}
        component={Paper}
      >
        <Grid2
          size={{ md: 3, xs: 12 }}
          marginBottom={{ xs: 2, md: 0 }}
          display={"flex"}
          justifyContent={"center"}
        >
          {icon}
        </Grid2>
        <Grid2 size={{ md: 9, xs: 12 }} textAlign={{ xs: "center", md: "start" }}>
          <Stack spacing={3}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="subtitle2">{text}</Typography>
          </Stack>
        </Grid2>
      </Grid2>
    );
  }

  const [buffer, setBuffer] = useState<Proyecto[]>(projects);

  const [bufferSort, setBufferSort] = useState<Proyecto[]>(buffer);

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
        <Stack spacing={4} paddingBottom={4}>
          <Stack spacing={4} height={"100vh"}>
            <Typography variant="h3" textTransform={"uppercase"} textAlign={"center"}>
              {labelListarProyecto.proyectos}
            </Typography>
            <Stack alignItems={"center"}>
              <Alert severity="info" sx={{ maxWidth: 500 }}>
                {labelListarProyecto.notificacion}
              </Alert>
            </Stack>
            <Stack direction={{ md: "row", xs: "column" }} justifyContent={"center"} spacing={3}>
              <Button
                sx={{ textTransform: "none", textAlign: "start" }}
                onClick={() => navigate(rutasProyectos.crear)}
              >
                {CardElement(
                  labelListarProyecto.nuevoProyecto,
                  labelListarProyecto.nuevoProyectoParrafo,
                  <NoteAddIcon sx={{ fontSize: 64 }} />
                )}
              </Button>
              <Button
                sx={{ textTransform: "none", textAlign: "start" }}
                onClick={() => navigate(rutasProyectos.explorar)}
              >
                {CardElement(
                  labelListarProyecto.explorarProyectos,
                  labelListarProyecto.explorarProyectosParrafo,
                  <TravelExploreIcon sx={{ fontSize: 64 }} />
                )}
              </Button>
            </Stack>
            <Stack alignItems={"center"}>
              <Box>
                <Button onClick={scrollToSection} variant="contained" color="info">
                  {labelListarProyecto.verMisProyectos}
                </Button>
              </Box>
            </Stack>
          </Stack>
          <Box id="misProyectos" ref={proyectosSectionRef}>
            <Stack spacing={2} paddingX={2}>
              <Typography variant="h4" textTransform={"uppercase"}>
                {labelProjectForList.titulo}
              </Typography>
            </Stack>
          </Box>
          <SelectFilters<Proyecto>
            data={projects}
            filterOptions={filterOptions}
            setRefineData={setBuffer}
          />
          <SelectOrders<Proyecto>
            data={buffer}
            sorterOptions={sorterOptions}
            setRefineData={setBufferSort}
          />
          <Stack alignItems={"center"} width={"100%"}>
            <Stack spacing={2}>
              {bufferSort.map((proyecto, key) => (
                <ProjectForList proyecto={proyecto} key={key} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default ListarProyectos;
