import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "@modules/general/components/alertDialog";
import GeneralButton from "@modules/general/components/button";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import { ParamsContext } from "@modules/general/context/paramsContext";
import { StepperContext } from "@modules/general/context/stepperContex";
import { buttonTypes } from "@modules/general/types/buttons";
import { getAllAcademicInformation } from "@modules/materias/services/get.materias.services";
import {
  patchEditImgProject,
  patchEditProject,
} from "@modules/proyectos/services/patch.edit.project";
import { postCreateProject } from "@modules/proyectos/services/post.create.project";
import {
  ProyectoSchema,
  ProyectoInformationSchema,
} from "@modules/proyectos/utils/forms/proyecto.schema";
import { getProjectTypesMap } from "@modules/proyectos/utils/getProjectTypes";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useFormContext, Controller, useForm } from "react-hook-form";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { urlToBlob } from "@modules/general/utils/urlToBlod";
import HiddenButton from "@modules/materias/components/hiddenInput";
import { useExecutionStatusContext } from "@modules/proyectos/context/executionStatus.context";
import { getProjectById } from "@modules/proyectos/services/get.project";
import { syncErrorProject } from "../../executionState";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import {
  hasValidExtension,
  msgNoValidExtension,
  VALID_EXTENSIONS,
} from "@modules/general/utils/form/validExtensions";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import { msgDescription } from "@modules/general/utils/formConstrains";

type Props = {
  type: "edit" | "create";
};

/**
 * Information component – a form used to create or edit project information, including
 * project title, description, and related academic data (e.g., materia, curso, seccion).
 *
 * This component handles form submissions for both creating and editing a project. It also
 * integrates with external services to fetch academic information and manage project
 * data creation or editing. The component is designed to display a form with different
 * fields depending on the operation type (`create` or `edit`), including project details
 * and academic information selection.
 *
 * @component
 *
 * @param {("edit" | "create")} type - The type of operation to perform, either "edit"
 * or "create". This determines the form's behavior (editing an existing project or
 * creating a new one).
 *
 * @returns {JSX.Element} A form component for creating or editing project information.
 *
 * @example
 * ```tsx
 * <Information type="create" />
 * <Information type="edit" />
 * ```
 */
