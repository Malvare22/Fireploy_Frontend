import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import { Usuario } from "@modules/usuarios/types/usuario";
import { showSocialNetworks } from "@modules/usuarios/utils/showSocialNetworks";
import {
  Alert,
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ProjectCard from "@modules/general/components/projectCard";
import SpringModal from "@modules/general/components/springModal";
import { CardProjectModal } from "@modules/proyectos/components/modalProyectoPortafolio";
import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrder";
import { labelSelects } from "@modules/general/enums/labelSelects";
import { useAuth } from "@modules/general/context/accountContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { labelPortafolio } from "@modules/usuarios/enum/labelPortafolio";
import LoaderElement from "@modules/general/components/loaderElement";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import AlertDialog from "@modules/general/components/alertDialog";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortafolioSchema } from "@modules/usuarios/utils/form/usuario.schema";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { postChangeUsuarioService } from "@modules/usuarios/services/post.modificar.usuario";
import { labelPerfil } from "@modules/usuarios/enum/labelPerfil";
import { InputAdornment } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import EditIcon from "@mui/icons-material/Edit";
import { GitlabIcon } from "@modules/general/components/customIcons";
import { getUserPublicById, getUsuarioService } from "@modules/usuarios/services/get.usuario";
import { getProjectByUserId } from "@modules/proyectos/services/get.project";
import { adaptUsuarioPortafolio } from "@modules/usuarios/utils/adapt.usuario.portafolio";
import { UsuarioPortafolio } from "@modules/usuarios/types/usuario.portafolio";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import { VARIABLES_LOCAL_STORAGE } from "@modules/general/enums/variablesLocalStorage";
import { adaptUser } from "@modules/usuarios/utils/adapt.usuario";

/**
 * Portfolio component – responsible for rendering a user's public profile and projects.
 *
 * This component fetches and displays user information, a list of their projects, social media links,
 * and achievements. It allows sorting and filtering of the project list and opens a modal
 * for viewing project details.
 *
 * It uses Material-UI components for layout and styling, with the option to customize project
 * filtering, sorting by score and semester, and viewing detailed information in modals.
 *
 * @component
 * @returns {JSX.Element} A full portfolio page showcasing a user's profile and projects.
 *
 * @example
 * ```tsx
 * <Portafolio />
 * ```
 */
