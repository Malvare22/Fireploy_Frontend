import Modal, { useModal } from "@modules/general/components/modal";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import AlertDialog from "@modules/general/components/alertDialog";
import CustomInput from "@modules/general/components/customInput";
import Label from "@modules/general/components/label";
import Row from "@modules/general/components/row";
import { breakLine } from "@modules/general/utils/breakLine";
import { readBreakLine } from "@modules/general/utils/readBreakLine";
import { LabelUsuario } from "@modules/usuarios/enum/LabelUsuario";
import { Box, Button, Card, Input, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Usuario } from "@modules/usuarios/types/usuario";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
import { adaptarUsuario } from "@modules/usuarios/utils/usuario.adapter";
import CustomSelect from "@modules/general/components/customSelect";
import { obtenerTiposUsuario } from "@modules/usuarios/utils/usuario.map";

const VerPerfil = () => {
  const obtenerUsuario = () => {
    return usuariosPrueba[0];
  };

  const [usuario, _setUsuario] = useState<Usuario | null>(
    adaptarUsuario(obtenerUsuario())
  );
  const { open, handleOpen, handleClose } = useModal();

  if (!usuario) return <></>;
  return (
    <Box
      sx={{
        marginY: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid red",
        width: "100%",
      }}
    >
      <Perfil usuario={usuario} />
      <Modal handleClose={handleClose} sx={{width: {md: 900}}} open={true}>
        <Cuerpo usuario={usuario}></Cuerpo>
      </Modal>
    </Box>
  );
};

const Perfil: React.FC<{ usuario: Usuario }> = ({ usuario }) => {
  const Cuadro = () => (
    <Card sx={{ padding: 4, backgroundColor: "customGrey.main", width: "70%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box sx={{ padding: 0.7, backgroundColor: "white" }}>
          <Box
            sx={{ height: 120, width: 120 }}
            component={"img"}
            src={usuario.fotoDePerfil}
          ></Box>
        </Box>
        <Box sx={{ width: 500 }}>
          <Typography variant="h4Bold" color="white">
            {readBreakLine(
              breakLine(`${usuario.nombres} ${usuario.apellidos}`, 2)
            )}
          </Typography>
          <Box sx={{ marginTop: 1 }}>
            <Button color="primary" variant="contained" endIcon={<EditIcon />}>
              {LabelGeneral.editar}
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
  return <Cuadro />;
};

const Cuerpo: React.FC<{ usuario: Usuario }> = ({ usuario }) => {
  const Cuadro = () => (
    <Card
      sx={{
        padding: 4,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Row>
        <Label>{LabelUsuario.correo}</Label>
        <Box sx={{ width: "100%" }}>
          <img src={usuario.fotoDePerfil}></img>
        </Box>
      </Row>
      <Row>
        <Label>{LabelUsuario.codigo}</Label>
        <CustomInput variant="secondary" />
      </Row>
      <Row>
        <Label>{LabelUsuario.nombres}</Label>
        <CustomInput variant="secondary" />
      </Row>
      <Row>
        <Label>{LabelUsuario.apellidos}</Label>
        <CustomInput
          variant="secondary"
          value={usuario.apellidos}
        ></CustomInput>
      </Row>
      <Row>
        <Label>{LabelUsuario.rol}</Label>
        <CustomSelect variantDelta="secondary">
          {Array.from(obtenerTiposUsuario.entries()).map(([valor, texto]) => (
            <MenuItem value={valor}>{texto}</MenuItem>
          ))}
        </CustomSelect>
      </Row>
      <Row>
        <Label>{LabelUsuario.fechaNacimiento}</Label>
        <CustomInput variant="secondary" type="date"></CustomInput>
      </Row>
      <Row>
        <Label>{LabelUsuario.redesSociales}</Label>
      </Row>
      <Row>
        <Label>{LabelUsuario.descripcion}</Label>
        <CustomInput variant="secondary"></CustomInput>
      </Row>
      <Row>
        <Label>{LabelUsuario.contrasenia}</Label>
        <CustomInput variant="secondary"></CustomInput>
      </Row>
      <Box sx={{display: 'flex', justifyContent: 'center', gap: 4}}>
        <Button variant="contained" color='warning'>{LabelGeneral.guardar}</Button>
        <Button variant="contained" color='inherit'>{LabelGeneral.cancelar}</Button>
      </Box>
    </Card>
  );
  return <Cuadro />;
};

export default VerPerfil;
