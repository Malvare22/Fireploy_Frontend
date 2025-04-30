import { Box, Grid2, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import AccordionUsage from "@modules/general/components/accordionUsage";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { labelCardSeccion } from "@modules/materias/enums/labelCardSeccion";
import { Seccion } from "@modules/materias/types/seccion";
import ProjectCard from "@modules/general/components/projectCard";
import {
  SelectOrders,
  SorterOptions,
} from "@modules/general/components/selects";
import { useQuery } from "@tanstack/react-query";
import { getProjectByIdSection } from "@modules/proyectos/services/get.project";
import { useAuth } from "@modules/general/context/accountContext";
import {
  adaptProject,
  adaptProjectToCard,
} from "@modules/proyectos/utils/adapt.proyecto";
import LoaderElement from "@modules/general/components/loaderElement";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";

type CardSeccionProps = {
  seccion: Seccion;
  handleCard: (project: ProyectoCard) => void;
};

const CardSeccion: React.FC<CardSeccionProps> = ({ seccion, handleCard }) => {
  const [proyectos, setProyectos] = useState<ProyectoCard[]>([]);

  const [buffer, setBuffer] = useState<ProyectoCard[]>([]);

  const { handleAccept, open, message, type, showDialog, title } =
    useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  useEffect(() => {
    setBuffer(proyectos);
  }, [proyectos]);

  const { token } = useAuth().accountInformation;
  /**
   * Fetch course data using the course ID
   */
  const {
    data,
    isLoading: isLoadingFetch,
    error,
  } = useQuery({
    queryFn: () => getProjectByIdSection(token, seccion.id || -1),
    queryKey: ["Get Projects To Section", seccion.id || -1], // No cache key provided (consider improving this)
  });

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  useEffect(() => {
    if (data) setProyectos(data.map(adaptProject).map(adaptProjectToCard));
  }, [data]);

  const theme = useTheme();

  const sorters: SorterOptions = [
    {
      key: "titulo",
      options: { asc: "A-Z", desc: "A-Z", defaultValue: "No Aplicar" },
      label: "Título",
    },
    {
      key: "calificacion",
      options: { asc: "A-Z", desc: "A-Z", defaultValue: "No Aplicar" },
      label: "Calificación",
    },
  ];

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
              padding: 0.5,
            }}
            variant="body2"
          >{`${seccion.fechaDeInicio} - ${seccion.fechaDeCierre}`}</Typography>
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
      {isLoadingFetch ? (
        <LoaderElement />
      ) : (
        <Stack spacing={3}>
          <Typography>{seccion.descripcion}</Typography>
          <Typography variant="h5">{labelCardSeccion.proyectos}</Typography>
          <Box>
            <SelectOrders
              data={proyectos}
              setRefineData={setBuffer}
              sorterOptions={sorters}
            />
          </Box>
          <Grid2 container rowSpacing={2}>
            {buffer.map((proyecto, key) => (
              <Grid2
                size={{ lg: 4, md: 6, xs: 12 }}
                display={"flex"}
                justifyContent={"center"}
              >
                <ProjectCard
                  handleOpen={() => handleCard(proyecto)}
                  proyecto={proyecto}
                  key={key}
                />
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      )}
    </AccordionUsage>
  );
};

export default CardSeccion;
