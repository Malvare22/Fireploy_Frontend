import React, { useContext, useEffect, useRef } from "react";
import {
  TextField,
  Typography,
  Avatar,
  Stack,
  Grid2,
  Paper,
  useTheme,
  MenuItem,
  IconButton,
} from "@mui/material";
import { TiposUsuario, Usuario } from "@modules/usuarios/types/usuario";
import { labelPerfil } from "@modules/usuarios/enum/labelPerfil";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Container, styled } from "@mui/system";
import { AccountContext } from "@modules/general/context/accountContext";
import {
  getGenderArray,
  getUserTypesArray,
} from "@modules/usuarios/utils/usuario.map";
import useAlertDialog from "@modules/general/hooks/useAlertDialog";
import AlertDialog from "@modules/general/components/alertDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adapterUsuarioFormToUsuario,
  adapterUsuarioToUsuarioForm,
  UsuarioForm,
  usuarioFormTemplate,
} from "@modules/usuarios/utils/form/editar.schema";
import { Controller, useForm } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import useQuery from "@modules/general/hooks/useQuery";
import { postModificarUsuarioService } from "@modules/usuarios/services/post.modificar.usuario";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { urlToBlob } from "@modules/general/utils/urlToBlod";
import { getImage } from "@modules/general/components/roundedIcon/utils";
import { patchSubirFotoPerfil } from "@modules/usuarios/services/patch.foto";
import { useNavigate } from "react-router-dom";
import { postCrearUsuarioService } from "@modules/usuarios/services/post.crear.usuario";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { getSolicitudService } from "@modules/usuarios/services/get.solicitud";
import { postCrearSolicitud } from "@modules/usuarios/services/post.solicitud.crear";

interface PerfilProps {
  usuario: Usuario;
  type?: "crear" | "editar";
}

