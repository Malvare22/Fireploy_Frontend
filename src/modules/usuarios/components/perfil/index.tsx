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
import {
  TiposUsuario,
  Usuario,
  usuarioTemplate,
} from "@modules/usuarios/types/usuario";
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
import { patchSubirFotoPerfil } from "@modules/usuarios/services/patch.foto";
import { useNavigate } from "react-router-dom";
import { postCrearUsuarioService } from "@modules/usuarios/services/post.crear.usuario";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { getSolicitudService } from "@modules/usuarios/services/get.solicitud";
import { postCrearSolicitud } from "@modules/usuarios/services/post.solicitud.crear";
import { UsuarioSchema } from "@modules/usuarios/utils/form/usuario.schema";

interface PerfilProps {
  usuario: Usuario;
  type?: "crear" | "editar";
}

const Perfil: React.FC<PerfilProps> = ({ usuario, type = "editar" }) => {
  const token = useContext(AccountContext)?.localUser.token ?? "";

  const [id, setId] = useState<number | undefined>(undefined);

  const { register, handleSubmit, formState, getValues, control, watch } =
    useForm<Usuario>({
      resolver: zodResolver(UsuarioSchema),
      defaultValues: type == "crear" ? usuarioTemplate : usuario,
    });

  async function handleGetQuery() {
    if (type == "crear") {
      return postCrearUsuarioService(token, getValues());
    } else {
      return postModificarUsuarioService(getValues().id!!, token, getValues());
    }
  }

  const { errors } = formState;

  const [photo, setPhoto] = useState<string | null>(getValues("fotoDePerfil"));

  const [imgFile, setImgFile] = useState<Blob | undefined>(undefined);

  const {
    handleAlertClose: handleAlertCloseUpdateImg,
    initQuery: initQueryUpdateImg,
    message: messageUpdateImg,
    open: openUpdateImg,
  } = useQuery<unknown>(
    () => patchSubirFotoPerfil(id!!, token, imgFile!!),
    true,
    "Operación realizada de manera correcta"
  );

  const [showButton, setShowButton] = useState(false);

  const { open: openConfirmation, setOpen: setOpenConfirmation } =
    useAlertDialog();

  const onSubmit = () => {
    setOpenConfirmation(true);
  };

  useEffect(() => {
    setShowButton(formState.isDirty || photo != getValues("fotoDePerfil"));
  }, [formState.isDirty, photo]);

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
    true,
    "Usuario Actualizado con éxito!"
  );

  const [changeImage, setChangeImage] = useState(true);

  const handleUpdateUser = async () => {
    await initQueryUpdateUser();
  };

  useEffect(() => {
    if (responseDataUpdateUser) {
      if (imgFile != undefined) {
        setId(responseDataUpdateUser.id);
      } else setChangeImage(false);
    }
  }, [responseDataUpdateUser]);

  const CURRENT_USER_TYPE = (useContext(AccountContext)!!.localUser?.tipo ??
    "E") as TiposUsuario;

  useEffect(() => {
    if (!id) return;
    initQueryUpdateImg();
  }, [id]);

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
        {(errorUpdateUser || !changeImage) && (
          <AlertDialog
            title="Modificación de usuarios"
            textBody={messageUpdateUser}
            open={openUpdateUser}
            handleAccept={handleAlertCloseUpdateUser}
          />
        )}
        {
          <AlertDialog
            title="Modificación de usuarios"
            textBody={messageUpdateImg}
            open={openUpdateImg}
            handleAccept={handleAlertCloseUpdateImg}
          />
        }
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
              {getValues("tipo") && (
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
              )}
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
                    <ButtonUpdaterRol />
                  </Box>
                )}
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 size={{ md: 3, xs: 12 }}>
            {
              <ProfilePhotoUploader
                photo={photo}
                setFile={setImgFile}
                setPhoto={setPhoto}
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
  photo: string | null;
  setPhoto: React.Dispatch<string | null>;
  setFile: React.Dispatch<Blob | undefined>;
};

export const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  photo,
  setFile,
  setPhoto,
}) => {
  useEffect(() => {
    const f = async () => {
      if (photo) {
        setFile(await urlToBlob(photo));
      } else if (!photo) {
        setFile(undefined);
      }
    };
    f();
  }, [photo]);

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

  return (
    <Stack alignItems="center" spacing={3}>
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
    initQuery: initQueryUpperUser,
    open: openUpperUser,
    message: messageUpperUser,
    setOpen: setOpenUpperUser,
  } = useQuery<unknown>(
    () => postCrearSolicitud(id!!, token!!),
    false,
    "Solicitud enviada de manera correcta"
  );

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
        handleAccept={() => {
          setOpen(false);
          setOpenUpperUser(false);
        }}
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
