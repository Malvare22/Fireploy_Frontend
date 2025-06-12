import { Alert, Box, Chip, Grid, Stack, Typography } from "@mui/material";
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
 * CardSeccion component – displays a collapsible section containing a list of project cards related to a course section.
 * 
 * Each section includes metadata (title, description, dates) and renders a list of projects with interactive options,
 * including opening project modals and adding new projects (if the section is active).
 * 
 * @component
 * 
 * @param {Seccion} seccion - Section object including metadata like title, dates, and ID.
 * @param {string} idMateria - ID of the related subject.
 * @param {string} idCurso - ID of the related course.
 * 
 * @returns {JSX.Element} A UI block containing an accordion with a title, description, add button, and project cards.
 * 
 * @example
 * ```tsx
 * <CardSeccion seccion={mySeccion} idMateria="12" idCurso="42" />
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
    if (data) setProyectos(data.map(adaptProject).map(adaptProjectToCard));
  }, [data]);

  const disabledButton = !evaluateDate(
    seccion.fechaDeInicio,
    seccion.fechaDeCierre,
    getCurrentDate()
  );

  const Title = () => {
    return (
      <Stack spacing={1}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 450 }}>
            {seccion.titulo}
          </Typography>
          {!disabledButton ? (
            <Chip color="success" label="Activa" />
          ) : (
            <Chip color="warning" label="Cerrada" />
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography fontWeight={450}>{`Fecha de inicio: ${seccion.fechaDeInicio}`}</Typography>
          <Typography fontWeight={450}>{`Fecha de cierre: ${seccion.fechaDeCierre}`}</Typography>
        </Box>
      </Stack>
    );
  };

  return (
    <AccordionUsage title={<Title />}>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        type={type}
        textBody={message}
      />
      <SpringModal handleClose={handleCloseModal} open={openModal} sx={{overflow: 'scroll'}}>
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
              <Grid container spacing={3}>
                {proyectos.map((proyecto) => (
                  <Grid size={{ lg: 4, md: 6, xs: 12 }} display={"flex"} justifyContent={"center"}>
                    <ProjectCard
                      handleOpen={() => handleCard(proyecto)}
                      proyecto={proyecto}
                      key={proyecto.id}
                      callback={refetch}
                    />
                  </Grid>
                ))}
              </Grid>
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
