import { Box, Button, Stack, Typography } from "@mui/material";
import { LabelHome } from "./enums/label";
import Carousel from "react-material-ui-carousel";
import ProjectCard from "./components/projectCard";

export default function Home() {
  return (
    <Box>
      <Stack direction={"column"} spacing={3}>
        <SeccionPrimera />
        <SeccionSegunda />
      </Stack>
    </Box>
  );
}

const items = [1,2,3,4,5];

const SeccionPrimera = () => {
  return (
    <Box>
      <Stack direction={"column"} spacing={3}>
        <Box>
          <Typography variant="h2">{LabelHome.seccionPrimeraTitulo}</Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid black",
            width: { xs: "100%", md: 400 },
          }}
        >
          <Typography variant="h5">{LabelHome.seccionPrimeraCuerpo}</Typography>
        </Box>
        <Box>
          <Button variant="contained">{LabelHome.seccionPrimeraBoton}</Button>
        </Box>
      </Stack>
      <Box>
        <Carousel sx={{border: '1px solid black'}}>
            {
              items.map((element) => <ProjectCard key={element}/>)
            }
        </Carousel>
      </Box>
    </Box>
  );
};

const SeccionSegunda = () => {
  return (
    <Box>
      <Stack direction={"column"} spacing={3}>
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
    </Box>
  );
};
