import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Chip, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import Status from "@modules/general/components/status";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { CursoTabla } from "@modules/materias/types/curso.tabla";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import { rutasMaterias } from "@modules/materias/router/router";
import { useCustomTableStyles } from "@modules/general/styles";
import { paginationComponentOptions } from "@modules/general/utils/pagination";

type TablaCursosProps = {
  cursos: CursoTabla[];
  type: "E" | "D";
};

/**
 * TablaCursos Component – Displays a table of courses with options to view, edit, and change the status of each course.
 * 
 * This component utilizes `react-data-table-component` to render a list of courses, including information about each course
 * such as its name, group, semester, status, number of students, and actions (view, edit).
 * It allows the user to view course details, edit them, or change their status based on the type of user.
 * 
 * @component
 * 
 * @param {TablaCursosProps} props - The properties for the component.
 * @param {CursoTabla[]} props.cursos - List of courses to be displayed in the table.
 * @param {"E" | "D"} props.type - Defines the type of user:
 *        - "E" for view-only users (i.e., they cannot edit courses),
 *        - "D" for users with editing privileges (i.e., they can edit courses).
 * 
 * @returns A `DataTable` component displaying the list of courses with their details and actions.
 * 
 * @example
 * ```tsx
 * <TablaCursos cursos={courseList} type="E" />
 * ```
 */
const TablaCursos: React.FC<TablaCursosProps> = ({ cursos, type }) => {
  const navigate = useNavigate();
  /**
   * @constant columns
   * @description Defines the columns for the data table displaying course information.
   * Includes columns for ID, group, semester, status, number of students, and actions (view, edit, change status).
   */
  const columns: TableColumn<CursoTabla & { rowIndex: number }>[] = [
    {
      name: <Typography>{labelListarCursos.materia}</Typography>,
      cell: (row) => <Typography>{row.materia.nombre}</Typography>,
      sortable: true,
    },
    {
      name: <Typography>{labelListarCursos.grupo}</Typography>,
      cell: (row) => <Chip label={<Typography>{row.grupo}</Typography>} />,
      sortable: true,
    },
    {
      name: <Typography>{labelListarCursos.semestre}</Typography>,
      cell: (row) => <Typography>{row.materia.semestre}</Typography>,
      sortable: true,
    },
    {
      name: <Typography>{labelListarCursos.estado}</Typography>,
      cell: (row) => <Status status={row.estado} />,
      sortFunction: (rowA, rowB) => rowA.estado.localeCompare(rowB.estado),
      sortable: true,
    },
    {
      name: <Typography>{labelListarCursos.cantidad}</Typography>,
      cell: (row) => <Typography>{row.cantidadEstudiantes}</Typography>,
      sortable: true,
    },
    {
      name: <Typography>{labelListarCursos.acciones}</Typography>,
      center: true,
      cell: (row) => (
        <Stack direction="row" justifyContent="center">
          <ActionButton
            mode={actionButtonTypes.ver}
            onClick={() => navigate(rutasMaterias.verCurso.replace(":idCurso", row.id))}
          />
          {type == "D" && (
            <ActionButton
              mode={actionButtonTypes.editar}
              onClick={() => navigate(rutasMaterias.editarCurso.replace(":idCurso", row.id))}
            />
          )}
        </Stack>
      ),
    },
  ];

  const { conditionalRowStyles, customStyles } = useCustomTableStyles();

  const dataConIndice = useMemo(() => {
    return cursos
      ? cursos.map((curso, index) => ({
          ...curso,
          rowIndex: index,
        }))
      : [];
  }, [cursos]);

  return (
    <>
      <DataTable
        columns={columns}
        data={dataConIndice}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20]}
        paginationComponentOptions={paginationComponentOptions}
      ></DataTable>
    </>
  );
};

export default TablaCursos;
