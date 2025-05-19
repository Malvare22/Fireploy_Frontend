import {
  Accordion,
  Alert,
  Box,
  Divider,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { LogFile } from "@modules/proyectos/types/logFile";
import { useQuery } from "@tanstack/react-query";
import { getRepositoryById } from "@modules/proyectos/services/get.repository";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import { useAuth } from "@modules/general/context/accountContext";
import { adaptLog } from "@modules/proyectos/utils/adaptLog";
import { getRepositoryTypesMap } from "@modules/proyectos/utils/repository";
import { TipoRepositorio } from "@modules/proyectos/types/proyecto.tipo";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { usePagination } from "@modules/general/hooks/usePagination";

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
  const { data, error } = useQuery({
    queryFn: async () => {
      let response: LogFile[] = [];
      if (backend) {
        const repo = await getRepositoryById(token, backend);
        if (repo.logs) {
          repo.logs.forEach((x) => {
            response.push(
              adaptLog(
                x,
                getRepositoryTypesMap.get(repo.tipo as TipoRepositorio) as KeysOfRepository
              )
            );
          });
        }
      }
      if (frontend) {
        const repo = await getRepositoryById(token, frontend);
        if (repo.logs) {
          repo.logs.forEach((x) => {
            response.push(
              adaptLog(
                x,
                getRepositoryTypesMap.get(repo.tipo as TipoRepositorio) as KeysOfRepository
              )
            );
          });
        }
      }
      if (integrado) {
        const repo = await getRepositoryById(token, integrado);
        if (repo.logs) {
          repo.logs.forEach((x) => {
            response.push(
              adaptLog(
                x,
                getRepositoryTypesMap.get(repo.tipo as TipoRepositorio) as KeysOfRepository
              )
            );
          });
        }
      }
      return response;
    },
    queryKey: ["A", token],
  });

  const { showDialog } = useAlertDialogContext();

  const { setError } = useErrorReader(showDialog);

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
      {data && data.length > 0 ? (
        <Container logsFiles={data} />
      ) : (
        <Alert severity="info">{"No dispones de registros .log actualmente"}</Alert>
      )}
    </Box>
  );
}

type ContainerProps = { logsFiles: LogFile[] };
const Container = ({ logsFiles }: ContainerProps) => {
  const { goToPage, hasNextPage, hasPrevPage, totalPages, paginatedData } = usePagination(
    logsFiles,
    5,
    1
  );

  return (
    <>
      <Stack>
        {paginatedData.map((log, index) => (
          <CardLog key={index} currentLog={log} />
        ))}
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
            <Box sx={{ display: "flex" }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {labelLogs.instancia}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {currentLog.instancia}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography variant="body2">{labelLogs.fecha}</Typography>
              <Typography variant="body2">{currentLog.fecha}</Typography>
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
