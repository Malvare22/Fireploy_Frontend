import React, { useEffect, useRef } from "react";
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
import { Usuario, usuarioTemplate } from "@modules/usuarios/types/usuario";
import { labelPerfil } from "@modules/usuarios/enum/labelPerfil";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Container, styled } from "@mui/system";
import { getGenderArray, getUserTypesArray } from "@modules/usuarios/utils/usuario.map";
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
import { urlToBlob } from "@modules/general/utils/urlToBlod";
import { useNavigate } from "react-router-dom";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { UsuarioSchema } from "@modules/usuarios/utils/form/usuario.schema";
import { useAuth } from "@modules/general/context/accountContext";
import { postCreateUsuarioService } from "@modules/usuarios/services/post.crear.usuario";
import { postChangeUsuarioService } from "@modules/usuarios/services/post.modificar.usuario";
import { useMutation } from "@tanstack/react-query";
import { patchUpdatePhotoService } from "@modules/usuarios/services/patch.foto";
import AlertDialogError, { CustomError } from "@modules/general/components/alertDialogError";
import { postCreateSolicitudRolDocenteService } from "@modules/usuarios/services/post.solicitud.crear";
import AlertDialogSuccess from "@modules/general/components/alertDialogSuccess";

interface PerfilProps {
  usuario: Usuario;
  type?: "crear" | "editar";
}

const Perfil: React.FC<PerfilProps> = ({ usuario, type = "editar" }) => {
  const { accountInformation } = useAuth();
  const { token, tipo } = accountInformation;
  const [id, setId] = useState<number | undefined>(undefined);

  const { register, handleSubmit, formState, getValues, control, watch, setValue } = useForm<Usuario>({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: type == "crear" ? usuarioTemplate : usuario,
  });

  async function handleGetQuery() {
    if (type == "crear") {
      return postCreateUsuarioService(token, getValues());
    } else {
      return postChangeUsuarioService(getValues().id!!, token, getValues());
    }
  }

  const { errors } = formState;

  const [photo, setPhoto] = useState<string | null>(getValues("fotoDePerfil"));

  const [imgFile, setImgFile] = useState<Blob | undefined>(undefined);

  const {
    isSuccess: isSuccessPhoto,
    isError: isErrorPhoto,
    error: errorPhoto,
    mutate: mutatePhoto,
  } = useMutation({
    mutationFn: () => patchUpdatePhotoService(token, id ?? -1, imgFile!!),
    mutationKey: ["chagePhoto"],
  });

  const [showButton, setShowButton] = useState(false);

  const { open: openConfirmation, setOpen: setOpenConfirmation } = useAlertDialog();

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

  const { isSuccess, isError, isPending, error, mutate, data } = useMutation({
    mutationFn: () => handleGetQuery(),
    mutationKey: ["changeUser"],
  });

  const handleUpdateUser = async () => {
    await mutate();
  };

  useEffect(() => {
    if (data && isSuccess) {
      if (imgFile != undefined) {
        setId(data.id);
      } else {
        handleOpenSuccess();
      }
    }
  }, [data, isSuccess]);

  const {
    handleOpen: handleOpenError,
    handleClose: handleCloseError,
    open: openError,
  } = useAlertDialog();

  useEffect(() => {
    if (error && isError) handleOpenError();
  }, [isError, error]);

  const {
    handleOpen: handleOpenSuccess,
    handleClose: handleCloseSuccess,
    open: openSuccess,
  } = useAlertDialog();

  const CURRENT_USER_TYPE = tipo ?? "E";

  useEffect(() => {
    if (!id) return;
    mutatePhoto();
  }, [id]);

  useEffect(() => {
    if (isError || isErrorPhoto) {
      handleOpenError();
    }
  }, [isError, isErrorPhoto]);

  useEffect(() => {
    if (isSuccessPhoto) handleOpenSuccess();
  }, [isSuccessPhoto, isSuccess]);

  return (
    <Container component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} padding={3} component={Paper}>
        {/* Información de la Cuenta */}

        <AlertDialog
          title="Modificación de usuarios"
          textBody="¿Está seguro de que desea aplicar estas modificaciones?"
          handleAccept={() => {
            handleUpdateUser();
          }}
          open={openConfirmation}
          handleCancel={() => setOpenConfirmation(false)}
          isLoading={isPending}
        />
        {(error || errorPhoto) && (
          <AlertDialogError
            error={error || (errorPhoto as CustomError)}
            handleClose={handleCloseError}
            open={openError}
            title="Modificar usuario"
          />
        )}

        {
          <AlertDialogSuccess
            title="Modificación de usuarios"
            message={"Modificación exitosa"}
            open={openSuccess}
            handleClose={handleCloseSuccess}
          />
        }
        <Stack direction={"row"} alignItems={"center"} spacing={2} justifyContent={"center"}>
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
                inital={getValues("fotoDePerfil")}
                onChange={() => setValue('fotoDePerfil', '')}
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
  inital: string;
  onChange: () => void
};

