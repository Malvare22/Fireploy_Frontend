import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import AnimatedCard from "../animatedCard";
import { Logro, UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { ProjectCardAvatar } from "../projectCardAvatar";
import { getUserTypes } from "@modules/usuarios/utils/usuario.map";
import { Usuario } from "@modules/usuarios/types/usuario";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";

type Props = {
  usuario: UsuarioPortafolioCard;
};

/**
 * PortafolioCard Component
 * 
 * A card component that displays a user's profile in the portfolio section. 
 * This component includes the user's avatar, name, and role. When clicked, 
 * it navigates to the user's portfolio page.
 * 
 * @component
 * 
 * @param {Props} props - Component properties.
 * @param {UsuarioPortafolioCard} props.usuario - The user data to display in the card.
 * 
 * @returns {JSX.Element} A styled card showing the user's avatar, name, and role.
 * 
 * @example
 * ```tsx
 * <PortafolioCard usuario={userData} />
 * ```
 */
const PortafolioCard: React.FC<Props> = ({ usuario }) => {

  const navigate = useNavigate();

  return (
    <AnimatedCard sx={{ padding: 2, cursor: 'pointer' }} onClick={() => navigate(rutasUsuarios.portafolio.replace(':id', usuario.id))}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* User Avatar */}
        <ProjectCardAvatar usuario={usuario} sx={{ width: 64, height: 64 }} />

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
              <Typography variant="h5">{usuario.nombres}</Typography>
            </Box>

            {/* User Role */}
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="body1">
                {getUserTypes.get((usuario.rol as Usuario["tipo"]) ?? "E")}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box></Box>
    </AnimatedCard>
  );
};

type ShowGoalProps = {
  logro: Logro;
};

/**
 * ShowGoal component that displays a user's achievement.
 *
 * @param {ShowGoalProps} props - Component props.
 * @param {Logro} props.logro - Achievement data.
 *
 * @returns {JSX.Element} A styled card displaying an achievement.
 */
export const ShowGoal: React.FC<ShowGoalProps> = ({ logro }) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.warning.light,
        color: "white",
        padding: 1,
        borderRadius: 2,
        maxWidth: 170,
      }}
      direction={"column"}
    >
      {/* Achievement Title */}
      <Typography variant="body2" textAlign={"center"}>
        {logro.titulo}
      </Typography>

      {/* Achievement Value */}
      <Typography variant="h6" textAlign={"center"}>
        {logro.valor}
      </Typography>
    </Stack>
  );
};

export default PortafolioCard;
