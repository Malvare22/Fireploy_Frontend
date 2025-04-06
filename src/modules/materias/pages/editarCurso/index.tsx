import { Curso } from "@modules/materias/types/curso";
import { CursoSchema } from "@modules/materias/utils/forms/form.schema";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import { getMateriaStatesArray } from "@modules/materias/utils/materias";
import { zodResolver } from "@hookform/resolvers/zod";
import useQuery from "@modules/general/hooks/useQuery";
import { getCursoById } from "@modules/materias/services/get.curso";
import { useContext, useEffect, useMemo, useState } from "react";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import AlertDialog from "@modules/general/components/alertDialog";
import { patchEditCurso } from "@modules/materias/services/patch.curso";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { CursoService } from "@modules/materias/types/curso.service";
import TablaEstudiantesEditarCurso from "@modules/materias/components/tablaEstudiantesEditarCurso";
import Modal from "@modules/general/components/modal";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import AddUsers from "@modules/usuarios/components/addUsers";
import { patchEstudiantesCurso } from "@modules/materias/services/patch.curso.estudiantes";
import TablaGestionarSecciones from "@modules/materias/components/tablaSecciones";
import { UsuarioCampoBusqueda } from "@modules/general/hooks/useSearchUsers";
import { postCreateSeccion } from "@modules/materias/services/post.crear.seccion";
import { patchEditSeccion } from "@modules/materias/services/patch.modificar.seccion";
import { Seccion } from "@modules/materias/types/seccion";
import { useAuth } from "@modules/general/context/accountContext";

export enum labelEditarCurso {
  titulo = "Editar Curso",
  descripcion = "Descripción",
  estado = "Estado",
  secciones = "Secciones",
  tituloModalEstudiante = "Agregar Estudiantes",
}