const Portafolio = ({ id }: { id: number }) => {
  const [usuario, setUsuario] = useState<UsuarioPortafolio | undefined>(undefined);

  const { data, isLoading, error, refetch } = useQuery({
    queryFn: async () => {
      const user = await getUserPublicById(id);
      const projects = await getProjectByUserId(id);

      return adaptUsuarioPortafolio(user, [...projects]);
    },
    queryKey: ["Project & User Information", id],
  });

  const {
    showDialog,
    handleAccept,
    title,
    type,
    open,
    message,
    isLoading: isLoadingModal,
  } = useAlertDialogContext();

  const { setError } = useErrorReader(showDialog);
  useEffect(() => {
    if (data) {
      setUsuario(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  const [selectProyecto, setSelectProyecto] = useState<ProyectoCard | undefined>(undefined);
  const {
    handleClose: handleCloseModal,
    handleOpen: handleOpenModal,
    open: openModal,
  } = useModal();

  /**
   * Handles the selection of a project and opens the modal to display its details.
   *
   * @param {ProyectoCard} proyecto - The project selected by the user
   */
  const handleCard = (proyecto: ProyectoCard) => {
    setSelectProyecto(proyecto);
    handleOpenModal();
  };

  const { handleOrder, orderDataFn } = useOrderSelect<ProyectoCard>();

  const { filterDataFn } = useFilters<ProyectoCard>();

  const MY_ID = localStorage.getItem(VARIABLES_LOCAL_STORAGE.CURRENT_ID);

  const {
    handleClose: handleCloseModalEdit,
    handleOpen: handleOpenModalEdit,
    open: openModalEdit,
  } = useModal();

  return (
    <>
      <AlertDialog
        handleAccept={handleAccept}
        open={open}
        title={title}
        type={type}
        textBody={message}
        isLoading={isLoadingModal}
      />
      {usuario && openModalEdit && (
        <SpringModal handleClose={handleCloseModalEdit} open={openModalEdit}>
          <ModalEdit id={id} handleClose={handleCloseModalEdit} />
        </SpringModal>
      )}
      {isLoading ? (
        <LoaderElement />
      ) : (
        <>
          {usuario ? (
            <Box>
              <SpringModal handleClose={handleCloseModal} open={openModal}>
                {selectProyecto != undefined && (
                  <CardProjectModal project={selectProyecto} callback={refetch} />
                )}
              </SpringModal>
              <Card
                sx={{
                  padding: 6,
                  position: "relative",
                }}
              >
                {MY_ID && parseInt(MY_ID) == id && (
                  <Box sx={{ position: "absolute", right: 10, top: 10 }}>
                    <Tooltip title="Editar">
                      <IconButton onClick={handleOpenModalEdit}>
                        <EditIcon sx={{ fontSize: 32 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
                <Stack spacing={3}>
                  <Stack spacing={3} alignItems={"center"}>
                    <Avatar src={usuario.fotoDePerfil} sx={{ width: 124, height: 124 }} />
                    <Typography variant="h4" textAlign={"center"}>
                      {`${usuario.nombres} ${usuario.apellidos}`}
                    </Typography>
                    {usuario.descripcion && usuario.descripcion.trim().length > 0 && (
                      <Stack alignItems={"center"} marginTop={3} spacing={4}>
                        <Stack spacing={2}>
                          <Typography variant="h6" textAlign={"center"}>
                            {labelPortafolio.acercaDe}
                          </Typography>
                          <Typography variant="body1" textAlign={"center"} maxWidth={850}>
                            {usuario.descripcion}
                          </Typography>
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                  <Stack alignItems={"center"} spacing={3}>
                    {showSocialNetworks(usuario.redSocial, { sx: { fontSize: 32 } })}
                  </Stack>
                </Stack>
              </Card>
              <Stack spacing={4} marginTop={3}>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {labelPortafolio.ordenarPor}
                  </Typography>
                  <TextField
                    select
                    onChange={(e) => handleOrder("puntuacion", e.target.value as Order)}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    label={labelPortafolio.puntuacion}
                    size="small"
                    sx={{minWidth: 300}}
                  >
                    <MenuItem value="No Aplicar">
                      <em>{labelSelects.noAplicar}</em>
                    </MenuItem>
                    <MenuItem value="desc">{labelSelects.mayor}</MenuItem>
                    <MenuItem value="asc">{labelSelects.menor}</MenuItem>
                  </TextField>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                  {usuario.proyectos.length > 0 ? (
                    <Grid container spacing={1} rowSpacing={4}>
                      {filterDataFn(orderDataFn(usuario.proyectos)).map((proyecto) => (
                        <Grid
                          size={{ xl: 4, sm: 6, xs: 12 }}
                          display={"flex"}
                          justifyContent={"center"}
                        >
                          <ProjectCard
                            handleOpen={() => handleCard(proyecto)}
                            proyecto={proyecto}
                            callback={refetch}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Alert severity={"info"} sx={{ width: "100&" }}>
                      No se han encontrado proyectos
                    </Alert>
                  )}
                </Box>
              </Stack>
            </Box>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Portafolio;

const ModalEdit = ({ id, handleClose }: { id: number; handleClose: Function }) => {
  const { token } = useAuth().accountInformation;
  const { data, error, isLoading } = useQuery({
    queryFn: async () => {
      return await getUsuarioService(id, token);
    },
    queryKey: ["Get User By Id Complete", token],
  });
  const { setIsLoading, showDialog, handleAccept } = useAlertDialogContext();
  const { setError } = useErrorReader(showDialog);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm<Usuario>({
    resolver: zodResolver(PortafolioSchema),
    defaultValues: {} as Usuario,
  });

  useEffect(() => {
    if (error) setError(error);
  }, [error]);

  useEffect(() => {
    if (data) {
      reset(adaptUser(data));
    }
  }, [data]);

  const { mutate: updatePortafolioInformation, isPending } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      await postChangeUsuarioService(getValues().id ?? -1, token, getValues());
    },
    onError: (err) => setError(err),
    onSuccess: () => {
      showDialog({
        message: "Se ha modificado exitosamente la información de portafolio del usuario",
        title: "Actualización Portafolio",
        type: "success",
        onAccept: () => handleAccept(),
        reload: true,
      });
    },
  });

  async function onSubmit() {
    await updatePortafolioInformation();
  }

  return (
    <>
      {isLoading ? (
        <LoaderElement />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Typography variant="h4" textAlign={"center"}>
              Editar Información de Portafolio
            </Typography>
            {/* Redes Sociales */}
            <Typography variant="h6">{labelPerfil.redesSociales}</Typography>
            <Grid container spacing={2}>
              <Grid size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label={labelPerfil.facebook}
                  {...register("redSocial.facebook")}
                  error={!!errors.redSocial?.facebook}
                  helperText={errors.redSocial?.facebook?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <FacebookIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label={labelPerfil.instagram}
                  {...register("redSocial.instagram")}
                  error={!!errors.redSocial?.instagram}
                  helperText={errors.redSocial?.instagram?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <InstagramIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label={labelPerfil.linkedin}
                  {...register("redSocial.linkedin")}
                  error={!!errors.redSocial?.linkedin}
                  helperText={errors.redSocial?.linkedin?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <LinkedInIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label={labelPerfil.x}
                  {...register("redSocial.x")}
                  error={!!errors.redSocial?.x}
                  helperText={errors.redSocial?.x?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <TwitterIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label={labelPerfil.gitHub}
                  {...register("redSocial.github")}
                  error={!!errors.redSocial?.github}
                  helperText={errors.redSocial?.github?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <GitHubIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label={labelPerfil.gitLab}
                  {...register("redSocial.gitLab")}
                  error={!!errors.redSocial?.gitLab}
                  helperText={errors.redSocial?.gitLab?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <GitlabIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Typography variant="h6">Descripción</Typography>
            <TextField
              multiline
              minRows={4}
              {...register("descripcion")}
              error={!!errors.descripcion}
              helperText={errors.descripcion?.message}
              fullWidth
            />
            <Stack alignItems={"center"} justifyContent={"center"} direction={"row"} spacing={2}>
              <Box>
                <GeneralButton mode={buttonTypes.save} loading={isPending} type="submit" />
              </Box>
              <Box>
                <GeneralButton
                  mode={buttonTypes.cancel}
                  onClick={() => handleClose()}
                  disabled={isPending}
                />
              </Box>
            </Stack>
          </Stack>
        </form>
      )}
    </>
  );
};
