import { Box, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import { LabelFooter } from "@modules/general/enums/labelFooter";
import { getImage } from "../../utils/getImage";
import BalanceIcon from "@mui/icons-material/Balance";
import BookIcon from "@mui/icons-material/Book";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { openInNewTab } from "@modules/general/utils/openTab";
import { REFERENCE_TO_SITES } from "@modules/general/enums/referencesToSites";

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
    <Paper
      variant="dark"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        paddingX: 3,
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        fontWeight: "550",
        borderRadius: 0,
        paddingY: 2,
      }}
    >
      <Grid container spacing={3}>
        {/* Fireploy Column */}
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          size={{ lg: 3 }}
        >
          {/* Logo and Name */}
          <Typography variant="h5">{`${LabelFooter.fireploy}™`}</Typography>

          {/* Fireploy Description */}
          <Typography variant="body2">{LabelFooter.descripcionFireploy}</Typography>
        </Grid>

        {/* Resources Column */}
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          size={{ lg: 1.5, xs: 6 }}
        >
          <Stack alignItems={"center"} direction={"row"} spacing={1}>
            <Typography variant="h6">{LabelFooter.recursos}</Typography>
            <BookIcon color="action" />
          </Stack>

          <Typography variant="body2">{LabelFooter.documentacion}</Typography>

          <Typography variant="body2">{LabelFooter.plantillas}</Typography>
        </Grid>

        {/* Social Media Column */}
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          size={{ lg: 2, xs: 6 }}
        >
          <Stack alignItems={"center"} direction={"row"} spacing={1}>
            <Typography variant="h6">{LabelFooter.redesSociales}</Typography>
            <ConnectWithoutContactIcon color="action" />
          </Stack>

          <Typography component={"a"} onClick={() => openInNewTab(REFERENCE_TO_SITES.FACEBOOK)} variant="body2">
            {LabelFooter.facebook}
          </Typography>

          <Typography
            component={"a"}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => openInNewTab(REFERENCE_TO_SITES.YOUTUBE)}
            variant="body2"
          >
            {LabelFooter.youtube}
          </Typography>
        </Grid>

        {/* Legal Terms Column */}
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          size={{ lg: 2.5 }}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography variant="h6">{LabelFooter.terminosLegales}</Typography>{" "}
            <BalanceIcon color="action" />
          </Stack>

          <Typography variant="body2">{LabelFooter.licencia}</Typography>
        </Grid>

        {/* UFPS Logo */}
        <Grid size={{ lg: 3 }}>
          <Box
            component={"img"}
            sx={{
              width: "100%",
              marginTop: -2,
            }}
            src={getImage["ingSistemasLogo"].ruta}
          ></Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Footer;
