import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import {
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, {
  useContext,
  useMemo,
  useState,
} from "react";
import { SolicitudPromover } from "@modules/usuarios/types/solicitud.promover";
import { labelSolicitudes } from "@modules/usuarios/enum/labelSolicitudes";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialog from "@modules/general/components/alertDialog";
import InfoIcon from "@mui/icons-material/Info";
import useQuery from "@modules/general/hooks/useQuery";
import { patchSolicitud } from "@modules/usuarios/services/patch.solicitud";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuth } from "@modules/general/context/accountContext";

type Props = {
  solicitudes: SolicitudPromover[];
};
const TablaSolicitudes: React.FC<Props> = ({ solicitudes }) => {
  const theme = useTheme();

  const [selectSolicitud, setSelectSolicitud] = useState<
    SolicitudPromover | undefined
  >(undefined);

  const {
    open: openAlertDialogConfirmation,
    setOpen: setOpenAlertDialongConfirmation,
  } = useAlertDialog();
  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  
  const [estadoSolicitud, setEstadoSolicitud] = useState<"A" | "R">("R");
 
  const { message, handleAlertClose, initQuery, open } = useQuery(
    () => patchSolicitud(selectSolicitud?.id!!, estadoSolicitud, idAdmin, token),
    true,
    `Solicitud ${estadoSolicitud == "A" ? "aprobada" : "rechazada"} correctamente`
  );


  const bodyQuery = useMemo(
    () => (
      <Typography>{`Está seguro de que desea ${estadoSolicitud == "A" ? "aprobar" : "rechazar"} la solicitud de código: ${selectSolicitud?.id} del estudiante: ${selectSolicitud?.usuario.nombres}`}</Typography>
    ),
    [selectSolicitud, estadoSolicitud]
  );

  const columns: TableColumn<SolicitudPromover & { rowIndex: number }>[] = [
    {
      name: <Typography>{labelSolicitudes.idSolicitud}</Typography>,
      selector: (row) => row.id,
      width: "170px",
      sortable: true,
    },
    {
      name: <Typography>{labelSolicitudes.nombres}</Typography>,
      selector: (row) => row.usuario.nombres,
      sortable: true,
    },
    {
      name: <Typography>{labelSolicitudes.idUsuario}</Typography>,
      selector: (row) => row.usuario.id,
      sortable: true,
      width: "170px",
    },
    {
      name: <Typography>{labelSolicitudes.fechaSolicitud}</Typography>,
      selector: (row) => row.usuario.fechaRecepcion,
      sortable: true,
      wrap: true,
    },
    {
      name: <Typography>{labelSolicitudes.fechaAceptacion}</Typography>,
      cell: (row) => {
        if (row.usuario.fechaAceptacion) {
          return row.usuario.fechaAceptacion;
        } else {
          return (
            <Chip
              color="info"
              label={labelSolicitudes.pediente}
              icon={<InfoIcon />}
            />
          );
        }
      },
      sortable: true,
    },
    {
      name: <Typography>{labelSolicitudes.estado}</Typography>,
      center: true,
      cell: (row) => {
        if (row.estado == "P") {
          return (
            <Stack
              direction={"row"}
              justifyContent={"center"}
              textAlign={"center"}
              alignItems={"center"}
              sx={{
                height: "auto",
                backgroundColor: theme.palette.warning.main,
                color: "white",
                width: 120,
                padding: 0.4,
                borderRadius: 2,
                marginY: 1,
              }}
            >
              <InfoIcon />
              <Typography variant="caption">
                {labelSolicitudes.pedianteDeAprobacion}
              </Typography>
            </Stack>
          );
        } else if (row.estado == "A") {
          return (
            <Stack
              sx={{
                height: "auto",
                width: 150,
                backgroundColor: theme.palette.info.main as string,
                color: "white",
                padding: 0.4,
                borderRadius: 2,
                textAlign: "center",
                marginY: 1,
              }}
              alignContent={"center"}
            >
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {labelSolicitudes.aprobadoPor}
              </Typography>
              <Typography variant="caption">{`${row.aprobadoPor || ""}`}</Typography>
            </Stack>
          );
        } else {
          return (
            <Chip
              color="error"
              label={labelSolicitudes.rechazada}
              icon={<InfoIcon />}
            />
          );
        }
      },
      sortable: true,
      sortFunction: (rowA: SolicitudPromover, rowB: SolicitudPromover) => {
        const getDif = (x: SolicitudPromover["estado"]) => (x == "A" ? 1 : -1);

        return getDif(rowA.estado) - getDif(rowB.estado);
      },
    },
    {
      name: <Typography>{labelSolicitudes.acciones}</Typography>,
      center: true,
      cell: (row) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
          null
        );
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };

        function handleBtn(estado: "R" | "A") {
          setEstadoSolicitud(estado);
          setSelectSolicitud(row);
          setOpenAlertDialongConfirmation(true);
          handleClose();
        }

        return (
          <>
            <IconButton onClick={handleClick} disabled={row.estado != 'P'}>
              <MoreVertIcon />
            </IconButton>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleBtn("A")}>
                <CheckCircleIcon color="success" />
              </MenuItem>
              <MenuItem onClick={() => handleBtn("R")}>
                <CancelIcon color="error" />
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  const customStyles: TableStyles = {
    headCells: {
      style: {
        backgroundColor: theme.palette.background.paper, // override the row height
        color: theme.palette.text.primary,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        fontFamily: theme.typography.body1.fontFamily,
      },
    },
    rows: {
      style: {
        color: theme.palette.text.primary,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        fontFamily: theme.typography.body1.fontFamily,
        backgroundColor: theme.palette.background.default,
      },
    },
  };

  const conditionalRowStyles: ConditionalStyles<
    SolicitudPromover & { rowIndex: number }
  >[] = [
    {
      when: (row) => row.rowIndex % 2 !== 0, // Filas impares
      style: {
        color: theme.palette.text.primary,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        fontFamily: theme.typography.body1.fontFamily,
        backgroundColor: theme.palette.background.paper,
      },
    },
  ];

  const dataConIndice = useMemo(
    () =>
      solicitudes.map((solicitud, index) => ({
        ...solicitud,
        rowIndex: index,
      })),
    [solicitudes]
  );

  return (
    <>
      <AlertDialog
        title="Modificar Solicitud"
        open={openAlertDialogConfirmation}
        handleAccept={initQuery}
        handleCancel={() => setOpenAlertDialongConfirmation(false)}
        body={bodyQuery}
      />
      <AlertDialog
        title="Modificar Solicitud"
        open={open}
        handleAccept={handleAlertClose}
        textBody={message}
      />
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      ></DataTable>
    </>
  );
};

export default TablaSolicitudes;
