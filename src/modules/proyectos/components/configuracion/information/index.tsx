import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "@modules/general/components/alertDialog";
import GeneralButton from "@modules/general/components/button";
import LoaderElement from "@modules/general/components/loaderElement";
import { useAuth } from "@modules/general/context/accountContext";
import { ParamsContext } from "@modules/general/context/paramsContext";
import { StepperContext } from "@modules/general/context/stepperContex";
import { buttonTypes } from "@modules/general/types/buttons";
import { getAllAcademicInformation } from "@modules/materias/services/get.materias.services";
import { patchEditProject } from "@modules/proyectos/services/patch.edit.project";
import { postCreateProject } from "@modules/proyectos/services/post.create.project";
import {
  ProyectoSchema,
  ProyectoInformationSchema,
} from "@modules/proyectos/utils/forms/proyecto.schema";
import { getProjectTypesMap } from "@modules/proyectos/utils/getProjectTypes";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useFormContext, Controller, useForm } from "react-hook-form";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { urlToBlob } from "@modules/general/utils/urlToBlod";
import HiddenButton from "@modules/materias/components/hiddenInput";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const [_fileImg, setFileImg] = useState<null | undefined | Blob>(undefined);

  const {
    control,
    formState: { errors },
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
    queryKey: ["Get All Academic Information"],
  });

  useEffect(() => {
    if (errorDataMaterias) {
      setError(errorDataMaterias);
    }
  }, [errorDataMaterias]);

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

  const { mutate: mutateEdit, isPending: isPendingEdit } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      await patchEditProject(token, getValues());
      // if(fileImg != undefined){
      //   await 
      // }
    },
    mutationKey: ["Edit Project"],
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
        handleCancel={handleClose}
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
              <ImagContainer
                currentImg={img}
                initialImg=""
                setCurrentImg={setImg}
                setFile={setFileImg}
              />

              {type == "create" && (
                <>
                  <Grid2 size={4}>
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

                  <Grid2 size={4}>
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
                              getCursosByMateria.get(watch("materiaInformacion.materiaId") ?? 0) ||
                                []
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

                  <Grid2 size={4}>
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
                            label="Sección"
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
              )}
            </Grid2>

            {type == "create" && (
              <Grid2 size={8}>
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
            )}

            <Stack alignItems={"end"}>
              {type == "create" ? (
                <Box>
                  <GeneralButton
                    size="small"
                    loading={isPendingCreate}
                    type="submit"
                    mode={buttonTypes.next}
                  />
                </Box>
              ) : (
                <Box>
                  <GeneralButton
                    loading={isPendingCreate}
                    type="submit"
                    mode={buttonTypes.save}
                  />
                </Box>
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
  initialImg: string;
  setFile: React.Dispatch<Blob | undefined | null>;
};
const ImagContainer: React.FC<PropsImageContainer> = ({
  currentImg,
  initialImg,
  setCurrentImg,
  setFile,
}) => {
  useEffect(() => {
    const f = async () => {
      if (currentImg) {
        if (currentImg != initialImg) setFile(await urlToBlob(currentImg));
      } else if (!currentImg) {
        setFile(null);
        if (ref.current) {
          ref.current.value = "";
        }
      }
    };
    f();
  }, [currentImg]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setCurrentImg(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const ref = useRef<HTMLInputElement>(null);

  function handleReference() {
    if (ref) ref.current?.click();
  }

  const handleRemovePhoto = () => {
    setCurrentImg(null);
  };

  return (
    <Box>
      {currentImg && (
        <Box
          component={"img"}
          src={currentImg ?? ""}
          sx={{ width: "300px", height: "170px", objectFit: "contain" }}
        />
      )}
      {/* <Alert severity="info">La resolución de la imagen debe ser de mínimo 300x170px</Alert> */}
      <Box>
        <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"center"}>
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
          </label>
          <IconButton onClick={handleRemovePhoto} disabled={!currentImg}>
            <DeleteIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};
