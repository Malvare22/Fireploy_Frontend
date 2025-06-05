import {
  Accordion,
  Alert,
  Box,
  Button,
  capitalize,
  Divider,
  IconButton,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LogFile } from "@modules/proyectos/types/logFile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRepositoryById } from "@modules/proyectos/services/get.repository";
import { getKeyOfRepository, KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import { useAuth } from "@modules/general/context/accountContext";
import { adaptLog } from "@modules/proyectos/utils/adaptLog";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { usePagination } from "@modules/general/hooks/usePagination";
import { getFormatDayTime } from "@modules/general/utils/fechas";
import DrawIcon from "@mui/icons-material/Draw";
import { postGenerateLog } from "@modules/proyectos/services/post.logs";
import { useExecutionStatusContext } from "@modules/proyectos/context/executionStatus.context";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadString } from "@modules/general/utils/string";
import LoaderElement from "@modules/general/components/loaderElement";
import SpringModal from "@modules/general/components/springModal";
import { useModal } from "@modules/general/components/modal/hooks/useModal";

export enum labelLogs {
  titulo = "Logs & Mensajes",
  parrafo = "Los Logs corresponden a mensajes sobre eventos ocurridos en tús instancias. Brindan una visión sobre las actividades de los sistemas de tu aplicativo.",
  fecha = "Fecha:",
  verDetalles = "Ver detalles",
  descargar = "Descargar",
  instancia = "Instancia:",
}

/**
 * LogsFiles component – displays categorized log files from various project repositories
 * (backend, frontend, and integrated), allowing users to view and paginate through logs.
 *
 * This component fetches logs based on the provided project repository IDs and organizes them
 * into tabs. Each log entry is rendered in a collapsible accordion format. It also allows
 * triggering the log file generation process.
 *
 * @component
 *
 * @param backend A number representing the repository ID for the backend, or undefined if not available.
 * @param frontend A number representing the repository ID for the frontend, or undefined if not available.
 * @param integrado A number representing the repository ID for the integrated repository, or undefined if not available.
 * @param projectId A number representing the ID of the current project, used to request new log files.
 *
 * @returns A container displaying logs grouped by repository type, with tab navigation and pagination.
 */
type LogsFilesProps = Record<KeysOfRepository, number | undefined> & { projectId: number };
function LogsFiles({ backend, frontend, integrado, projectId }: LogsFilesProps) {
  const { token } = useAuth().accountInformation;

  const [tabIndex, setTabIndex] = useState(0);

  const [logsByField, setLogsByField] = useState<Map<KeysOfRepository, LogFile[]>>();

  const { data, error } = useQuery({
    queryFn: async () => {
      let response = new Map<KeysOfRepository, LogFile[]>();

      const setLogOfRepo = async (id: number | undefined) => {
        if (id) {
          const repo = await getRepositoryById(token, id);
          const key = getKeyOfRepository(repo.tipo);
          const tmp: LogFile[] = [];
          if (repo.logs) {
            repo.logs.forEach((x) => tmp.push(adaptLog(x, key)));
          }
          response.set(key, tmp);
        }
      };

      await setLogOfRepo(backend);
      await setLogOfRepo(frontend);
      await setLogOfRepo(integrado);

      return response;
    },
    queryKey: ["A", token],
  });

  useEffect(() => {
    if (data) {
      setLogsByField(data);
      if (logsByField?.get("backend")) setTabIndex(1);
    }
  }, [data]);

  const { showDialog } = useAlertDialogContext();

  const { setError } = useErrorReader(showDialog);

  const theme = useTheme();

  const matchesMedia = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h6">{labelLogs.titulo}</Typography>
        <Divider />
      </Box>
      <Box>
        <Typography variant="body1">{labelLogs.parrafo}</Typography>
      </Box>
      <GenerateLogs id={projectId} />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {backend && frontend && (
          <Tabs
            value={tabIndex}
            onChange={(_e, newIndex) => setTabIndex(newIndex)}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiButtonBase-root": {
                paddingY: 0,
              },
            }}
            variant="scrollable"
            scrollButtons={matchesMedia}
            allowScrollButtonsMobile
          >
            <Tab label="Backend" value={1} />
            <Tab label="Frontend" value={2} />
          </Tabs>
        )}
        {tabIndex == 0 && <Container logsFiles={logsByField?.get("integrado")} />}
        {tabIndex == 1 && <Container logsFiles={logsByField?.get("backend")} />}
        {tabIndex == 2 && <Container logsFiles={logsByField?.get("frontend")} />}
      </Box>
    </Box>
  );
}

