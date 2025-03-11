import { palette } from "@core/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@modules/general/components/customInput";
import CustomSelect from "@modules/general/components/customSelect";
import FormContainer from "@modules/general/components/formContainer";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import useQuery from "@modules/general/hooks/useQuery";
import { rutasGeneral } from "@modules/general/router/router";
import { registrarUsuarioService } from "@modules/general/services/registrar.usuario";
import { obtenerFechaActual } from "@modules/general/utils/fechas";
import { LabelUsuario } from "@modules/usuarios/enum/LabelUsuario";
import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { UsuarioRegistro } from "@modules/usuarios/types/usuario";
import RegistroSchema from "@modules/usuarios/utils/form/registro.schema";
import { UsuarioBaseRegistro } from "@modules/usuarios/utils/form/usuario.base";
import { obtenerSexo } from "@modules/usuarios/utils/usuario.map";
import { Box, Button, MenuItem, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Registrar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UsuarioRegistro>({
    resolver: zodResolver(RegistroSchema),
    defaultValues: UsuarioBaseRegistro,
  });

  const navigate = useNavigate();

  const successAction = () => {
    navigate(rutasGeneral.login);
  };

  const { RenderAlertDialog, init } = useQuery<UsuarioService>(
    () => registrarUsuarioService(getValues()),
    LabelUsuario.registrarUsuario,
    false,
    true,
    LabelUsuario.registroExitoso,
    false,
    successAction
  );

  const onSubmit = async () => {
    await init();
  };

  return (
    <>
      <RenderAlertDialog />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3Bold">
            {LabelUsuario.registrarUsuario}
          </Typography>
        </Box>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <FormContainer
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: { md: "60%", xs: "90%" },
              "& > div": {
                display: "flex",
                flexDirection: "column",
                gap: 0,
              },
            }}
          >
            <Box>
              <Typography variant="h5Bold">{LabelUsuario.nombres}</Typography>
              <CustomInput
                type="text"
                errorMessage={errors.nombres?.message}
                {...register("nombres")}
              />
            </Box>
            <Box>
              <Typography variant="h5Bold">{LabelUsuario.apellidos}</Typography>
              <CustomInput
                type="text"
                errorMessage={errors.apellidos?.message}
                {...register("apellidos")}
              />
            </Box>
            <Box>
              <Typography variant="h5Bold">{LabelUsuario.correo}</Typography>
              <CustomInput
                type="email"
                errorMessage={errors.correo?.message}
                {...register("correo")}
              />
            </Box>
            <Box>
              <Typography variant="h5Bold">
                {LabelUsuario.fechaNacimiento}
              </Typography>
              <CustomInput
                type="date"
                errorMessage={errors.fechaDeNacimiento?.message}
                {...register("fechaDeNacimiento")}
                inputProps={{ max: obtenerFechaActual() }}
              />
            </Box>
            <Box>
              <Typography variant="h5Bold">
                {LabelUsuario.fechaIngreso}
              </Typography>
              <CustomInput
                type="date"
                errorMessage={errors.estFechaInicio?.message}
                {...register("estFechaInicio")}
                inputProps={{ max: obtenerFechaActual() }}
              />
            </Box>
            <Box>
              <Typography variant="h5Bold">{LabelUsuario.sexo}</Typography>
              <CustomSelect
                {...register("sexo")}
                variantDelta="primary"
                defaultValue={""}
                errorMessage={errors.sexo?.message}
              >
                {Array.from(obtenerSexo.entries()).map(([valor, texto]) => (
                  <MenuItem key={valor} value={valor}>
                    {texto}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Box>
            <Box>
              <Typography variant="h5Bold">
                {LabelUsuario.contrasenia}
              </Typography>
              <CustomInput
                type="password"
                errorMessage={errors.contrasenia?.message}
                {...register("contrasenia")}
              />
            </Box>
            <Box>
              <Typography variant="h5Bold">
                {LabelUsuario.confirmarContrasenia}
              </Typography>
              <CustomInput
                type="password"
                errorMessage={errors.confirmarContrasenia?.message}
                {...register("confirmarContrasenia")}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="primary"
                  sx={{
                    backgroundColor: palette.customGrey.main,
                    width: 150,
                  }}
                  onClick={() => navigate(rutasGeneral.login)}
                >
                  {LabelGeneral.volver}
                </Button>
                <Button variant="primary" type="submit" sx={{ width: 150 }}>
                  {LabelGeneral.registrar}
                </Button>
              </Box>
            </Box>
          </FormContainer>
        </form>
      </Box>
    </>
  );
}

export default Registrar;