function EstadoField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<Curso>();

  return (
    <Controller
      name="estado"
      control={control}
      render={({ field }) => (
        <TextField
          select
          size="small"
          {...field}
          error={!!errors.estado}
          helperText={errors.estado?.message}
        >
          {getMateriaStatesArray.map(([clave, valor]) => (
            <MenuItem value={clave} key={clave}>
              {valor}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}

function VistaEditarCurso() {
  const { idCurso } = useParams();
  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  const [curso, setCurso] = useState<Curso | undefined>(undefined);

  const methods = useForm<Curso>({
    resolver: zodResolver(CursoSchema),
    defaultValues: {} as Curso,
  });

  const {
    handleAlertClose: handleAlertCloseFetchCurso,
    error: errorFetchCurso,
    initQuery: initQueryFetchCurso,
    message: messageFetchCurso,
    open: openFetchCurso,
    responseData: responseDataFetchCurso,
  } = useQuery(() => getCursoById(token!!, idCurso || ""), false);

  const {
    handleAlertClose: handleAlertClosePostQuery,
    initQuery: initQueryPostQuery,
    message: messagePostQuery,
    open: openPostQuery,
    responseData: responseDataPostQuery,
    error: errorPostQuery,
  } = useQuery<CursoService>(
    () => patchEditCurso(token!!, methods.getValues()),
    true,
    "Curso modificado correctamente"
  );

  useEffect(() => {
    if (token && idCurso) initQueryFetchCurso();
  }, [token, idCurso]);

  useEffect(() => {
    if (responseDataFetchCurso) {
      setCurso(adaptCursoService(responseDataFetchCurso));
    }
  }, [responseDataFetchCurso]);

  useEffect(() => {
    if (curso) {
      methods.reset(curso);
    }
  }, [curso, methods.reset]);

  const { handleClose, handleOpen, open } = useModal();
  const [usersSelected, setUsersSelected] = useState<UsuarioCampoBusqueda[]>([]);
  const [selectStudentsToRemove, setSelectStudentsToRemove] = useState<number[]>([]);

  const usersToAddCodes = useMemo(() => usersSelected.map((user) => user.id), [usersSelected]);

  const {
    handleAlertClose: handleAlertCloseAddStudents,
    initQuery: initQueryAddStudents,
    message: messageAddStudents,
    open: openAddStudents,
  } = useQuery<unknown>(
    () => patchEstudiantesCurso(token!!, usersToAddCodes, "A", idCurso!!),
    true,
    "Estudiantes registrados de manera correcta"
  );

  const {
    handleAlertClose: handleAlertCloseRemoveStudents,
    initQuery: initQueryRemoveStudents,
    message: messageRemoveStudents,
    open: openRemoveStudents,
  } = useQuery<unknown>(
    () => patchEstudiantesCurso(token!!, selectStudentsToRemove, "D", idCurso!!),
    true,
    "Estudiantes eliminados de manera correcta"
  );

  const [finishRequest, setFinishRequest] = useState(false);

  const successMessage = "Edición de Secciones realizada correctamente";

  const [requestMessage, setRequestMessage] = useState<string>("");

  const requestSet = async (secciones: Seccion[]) => {
    secciones.forEach(async (seccion) => {
      if (seccion.id) {
        const response = await patchEditSeccion(token, seccion);
        if (response.error) {
          setFinishRequest(true);
          setRequestMessage(response.error.message);
          return;
        }
      } else {
        const response = await postCreateSeccion(token, seccion);
        if (response.error) {
          setFinishRequest(true);
          setRequestMessage(response.error.message);
          return;
        }
      }
    });
    setRequestMessage(successMessage);
    setFinishRequest(true);
  };

  const onSubmit = async () => {
    await initQueryPostQuery();
  };

  const { getValues } = methods;

  const navigate = useNavigate();

  useEffect(() => {
    if (responseDataPostQuery) {
      if (getValues("secciones")) requestSet(getValues("secciones") || []);
      else {
        setFinishRequest(true);
        setRequestMessage(successMessage);
      }
    }
  }, [responseDataPostQuery]);

  return (
    <>
      <AlertDialog
        open={finishRequest}
        title="Edición de Secciones"
        textBody={requestMessage}
        handleAccept={() => navigate(0)}
      />
      <AlertDialog
        handleAccept={handleAlertCloseAddStudents}
        open={openAddStudents}
        title="Agregar Estudiantes"
        textBody={messageAddStudents}
      />
      <Modal sx={{ maxWidth: 700 }} handleClose={handleClose} open={open}>
        <AddUsers
          typeUsers="Estudiante"
          selectUsers={usersSelected}
          setSelectUsers={setUsersSelected}
          handleAccept={initQueryAddStudents}
          handleCancel={handleClose}
        />
      </Modal>
      {errorFetchCurso && (
        <AlertDialog
          handleAccept={handleAlertCloseFetchCurso}
          open={openFetchCurso}
          title="Información del Curso"
          textBody={messageFetchCurso}
        />
      )}
      {errorPostQuery && (
        <AlertDialog
          handleAccept={handleAlertClosePostQuery}
          open={openPostQuery}
          title="Información del Curso"
          textBody={messagePostQuery}
        />
      )}
      <AlertDialog
        handleAccept={handleAlertCloseRemoveStudents}
        open={openRemoveStudents}
        title="Información del Curso"
        textBody={messageRemoveStudents}
      />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <EditIcon color="primary" />
              <Typography variant="h5" fontWeight="bold">
                {labelEditarCurso.titulo}
              </Typography>
            </Stack>

            <TextField
              label={labelEditarCurso.descripcion}
              {...methods.register("descripcion")}
              error={!!methods.formState.errors.descripcion}
              helperText={methods.formState.errors.descripcion?.message}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <EstadoField />

            <Stack>
              <TablaEstudiantesEditarCurso
                estudiante={curso?.estudiantes || []}
                setSelectUsers={setSelectStudentsToRemove}
              />
              <Stack alignItems="end">
                <Box>
                  <GeneralButton
                    color="error"
                    mode={buttonTypes.remove}
                    disabled={selectStudentsToRemove.length == 0}
                    onClick={initQueryRemoveStudents}
                  />
                  <GeneralButton mode={buttonTypes.add} onClick={handleOpen} />
                </Box>
              </Stack>
            </Stack>

            <Stack>
              <TablaGestionarSecciones />
            </Stack>

            <GeneralButton mode={buttonTypes.save} type="submit" />
          </Stack>
        </form>
      </FormProvider>
    </>
  );
}

export default VistaEditarCurso;
