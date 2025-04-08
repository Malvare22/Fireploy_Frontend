import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import { Avatar, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";

import Status from "@modules/general/components/status";
import { EstudianteCurso } from "@modules/materias/utils/forms/form.schema";
import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";

type TablaEstudiantesEditarCursoProps = {
  estudiante: EstudianteCurso[];
  setSelectUsers: React.Dispatch<number[]>;
};
const TablaEstudiantesEditarCurso: React.FC<
  TablaEstudiantesEditarCursoProps
> = ({ estudiante, setSelectUsers }) => {
  const theme = useTheme();

  const columns: TableColumn<EstudianteCurso & { rowIndex: number }>[] = [
    {
      name: <Typography>{labelUsuario.id}</Typography>,
      cell: (row) => <Typography>{row.id}</Typography>,
      width: "70px",
      sortable: true,
    },
    {
      name: <Typography>{labelUsuario.fotoPerfil}</Typography>,
      cell: (row) => <Avatar src={row.foto} />,
    },
    {
      name: <Typography>{labelUsuario.nombres}</Typography>,
      cell: (row) => <Typography>{row.nombre}</Typography>,
      sortable: true,
    },
    {
      name: <Typography>{labelUsuario.correo}</Typography>,
      cell: (row) => <Typography>{row.correo}</Typography>,
      sortable: true,
    },
    {
      name: <Typography>{labelUsuario.estado}</Typography>,
      cell: (row) => <Status status={row.estado} />,
      sortable: true,
      sortFunction: (rowA, rowB) => {
        return rowA.estado.localeCompare(rowB.estado);
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
    EstudianteCurso & { rowIndex: number }
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
      estudiante.map((usuario, index) => ({
        ...usuario,
        rowIndex: index,
      })),
    [estudiante]
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        selectableRows // Habilita checkboxes
        selectableRowsHighlight // Resalta filas seleccionadas
        onSelectedRowsChange={({ selectedRows }) => {
          setSelectUsers(selectedRows.map((user) => user.id));
        }}
      ></DataTable>
    </>
  );
};

export default TablaEstudiantesEditarCurso;
