/**
 * @file TablaSolicitudes.tsx
 * @description This component renders a data table showing a list of promotion requests (`solicitudes`)
 * using `react-data-table-component`. It allows admins to approve or reject user promotion requests.
 * Includes visual indicators and dialogs for confirmation, success, and error feedback.
 */

import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialog from "@modules/general/components/alertDialog";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation } from "@tanstack/react-query";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { useCustomTableStyles } from "@modules/general/styles";
import { paginationComponentOptions } from "@modules/general/utils/pagination";
import { NotificationMessage } from "@modules/usuarios/types/notification";
import { patchNotificationCheck } from "@modules/usuarios/services/patch.notificaciones";
import { labelNotificaciones } from "@modules/usuarios/enum/labelNotificaciones";
import { adaptDateBackend, sortDates } from "@modules/general/utils/fechas";

type Props = {
  notificaciones: NotificationMessage[];
  refetch: Function;
};

const TablaNotificaciones: React.FC<Props> = ({ notificaciones, refetch }) => {
  const { accountInformation } = useAuth();

  const { token } = accountInformation;

  const { showDialog, open, title, message, handleCancel, type, handleAccept, isLoading } =
    useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  function handleCheck(notification: NotificationMessage) {
    mutateCheck([notification]);
  }

  const { mutate: mutateCheck, isPending } = useMutation({
    mutationFn: async (notifications: NotificationMessage[]) => {
      const updates = notifications
        .filter((n) => !n.visto)
        .map((n) => patchNotificationCheck(n.id, token));

      await Promise.all(updates);
    },
    mutationKey: ["changeUser"],
    onError: (error) => setError(error),
    onSuccess: () => {
      refetch();
    },
  });

  const [selectedData, setSelectedData] = useState<NotificationMessage[]>([]);

  function handleButtonCheckSelects() {
    mutateCheck(selectedData);
  }

  /**
   * Column definitions for the data table.
   */
  const columns: TableColumn<NotificationMessage & { rowIndex: number }>[] = [
    {
      name: <Typography>{labelNotificaciones.titulo}</Typography>,
      cell: (row) => <Typography sx={{ fontWeight: 450 }}>{row.titulo}</Typography>,
      sortable: true,
      sortFunction: (a, b) => {
        return a.titulo.localeCompare(b.titulo);
      },
    },
    {
      name: <Typography>{labelNotificaciones.fecha}</Typography>,
      cell: (row) => <Typography>{adaptDateBackend(row.fecha_creacion)}</Typography>,
      sortable: true,
      sortFunction: (a, b) => sortDates(a.fecha_creacion, b.fecha_creacion),
      width: "150px",
    },
    {
      name: <Typography>{labelNotificaciones.mensaje}</Typography>,
      cell: (row) => (
        <Typography paddingY={2} variant="body2">
          {row.mensaje}
        </Typography>
      ),
      width: "400px",
    },
    {
      name: (
        <Typography sx={{ width: "100%", textAlign: "center" }}>
          {labelNotificaciones.leido}
        </Typography>
      ),
      cell: (row) => {
        if (row.visto) {
          return (
            <Typography sx={{ width: "100%", textAlign: "center" }}>
              <CheckCircleIcon color="info" fontSize="large" />
            </Typography>
          );
        } else {
          return (
            <Stack sx={{ alignItems: "center", width: "100%" }}>
              <Button
                onClick={() => handleCheck(row)}
                loading={isPending && selectedData.includes(row)}
              >
                {labelNotificaciones.marcarLeido}
              </Button>
            </Stack>
          );
        }
      },
      sortable: true,
      sortFunction: (a, b) => {
        const f = (x: NotificationMessage & { rowIndex: number }) => {
          return x.visto ? 1 : 0;
        };

        return f(a) - f(b);
      },
      wrap: true,
    },
  ];

  const { customStyles } = useCustomTableStyles();

  const dataConIndice = useMemo(
    () =>
      notificaciones.map((notification, index) => ({
        ...notification,
        rowIndex: index,
      })),
    [notificaciones]
  );

  const theme = useTheme();

  const conditionalRowStyles: ConditionalStyles<NotificationMessage & { rowIndex: number }>[] = [
    {
      when: (row) => row.visto,
      style: {
        backgroundColor: theme.palette.action.hover,
      },
    },
  ];

  const handleSelect = (selected: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: NotificationMessage[];
  }) => {
    setSelectedData(selected.selectedRows);
  };

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
      <Stack alignItems={"end"}>
        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={handleButtonCheckSelects}
            disabled={selectedData.length == 0}
            loading={isPending}
          >
            Marcar como vistas
          </Button>
        </Box>
      </Stack>

      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        pagination
        selectableRows
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 50]}
        paginationComponentOptions={paginationComponentOptions}
        onSelectedRowsChange={handleSelect}
      />
    </>
  );
};

export default TablaNotificaciones;
