import React, { useEffect, useRef } from "react";
import {
  TextField,
  Typography,
  Avatar,
  Stack,
  Grid,
  Paper,
  useTheme,
  MenuItem,
  IconButton,
  Tooltip,
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
import GeneralButton from "@modules/general/components/button";
import { buttonTypes } from "@modules/general/types/buttons";
import { urlToBlob } from "@modules/general/utils/urlToBlod";
import { useNavigate } from "react-router-dom";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { UsuarioSchema } from "@modules/usuarios/utils/form/usuario.schema";
import { useAuth } from "@modules/general/context/accountContext";
import { postCreateUsuarioService } from "@modules/usuarios/services/post.crear.usuario";
import { postChangeUsuarioService } from "@modules/usuarios/services/post.modificar.usuario";
import { useMutation, useQuery } from "@tanstack/react-query";
import { patchUpdatePhotoService } from "@modules/usuarios/services/patch.foto";
import { postCreateSolicitudRolDocenteService } from "@modules/usuarios/services/post.solicitud.crear";
import useErrorReader from "@modules/general/hooks/useErrorReader";
import { useAlertDialogContext } from "@modules/general/context/alertDialogContext";
import { hasValidExtension, VALID_EXTENSIONS } from "@modules/general/utils/form/validExtensions";
import { getSolicitudes } from "@modules/usuarios/services/get.solicitudes";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface PerfilProps {
  usuario: Usuario;
  type?: "crear" | "editar";
}

/**
 * Perfil component – A profile management component that allows users to view and edit their profile details.
 * It provides fields to modify account information, personal details, social media accounts, and profile photo.
 * This component supports both creating new users and editing existing ones.
 *
 * It interacts with various services to handle user creation, update, and photo upload.
 *
 * @component
 *
 * @param {Usuario} usuario - The user object containing the current profile details.
 * @param {string} [type="editar"] - The mode in which the component is used, either 'crear' (create) or 'editar' (edit).
 *
 * @returns {JSX.Element} A form with editable fields and a photo uploader for user profile management.
 *
 * @example
 * ```tsx
 * <Perfil usuario={currentUser} type="editar" />
 * ```
 */
const Perfil: React.FC<PerfilProps> = ({ usuario, type = "editar" }) => {
  const { accountInformation } = useAuth();
  const { token, tipo } = accountInformation;
  const [id, setId] = useState<number | undefined>(undefined);

  const { register, handleSubmit, formState, getValues, control, setValue } =
    useForm<UsuarioSchema>({
      resolver: zodResolver(UsuarioSchema),
      defaultValues: type == "crear" ? usuarioTemplate : (usuario as UsuarioSchema),
    });

  async function handleGetQuery() {
    if (type == "crear") {
      return postCreateUsuarioService(token, getValues() as Usuario);
    } else {
      return postChangeUsuarioService(getValues().id!!, token, getValues() as Usuario);
    }
  }

  const {
    showDialog,
    setIsLoading,
    handleClose,
    handleAccept,
    handleCancel,
    isLoading,
    title,
    type: typeOfAlert,
    open,
    message,
  } = useAlertDialogContext();

  const { setError } = useErrorReader(showDialog);

  const { errors } = formState;

  const [photo, setPhoto] = useState<string | null>(getValues("fotoDePerfil"));

  const [imgFile, setImgFile] = useState<Blob | undefined>(undefined);

  function handleOpenSuccess() {
    showDialog({
      title: "Modificación de Usuario",
      message: "Se ha modificado la información de perfil del usuario correctamente",
      type: "success",
      reload: true,
      onAccept: handleClose,
    });
  }

  const { isSuccess: isSuccessPhoto, mutate: mutatePhoto } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      return await patchUpdatePhotoService(token, id ?? -1, imgFile!!);
    },
    mutationKey: ["Change Photo", id ?? -1, token],
    onError: (err) => setError(err),
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

  const { isSuccess, isPending, mutate, data } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      return await handleGetQuery();
    },
    onError: (err) => {
      setError(err);
    },
    mutationKey: ["Change User", token],
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

  const CURRENT_USER_TYPE = tipo ?? "E";

  useEffect(() => {
    if (!id) return;
    mutatePhoto();
  }, [id]);

  useEffect(() => {
    if (isSuccessPhoto) handleOpenSuccess();
  }, [isSuccessPhoto, isSuccess]);

  return (
    <Container component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} padding={3} component={Paper}>
        {/* Información de la Cuenta */}
        <AlertDialog
          open={open}
          handleAccept={handleAccept}
          title={title}
          isLoading={isLoading}
          textBody={message}
          type={typeOfAlert}
          handleCancel={handleCancel}
        />
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
        <Stack direction={"row"} alignItems={"center"} spacing={2} justifyContent={"center"}>
          <Typography variant="h4">{labelPerfil.perfil}</Typography>
          <AccountBoxIcon sx={{ fontSize: 48 }} />
        </Stack>
        <Typography variant="h6">{labelPerfil.informacionCuenta}</Typography>
        <Grid container spacing={2}>
          <Grid size={{ md: 9, xs: 12 }}>
            <Grid container sx={{ padding: 2 }} spacing={2}>
              <Grid size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label={labelPerfil.nombres}
                  {...register("nombres")}
                  error={!!errors.nombres}
                  helperText={errors.nombres?.message}
                />
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label={labelPerfil.apellidos}
                  {...register("apellidos")}
                  error={!!errors.apellidos}
                  helperText={errors.apellidos?.message}
                />
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Correo"
                  {...register("correo")}
                  error={!!errors.correo}
                  helperText={errors.correo?.message}
                  disabled={type != "crear"}
                />
              </Grid>
              {getValues("tipo") && (
                <Grid size={{ md: 6, xs: 12 }}>
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
                </Grid>
              )}
              {type == "crear" && (
                <>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <TextFieldPassword
                      fullWidth
                      label={labelPerfil.contrasenia}
                      {...register("contrasenia")}
                      error={!!errors.contrasenia}
                      helperText={errors.contrasenia?.message}
                    />
                  </Grid>
                  <Grid size={{ md: 6, xs: 12 }}>
                    <TextFieldPassword
                      fullWidth
                      label={labelPerfil.confirmarContrasenia}
                      {...register("confirmarContrasenia")}
                      error={!!errors.confirmarContrasenia}
                      helperText={errors.confirmarContrasenia?.message}
                    />
                  </Grid>
                </>
              )}
              {
                <Grid size={{ md: 6, xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Fecha de Ingreso a la Universidad"
                    {...register("estFechaInicio")}
                    error={!!errors.estFechaInicio}
                    helperText={errors.estFechaInicio?.message}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              }
              <Grid size={{ md: 6, xs: 12 }}>
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
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ md: 3, xs: 12 }}>
            {
              <ProfilePhotoUploader
                photo={photo}
                setFile={setImgFile}
                setPhoto={setPhoto}
                initial={getValues("fotoDePerfil")}
                onChange={() => setValue("fotoDePerfil", "")}
              />
            }
          </Grid>
        </Grid>

        {/* Información Personal */}
        <Typography variant="h6">{labelPerfil.informacionPersonal}</Typography>
        <Grid container spacing={2}>
          <Grid size={{ md: 6, xs: 12 }}>
            <TextField
              fullWidth
              label={labelPerfil.fechaNacimiento}
              type="date"
              {...register("fechaDeNacimiento")}
              error={!!errors.fechaDeNacimiento}
              helperText={errors.fechaDeNacimiento?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid size={{ md: 6, xs: 12 }}>
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
          </Grid>
        </Grid>

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
  initial: string;
  onChange: () => void;
};

