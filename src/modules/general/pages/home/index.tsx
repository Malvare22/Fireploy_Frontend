import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
  Stack,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import CodeIcon from "@mui/icons-material/Code";

export default function Home() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          py: 10,
          backgroundColor: theme.palette.background.default,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Despliega proyectos al instante y crea portafolios profesionales
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            Una plataforma moderna para automatizar despliegues, gestionar proyectos y mostrar tu trabajo al mundo.
          </Typography>
          <Button variant="contained" size="large" endIcon={<RocketLaunchIcon />}>
            Comienza ahora
          </Button>
        </Container>
      </Box>

      {/* Features */}
      <Container sx={{ py: 10 }}>
        <Grid container spacing={4}>
          {[
            {
              title: "Automatización de despliegues",
              icon: <AutoFixHighIcon fontSize="large" color="primary" />,
              desc: "Configura tus despliegues con un solo clic. Integración con Git, Docker, y más.",
            },
            {
              title: "Creación de portafolios",
              icon: <FolderSpecialIcon fontSize="large" color="primary" />,
              desc: "Organiza tus proyectos y muéstralos en un portafolio personalizable y profesional.",
            },
            {
              title: "Integración continua",
              icon: <CodeIcon fontSize="large" color="primary" />,
              desc: "Conecta tus repos y activa pipelines para automatizar pruebas, builds y releases.",
            },
          ].map(({ title, icon, desc }) => (
            <Grid item xs={12} md={4} key={title}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Stack spacing={2} alignItems="center" textAlign="center">
                    {icon}
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {desc}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Cómo Funciona */}
      <Box sx={{ py: 10, backgroundColor: theme.palette.grey[50] }}>
        <Container>
          <Typography variant="h4" textAlign="center" mb={6}>
            ¿Cómo funciona?
          </Typography>
          <Grid container spacing={4}>
            {[
              "Conecta tu cuenta de GitHub o GitLab",
              "Configura tu pipeline de despliegue",
              "Publica y comparte tu portafolio con un link único",
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Paso {index + 1}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {step}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Final */}
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            ¿Listo para acelerar tus despliegues?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Únete a cientos de desarrolladores que ya usan nuestra plataforma.
          </Typography>
          <Button variant="contained" size="large" endIcon={<RocketLaunchIcon />}>
            Empieza Gratis
          </Button>
        </Container>
      </Box>

      {/* Footer simple */}
      <Box sx={{ py: 4, backgroundColor: theme.palette.grey[200], textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} TuSoftware.dev — Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
}
