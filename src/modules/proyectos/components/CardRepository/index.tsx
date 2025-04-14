import AccordionUsage from "@modules/general/components/accordionUsage";
import { DockerIcon } from "@modules/general/components/customIcons";
import { labelRepositorios } from "@modules/proyectos/enum/labelRepositorios";
import { Repositorio } from "@modules/proyectos/types/repositorio";
import { getRepositoryTypeColor, getRepositoryTypesMap } from "@modules/proyectos/utils/repository";
import { Box, Card, Chip, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import DockerInputs from "../dockerInputs";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EnviromentVariablesEditor from "../configuracion/enviroment";
import { ProyectoRepositoriesSchema } from "@modules/proyectos/utils/forms/proyecto.schema";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { useMutation } from "@tanstack/react-query";
import { patchEditRepository } from "@modules/proyectos/services/patch.edit.repositories";
import { useAuth } from "@modules/general/context/accountContext";
import useAlertDialog2 from "@modules/general/hooks/useAlertDialog2";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";

type Props = {
  repositorio: Repositorio;
};

const RepositoryCard: React.FC<Props> = ({ repositorio }) => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);

  const { token } = useAuth().accountInformation;

  const methods = useForm<ProyectoRepositoriesSchema>({
    resolver: zodResolver(ProyectoRepositoriesSchema),
    defaultValues: { integrado: repositorio },
  });

  const { handleAccept, message, open, showDialog, title, type } = useAlertDialog2();
  const { setError } = useErrorReader(showDialog);

  const { mutate: updateRepository } = useMutation({
    mutationFn: async (repository: Repositorio) => {
      return await patchEditRepository(token, repository);
    },
    mutationKey: ["patch repository", repositorio],
    onError: (error) => {
      setError(error);
    },
    onSuccess: () => {
      showDialog({
        message: "Repositorio Actualizado Correctamente!",
        onAccept: () => {},
        reload: true,
        title: "Edición de Repositorio",
        type: "success",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    if (editMode == false) {
      reset();
    }
  }, [editMode]);

  const onSubmit = (data: ProyectoRepositoriesSchema) => {
    const _repository = data.integrado;
    showDialog({
      message: `¿Está seguro de que desea actualizar este repositorio del proyecto: ${repositorio.proyectoId?.titulo ?? ""}`,
      onAccept: () => {
        if (_repository) updateRepository(_repository);
      },
      onClose: () => {},
      title: "Actualizar información de Repositorio",
      type: "default",
    });
  };

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        textBody={message}
        type={type}
      />
      <Card sx={{ maxWidth: 800 }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <Stack
                padding={2}
                sx={{
                  width: "100%",
                  color: "white",
                  backgroundColor: theme.palette.info.light,
                }}
                spacing={1}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h5">{`Proyecto: ${repositorio.proyectoId?.titulo ?? ""}`}</Typography>
                {editMode ? (
                  <ActionButton
                    sx={{ color: "white" }}
                    mode={actionButtonTypes.cancelar}
                    onClick={() => setEditMode(false)}
                  />
                ) : (
                  <ActionButton
                    sx={{ color: "white" }}
                    mode={actionButtonTypes.editar}
                    onClick={() => setEditMode(true)}
                  />
                )}
              </Stack>
              <Stack spacing={2} padding={2}>
                {/* Campo URL */}
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <Typography>{labelRepositorios.url}</Typography>
                  <Stack direction={"row"} alignItems={"center"} spacing={1} flex={1}>
                    <TextField
                      size="small"
                      fullWidth
                      label="URL del Repositorio"
                      disabled={!editMode}
                      {...register("integrado.url")}
                      error={!!errors.integrado?.url}
                      helperText={errors.integrado?.url?.message}
                    />
                    <GitHubIcon />
                  </Stack>
                </Stack>

                {/* Campo Imagen */}
                <Stack
                  spacing={2}
                  direction={editMode ? "column" : "row"}
                  alignItems={!editMode ? "center" : "start"}
                >
                  <Typography>{labelRepositorios.imagen}</Typography>
                  {!editMode ? (
                    <Box>
                      <Chip
                        label={
                          <Typography variant="body2">
                            {repositorio.docker
                              ? `${repositorio.docker?.tecnologia} : ${repositorio.docker?.tag}`
                              : "No seleccionada"}
                          </Typography>
                        }
                      />
                    </Box>
                  ) : (
                    <Stack
                      direction={{ md: "row", xs: "column" }}
                      spacing={{ md: 4, xs: 2 }}
                      alignItems={{ md: "center", xs: "start" }}
                    >
                      <Stack spacing={2}>
                        <DockerInputs fieldName="integrado" />
                      </Stack>
                      <Box display={"flex"} alignItems={"center"} height={50}>
                        <DockerIcon sx={{ fontSize: 120 }} />
                      </Box>
                    </Stack>
                  )}
                </Stack>

                {/* Campo Tipo */}
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography>{labelRepositorios.tipo}</Typography>

                  <Chip
                    label={getRepositoryTypesMap.get(repositorio.tipo)}
                    sx={{
                      backgroundColor: getRepositoryTypeColor().get(repositorio.tipo),
                      color: "white",
                    }}
                  />
                </Stack>
              </Stack>

              {/* Variables */}
              <AccordionUsage title={<Typography>Ver Variables</Typography>}>
                <EnviromentVariablesEditor type="integrado" />
              </AccordionUsage>

              {/* Botón Guardar */}
              {editMode && (
                <Stack padding={2} spacing={1}>
                  <GeneralButton type="submit" mode={buttonTypes.save} />
                </Stack>
              )}
            </Stack>
          </form>
        </FormProvider>
      </Card>
    </>
  );
};

export default RepositoryCard;
