import {
  Alert,
  Box,
  Button,
  Divider,
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
import ProjectTags from "../projectTags";

type ProjectCardProps = {
  proyecto: ProyectoCard;

  handleOpen: () => void;

  callback: () => Promise<unknown>;
};
/**
 * ProjectCard component – a UI card for displaying summarized information
 * about a project, including title, image, tags, description, team members,
 * and interaction options.
 * 
 * It visually represents the project using a Material-UI Paper and Stack layout,
 * conditionally showing an image or a placeholder, and offering buttons to open
 * the project, see more details, or favorite it.
 * 
 * @component
 * 
 * @param {Object} proyecto - An object representing the project data, including title,
 * image, URL, description, state, favorite users, and team members.
 * 
 * @param {Function} handleOpen - A function that triggers a UI action (like a modal or redirect)
 * to show more details about the project.
 * 
 * @param {Function} callback - An asynchronous function called when the favorite button is clicked,
 * used to update or refresh project-related data.
 * 
 * @returns {Visual element} A card component displaying project information and interaction controls.
 * 
 * @example
 * ```tsx
 * <ProjectCard
 *   proyecto={someProject}
 *   handleOpen={() => setModalOpen(true)}
 *   callback={updateFavorites}
 * />
 * ```
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ proyecto, handleOpen, callback }) => {
  const theme = useTheme();

  const { id } = useAuth().accountInformation;

  const disableUrl =
    !proyecto.url || proyecto.url?.trim().length == 0 || proyecto.estado != "N";

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
        <Box
          sx={{
            position: "relative",
            width: "inherit",
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: 1,
            overflow: "hidden",
            "&:hover .hover-content": {
              transform: "translateY(0%)",
              opacity: 1,
            },
          }}
        >
          {proyecto.imagen ? (
            <>
              <Box
                component="img"
                src={proyecto.imagen}
                sx={{
                  width: "100%",
                  height: 180,
                  borderRadius: 1,
                  objectFit: "contain",
                }}
              />
              <ContentImage />
            </>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <RocketLaunchIcon sx={{ fontSize: 96, color: "white" }} />
              <ContentImage />
            </Box>
          )}

          {/* Hover content */}
          <Box
            className="hover-content"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              transform: "translateY(20%)",
              opacity: 0,
              transition: "transform 0.5s ease, opacity 0.5s ease",
              paddingBottom: 2,
            }}
          >
            {!disableUrl ? (
              <Button
                variant="contained"
                endIcon={<OpenInNewIcon />}
                onClick={handleUrl}
                color="info"
              >
                Visitar
              </Button>
            ) : (
              <Button variant="contained" color="error">
                Sitio no disponible
              </Button>
            )}
          </Box>
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
          <ProjectTags proyecto={proyecto} />
        </Box>

        <Box sx={{ marginBottom: 1, width: "100%" }}>
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
            <Alert severity="info">
              <Typography variant="body2">
                {"Descripción no disponible"}
              </Typography>
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
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <ProjectCardMembers integrantes={proyecto.integrantes} />
          {currentValues && (
            <StarButton
              callback={callback}
              check={currentValues.check}
              count={currentValues.count}
              projectId={proyecto.id}
              sx={{fontSize: 42}}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProjectCard;
