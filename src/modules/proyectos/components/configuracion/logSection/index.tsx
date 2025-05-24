import {
  Accordion,
  Alert,
  Box,
  capitalize,
  Divider,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LogFile } from "@modules/proyectos/types/logFile";
import { useQuery } from "@tanstack/react-query";
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

export enum labelLogs {
  titulo = "Logs & Mensajes",
  parrafo = "Los Logs corresponden a mensajes sobre eventos ocurridos en tús instancias. Brindan una visión sobre las actividades de los sistemas de tu aplicativo.",
  fecha = "Fecha:",
  verDetalles = "Ver detalles",
  descargar = "Descargar",
  instancia = "Instancia:",
}

type LogsFilesProps = Record<KeysOfRepository, number | undefined>;
function LogsFiles({ backend, frontend, integrado }: LogsFilesProps) {
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
            {"No dispones de registros .log para este repositorios actualmente"}
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

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
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

export default LogsFiles;
