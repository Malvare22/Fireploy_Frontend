import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import AnimatedCard from "../animatedCard";
import { Logro, UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { ProjectCardAvatar } from "../projectCardAvatar";

type Props = {
  usuario: UsuarioPortafolioCard;
};

/**
 * PortafolioCard component that displays user profile information, 
 * including name, role, and achievements.
 *
 * @param {Props} props - Component props.
 * @param {UsuarioPortafolioCard} props.usuario - User portfolio data.
 *
 * @returns {JSX.Element} A styled user portfolio card.
 */
const PortafolioCard: React.FC<Props> = ({ usuario }) => {
  return (
    <AnimatedCard sx={{ padding: 2 }}>
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
              <Typography variant="body1">{usuario.rol}</Typography>
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
      }}
      direction={"column"}
      alignItems={"center"}
    >
      {/* Achievement Title */}
      <Box>
        <Typography variant="body2">{logro.titulo}</Typography>
      </Box>

      {/* Achievement Value */}
      <Box>
        <Typography variant="body1">{logro.valor}</Typography>
      </Box>
    </Stack>
  );
};

export default PortafolioCard;
