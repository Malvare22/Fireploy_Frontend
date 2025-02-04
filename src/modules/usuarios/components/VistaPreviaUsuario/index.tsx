import { Box, Card, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
import { palette } from "@core/themes";
interface Props {
  usuario: (typeof usuariosPrueba)[number];
  type: "autocomplete" | "list" | "preview";
}

const VistaPreviaUsuario: FC<Props> = ({ usuario, type }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: palette.backgroundX.panel,
        padding: 2,
      }}
    >
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
          justifyContent: "space-between",
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
    </Card>
  );
};

export default VistaPreviaUsuario;
