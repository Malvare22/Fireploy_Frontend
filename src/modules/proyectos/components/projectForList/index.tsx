import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  keyframes,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { useNavigate } from "react-router";
import { rutasProyectos } from "@modules/proyectos/router";
import SettingsIcon from "@mui/icons-material/Settings";
import { ExecutionState } from "../executionState";
import { getImage } from "@modules/general/utils/getImage";
interface Props {
  proyecto: Proyecto;
}

const ProjectForList: React.FC<Props> = ({ proyecto }: Props) => {
  const myEffect = keyframes`
  from {
    opacity: 0.5;
  }
  to {
    opacity: 0.8;
  }

`;

  function TechnologyTags() {
    return (
      <Stack direction="row" alignItems="center" spacing={1} useFlexGap flexWrap="wrap">
        {proyecto.backend?.docker?.framework && (
          <Chip label={proyecto.backend?.docker?.framework} color="error" />
        )}
        {proyecto.frontend?.docker?.framework && (
          <Chip label={proyecto.frontend?.docker?.framework} color="primary" />
        )}
        {proyecto.integrado?.docker?.framework && (
          <Chip label={proyecto.integrado?.docker?.framework} color="info" />
        )}
        {!proyecto.integrado?.docker?.framework &&
          !proyecto.frontend?.docker?.framework &&
          !proyecto.backend?.docker?.framework && (
            <Alert severity="warning">
              Este proyecto actualmente no cuenta con tecnologías vinculadas
            </Alert>
          )}
      </Stack>
    );
  }

  const navigate = useNavigate();

  function handleEdit() {
    navigate(rutasProyectos.ver.replace(":id", (proyecto.id ?? "-1").toString()));
  }

  const theme = useTheme();

  return (
    <Paper
      variant="elevation"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-around',
        gap: 2,
        padding: 2,
        position: "relative",
      }}
    >
      <Box
        component={"img"}
        src={proyecto.imagen ?? getImage["not_found"].ruta}
        sx={{
          border: "rgb(0,0,0,0.2) 1px solid",
          width: "100%",
          height: "250px", // 🔧 Altura fija
          objectFit: "cover", // 🔧 Mejor apariencia con recorte
        }}
      />

      <Box
        sx={{
          position: "absolute",
          left: 25,
          top: 25,
          display: "flex",
          justifyContent: "center",
          borderRadius: 3,
          padding: 0.5,
          backgroundColor: theme.palette.background.paper,
          animation: `${myEffect} 1s infinite alternate`,
        }}
      >
        <ExecutionState projectStatus={proyecto.estadoDeEjecucion ?? "E"} />
      </Box>

      <Stack alignItems={'center'} spacing={3} >
        <Typography variant="h4">{proyecto.titulo} asdasd</Typography>
        <TechnologyTags />
      </Stack>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Divider sx={{ color: "black" }} />
        <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            endIcon={<SettingsIcon />}
            onClick={handleEdit}
          >
            Configurar
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProjectForList;
