import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import React, { useMemo } from "react";
import { ProjectCardMembers } from "../projectCardAvatar";
import { useAuth } from "@modules/general/context/accountContext";
import StarButton from "@modules/proyectos/components/starButton";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { ExecutionState } from "@modules/proyectos/components/executionState";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { openInNewTab } from "@modules/general/utils/openTab";

type ProjectCardProps = {
  proyecto: ProyectoCard;

  handleOpen: () => void;

  callback: () => Promise<unknown>;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ proyecto, handleOpen, callback }) => {
  const theme = useTheme();

  const { id } = useAuth().accountInformation;

  const disableUrl = !proyecto.url || proyecto.url?.trim().length == 0 || proyecto.estado != "N";

  function handleUrl() {
    if (proyecto.url) openInNewTab(proyecto.url);
  }

  const currentValues = useMemo(() => {
    if (proyecto) {
      const count = proyecto.fav_usuarios.length;
      const check = proyecto.fav_usuarios.includes(id);
      return { count, check };
    } else return null;
  }, [proyecto]);

  function ContentImage() {
    return (
      <>
        <Box
          sx={{
            position: "absolute",
            top: 4,
            left: 4,
            backgroundColor: theme.palette.background.paper,
            opacity: 0.8,
            borderRadius: 3,
            padding: 0.5,
          }}
        >
          <ExecutionState projectStatus={proyecto.estado} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            backgroundColor: theme.palette.background.paper,
            opacity: 0.8,
            borderRadius: 3,
            padding: 0.5,
          }}
        >
          <IconButton onClick={handleUrl} disabled={disableUrl}>
            <OpenInNewIcon />
          </IconButton>
        </Box>
      </>
    );
  }

  return (
    <Stack
      sx={{ padding: 1, width: "100%", height: "100%" }}
      justifyContent={"space-between"}
      component={Paper}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "inherit",
          gap: 1,
        }}
      >
        <Box sx={{ position: "relative", width: "inherit" }}>
          {proyecto.imagen ? (
            <Box
              component={"img"}
              src={proyecto.imagen}
              sx={{ width: "100%", height: 180, borderRadius: 1, objectFit: "cover" }}
            >
              <ContentImage />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: 180,
                display: "flex",
                alignItems: "center",
                borderRadius: 1,
                justifyContent: "center",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <RocketLaunchIcon sx={{ fontSize: 96, color: "white" }} />
              <ContentImage />
            </Box>
          )}
        </Box>
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "visible",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            wordBreak: "break-all",
          }}
          variant="h5"
        >
          {proyecto.titulo}
        </Typography>

        <Box sx={{ marginBottom: 1 }}>
          {proyecto.descripcion.length > 0 ? (
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                wordBreak: "break-all",
                width: "100%",
              }}
              variant="body2"
            >
              {proyecto.descripcion}
            </Typography>
          ) : (
            <Alert severity="info" sx={{ width: "100%" }}>
              <Typography variant="body2">{"Descripción no disponible"}</Typography>
            </Alert>
          )}
        </Box>
      </Box>
      <Stack spacing={1}>
        <Stack alignItems={"end"}>
          <Box>
            <Button size={"small"} onClick={handleOpen}>
              {"Ver más"}
            </Button>
          </Box>
        </Stack>
        <Divider />
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <ProjectCardMembers integrantes={proyecto.integrantes} />
          {id != -1 && currentValues && (
            <StarButton
              callback={callback}
              check={currentValues.check}
              count={currentValues.count}
              projectId={proyecto.id}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProjectCard;
