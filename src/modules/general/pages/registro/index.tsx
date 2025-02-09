import { palette } from "@core/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@modules/general/components/customInput";
import CustomSelect from "@modules/general/components/customSelect";
import FormContainer from "@modules/general/components/formContainer";
import { rutasGeneral } from "@modules/general/router/router";
import { LabelUsuario } from "@modules/usuarios/enum/LabelUsuario";
import RegistroSchema from "@modules/usuarios/utils/form/registro.schema";
import { obtenerSexo } from "@modules/usuarios/utils/usuario.map";
import { Box, Button, Link, MenuItem, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

function Registrar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegistroSchema>>({
    resolver: zodResolver(RegistroSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log("Formulario enviado con éxito:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <FormContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: { md: "60%", xs: "90%" },
          "& > div": {
            display: "flex",
            flexDirection: "column",
            gap: 1,
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
          <Typography variant="h5Bold">{LabelUsuario.codigo}</Typography>
          <CustomInput
            type="text"
            errorMessage={errors.id?.message}
            {...register("id")}
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
          <Typography variant="h5Bold">{LabelUsuario.contrasenia}</Typography>
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
              Volver
            </Button>
            <Button variant="primary" type="submit" sx={{ width: 150 }}>
              Registrar
            </Button>
          </Box>
        </Box>
      </FormContainer>
    </form>
  );
}

export default Registrar;
