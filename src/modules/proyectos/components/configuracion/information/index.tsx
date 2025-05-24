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
  Grid2,
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

  const [img, setImg] = useState<null | string | undefined>(getValuesPrincipal("imagen"));

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

  useEffect(() => {
    if (searchParams.get("materia") && searchParams.get("curso") && searchParams.get("seccion")) {
      setValue("materiaInformacion.materiaId", parseInt(searchParams.get("materia") ?? "0"));
      setValue("materiaInformacion.cursoId", searchParams.get("curso") ?? "0");
      setValue("materiaInformacion.seccionId", parseInt(searchParams.get("seccion") ?? "0"));
    }
  }, [searchParams]);

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
    queryFn: () => getAllAcademicInformation(token, tipo, id),
    queryKey: ["Get All Academic Information", token, tipo, id],
  });

  useEffect(() => {
    if (errorDataMaterias) {
      setError(errorDataMaterias);
    }
  }, [errorDataMaterias]);

  const [flagChangeImg, setFlagChangeImg] = useState<boolean>(false);

  const {
    mutate: mutateCreate,
    isPending: isPendingCreate,
    data: dataCreate,
    isSuccess: isSuccessCreate,
  } = useMutation({
    mutationFn: () => postCreateProject(token, getValues()),
    mutationKey: ["Create Project"],
    onError: setError,
  });

  const { executionState } = useExecutionStatusContext();

  const { mutate: mutateEdit, isPending: isPendingEdit } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      const currentStatus = await getProjectById(token, getValuesPrincipal("id") ?? -1);

      const callback = (): ProyectoInformationSchema => {
        if (img) return getValues();
        else {
          return { ...getValues(), imagen: null };
        }
      };

      if (executionState && currentStatus.estado_ejecucion != executionState) syncErrorProject();
      await patchEditProject(token, callback());

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
    if (!dataCreate || !isSuccessCreate) return;
    updateSearchParams("id", dataCreate.id.toString());
  }, [dataCreate, isSuccessCreate]);

  useEffect(() => {
    if (dataCreate && isSuccessCreate) handleNext();
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
      mutateCreate();
    }
  }

  if (!dataMaterias) return <LoaderElement />;

  const { getCursosByMateria, getSeccionByCurso, selectCurso, selectMaterias, selectSeccion } =
    dataMaterias;

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
            <Typography variant="h5">Información</Typography>
            <Grid2 container rowSpacing={2} spacing={2}>
              <Grid2 size={{ xs: 12, md: 6 }}>
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
              </Grid2>
              <Grid2 size={12}>
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
                      helperText={errors.descripcion?.message?.toString()}
                    />
                  )}
                />
              </Grid2>
              <>
                <Grid2 size={{ md: 4, xs: 12 }}>
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
                        {Array.from(selectMaterias.entries()).map(([value, label]) => (
                          <MenuItem value={value} key={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid2>

                <Grid2 size={{ md: 4, xs: 12 }}>
                  {getCursosByMateria.get(watch("materiaInformacion.materiaId") ?? 0) && (
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
                            getCursosByMateria.get(watch("materiaInformacion.materiaId") ?? 0) || []
                          ).map((curso) => (
                            <MenuItem value={curso} key={curso}>
                              {selectCurso.get(curso)}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  )}
                </Grid2>

                <Grid2 size={{ md: 4, xs: 12 }}>
                  {getSeccionByCurso.get(watch("materiaInformacion.cursoId") ?? "") && (
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
                          {Array.from(
                            getSeccionByCurso.get(watch("materiaInformacion.cursoId") ?? "") || []
                          ).map((seccionId) => (
                            <MenuItem value={seccionId} key={seccionId}>
                              {selectSeccion.get(seccionId)}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  )}
                </Grid2>
              </>
            </Grid2>

            <Grid2 size={12}>
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
                    {Array.from(getProjectTypesMap.entries()).map(([key, label]) => (
                      <MenuItem value={key} key={key}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid2>

            {type == "edit" && (
              <Grid2 size={12}>
                <ImagContainer currentImg={img} setCurrentImg={setImg} setFile={setFileImg} setFlag={setFlagChangeImg}/>
              </Grid2>
            )}

            <Stack alignItems={"end"}>
              {(isDirty || flagChangeImg) && (
                <Stack alignItems="end">
                  <Box>
                    <GeneralButton
                      size="small"
                      loading={type === "create" ? isPendingCreate : isPendingEdit}
                      type="submit"
                      mode={type === "create" ? buttonTypes.next : buttonTypes.save}
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
  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
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
            accept="image/*"
            id="upload-photo"
            type="file"
            onChange={handlePhotoChange}
            ref={ref}
          />
          <Button variant="outlined" color="secondary" onClick={handleReference}>
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
