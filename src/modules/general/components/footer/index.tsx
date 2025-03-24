import { Box, Typography, useTheme } from "@mui/material";
import { LabelFooter } from "@modules/general/enums/labelFooter";
import { getImage } from "../roundedIcon/utils";

/**
 * Componente Footer que muestra información sobre Fireploy,
 * recursos, redes sociales, términos legales y logos institucionales.
 *
 * @returns {JSX.Element} Estructura del footer con la información distribuida en columnas.
 */
function Footer(): JSX.Element {

  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        gap: 8,
        padding: 5,
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        fontWeight: '550'
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
            <img
              src={getImage["logo_fireploy"].ruta}
              alt={getImage["logo_fireploy"].nombre}
              width={60}
            />
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Typography variant="h5">{LabelFooter.fireploy}</Typography>
          </Box>
          <Box>
            <Typography variant="body1">®</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body2">
            {LabelFooter.descripcionFireploy}
          </Typography>
        </Box>
      </Box>

      {/* Columna Recursos */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="h6">{LabelFooter.recursos}</Typography>
        </Box>
        <Box>
          <Typography variant="body2">{LabelFooter.documentacion}</Typography>
        </Box>
        <Box>
          <Typography variant="body2">{LabelFooter.plantillas}</Typography>
        </Box>
      </Box>

      {/* Columna Redes Sociales */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography variant="h6">
            {LabelFooter.redesSociales}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">{LabelFooter.linkedin}</Typography>
        </Box>
        <Box>
          <Typography variant="body2">{LabelFooter.facebook}</Typography>
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
          <Typography variant="h6">
            {LabelFooter.terminosLegales}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2">{LabelFooter.licencia}</Typography>
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
            width: { sm: 90, xs: 100 },
          }}
          src={getImage["ufps_logo"].ruta}
          alt={getImage["ufps_logo"].nombre}
          width={"50%"}
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
            width: { sm: 90, xs: 100 },
          }}
          src={getImage["ing_sistemas_logo"].ruta}
          alt={getImage["ing_sistemas_logo"].nombre}
          width={"50%"}
        />
      </Box>
    </Box>
  );
}

export default Footer;
