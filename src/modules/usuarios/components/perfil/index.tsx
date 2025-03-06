import EditIcon from "@mui/icons-material/Edit";
import { Usuario } from "@modules/usuarios/types/usuario";
import { Box, Button, Card, SxProps, Typography } from "@mui/material";
import ModalUsuario from "@modules/usuarios/components/modalUsuario";
import { readBreakLine } from "@modules/general/utils/readBreakLine";
import { breakLine } from "@modules/general/utils/breakLine";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import { useModal } from "@modules/general/components/modal";
import Row from "@modules/general/components/row";
import { LabelUsuario } from "@modules/usuarios/enum/LabelUsuario";
import { LabelRedesSociales } from "@modules/usuarios/enum/LabelRedesSociales";
import Label from "@modules/general/components/label";
import Facebook from "@modules/general/assets/redesSociales/facebook.png";
import Instagram from "@modules/general/assets/redesSociales/instagram.png";
import Linkedin from "@modules/general/assets/redesSociales/linkedin.png";
import IconoRedondo from "@modules/general/components/iconoRedondo";
import { palette } from "@core/themes";
import { obtenerEstadoUsuario, obtenerTiposUsuario } from "@modules/usuarios/utils/usuario.map";

interface Props {
  usuario: Usuario;
}

const VerPerfil: React.FC<Props> = ({ usuario }) => {
  return (
    <Box
      sx={{
        marginY: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Perfil usuario={(usuario)} />
    </Box>
  );
};

const Perfil: React.FC<{ usuario: Usuario }> = ({ usuario }) => {
  const { open, handleOpen, handleClose } = useModal();

  const Cuerpo = () => {
    const styleRowRedSocial = {
      flexDirection: "row",
      alignItems: "center",
    } as SxProps;

    return (
      <Card
        sx={{
          padding: 4,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: "80%",
          marginTop: 2
        }}
      >
        <ModalUsuario
          tipo="editar"
          open={open}
          handleClose={handleClose}
          usuario={usuario}
        />

        {/* Correo */}
        <Row>
          <Label width={240}>{LabelUsuario.correo}</Label>
          <Typography variant="title">{usuario.correo}</Typography>
        </Row>

        {/* Código */}
        <Row>
          <Label width={240}>{LabelUsuario.codigo}</Label>
          <Typography variant="title">{usuario.id}</Typography>
        </Row>

        {/* Nombres */}
        <Row>
          <Label width={240}>{LabelUsuario.nombres}</Label>
          <Typography variant="title">{usuario.nombres}</Typography>
        </Row>

        {/* Apellidos */}
        <Row>
          <Label width={240}>{LabelUsuario.apellidos}</Label>
          <Typography variant="title">{usuario.apellidos}</Typography>
        </Row>

        {/* Rol */}
        <Row>
          <Label width={240}>{LabelUsuario.rol}</Label>
          <Typography variant="title">{obtenerTiposUsuario.get(usuario.tipo)}</Typography>
        </Row>

        {/* Estado */}
        <Row>
          <Label width={240}>{LabelUsuario.estado}</Label>
          <Typography variant="title">{obtenerEstadoUsuario.get(usuario.estado)}</Typography>
        </Row>

        {/* Fecha de nacimiento */}
        <Row>
          <Label width={240}>{LabelUsuario.fechaNacimiento}</Label>
          <Typography variant="title">{usuario.fechaDeNacimiento}</Typography>
        </Row>

        {/* Redes sociales */}
        <Row sx={{ alignItems: "start" }}>
          <Label width={240}>{LabelUsuario.redesSociales}</Label>
          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <Row sx={styleRowRedSocial}>
              <IconoRedondo
                imagen={Linkedin}
                nombre={LabelRedesSociales.linkedin}
                url={usuario.redSocial.linkedin}
              />
            </Row>
            <Row sx={styleRowRedSocial}>
              <IconoRedondo
                imagen={Facebook}
                nombre={LabelRedesSociales.facebook}
                url={usuario.redSocial.facebook}
              />
            </Row>
            <Row sx={styleRowRedSocial}>
              <IconoRedondo
                imagen={Instagram}
                nombre={LabelRedesSociales.instagram}
                url={usuario.redSocial.instagram}
              />
            </Row>
          </Box>
        </Row>

        {/* Descripción */}
        <Row>
          <Label width={240}>{LabelUsuario.descripcion}</Label>
          <Typography variant="title">{usuario.descripcion}</Typography>
        </Row>
      </Card>
    );
  };

  return (
    <>
      <Box sx={{ width: "84%" }}>
        <CuadroPerfil usuario={usuario} handleOpen={handleOpen} tipo="editar" />
      </Box>
      <Cuerpo />
    </>
  );
};

export const CuadroPerfil: React.FC<{
  usuario: Usuario;
  handleOpen?: () => void;
  tipo?: "editar" | "ver";
}> = ({ usuario, handleOpen, tipo = "ver" }) => {
  return (
    <>
      <Card sx={{ padding: 4, backgroundColor: palette.customGrey.main }}>
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
          <Box sx={{ width: { md: 500 } }}>
            <Typography variant="h4Bold" color="white">
              {readBreakLine(
                breakLine(`${usuario.nombres} ${usuario.apellidos}`, 2)
              )}
            </Typography>
            {tipo == "editar" && (
              <Box
                sx={{
                  marginTop: 1,
                  display: "flex",
                  justifyContent: { xs: "center", sm: "start" },
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleOpen}
                  endIcon={<EditIcon />}
                >
                  {LabelGeneral.editar}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default VerPerfil;
