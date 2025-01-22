import CustomInput from "@modules/general/components/customInput";
import FormContainer from "@modules/general/components/formContainer";
import { Box, Button, Link, Typography } from "@mui/material";
import React, { useState } from "react";

function ChangePassword() {
  const [value, setValue] = useState(false);

  return (
    <FormContainer
      sx={{
        "& > form": { display: "flex", flexDirection: "column", gap: 8 },
        width: { md: "50%", xs: "90%" },
        "& > form > div": {
          display: "flex",
          flexDirection: "column",
          gap: 1,
        },
        "& > form > div.unique": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        },
      }}
    >
      {!value ? (
        <Request setValue={setValue} />
      ) : (
        <Change setValue={setValue} />
      )}
    </FormContainer>
  );
}

interface RequestProps {
  setValue: React.Dispatch<boolean>;
}
const Request: React.FC<RequestProps> = ({ setValue }: RequestProps) => {
  const changeValue = () => {
    setValue(true);
  };

  return (
    <>
      <form>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3Bold">Cambiar Contraseña</Typography>
        </Box>
        <Box>
          <Box>
            <Typography variant="h5Bold">Correo Electrónico</Typography>
          </Box>
          <Box>
            <CustomInput type="email" />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="unique"
        >
          <Link sx={{ marginRight: 4 }} href="login">
            Volver
          </Link>
          <Button variant="primary" onClick={changeValue}>
            Registrar
          </Button>
        </Box>
      </form>
    </>
  );
};

interface ChangeProps {
  setValue: React.Dispatch<boolean>;
}
const Change: React.FC<ChangeProps> = ({ setValue }: ChangeProps) => {
  return (
    <>
      <form>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3Bold">Cambiar Contraseña</Typography>
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
            <Typography variant="h5Bold">Código de Verificación</Typography>
          </Box>
          <Box>
            <CustomInput type="number" />
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="unique"
        >
          <Link sx={{ marginRight: 4 }} onClick={() => {setValue(false)}}>
            Volver
          </Link>
          <Button variant="primary">Registrar</Button>
        </Box>
      </form>
    </>
  );
};

export default ChangePassword;
