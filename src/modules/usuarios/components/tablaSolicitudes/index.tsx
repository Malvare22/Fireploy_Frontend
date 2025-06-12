/**
 * @file TablaSolicitudes.tsx
 * @description This component renders a data table showing a list of promotion requests (`solicitudes`)
 * using `react-data-table-component`. It allows admins to approve or reject user promotion requests.
 * Includes visual indicators and dialogs for confirmation, success, and error feedback.
 */
import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Chip, IconButton, Menu, MenuItem, Stack, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Solicitud } from "@modules/usuarios/types/solicitud.promover";
import { labelSolicitudes } from "@modules/usuarios/enum/labelSolicitudes";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialog from "@modules/general/components/alertDialog";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation } from "@tanstack/react-query";
import { patchSolicitudService } from "@modules/usuarios/services/patch.solicitud";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { useCustomTableStyles } from "@modules/general/hooks/useCustomTableStyles";
import { paginationComponentOptions } from "@modules/general/utils/pagination";

/**
 * @typedef Props
 * @property {Solicitud[]} solicitudes - Array of promotion request objects.
 */
type Props = {
  solicitudes: Solicitud[];
  tipo: 1 | 2;
};

/**
 * TablaSolicitudes component – displays a table of user promotion requests with actions to approve or reject them.
 *
 * This component allows administrators to view promotion requests, approve or reject them,
 * and displays status indicators and contextual information. It uses the `react-data-table-component`
 * to render a table with interactive actions and status chips.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Solicitud[]} props.solicitudes - Array of promotion requests to display in the table.
 * @param {1 | 2} props.tipo - Type of request that affects the columns shown (e.g., course information).
 * @returns {JSX.Element} A data table component with rows for each request, actions to approve/reject, and status updates.
 *
 * @example
 * ```tsx
 * <TablaSolicitudes solicitudes={requests} tipo={1} />
 * ```
 */
const TablaSolicitudes: React.FC<Props> = ({ solicitudes, tipo }) => {
  const theme = useTheme();

  const [selectSolicitud, setSelectSolicitud] = useState<Solicitud | undefined>(undefined);

  const { accountInformation } = useAuth();
  const { token, id } = accountInformation;

  const [estadoSolicitud, setEstadoSolicitud] = useState<"A" | "R">("R");

  const {
    showDialog,
    open,
    title,
    message,
    handleCancel,
    handleClose,
    type,
    handleAccept,
    isLoading,
  } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  /**
   * Handles the mutation to update the status of a request (approve/reject).
   */
  const { isPending, mutate } = useMutation({
    mutationFn: () => patchSolicitudService(selectSolicitud?.id ?? -1, estadoSolicitud, id, token),
    onError: (error) => setError(error),
    onSuccess: () => {
      showDialog({
        title: "Modificación de Rol de Usuario",
        message:
          "Se ha establecido el estado correspondiente a la solicitud de modificación de rol usuario",
        onAccept: () => {},
        reload: true,
        type: "success",
      });
    },
  });

  /**
   * Column definitions for the data table.
   */
  const columns: TableColumn<Solicitud & { rowIndex: number }>[] = [
    // Each column defines a data field with label and optional formatting
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
      cell: (row) =>
        row.usuario.fechaAceptacion ? (
          row.usuario.fechaAceptacion
        ) : (
          <Chip color="info" label={labelSolicitudes.pediente} icon={<InfoIcon />} />
        ),
      sortable: true,
    },
    ...(tipo == 2
      ? [
          {
            name: <Typography>{labelSolicitudes.curso}</Typography>,
            cell: (row: any) => <Chip color="info" label={row.curso || ""} icon={<InfoIcon />} />,
            sortable: true,
          },
        ]
      : []),
    {
      name: <Typography>{labelSolicitudes.estado}</Typography>,
      center: true,
      cell: (row) => {
        // Visual state indicators for request status
        if (row.estado == "P") {
          return (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
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
              <Typography variant="caption">{labelSolicitudes.pedianteDeAprobacion}</Typography>
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
            >
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {labelSolicitudes.aprobadoPor}
              </Typography>
              <Typography variant="caption">{row.aprobadoPor || ""}</Typography>
            </Stack>
          );
        } else {
          return <Chip color="error" label={labelSolicitudes.rechazada} icon={<InfoIcon />} />;
        }
      },
      sortable: true,
      sortFunction: (rowA, rowB) => {
        const getDif = (x: Solicitud["estado"]) => (x == "A" ? 1 : -1);
        return getDif(rowA.estado) - getDif(rowB.estado);
      },
    },
    {
      name: <Typography>{labelSolicitudes.acciones}</Typography>,
      center: true,
      cell: (row) => {
        // Dropdown menu with actions to approve/reject
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => setAnchorEl(null);

        const handleBtn = (estado: "R" | "A") => {
          setEstadoSolicitud(estado);
          setSelectSolicitud(row);
          showConfirmation();
          handleClose();
        };

        return (
          <>
            <IconButton onClick={handleClick} disabled={row.estado !== "P"}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
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

  const { conditionalRowStyles, customStyles } = useCustomTableStyles();

  /**
   * Adds an index to each row for use in conditional styling.
   */
  const dataConIndice = useMemo(
    () =>
      solicitudes.map((solicitud, index) => ({
        ...solicitud,
        rowIndex: index,
      })),
    [solicitudes]
  );

  /**
   * Triggers the mutation to patch request status.
   */
  function handlePatch() {
    mutate();
  }

  function showConfirmation() {
    showDialog({
      title: "Modificación de Solicitudes",
      message: `¿Está seguro de ${estadoSolicitud !== "A" ? "aprobadar" : "rechazadar"} esta solicitud?`,
      isLoading: isPending,
      onAccept: handlePatch,
      onCancel: handleClose,
      type: "default",
    });
  }

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={open}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoading}
      />
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        pagination
        paginationPerPage={20}
        paginationRowsPerPageOptions={[20, 50, 100]}
        paginationComponentOptions={paginationComponentOptions}
      />
    </>
  );
};

export default TablaSolicitudes;
