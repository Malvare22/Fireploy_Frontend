import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import { Button, Chip, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { BaseDeDatos } from "@modules/proyectos/types/baseDeDatos";
import { labelBaseDeDatos } from "@modules/proyectos/enum/labelBaseDeDatos";
import {
  getDataBaseTypeColor,
  getDataBaseTypesMap,
} from "@modules/proyectos/utils/database";
import StorageIcon from "@mui/icons-material/Storage";

type TablaBasesDeDatosProps = {
  basesDeDatos: BaseDeDatos[];
};
const TablaBasesDeDatos: React.FC<TablaBasesDeDatosProps> = ({
  basesDeDatos,
}) => {
  const theme = useTheme();

  const columns: TableColumn<BaseDeDatos & { rowIndex: number }>[] = [
    {
      name: labelBaseDeDatos.id,
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: labelBaseDeDatos.proyecto,
      selector: (row) => row.proyecto,
      sortable: true,
    },
    {
      name: labelBaseDeDatos.tipo,
      cell: (row) => {
        if (row.tipo == "E") {
          return (
            <Chip
              sx={{
                backgroundColor: getDataBaseTypeColor().get(row.tipo),
                color: "white",
              }}
              label={getDataBaseTypesMap.get(row.tipo)}
              icon={<InfoIcon sx={{ fill: "white" }} />}
            />
          );
        } else {
          return (
            <Chip
              sx={{
                backgroundColor: getDataBaseTypeColor().get(row.tipo),
                color: "white",
              }}
              label={getDataBaseTypesMap.get(row.tipo)}
            />
          );
        }
      },
      sortable: true,
      sortFunction: (rowA: BaseDeDatos, rowB: BaseDeDatos) => {
        const getVal = (rowX: BaseDeDatos) => {
          if (rowX.tipo == "S") return 1;
          else if (rowX.tipo == "E") return 0;
          else return -1;
        };

        return getVal(rowA) - getVal(rowB);
      },
    },
    {
      name: labelBaseDeDatos.gestionar,
      cell: (_row) => (
        <Button variant="contained" color="secondary" size="small" endIcon={<StorageIcon />}>
          {labelBaseDeDatos.gestionar}
        </Button>
      ),
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
    // table: {
    //   style: {
    //     border: "1px solid red",
    //      borderRadius: '20px'
    //   },
    // },
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
    BaseDeDatos & { rowIndex: number }
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
      basesDeDatos.map((BasesDeDatos, index) => ({
        ...BasesDeDatos,
        rowIndex: index,
      })),
    [basesDeDatos]
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

export default TablaBasesDeDatos;
