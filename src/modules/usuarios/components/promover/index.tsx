import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import { Button, Chip, Stack, Typography, useTheme } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { AccountContext } from "@modules/general/context/accountContext";
import { SolicitudPromover } from "@modules/usuarios/types/solicitud.promover";
import { labelSolicitudes } from "@modules/usuarios/enum/labelSolicitudes";

type Props = {
  solicitudes: SolicitudPromover[];
};
const TablaSolicitudes: React.FC<Props> = ({ solicitudes }) => {
  const theme = useTheme();

  const [selectSolicitud, setSelectSolicitud] = useState<
    SolicitudPromover | undefined
  >(undefined);

  const token = useContext(AccountContext)!!.localUser?.token;

  const navigate = useNavigate();

  // function ModalChangeStatus() {
  //   if(!selectSolicitud) return <></>;
  //   return (
  //     <Stack>
  //       <Typography>
  //         `¿Está seguro de que desea ${label} al usuario $
  //         {selectUsuario?.nombres} ${selectUsuario?.apellidos}?`
  //       </Typography>
  //     </Stack>
  //   );
  // }

  const columns: TableColumn<SolicitudPromover & { rowIndex: number }>[] = [
    {
      name: labelSolicitudes.idSolicitud,
      selector: (row) => row.id,
      width: "170px",
      sortable: true,
    },
    {
      name: labelSolicitudes.nombres,
      selector: (row) => row.usuario.nombres,
      sortable: true,
    },
    {
      name: labelSolicitudes.idUsuario,
      selector: (row) => row.usuario.id,
      sortable: true,
      width: "170px",
    },
    {
      name: labelSolicitudes.fechaSolicitud,
      selector: (row) => row.usuario.fechaRecepcion,
      sortable: true,
    },
    {
      name: labelSolicitudes.aprobar,
      center: true,
      cell: (row) => {
        if (row.estado == "P") {
          return (
            <Button size="small" variant="contained">
              {labelSolicitudes.aprobar}
            </Button>
          );
        } else {
          return (
            <Stack
              sx={{
                height: "auto",
                width: 150,
                backgroundColor: theme.palette.info.main as string,
                color : 'white',
                padding: 0.4,
                borderRadius: 1,
                textAlign: 'center',
                marginY: 1
              }}
              alignContent={'center'}
            >
              <Typography variant="caption" sx={{fontWeight: 600}}>{labelSolicitudes.aprobadoPor}</Typography>
              <Typography variant="caption">{`${row.aprobadoPor || ''}`}</Typography>
            </Stack>
          );
        }
      },
      sortable: true,
      sortFunction: (rowA: SolicitudPromover, rowB: SolicitudPromover) => {
        const getDif = (x: SolicitudPromover["estado"]) => (x == "A" ? 1 : -1);

        return getDif(rowA.estado) - getDif(rowB.estado);
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
