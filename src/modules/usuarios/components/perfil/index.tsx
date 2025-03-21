import React from "react";
import { TextField, Typography, Avatar, Stack, Grid2, Paper, useTheme } from "@mui/material";
import { Usuario } from "@modules/usuarios/types/usuario";
import { labelPerfil } from "@modules/usuarios/enum/labelPerfil";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

interface PerfilProps {
  usuario: Usuario;
}

const Perfil: React.FC<PerfilProps> = ({ usuario }) => {

  const theme = useTheme();

  return (
    <Stack spacing={3} padding={3} component={Paper}>
      {/* Información de la Cuenta */}
     <Stack direction={'row'} alignItems={'center'} spacing={2} justifyContent={'center'}>
     <Typography variant="h4">{labelPerfil.perfil}</Typography>
     <AccountBoxIcon sx={{fontSize: 48}}/>
     </Stack>
      <Typography variant="h6">{labelPerfil.informacionCuenta}</Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ md: 9, xs: 12 }}>
          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            sx={{padding: 2 }}
          >
            <Stack flex={1}>
              <TextField
                fullWidth
                label={labelPerfil.nombres}
                value={usuario.nombres}
              />
            </Stack>

            <Stack flex={1}>
              <TextField
                fullWidth
                label={labelPerfil.apellidos}
                value={usuario.apellidos}
              />
            </Stack>
          </Stack>

          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            sx={{padding: 2 }}
          >
            <Stack flex={1}>
              <TextField fullWidth label="Correo" value={usuario.correo} />
            </Stack>
            <Stack flex={1} spacing={2}>
              <TextField
                fullWidth
                label={labelPerfil.tipo}
                value={usuario.tipo}
              />
              <Box><Button variant="contained" sx={{backgroundColor: theme.palette.terciary.main}}>{labelPerfil.solicitarRolDocente}</Button></Box>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 size={{ md: 3, xs: 12 }}>
          <ProfilePhotoUploader />
        </Grid2>
      </Grid2>

      {/* Información Personal */}
      <Typography variant="h6">{labelPerfil.informacionPersonal}</Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            label={labelPerfil.fechaNacimiento}
            value={usuario.fechaDeNacimiento}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <TextField fullWidth label={labelPerfil.sexo} value={usuario.sexo} />
        </Grid2>
      </Grid2>

      {/* Redes Sociales */}
      <Typography variant="h6">{labelPerfil.redesSociales}</Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            label={labelPerfil.facebook}
            value={usuario.redSocial.facebook || ""}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            label={labelPerfil.instagram}
            value={usuario.redSocial.instagram || ""}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            label={labelPerfil.linkedin}
            value={usuario.redSocial.linkedin || ""}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            label={labelPerfil.x}
            value={usuario.redSocial.x || ""}
          />
        </Grid2>
        <Grid2 size={{ md: 6, xs: 12 }}>
          <TextField
            fullWidth
            label={labelPerfil.gitHub}
            value={usuario.redSocial.github || ""}
          />
        </Grid2>
      </Grid2>

      {/* Descripción */}
      <Typography variant="h6">{labelPerfil.descripcion}</Typography>
      <TextField fullWidth multiline rows={4} value={usuario.descripcion} />
    </Stack>
  );
};

import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, styled } from "@mui/system";

const HiddenInput = styled("input")({
  display: "none",
});

export const ProfilePhotoUploader: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(
    "https://via.placeholder.com/150"
  );

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
  };

  return (
    <Stack alignItems="center" spacing={3}>
      <Avatar src={photo || undefined} sx={{ width: 100, height: 100, border: '1px solid #ddd' }} />
      <Stack direction="row" spacing={1} alignItems={'center'} justifyContent={'center'}>
        <label htmlFor="upload-photo">
          <HiddenInput
            accept="image/*"
            id="upload-photo"
            type="file"
            onChange={handlePhotoChange}
          />
          <Button variant="outlined" component="span">
            Cambiar foto
          </Button>
        </label>
        <IconButton onClick={handleRemovePhoto} disabled={!photo}>
          <DeleteIcon sx={{fontSize: 32}}/>
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default Perfil;
