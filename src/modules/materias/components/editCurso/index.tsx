import { Curso } from "@modules/materias/types/curso";
import { CursoSchema } from "@modules/materias/utils/forms/form.schema";
import {
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import { getMateriaStatesArray } from "@modules/materias/utils/materias";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCursoById, getCursos } from "@modules/materias/services/get.curso";
import { useEffect, useState } from "react";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import { patchEditCurso } from "@modules/materias/services/patch.curso";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import TablaGestionarSecciones from "@modules/materias/components/tablaSecciones";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import LoaderElement from "@modules/general/components/loaderElement";
import GestionarEstudiantesCurso from "@modules/materias/components/gestionarEstudiantesCurso";
import { useSearchUsers, UsuarioCampoBusqueda } from "@modules/general/hooks/useSearchUsers";
import SearchUsers from "@modules/general/components/searchUsers";
import { adaptUserServiceToCB } from "@modules/usuarios/utils/adapt.usuario";
import { getUsuariosByTypeService } from "@modules/usuarios/services/get.usuarios.[tipo]";
import SchoolIcon from "@mui/icons-material/School";
import InfoIcon from "@mui/icons-material/Info";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AlertDialog from "@modules/general/components/alertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { labelEditCourse } from "@modules/materias/enums/labelEditCourse";
import { postCreateCursoService } from "@modules/materias/services/post.crear.grupo";
import { getSemestre } from "@modules/general/utils/fechas";
import { msgDescription } from "@modules/general/utils/formConstrains";
import {
  letterOptionsForGroup,
  OFF_SET_LETTERS_OF_GROUP,
} from "@modules/materias/utils/groupLetters";

type EditarCursoProps = {
  type: "create" | "edit";
};
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import WarningIcon from "@mui/icons-material/Warning";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { rutasMaterias } from "@modules/materias/router/routes";

/**
 * EditarCurso component – manages the creation or editing of a course within a subject.
 *
 * This component handles form management, tab navigation, course data fetching, and mutation for
 * creating or updating course records. It adapts UI dynamically based on the operation type (create/edit)
 * and integrates feedback dialogs, validations, and contextual UI behavior.
 *
 * @component
 *
 * @param type Indicates whether the component is used to "create" a new course or "edit" an existing one.
 *
 * @returns Returns a React component with a form to manage a course's information and enrolled students.
 *
 * @example
 * ```tsx
 * <EditarCurso type="edit" />
 * ```
 */