/**
 * Container component – displays a paginated list of log file entries.
 *
 * It handles sorting by date, shows a message if there are no logs,
 * and manages pagination controls.
 *
 * @component
 *
 * @param logsFiles An array of log file objects to display, or undefined if no logs are available.
 *
 * @returns A list of log entries wrapped in accordion components with pagination.
 */
type ContainerProps = { logsFiles: LogFile[] | undefined };
const Container = ({ logsFiles }: ContainerProps) => {
  const currentLogs = logsFiles || [];

  function sortLogs(a: LogFile, b: LogFile) {
    const dateA = new Date(a.fecha).getTime();
    const dateB = new Date(b.fecha).getTime();
    return dateB - dateA;
  }

  const { goToPage, hasNextPage, hasPrevPage, totalPages, paginatedData } = usePagination(
    currentLogs.sort(sortLogs),
    10,
    1
  );

  return (
    <>
      <Stack>
        {logsFiles == undefined || logsFiles.length == 0 ? (
          <Alert severity="info">
            {"No dispones de registros log para este repositorios actualmente"}
          </Alert>
        ) : (
          <>
            {paginatedData.map((log, index) => (
              <CardLog key={index} currentLog={log} />
            ))}
          </>
        )}
      </Stack>
      <Box
        sx={{
          marginY: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Pagination
          count={totalPages}
          hideNextButton={!hasNextPage}
          hidePrevButton={!hasPrevPage}
          onChange={(_e, v) => goToPage(v)}
        />
      </Box>
    </>
  );
};

const CardLog: React.FC<{
  currentLog: LogFile;
}> = ({ currentLog }) => {
  const theme = useTheme();

  function handleDownloadLog() {
    downloadString(`${currentLog.instancia} ${currentLog.fecha}`, currentLog.log);
  }

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Stack direction={"column"} spacing={2}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {labelLogs.instancia}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {capitalize(currentLog.instancia)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="body2">{labelLogs.fecha}</Typography>
                <Typography variant="body2">{getFormatDayTime(currentLog.fecha)}</Typography>
              </Box>
            </Stack>
            <IconButton onClick={handleDownloadLog}>
              <Tooltip title="Descargar log">
                <DownloadIcon fontSize="medium" />
              </Tooltip>
            </IconButton>
          </Stack>
        </AccordionSummary>
        <AccordionDetails
          sx={{ paddingX: 2, color: "white", backgroundColor: theme.palette.secondary.main }}
        >
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {currentLog.log}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

/**
 * GenerateLogs component – provides a button to manually trigger the generation of new log files.
 *
 * It sends a POST request to the server using the project ID and handles loading, success, and error states.
 *
 * @component
 *
 * @param id A number representing the ID of the project for which logs should be generated.
 *
 * @returns A button that, when clicked, triggers log file generation and displays feedback to the user.
 */
function GenerateLogs({ id }: { id: number }) {
  const token = useAuth().accountInformation.token;

  const { showDialog, handleClose } = useAlertDialogContext();

  const { setError } = useErrorReader(showDialog);

  const { executionState } = useExecutionStatusContext();

  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  const { mutate: generateLogs, isPending } = useMutation({
    mutationFn: async () => {
      handleOpenModal();
      await postGenerateLog(token, id);
    },
    onSuccess: () => {
      handleCloseModal();
      showDialog({
        message: "Se han generado nuevos archivos logs de manera correcta",
        onAccept: handleClose,
        type: "success",
        title: "Registro de Archivos Logs",
        reload: true,
      });
    },
    onError: (err) => {
      handleCloseModal();
      setError(err);
    },
  });

  async function handleButton() {
    await generateLogs();
  }

  function LoadView() {
    return (
      <SpringModal handleClose={handleClose} sx={{ overflowY: "hidden" }} open={openModal}>
        <Stack alignItems={"center"} spacing={2}>
          <LoaderElement />
          <Typography variant="h5" fontWeight={"500px"}>
            {"Generando archivos de registro..."}
          </Typography>
        </Stack>
      </SpringModal>
    );
  }

  return (
    <>
      <LoadView />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Button
          variant="contained"
          loading={isPending}
          disabled={executionState != "N"}
          endIcon={<DrawIcon />}
          onClick={handleButton}
        >
          {"Registrar Nuevos Logs"}
        </Button>
        {executionState != "N" && (
          <Tooltip
            title={"Esta acción requiere que el proyecto se encuentre en ejecución"}
            placement="top"
            enterTouchDelay={0}
          >
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </>
  );
}

export default LogsFiles;
