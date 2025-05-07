import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  Box,
  Button,
  Card,
  Grid2,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styles from "./home.module.css";
import {
  BracesAsteriskIcon,
  DatabaseFillGearIcon,
  PaletteIcon,
  PersonLinesFillIcon,
} from "@modules/general/components/customIcons";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import ProjectCard from "@modules/general/components/projectCard";
import { proyectoEjemplo } from "@modules/proyectos/types/proyecto.card";
import PortafolioCard from "@modules/general/components/portafolioCard";
import { usuarioPrueba } from "@modules/usuarios/types/usuario.portafolio";
import { rutasGeneral } from "@modules/general/router/router";

export enum labelHome {
  princialContent = "Despliega tus aplicativos web con unos clicks y compártelos con los de los demás",
  princialButtonText = "Registrarme",

  sectionProjectsTitle = "Comparte Tus Proyectos",
  sectionProjectsBody = "Fireploy te permite visualizar los proyectos en ejecución de otros usuarios, puedes conocer en que consisten y cuales son las tecnologías que los componen, así como calificarlos 😎",
  sectionProjectsButton = "Explora proyectos",

  sectionPortafoliosTitle = "Visualiza tu portafolio",
  sectionPortafoliosBody = "Tus proyectos desplegados con Fireploy se anexan a un portafolio publico, puedes vincularle diferentes redes sociales, y puedes ver los portafolios de los demás. Puede que tu próximo compañero de desarrollo esté a solo unas búsquedas 🤑",
  sectionPortafoliosButton = "Explora portafolios",
}

/**
 * Home component serves as the landing page of the application.
 * It contains multiple sections such as the principal content, project showcase,
 * and portfolio preview. It provides navigation for users to explore various features.
 *
 * @component
 * @returns {JSX.Element} The home page layout with sections showcasing content and actions.
 */
export default function Home() {
  return (
    <Box>
      <Principal />
      <Stack marginTop={4} alignItems={"center"} paddingX={{ md: 10, xs: 2 }} spacing={4}>
        <SectionProjects />
        <SectionPortafolios />
      </Stack>
    </Box>
  );
}

function SectionProjects() {
  const navigate = useNavigate();
  const button = (
    <Button onClick={() => navigate(0)} variant="contained">
      {labelHome.sectionProjectsButton}
    </Button>
  );
  const panel = (
    <Stack
      direction={{ md: "row", xs: "column" }}
      justifyContent={{ md: "center" }}
      alignItems={{ xs: "center", md: "start" }}
      spacing={4}
    >
      <ProjectCard proyecto={proyectoEjemplo} handleOpen={() => {}} />
      <ProjectCard proyecto={proyectoEjemplo} handleOpen={() => {}} />
    </Stack>
  );
  return (
    <SectionHome
      col1={panel}
      col2={labelHome.sectionProjectsBody}
      title={labelHome.sectionProjectsTitle}
      button={button}
    ></SectionHome>
  );
}

function SectionPortafolios() {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const button = (
    <Button onClick={() => navigate(0)} variant="contained">
      {labelHome.sectionPortafoliosButton}
    </Button>
  );
  const panel = (
    <Grid2 container spacing={2} paddingX={4} alignItems={"center"}>
      <Grid2 size={{ md: 4, xs: 12 }}>
        <PortafolioCard usuario={usuarioPrueba} />
      </Grid2>
      {!matches && (
        <>
          {" "}
          <Grid2 size={{ md: 4, xs: 12 }}>
            <PortafolioCard usuario={usuarioPrueba} />
          </Grid2>
          <Grid2 size={{ md: 4, xs: 12 }}>
            <PortafolioCard usuario={usuarioPrueba} />
          </Grid2>
        </>
      )}
    </Grid2>
  );
  return (
    <SectionHome
      col1={panel}
      col2={labelHome.sectionPortafoliosBody}
      title={labelHome.sectionPortafoliosTitle}
      button={button}
    ></SectionHome>
  );
}

