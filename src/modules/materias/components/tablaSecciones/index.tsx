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
import { useCustomTableStyles } from "@modules/general/styles";
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
import AlertDialog from "@modules/general/components/alertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { labelEditCourse } from "@modules/materias/enums/labelEditCourse";
import CustomWidthTooltip from "@modules/general/components/customWidthTooltip";

const TablaGestionarSecciones = () => {
  const { getValues: getValuesCurso } = useFormContext<Curso>();
  const methods = useForm<Zod.TypeOf<typeof SeccionesSchema>>({
    resolver: zodResolver(SeccionesSchema),
    defaultValues: { secciones: getValuesCurso("secciones") || [] },
  });

  const { watch, getValues, setValue, reset } = methods;

  useEffect(() => {
    reset({ secciones: getValuesCurso("secciones") || [] });
  }, [getValuesCurso("secciones")]);

  const [currentEdit, setCurrentEdit] = useState<number | null>(null);

  const { accountInformation } = useAuth();

  const { token } = accountInformation;

  const conditionToShowButton = () => {
    return JSON.stringify(getValues("secciones")) !== JSON.stringify(getValuesCurso("secciones"));
  };

  // const [_successMessages, setSuccessMessages] = useState<string>("");

  const {
    showDialog,
    open,
    title,
    message,
    handleCancel,
    handleClose,
    type,
    handleAccept,
    isLoading,
    setIsLoading,
  } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  async function getRequest(secciones: Seccion[]) {
    for (const seccion of secciones) {
      if (seccion.id) {
        await patchEditSeccion(token, seccion);
      } else await postCreateSeccion(token, seccion);
    }

    //return setSuccessMessages(mensajes);
  }

  const { isPending, mutate } = useMutation({
    mutationKey: ["Edit Section", getValues("secciones") || []],
    mutationFn: async () => {
      setIsLoading(true);
      return await getRequest(getValues("secciones") || []);
    },
    onSuccess: () => {
      showDialog({
        title: "Editar Curso",
        message: "Se ha editado el curso correctamente",
        onAccept: () => handleClose,
        reload: true,
        type: "success",
      });
    },
    onError: (err) => setError(err),
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

  function showErrors() {
    const nodes: string[] = [];

    const secciones = methods.formState.errors?.secciones;

    if (Array.isArray(secciones)) {
      secciones.forEach((row) => {
        const _temp = Object.entries(row)
          .map(([field, error]) => {
            return `${field}: ${(error as FieldError)?.message || "Error desconocido"}`;
          })
          .join("\n");
        nodes.push(_temp);
      });
    }

    if (nodes.length === 0) return null;

    return (
      <Stack spacing={1}>
        <Alert severity="error">Se han encontrado los siguientes errores:</Alert>
        <Alert severity="error">
          <Typography variant="body2" component="pre">
            {nodes[0]}
          </Typography>
        </Alert>
      </Stack>
    );
  }

  return (
    <FormProvider {...methods}>
      {
        <Modal handleClose={handleCloseEdit} open={openEdit}>
          <SeccionesForm index={currentEdit!!} onAccept={onCloseModal} onCancel={onCloseModal} />
        </Modal>
      }
      <form onSubmit={methods.handleSubmit(handleUpdate)}>
        <Stack spacing={2}>
          <AlertDialog
            handleAccept={handleAccept}
            handleCancel={handleCancel}
            open={open}
            title={title}
            textBody={message}
            type={type}
            isLoading={isLoading}
          />
          <Typography variant="h6">{labelEditCourse.sections}</Typography>
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
            <Alert severity="warning">{labelEditCourse.notHasSection}</Alert>
          )}
          <Stack alignItems={"end"} padding={3}>
            <Box>
              <GeneralButton onClick={handleAdd} mode={buttonTypes.add} size="small" />
            </Box>
          </Stack>
          {conditionToShowButton() && showErrors()}
          <Box>
            {conditionToShowButton() && (
              <GeneralButton
                mode={buttonTypes.save}
                variant="contained"
                loading={isPending}
                color="primary"
                type="submit"
              />
            )}
          </Box>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default TablaGestionarSecciones;
