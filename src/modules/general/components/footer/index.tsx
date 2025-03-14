import ufps from "@modules/general/assets/LogoUFPS.png";
import ingSistemas from "@modules/general/assets/ing_sistemas.png";
import fireploy from "@modules/general/assets/LogoFireploy.png";
import { Box, Typography } from "@mui/material";
import { LabelFooter } from "@modules/general/enums/labelFooter";

/**
 * Componente Footer que muestra información sobre Fireploy,
 * recursos, redes sociales, términos legales y logos institucionales.
 *
 * @returns {JSX.Element} Estructura del footer con la información distribuida en columnas.
 */
function Footer(): JSX.Element {
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
      {/* Columna Fireploy */}
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
            <img src={fireploy} width={60} alt="Fireploy" />
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Typography variant="h5Bold">{LabelFooter.fireploy}</Typography>
          </Box>
          <Box>
            <Typography variant="titleBold">®</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="title2Bold">
            {LabelFooter.descripcionFireploy}
          </Typography>
        </Box>
      </Box>

      {/* Columna Recursos */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="titleBold">{LabelFooter.recursos}</Typography>
        </Box>
        <Box>
          <Typography variant="title2">{LabelFooter.documentacion}</Typography>
        </Box>
        <Box>
          <Typography variant="title2">{LabelFooter.plantillas}</Typography>
        </Box>
      </Box>

      {/* Columna Redes Sociales */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="titleBold">
            {LabelFooter.redesSociales}
          </Typography>
        </Box>
        <Box>
          <Typography variant="title2">{LabelFooter.linkedin}</Typography>
        </Box>
        <Box>
          <Typography variant="title2">{LabelFooter.facebook}</Typography>
        </Box>
      </Box>

      {/* Columna Términos Legales */}
      <Box
        sx={{
          width: { md: "20%" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="titleBold">
            {LabelFooter.terminosLegales}
          </Typography>
        </Box>
        <Box>
          <Typography variant="title2Bold">{LabelFooter.licencia}</Typography>
        </Box>
      </Box>

      {/* Logo UFPS */}
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
          alt="UFPS"
        />
      </Box>

      {/* Logo Ingeniería de Sistemas */}
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
          alt="Ingeniería de Sistemas"
        />
      </Box>
    </Box>
  );
}

export default Footer;
