import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid2,
  Paper,
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
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import GitHubIcon from "@mui/icons-material/GitHub";
import { getImage } from "@modules/general/utils/getImage";

export enum labelHome {
  princialContent = "Despliega tus aplicativos web de manera automática",
  principalButton = "Comienza tu viaje",

  offersTitle = "Ofrecemos",
  offersContent1 = "Despliegue de aplicaciones",
  offersContent2 = "Vinculación de proyectos con portafolios",
  offersContent3 = "Organización de proyectos por secciones de cursos",

  sectionProjectsTitle = "Comparte Tus Proyectos",
  sectionProjectsBody = "Fireploy te permite visualizar los proyectos en ejecución de otros usuarios, puedes conocer en que consisten y cuales son las tecnologías que los componen, así como calificarlos 😎",
  sectionProjectsButton = "Explora proyectos",

  sectionPortafoliosTitle = "Visualiza tu portafolio",
  sectionPortafoliosBody = "Tus proyectos desplegados con Fireploy se anexan a un portafolio publico, puedes vincularle diferentes redes sociales, y puedes ver los portafolios de los demás. Puede que tu próximo compañero de desarrollo esté a solo unas búsquedas 🤑",
  sectionPortafoliosButton = "Explora portafolios",

  github = "Github",
  docs = "Documentación",
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
  const theme = useTheme();
  return (
    <Box sx={{ padding: 10 }}>
      <Principal />
      <Box sx={{ padding: -10, backgroundColor: theme.palette.background.default }}>
        <Secondary />
        <Deploy />
      </Box>
    </Box>
  );
}

function Principal() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Grid2 container sx={{ minHeight: "80vh" }}>
        <Grid2 size={5}>
          <Stack sx={{ height: "100%" }} spacing={4}>
            <Typography variant="h2" sx={{ fontWeight: "440", color: "white" }} color="secondary">
              {labelHome.princialContent}
            </Typography>
            <Stack direction={"row"} justifyContent={"center"} gap={3}>
              <Box>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<GitHubIcon />}
                  sx={{ borderRadius: 2, backgroundColor: "rgb(64, 56, 56)" }}
                >
                  {labelHome.github}
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<DescriptionIcon />}
                  sx={{ borderRadius: 2, backgroundColor: "rgb(64, 56, 56)" }}
                >
                  {labelHome.docs}
                </Button>
              </Box>
              <Box>
                <Button variant="contained" size="large">
                  {labelHome.principalButton}
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 size={7}>
          <Box marginY={"-6%"}>
            <PrincipalAnimation />
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
function PrincipalAnimation() {
  const totalSpikes = 16;
  const radius = "180%";

  const theme = useTheme();

  const sxIcons: SxProps = {
    width: "10%",
    height: "10%",
    backgroundColor: theme.palette.info.main,
    color: "white",
    padding: "1%",
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
            translate(${radius})
          `,
          transformOrigin: "0 0",
        }}
      />
    );
  });

  return (
    <Box>
      <Box className={styles.container}>
        <Box className={styles.containerRaysWrapper}>
          <Box className={styles.containerRays}>{rays}</Box>
        </Box>
        <Box className={styles.sun} />
        <Box className={styles.iconContainer}>
          <RocketLaunchIcon sx={{ width: "70%", height: "70%" }} className={styles.icon} />
        </Box>
        <Box>
          <DatabaseFillGearIcon sx={sxIcons} className={styles.iconElement} />
          <BracesAsteriskIcon sx={sxIcons} className={styles.iconElement} />
          <PaletteIcon sx={sxIcons} className={styles.iconElement} />
          <PersonLinesFillIcon sx={sxIcons} className={styles.iconElement} />
        </Box>
        <Box
          height="100%"
          width="100%"
          sx={{ line: { stroke: theme.palette.primary.main, strokeWidth: 0.5 } }}
        >
          <svg
            className={styles.containerLines}
            height="100%"
            width="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line x1="50" y1="50" x2="10" y2="15" />
            <line x1="50" y1="50" x2="10" y2="85" />
            <line x1="50" y1="50" x2="90" y2="15" />
            <line x1="50" y1="50" x2="90" y2="85" />
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

function Secondary() {
  const theme = useTheme();
  const content: [ReactNode, string][] = [
    [<CloudSyncIcon sx={{ fontSize: 56 }} />, "Despliegue Automático"],
    [<ContactPageIcon sx={{ fontSize: 56 }} />, "Despliegue Portafolios"],
    [<SchoolIcon sx={{ fontSize: 56 }} />, "Vinculación Académica"],
  ];

  function CardS({ icon, text }: { icon: ReactNode; text: string }) {
    return (
      <Stack alignItems={"center"} spacing={3}>
        <Typography variant="h5">{text}</Typography>
        {icon}
      </Stack>
    );
  }

  return (
    <Paper
      sx={{
        marginY: 10,
        marginX: 20,
      }}
      variant="light"
    >
      <Stack spacing={3}>
        <Typography textAlign={"center"} variant="h4">
          Ofrecemos
        </Typography>
        <Grid2 container>
          {content.map((x, i) => {
            if (i != 1)
              return (
                <Grid2 size={4}>
                  <CardS icon={x[0]} text={x[1]} />
                </Grid2>
              );
            else
              return (
                <>
                  <Grid2 size={4} display={"flex"} justifyContent={"space-between"}>
                    <Divider orientation="vertical" />
                    <CardS icon={x[0]} text={x[1]} />
                    <Divider orientation="vertical" />
                  </Grid2>
                </>
              );
          })}
        </Grid2>
      </Stack>
    </Paper>
  );
}

function Deploy() {
  const theme = useTheme();

  const content: [ReactNode, string][] = [
    [<CloudSyncIcon sx={{ fontSize: 56 }} />, "Seguridad y certificados SSH"],
    [<ContactPageIcon sx={{ fontSize: 56 }} />, "Gestor de base de datos"],
    [<SchoolIcon sx={{ fontSize: 56 }} />, "Comparte tus proyectos"],
    [<SchoolIcon sx={{ fontSize: 56 }} />, "Soporte a arquitecturas de dos capas"],
  ];

  function CardS({ icon, text }: { icon: ReactNode; text: string }) {
    return (
      <Stack alignItems={"center"} spacing={3}>
        {icon}
        <Typography variant="h5">{text}</Typography>
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        marginX: -10,
        padding: 10,
        color: "white",
        background:
          "linear-gradient(180deg, rgba(65, 58, 194, 1) 11%, rgba(76, 76, 230, 1) 51%, rgba(0, 212, 255, 1) 100%)",
        border: "1px solid rgb(0,0,0,0.1)",
        borderRadius: 1,
      }}
    >
      <Stack spacing={6}>
        <Stack direction={"row"} spacing={1} justifyContent={"center"} alignItems={"center"}>
          <Typography textAlign={"center"} variant="h4">
            Despliegue Automático
          </Typography>
          <CloudSyncIcon sx={{ fontSize: 64 }} />
        </Stack>
        <Typography textAlign={"center"} variant="h5">
          Nuestro eje principal es la automatización de despliegue de aplicativos web, simplemente
          necesitas agregar los repositorios de tu proyecto y seleccionar la tecnología
        </Typography>
        <Grid2 container columnSpacing={6}>
          {content.map((x) => {
            return (
              <Grid2 size={3} sx={{ border: "1px solid white", padding: 2, borderRadius: 2 }}>
                <CardS icon={x[0]} text={x[1]} />
              </Grid2>
            );
          })}
        </Grid2>
      </Stack>
    </Box>
  );
}
