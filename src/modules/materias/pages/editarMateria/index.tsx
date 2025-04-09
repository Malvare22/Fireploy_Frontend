import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "@modules/general/components/alertDialog";
import AlertDialogError, { CustomError } from "@modules/general/components/alertDialogError";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";
import GeneralButton from "@modules/general/components/button";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import { buttonTypes } from "@modules/general/types/buttons";
import { labelGestionarMateria } from "@modules/materias/enums/labelGestionarMateria";
import { getMateriaById } from "@modules/materias/services/get.materia.services";
import { postEditMateriaService } from "@modules/materias/services/patch.editar.materia";
import { Materia } from "@modules/materias/types/materia";
import { adaptMateriaServiceToMateria } from "@modules/materias/utils/adapters/materia.service";
import { MateriaSchema } from "@modules/materias/utils/forms/form.schema";
import {
  getMateriasSemestresLabels,
  getMateriaStatesArray,
} from "@modules/materias/utils/materias";
import { Divider, Grid2, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type Props = { id: number; handleCloseModal: () => void };

function EditarMateria({ id, handleCloseModal }: Props) {
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  const { data, error, isLoading } = useQuery({
    queryFn: () => getMateriaById(token, id),
    queryKey: ["get materia editar"],
  });

  const methods = useForm<Materia>({
    resolver: zodResolver(MateriaSchema),
  });

  const { getValues, reset, watch } = methods;

  useEffect(() => {
    if (data) {
      reset(adaptMateriaServiceToMateria(data));
    }
  }, [data]);

  const {
    handleOpen: handleOpenError,
    handleClose: handleCloseError,
    open: openError,
  } = useAlertDialog();

  const {
    handleOpen: handleOpenSuccess,
    open: openSuccess,
    handleClose: handleCloseSuccess,
  } = useAlertDialog();

  const {
    isPending: isPendingPost,
    error: errorPost,
    mutate: mutatePost,
  } = useMutation({
    mutationFn: () => postEditMateriaService(token, getValues()),
    mutationKey: ["create materia"],
    onError: handleOpenError,
    onSuccess: handleOpenSuccess,
  });

  const onSubmit: SubmitHandler<Materia> = () => {
    handleOpenConfirmation();
  };

  function handleConfirmation() {
    mutatePost();
    handleCloseConfirmation();
  }

  const {
    handleClose: handleCloseConfirmation,
    handleOpen: handleOpenConfirmation,
    open: openConfirmation,
  } = useAlertDialog();

  function customCloseSuccess() {
    handleCloseSuccess();
    handleCloseModal();
  }

  return (
    <>
      <AlertDialog
        open={openConfirmation}
        handleAccept={handleConfirmation}
        title="Editar Materia"
        isLoading={isPendingPost}
        handleCancel={handleCloseConfirmation}
        textBody="¿Está seguro de aplicar los cambios sobre la materia??"
      />
      {(error || errorPost) && (
        <AlertDialogError
          handleClose={handleCloseError}
          open={openError}
          title="Editar Materia"
          error={(error || errorPost) as CustomError}
        />
      )}
      <AlertDialogSuccess
        handleClose={customCloseSuccess}
        message="Operación exitosamente realizada"
        open={openSuccess}
        title="Editar Materia"
      />
      {isLoading ? (
        <LoaderElement />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Stack>
                <Typography variant="h4">{labelGestionarMateria.editarMateria}</Typography>
                <Divider />
              </Stack>
              <Grid2 container spacing={3} padding={2}>
                <TextField
                  fullWidth
                  label={labelGestionarMateria.nombre}
                  {...methods.register("nombre")}
                  error={!!methods.formState.errors.nombre}
                  helperText={methods.formState.errors.nombre?.message}
                  InputLabelProps={{ shrink: true }}
                />

                <Controller
                  name="semestre"
                  control={methods.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      fullWidth
                      select
                      label={labelGestionarMateria.semestre}
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      InputLabelProps={{ shrink: true }}
                      value={watch("semestre") || 0}
                    >
                      {getMateriasSemestresLabels().map(([clave, valor]) => (
                        <MenuItem key={clave} value={clave}>
                          {valor}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="estado"
                  control={methods.control}
                  render={({ field, fieldState }) => (
                    <TextField
                      fullWidth
                      select
                      label={labelGestionarMateria.estado}
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      InputLabelProps={{ shrink: true }}
                      value={watch("estado") || "I"}
                    >
                      {getMateriaStatesArray.map(([clave, valor]) => (
                        <MenuItem key={clave} value={clave}>
                          {valor}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid2>
              <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                <GeneralButton mode={buttonTypes.save} onClick={handleOpenConfirmation} />
                <GeneralButton mode={buttonTypes.cancel} onClick={handleCloseModal} />
              </Stack>
            </Stack>
          </form>
        </FormProvider>
      )}
    </>
  );
}

export default EditarMateria;
