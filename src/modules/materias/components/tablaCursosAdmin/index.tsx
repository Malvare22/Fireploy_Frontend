import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Stack, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialog from "@modules/general/components/alertDialog";
import Status from "@modules/general/components/status";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { CursoTabla } from "@modules/materias/types/curso.tabla";
import { labelListarCursos } from "@modules/materias/enums/labelListarCursos";
import { useCustomTableStyles } from "@modules/general/hooks/useCustomTableStyles";
import { useMutation } from "@tanstack/react-query";
import { patchChangeStatusCurso } from "@modules/materias/services/patch.curso";
import { useAuth } from "@modules/general/context/accountContext";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import { paginationComponentOptions } from "@modules/general/utils/pagination";
import { rutasMaterias } from "@modules/materias/router/routes";

type TablaCursosAdminProps = {
  cursos: CursoTabla[]; // List of courses to be displayed in the table
};

/**
 * TablaCursosAdmin component – a table interface to display and manage courses for administrators.
 *
 * This component renders a data table with course information, allowing actions such as viewing,
 * editing, enabling, and disabling courses. It includes modals and alert dialogs for confirmation
 * and status feedback, and integrates mutation logic to update the backend.
 *
 * @component
 *
 * @param {array} cursos - An array of course objects. Each course object contains fields such as id, group, semester, status, and student count.
 *
 * @returns {JSX.Element} A table interface displaying all courses with action controls and status dialogs.
 *
 * @example
 * ```tsx
 * <TablaCursosAdmin cursos={cursosList} />
 * ```
 */
const TablaCursosAdmin: React.FC<TablaCursosAdminProps> = ({ cursos }) => {
  const theme = useTheme();
  const [selectCurso, setSelectCurso] = useState<CursoTabla | undefined>(undefined);

  /**
   * @function handleSelect
   * @description Handles selecting a course, opening the status change dialog for the selected course.
   * @param {CursoTabla} materia - The selected course to change the status.
   */
  const handleSelect = (materia: CursoTabla) => {
    setSelectCurso(materia);
    handleOpenStatus();
  };

  const { showDialog, open, title, message, type, handleAccept } = useAlertDialog();
  const { setError } = useErrorReader(showDialog);

  const token = useAuth().accountInformation.token;

  const { isPending: isPendingChangeStatus, mutate: mutateChangeStatus } = useMutation({
    mutationFn: () =>
      patchChangeStatusCurso(token, selectCurso?.id || "", selectCurso?.estado == "I" ? "A" : "I"),
    mutationKey: [
      "Change Status Curso",
      selectCurso?.id || "",
      selectCurso?.estado == "I" ? "A" : "I",
      token,
    ],
    onSuccess: () => {
      showDialog({
        message: "Estado del Curso Modificado Correctamente!",
        title: "Modificar Curso",
        onAccept: () => {},
        reload: true,
      });
    },
    onError: (error) => setError(error),
  });

  /**
   * @component ModalChangeStatus
   * @description Modal content displayed for changing the status of a course (enable/disable).
   * @param {CursoTabla["estado"]} status - Current status of the course (either "A" or "I").
   * @returns {JSX.Element} The modal content asking the user to confirm the status change.
   */
  function ModalChangeStatus(status: CursoTabla["estado"]) {
    const label = status == "I" ? "habilitar" : "deshabilitar";

    return (
      <Stack>
        <Typography>
          {`¿Está seguro de que desea ${label} el grupo: ${selectCurso?.grupo}?`}
        </Typography>
      </Stack>
    );
  }

  const {
    open: openHandleStatus,
    handleOpen: handleOpenStatus,
    handleClose: handleCloseHandleStatus,
  } = useModal();

  const navigate = useNavigate();

  /**
   * @constant columns
   * @description Defines the columns for the data table displaying course information.
   * Includes columns for ID, group, semester, status, number of students, and actions (view, edit, change status).
   */
  const columns: TableColumn<CursoTabla & { rowIndex: number }>[] = [
    {
      name: <Typography>{labelListarCursos.id}</Typography>,
      cell: (row) => <Typography>{row.id}</Typography>,
      sortable: true,
      sortFunction: (a, b) => {
        return a.id.localeCompare(b.id);
      },
    },
    {
      name: <Typography>{labelListarCursos.grupo}</Typography>,
      cell: (row) => <Typography>{row.grupo}</Typography>,
      sortable: true,
      sortFunction: (a, b) => {
        return a.grupo.localeCompare(b.grupo);
      },
    },
    {
      name: <Typography>{labelListarCursos.semestre}</Typography>,
      cell: (row) => <Typography>{row.semestre}</Typography>,
      sortable: true,
      sortFunction: (a, b) => {
        return a.semestre.localeCompare(b.semestre);
      },
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
      sortFunction: (a, b) => {
        return a.cantidadEstudiantes - b.cantidadEstudiantes;
      },
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
          <ActionButton
            mode={actionButtonTypes.editar}
            onClick={() => navigate(rutasMaterias.editarCurso.replace(":idCurso", row.id))}
          />
          {row.estado === "A" ? (
            <ActionButton
              sx={{ color: theme.palette.error.main }}
              mode={actionButtonTypes.deshabilitar}
              onClick={() => handleSelect(row)}
            />
          ) : (
            <ActionButton
              sx={{ color: theme.palette.warning.main }}
              mode={actionButtonTypes.habilitar}
              onClick={() => handleSelect(row)}
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
      <AlertDialog
        open={openHandleStatus}
        handleAccept={mutateChangeStatus}
        isLoading={isPendingChangeStatus}
        title="Modificar Curso"
        body={ModalChangeStatus(selectCurso?.estado!!)}
        handleCancel={handleCloseHandleStatus}
      />
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
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

export default TablaCursosAdmin;
