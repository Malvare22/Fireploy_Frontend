import EditIcon from "@mui/icons-material/Edit";
import { Usuario } from "@modules/usuarios/types/usuario";
import { Box, Button, Card, SxProps, Typography } from "@mui/material";
import ModalUsuario from "@modules/usuarios/components/modalUsuario";
import { readBreakLine } from "@modules/general/utils/readBreakLine";
import { breakLine } from "@modules/general/utils/breakLine";
import { LabelGeneral } from "@modules/general/enums/labelGeneral";
import Row from "@modules/general/components/row";
import { LabelUsuario } from "@modules/usuarios/enum/labelGestionUsuarios";
import Label from "@modules/general/components/label";
import { palette } from "@core/themes";
import {
  obtenerEstado,
  obtenerTiposUsuario,
} from "@modules/usuarios/utils/usuario.map";
import { useModal } from "@modules/general/components/modal/hooks/useModal";
import RoundedIcon from "@modules/general/components/RoundedIcon";
import { mapaImagenes } from "@modules/general/components/RoundedIcon/utils";

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
      <Perfil usuario={usuario} />
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
          marginTop: 2,
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
          <Typography variant="title">
            {obtenerTiposUsuario.get(usuario.tipo)}
          </Typography>
        </Row>

        {/* Estado */}
        <Row>
          <Label width={240}>{LabelUsuario.estado}</Label>
          <Typography variant="title">
            {obtenerEstado.get(usuario.estado)}
          </Typography>
        </Row>

        {/* Fecha de nacimiento */}
        <Row>
          <Label width={240}>{LabelUsuario.fechaNacimiento}</Label>
          <Typography variant="title">{usuario.fechaDeNacimiento}</Typography>
        </Row>

        {/* Fecha de Ingreso */}
        <Row>
          <Label width={240}>{LabelUsuario.fechaIngreso}</Label>
          <Typography variant="title">{usuario.estFechaInicio}</Typography>
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
            {usuario.redSocial.facebook && (
              <Row sx={styleRowRedSocial}>
                <RoundedIcon
                  imagen={mapaImagenes["facebook_logo"].ruta}
                  nombre={mapaImagenes["facebook_logo"].nombre}
                  url={usuario.redSocial.facebook}
                />
              </Row>
            )}

            {usuario.redSocial.x && (
              <Row sx={styleRowRedSocial}>
                <RoundedIcon
                  imagen={mapaImagenes["x_logo"].ruta}
                  nombre={mapaImagenes["x_logo"].nombre}
                  url={usuario.redSocial.x}
                />
              </Row>
            )}

            {usuario.redSocial.instagram && (
              <Row sx={styleRowRedSocial}>
                <RoundedIcon
                  imagen={mapaImagenes["instagram_logo"].ruta}
                  nombre={mapaImagenes["instagram_logo"].nombre}
                  url={usuario.redSocial.instagram}
                />
              </Row>
            )}

            {usuario.redSocial.linkedin && (
              <Row sx={styleRowRedSocial}>
                <RoundedIcon
                  imagen={mapaImagenes["linkedin_logo"].ruta}
                  nombre={mapaImagenes["linkedin_logo"].nombre}
                  url={usuario.redSocial.linkedin}
                />
              </Row>
            )}
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
