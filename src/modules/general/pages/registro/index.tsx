import CustomInput from "@modules/general/components/customInput";
import FormContainer from "@modules/general/components/formContainer";
import {
  Box,
  Button,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

function Registrar() {
  return (
    <FormContainer
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: { md: "50%", xs: "90%" },
        "& > div": {
          display: "flex",
          flexDirection: "column",
          gap: 1,
        },
        "& > div.unique": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        },
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3Bold">Registro de Usuario</Typography>
      </Box>
      <Box>
        <Box>
          <Typography variant="h5Bold">Nombres</Typography>
        </Box>
        <Box>
          <CustomInput type="text" />
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography variant="h5Bold">Apellidos</Typography>
        </Box>
        <Box>
          <CustomInput type="text" />
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography variant="h5Bold">Código Institucional</Typography>
        </Box>
        <Box>
          <CustomInput type="number" />
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography variant="h5Bold">Correo Electrónico</Typography>
        </Box>
        <Box>
          <CustomInput type="email" />
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography variant="h5Bold">Fecha de Nacimiento</Typography>
        </Box>
        <Box>
          <CustomInput type="date" />
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography variant="h5Bold">Género</Typography>
        </Box>
        <Box>
          <Select defaultValue={1}>
            <MenuItem value={1}>Hombre</MenuItem>
            <MenuItem value={10}>Mujer</MenuItem>
            <MenuItem value={10}>Otro</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography variant="h5Bold">Contraseña</Typography>
        </Box>
        <Box>
          <CustomInput type="password" />
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography variant="h5Bold">Confirmar Contraseña</Typography>
        </Box>
        <Box>
          <CustomInput type="password" />
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        className="unique"
      >
        <Link sx={{ marginRight: 4 }}>Volver</Link>
        <Button variant="primary">Registrar</Button>
      </Box>
    </FormContainer>
  );
}

export default Registrar;
