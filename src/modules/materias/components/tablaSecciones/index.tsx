import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import { Alert, Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Status from "@modules/general/components/status";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { FieldError, FormProvider, useForm, useFormContext } from "react-hook-form";
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
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { zodResolver } from "@hookform/resolvers/zod";
import { SeccionesSchema } from "@modules/materias/utils/forms/form.schema";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import AlertDialogError from "@modules/general/components/alertDialogError";

const TablaGestionarSecciones = () => {
  const { getValues: getValuesCurso } = useFormContext<Curso>();
  const methods = useForm<Zod.TypeOf<typeof SeccionesSchema>>({
    resolver: zodResolver(SeccionesSchema),
    defaultValues: { secciones: getValuesCurso("secciones") || [] },
  });

  const { watch, getValues, setValue, reset } = methods;

  console.log(getValues());

  useEffect(() => {
    reset({ secciones: getValuesCurso("secciones") || [] });
  }, [getValuesCurso("secciones")]);

  const [currentEdit, setCurrentEdit] = useState<number | null>(null);

  const { accountInformation } = useAuth();

  const { token } = accountInformation;

  const conditionToShowButton = () => {
    return JSON.stringify(getValues("secciones")) !== JSON.stringify(getValuesCurso("secciones"));
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

  const [successMessages, setSuccessMessages] = useState<string>("");

  async function getRequest(secciones: Seccion[]) {
    let mensajes = "";
    for (const seccion of secciones) {
      try {
        if (seccion.id) {
          await patchEditSeccion(token, seccion);
          mensajes += `✅ Sección "${seccion.titulo}" actualizada.` + "\n";
        }
      } catch {
        await postCreateSeccion(token, seccion);
        mensajes += `✅ Sección "${seccion.titulo}" creada.` + "\n";
      }
    }

    return setSuccessMessages(mensajes);
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
    const aux = { ...seccionTemplate, cursoId: getValuesCurso("id") || "" };
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
    setCurrentEdit(null);
    const newerSeccion: Seccion[] = getValues("secciones")?.filter((_y, index) => i != index) || [];

    setValue("secciones", newerSeccion);
  }

  const columns: TableColumn<Seccion & { rowIndex: number }>[] = [
    {
      name: <Typography variant="body2">{labelListarSecciones.id}</Typography>,
      cell: (row) => (
        <>
          {!row.id ? (
            <Tooltip title="Código aún no asignado por el sistema">
              <HelpOutlineIcon />
            </Tooltip>
          ) : (
            <Typography variant="body2">{row.id}</Typography>
          )}
        </>
      ),
      sortable: true,
      center: true,
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
              onClick={() => handleEdit(row.rowIndex)}
            />
            {row.id == undefined && (
              <ActionButton
                mode={actionButtonTypes.eliminar}
                onClick={() => handleDelete(row.rowIndex)}
              />
            )}
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
    handleCloseEdit();
    setCurrentEdit(null);
  }

  function handleUpdate() {
    mutate();
  }

  return (
    <FormProvider {...methods}>
      {isSuccess && (
        <AlertDialogSuccess
          open={openSuccess}
          handleClose={handleCloseSuccess}
          title="Edición de Secciones"
          message={
            successMessages != ""
              ? successMessages
              : "Actualización de Secciones realizada correctamente"
          }
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
          <SeccionesForm index={currentEdit!!} onAccept={onCloseModal} onCancel={onCloseModal} />
        </Modal>
      }
      <Typography variant="h6">{labelEditarCurso.secciones}</Typography>
      <Alert severity="info">{labelListarSecciones.informacion}</Alert>
      {watch("secciones")?.length != 0 ? (
        <>
          <Divider />
          <DataTable
            columns={columns}
            data={dataConIndice}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
            responsive
          ></DataTable>
        </>
      ) : (
        <Alert severity="warning">{labelEditarCurso.noHaySecciones}</Alert>
      )}
      <Stack alignItems={"end"} padding={3}>
        <Box>
          <GeneralButton onClick={handleAdd} mode={buttonTypes.add} size="small" />
        </Box>
      </Stack>
      {methods.formState.errors?.secciones &&
        Array.isArray(methods.formState.errors.secciones) &&
        methods.formState.errors.secciones.map((seccionError, index) => (
          <div key={index}>
            {Object.entries(seccionError).map(([field, error]) => (
              <Alert severity="error" key={`${index}-${field}`}>
                {`${field}: ${(error as FieldError)?.message || "Error desconocido"}`}
              </Alert>
            ))}
          </div>
        ))}
      <Box>
        {conditionToShowButton() && (
          <GeneralButton
            mode={buttonTypes.save}
            variant="contained"
            loading={isPending}
            color="primary"
            onClick={handleUpdate}
          />
        )}
      </Box>
    </FormProvider>
  );
};

export default TablaGestionarSecciones;
