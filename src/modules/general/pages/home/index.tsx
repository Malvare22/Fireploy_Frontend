import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LabelHome } from "../../enums/labelHome";
import Carousel from "react-material-ui-carousel";
import AnimatedCard from "@modules/general/components/animatedCard";
import AtomicModel from "@modules/general/components/animations/atomicModel";
import ProjectCard from "@modules/general/components/projectCard";
import PortafolioCard from "@modules/general/components/portafolioCard";
import { usuarioPrueba } from "@modules/usuarios/types/usuario.portafolio";

export default function Home() {
  return (
    <Box>
      <Stack direction={"column"} spacing={{ xl: 10, xs: 4 }}>
        <SeccionPrimera />
        <SeccionSegunda />
        <SeccionTercera />
      </Stack>
    </Box>
  );
}

const items = [1, 2, 3, 4, 5];

const SeccionPrimera = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        gap: 4,
        justifyContent: "center",
      }}
    >
      <AnimatedCard sx={{ padding: 4, width: { md: 700 } }}>
        <Stack direction={"column"} spacing={4}>
          <Box>
            <Typography variant="h3">
              {LabelHome.seccionPrimeraTitulo}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "100%" },
            }}
          >
            <Typography variant="h5">
              {LabelHome.seccionPrimeraCuerpo}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained">{LabelHome.seccionPrimeraBoton}</Button>
          </Box>
        </Stack>
      </AnimatedCard>
      <AtomicModel />
    </Box>
  );
};

const SeccionSegunda = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xl: "row", xs: "column" },
        justifyContent: "center",
        flexGrow: 1,
        gap: 3,
      }}
    >
      <AnimatedCard sx={{ padding: 3 }}>
        <Stack direction={"column"} spacing={5} sx={{ maxWidth: "520px" }}>
          <Box>
            <Typography variant="h3">
              {LabelHome.seccionSegundaTitulo}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">
              {LabelHome.seccionSegundaCuerpo}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained">{LabelHome.seccionSegundaBoton}</Button>
          </Box>
        </Stack>
      </AnimatedCard>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          gap: 2,
          alignItems: "center",
        }}
      >
        <Carousel
          autoPlay={true} // Desactiva el autoplay para que el usuario controle el cambio
          animation="fade" // Animación de deslizamiento
          sx={{ width: "100%", padding: 0, height: "100%", paddingBottom: 2 }}
          indicators={true} // Oculta los indicadores (puntos) del carrusel
        >
          {isMobile
            ? // Una carta por slide en pantallas pequeñas
              items.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", justifyContent: "center", margin: 0 }}
                >
                  <ProjectCard />
                </Box>
              ))
            : // Dos cartas por slide en pantallas grandes
              Array(Math.ceil(items.length / 2))
                .fill(0)
                .map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "center",
                      margin: 2,
                    }}
                  >
                    <ProjectCard />
                    {items[index * 2 + 1] && <ProjectCard />}
                    {/* Renderiza la segunda carta si existe */}
                  </Box>
                ))}
        </Carousel>
      </Box>
    </Box>
  );
};

const SeccionTercera = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xl: "row", xs: "column-reverse" },
        gap: 3,
      }}
    >
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Carousel
          autoPlay={true} // Desactiva el autoplay para que el usuario controle el cambio
          animation="fade" // Animación de deslizamiento
          sx={{
            padding: 0,
            height: "100%",
            paddingBottom: 2,
          }}
          indicators={true} // Oculta los indicadores (puntos) del carrusel,
          fullHeightHover
        >
          {isMobile
            ? // Una carta por slide en pantallas pequeñas
              items.map((item, index) => (
                <Box sx={{ width: "100%" }}>
                  <PortafolioCard usuario={usuarioPrueba} />
                </Box>
              ))
            : // Dos cartas por slide en pantallas grandes
              Array(Math.ceil(items.length / 2))
                .fill(0)
                .map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      justifyContent: "center",
                    }}
                  >
                    <PortafolioCard usuario={usuarioPrueba} />
                    {items[index * 2 + 1] ? (
                      <PortafolioCard usuario={usuarioPrueba} />
                    ) : (
                      <Box sx={{ visibility: "hidden" }}>
                        <PortafolioCard usuario={usuarioPrueba} />
                      </Box>
                    )}
                    {/* Renderiza la segunda carta si existe */}
                  </Box>
                ))}
        </Carousel>
      </Stack>
      <AnimatedCard sx={{ marginLeft: { xl: 4 }, flexGrow: 1, padding: 2 }}>
        <Stack direction={"column"} spacing={5}>
          <Box>
            <Typography variant="h3">
              {LabelHome.seccionTerceraTitulo}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">
              {LabelHome.seccionTerceraCuerpo}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained">{LabelHome.seccionTerceraBoton}</Button>
          </Box>
        </Stack>
      </AnimatedCard>
    </Box>
  );
};
