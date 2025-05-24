import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Controller, useForm, useFormContext } from "react-hook-form";
import EnviromentVariablesEditor from "../enviroment";
import { TechnologyInputs } from "../../technologyInputs";
import {
  ProyectoRepositoriesSchema,
  ProyectoSchema,
} from "@modules/proyectos/utils/forms/proyecto.schema";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@modules/general/context/accountContext";
import { useContext, useEffect, useState } from "react";
import { StepperContext } from "@modules/general/context/stepperContex";
import {
  patchEditRepository,
  postFileToRepository,
} from "@modules/proyectos/services/patch.edit.repositories";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { FormProvider } from "react-hook-form";
import { useExecutionStatusContext } from "@modules/proyectos/context/executionStatus.context";
import { getProjectById } from "@modules/proyectos/services/get.project";
import { syncErrorProject } from "../../executionState";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import GitHubIcon from "@mui/icons-material/GitHub";
import HiddenButton from "@modules/materias/components/hiddenInput";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import DeleteIcon from "@mui/icons-material/Delete";
import { GitlabIcon } from "@modules/general/components/customIcons";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import TransitionAlert from "@modules/general/components/transitionAlert";

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
  const { token } = useAuth().accountInformation;
  const { handleNext } = useContext(StepperContext);

  const methods = useForm<ProyectoRepositoriesSchema>({
    defaultValues: getValuesProject(),
    resolver: zodResolver(ProyectoRepositoriesSchema),
  });

  const { getValues, control, watch, reset, setValue } = methods;

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
    setIsLoading,
    handleCancel,
  } = useAlertDialog2();

  const { setError } = useErrorReader(showDialog);

  const { executionState } = useExecutionStatusContext();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      let fetchProject = await getProjectById(token, getValuesProject("id") ?? -1);
      let front = false;
      let back = false;
      let inte = false;
      setIsLoading(true);
      if (
        type == "create" ||
        (executionState && fetchProject && fetchProject.estado_ejecucion == executionState)
      ) {
        if (filesRepo.backend != null) {
          await postFileToRepository(
            token,
            filesRepo.backend,
            getValuesProject("backend.id") ?? -1
          );
          back = true;
        }
        if (filesRepo.frontend != null) {
          await postFileToRepository(
            token,
            filesRepo.frontend,
            getValuesProject("frontend.id") ?? -1
          );
          front = true;
        }
        if (filesRepo.integrado != null) {
          await postFileToRepository(
            token,
            filesRepo.integrado,
            getValuesProject("integrado.id") ?? -1
          );
          inte = true;
        }

        const { frontend, backend, integrado } = adaptProject(
          await getProjectById(token, getValuesProject("id") ?? -1)
        );

        const myData = getValues();

        if (myData.frontend && front) {
          myData.frontend.url = frontend?.url ?? "";
        }

        if (myData.backend && back) {
          myData.backend.url = backend?.url ?? "";
        }

        if (myData.integrado && inte) {
          myData.integrado.url = integrado?.url ?? "";
        }

        await patchEditRepository(token, myData);

        return;
      }

      syncErrorProject();
    },
  });

  type FilesRepo = Record<KeysOfRepository, File | null>;

  const [filesRepo, setFilesRepo] = useState<FilesRepo>({
    backend: null,
    frontend: null,
    integrado: null,
  });

  function InputFile({ layer, disabled }: { layer: KeysOfRepository; disabled: boolean }) {
    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { files } = e.target;

      if (!files || !files[0]) {
        setFilesRepo({ ...filesRepo, [layer]: null });
      } else {
        setFilesRepo({ ...filesRepo, [layer]: files[0] });
        setValue(`${layer}.file`, true);
      }
    }

    function handleDelete() {
      setValue(`${layer}.file`, null);
      setFilesRepo({ ...filesRepo, [layer]: null });
    }

    return (
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          disabled={disabled}
          tabIndex={-1}
          startIcon={<FolderZipIcon />}
        >
          {!filesRepo[layer]?.name ? "Subir .Zip" : filesRepo[layer]?.name}
          <HiddenButton type="file" onChange={onChange} multiple />
        </Button>
        <Tooltip title="Eliminar Archivo">
          <IconButton onClick={handleDelete} disabled={filesRepo[layer] == null}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  }

  function handleMutate(options: { isEdit: boolean }) {
    mutate(undefined, {
      onSuccess: () => {
        if (options.isEdit) {
          showDialog({
            message: "Repositorios actualizados correctamente",
            type: "success",
            title: "Éxito",
            onAccept: () => {
              handleClose;
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
        onCancel: () => handleClose(),
        isLoading: isPending,
      });
    } else {
      handleMutate({ isEdit: false });
    }
  }

  const isDisabled = executionState === "N";

  return (
    <>
      <AlertDialog
        open={open}
        title={title}
        textBody={message}
        isLoading={isLoading}
        type={dialogType}
        handleAccept={handleAccept}
        handleCancel={handleCancel}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Stack>
              <TransitionAlert severity="warning">
                {
                  "Para que surjan efecto los cambios realizados en esta sección, se requiere volver a desplegar el aplicativo"
                }
              </TransitionAlert>
              <Typography variant="h5">{labelConfiguracion.repositorios}</Typography>
              <Divider />
            </Stack>
            <Typography variant="body2">{labelConfiguracion.repositoriosParrafo}</Typography>
            <Stack spacing={2}>
              {watch("frontend") && (
                <>
                  <Typography variant="h6">{labelConfiguracion.frontend}</Typography>
                  <Grid2 container spacing={1}>
                    <Grid2 size={{ md: 10, xs: 12 }}>
                      <Controller
                        name="frontend.url"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            size="small"
                            {...field}
                            fullWidth
                            disabled={filesRepo.frontend != null || isDisabled}
                            label={labelConfiguracion.urlFrontend}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            inputRef={field.ref}
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <GitHubIcon />
                                    <GitlabIcon sx={{ marginLeft: 1, fontSize: 16 }} />
                                  </InputAdornment>
                                ),
                              },
                            }}
                          />
                        )}
                      />
                    </Grid2>
                    <Grid2 size={{ md: 2, xs: 12 }}>
                      <InputFile layer="frontend" disabled={isDisabled} />
                    </Grid2>
                  </Grid2>
                  <TechnologyInputs fieldName="frontend" disabled={isDisabled} />
                  <EnviromentVariablesEditor type="frontend" disabled={isDisabled} />
                </>
              )}

              {watch("backend") && (
                <>
                  <Typography variant="h6">{labelConfiguracion.backend}</Typography>
                  <Grid2 container spacing={1}>
                    <Grid2 size={{ md: 10, xs: 12 }}>
                      <Controller
                        name="backend.url"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            size="small"
                            {...field}
                            fullWidth
                            disabled={filesRepo.backend != null || isDisabled}
                            label={labelConfiguracion.urlRepositorio}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            inputRef={field.ref}
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <GitHubIcon />
                                    <GitlabIcon sx={{ marginLeft: 1, fontSize: 16 }} />
                                  </InputAdornment>
                                ),
                              },
                            }}
                          />
                        )}
                      />
                    </Grid2>
                    <Grid2 size={{ md: 2, xs: 12 }}>
                      <InputFile layer="backend" disabled={isDisabled} />
                    </Grid2>
                  </Grid2>
                  <TechnologyInputs disabled={isDisabled} fieldName="backend" />
                  <EnviromentVariablesEditor disabled={isDisabled} type="backend" />
                </>
              )}

              {watch("integrado") && (
                <>
                  <Typography variant="h6">{labelConfiguracion.integrado}</Typography>
                  <Grid2 container spacing={1}>
                    <Grid2 size={{ md: 10, xs: 12 }}>
                      <Controller
                        name="integrado.url"
                        control={control}
                        render={({ field, fieldState }) => (
                          <TextField
                            size="small"
                            {...field}
                            fullWidth
                            label={labelConfiguracion.urlRepositorio}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            disabled={filesRepo.integrado != null || isDisabled}
                            inputRef={field.ref}
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <GitHubIcon />
                                    <GitlabIcon sx={{ marginLeft: 1, fontSize: 16 }} />
                                  </InputAdornment>
                                ),
                              },
                            }}
                          />
                        )}
                      />
                    </Grid2>
                    <Grid2 size={{ md: 2, xs: 12 }}>
                      <InputFile layer="integrado" disabled={isDisabled} />
                    </Grid2>
                  </Grid2>
                  <TechnologyInputs disabled={isDisabled} fieldName="integrado" />
                  <EnviromentVariablesEditor disabled={isDisabled} type="integrado" />
                </>
              )}
            </Stack>

            <Stack alignItems={"end"}>
              {!isDisabled && (
                <Box>
                  <GeneralButton
                    loading={isPending}
                    mode={type == "create" ? buttonTypes.next : buttonTypes.save}
                    type="submit"
                  />
                </Box>
              )}
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
}
