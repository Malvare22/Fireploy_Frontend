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
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

/**
 * VistaCrearMateria component – a view for creating a new subject (Materia).
 * This component renders a form to input the details of a new subject and optionally create associated groups (Cursos) for the subject.
 * The form validates the input and sends a request to create the subject. If successful, it can trigger the creation of related groups.
 *
 * It utilizes hooks for form management, validation, and API calls. The component also includes dynamic content, such as rendering a table for managing groups when needed.
 *
 * @component
 *
 * @returns A JSX element that renders a form for creating a new subject and optionally creates groups for it.
 *
 * @example
 * ```tsx
 * <VistaCrearMateria />
 * ```
 *
 * @hookform
 * This component uses `react-hook-form` for form handling, including validation via Zod schema (`MateriaSchema`).
 *
 * @mutations
 * It uses `react-query`'s `useMutation` to handle API requests for creating the subject (`postCreateMateriaService`) and its associated groups (`postCreateCursoService`).
 *
 * @state
 * - `createGroups`: Tracks whether to create associated groups for the subject.
 * - `disableCheck`: Disables the checkbox for creating groups after submission.
 * - `idMateria`: Stores the ID of the created subject.
 *
 * @example
 * ```tsx
 * <VistaCrearMateria />
 * ```
 */
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
    mutationKey: ["Create Subject", token],
    onError: (err) => {
      setError(err);
      setDisableCheck(false);
    },
    onSuccess: (data) => {
      setIdMateria(data.id);
    },
  });

  async function createGroupsRequest(groups: Curso[]) {
    try {
      await Promise.all(
        groups.map((group) => postCreateCursoService(token, idMateria!!, group))
      );
    } catch (error) {
      throw error;
    }
  }

  const { isPending: isPendingPostGrupos, mutate: mutatePostGrupos } =
    useMutation({
      mutationFn: () => createGroupsRequest(getValues("cursos") || []),
      mutationKey: ["Edit Grupos", getValues("cursos") || [], token],
      onError: (err) => {
        setError(err);
      },
      onSuccess: () => {
        showDialog({
          title: "Creación de Materia Acádemica",
          message: "La materia y los grupos se han creado correctamente",
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
                <Typography variant="h4">
                  {labelGestionarMateria.titulo}
                </Typography>
                <Divider />
              </Stack>
              <Grid container spacing={3} padding={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <TextField
                    fullWidth
                    label={labelGestionarMateria.nombre}
                    {...methods.register("nombre")}
                    error={!!methods.formState.errors.nombre}
                    helperText={methods.formState.errors.nombre?.message}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
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
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
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
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <FormControlLabel
                    control={
                      <Checkbox onClick={handleCheck} disabled={disableCheck} />
                    }
                    label={labelGestionarMateria.checkBox}
                  />
                </Grid>
                <Grid size={{ xl: 10, xs: 12 }}>
                  <Card>{createGroups && <TablaGestionarCursos />}</Card>
                  {methods.formState.errors.cursos?.message?.trim() && (
                    <Alert severity="error" sx={{ my: 2 }}>
                      {methods.formState.errors.cursos.message}
                    </Alert>
                  )}
                </Grid>
              </Grid>
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
