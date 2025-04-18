import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm, useFormContext } from "react-hook-form";
import EnviromentVariablesEditor from "../enviroment";
import DockerInputs from "../../dockerInputs";
import {
  ProyectoRepositoriesSchema,
  ProyectoSchema,
} from "@modules/proyectos/utils/forms/proyecto.schema";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@modules/general/context/accountContext";
import { useContext, useEffect } from "react";
import { StepperContext } from "@modules/general/context/stepper.Contex";
import { patchEditRepository } from "@modules/proyectos/services/patch.edit.repositories";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { FormProvider } from "react-hook-form";
import AutoFocusOnError from "@modules/general/hooks/useAutoFocusOnError";

type Props = {
  type: "edit" | "create";
};

export function Repositories({ type }: Props) {
  const { getValues: getValuesProject } = useFormContext<ProyectoSchema>();
  const { token } = useAuth().accountInformation;
  const { handleNext } = useContext(StepperContext);

  const methods = useForm<ProyectoRepositoriesSchema>({
    defaultValues: getValuesProject(),
    resolver: zodResolver(ProyectoRepositoriesSchema),
    shouldFocusError: true,
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
    setOpen
  } = useAlertDialog2();

  const { setError } = useErrorReader(showDialog);
  
  const { mutate, isPending } = useMutation({
    mutationFn: () => patchEditRepository(token, getValues()),
    onSuccess: () => {
      if (type === "create") {
        handleNext();
      } else {
        showDialog({
          message: "Repositorios actualizados correctamente",
          type: "success",
          title: "Éxito",
          onAccept: () => {setOpen(false)},
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
            onAccept: () => {setOpen(false)},
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

      {/* ✅ FormProvider para compartir el contexto */}
      <FormProvider {...methods}>
        <AutoFocusOnError<ProyectoRepositoriesSchema>/>
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
                        sx={{ width: "50%" }}
                        inputRef={field.ref}
                      />
                    )}
                  />
                  <DockerInputs fieldName="frontend" />
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
                        sx={{ width: "50%" }}
                        inputRef={field.ref}
                      />
                    )}
                  />
                  <DockerInputs fieldName="backend" />
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
                        sx={{ width: "50%" }}
                        inputRef={field.ref}
                      />
                    )}
                  />
                  <DockerInputs fieldName="integrado" />
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
