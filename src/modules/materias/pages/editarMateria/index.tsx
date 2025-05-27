import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "@modules/general/components/alertDialog";
import GeneralButton from "@modules/general/components/button";
import LoaderElement from "@modules/general/components/loaderElement";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
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
import { Divider, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type Props = { id: number; handleCloseModal: () => void };

/**
 * EditarMateria component – allows the editing of an existing subject (materia).
 * It fetches the current data of the materia, displays it in a form, and allows the user to make changes.
 * Once the form is submitted, it confirms the changes and sends the updated data to the server.
 * 
 * This component includes:
 * - Fetching data of the materia to be edited.
 * - Form for editing the materia with validation using Zod and React Hook Form.
 * - Confirmation and alert dialogs for handling submission success or failure.
 * 
 * @component
 * 
 * @param {number} id - The ID of the materia to be edited.
 * @param {Function} handleCloseModal - Function to close the modal that contains this component.
 * 
 * @returns {JSX.Element} A form that allows editing a materia with appropriate success/error handling.
 * 
 * @example
 * ```tsx
 * <EditarMateria id={1} handleCloseModal={closeModalFunction} />
 * ```
 */
function EditarMateria({ id, handleCloseModal }: Props) {
  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  /** Alert dialog controller */
  const {
    showDialog,
    open,
    title,
    message,
    type,
    handleAccept,
    isLoading,
    setIsLoading,
  } = useAlertDialog();

  /** Error handler using dialog */
  const { setError } = useErrorReader(showDialog);

  /** Fetch current materia data */
  const { data, error, isLoading: isLoadingFetch } = useQuery({
    queryFn: () => getMateriaById(token, id),
    queryKey: ["get materia editar", id, token],
  });

  /** Form methods from react-hook-form with Zod validation */
  const methods = useForm<Materia>({
    resolver: zodResolver(MateriaSchema),
  });

  const { getValues, reset, watch } = methods;

  /** Reset form with fetched data */
  useEffect(() => {
    if (data) {
      reset(adaptMateriaServiceToMateria(data));
    }
  }, [data]);

  /** Show error dialog if fetch fails */
  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  /** Mutation to edit materia */
  const { mutate: mutatePost} = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return postEditMateriaService(token, getValues());
    },
    mutationKey: ["Edit Materia", id, token],
    onSuccess: () => {
      showDialog({
        title: "Editar Materia",
        message: "Operación exitosamente realizada",
        type: "success",
        onAccept: () => handleCloseModal(),
        reload: true
      });
    },
    onError: (err) => setError(err),
  });

  /** Submit handler that shows confirmation dialog */
  const onSubmit: SubmitHandler<Materia> = () => {
    handleOpenConfirmation();
  };

  /** Confirmation dialog state for submit */
  const {
    handleClose: handleCloseConfirmation,
    handleOpen: handleOpenConfirmation,
    open: openConfirmation,
  } = useModal();

  /** Handle actual submission after confirmation */
  function handleConfirmation() {
    mutatePost();
    handleCloseConfirmation();
  }

  return (
    <>
      {/* Confirmation Dialog */}
      <AlertDialog
        open={openConfirmation}
        handleAccept={handleConfirmation}
        title="Editar Materia"
        isLoading={isLoading}
        handleCancel={handleCloseConfirmation}
        textBody="¿Está seguro de aplicar los cambios sobre la materia?"
      />

      {/* Success or error dialog */}
      <AlertDialog
        open={open}
        handleAccept={handleAccept}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoading}
      />

      {/* Loader while fetching materia */}
      {isLoadingFetch ? (
        <LoaderElement />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Stack>
                <Typography variant="h4">{labelGestionarMateria.editarMateria}</Typography>
                <Divider />
              </Stack>

              {/* Form fields */}
              <Grid container spacing={3} padding={2}>
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
              </Grid>

              {/* Action buttons */}
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