function EditarCurso({ type }: EditarCursoProps) {
  // Custom hooks and React states
  const { idCurso } = useParams();
  const { idMateria } = useParams();
  const { accountInformation } = useAuth();
  const { token, tipo } = accountInformation;
  const [curso, setCurso] = useState<Curso | undefined>(undefined);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "0");
  const [tabIndex, setTabIndex] = useState(page);

  type LetterOption = [string, boolean];

  useEffect(() => {
    setTabIndex(page);
  }, [page]);

  /**
   * Handles tab change and updates search params accordingly.
   */
  function handleChangeTab(_event: React.SyntheticEvent, value: number) {
    setTabIndex(value);
    setSearchParams({ ["page"]: value.toString() });
  }

  const { data } = useQuery({
    queryFn: async () => await getCursos(token, { materia: parseInt(idMateria ?? "-1") }),
    queryKey: ["Get Curso", idMateria, token],
  });

  // Form setup
  const methods = useForm<Curso>({
    resolver: zodResolver(CursoSchema),
    defaultValues: {
      descripcion: "",
      semestre: getSemestre(),
      estado: "A",
      grupo: "",
    },
  });

  const { getValues, control, formState, watch } = methods;
  const { errors, isDirty } = formState;

  const {
    showDialog,
    open,
    title,
    message,
    handleClose,
    type: typeAlert,
    handleAccept,
    isLoading,
    handleCancel,
    setIsLoading,
  } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  /**
   * Fetch course data by ID.
   */
  const {
    data: dataFetchCurso,
    isLoading: isLoadingFetchCurso,
    error: errorFetchCurso,
  } = useQuery({
    queryKey: ["Fetch Curso", idCurso ?? "-1"],
    queryFn: () => getCursoById(token, idCurso ?? "-1"),
    retry: 2,
  });

  const [lettersOfCourse, setLettersOfCourse] = useState<LetterOption[]>([]);

  const INITIAL_LETTER_OPTIONS: LetterOption[] = letterOptionsForGroup().map((x) => [x, true]);

  useEffect(() => {
    setLettersOfCourse(INITIAL_LETTER_OPTIONS);
  }, []);

  const REGEX_LETTER = /^[A-Z]$/;

  useEffect(() => {
    if (data) {
      const options = INITIAL_LETTER_OPTIONS;
      data.forEach((curso) => {
        const letter = curso.grupo;
        if (REGEX_LETTER.test(letter)) {
          options[letter.charCodeAt(0) - OFF_SET_LETTERS_OF_GROUP][1] = false;
        }
      });
      setLettersOfCourse(options);
    }
  }, [data]);

  /**
   * Mutation for editing course.
   */
  const { mutate: mutatePatchCurso, isPending: isPendingPatchCurso } = useMutation({
    mutationFn: async (curso: Curso) => {
      setIsLoading(true);
      return await patchEditCurso(token, curso);
    },
    onSuccess: () =>
      showDialog({
        message: "Curso modificado correctamente",
        title: "Modificar Curso",
        type: "success",
        onAccept: handleClose,
        reload: true,
      }),
    onError: (err) => setError(err),
  });

  /**
   * Mutation for editing course.
   */
  const { mutate: mutateCreateCurso, isPending: isPendingCreateCurso } = useMutation({
    mutationFn: async (curso: Curso) => {
      setIsLoading(true);
      return await postCreateCursoService(token, parseInt(idMateria || "-1"), curso);
    },
    mutationKey: ["Create Curso", methods.getValues(), token],
    onSuccess: () =>
      showDialog({
        message: "Curso creado correctamente",
        title: "Creación de Curso",
        type: "success",
        onAccept: handleClose,
        reload: true,
      }),
    onError: (err) => setError(err),
  });

  useEffect(() => {
    if (errorFetchCurso && type == "edit") {
      setError(errorFetchCurso);
    }
  }, [errorFetchCurso]);

  useEffect(() => {
    if (dataFetchCurso) {
      setCurso(adaptCursoService(dataFetchCurso));
    }
  }, [dataFetchCurso]);

  useEffect(() => {
    if (curso) {
      methods.reset(curso);
    }
  }, [curso, methods.reset]);

  const navigate = useNavigate();

  function leftCourse() {
    showDialog({
      message: "¿Está seguro de que desea desvincularse del curso?",
      title: "Gestionar Curso",
      onAccept: () => {
        mutatePatchCurso(
          { ...methods.getValues(), docente: null },
          {
            onSuccess: () => {
              showDialog({
                message: "Te haz desvinculado del curso de manera correcta.",
                title: "Desvinculación correcta",
                type: "success",
                onAccept: () => navigate(rutasMaterias.listarMisCursos),
              });
            },
          }
        );
      },

      onCancel: handleClose,
    });
  }

  /**
   * Handles form submission for course update.
   */
  const onSubmit = async () => {
    type == "create"
      ? await mutateCreateCurso(methods.getValues())
      : await mutatePatchCurso(methods.getValues());
  };

  return (
    <>
      {/* Dialog for displaying feedback messages */}
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        handleCancel={handleCancel}
        title={title}
        textBody={message}
        type={typeAlert}
        isLoading={isLoading}
      />

      {/* Loader while fetching course */}
      {isLoadingFetchCurso ? (
        <LoaderElement />
      ) : (
        <FormProvider {...methods}>
          <Stack spacing={3} component={Paper} sx={{ padding: 2 }}>
            {/* Page title */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <EditIcon color="primary" />
              <Typography variant="h5" fontWeight="bold">
                {type == "edit" ? labelEditCourse.title : labelEditCourse.alternativeTitle}
              </Typography>
            </Stack>

            {/* Tab Navigation */}
            <Tabs
              value={tabIndex}
              onChange={handleChangeTab}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                textTransform: "none",
              }}
            >
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <InfoIcon />
                    <Typography fontWeight={500}>Información</Typography>
                  </Stack>
                }
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label={
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <PeopleAltIcon />
                    <Typography fontWeight={500}>Estudiantes</Typography>
                  </Stack>
                }
                sx={{ textTransform: "capitalize" }}
                disabled={type == "create"}
              />
              {tipo == "D" && (
                <Tab
                  label={
                    <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <SettingsSuggestIcon />
                      <Typography fontWeight={500}>Otras Opciones</Typography>
                    </Stack>
                  }
                  sx={{ textTransform: "capitalize" }}
                  disabled={type == "create"}
                />
              )}
            </Tabs>

            {/* Course Info Tab */}
            {tabIndex == 0 && (
              <>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <Stack spacing={3}>
                    <Controller
                      name="grupo"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          size="small"
                          fullWidth
                          label="Grupo"
                          error={!!errors.grupo}
                          helperText={errors.grupo?.message}
                          value={watch("grupo")}
                          disabled={type == "edit"}
                          SelectProps={{
                            MenuProps: {
                              PaperProps: {
                                style: {
                                  maxHeight: 150,
                                },
                              },
                            },
                          }}
                        >
                          {lettersOfCourse.map(([option, valid]) => {
                            if (valid)
                              return (
                                <MenuItem value={option} key={option}>
                                  {option}
                                </MenuItem>
                              );
                          })}
                        </TextField>
                      )}
                    />
                    <TeacherCard />
                    <TextField
                      label={labelEditCourse.description}
                      {...methods.register("descripcion")}
                      error={!!methods.formState.errors.descripcion}
                      multiline
                      helperText={
                        methods.formState.errors.descripcion?.message ??
                        msgDescription(watch("descripcion").length)
                      }
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                    <Controller
                      name="estado"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          size="small"
                          fullWidth
                          label="Estado"
                          error={!!errors.estado}
                          helperText={errors.estado?.message}
                          value={watch("estado") || "A"}
                        >
                          {getMateriaStatesArray.map(([clave, valor]) => (
                            <MenuItem value={clave} key={clave}>
                              {valor}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                    <Box>
                      {isDirty && (
                        <GeneralButton
                          mode={buttonTypes.save}
                          loading={isPendingPatchCurso || isPendingCreateCurso}
                          type="submit"
                        />
                      )}
                    </Box>
                    <Divider />
                  </Stack>
                </form>
                {type == "edit" && <TablaGestionarSecciones />}
              </>
            )}

            {/* Students Tab */}
            {tabIndex == 1 && (
              <Box>
                <GestionarEstudiantesCurso curso={getValues()} idCurso={idCurso || ""} />
              </Box>
            )}
            {tabIndex == 2 && (
              <Stack spacing={3} justifyContent={"center"}>
                <Stack spacing={1}>
                  <Stack spacing={1} direction={"row"} alignItems={"center"}>
                    <Typography variant="h4">{"Zona de Peligro"}</Typography>
                    <WarningIcon sx={{ fontSize: 32 }} />
                  </Stack>
                  <Divider />
                </Stack>
                <Stack spacing={3} direction={"row"} alignItems={"center"}>
                  <Typography variant="h6">{"Abandonar Curso"}</Typography>
                  <Button
                    color="error"
                    variant={"contained"}
                    onClick={leftCourse}
                    endIcon={<ExitToAppIcon />}
                  >
                    {"Abandonar Curso"}
                  </Button>
                </Stack>
              </Stack>
            )}
          </Stack>
        </FormProvider>
      )}
    </>
  );
}

