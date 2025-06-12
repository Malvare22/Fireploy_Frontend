import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Avatar, Typography } from "@mui/material";
import React, { useMemo } from "react";

import Status from "@modules/general/components/status";
import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import { useCustomTableStyles } from "@modules/general/hooks/useCustomTableStyles";
import { UsuarioCurso } from "@modules/materias/types/curso";

type TablaEstudiantesEditarCursoProps = {
  estudiante: UsuarioCurso[];
  setSelectUsers: React.Dispatch<number[]>;
};

/**
 * TablaEstudiantesEditarCurso Component – Displays a table of students for a specific course, allowing the admin to view their details 
 * and select multiple students for further actions (e.g., assigning or removing them from the course).
 * 
 * This component uses `react-data-table-component` to render the student list, which includes information such as the student's ID, 
 * profile photo, name, email, and status.
 * The table allows users to select multiple students, and the selected student IDs are returned to the parent component via the 
 * `setSelectUsers` callback function.
 * 
 * @component
 * 
 * @param {TablaEstudiantesEditarCursoProps} props - The properties for the component.
 * @param {UsuarioCurso[]} props.estudiante - List of students enrolled in a course.
 * @param {React.Dispatch<number[]>} props.setSelectUsers - Callback function to update the selected students' IDs.
 * 
 * @returns A `DataTable` component displaying the list of students with their details and checkboxes for selection.
 * 
 * @example
 * ```tsx
 * <TablaEstudiantesEditarCurso estudiante={studentList} setSelectUsers={setSelectedStudents} />
 * ```
 */
const TablaEstudiantesEditarCurso: React.FC<TablaEstudiantesEditarCursoProps> = ({
  estudiante,
  setSelectUsers,
}) => {
  const { conditionalRowStyles, customStyles } = useCustomTableStyles();

  const columns: TableColumn<UsuarioCurso & { rowIndex: number }>[] = [
    {
      name: <Typography>{labelUsuario.id}</Typography>,
      cell: (row) => <Typography>{row.id}</Typography>,
      width: "90px",
      sortable: true,
    },
    {
      name: <Typography>{labelUsuario.fotoPerfil}</Typography>,
      cell: (row) => <Avatar sx={{marginY: 2}} src={row.imagen} />,
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
