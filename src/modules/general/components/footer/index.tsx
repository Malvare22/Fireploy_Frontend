import ufps from "@modules/general/assets/LogoUFPS.png";
import ingSistemas from "@modules/general/assets/ing_sistemas.png";
import fireploy from "@modules/general/assets/LogoFireploy.png";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        gap: 8,
        padding: 5,
        backgroundColor: "customRed.main",
        color: "white",
      }}
    >
      {/* columna */}
      <Box
        sx={{
          width: { md: "25%" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={fireploy} width={60}></img>
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Typography variant="h5Bold">Fireploy</Typography>
          </Box>
          <Box>
            <Typography variant="titleBold">®</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="title2Bold">
            Software Web para la automatización de despliegues de proyectos web
            gratuito y open source
          </Typography>
        </Box>
      </Box>
      {/* columna */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="titleBold">Recursos</Typography>
        </Box>
        <Box>
          <Typography variant="title2">Documentación</Typography>
        </Box>
        <Box>
          <Typography variant="title2">Plantillas</Typography>
        </Box>
      </Box>
      {/* columna */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="titleBold">Redes Sociales</Typography>
        </Box>
        <Box>
          <Typography variant="title2">Linkedin</Typography>
        </Box>
        <Box>
          <Typography variant="title2">Facebook</Typography>
        </Box>
      </Box>
      {/* columna */}
      <Box
        sx={{
          width: { md: "20%" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="titleBold">Terminos Legales</Typography>
        </Box>
        <Box>
          <Typography variant="title2Bold">
            The content driving this site is licensed under the Creative Commons
            Attribution-ShareAlike 4.0 license.
          </Typography>
        </Box>
      </Box>
      {/* columna */}
      <Box
        sx={{
          borderRadius: 4,
          backgroundColor: "backgroundX.primary",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { md: "5%" },
          padding: 2,
        }}
      >
        <Box
          component={"img"}
          sx={{
            width: { lg: "50%", md: "80%", xs: 100 },
          }}
          src={ufps}
          width={"50%"}
        ></Box>
      </Box>
      {/* columna */}
      <Box
        sx={{
          borderRadius: 4,
          backgroundColor: "backgroundX.primary",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { md: "5%" },
          padding: 2,
        }}
      >
        <Box
          component={"img"}
          sx={{
            width: { lg: "50%", md: "80%", xs: 100 },
          }}
          src={ingSistemas}
          width={"50%"}
        ></Box>
      </Box>
    </Box>
  );
}

export default Footer;
