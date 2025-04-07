/**
 * @file TablaSolicitudes.tsx
 * @description This component renders a data table showing a list of promotion requests (`solicitudes`)
 * using `react-data-table-component`. It allows admins to approve or reject user promotion requests.
 * Includes visual indicators and dialogs for confirmation, success, and error feedback.
 */

import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import { Chip, IconButton, Menu, MenuItem, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { SolicitudPromover } from "@modules/usuarios/types/solicitud.promover";
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
import AlertDialogError from "@modules/general/components/alertDialogError";

/**
 * @typedef Props
 * @property {SolicitudPromover[]} solicitudes - Array of promotion request objects.
 */
type Props = {
  solicitudes: SolicitudPromover[];
};

/**
 * @component TablaSolicitudes
 * @description Renders a table of user promotion requests with actions to approve or reject them.
 *
 * @param {Props} props - The component props.
 * @returns {JSX.Element} A table component with interactive approval and rejection features.
 */
const TablaSolicitudes: React.FC<Props> = ({ solicitudes }) => {
  const theme = useTheme();

  const [selectSolicitud, setSelectSolicitud] = useState<SolicitudPromover | undefined>(undefined);

  const { accountInformation } = useAuth();
  const { token, id } = accountInformation;

  const [estadoSolicitud, setEstadoSolicitud] = useState<"A" | "R">("R");

  /**
   * Handles the mutation to update the status of a request (approve/reject).
   */
  const { isSuccess, isError, isPending, error, mutate } = useMutation({
    mutationFn: () => patchSolicitudService(selectSolicitud?.id ?? -1, estadoSolicitud, id, token),
    mutationKey: ["changeUser"],
  });

  /**
   * Column definitions for the data table.
   */
  const columns: TableColumn<SolicitudPromover & { rowIndex: number }>[] = [
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
        const getDif = (x: SolicitudPromover["estado"]) => (x == "A" ? 1 : -1);
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
          handleOpenConfirmation();
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

  /**
   * Custom styling for the data table.
   */
  const customStyles: TableStyles = {
    headCells: {
      style: {
        backgroundColor: theme.palette.background.paper,
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

  /**
   * Styles for conditionally alternating row backgrounds.
   */
  const conditionalRowStyles: ConditionalStyles<SolicitudPromover & { rowIndex: number }>[] = [
    {
      when: (row) => row.rowIndex % 2 !== 0,
      style: {
        backgroundColor: theme.palette.background.paper,
      },
    },
  ];

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

  // Alert dialog handlers
  const {
    handleClose: handleCloseConfirmation,
    handleOpen: handleOpenConfirmation,
    open: openConfirmation,
  } = useAlertDialog();

  const {
    handleOpen: handleOpenError,
    handleClose: handleCloseError,
    open: openError,
  } = useAlertDialog();

  const {
    handleOpen: handleOpenSuccess,
    handleClose: handleCloseSuccess,
    open: openSuccess,
  } = useAlertDialog();

  useEffect(() => {
    if (!isPending) handleCloseConfirmation();
  }, [isPending]);

  useEffect(() => {
    if (error && isError) handleOpenError();
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) handleOpenSuccess();
  }, [isSuccess]);

  return (
    <>
      <AlertDialog
        title="Solicitud Modificada"
        open={openConfirmation}
        handleAccept={handlePatch}
        handleCancel={handleCloseConfirmation}
        textBody={`¿Está seguro de ${estadoSolicitud !== "A" ? "aprobadar" : "rechazadar"} esta solicitud?`}
      />
      <AlertDialog
        title="Modificación de solicitudes"
        open={openSuccess}
        handleAccept={handleCloseSuccess}
        textBody={`Solicitud ${estadoSolicitud === "A" ? "aprobada" : "rechazada"} correctamente`}
      />
      {error && (
        <AlertDialogError
          title="Modificación de solicitudes"
          open={openError}
          error={error}
          handleClose={handleCloseError}
        />
      )}
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      />
    </>
  );
};

export default TablaSolicitudes;