/**
 * ProfilePhotoUploader component – A component for uploading and displaying the user's profile photo.
 * It allows users to upload, preview, and remove their profile image.
 *
 * @component
 *
 * @param {string | null} photo - The current photo URL or null if no photo is set.
 * @param {function} setPhoto - A function to update the photo state.
 * @param {function} setFile - A function to set the file (Blob) state for the photo.
 * @param {string} initial - The initial photo URL to compare against for resetting.
 * @param {function} onChange - A function that will be called when the photo changes.
 *
 * @returns {JSX.Element} A section to display, change, and remove the user's profile photo.
 *
 * @example
 * ```tsx
 * <ProfilePhotoUploader photo={photo} setPhoto={setPhoto} setFile={setFile} initial={initialPhoto} onChange={handleChange} />
 * ```
 */
export const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  photo,
  setFile,
  setPhoto,
  initial,
  onChange,
}) => {
  useEffect(() => {
    const f = async () => {
      if (photo) {
        if (photo != initial) setFile(await urlToBlob(photo));
      } else {
        setFile(undefined);
        onChange();
      }
    };
    f();
  }, [photo]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (!hasValidExtension(event.target.files[0].name, "IMAGE")) {
        showError();
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const { showDialog, handleClose } = useAlertDialogContext();

  const showError = () => {
    showDialog({
      message: `Solo se admiten archivos en formato: ${VALID_EXTENSIONS.IMAGE.join(", ")}`,
      onAccept: () => handleClose(),
      title: "Formato no válido",
      type: "error",
    });
  };

  const ref = useRef<HTMLInputElement>(null);

  function handleReference() {
    if (ref) ref.current?.click();
  }

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
            accept={VALID_EXTENSIONS.IMAGE.join(", ")}
            id="upload-photo"
            type="file"
            onChange={handlePhotoChange}
            ref={ref}
          />
          <Button variant="outlined" color="secondary" onClick={handleReference}>
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

/**
 * ButtonUpdaterRol component – A button that allows the user to request promotion to a teacher role.
 * It triggers a confirmation dialog and calls the service to create a teacher role request.
 *
 * @component
 *
 * @returns {JSX.Element} A button to trigger a role update request.
 *
 * @example
 * ```tsx
 * <ButtonUpdaterRol />
 * ```
 */
const ButtonUpdaterRol = () => {
  const { accountInformation } = useAuth();
  const { token, id } = accountInformation;

  const [disable, setDisable] = useState<boolean>(true);

  const { data: currentSolicitudes, refetch: refetchCurrentSolicitudes } = useQuery({
    queryFn: async () => {
      return await getSolicitudes(token, {
        usuario: id,
        estado: "P",
      });
    },
    queryKey: ["Get Request", id, token],
  });

  useEffect(() => {
    if (currentSolicitudes) {
      setDisable(currentSolicitudes.some((x) => x.tipo_solicitud == 1));
    }
  }, [currentSolicitudes]);

  if (id == -1) return <></>;

  const theme = useTheme();

  const { setIsLoading, showDialog, handleClose } = useAlertDialogContext();

  const { setError } = useErrorReader(showDialog);

  const { mutate: mutatePost } = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      return await postCreateSolicitudRolDocenteService(id, token);
    },
    mutationKey: ["Update Rol", id, token],
    onError: (err) => setError(err),
    onSuccess: () => {
      showDialog({
        message: "Se ha creado su solicitud de actualización a rol docente",
        title: "Solicitud Rol Docente",
        onAccept: () => {
          handleClose();
        },
        type: "success",
      });
      refetchCurrentSolicitudes();
    },
  });

  function handlePost() {
    mutatePost();
  }

  function confirmationAlert() {
    showDialog({
      title: "Solicitar promoción a Rol Docente",
      message: "¿Está seguro de que desea solicitar la promoción al rol de docente?",
      type: "default",
      onAccept: async () => {
        setIsLoading(true);
        await handlePost();
        handleClose();
      },
      onCancel: handleClose,
    });
  }

  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      <Button
        variant="contained"
        onClick={confirmationAlert}
        sx={{ backgroundColor: theme.palette.terciary.main }}
        disabled={disable}
      >
        {labelPerfil.solicitarRolDocente}
      </Button>
      {disable && (
        <Tooltip title="Actualmente cuenta con una solicitud pendiente de rol docente">
          <HelpOutlineIcon />
        </Tooltip>
      )}
    </Stack>
  );
};

export default Perfil;
