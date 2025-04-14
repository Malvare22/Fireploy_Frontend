import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import {  Button, Chip, Typography } from "@mui/material";
import React, { useMemo } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { BaseDeDatos } from "@modules/proyectos/types/baseDeDatos";
import { labelBaseDeDatos } from "@modules/proyectos/enum/labelBaseDeDatos";
import { getDataBaseTypeColor, getDataBaseTypesMap } from "@modules/proyectos/utils/database";
import StorageIcon from "@mui/icons-material/Storage";
import { useCustomTableStyles } from "@modules/general/styles";
import { openInNewTab } from "@modules/general/utils/openTab";

type TablaBasesDeDatosProps = {
  basesDeDatos: BaseDeDatos[];
};
const TablaBasesDeDatos: React.FC<TablaBasesDeDatosProps> = ({ basesDeDatos }) => {
  const columns: TableColumn<BaseDeDatos & { rowIndex: number }>[] = [
    {
      name: labelBaseDeDatos.id,
      selector: (row) => row.id ?? 0,
      sortable: true,
    },
    {
      name: labelBaseDeDatos.proyecto,
      selector: (row) => row.proyecto?.titulo ?? "",
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
      center: true,
      name: labelBaseDeDatos.gestionar,
      cell: (row) => (
        <>
          {row.url ? (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              endIcon={<StorageIcon />}
              onClick={() => {
                if (row.url) openInNewTab(row.url);
              }}
            >
              {labelBaseDeDatos.gestionar}
            </Button>
          ) : (
            <Chip color="info" sx={{color: 'white'}} icon={<InfoIcon/>} label={<Typography variant="caption">No disponible</Typography>}/>
          )}
        </>
      ),
    },
  ];

  const { conditionalRowStyles, customStyles } = useCustomTableStyles();

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