/**
 * TeacherCard component – allows displaying and editing the assigned teacher of a course.
 *
 * It fetches available teachers, displays the current assignment using a chip,
 * and provides controls to select or remove a teacher.
 *
 * @returns Returns a UI element that either shows the current teacher or allows the user to choose one from a list.
 *
 * @example
 * ```tsx
 * <TeacherCard />
 * ```
 */
function TeacherCard() {
  const { setValue: setValuesCurso, watch: watchCurso } = useFormContext<Curso>();
  const [docentes, setDocentes] = useState<UsuarioCampoBusqueda[]>([]);
  const { token, tipo } = useAuth().accountInformation;

  const { showDialog, open, title, message, type, handleAccept, handleCancel, isLoading } =
    useAlertDialog();
  const { setError } = useErrorReader(showDialog);

  /**
   * Fetch list of teachers for selection.
   */
  const {
    data: dataFetchDocentes,
    isLoading: isLoadingFetchDocentes,
    error: errorFetchDocentes,
  } = useQuery({
    queryFn: () => getUsuariosByTypeService("Docente", token),
    queryKey: ["Get Docentes"],
  });

  useEffect(() => {
    if (errorFetchDocentes) {
      setError(errorFetchDocentes);
    }
  }, [errorFetchDocentes]);

  useEffect(() => {
    if (dataFetchDocentes)
      setDocentes(dataFetchDocentes.map((docente) => adaptUserServiceToCB(docente)));
  }, [dataFetchDocentes]);

  const { selectUser, setSelectUser } = useSearchUsers();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (selectUser && selectUser?.nombreCompleto) {
      setValuesCurso("docente.id", selectUser?.id, { shouldDirty: true });
      setValuesCurso("docente.nombre", selectUser?.nombreCompleto!!, {
        shouldDirty: true,
      });
    }
  }, [selectUser]);

  /**
   * Renders teacher field (chip or user selector).
   */
  function Field() {
    if (!edit) {
      if (watchCurso().docente == null)
        return (
          <Chip
            icon={<InfoIcon />}
            label={<Typography variant="body1">Docente sin asignar</Typography>}
          />
        );
      else {
        return (
          <Chip
            icon={<SchoolIcon />}
            color="info"
            label={
              <Typography variant="body1" sx={{ padding: 1 }}>
                {watchCurso("docente.nombre")}
              </Typography>
            }
          />
        );
      }
    } else {
      return (
        <SearchUsers
          loading={isLoadingFetchDocentes}
          selectUser={selectUser}
          setSelectUser={setSelectUser}
          users={docentes}
        />
      );
    }
  }

  function handleMode() {
    setEdit(!edit);
  }

  function handleDelete() {
    setValuesCurso("docente", null, { shouldDirty: true });
  }

  function ButtonMode() {
    return !edit ? (
      <>
        <ActionButton mode={actionButtonTypes.editar} onClick={handleMode} />
        <ActionButton mode={actionButtonTypes.eliminar} onClick={handleDelete} />
      </>
    ) : (
      <>
        <ActionButton mode={actionButtonTypes.guardar} onClick={handleMode} />
        <ActionButton mode={actionButtonTypes.cancelar} onClick={handleMode} />
      </>
    );
  }

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        handleCancel={handleCancel}
        open={open}
        title={title}
        textBody={message}
        type={type}
        isLoading={isLoading}
      />
      <Stack direction={"row"} alignItems={"center"} spacing={1} width={500}>
        <Field />
        {tipo == "A" && <ButtonMode />}
      </Stack>
    </>
  );
}

export default EditarCurso;
