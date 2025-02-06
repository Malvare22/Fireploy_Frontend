import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
import { palette } from "@core/themes";
interface Props {
  usuario: (typeof usuariosPrueba)[number];
  type: "autocomplete" | "list" | "preview" | "portafolio";
  url?: string
}

const VistaPreviaUsuario: FC<Props> = ({ usuario, type, url }) => {

  const handleUrl = () => {
    if(url){
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const Contenido = () => (
    <Box sx={{display: 'flex', padding: 2}}>
      <Box
        component={"img"}
        src={usuario.fotoDePerfil}
        sx={{
          width: type == "autocomplete" ? 64 : 96,
          height: type == "autocomplete" ? 64 : 96,
          marginRight: 2,
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant={type != "autocomplete" ? "titleBold" : "body"}
            color={type != "autocomplete" ? "info.main" : ""}
          >{`${usuario.nombres} ${usuario.apellidos}`}</Typography>
        </Box>
        {type == "list" && (
          <Box>
            <IconButton>
              <DeleteOutlineIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        backgroundColor: palette.backgroundX.panel,
      }}
    >
      {type == "portafolio" ? (
        <CardActionArea onClick={handleUrl}>
          <Contenido />
        </CardActionArea>
      ) : (
        <Contenido />
      )}
    </Card>
  );
};

export default VistaPreviaUsuario;
