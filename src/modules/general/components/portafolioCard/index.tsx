import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import AnimatedCard from "../animatedCard";
import { Logro, UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { ProjectCardAvatar } from "../avatar";

type Props = {
  usuario: UsuarioPortafolioCard;
};

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
        <ProjectCardAvatar usuario={usuario} sx={{ width: 64, height: 64 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Stack direction={"column"} spacing={1}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="h5">{usuario.nombres}</Typography>
            </Box>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="body1">{usuario.rol}</Typography>
            </Box>
          </Stack>
          <Box sx={{display: {md: 'grid', xs: 'flex'}, flexDirection: {xs: 'column', md: 'row'}, gridTemplateColumns: 'repeat(2, 1fr)', gap: 2}}>
            <Chart logro={usuario.logros} />
            <Chart logro={usuario.logros} />
            <Chart logro={usuario.logros} />
          </Box>
        </Box>
      </Box>
      <Box></Box>
    </AnimatedCard>
  );
};

type ChartProps = {
  logro: Logro;
};

const Chart: React.FC<ChartProps> = ({ logro }) => {
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
      <Box sx={{}}>
        <Typography variant="body2">{logro.titulo}</Typography>
      </Box>
      <Box>
        <Typography variant="body1">{logro.valor}</Typography>
      </Box>
    </Stack>
  );
};

export default PortafolioCard;