export const Information = ({ type }: Props) => {
  const { getValues: getValuesPrincipal } = useFormContext<ProyectoSchema>();
  const { updateSearchParams, searchParams } = useContext(ParamsContext);
  const { token, tipo, id } = useAuth().accountInformation;
  const { handleNext } = useContext(StepperContext);

  const [img, setImg] = useState<null | string | undefined>(
    getValuesPrincipal("imagen")
  );

  useEffect(() => {
    if (getValuesPrincipal("imagen")) setImg(getValuesPrincipal("imagen"));
  }, []);

  const [fileImg, setFileImg] = useState<null | undefined | Blob>(undefined);

  const {
    control,
    formState: { errors, isDirty },
    watch,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<ProyectoInformationSchema>({
    defaultValues: getValuesPrincipal(),
    resolver: zodResolver(ProyectoInformationSchema),
  });

  const [prevRenderNull, setPrevRenderNull] = useState(true);

  useEffect(() => {
    if (prevRenderNull) return;
    setValue("materiaInformacion.cursoId", null);
    setValue("materiaInformacion.seccionId", null);
  }, [getValues("materiaInformacion.materiaId")]);

  useEffect(() => {
    if (prevRenderNull) return;
    setValue("materiaInformacion.seccionId", null);
  }, [getValues("materiaInformacion.cursoId")]);

  useEffect(() => {
    if (
      searchParams.get("materia") &&
      searchParams.get("curso") &&
      searchParams.get("seccion")
    ) {
      setValue(
        "materiaInformacion.materiaId",
        parseInt(searchParams.get("materia") ?? "0") ?? null
      );
      setValue("materiaInformacion.cursoId", searchParams.get("curso") ?? null);
      setValue(
        "materiaInformacion.seccionId",
        parseInt(searchParams.get("seccion") ?? "0") ?? null
      );
    }
  }, [searchParams]);

  useEffect(() => {
    setPrevRenderNull(false);
  }, []);

  const {
    handleAccept,
    handleClose,
    handleCancel,
    isLoading,
    message,
    open,
    title,
    type: dialogType,
    showDialog,
    setIsLoading,
  } = useAlertDialog2();

  const { setError } = useErrorReader(showDialog);

  const {
    data: dataMaterias,
    isLoading: isLoadingMaterias,
    error: errorDataMaterias,
  } = useQuery({
    queryFn: async () => getAllAcademicInformation(token, tipo, id, true),
    queryKey: ["Get All Academic Information", token, tipo, id],
  });

  const [localLoading, setLocalLoading] = useState<boolean>(false);

  useEffect(() => {
    if (errorDataMaterias) {
      setError(errorDataMaterias);
    }
  }, [errorDataMaterias]);

  const [flagChangeImg, setFlagChangeImg] = useState<boolean>(false);

  const [dataCreate, setDateCreate] = useState<undefined | { id: number }>(
    undefined
  );

  const { mutate: mutateCreate } = useMutation({
    mutationFn: () => postCreateProject(token, getValues()),
    mutationKey: ["Create Project", getValues(), token],
    onError: (err) => {
      setError(err);
      setLocalLoading(false);
    },
    onSuccess: (data) => {
      setDateCreate(data);
    },
  });

  const { executionState } = useExecutionStatusContext();

  const { mutate: mutateEdit, isPending: isPendingEdit } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      const currentStatus = await getProjectById(
        token,
        getValuesPrincipal("id") ?? -1
      );

      const callback = (): ProyectoInformationSchema => {
        if (img) return getValues();
        else {
          return { ...getValues(), imagen: null };
        }
      };

      if (executionState && currentStatus.estado_ejecucion != executionState)
        syncErrorProject();
      const dataForRequest = callback();
      await patchEditProject(token, getValues("id") ?? -1, {
        descripcion: dataForRequest.descripcion ?? "",
        imagen: dataForRequest.imagen,
        tipo_proyecto: dataForRequest.tipo,
        titulo: dataForRequest.titulo,
        seccionId: dataForRequest.materiaInformacion.seccionId ?? -1,
      });

      if (fileImg) {
        await patchEditImgProject(token, getValues("id") ?? 0, fileImg);
      }
    },
    mutationKey: ["Edit Project", token],
    onError: setError,
    onSuccess: () => {
      showDialog({
        message: "Información actualizada correctamente",
        type: "success",
        title: "Edición Exitosa",
        onAccept: () => handleClose(),
        reload: true,
      });
    },
  });

  useEffect(() => {
    if (!dataCreate) return;
    updateSearchParams("id", dataCreate.id.toString());
  }, [dataCreate]);

  useEffect(() => {
    if (dataCreate) handleNext();
  }, [searchParams]);

  function onSubmit() {
    if (type === "edit") {
      showDialog({
        title: "Confirmar Edición",
        message: "¿Está seguro de guardar los cambios?",
        onAccept: () => mutateEdit(),
        onCancel: () => handleClose(),
        isLoading: isPendingEdit,
      });
    } else {
      setLocalLoading(true);
      mutateCreate();
    }
  }

  if (!dataMaterias) return <LoaderElement />;

  const {
    getCursosByMateria,
    getSeccionByCurso,
    selectCurso,
    selectMaterias,
    selectSeccion,
  } = dataMaterias;

  const currentMateriaId = watch("materiaInformacion.materiaId");
  const currentCursoId = watch("materiaInformacion.cursoId");

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={open}
        title={title}
        textBody={message}
        isLoading={isLoading}
        type={dialogType}
      />
      {isLoadingMaterias && !dataMaterias ? (
        <LoaderElement />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {type == "create" && <TransitionAlert />}
          <Stack spacing={2}>
            <Typography variant="h5">{"Información"}</Typography>
            <Grid container rowSpacing={2} spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="titulo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      fullWidth
                      label="Nombre del proyecto"
                      error={!!errors.titulo}
                      helperText={errors.titulo?.message?.toString()}
                    />
                  )}
                />
              </Grid>
              <Grid size={12}>
                <Controller
                  name="descripcion"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      fullWidth
                      label="Descripción"
                      multiline
                      rows={4}
                      error={!!errors.descripcion}
                      helperText={
                        errors.descripcion?.message?.toString() ??
                        (watch("descripcion") &&
                          msgDescription(watch("descripcion")!.length))
                      }
                    />
                  )}
                />
              </Grid>
              <>
                <Grid size={{ md: 4, xs: 12 }}>
                  <Controller
                    name="materiaInformacion.materiaId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        size="small"
                        fullWidth
                        {...field}
                        select
                        label="Materia"
                        error={!!errors.materiaInformacion?.materiaId}
                        helperText={errors.materiaInformacion?.materiaId?.message?.toString()}
                      >
                        {Array.from(selectMaterias.entries()).map(
                          ([value, label]) => (
                            <MenuItem value={value} key={value}>
                              {label}
                            </MenuItem>
                          )
                        )}
                      </TextField>
                    )}
                  />
                </Grid>

                <Grid size={{ md: 4, xs: 12 }}>
                  {currentMateriaId &&
                    getCursosByMateria.get(currentMateriaId) && (
                      <Controller
                        name="materiaInformacion.cursoId"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            size="small"
                            fullWidth
                            {...field}
                            select
                            label="Curso"
                            error={!!errors.materiaInformacion?.cursoId}
                            helperText={errors.materiaInformacion?.cursoId?.message?.toString()}
                          >
                            {Array.from(
                              getCursosByMateria.get(
                                watch("materiaInformacion.materiaId") ?? 0
                              ) || []
                            ).map((curso) => (
                              <MenuItem value={curso} key={curso}>
                                {selectCurso.get(curso)}
                              </MenuItem>
                            ))}
                          </TextField>
                        )}
                      />
                    )}
                </Grid>
                <Grid size={{ md: 4, xs: 12 }}>
                  {currentCursoId && getSeccionByCurso.get(currentCursoId) && (
                    <Controller
                      name="materiaInformacion.seccionId"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          size="small"
                          fullWidth
                          {...field}
                          select
                          label="Actividad"
                          error={!!errors.materiaInformacion?.seccionId}
                          helperText={errors.materiaInformacion?.seccionId?.message?.toString()}
                        >
                          {getSeccionByCurso.get(currentCursoId)?.map(
                            (seccionId) =>
                              selectSeccion.get(seccionId) && (
                                <MenuItem
                                  value={seccionId}
                                  key={`${currentCursoId}-${seccionId}`}
                                >
                                  {selectSeccion.get(seccionId)}
                                </MenuItem>
                              )
                          )}
                        </TextField>
                      )}
                    />
                  )}
                </Grid>
              </>
            </Grid>

            <Grid size={12}>
              <Controller
                name="tipo"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    fullWidth
                    {...field}
                    select
                    label="Tipo de proyecto"
                    error={!!errors.tipo}
                    disabled={type == "edit" && executionState == "N"}
                    helperText={errors.tipo?.message?.toString()}
                  >
                    {Array.from(getProjectTypesMap.entries()).map(
                      ([key, label]) => (
                        <MenuItem value={key} key={key}>
                          {label}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                )}
              />
            </Grid>

            {type == "edit" && (
              <Grid size={12}>
                <ImagContainer
                  currentImg={img}
                  setCurrentImg={setImg}
                  setFile={setFileImg}
                  setFlag={setFlagChangeImg}
                />
              </Grid>
            )}

            <Stack alignItems={"end"}>
              {(isDirty || flagChangeImg) && (
                <Stack alignItems="end">
                  <Box>
                    <GeneralButton
                      size="small"
                      loading={type === "create" ? localLoading : isPendingEdit}
                      type="submit"
                      mode={
                        type === "create" ? buttonTypes.next : buttonTypes.save
                      }
                    />
                  </Box>
                </Stack>
              )}
            </Stack>
          </Stack>
        </form>
      )}
    </>
  );
};

