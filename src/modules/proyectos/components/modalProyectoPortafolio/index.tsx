import { labelModalProyectoPortafolio } from "@modules/proyectos/enum/labelModalProyectoPortafolio";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid2,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@modules/general/context/accountContext";
import { postStarProject, postUnStarProject } from "@modules/proyectos/services/post.calificar";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { VARIABLES_LOCAL_STORAGE } from "@modules/general/enums/variablesLocalStorage";
import StarButton from "../starButton";
import { getImage } from "@modules/general/utils/getImage";
import {
  exampleProjectsModal,
  ProjectModal,
  Proyecto,
} from "@modules/proyectos/types/proyecto.tipo";
import { GitlabIcon } from "@modules/general/components/customIcons";
import { GitHub, Star } from "@mui/icons-material";
import { UsuarioCurso } from "@modules/materias/types/curso";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { adaptToProjectModal } from "@modules/proyectos/utils/adapt.proyecto";

export enum labelModalProject {
  noQualify = "Actualmente este proyecto no se encuentra calificado",
  qualify = "Calificar",
}

type Props = {
  proyecto: ProyectoCard;
};

/**
 * ModalProyectoPortafolio component – This component displays detailed information about a project in a modal format.
 * It includes the project's title, technologies, description, team members, and the project's current status.
 * Additionally, users can favorite or unfavorite the project and view the project's image.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {ProyectoCard} props.proyecto - The project data to display in the modal.
 *
 * @returns {JSX.Element} The modal displaying project details with a favorite button and status indicator.
 *
 * @example
 * ```tsx
 * <ModalProyectoPortafolio proyecto={projectData} />
 * ```
 */
export const ModalProyectoPortafolio: React.FC<Props> = ({ proyecto }) => {
  const theme = useTheme();

  const { id, token } = useAuth().accountInformation;

  const [localValue, setLocalValue] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES))
      localStorage.setItem(VARIABLES_LOCAL_STORAGE.SCORES, JSON.stringify([]));
    else {
      const LIKES = JSON.parse(
        localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES) ?? "[]"
      ) as number[];
      setLocalValue(LIKES.includes(proyecto.id) || proyecto.fav_usuarios.includes(id));
    }
  }, []);

  const { handleAccept, showDialog, open, title, type, message } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (localValue) {
        return await postUnStarProject(proyecto.id, token);
      } else {
        return await postStarProject(proyecto.id, token);
      }
    },
    onSuccess: () => {
      const LIKES = JSON.parse(
        localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES) ?? "[]"
      ) as number[];
      const nValue = localValue
        ? LIKES.filter((_proyectoId) => _proyectoId != proyecto.id)
        : [...LIKES, proyecto.id];
      localStorage.setItem(VARIABLES_LOCAL_STORAGE.SCORES, JSON.stringify(nValue));
      setLocalValue(!localValue);
    },
    onError: (err) => setError(err),
  });

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
      <CardProjectModal project={adaptToProjectModal(proyecto)}/>
    </>
  );
};


type CardProjectModalProps = {
  project: ProjectModal;
};
export function CardProjectModal({ project }: CardProjectModalProps) {
  function getRepoButtonIcon(s: string) {
    return s.includes("gitlab") ? <GitlabIcon /> : <GitHub />;
  }

  function getRepoName(s: string) {
    const _s = s.split("/");
    return _s[_s.length - 1];
  }

  return (
    <Card>
      <Stack spacing={3}>
        <Typography variant="h3">{project.title}</Typography>
        <Grid2 container>
          <Grid2 size={{ md: 5, xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
            <Box component={"img"} src={project.img} />
          </Grid2>
          <Grid2 size={{ md: 7, xs: 12 }}>
            <Stack>
              {project.repositories.map((repo) => (
                <Button endIcon={getRepoButtonIcon(repo)}>{getRepoName(repo)}</Button>
              ))}
            </Stack>
            <Stack>
              {project.technologies.map((tec) => (
                <Chip label={tec} key={tec} color="secondary" />
              ))}
            </Stack>
          </Grid2>
        </Grid2>
        <Grid2 container>
          <Grid2 size={{ md: 8, xs: 12 }} sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Typography variant="h4">{"Descripción"}</Typography>
            <Typography sx={{ wordBreak: "break-word" }}>{project.description}</Typography>
          </Grid2>
          <Grid2 size={{ md: 4, xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
            <Stack sx={{ maxWidth: 300 }} alignItems={"center"} spacing={1}>
              <Star sx={{ fontSize: 48 }} />
              <Typography variant="h4">{project.rating}</Typography>
            </Stack>
          </Grid2>
        </Grid2>
        <Typography variant="h4">{"Integrantes"}</Typography>
        <Grid2 container sx={{ paddingX: 1 }}>
          {project.members.map((member) => (
            <Grid2 size={{ md: 4, xs: 6 }}>
              <MemberCard user={member} key={member.id} />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </Card>
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
      <Stack sx={{ padding: 2 }} spacing={2} alignItems={"center"}>
        <Tooltip title={user.nombre}>
          <Button onClick={handleButton}>
            <Avatar src={user.imagen} />
          </Button>
        </Tooltip>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {user.nombre}
        </Typography>
      </Stack>
    </Card>
  );
}

export default ModalProyectoPortafolio;
