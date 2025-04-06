import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "@modules/general/components/alertDialog";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useQuery from "@modules/general/hooks/useQuery";
import TablaGestionarCursos from "@modules/materias/components/tablaGestionarCursos";
import { postCreateCursoService } from "@modules/materias/services/post.crear.grupo";
import { postCreateMateriaService } from "@modules/materias/services/post.crear.materia";
import { Curso } from "@modules/materias/types/curso";
import { Materia } from "@modules/materias/types/materia";
import { MateriaService } from "@modules/materias/types/materia.service";
import { MateriaSchema } from "@modules/materias/utils/forms/form.schema";
import {
  getMateriasSemestresLabels,
  getMateriaStatesArray,
} from "@modules/materias/utils/materias";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid2,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

enum labelCrearMateria {
  titulo = "Crear Materia",
  checkBox = "Predefinir Grupos",
  nombre = "Nombre",
  semestre = "Semestre",
  estado = "Estado",
  crearMateria = "Crear Materia",
}

function VistaCrearMateria() {
  const [createGroups, setCreateGroups] = useState<boolean>(false);

  const [disableCheck, setDisableCheck] = useState(false);

  const methods = useForm<Materia>({
    resolver: zodResolver(MateriaSchema),
  });

  const {
    setValue,
    getValues,
    watch,
  } = methods;

  const { accountInformation } = useAuth();
  const { token } = accountInformation;
  function getQueryToMake(type: "editar" | "crear") {
    const querys = {
      editar: () => postCreateMateriaService(token, getValues()),
      crear: () => postCreateMateriaService(token, getValues()),
    };

    return querys[type];
  }

  const [idMateria, setIdMateria] = useState<null | number>(null);

  const { handleAlertClose, message, initQuery, open, responseData, error } =
    useQuery<MateriaService>(
      getQueryToMake("crear"),
      true,
      "Operación realizada correctamente"
    );

  const successCreateGroups = "Se ha creado todo exitosamente";
  const [messageCreateGroups, setMessageCreateGroups] =
    useState(successCreateGroups);

  const { open: openGroupsDialog, setOpen: setOpenGroupsDialog } =
    useAlertDialog();

  async function createGroupsRequest(groups: Curso[]) {
    groups.forEach(async (group) => {
      const response = await postCreateCursoService(
        token!!,
        idMateria!!,
        group
      );
      if (response.error) {
        setMessageCreateGroups(response.error.message);
        setOpenGroupsDialog(true);
        return;
      }
    });

    setMessageCreateGroups(successCreateGroups);
    setOpenGroupsDialog(true);
  }

  function handleCheck() {
    if (createGroups) {
      setValue("cursos", undefined);
    }
    setCreateGroups(!createGroups);
  }

  const onSubmit: SubmitHandler<Materia> = () => {
    initQuery();
    setDisableCheck(true);
  };

  useEffect(() => {
    if (error) {
      setDisableCheck(false);
    }
    if (responseData) {
      setIdMateria(responseData.id);
    }
  }, [responseData, error]);

  useEffect(() => {
    if (idMateria) {
      if (getValues("cursos") != null && getValues("cursos") != undefined)
        createGroupsRequest(getValues("cursos") || []);
    }
  }, [idMateria]);

  const navigate = useNavigate();

  function handleCreateGroupDialong(){
    if(messageCreateGroups == successCreateGroups){
      navigate(0);
    }
    else{
      navigate(0);
    }
  }

  return (
    <>
      {(error || !watch("cursos")) && (
        <AlertDialog
          handleAccept={handleAlertClose}
          open={open}
          title="Crear Materia"
          textBody={message}
        />
      )}
      {
        <AlertDialog
          handleAccept={handleCreateGroupDialong}
          open={openGroupsDialog}
          title="Creación de Grupos"
          textBody={messageCreateGroups}
        />
      }
      <Card sx={{ padding: 2 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack>
              <Stack>
                <Typography variant="h4">{labelCrearMateria.titulo}</Typography>
                <Divider />
              </Stack>
              <Grid2 container spacing={3} padding={2}>
                <Grid2 size={{ xs: 12, md: 8 }}>
                  <TextField
                    fullWidth
                    label={labelCrearMateria.nombre}
                    {...methods.register("nombre")}
                    error={!!methods.formState.errors.nombre}
                    helperText={methods.formState.errors.nombre?.message}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 8 }}>
                  <TextField
                    fullWidth
                    select
                    label={labelCrearMateria.semestre}
                    {...methods.register("semestre")}
                    error={!!methods.formState.errors.semestre}
                    helperText={methods.formState.errors.semestre?.message}
                  >
                    {getMateriasSemestresLabels().map(([clave, valor]) => (
                      <MenuItem value={clave} key={clave}>
                        {valor}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 8 }}>
                  <TextField
                    fullWidth
                    label={labelCrearMateria.estado}
                    select
                    {...methods.register("estado")}
                    error={!!methods.formState.errors.estado}
                    helperText={methods.formState.errors.estado?.message}
                  >
                    {getMateriaStatesArray.map(([clave, valor]) => (
                      <MenuItem value={clave} key={clave}>
                        {valor}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 8 }}>
                  <FormControlLabel
                    control={
                      <Checkbox onClick={handleCheck} disabled={disableCheck} />
                    }
                    label={labelCrearMateria.checkBox}
                  />
                </Grid2>
                <Grid2 size={{ xl: 10, xs: 12 }}>
                  <Card>{createGroups && <TablaGestionarCursos />}</Card>
                </Grid2>
              </Grid2>
              <Box>
                <Button type="submit" variant="contained">
                  {labelCrearMateria.crearMateria}
                </Button>
              </Box>
            </Stack>
          </form>
        </FormProvider>
      </Card>
    </>
  );
}

export default VistaCrearMateria;
