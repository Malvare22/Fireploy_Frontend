import AccordionUsage from "@modules/general/components/accordionUsage";
import { DockerIcon } from "@modules/general/components/customIcons";
import { labelRepositorios } from "@modules/proyectos/enum/labelRepositorios";
import { Repositorio } from "@modules/proyectos/types/repositorio";
import {
  getRepositoryTypeColor,
  getRepositoryTypesArray,
  getRepositoryTypesMap,
} from "@modules/proyectos/utils/repository";
import {
  Box,
  Button,
  Card,
  Chip,
  Grid2,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import EnviromentVariables from "../enviromentVariblesTable";
import DockerInputs from "../dockerInputs";
import ActionButton from "@modules/general/components/actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { repositorioSchema } from "@modules/proyectos/utils/forms/repositorio.schema";
import { LabelButton } from "@modules/general/enums/labelButton";

type Props = {
  repositorio: Repositorio;
};

const RepositoryCard: React.FC<Props> = ({ repositorio }) => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);

  const methods = useForm<Repositorio>({
    resolver: zodResolver(repositorioSchema),
    defaultValues: repositorio,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = methods;

  useEffect(() => {
    if (editMode == false) {
      reset();
    }
  }, [editMode]);

  // Manejar el envío del formulario
  const onSubmit = (data: Repositorio) => {
    console.log("Datos guardados:", data);
    setEditMode(false);
  };

  return (
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
              <Typography variant="h5">{`Proyecto: ${repositorio.proyecto}`}</Typography>
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
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  flex={1}
                >
                  <TextField
                    size="small"
                    fullWidth
                    label="URL del Repositorio"
                    disabled={!editMode}
                    {...register("url")}
                    error={!!errors.url}
                    helperText={errors.url?.message}
                  />
                  <GitHubIcon />
                </Stack>
              </Stack>

              {/* Campo Imagen */}
              <Stack spacing={2} direction={editMode? 'column': 'row'} alignItems={!editMode ? 'center': 'start'}>
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
                      <DockerInputs
                        repositoryInitial=""
                        tagInitial=""
                        onChange={(repo, tag) => {
                          setValue("docker.tecnologia", repo || "");
                          setValue("docker.tag", tag || "");
                        }}
                      />
                      {errors.docker?.tecnologia && (
                        <Typography color="error" variant="caption">
                          {errors.docker.tecnologia.message}
                        </Typography>
                      )}
                      {errors.docker?.tag && (
                        <Typography color="error" variant="caption">
                          {errors.docker.tag.message}
                        </Typography>
                      )}
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
                {editMode ? (
                  getRepositoryTypesArray.map(([value, name], index) => (
                    <Chip
                      label={name}
                      sx={{
                        backgroundColor:
                          value == watch("tipo")
                            ? theme.palette.info.dark
                            : theme.palette.terciary.main,
                        color: "white",
                      }}
                      key={index}
                      onClick={() => setValue("tipo", value)}
                    />
                  ))
                ) : (
                  <Chip
                    label={getRepositoryTypesMap.get(repositorio.tipo)}
                    sx={{
                      backgroundColor: getRepositoryTypeColor().get(
                        repositorio.tipo
                      ),
                      color: "white",
                    }}
                  />
                )}
              </Stack>
            </Stack>

            {/* Variables */}
            <AccordionUsage title={<Typography>Ver Variables</Typography>}>
              <EnviromentVariables edit={editMode} />
            </AccordionUsage>

            {/* Botón Guardar */}
            {editMode && (
              <Stack padding={2} spacing={1}>
                <Button type="submit" variant="contained">
                  {LabelButton.guardar}
                </Button>
              </Stack>
            )}
          </Stack>
        </form>
      </FormProvider>
    </Card>
  );
};

export default RepositoryCard;
