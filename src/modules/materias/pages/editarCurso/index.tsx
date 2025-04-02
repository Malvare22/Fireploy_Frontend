import { Curso } from "@modules/materias/types/curso";
import { CursoSchema } from "@modules/materias/utils/forms/form.schema";
import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import { getMateriaStatesArray } from "@modules/materias/utils/materias";
import { zodResolver } from "@hookform/resolvers/zod";
import useQuery from "@modules/general/hooks/useQuery";
import { getCursoById } from "@modules/materias/services/get.curso";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "@modules/general/context/accountContext";
import { adaptCursoService } from "@modules/materias/utils/adapters/curso.service";
import AlertDialog from "@modules/general/components/alertDialog";
import { patchEditCurso } from "@modules/materias/services/patch.curso";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { CursoService } from "@modules/materias/types/curso.service";
import TablaEstudiantesEditarCurso from "@modules/materias/components/tablaEstudiantesEditarCurso";
import Modal from "@modules/general/components/modal";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import SearchUsers from "@modules/general/components/searchUsers";
import {
  useSearchUsers,
  UsuarioCampoBusqueda,
} from "@modules/general/components/searchUsers/hook";
import AddUsers from "@modules/usuarios/components/addUsers";

export enum labelEditarCurso {
  titulo = "Editar Curso",
  descripcion = "Descripción",
  estado = "Estado",
  secciones = "Secciones",
  tituloModalEstudiante = "Agregar Estudiantes",
}

function VistaEditarCurso() {
  const { idCurso } = useParams();

  const token = useContext(AccountContext)?.localUser.token;

  const [curso, setCurso] = useState<Curso | undefined>(undefined);

  const {
    handleAlertClose: handleAlertCloseFetchCurso,
    error: errorFetchCurso,
    initQuery: initQueryFetchCurso,
    message: messageFetchCurso,
    open: openFetchCurso,
    responseData: responseDataFetchCurso,
  } = useQuery(() => getCursoById(token!!, idCurso || ""), false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Curso>({
    resolver: zodResolver(CursoSchema),
    defaultValues: {} as Curso,
  });

  useEffect(() => {
    if (curso) {
      reset(curso);
    }
  }, [curso, reset]);

  const {
    handleAlertClose: handleAlertClosePostQuery,
    initQuery: initQueryPostQuery,
    message: messagePostQuery,
    open: openPostQuery,
  } = useQuery<CursoService>(
    () => patchEditCurso(token!!, getValues()),
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

  const onSubmit = async () => {
    await initQueryPostQuery();
  };

  const { handleClose, handleOpen, open } = useModal();

  const [usersSelected, setUsersSelected] = useState<UsuarioCampoBusqueda[]>(
    []
  );

  return (
    <>
      <Modal sx={{ maxWidth: 700}} handleClose={handleClose} open={open}>
      <AddUsers
        typeUsers="Estudiante"
        selectUsers={usersSelected}
        setSelectUsers={setUsersSelected}
        handleAccept={() => console.log('TOLIS')}
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
      <AlertDialog
        handleAccept={handleAlertClosePostQuery}
        open={openPostQuery}
        title="Información del Curso"
        textBody={messagePostQuery}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* Título */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <EditIcon color="primary" />
            <Typography variant="h5" fontWeight="bold">
              {labelEditarCurso.titulo}
            </Typography>
          </Stack>

          {/* Campo: Descripción */}
          <TextField
            label={labelEditarCurso.descripcion}
            {...register("descripcion")}
            error={!!errors.descripcion}
            helperText={errors.descripcion?.message}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* Campo: Estado */}
          <Controller
            name="estado"
            control={control}
            defaultValue={curso?.estado || "I"} // Valor inicial del campo
            render={({ field }) => (
              <TextField
                select
                size="small"
                {...field} // Esto incluye value, onChange, onBlur automáticamente
                error={!!errors?.estado}
                helperText={errors?.estado?.message}
              >
                {getMateriaStatesArray.map(([clave, valor]) => (
                  <MenuItem value={clave} key={clave}>
                    {valor}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Stack>
            <TablaEstudiantesEditarCurso
              estudiante={curso?.estudiantes || []}
            />
            <Stack alignItems={"end"}>
              <Box>
                <GeneralButton color="error" mode={buttonTypes.remove} />
                <GeneralButton mode={buttonTypes.add} onClick={handleOpen} />
              </Box>
            </Stack>
          </Stack>
          {/* Botón de enviar */}
          <GeneralButton mode={buttonTypes.save} type="submit" />
        </Stack>
      </form>
    </>
  );
}

export default VistaEditarCurso;
