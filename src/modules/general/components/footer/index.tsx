import { Box, Typography, useTheme } from "@mui/material";
import { LabelFooter } from "@modules/general/enums/labelFooter";
import { getImage } from "../../utils/getImage";

/**
 * `Footer` component that displays information about Fireploy,
 * resources, social media, legal terms, and institutional logos.
 *
 * @returns {JSX.Element} The footer structure with information distributed into columns.
 */
function Footer(): JSX.Element {
  
  // Get the Material-UI theme
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
      {/* Fireploy Column */}
      <Box
        sx={{
          width: { md: "25%" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Logo and Name */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box >
            <Typography variant="h5">{LabelFooter.fireploy}</Typography>
          </Box>
          <Box>
            <Typography variant="body1">®</Typography>
          </Box>
        </Box>

        {/* Fireploy Description */}
        <Box>
          <Typography variant="body2">
            {LabelFooter.descripcionFireploy}
          </Typography>
        </Box>
      </Box>

      {/* Resources Column */}
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

      {/* Social Media Column */}
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

      {/* Legal Terms Column */}
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

      {/* UFPS Logo */}
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

      {/* Systems Engineering Logo */}
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