function Principal() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Stack spacing={3} marginTop={{ xs: -20, md: -10 }} alignItems={"center"} overflow={"hidden"}>
        <PrincipalAnimation />
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} paddingX={4}>
        <Card
          sx={{
            backgroundColor: theme.palette.terciary.main,
            marginTop: { xs: -16, md: 0 },
            width: 800,
            paddingX: { md: 3 },
            paddingY: 2,
          }}
        >
          <Stack spacing={2} alignItems={"center"}>
            <Typography
              sx={{ fontWeight: 600, color: "white", fontSize: { md: 30, xs: 26 } }}
              textAlign={"center"}
            >
              {labelHome.princialContent}
            </Typography>
            <Box>
              <Button variant="contained" onClick={() => navigate(rutasGeneral.registrar)}>
                {labelHome.princialButtonText}
              </Button>
            </Box>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}
function PrincipalAnimation() {
  const totalSpikes = 16;
  const radius = 120;

  const theme = useTheme();

  const sxIcons: SxProps = {
    fontSize: 48,
    backgroundColor: theme.palette.info.main,
    color: "white",
    padding: 2,
    borderRadius: 4,
  };

  const rays = Array.from({ length: totalSpikes }, (_, i) => {
    const angle = (360 / totalSpikes) * i;
    return (
      <Box
        key={i}
        className={styles.ray}
        sx={{
          position: "absolute",
          transform: `
            rotate(${angle}deg)
            translate(${radius}px)
          `,
          transformOrigin: "0 0",
        }}
      />
    );
  });

  return (
    <Box sx={{ transform: { xs: "scale(0.4)", sm: "scale(0.6)", md: "scale(1)" } }}>
      <Box className={styles.container}>
        <Box className={styles.containerRaysWrapper}>
          <Box className={styles.containerRays}>{rays}</Box>
        </Box>
        <Box className={styles.sun} />
        <Box className={styles.iconContainer}>
          <RocketLaunchIcon sx={{ fontSize: 96 }} className={styles.icon} />
        </Box>
        <Box>
          <DatabaseFillGearIcon sx={sxIcons} className={styles.iconElement} />
          <BracesAsteriskIcon sx={sxIcons} className={styles.iconElement} />
          <PaletteIcon sx={sxIcons} className={styles.iconElement} />
          <PersonLinesFillIcon sx={sxIcons} className={styles.iconElement} />
        </Box>
        <Box height="100%" width="100%" sx={{ line: { stroke: theme.palette.primary.main } }}>
          <svg className={styles.containerLines} height="100%" width="100%">
            <line x1="150" y1="120" x2="300" y2="120" />
            <line x1="300" y1="120" x2="300" y2="200" />
            <line x1="300" y1="200" x2="500" y2="200" />

            <line x1="500" y1="200" x2="700" y2="200" />
            <line x1="700" y1="200" x2="700" y2="120" />
            <line x1="700" y1="120" x2="800" y2="120" />

            <line x1="300" y1="280" x2="500" y2="280" />
            <line x1="300" y1="280" x2="300" y2="360" />
            <line x1="300" y1="360" x2="140" y2="360" />

            <line x1="500" y1="280" x2="700" y2="280" />
            <line x1="700" y1="280" x2="700" y2="360" />
            <line x1="700" y1="360" x2="820" y2="360" />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}

type PropsSectionHome = {
  col1: ReactNode;
  col2: ReactNode;
  title: string;
  button: JSX.Element;
};

function SectionHome({ col1, col2, title, button }: PropsSectionHome) {
  const theme = useTheme();
  return (
    <Card>
      <Stack spacing={4}>
        <Box sx={{ backgroundColor: theme.palette.primary.light }}>
          <Typography variant="h4" color="white" padding={1} textAlign={"center"}>
            {title}
          </Typography>
        </Box>
        {col1}
        <Stack justifyContent={"space-between"} padding={2} spacing={2}>
          <Typography variant="h6">{col2}</Typography>
          <Stack alignItems={"end"}>
            <Box>{button}</Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
