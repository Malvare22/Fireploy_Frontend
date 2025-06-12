import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Rating,
  Stack,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { useNavigate } from "react-router";
import { rutasProyectos } from "@modules/proyectos/router";
import SettingsIcon from "@mui/icons-material/Settings";
import { ChipExecutionState } from "../executionState";
import { TechnologyTags } from "../showTags";
import { getDataBaseTypesMap } from "@modules/proyectos/utils/database";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DisabledVisibleIcon from "@mui/icons-material/DisabledVisible";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {
  proyecto: Proyecto;
}

/**
 * ProjectForList component – renders a summarized card view of a project, displaying key information
 * such as title, visibility, execution status, technology stack, favorite count, and configuration access.
 *
 * Designed to be used in lists or dashboards for quick project overviews.
 *
 * @component
 *
 * @param proyecto - Object representing the project data, including ID, title, image,
 * execution state, visibility status, technology information, and favorite users.
 *
 * @returns A Paper component layout with two-column content: image and project details,
 * including configurable access through a button.
 */
const ProjectForList: React.FC<Props> = ({ proyecto }: Props) => {
  /**
   * EmptyImage – fallback visual element rendered when the project has no image.
   *
   * @returns A box containing a RocketLaunch icon centered in a themed background.
   */
  function EmptyImage() {
    return (
      <>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: { xs: 0, md: 10 },
            borderTopRightRadius: { xs: 10, md: 0 },
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <RocketLaunchIcon sx={{ fontSize: 96, color: "white" }} />
        </Box>
      </>
    );
  }

  const navigate = useNavigate();

  /**
   * Score – component that displays the number of users who marked the project as favorite.
   *
   * @returns A Card with a rating icon and the favorite count.
   */
  function Score() {
    return (
      <Card>
        <Stack direction={"row"} alignItems="center">
          <Rating max={1} value={1} sx={{ fontSize: 32 }} />
          <Typography variant="h5">{proyecto.fav_usuarios.length}</Typography>
        </Stack>
      </Card>
    );
  }

  function handleEdit() {
    navigate(rutasProyectos.ver.replace(":id", (proyecto.id ?? "-1").toString()));
  }

  /**
   * Visibilitity – shows the visibility status of the project (Visible or Not Visible),
   * styled according to the theme and status.
   *
   * @returns A styled Box with an icon and visibility label.
   */
  function Visibilitity() {
    const styles: SxProps = {
      backgroundColor: theme.palette.info.main,
      display: "flex",
      alignItems: "center",
      gap: 1,
      paddingX: 2,
      paddingY: 0.5,
      color: "white",
      borderRadius: 1,
    };

    if (proyecto.estadoDeProyecto && proyecto.estadoDeProyecto == "A")
      return (
        <Box sx={styles}>
          <Typography>{"Visible"}</Typography>
          <VisibilityIcon fontSize="medium" />
        </Box>
      );
    return (
      <Box sx={styles}>
        <Typography>{"Visible"}</Typography>
        <DisabledVisibleIcon fontSize="medium" />
      </Box>
    );
  }

  const theme = useTheme();

  return (
    <Paper variant="elevation">
      <Grid container sx={{ height: "100%" }}>
        <Grid size={{ md: 5, xs: 12 }}>
          {proyecto.imagen ? (
            <Box
              component={"img"}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: { xs: 0, md: 10 },
                borderTopRightRadius: { xs: 10, md: 0 },
              }}
              src={proyecto.imagen}
            />
          ) : (
            <EmptyImage />
          )}
        </Grid>
        <Grid size={{ md: 7, xs: 12 }}>
          <Stack sx={{ padding: 3 }} spacing={3}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Typography variant="h4" sx={{ fontWeight: 450 }}>
                {proyecto.titulo}
              </Typography>
              <Score />
            </Stack>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <ChipExecutionState projectStatus={proyecto.estadoDeEjecucion ?? "E"} />
              <Box>
                <Visibilitity />
              </Box>
            </Stack>
            <TechnologyTags
              backend={proyecto.backend?.informacion?.framework ?? undefined}
              frontend={proyecto.frontend?.informacion?.framework ?? undefined}
              integrado={proyecto.integrado?.informacion?.framework ?? undefined}
              dataBase={getDataBaseTypesMap.get(proyecto.baseDeDatos?.tipo ?? "E")}
            />
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEdit}
                endIcon={<SettingsIcon />}
              >
                {"Configurar"}
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProjectForList;
