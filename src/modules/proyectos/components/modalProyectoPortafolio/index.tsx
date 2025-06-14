import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  SxProps,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { GitlabIcon } from "@modules/general/components/customIcons";
import { GitHub } from "@mui/icons-material";
import { UsuarioCurso } from "@modules/materias/types/curso";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/routes";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { openInNewTab } from "@modules/general/utils/openTab";
import { useAuth } from "@modules/general/context/accountContext";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useQuery } from "@tanstack/react-query";
import { getPublicProjectById } from "@modules/proyectos/services/get.project";
import StarButton from "../starButton";
import ProjectTags from "@modules/general/components/projectTags";
import { rutasGeneral } from "@modules/general/router/routes";

export enum labelModalProject {
  noQualify = "Actualmente este proyecto no se encuentra calificado",
  qualify = "Calificar",
}

type CardProjectModalProps = {
  project: ProyectoCard;
  callback: () => Promise<unknown>;
};

/**
 * CardProjectModal component – displays detailed information about a selected project,
 * including image, description, team members, and repository links. Supports starring functionality.
 *
 * Designed for use in a modal or detailed project view.
 *
 * @component
 *
 * @param project - Project object containing information such as title, description,
 * repositories (frontend, backend, integrado), image, URL, and members.
 * @param callback - Async callback function to refresh parent or trigger updates after starring.
 *
 * @returns A JSX layout displaying the selected project's data and links, styled with MUI components.
 */
export function CardProjectModal({ project, callback }: CardProjectModalProps) {
  function getRepoButtonIcon(s: string) {
    return s.includes("gitlab") ? <GitlabIcon /> : <GitHub />;
  }
  const { id } = useAuth().accountInformation;

  const currentProjectId = project.id;

  const { refetch, data } = useQuery({
    queryFn: async () => {
      return (await getPublicProjectById(currentProjectId)).fav_usuarios.map(
        (user) => user.id
      );
    },
    queryKey: ["Get Project by Id", currentProjectId],
  });

  const theme = useTheme();

  const currentCheck = useMemo(() => {
    if (data) {
      return data.includes(id);
    } else return false;
  }, [data]);

  const currentCount = useMemo(() => {
    if (data) {
      return data.length;
    } else return 0;
  }, [data]);

  function getRepoName(s: string) {
    const _s = s.split("/");
    return _s[_s.length - 1];
  }

  const sxButtons: SxProps = {
    color: "white",
    backgroundColor: theme.palette.secondary.main,
  };

  function handleButtonUrl(s: string | null | undefined) {
    if (s) openInNewTab(s);
  }

  const updateCallback = async () => {
    await callback();
    await refetch();
  };

  return (
    <Stack sx={{ width: { md: 900, xs: 300, sm: 600 } }} spacing={3}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography variant="h3">{project.titulo}</Typography>
        <StarButton
          callback={updateCallback}
          check={currentCheck}
          count={currentCount}
          projectId={currentProjectId}
          sx={{ fontSize: 48 }}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid
          size={{ md: 6, xs: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            border: "1px solid rgb(0,0,0,0.2)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          {project.imagen ? (
            <Box
              component={"img"}
              src={project.imagen}
              sx={{
                objectFit: "contain",
                width: "100%",
                height: { md: 180, xs: 120 },
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: { md: 180, xs: 120 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <RocketLaunchIcon sx={{ fontSize: 96, color: "white" }} />
            </Box>
          )}
        </Grid>
        <Grid
          size={{ md: 6, xs: 12 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
              }}
            >
              {project.backend && (
                <Box>
                  <Button
                    sx={sxButtons}
                    onClick={() => handleButtonUrl(project.backend?.url)}
                    endIcon={getRepoButtonIcon(project.backend.url)}
                  >
                    {getRepoName(project.backend.url)}
                  </Button>
                </Box>
              )}
              {project.frontend && (
                <Box>
                  <Button
                    sx={sxButtons}
                    onClick={() => handleButtonUrl(project.frontend?.url)}
                    endIcon={getRepoButtonIcon(project.frontend.url)}
                  >
                    {getRepoName(project.frontend.url)}
                  </Button>
                </Box>
              )}
              {project.integrado && (
                <Box>
                  <Button
                    sx={sxButtons}
                    onClick={() => handleButtonUrl(project.integrado?.url)}
                    endIcon={getRepoButtonIcon(project.integrado.url)}
                  >
                    {getRepoName(project.integrado.url)}
                  </Button>
                </Box>
              )}
            </Box>
            <ProjectTags proyecto={project} />
          </Stack>
        </Grid>
      </Grid>
      {project.estado == "N" && (
        <Alert
          severity="success"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Typography>{"Proyecto disponible"}</Typography>
            <Tooltip title="Visitar sitio">
              <IconButton onClick={() => handleButtonUrl(project.url)}>
                <ExitToAppIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid
          size={12}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h5">{"Descripción"}</Typography>
          {project.descripcion.trim().length > 0 ? (
            <Typography sx={{ wordBreak: "break-word" }} variant="body2">
              {project.descripcion}
            </Typography>
          ) : (
            <Alert severity="info">{"Descripción no disponible"}</Alert>
          )}
        </Grid>
      </Grid>
      <Typography variant="h5">{"Integrantes"}</Typography>
      <Grid container sx={{ paddingX: 1, display: "flex" }}>
        {project.integrantes.map((member) => (
          <Grid
            size={{ md: 2, xs: 4 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <MemberCard user={member} key={member.id} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

type MemberCardProps = {
  user: UsuarioCurso;
};

/**
 * MemberCard component – renders a visual card for a project member, displaying their avatar and name.
 * Navigates to the user's portfolio page on click.
 *
 * @component
 *
 * @param user - Object containing user information including name, ID, and avatar image URL.
 *
 * @returns A clickable avatar and name component redirecting to the member's portfolio.
 */
function MemberCard({ user }: MemberCardProps) {
  const navigate = useNavigate();

  const { id } = useAuth().accountInformation;

  function handleButton() {
    if (id == -1) {
      navigate(
        rutasGeneral.portafolioPorUsuario.replace(":id", user.id.toString())
      );
      navigate(0);
    } else {
      navigate(rutasUsuarios.portafolio.replace(":id", user.id.toString()));
      navigate(0);
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Tooltip title={user.nombre} onClick={handleButton}>
        <Avatar
          src={user.imagen}
          sx={{ width: 64, height: 64, cursor: "pointer" }}
        />
      </Tooltip>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        {user.nombre}
      </Typography>
    </Box>
  );
}

export default CardProjectModal;
