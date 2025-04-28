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

type TablaCursosProps = {
  cursos: CursoTabla[];
  type: "E" | "D";
};

/**
 * @component TablaCursosAdmin
 * @description This component displays a table with course data, allowing the user to view, edit, and change the status of courses.
 * It uses `react-data-table-component` to render the data and provides action buttons for each row.
 * @param {TablaCursosProps} props - Contains the list of courses to be displayed.
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
      ></DataTable>
    </>
  );
};

export default TablaCursos;
