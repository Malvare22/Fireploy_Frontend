import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { Box, Divider, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm, useFormContext } from "react-hook-form";
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
import GitHubIcon from "@mui/icons-material/GitHub";
import { KeysOfRepository } from "@modules/proyectos/types/keysOfRepository";
import { GitlabIcon } from "@modules/general/components/customIcons";
import { adaptProject } from "@modules/proyectos/utils/adapt.proyecto";
import TransitionAlert from "@modules/general/components/transitionAlert";
import { deleteFichero, postFichero } from "@modules/proyectos/services/post.fichero";
import InputFileForRepository, { FilesRepository } from "./components/inputFile";
import SelectorLayer from "./components/options";
import ExtraFiles from "./components/extraFiles";

type Props = {
  type: "edit" | "create";
};

/**
 * Repositories component – handles the form for configuring project repositories.
 *
 * This component allows users to manage frontend, backend, and integrated repositories,
 * including uploading compressed files (.zip or .rar), editing URLs, assigning technologies,
 * managing environment variables, and associating additional files. It supports both
 * creation and editing modes, with validation and visual feedback.
 *
 * It uses `react-hook-form` for form state, `react-query` for mutations, and custom hooks
 * for dialog handling and error parsing.
 *
 * @component
 *
 * @param {string} type - Indicates whether the component is used for creating or editing repositories. Accepts `"edit"` or `"create"`.
 *
 * @returns {JSX.Element} A form-based component for managing repositories with uploading, validation, and file association features.
 *
 * @example
 * ```tsx
 * <Repositories type="edit" />
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

  const { getValues, control, reset, setValue, watch } = methods;

  //Reset form
  useEffect(() => {
    reset(getValuesProject());
  }, [getValuesProject("backend"), getValuesProject("frontend"), getValuesProject("integrado")]);

  const alertVariables = useAlertDialog2();

  const { setError: setErrorInDialogElement } = useErrorReader(alertVariables.showDialog);

  const [filesRepo, setFilesRepo] = useState<FilesRepository>({
    backend: null,
    frontend: null,
    integrado: null,
  });

  const { executionState: currentStateOfProject } = useExecutionStatusContext();

  async function setChangeInProjectRepositories() {
    let fetchProject = await getProjectById(token, getValuesProject("id") ?? -1);
    let front = false;
    let back = false;
    let inte = false;
    alertVariables.setIsLoading(true);
    if (
      type == "create" ||
      (currentStateOfProject &&
        fetchProject &&
        fetchProject.estado_ejecucion == currentStateOfProject)
    ) {
      if (filesRepo.backend != null) {
        await postFileToRepository(token, filesRepo.backend, getValuesProject("backend.id") ?? -1);
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

      const setFicheros = async (field: KeysOfRepository) => {
        const ficheros = getValuesProject(`${field}.ficheros`);

        const id = getValuesProject(`${field}.id`) ?? -1;
        if (ficheros) {
          for (const fichero of ficheros) {
            if (fichero.id) await deleteFichero(token, fichero.id);
          }
        }
        const currentFicheros = getValues(`${field}.ficheros`);

        if (currentFicheros) {
          for (const fichero of currentFicheros) {
            await postFichero(token, fichero, id);
          }
        }
      };

      await patchEditRepository(token, myData);

      await setFicheros("backend");
      await setFicheros("frontend");
      await setFicheros("integrado");

      return;
    }

    syncErrorProject();
  }

  const { mutate, isPending } = useMutation({
    mutationFn: setChangeInProjectRepositories,
  });

  function handleMutate(options: { isEdit: boolean }) {
    mutate(undefined, {
      onSuccess: () => {
        if (options.isEdit) {
          alertVariables.showDialog({
            message: "Repositorios actualizados correctamente",
            type: "success",
            title: "Éxito",
            onAccept: () => {
              alertVariables.handleClose;
            },
            reload: true,
          });
        } else {
          handleNext();
        }
      },
      onError: (error) => {
        setErrorInDialogElement(error);
      },
    });
  }

  function onSubmit() {
    if (type === "edit") {
      alertVariables.showDialog({
        title: "Cambios Repositorio",
        message: "¿Está seguro de que desea modificar la información de repositorios?",
        onAccept: () => handleMutate({ isEdit: true }),
        onCancel: () => alertVariables.handleClose(),
        isLoading: isPending,
      });
    } else {
      handleMutate({ isEdit: false });
    }
  }

  const isDisabled = currentStateOfProject === "N";

  const [selectLayer, setSelectLayer] = useState<KeysOfRepository | undefined>(undefined);

  useEffect(() => {
    if (getValuesProject("integrado")) setSelectLayer("integrado");

    if (getValuesProject("backend")) setSelectLayer("backend");

    if (getValuesProject("frontend")) setSelectLayer("frontend");
  }, [getValuesProject("backend"), getValuesProject("frontend"), getValuesProject("integrado")]);

  return (
    <>
      <AlertDialog
        open={alertVariables.open}
        title={alertVariables.title}
        textBody={alertVariables.message}
        isLoading={alertVariables.isLoading}
        type={alertVariables.type}
        handleAccept={alertVariables.handleAccept}
        handleCancel={alertVariables.handleCancel}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Stack>
              {type == "edit" && (
                <TransitionAlert severity="warning">
                  {
                    "Para que surjan efecto los cambios realizados en esta sección, se requiere volver a sincronizar el aplicativo"
                  }
                </TransitionAlert>
              )}
              <Typography variant="h5">{labelConfiguracion.repositorios}</Typography>
              <Divider />
            </Stack>
            <Typography variant="body2">{labelConfiguracion.repositoriosParrafo}</Typography>

            <TransitionAlert severity="info">
              {"Se requiere que los repositorios se encuentren en estado público"}
            </TransitionAlert>

            {selectLayer && selectLayer != "integrado" && (
              <>
                <SelectorLayer selectLayer={selectLayer} setSelectLayer={setSelectLayer} />
              </>
            )}

            {selectLayer == "frontend" && watch("frontend") && (
              <>
                <Typography variant="h6">{labelConfiguracion.frontend}</Typography>
                <Grid container spacing={1}>
                  <Grid size={{ md: 7, xs: 12 }}>
                    <Controller
                      name="frontend.url"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          size="small"
                          {...field}
                          fullWidth
                          disabled={filesRepo.frontend != null || isDisabled}
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
                  </Grid>
                  <Grid size={{ md: 5, xs: 12 }}>
                    <InputFileForRepository
                      layer="frontend"
                      disabled={isDisabled}
                      alertVariables={alertVariables}
                      files={filesRepo}
                      setFiles={setFilesRepo}
                      setValue={setValue}
                    />
                  </Grid>
                </Grid>
                <TechnologyInputs fieldName="frontend" disabled={isDisabled} />
                <ExtraFiles isDisabled={isDisabled} layer="frontend" />
              </>
            )}

            {selectLayer == "backend" && watch("backend") && (
              <>
                <Typography variant="h6">{labelConfiguracion.backend}</Typography>
                <Grid container spacing={1}>
                  <Grid size={{ md: 7, xs: 12 }}>
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
                  </Grid>
                  <Grid size={{ md: 5, xs: 12 }}>
                    <InputFileForRepository
                      layer="backend"
                      disabled={isDisabled}
                      alertVariables={alertVariables}
                      files={filesRepo}
                      setFiles={setFilesRepo}
                      setValue={setValue}
                    />
                  </Grid>
                </Grid>
                <TechnologyInputs disabled={isDisabled} fieldName="backend" />
                <ExtraFiles isDisabled={isDisabled} layer="backend" />
              </>
            )}

            {selectLayer == "integrado" && watch("integrado") && (
              <>
                <Typography variant="h6">{labelConfiguracion.integrado}</Typography>
                <Grid container spacing={1}>
                  <Grid size={{ md: 7, xs: 12 }}>
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
                  </Grid>
                  <Grid size={{ md: 5, xs: 12 }}>
                    <InputFileForRepository
                      layer="integrado"
                      disabled={isDisabled}
                      alertVariables={alertVariables}
                      files={filesRepo}
                      setFiles={setFilesRepo}
                      setValue={setValue}
                    />
                  </Grid>
                </Grid>
                <TechnologyInputs disabled={isDisabled} fieldName="integrado" />
                <ExtraFiles isDisabled={isDisabled} layer="integrado" />
              </>
            )}

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
