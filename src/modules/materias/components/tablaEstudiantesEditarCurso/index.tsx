import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Avatar, Typography } from "@mui/material";
import React, { useMemo } from "react";

import Status from "@modules/general/components/status";
import { EstudianteCurso } from "@modules/materias/utils/forms/form.schema";
import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import { useCustomTableStyles } from "@modules/general/styles";

type TablaEstudiantesEditarCursoProps = {
  estudiante: EstudianteCurso[];
  setSelectUsers: React.Dispatch<number[]>;
};
const TablaEstudiantesEditarCurso: React.FC<TablaEstudiantesEditarCursoProps> = ({
  estudiante,
  setSelectUsers,
}) => {
  const { conditionalRowStyles, customStyles } = useCustomTableStyles();

  const columns: TableColumn<EstudianteCurso & { rowIndex: number }>[] = [
    {
      name: <Typography>{labelUsuario.id}</Typography>,
      cell: (row) => <Typography>{row.id}</Typography>,
      width: "90px",
      sortable: true,
    },
    {
      name: <Typography>{labelUsuario.fotoPerfil}</Typography>,
      cell: (row) => <Avatar sx={{marginY: 2}} src={row.foto} />,
      width: '150px'
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
