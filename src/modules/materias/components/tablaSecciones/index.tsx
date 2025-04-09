import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Status from "@modules/general/components/status";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { FieldError, useFormContext } from "react-hook-form";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { Seccion, seccionTemplate } from "@modules/materias/types/seccion";
import { labelListarSecciones } from "@modules/materias/enums/labelListarSecciones";
import { Curso } from "@modules/materias/types/curso";
import { labelEditarCurso } from "@modules/materias/pages/editarCurso";
import { useCustomTableStyles } from "@modules/general/styles";
import CustomWidthTooltip from "@modules/general/components/CustomWidthTooltip";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import SeccionesForm from "../formSecciones";
import Modal from "@modules/general/components/modal";
import { patchEditSeccion } from "@modules/materias/services/patch.modificar.seccion";
import { postCreateSeccion } from "@modules/materias/services/post.crear.seccion";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation } from "@tanstack/react-query";
import AlertDialog from "@modules/general/components/alertDialog";
import AlertDialogError from "@modules/general/components/alertDialogError";

const TablaGestionarSecciones = () => {
  const { watch, getValues, setValue, formState } = useFormContext<Curso>();

  const { errors } = formState;

  const [currentEdit, setCurrentEdit] = useState<number>(-1);

  const { accountInformation } = useAuth();

  const { token } = accountInformation;

  const [successRequest, setSuccesRequest] = useState([]);

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

  async function getRequest(secciones: Seccion[]) {
    await Promise.all(
      secciones.filter((seccion) => {
        
        if (seccion.id != 0) {
          return patchEditSeccion(token, seccion);
        } else {
          return postCreateSeccion(token, seccion);
        }
      })
    );
  }

  const { isSuccess, error, isPending, mutate } = useMutation({
    mutationKey: ["modificar sección"],
    mutationFn: () => getRequest(getValues("secciones") || []),
    onSuccess: handleOpenSuccess,
    onError: handleOpenError,
  });

  const {
    handleClose: handleCloseEdit,
    handleOpen: handleOpenEdit,
    open: openEdit,
  } = useAlertDialog();

  function handleAdd() {
    const aux = { ...seccionTemplate, cursoId: getValues("id") || "" };
    const seccionesActuales = getValues("secciones") ?? [];
    setValue("secciones", [...seccionesActuales, aux]);
    const currentPos = seccionesActuales.length;
    setCurrentEdit(currentPos);
    handleOpenEdit();
  }

  function handleEdit(i: number) {
    setCurrentEdit(i);
    handleOpenEdit();
  }

  function handleDelete(i: number) {
    setCurrentEdit(-1);
    const newerSeccion: Seccion[] = getValues("secciones")?.filter((_y, index) => i != index) || [];

    setValue("secciones", newerSeccion);
  }

  const columns: TableColumn<Seccion & { rowIndex: number }>[] = [
    {
      name: <Typography variant="body2">{labelListarSecciones.id}</Typography>,
      cell: (row) => <Typography variant="body2">{row.id ?? 0}</Typography>,
      sortable: true,
      width: "120px",
    },
    {
      name: <Typography variant="body2">{labelListarSecciones.titulo}</Typography>,
      cell: (row) => <Typography variant="body2">{row.titulo}</Typography>,
      sortable: true,
      width: "220px",
    },
    {
      name: <Typography variant="body2">{labelListarSecciones.fechaDeInicio}</Typography>,
      cell: (row) => <Typography variant="body2">{row.fechaDeInicio}</Typography>,
      sortable: true,
      width: "120px",
    },
    {
      name: <Typography variant="body2">{labelListarSecciones.fechaLimite}</Typography>,
      cell: (row) => <Typography variant="body2">{row.fechaDeCierre}</Typography>,
      sortable: true,
      width: "120px",
    },
    {
      name: <Typography variant="body2">{labelListarSecciones.cantidadDeProyectos}</Typography>,
      cell: (row) => <Typography variant="body2">{row.proyectos?.length ?? 0}</Typography>,
      sortable: true,
      width: "150px",
    },
    {
      name: <Typography variant="body2">{labelListarSecciones.descripcion}</Typography>,
      cell: (row) => (
        <CustomWidthTooltip title={row.descripcion} placement="top">
          <Typography variant="body2">
            {row.descripcion?.split(" ").slice(0, 3).join(" ") + "..."}
          </Typography>
        </CustomWidthTooltip>
      ),
      sortable: true,
    },
    {
      name: <Typography variant="body2">{labelListarSecciones.estado}</Typography>,
      cell: (row) => <Status status={row.estado} />,
      sortFunction: (rowA, rowB) => rowA.estado.localeCompare(rowB.estado),
      sortable: true,
      width: "130px",
    },
    {
      name: <Typography variant="body2">{labelListarSecciones.acciones}</Typography>,
      cell: (row) => {
        return (
          <Stack direction={"row"} spacing={2}>
            <ActionButton
              mode={actionButtonTypes.editar}
              disabled={currentEdit !== -1}
              onClick={() => handleEdit(row.rowIndex)}
            />
            <ActionButton
              mode={actionButtonTypes.eliminar}
              disabled={currentEdit !== -1 || row.id === 0 }
              onClick={() => handleDelete(row.rowIndex)}
            />
          </Stack>
        );
      },
    },
  ];

  const dataConIndice = useMemo(() => {
    const secciones = watch("secciones") ?? [];
    return secciones.map((seccion, index) => ({
      ...seccion,
      rowIndex: index,
    }));
  }, [watch("secciones"), currentEdit]);

  const { conditionalRowStyles, customStyles } = useCustomTableStyles();

  function onCloseModal() {
    console.log("AA");
    handleCloseEdit();
    setCurrentEdit(-1);
  }

  function handleUpdate(){
    mutate();
  }

  return (
    <>
      {isSuccess && (
        <AlertDialog
          open={openSuccess}
          handleAccept={handleCloseSuccess}
          title="Cambiar estado del Usuario"
          textBody={"User updated successfully"}
        />
      )}
      {error && (
        <AlertDialogError
          error={error}
          handleClose={handleCloseError}
          title="Error Updating User"
          open={openError}
        />
      )}
      {
        <Modal handleClose={handleCloseEdit} open={openEdit}>
          <SeccionesForm index={currentEdit} onAccept={onCloseModal} onCancel={onCloseModal} />
        </Modal>
      }
      {watch("secciones")?.length != 0 ? (
        <DataTable
          columns={columns}
          data={dataConIndice}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
          responsive
        ></DataTable>
      ) : (
        <Alert severity="warning">{labelEditarCurso.noHaySecciones}</Alert>
      )}
      <Stack alignItems={"end"} padding={3}>
        <Box>
          <GeneralButton onClick={handleAdd} mode={buttonTypes.add} size="small" />
        </Box>
      </Stack>
      {errors?.secciones &&
        Array.isArray(errors.secciones) &&
        errors.secciones.map((seccionError, index) => (
          <div key={index}>
            {Object.entries(seccionError).map(([field, error]) => (
              <Alert severity="error" key={`${index}-${field}`}>
                {`${field}: ${(error as FieldError)?.message || "Error desconocido"}`}
              </Alert>
            ))}
          </div>
        ))}
        <Button variant="contained" loading={isPending} color="secondary" onClick={handleUpdate}>{labelEditarCurso.modificarSecciones}</Button>
    </>
  );
};

export default TablaGestionarSecciones;
