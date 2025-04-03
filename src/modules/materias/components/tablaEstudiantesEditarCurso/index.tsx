import DataTable, { ConditionalStyles } from "react-data-table-component";
import { TableColumn, TableStyles } from "react-data-table-component";
import { Avatar, useTheme } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";

import Status from "@modules/general/components/status";
import { useNavigate } from "react-router";

import { AccountContext } from "@modules/general/context/accountContext";
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

  const [selectUsuario, setSelectUsuario] = useState<
    EstudianteCurso | undefined
  >(undefined);

  const token = useContext(AccountContext)!!.localUser?.token;

  const navigate = useNavigate();

  const columns: TableColumn<EstudianteCurso & { rowIndex: number }>[] = [
    {
      name: labelUsuario.id,
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
    },
    {
      name: labelUsuario.fotoPerfil,
      cell: (row) => <Avatar src={row.foto} />,
    },
    {
      name: labelUsuario.nombres,
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: labelUsuario.correo,
      selector: (row) => row.correo,
      sortable: true,
    },
    {
      name: labelUsuario.estado,
      cell: (row) => <Status status={row.estado} />,
      sortable: true,
      sortFunction: (rowA, rowB) => {
        return rowA.estado.localeCompare(rowB.estado); // Ordena alfabéticamente
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
