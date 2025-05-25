import { Alert, Box, Grid2, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccordionUsage from "@modules/general/components/accordionUsage";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { labelCardSeccion } from "@modules/materias/enums/labelCardSeccion";
import { Seccion } from "@modules/materias/types/seccion";
import ProjectCard from "@modules/general/components/projectCard";
// import { SelectOrders, SorterOptions } from "@modules/general/components/selects";
import { useQuery } from "@tanstack/react-query";
import { getProjectByIdSection } from "@modules/proyectos/services/get.project";
import { useAuth } from "@modules/general/context/accountContext";
import { adaptProject, adaptProjectToCard } from "@modules/proyectos/utils/adapt.proyecto";
import LoaderElement from "@modules/general/components/loaderElement";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { useNavigate } from "react-router";
import { Materia } from "@modules/materias/types/materia";
import { rutasProyectos } from "@modules/proyectos/router";
import { Curso } from "@modules/materias/types/curso";
import { evaluateDate, getCurrentDate } from "@modules/general/utils/fechas";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import SpringModal from "@modules/general/components/springModal";
import CardProjectModal from "@modules/proyectos/components/modalProyectoPortafolio";

type CardSeccionProps = {
  seccion: Seccion;
  idMateria: Materia["id"];
  idCurso: Curso["id"];
};

/**
 * CardSeccion component – displays an expandable section (accordion) containing projects
 * related to a specific section of a course. It includes a sortable list of projects,
 * description, and an action to create new projects.
 *
 * This component fetches project data from the server using the section ID, transforms it
 * into a card format, and displays each project inside a responsive grid. It also provides
 * sorting capabilities and shows the section's metadata (title and dates).
 *
 * @component
 *
 * @param {Object} seccion - The section object containing its metadata and identifier.
 * @param {number|string} idMateria - The unique identifier of the subject associated with the section.
 * @param {number|string} idCurso - The unique identifier of the course associated with the section.
 * @param {Function} handleCard - Callback function triggered when a project card is clicked; receives the selected project.
 *
 * @returns {JSX.Element} A collapsible UI element showing a section's details and associated projects with interactive actions.
 *
 * @example
 * ```tsx
 * <CardSeccion
 *   seccion={seccionObject}
 *   idMateria={1}
 *   idCurso={2}
 *   handleCard={(project) => console.log(project)}
 * />
 * ```
 */
const CardSeccion: React.FC<CardSeccionProps> = ({ seccion, idMateria, idCurso }) => {
  const [proyectos, setProyectos] = useState<ProyectoCard[]>([]);

  // const [buffer, setBuffer] = useState<ProyectoCard[]>([]);

  const [projectSelect, setProjectSelect] = useState<ProyectoCard | null>(null);

  function handleCard(project: ProyectoCard) {
    setProjectSelect(project);
    handleOpenModal();
  }

  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  const navigate = useNavigate();

  const paramsToCreateProject = {
    materia: (idMateria ?? 0)?.toString(),
    curso: (idCurso ?? 0).toString(),
    seccion: (seccion.id ?? 0).toString(),
  };

  function nav() {
    const queryString = new URLSearchParams(paramsToCreateProject).toString();
    navigate(`${rutasProyectos.crear}?${queryString}`);
  }

  const { handleAccept, open, message, type, showDialog, title } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  // useEffect(() => {
  //   setBuffer(proyectos);
  // }, [proyectos]);

  const { token } = useAuth().accountInformation;
  /**
   * Fetch course data using the course ID
   */
  const {
    data,
    isLoading: isLoadingFetch,
    error,
    refetch,
  } = useQuery({
    queryFn: async () => {
      return await getProjectByIdSection(token, seccion.id || -1);
    },
    queryKey: ["Get Projects To Section", seccion.id || -1, token],
  });

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  useEffect(() => {
    console.log(data)
    if (data) setProyectos(data.map(adaptProject).map(adaptProjectToCard));
  }, [data]);

  console.log(data)

  const theme = useTheme();

  // const sorters: SorterOptions = [
  //   {
  //     key: "titulo",
  //     options: { asc: "A-Z", desc: "Z-A", defaultValue: "No Aplicar" },
  //     label: "Título",
  //   },
  // ];

  const Title = () => {
    return (
      <Stack spacing={1}>
        <Typography variant="h6">{seccion.titulo}</Typography>
        <Box>
          <Typography
            display={"inline-block"}
            sx={{
              backgroundColor: theme.palette.terciary.main,
              color: "white",
              fontWeight: "500",
              padding: 1,
              borderRadius: 1,
            }}
            variant="body2"
          >{`${seccion.fechaDeInicio} - ${seccion.fechaDeCierre}`}</Typography>
        </Box>
      </Stack>
    );
  };

  const disabledButton = !evaluateDate(
    seccion.fechaDeInicio,
    seccion.fechaDeCierre,
    getCurrentDate()
  );

  return (
    <AccordionUsage title={<Title />}>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        type={type}
        textBody={message}
      />
      <SpringModal handleClose={handleCloseModal} open={openModal}>
        <>{projectSelect && <CardProjectModal project={projectSelect} callback={refetch} />}</>
      </SpringModal>

      {isLoadingFetch ? (
        <LoaderElement />
      ) : (
        <Stack spacing={3}>
          <Typography>{seccion.descripcion}</Typography>
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h5">{labelCardSeccion.proyectos}</Typography>
            <GeneralButton
              mode={buttonTypes.add}
              onClick={nav}
              disabled={disabledButton}
              size="small"
            />
          </Stack>
          {/* <SelectOrders data={proyectos} setRefineData={setBuffer} sorterOptions={sorters} /> */}
          {proyectos && proyectos.length > 0 ? (
            <>
              <Grid2 container spacing={3}>
                {proyectos.map((proyecto) => (
                  <Grid2 size={{ lg: 4, md: 6, xs: 12 }} display={"flex"} justifyContent={"center"}>
                    <ProjectCard
                      handleOpen={() => handleCard(proyecto)}
                      proyecto={proyecto}
                      key={proyecto.id}
                      callback={refetch}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </>
          ) : (
            <Alert severity="info">{"Actualmente no hay cursos vinculados a esta actividad"}</Alert>
          )}
        </Stack>
      )}
    </AccordionUsage>
  );
};

export default CardSeccion;
