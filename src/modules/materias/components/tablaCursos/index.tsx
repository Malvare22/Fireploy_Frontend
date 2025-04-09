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
import { rutasMaterias } from "@modules/materias/router/router";
import { useCustomTableStyles } from "@modules/general/styles";
import { useMutation } from "@tanstack/react-query";
import { patchChangeStatusCurso } from "@modules/materias/services/patch.curso";
import { useAuth } from "@modules/general/context/accountContext";
import AlertDialogError from "@modules/general/components/alertDialogError";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";

type TablaCursosProps = {
  cursos: CursoTabla[];
};
const TablaCursos: React.FC<TablaCursosProps> = ({ cursos }) => {
  const theme = useTheme();

  const [selectCurso, setSelectCurso] = useState<CursoTabla | undefined>(undefined);

  const handleSelect = (materia: CursoTabla) => {
    setSelectCurso(materia);
    setOpenHandleStatus(true);
  };

  const {
    handleOpen: handleOpenError,
    handleClose: handleCloseError,
    open: openError,
  } = useAlertDialog();

  const {
    handleOpen: handleOpenSuccess,
    handleClose: handleCloseSuccess,
    open: openSuccess,
  } = useAlertDialog();

  const token = useAuth().accountInformation.token;

  const {
    isPending: isPendingChangeStatus,
    error: errorChangeStatus,
    isSuccess: isSuccessChangeStatus,
    mutate: mutateChangeStatus,
  } = useMutation({
    mutationFn: () =>
      patchChangeStatusCurso(token, selectCurso?.id || "", selectCurso?.estado == "I" ? "A" : "I"),
    mutationKey: ["change status curso"],
    onSuccess: () => {
      handleOpenSuccess();
      handleCloseHandleStatus();
    },
    onError: handleOpenError,
  });

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
    setOpen: setOpenHandleStatus,
    handleClose: handleCloseHandleStatus,
  } = useAlertDialog();

  const navigate = useNavigate();

  const columns: TableColumn<CursoTabla & { rowIndex: number }>[] = [
    {
      name: <Typography>{labelListarCursos.id}</Typography>,
      cell: (row) => <Typography>{row.id}</Typography>,
      sortable: true,
    },
    {
      name: <Typography>{labelListarCursos.grupo}</Typography>,
      cell: (row) => <Typography>{row.grupo}</Typography>,
      sortable: true,
    },
    {
      name: <Typography>{labelListarCursos.semestre}</Typography>,
      cell: (row) => <Typography>{row.semestre}</Typography>,
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
        title="Cambiar Estado de Materia"
        body={ModalChangeStatus(selectCurso?.estado!!)}
        handleCancel={() => setOpenHandleStatus(false)}
      />
      {isSuccessChangeStatus && (
        <AlertDialogSuccess
          open={openSuccess}
          handleClose={handleCloseSuccess}
          title="Cambiar estado del Usuario"
          message={"User updated successfully"}
        />
      )}
      {errorChangeStatus && (
        <AlertDialogError
          error={errorChangeStatus}
          handleClose={handleCloseError}
          title="Error Updating User"
          open={openError}
        />
      )}
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
