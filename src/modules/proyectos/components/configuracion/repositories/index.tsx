import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm, useFormContext } from "react-hook-form";
import EnviromentVariablesEditor from "../enviroment";
import { TechnologyInputs } from "../../technologyInputs";
import {
  ProyectoRepositoriesSchema,
  ProyectoSchema,
} from "@modules/proyectos/utils/forms/proyecto.schema";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@modules/general/context/accountContext";
import { useContext, useEffect } from "react";
import { StepperContext } from "@modules/general/context/stepperContex";
import { patchEditRepository } from "@modules/proyectos/services/patch.edit.repositories";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { FormProvider } from "react-hook-form";
import AutoFocusOnError from "@modules/general/hooks/useAutoFocusOnError";
import { useExecutionStatusContext } from "@modules/proyectos/context/executionStatus.context";
import { getProjectById } from "@modules/proyectos/services/get.project";
import { syncErrorProject } from "../../executionState";

type Props = {
  type: "edit" | "create";
};

/**
 * Repositories component – This component is responsible for managing the repository information
 * for a project. It allows users to create or edit repository details, such as the frontend, backend,
 * and integrated repositories, including their URLs and environment variables.
 *
 * The component uses React Hook Form for form management, React Query for API interaction, and
 * Material-UI for UI components. It also includes an alert dialog to confirm repository updates and
 * handles form submission to update repositories.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {"edit" | "create"} props.type - Specifies whether the user is editing an existing repository
 * or creating a new one.
 *
 * @returns {JSX.Element} A form allowing the user to input repository information (frontend, backend, integrated).
 * It provides options to submit the data or cancel changes, and handles success/error dialogs.
 *
 * @example
 * ```tsx
 * <Repositories type="create" />
 * ```
 */
export function Repositories({ type }: Props) {
  const { getValues: getValuesProject } = useFormContext<ProyectoSchema>();
  const { token, id: idUser } = useAuth().accountInformation;
  const { handleNext } = useContext(StepperContext);

  const methods = useForm<ProyectoRepositoriesSchema>({
    defaultValues: getValuesProject(),
    resolver: zodResolver(ProyectoRepositoriesSchema),
  });

  const { getValues, control, watch, reset } = methods;

  useEffect(() => {
    reset(getValuesProject());
  }, [getValuesProject("backend"), getValuesProject("frontend"), getValuesProject("integrado")]);

  const {
    showDialog,
    handleAccept,
    handleClose,
    open,
    isLoading,
    title,
    message,
    type: dialogType,
    setOpen,
  } = useAlertDialog2();

  const { setError } = useErrorReader(showDialog);

  const { executionState } = useExecutionStatusContext();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const currentStatus = await getProjectById(token, idUser);
      if (executionState && currentStatus.estado_ejecucion != executionState) syncErrorProject();
      patchEditRepository(token, getValues());
    },
    onSuccess: () => {
      if (type === "create") {
        handleNext();
      } else {
        showDialog({
          message: "Repositorios actualizados correctamente",
          type: "success",
          title: "Éxito",
          onAccept: () => {
            setOpen(false);
          },
          reload: true,
        });
      }
    },
    onError: (error) => {
      setError(error);
    },
  });

  function handleMutate(options: { isEdit: boolean }) {
    mutate(undefined, {
      onSuccess: () => {
        if (options.isEdit) {
          showDialog({
            message: "Repositorios actualizados correctamente",
            type: "success",
            title: "Éxito",
            onAccept: () => {
              setOpen(false);
            },
            reload: true,
          });
        } else {
          handleNext();
        }
      },
      onError: (error) => {
        setError(error);
      },
    });
  }

  function onSubmit() {
    if (type === "edit") {
      showDialog({
        title: "Cambios Repositorio",
        message: "¿Está seguro de que desea modificar la información de repositorios?",
        onAccept: () => handleMutate({ isEdit: true }),
        isLoading: isPending,
      });
    } else {
      handleMutate({ isEdit: false });
    }
  }

  return (
    <>
      <AlertDialog
        open={open}
        title={title}
        textBody={message}
        isLoading={isLoading}
        type={dialogType}
        handleAccept={handleAccept}
        handleCancel={handleClose}
      />

      <FormProvider {...methods}>
        <AutoFocusOnError<ProyectoRepositoriesSchema> />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Stack>
              <Typography variant="h5">{labelConfiguracion.repositorios}</Typography>
              <Divider />
            </Stack>
            <Typography variant="body2">{labelConfiguracion.repositoriosParrafo}</Typography>

            <Stack spacing={2}>
              {watch("frontend") && (
                <>
                  <Typography variant="h6">{labelConfiguracion.frontend}</Typography>
                  <Controller
                    name="frontend.url"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label={labelConfiguracion.urlFrontend}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        inputRef={field.ref}
                      />
                    )}
                  />
                  <TechnologyInputs fieldName="frontend" />
                  <EnviromentVariablesEditor type="frontend" />
                </>
              )}

              {watch("backend") && (
                <>
                  <Typography variant="h6">{labelConfiguracion.backend}</Typography>
                  <Controller
                    name="backend.url"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label={labelConfiguracion.urlBackend}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        inputRef={field.ref}
                      />
                    )}
                  />
                  <TechnologyInputs fieldName="backend" />
                  <EnviromentVariablesEditor type="backend" />
                </>
              )}

              {watch("integrado") && (
                <>
                  <Typography variant="h6">Repositorio Integrado</Typography>
                  <Controller
                    name="integrado.url"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        size="small"
                        {...field}
                        fullWidth
                        label="URL del Monolito"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        inputRef={field.ref}
                      />
                    )}
                  />
                  <TechnologyInputs fieldName="integrado" />
                  <EnviromentVariablesEditor type="integrado" />
                </>
              )}
            </Stack>

            <Stack alignItems={"end"}>
              <Box>
                <GeneralButton
                  loading={isPending}
                  mode={type == "create" ? buttonTypes.next : buttonTypes.save}
                  type="submit"
                />
              </Box>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
}