export const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  photo,
  setFile,
  setPhoto,
  inital,
  onChange
}) => {
  useEffect(() => {
    const f = async () => {
      if (photo) {
        if (photo != inital) setFile(await urlToBlob(photo));
      } else if (!photo) {
        setFile(undefined);
        onChange();
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
      <Avatar src={photo || undefined} sx={{ width: 100, height: 100, border: "1px solid #ddd" }} />
      <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"center"}>
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
  const { accountInformation } = useAuth();
  const { token, id } = accountInformation;

  if(id == -1) return <></>;

  const theme = useTheme();

  const {
    isSuccess: isSuccessPost,
    isError: isErrorPost,
    isPending: isPendingPost,
    error: errorPost,
    mutate: mutatePost,
  } = useMutation({
    mutationFn: () => postCreateSolicitudRolDocenteService(id, token),
    mutationKey: ["update rol"],
  });

  function handlePost() {
    mutatePost();
  }

  const {
    handleClose: handleCloseConfirmation,
    handleOpen: handleOpenConfirmation,
    open: openConfirmation,
  } = useAlertDialog();

  const {
    handleOpen: handleOpenError,
    handleClose: handleCloseError,
    open: openError,
  } = useAlertDialog();

  useEffect(() => {
    if (isErrorPost && errorPost) handleOpenError();
  }, [isErrorPost, errorPost]);

  const {
    handleOpen: handleOpenSuccess,
    handleClose: handleCloseSuccess,
    open: openSuccess,
  } = useAlertDialog();

  useEffect(() => {
    if (isSuccessPost) handleOpenSuccess();
  }, [isSuccessPost]);

  useEffect(() => {
    if (!isPendingPost) handleCloseConfirmation();
  }, [isPendingPost]);

  return (
    <>
      <AlertDialog
        title="Solicitar promoción a Rol Docente"
        textBody="¿Está seguro de que desea solicitar la promoción al rol de docente?"
        handleAccept={handlePost}
        open={openConfirmation}
        handleCancel={handleCloseConfirmation}
        isLoading={isPendingPost}
      />
      <AlertDialog
        handleAccept={handleCloseSuccess}
        textBody="Solicitud enviada correctamente"
        title="Solicitar promoción a Rol Docente"
        open={openSuccess}
      />
      {errorPost && (
        <AlertDialogError
          error={errorPost as CustomError}
          handleClose={handleCloseError}
          open={openError}
          title="Solicitar promoción a Rol Docente"
        />
      )}

      <Button
        variant="contained"
        onClick={handleOpenConfirmation}
        sx={{ backgroundColor: theme.palette.terciary.main }}
      >
        {labelPerfil.solicitarRolDocente}
      </Button>
    </>
  );
};

export default Perfil;
