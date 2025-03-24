import { zodResolver } from "@hookform/resolvers/zod";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import useQuery from "@modules/general/hooks/useQuery";
import { rutasGeneral } from "@modules/general/router/router";
import { registrarUsuarioService } from "@modules/general/services/registrar.usuario";
import { obtenerFechaActual } from "@modules/general/utils/fechas";
import { labelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import RegistroSchema, { UsuarioRegistro } from "@modules/usuarios/utils/form/registro.schema";
import {
  Box,
  Button,
  Card,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TextFieldPassword from "@modules/general/components/textFieldPassword";
import { Usuario, usuarioTemplate } from "@modules/usuarios/types/usuario";
import { getGender } from "@modules/usuarios/utils/usuario.map";
import AlertDialog from "@modules/general/components/alertDialog";
import { useEffect } from "react";

function Registrar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UsuarioRegistro>({
    resolver: zodResolver(RegistroSchema),
    defaultValues: usuarioTemplate,
  });

  const navigate = useNavigate();

  const successAction = () => {
    navigate(rutasGeneral.login);
  };

  const {handleAlertClose, initQuery, message, open, responseData, setOpen} = useQuery<UsuarioService>(() => registrarUsuarioService(getValues()), false, labelUsuario.registroExitoso, successAction );

  const RegisterAlertDialog = () => (
    <AlertDialog handleClose={handleAlertClose} open={open} title={labelUsuario.registrarUsuario} textBody={message}></AlertDialog>
  )

  const onSubmit = async () => {
    await initQuery();
  };

  useEffect(
    () => {
      if(! responseData) return;
      setOpen(true);
    }, [responseData]
  );

  return (
    <Card sx={{ maxWidth: 600, padding: 4 }}>
      <RegisterAlertDialog/>
      <Stack spacing={3}>
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
          <Typography variant="h4" textAlign={"center"}>
            {labelUsuario.registrarUsuario}
          </Typography>
          <AssignmentIndIcon fontSize="large" />
        </Stack>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
          }}
        >
          {/* Fila 1: Nombres y Apellidos */}
          <Stack spacing={4}>

              <TextField
                label="Nombres"
                type="text"
                error={!!errors.nombres}
                helperText={errors.nombres?.message}
                {...register("nombres")}
                fullWidth
              />
              <TextField
                label="Apellidos"
                type="text"
                error={!!errors.apellidos}
                helperText={errors.apellidos?.message}
                {...register("apellidos")}
                fullWidth
              />

            {/* Fila 2: Correo y Fecha de Nacimiento */}

              <TextField
                label="Correo"
                type="email"
                error={!!errors.correo}
                helperText={errors.correo?.message}
                {...register("correo")}
                fullWidth
              />

              <TextField
                label="Sexo"
                select
                error={!!errors.sexo}
                helperText={errors.sexo?.message}
                {...register("sexo")}
                fullWidth
              >
                {Array.from(getGender.entries()).map(([valor, texto]) => (
                  <MenuItem key={valor} value={valor}>
                    {texto}
                  </MenuItem>
                ))}
              </TextField>

            {/* Fila 3: Fecha de Ingreso y Sexo */}

              <TextField
                label="Fecha de Ingreso"
                type="date"
                error={!!errors.estFechaInicio}
                helperText={errors.estFechaInicio?.message}
                {...register("estFechaInicio")}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: obtenerFechaActual() }}
                fullWidth
              />
              <TextField
                label="Fecha de Nacimiento"
                type="date"
                error={!!errors.fechaDeNacimiento}
                helperText={errors.fechaDeNacimiento?.message}
                {...register("fechaDeNacimiento")}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: obtenerFechaActual() }}
                fullWidth
              />

            {/* Fila 4: Contraseña y Confirmar Contraseña */}

              <TextFieldPassword
                label="Contraseña"
                type="password"
                error={!!errors.contrasenia}
                helperText={errors.contrasenia?.message}
                {...register("contrasenia")}
                fullWidth
              />
              <TextFieldPassword
                label="Confirmar Contraseña"
                type="password"
                error={!!errors.confirmarContrasenia}
                helperText={errors.confirmarContrasenia?.message}
                {...register("confirmarContrasenia")}
                fullWidth
              />

            {/* Botones */}
            <Stack spacing={2} direction="row" justifyContent="center">
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => navigate(rutasGeneral.login)}
                >
                  {LabelGeneral.volver}
                </Button>
              </Box>
              <Box>
                <Button onClick={onSubmit} variant="contained">
                  {LabelGeneral.registrar}
                </Button>
              </Box>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}

export default Registrar;
