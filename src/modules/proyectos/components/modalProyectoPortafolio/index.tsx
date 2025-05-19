import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  Grid2,
  IconButton,
  Rating,
  Stack,
  SxProps,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GitlabIcon } from "@modules/general/components/customIcons";
import { GitHub } from "@mui/icons-material";
import { UsuarioCurso } from "@modules/materias/types/curso";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { openInNewTab } from "@modules/general/utils/openTab";
import { VARIABLES_LOCAL_STORAGE } from "@modules/general/enums/variablesLocalStorage";
import { useAuth } from "@modules/general/context/accountContext";

export enum labelModalProject {
  noQualify = "Actualmente este proyecto no se encuentra calificado",
  qualify = "Calificar",
}

type Props = {
  proyecto: ProyectoCard;
};

export const ModalProyectoPortafolio: React.FC<Props> = ({ proyecto }) => {
  return (
    <>
      <CardProjectModal project={proyecto} />
    </>
  );
};

type CardProjectModalProps = {
  project: ProyectoCard;
};
export function CardProjectModal({ project }: CardProjectModalProps) {
  function getRepoButtonIcon(s: string) {
    return s.includes("gitlab") ? <GitlabIcon /> : <GitHub />;
  }

  const {id} = useAuth().accountInformation;

  const [score, setScore] = useState<number>(project.fav_usuarios.length);

   useEffect(() => {
      if (!localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES))
        localStorage.setItem(VARIABLES_LOCAL_STORAGE.SCORES, JSON.stringify([]));
      else {
        const LIKES = JSON.parse(
          localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES) ?? "[]"
        ) as number[];
        if(LIKES.includes(project.id) && !project.fav_usuarios.includes(id)){
          setScore(score + 1);
        }
      }
    }, []);

  const theme = useTheme();

  function getRepoName(s: string) {
    const _s = s.split("/");
    return _s[_s.length - 1];
  }

  const sxButtons: SxProps = {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
  };

  function handleButtonUrl(s: string | null | undefined){
    if(s)
    openInNewTab(s);
  }

  return (
    <Stack sx={{ width: { md: 700, xs: "70vw" } }} spacing={3}>
      <Typography variant="h3">{project.titulo}</Typography>
      <Grid2 container spacing={2}>
        <Grid2
          size={{ md: 6, xs: 12 }}
          sx={{ display: "flex", justifyContent: "center", border: "1px solid black" }}
        >
          <Box
            component={"img"}
            src={project.imagen}
            sx={{ objectFit: "contain", width: "100%" }}
          />
        </Grid2>
        <Grid2
          size={{ md: 6, xs: 12 }}
          sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
        >
          <Stack spacing={3}>
            <Stack>
              {project.backend && (
                <Box>
                  <Button sx={sxButtons} onClick={() => handleButtonUrl(project.backend?.url)} endIcon={getRepoButtonIcon(project.backend.url)}>
                    {getRepoName(project.backend.url)}
                  </Button>
                </Box>
              )}
              {project.frontend && (
                <Box>
                  <Button sx={sxButtons} onClick={() => handleButtonUrl(project.frontend?.url)} endIcon={getRepoButtonIcon(project.frontend.url)}>
                    {getRepoName(project.frontend.url)}
                  </Button>
                </Box>
              )}
              {project.integrado && (
                <Box>
                  <Button sx={sxButtons} onClick={() => handleButtonUrl(project.integrado?.url)} endIcon={getRepoButtonIcon(project.integrado.url)}>
                    {getRepoName(project.integrado.url)}
                  </Button>
                </Box>
              )}
            </Stack>
            <Stack direction='row' spacing={1} alignItems={'center'}>
              {project.integrado && (
                <Box>
                  <Chip
                    label={<Typography>{project.integrado.framework}</Typography>}
                    key={project.integrado.framework}
                    color="info"
                  />
                </Box>
              )}
              {project.backend && (
                <Box>
                  <Chip
                    label={<Typography>{project.backend.framework}</Typography>}
                    key={project.backend.framework}
                    color="info"
                  />
                </Box>
              )}
              {project.frontend && (
                <Box>
                  <Chip
                    label={<Typography>{project.frontend.framework}</Typography>}
                    key={project.frontend.framework}
                    color="info"
                  />
                </Box>
              )}
              {/* <Box>
                <Chip
                  label={<Typography>{project.materia}</Typography>}
                  key={project.materia}
                  color="primary"
                />
              </Box> */}
            </Stack>
            <Alert
              severity="success"
              sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 0.5 }}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <Typography variant="subtitle2">{"Proyecto disponible"}</Typography>
                <Tooltip title="Visitar sitio">
                  <IconButton onClick={() => handleButtonUrl(project.url)}>
                    <ExitToAppIcon>{"Visitar"}</ExitToAppIcon>
                  </IconButton>
                </Tooltip>
              </Stack>
            </Alert>
          </Stack>
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 size={{ md: 9, xs: 12 }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5">{"Descripción"}</Typography>
          {project.descripcion.trim().length > 0 ? <Typography sx={{ wordBreak: "break-word" }} variant="body2">
            {project.descripcion}
          </Typography>: <Alert severity="info">{"Descripción no disponible"}</Alert>}
        </Grid2>
        <Grid2
          size={{ md: 3, xs: 12 }}
          sx={{ display: "flex", justifyContent: "center", alignItems: "start" }}
        >
          <Card
            component={Stack}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ padding: 2 }}
          >
            <Rating sx={{ fontSize: 48 }} value={1} readOnly max={1} />
            <Typography variant="h4">{score}</Typography>
          </Card>
        </Grid2>
      </Grid2>
      <Typography variant="h5">{"Integrantes"}</Typography>
      <Grid2 container sx={{ paddingX: 1 }}>
        {project.integrantes.map((member) => (
          <Grid2 size={{ md: 4, xs: 6 }}>
            <MemberCard user={member} key={member.id} />
          </Grid2>
        ))}
      </Grid2>
    </Stack>
  );
}

type MemberCardProps = {
  user: UsuarioCurso;
};
function MemberCard({ user }: MemberCardProps) {
  const navigate = useNavigate();

  function handleButton() {
    navigate(rutasUsuarios.portafolio.replace(":id", user.id.toString()));
  }

  return (
    <Card>
      <CardActionArea onClick={handleButton}>
        <Stack sx={{ padding: 2 }} spacing={2} alignItems={"center"}>
          <Tooltip title={user.nombre}>
            <Avatar src={user.imagen} />
          </Tooltip>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {user.nombre}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export default ModalProyectoPortafolio;
