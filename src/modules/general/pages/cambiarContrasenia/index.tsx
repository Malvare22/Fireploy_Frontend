import CustomInput from "@modules/general/components/customInput";
import FormContainer from "@modules/general/components/formContainer";
import { LabelCambiarContrasenia } from "@modules/general/enums/labelCambiarContrasenia";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import { Box, Button, Link, Typography } from "@mui/material";
import React, { useState } from "react";

function CambiarContrasenia() {
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
        <Solicitar setValue={setValue} />
      ) : (
        <Cambiar setValue={setValue} />
      )}
    </FormContainer>
  );
}

interface SolicitarProps {
  setValue: React.Dispatch<boolean>;
}
const Solicitar: React.FC<SolicitarProps> = ({ setValue }: SolicitarProps) => {
  const changeValue = () => {
    setValue(true);
  };

  return (
    <>
      <form>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3Bold">{LabelCambiarContrasenia.cambiarContrasenia}</Typography>
        </Box>
        <Box>
          <Box>
            <Typography variant="h5Bold">{LabelCambiarContrasenia.correoElectronico}</Typography>
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
            {LabelGeneral.volver}
          </Link>
          <Button variant="primary" onClick={changeValue}>
            {LabelGeneral.registrar}
          </Button>
        </Box>
      </form>
    </>
  );
};

interface CambiarProps {
  setValue: React.Dispatch<boolean>;
}
const Cambiar: React.FC<CambiarProps> = ({ setValue }: CambiarProps) => {
  return (
    <>
      <form>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3Bold">{LabelCambiarContrasenia.cambiarContrasenia}</Typography>
        </Box>
        <Box>
          <Box>
            <Typography variant="h5Bold">{LabelCambiarContrasenia.correoElectronico}</Typography>
          </Box>
          <Box>
            <CustomInput type="email" />
          </Box>
        </Box>
        <Box>
          <Box>
            <Typography variant="h5Bold">{LabelCambiarContrasenia.codigoVerificacion}</Typography>
          </Box>
          <Box>
            <CustomInput type="number" />
          </Box>
        </Box>
        <Box>
          <Box>
            <Typography variant="h5Bold">{LabelCambiarContrasenia.cambiarContrasenia}</Typography>
          </Box>
          <Box>
            <CustomInput type="password" />
          </Box>
        </Box>
        <Box>
          <Box>
            <Typography variant="h5Bold">{LabelCambiarContrasenia.confirmarContrasenia}</Typography>
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
            {LabelGeneral.volver}
          </Link>
          <Button variant="primary">{LabelGeneral.registrar}</Button>
        </Box>
      </form>
    </>
  );
};

export default CambiarContrasenia;
