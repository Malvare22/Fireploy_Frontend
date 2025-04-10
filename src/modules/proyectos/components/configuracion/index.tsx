import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Paper,
  Button,
  Grid2,
  Stack,
  Divider,
  Select,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { UsuarioPortafolioCard, usuarioPrueba } from "@modules/usuarios/types/usuario.portafolio";
import { ProjectCardAvatar } from "@modules/general/components/projectCardAvatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogsFiles from "../logsFiles";
import Editor, { OnMount, useMonaco } from "@monaco-editor/react";
import { EstadoEjecucionProyecto } from "@modules/proyectos/types/proyecto.tipo";
import StopIcon from "@mui/icons-material/Stop";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  getColorExecutionState,
  getExecutionState,
} from "@modules/proyectos/utils/getExecutionState";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import * as monaco from "monaco-editor";

export default function ProjectSettings() {
  const [tabIndex, setTabIndex] = useState(5);

  return (
    <Grid2 container>
      <Grid2 size={12} marginBottom={2}>
        <Stack direction={"row"} spacing={1}>
          <Typography variant="h4">TITULO DE PRUEBA</Typography>
          <IconButton>
            <OpenInNewIcon />
          </IconButton>
        </Stack>
      </Grid2>
      <Grid2 size={12}>
        <Container component={Paper} sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {labelConfiguracion.configuracion}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            {labelConfiguracion.configuracionParrafo}
          </Typography>

          <Tabs
            value={tabIndex}
            onChange={(_e, newIndex) => setTabIndex(newIndex)}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Información" />
            <Tab label="Repositorios" />
            <Tab label="Bases de Datos" />
            <Tab label="Colaboradores" />
            <Tab label="Archivos Logs" />
            <Tab label="Variables de Entorno" />
          </Tabs>

          <Stack spacing={3} padding={2}>
            {tabIndex == 0 && <Information />}
            {tabIndex == 1 && <Repositories />}
            {tabIndex == 2 && <DataBase />}
            {tabIndex == 3 && (
              <>
                <Members />
              </>
            )}
            {tabIndex == 4 && (
              <>
                <LogsFiles />
              </>
            )}
            {tabIndex == 5 && (
              <>
                <EnviromentVariables />
              </>
            )}
          </Stack>
        </Container>
      </Grid2>
      {/* <Grid2 size={2}>
        <Status status={"E"} />
      </Grid2> */}
    </Grid2>
  );
}

export const Information = () => {
  return (
    <Stack spacing={3}>
      <Stack>
        <Typography variant="h5">{labelConfiguracion.informacion}</Typography>
        <Divider />
      </Stack>
      <Typography variant="body1">{labelConfiguracion.informacionParrafo}</Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <TextField fullWidth label={labelConfiguracion.nombre} value={""} />
        </Grid2>
        <TextField fullWidth label={labelConfiguracion.descripcion} value={""} multiline rows={6} />
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <Select fullWidth label={labelConfiguracion.materia} value={""} />
        </Grid2>
        <Grid2 size={4}>
          <Select fullWidth label={labelConfiguracion.grupo} value={""} />
        </Grid2>
        <Grid2 size={4}>
          <Select fullWidth label={labelConfiguracion.seccion} value={""} />
        </Grid2>
      </Grid2>
    </Stack>
  );
};

type RepositoriesProps = {
  type: "M" | "X";
};
export function Repositories({ type }: RepositoriesProps) {
  function Content() {
    if (type)
      return (
        <>
          <Grid2 container spacing={2}>
            <Typography variant="h6">{labelConfiguracion.frontend}</Typography>
          </Grid2>
          <TextField
            fullWidth
            label={labelConfiguracion.urlFrontend}
            value={""}
            sx={{ width: "50%" }}
          />
          <Divider />
          <Typography variant="h6">{labelConfiguracion.backend}</Typography>
          <TextField
            fullWidth
            label={labelConfiguracion.urlBackend}
            value={""}
            sx={{ width: "50%" }}
          />
        </>
      );
    else {
      return (
        <>
          <TextField
            fullWidth
            label={labelConfiguracion.urlFrontend}
            value={""}
            sx={{ width: "50%" }}
          />
        </>
      );
    }
  }
  return (
    <Stack spacing={3}>
      <Stack>
        <Typography variant="h5">{labelConfiguracion.repositorios}</Typography>
        <Divider />
      </Stack>
      <Typography variant="body2">{labelConfiguracion.repositoriosParrafo}</Typography>
      <Content />
    </Stack>
  );
}

