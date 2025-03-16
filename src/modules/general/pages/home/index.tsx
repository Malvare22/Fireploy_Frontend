import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { LabelHome } from "./enums/label";
import Carousel from "react-material-ui-carousel";
import ProjectCard, { usuarioPrueba } from "./components/projectCard";
import PortafolioCard from "./components/portafolioCard";
import AtomicModel from "@modules/general/components/animations/atomicModel";

export default function Home() {
  return (
    <Box>
      <Stack direction={"column"} spacing={10}>
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
    <Box  sx={{
      display: "flex",
      flexDirection: { md: "row", xs: "column" },
      gap: 4,
      justifyContent: 'center'    }}>
      <Card sx={{padding: 4, width: {md: 700}}}><Stack direction={"column"} spacing={4}>
        <Box>
          <Typography variant="h1">{LabelHome.seccionPrimeraTitulo}</Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "100%"},
          }}
        >
          <Typography variant="h4">{LabelHome.seccionPrimeraCuerpo}</Typography>
        </Box>
        <Box>
          <Button variant="contained">{LabelHome.seccionPrimeraBoton}</Button>
        </Box>
      </Stack></Card>
      <AtomicModel/>
    </Box>
  );
};

const SeccionSegunda = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        gap: 4,
      }}
    >
      <Card sx={{padding: 3}}>
      <Stack direction={"column"} spacing={5} sx={{ maxWidth: "600px" }}>
        <Box>
          <Typography variant="h3">{LabelHome.seccionSegundaTitulo}</Typography>
        </Box>
        <Box>
          <Typography variant="h5">{LabelHome.seccionSegundaCuerpo}</Typography>
        </Box>
        <Box>
          <Button variant="contained">{LabelHome.seccionSegundaBoton}</Button>
        </Box>
      </Stack>
      </Card>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          gap: 2,
        }}
      >
        <ProjectCard />
        <ProjectCard />
      </Box>
    </Box>
  );
};

const SeccionTercera = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}>
      <Stack spacing={2} width={'70%'}>
        <PortafolioCard usuario={usuarioPrueba} />
        <PortafolioCard usuario={usuarioPrueba} />
      </Stack>
      <Card sx={{ marginLeft: { md: 4 }, flexGrow: 1, padding: 2 }}>
        
      <Stack
        direction={"column"}
        spacing={5}
      >
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
        </Card>
    </Box>
  );
};
