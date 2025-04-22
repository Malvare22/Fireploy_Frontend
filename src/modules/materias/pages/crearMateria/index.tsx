import { zodResolver } from "@hookform/resolvers/zod";
import AlertDialog from "@modules/general/components/alertDialog";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import TablaGestionarCursos from "@modules/materias/components/tablaGestionarCursos";
import { labelGestionarMateria } from "@modules/materias/enums/labelGestionarMateria";
import { postCreateCursoService } from "@modules/materias/services/post.crear.grupo";
import { postCreateMateriaService } from "@modules/materias/services/post.crear.materia";
import { Curso } from "@modules/materias/types/curso";
import { Materia } from "@modules/materias/types/materia";
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
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

function VistaCrearMateria() {
  const [createGroups, setCreateGroups] = useState<boolean>(false);

  const [disableCheck, setDisableCheck] = useState(false);

  const methods = useForm<Materia>({
    resolver: zodResolver(MateriaSchema),
  });

  const { setValue, getValues } = methods;

  const { accountInformation } = useAuth();
  const { token } = accountInformation;

  function getQueryToMake(type: "editar" | "crear") {
    const querys = {
      editar: () => postCreateMateriaService(token, getValues()),
      crear: () => postCreateMateriaService(token, getValues()),
    };

    return querys[type];
  }

  const {
    showDialog,
    open,
    title,
    message,
    handleCancel,
    handleClose,
    type,
    handleAccept,
    isLoading,
  } = useAlertDialog();

  const { setError } = useErrorReader(showDialog);

  const [idMateria, setIdMateria] = useState<null | number>(null);

  const { isPending, mutate } = useMutation({
    mutationFn: getQueryToMake("crear"),
    mutationKey: ["Create Subject"],
    onError: (err) => {
      setError(err);
      setDisableCheck(false);
    },
    onSuccess: (data) => {
      showDialog({
        title: "Creación de Materia Acádemica",
        message: "La materia se ha creado correctamente",
        onAccept: handleClose,
        type: "success",
        reload: true,
      });
      setIdMateria(data.id);
    },
  });

  async function createGroupsRequest(groups: Curso[]) {
    try {
      await Promise.all(groups.map((group) => postCreateCursoService(token, idMateria!!, group)));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const { isPending: isPendingPostGrupos, mutate: mutatePostGrupos } = useMutation({
    mutationFn: () => createGroupsRequest(getValues("cursos") || []),
    mutationKey: ["edit grupos"],
    onError: (err) => {
      setError(err);
    },
    onSuccess: () => {
      showDialog({
        title: "Edición de Grupos",
        message: "El grupo se ha editado correctamente",
        onAccept: handleClose,
        type: "success",
        reload: true,
      });
    },
  });

  function handleCheck() {
    if (createGroups) {
      setValue("cursos", undefined);
    }
    setCreateGroups(!createGroups);
  }

  const onSubmit: SubmitHandler<Materia> = () => {
    mutate();
    setDisableCheck(true);
  };

  useEffect(() => {
    if (idMateria) {
      mutatePostGrupos();
    }
  }, [idMateria]);

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
      <Card sx={{ padding: 2 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Stack>
              <Stack>
                <Typography variant="h4">{labelGestionarMateria.titulo}</Typography>
                <Divider />
              </Stack>
              <Grid2 container spacing={3} padding={2}>
                <Grid2 size={{ xs: 12, md: 8 }}>
                  <TextField
                    fullWidth
                    label={labelGestionarMateria.nombre}
                    {...methods.register("nombre")}
                    error={!!methods.formState.errors.nombre}
                    helperText={methods.formState.errors.nombre?.message}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 8 }}>
                  <TextField
                    fullWidth
                    select
                    label={labelGestionarMateria.semestre}
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
                    label={labelGestionarMateria.estado}
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
                    control={<Checkbox onClick={handleCheck} disabled={disableCheck} />}
                    label={labelGestionarMateria.checkBox}
                  />
                </Grid2>
                <Grid2 size={{ xl: 10, xs: 12 }}>
                  <Card>{createGroups && <TablaGestionarCursos />}</Card>
                </Grid2>
              </Grid2>
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  loading={isPending || isPendingPostGrupos}
                >
                  {labelGestionarMateria.crearMateria}
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
