/**
 * @file TablaSolicitudes.tsx
 * @description This component renders a data table showing a list of promotion requests (`solicitudes`)
 * using `react-data-table-component`. It allows admins to approve or reject user promotion requests.
 * Includes visual indicators and dialogs for confirmation, success, and error feedback.
 */

import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Button, Stack, Typography, useTheme } from "@mui/material";
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

  const [currentId, setCurrentId] = useState<null | number>(null);

  function handleCheck(id: number) {
    setCurrentId(id);
    mutateCheck(id);
  }

  const { mutate: mutateCheck, isPending } = useMutation({
    mutationFn: (idNotification: number) => patchNotificationCheck(idNotification, token),
    mutationKey: ["changeUser"],
    onError: (error) => setError(error),
    onSuccess: () => {
      refetch();
    },
  });

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
                onClick={() => handleCheck(row.id)}
                loading={isPending && currentId === row.id}
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

export default TablaNotificaciones;