export const DataBase = () => {
  return (
    <Stack spacing={3}>
      <Stack>
        <Typography variant="h5">{labelConfiguracion.baseDeDatos}</Typography>
        <Divider />
      </Stack>
      <Stack>
        <Typography variant="body1">{labelConfiguracion.baseDeDatosParrafo}</Typography>
      </Stack>
      <TextField
        fullWidth
        label={labelConfiguracion.tipoBaseDatos}
        value={""}
        sx={{ width: "50%" }}
      />
      <Box>
        <Button variant="contained">{labelConfiguracion.gestionarBaseDatos}</Button>
      </Box>
    </Stack>
  );
};

export const Members = () => {
  const theme = useTheme();

  return (
    <Stack spacing={0}>
      <Stack>
        <Stack marginBottom={2} direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5">{labelConfiguracion.colaboradores}</Typography>
          <Button variant="contained" size="small">
            {labelConfiguracion.invitarIntegrantes}
          </Button>
        </Stack>
        <Typography variant="body1" marginBottom={3}>
          {labelConfiguracion.colaboradoresParrafo}
        </Typography>
        <Divider />
      </Stack>
      <Divider />
      <Box sx={{ padding: 2, backgroundColor: theme.palette.action.hover }}>
        <TextField placeholder={labelConfiguracion.filtrarColaboradores} />
      </Box>
      <Divider />
      <Typography padding={2}>{labelConfiguracion.cuenta}</Typography>
      <Divider />
      <CardMember member={usuarioPrueba} />
      <Divider />
    </Stack>
  );
};

export const EnviromentVariables = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
  };

  function getEditorValue() {
    const value = editorRef.current?.getValue(); // Added optional chaining for safety
    console.log("Contenido del editor:", value);
  }

  return (
    <Stack spacing={3}>
      <Stack>
        <Stack marginBottom={2} direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h6">{labelConfiguracion.variablesDeEntorno}</Typography>
          <Divider />
        </Stack>
        <Typography variant="body1" marginBottom={3}>
          {labelConfiguracion.variablesDeEntornoParrafo}
        </Typography>
        <Divider />
      </Stack>
      <Divider />
      <div>
        <div
          style={{
            backgroundColor: "#1e1e1e",
            color: "white",
            padding: "8px 12px",
            fontFamily: "monospace",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          {"Archivo .env"}
        </div>

        <div style={{ height: "500px" }}>
          <Editor
            defaultLanguage="ini"
            defaultValue="// tu código aquí"
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{ fontSize: 14 }}
            onChange={() => getEditorValue()}
          />
        </div>
      </div>
    </Stack>
  );
};

type CardMemberProps = {
  member: UsuarioPortafolioCard;
};
const CardMember: React.FC<CardMemberProps> = ({ member }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      spacing={1}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={2}
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <ProjectCardAvatar usuario={member} sx={{ width: 48, height: 48 }} />
        <Typography variant="h6">{member.nombres}</Typography>
        <Typography
          padding={1}
          variant="subtitle2"
          sx={{
            backgroundColor: theme.palette.success.main,
            color: theme.palette.primary.main,
            borderRadius: 2,
          }}
        >
          {labelConfiguracion.eresTu}
        </Typography>
      </Stack>
      <Stack>
        <Tooltip title={labelConfiguracion.opciones} placement="top">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

type StatusProps = {
  status: EstadoEjecucionProyecto;
};

const Status: React.FC<StatusProps> = ({ status }) => {
  const colorState = getColorExecutionState(status) as string;

  const label = getExecutionState[status] as string;

  const theme = useTheme();

  return (
    <Stack spacing={2} component={Paper} sx={{ padding: 2 }}>
      <Typography variant="h6" textAlign={"center"}>
        {labelConfiguracion.estadoActual}
      </Typography>
      <Box display={"inline-flex"} justifyContent={"center"}>
        <Stack
          sx={{
            backgroundColor: theme.palette.terciary.main,
            borderRadius: 1,
            color: "white",
          }}
          direction={"row"}
          spacing={1}
          padding={1}
        >
          <Stack direction={"row"} spacing={1} justifyContent={"center"}>
            <Typography variant="body1">{label}</Typography>
            <Box
              sx={{
                width: 24,
                height: 24,
                backgroundColor: colorState,
                borderRadius: "100%",
              }}
            ></Box>
          </Stack>
        </Stack>
      </Box>
      <Grid2 container rowSpacing={1}>
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button size="small" variant="contained" endIcon={<StopIcon sx={{ fontSize: 32 }} />}>
            {labelConfiguracion.detener}
          </Button>
        </Grid2>
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            variant="contained"
            endIcon={<PlayCircleIcon sx={{ fontSize: 32 }} />}
          >
            {labelConfiguracion.reanudar}
          </Button>
        </Grid2>
        <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            variant="contained"
            endIcon={<RocketLaunchIcon sx={{ fontSize: 32 }} />}
          >
            {labelConfiguracion.desplegar}
          </Button>
        </Grid2>
      </Grid2>
    </Stack>
  );
};
