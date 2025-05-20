import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import AnimatedCard from "../animatedCard";
import { getUserTypes } from "@modules/usuarios/utils/usuario.map";
import { Usuario } from "@modules/usuarios/types/usuario";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { rutasGeneral } from "@modules/general/router/routes";
import { useAuth } from "@modules/general/context/accountContext";

type Props = {
  usuario: Usuario;
};

const PortafolioCard: React.FC<Props> = ({ usuario }) => {
  const { id } = useAuth().accountInformation;

  const navigate = useNavigate();

  function handleButton() {
    if (id != -1) {
      navigate(rutasUsuarios.portafolio.replace(":id", usuario.id.toString()));
    } else {
      navigate(rutasGeneral.portafolioPorUsuario.replace(":id", usuario.id.toString()));
    }
  }

  return (
    <AnimatedCard sx={{ padding: 2, cursor: "pointer" }} onClick={handleButton}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* User Avatar */}
        <Avatar src={usuario.fotoDePerfil} sx={{ width: 64, height: 64 }} />

        {/* User Information */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Stack direction={"column"} spacing={1}>
            {/* User Name */}
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="h5">{``}</Typography>
            </Box>

            {/* User Role */}
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="body1">
                {getUserTypes.get((usuario.tipo as Usuario["tipo"]) ?? "E")}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box></Box>
    </AnimatedCard>
  );
};

export default PortafolioCard;