const Perfil: React.FC<PerfilProps> = ({ usuario, type = "editar" }) => {

  const { localUser } = useContext(AccountContext)!!;

  const [id, setId] = useState<number | undefined>(undefined);

  const [updateImageCondition, setUpdateImageCondition] = useState(false);

  const { register, handleSubmit, formState, getValues, control, watch } =
    useForm<UsuarioForm>({
      resolver: zodResolver(UsuarioForm),
      defaultValues:
        type == "crear"
          ? usuarioFormTemplate
          : adapterUsuarioToUsuarioForm(usuario),
    });

  async function handleGetQuery() {
    if (type == "crear") {
      return postCrearUsuarioService(
        localUser?.token!!,
        adapterUsuarioFormToUsuario(getValues())
      );
    } else {
      return postModificarUsuarioService(
        getValues().id!!,
        localUser?.token!!,
        adapterUsuarioFormToUsuario(getValues())
      );
    }
  }

  const { errors } = formState;

  const [showButton, setShowButton] = useState(false);

  const [detectChangeImage, setDetectChangeImage] = useState(false);

  const { open: openConfirmation, setOpen: setOpenConfirmation } =
    useAlertDialog();

  const onSubmit = () => {
    setOpenConfirmation(true);
  };

  useEffect(() => {
    setShowButton(formState.isDirty || detectChangeImage);
  }, [formState.isDirty, detectChangeImage]);

  const navigate = useNavigate();

  const resetForm = () => {
    navigate(0);
  };

  const {
    initQuery: initQueryUpdateUser,
    responseData: responseDataUpdateUser,
    open: openUpdateUser,
    message: messageUpdateUser,
    error: errorUpdateUser,
    handleAlertClose: handleAlertCloseUpdateUser,
  } = useQuery<UsuarioService>(
    () => handleGetQuery(),
    false,
    "Usuario Actualizado con éxito!"
  );

  const handleUpdateUser = async () => {
    await initQueryUpdateUser();
  };

  const CURRENT_USER_TYPE = (useContext(AccountContext)!!.localUser?.tipo ??
    "E") as TiposUsuario;

  useEffect(() => {
    if (!responseDataUpdateUser) return;
    setId(responseDataUpdateUser.id);
    setUpdateImageCondition(true);
  }, [responseDataUpdateUser]);

  return (
    <Container component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} padding={3} component={Paper}>
        {/* Información de la Cuenta */}

        <AlertDialog
          title="Modificación de usuarios"
          textBody="¿Está seguro de que desea aplicar estas modificaciones?"
          handleAccept={() => {
            setOpenConfirmation(false);
            handleUpdateUser();
          }}
          open={openConfirmation}
          handleCancel={() => setOpenConfirmation(false)}
        />
        {errorUpdateUser && (
          <AlertDialog
            title="Modificación de usuarios"
            textBody={messageUpdateUser}
            open={openUpdateUser}
            handleAccept={handleAlertCloseUpdateUser}
          />
        )}
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          justifyContent={"center"}
        >
          <Typography variant="h4">{labelPerfil.perfil}</Typography>
          <AccountBoxIcon sx={{ fontSize: 48 }} />
        </Stack>
        <Typography variant="h6">{labelPerfil.informacionCuenta}</Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 9, xs: 12 }}>
            <Grid2 container sx={{ padding: 2 }} spacing={2}>
              <Grid2 size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label={labelPerfil.nombres}
                  {...register("nombres")}
                  error={!!errors.nombres}
                  helperText={errors.nombres?.message}
                />
              </Grid2>
              <Grid2 size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label={labelPerfil.apellidos}
                  {...register("apellidos")}
                  error={!!errors.apellidos}
                  helperText={errors.apellidos?.message}
                />
              </Grid2>
              <Grid2 size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Correo"
                  {...register("correo")}
                  error={!!errors.correo}
                  helperText={errors.correo?.message}
                  disabled={type != "crear"}
                />
              </Grid2>
              <Grid2 size={{ md: 6, xs: 12 }}>
                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Tipo de usuario"
                      select
                      disabled={CURRENT_USER_TYPE == "E" || type != "crear"}
                      error={!!errors.tipo}
                      helperText={errors.tipo?.message}
                    >
                      {getUserTypesArray.map(([valor, clave]) => (
                        <MenuItem value={valor} key={valor}>
                          {clave}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid2>
              {type == "crear" && (
                <>
                  <Grid2 size={{ md: 6, xs: 12 }}>
                    <TextFieldPassword
                      fullWidth
                      label={labelPerfil.contrasenia}
                      {...register("contrasenia")}
                      error={!!errors.contrasenia}
                      helperText={errors.contrasenia?.message}
                    />
                  </Grid2>
                  <Grid2 size={{ md: 6, xs: 12 }}>
                    <TextFieldPassword
                      fullWidth
                      label={labelPerfil.confirmarContrasenia}
                      {...register("confirmarContrasenia")}
                      error={!!errors.confirmarContrasenia}
                      helperText={errors.confirmarContrasenia?.message}
                    />
                  </Grid2>
                </>
              )}
              {watch("tipo") == "E" && (
                <Grid2 size={{ md: 6, xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Fecha de Ingreso a la Universidad"
                    {...register("estFechaInicio")}
                    error={!!errors.estFechaInicio}
                    helperText={errors.estFechaInicio?.message}
                    disabled={CURRENT_USER_TYPE == "E"}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid2>
              )}
              <Grid2 size={{ md: 6, xs: 12 }}>
                {CURRENT_USER_TYPE == "E" && (
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    alignContent={"center"}
                    height={"100%"}
                  >
                    <ButtonUpdaterRol/>
                  </Box>
                )}
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 size={{ md: 3, xs: 12 }}>
            {
              <ProfilePhotoUploader
                actualImg={getValues("fotoDePerfil")}
                userId={id}
                initQueryCondition={updateImageCondition}
                setDetectChangeImage={setDetectChangeImage}
              />
            }
          </Grid2>
        </Grid2>

        {/* Información Personal */}
        <Typography variant="h6">{labelPerfil.informacionPersonal}</Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <TextField
              fullWidth
              label={labelPerfil.fechaNacimiento}
              type="date"
              {...register("fechaDeNacimiento")}
              error={!!errors.fechaDeNacimiento}
              helperText={errors.fechaDeNacimiento?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
            <Controller
              name="sexo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Género"
                  select
                  error={!!errors.sexo}
                  helperText={errors.sexo?.message}
                >
                  {getGenderArray.map(([valor, clave]) => (
                    <MenuItem value={valor} key={valor}>
                      {clave}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid2>
        </Grid2>

        {/* Redes Sociales */}
        <Typography variant="h6">{labelPerfil.redesSociales}</Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ md: 6, xs: 12 }}>
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
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
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
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
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
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
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
          </Grid2>
          <Grid2 size={{ md: 6, xs: 12 }}>
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
          </Grid2>
        </Grid2>

        {/* Descripción */}
        <Typography variant="h6">{labelPerfil.descripcion}</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          {...register("descripcion")}
          error={!!errors.descripcion}
          helperText={errors.descripcion?.message}
        />
        {showButton && (
          <Stack direction={"row"} spacing={1} justifyContent={"end"}>
            <GeneralButton mode={buttonTypes.save} type="submit" />
            <GeneralButton mode={buttonTypes.cancel} onClick={resetForm} />
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

const HiddenInput = styled("input")({
  display: "none",
});

type ProfilePhotoUploaderProps = {
  userId: number | undefined;
  actualImg: string | null;
  initQueryCondition: boolean;
  setDetectChangeImage: React.Dispatch<boolean>;
};

export const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  userId,
  actualImg,
  initQueryCondition,
  setDetectChangeImage,
}) => {
  const [photo, setPhoto] = useState<string | null>(actualImg);

  const [fileValue, setFileValue] = useState<Blob | undefined>(undefined);

  const token = useContext(AccountContext)!!.localUser?.token ?? "";

  useEffect(() => {
    const f = async () => {
      if (photo && photo != actualImg) {
        setFileValue(await urlToBlob(photo));
      } else if (!photo) {
        const response = await fetch(getImage["defaultProfileImage"].ruta);
        setFileValue(await response.blob());
      }

      if (photo != actualImg) {
        setDetectChangeImage(true);
      }
    };
    f();
  }, [photo]);

  const { handleAlertClose, initQuery, message, open, error, setOpen } =
    useQuery<unknown>(
      () => patchSubirFotoPerfil(userId!!, token, fileValue!!),
      true,
      "Perfil Actualizado Correctamente"
    );

  useEffect(() => {
    if (!initQueryCondition) return;
    if (photo != actualImg) {
      initQuery();
    } else {
      setOpen(true);
    }
  }, [initQueryCondition]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const ref = useRef<HTMLInputElement>(null);

  const handleRemovePhoto = () => {
    setPhoto(null);
    if (ref.current) {
      ref.current.value = "";
    }
  };

  const navigate = useNavigate();

  function handleRefresh() {
    navigate(0);
  }

  return (
    <Stack alignItems="center" spacing={3}>
      {error && (
        <AlertDialog
          handleAccept={handleAlertClose}
          open={open}
          title="Gestión de Usuarios"
          textBody={message}
        />
      )}
      {
        <AlertDialog
          handleAccept={handleRefresh}
          open={open}
          title="Gestión de Usuarios"
          textBody={"Se ha actualizado la información correctamente"}
        />
      }
      <Avatar
        src={photo || undefined}
        sx={{ width: 100, height: 100, border: "1px solid #ddd" }}
      />
      <Stack
        direction="row"
        spacing={1}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <label htmlFor="upload-photo">
          <HiddenInput
            accept="image/*"
            id="upload-photo"
            type="file"
            onChange={handlePhotoChange}
            ref={ref}
          />
          <Button variant="outlined" component="span">
            Cambiar foto
          </Button>
        </label>
        <IconButton onClick={handleRemovePhoto} disabled={!photo}>
          <DeleteIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};


const ButtonUpdaterRol = () => {
  const token = useContext(AccountContext)!!.localUser?.token;

  const id = useContext(AccountContext)!!.localUser?.id;

  const theme = useTheme();

  const { open, setOpen } = useAlertDialog();

  const { error, initQuery } = useQuery<unknown>(
    () => getSolicitudService(id!!, token!!),
    false
  );

  useEffect(() => {
    if (token && id) initQuery();
  }, [token, id]);

  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    if (error == true) {
      setValid(true);
    }
  }, [error]);

  const {
    handleAlertClose: handleAlertCloseUpperUser,
    initQuery: initQueryUpperUser,
    open: openUpperUser,
    message: messageUpperUser,
    responseData
  } = useQuery<unknown>(
    () => postCrearSolicitud(id!!, token!!),
    false,
    "Solicitud enviada de manera correcta"
  );

  console.log('-> ', responseData);

  const fetch = async () => await initQueryUpperUser();

  return (
    <>
      <AlertDialog
        title="Solicitar promoción a Rol Docente"
        textBody="¿Está seguro de que desea solicitar la promoción al rol de docente?"
        handleAccept={fetch}
        open={open}
        handleCancel={() => setOpen(false)}
      />
      <AlertDialog
        title="Solicitar promoción a Rol Docente"
        textBody={messageUpperUser}
        handleAccept={handleAlertCloseUpperUser}
        open={openUpperUser}
      />

      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ backgroundColor: theme.palette.terciary.main }}
        disabled={!valid}
      >
        {valid ? labelPerfil.solicitarRolDocente : labelPerfil.solicitudEnviada}
      </Button>
    </>
  );
};

export default Perfil;