type PropsImageContainer = {
  currentImg: string | null | undefined;
  setCurrentImg: React.Dispatch<string | null | undefined>;
  setFile: React.Dispatch<Blob | undefined | null>;
  setFlag: React.Dispatch<boolean>;
};
const ImagContainer: React.FC<PropsImageContainer> = ({
  currentImg,
  setCurrentImg,
  setFile,
  setFlag,
}) => {
  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      if (!hasValidExtension(event.target.files[0].name, "IMAGE")) {
        showError();
        return;
      }
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        const imgUrl = e.target?.result as string;
        setCurrentImg(imgUrl);
        setFlag(true);

        const blob = await urlToBlob(imgUrl);
        setFile(blob);
      };

      reader.readAsDataURL(file);
    }
  };

  const { showDialog, handleClose } = useAlertDialogContext();

  function showError() {
    showDialog({
      message: msgNoValidExtension("IMAGE"),
      title: "Archivo no valido",
      onAccept: handleClose,
      type: "error",
    });
  }

  const ref = useRef<HTMLInputElement>(null);

  function handleReference() {
    if (ref) ref.current?.click();
  }

  function handleDelete() {
    setFile(null);
    setCurrentImg(null);
    setFlag(true);
  }

  return (
    <Box
      sx={
        currentImg
          ? {
              display: "flex",
              maxWidth: 300,
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }
          : {}
      }
    >
      {currentImg && (
        <Box
          component={"img"}
          src={currentImg ?? ""}
          sx={{
            width: "300px",
            height: "170px",
            objectFit: "contain",
            border: "1px solid rgb(0,0,0,0.2)",
          }}
        />
      )}
      {/* <Alert severity="info">La resolución de la imagen debe ser de mínimo 300x170px</Alert> */}
      <Stack>
        <label htmlFor="upload-photo">
          <HiddenButton
            accept={VALID_EXTENSIONS.IMAGE.join(", ")}
            id="upload-photo"
            type="file"
            onChange={handlePhotoChange}
            ref={ref}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReference}
          >
            Cambiar imagen
          </Button>
          <Tooltip title="Eliminar Archivo">
            <IconButton disabled={currentImg == null} onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </label>
      </Stack>
    </Box>
  );
};

function TransitionAlert() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <Typography>
            {
              "Los proyectos se vinculan a secciones de cursos, por lo cual es indispensable encontrarse en un curso que tenga una actividad habilitada para poder crear un proyecto"
            }
          </Typography>
        </Alert>
      </Collapse>
    </Box>
  );
}
