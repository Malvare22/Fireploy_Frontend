import { LabelLogs } from "@modules/proyectos/enum/labelLogs";
import {
  Box,
  Divider,
  IconButton,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { generateLog } from "@modules/proyectos/utils/generateLog";
import { capitalizeFirstLetter } from "@modules/general/utils/capitalCase";
import { archivosLogsPrueba } from "@modules/proyectos/test/datos/archivosLog.prueba";
import { ArchivoLog } from "@modules/proyectos/types/archivoLog.tipo";

function ArchivosLogs() {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h3Bold">{LabelLogs.titulo}</Typography>
        <Divider />
      </Box>
      <Box>
        <Typography variant="body">{LabelLogs.parrafo}</Typography>
      </Box>
      <Container />
    </Box>
  );
}

const Container = () => {
  const [page, setPage] = useState(1);

  const archivosLogs = archivosLogsPrueba;

  const totalPages = useMemo(() => {
    return Math.ceil(archivosLogs.length / 3.0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentLogs = useMemo(() => {
    const left = (page - 1) * 3;

    return archivosLogs.slice(left, left + 3);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Box
      sx={{
        border: "1px rgb(0,0,0,.2) solid",
        minHeight: 400,
        backgroundColor: "backgroundX.panel",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {getCurrentLogs.map((log, index) => (
          <CardLog key={index} currentLog={log} />
        ))}
      </Box>
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
          onChange={(_e, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
};

const CardLog: React.FC<{
  currentLog: ArchivoLog;
}> = ({ currentLog }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null); // Ref para el contenido animado

  return (
    <>
      <Box sx={{ paddingY: 2, paddingX: 4 }}>
        <Box
          sx={{
            display: { sm: "flex" },
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
          <Box sx={{ display: "flex", marginBottom: 1 }}>
              <Typography variant="titleBold">{LabelLogs.instancia}</Typography>
              <Typography variant="title" marginLeft={1}>
                {capitalizeFirstLetter(currentLog.instancia)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", marginBottom: 1 }}>
              <Typography variant="titleBold">{LabelLogs.fecha}</Typography>
              <Typography variant="title" marginLeft={1}>
                {currentLog.fecha}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body">{currentLog.mensaje}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: 'center' }}>
            <Tooltip title={LabelLogs.verDetalles} placement="top">
              <IconButton onClick={() => setOpen(!open)}>
                <ExpandCircleDownIcon
                  sx={{
                    fontSize: 32,
                    transform: open ? "rotate(180deg)" : "",
                    transition: "transform 0.3s ease",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title={LabelLogs.descargar}>
              <IconButton onClick={() => generateLog(currentLog)}>
                <FileDownloadIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box
          sx={{
            overflow: "hidden",
            height: open
              ? `${
                  contentRef.current?.scrollHeight
                    ? contentRef.current?.scrollHeight + 40
                    : 0
                }px`
              : "0px", // Calcula la altura
            transition: "height 0.4s ease",
            backgroundColor: "white",
            border: open ? "2px rgb(0,0,0,.1) solid" : "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            ref={contentRef}
            sx={{
              padding: open ? 2 : 0, // El padding se aplica al contenido interno
              transition: "padding 0.4s ease", // Transición suave para el padding
            }}
          >
            <Typography variant="body">{currentLog.detalles}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default ArchivosLogs;