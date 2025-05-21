import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  Box,
  Button,
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
import React, { ReactNode, useState } from "react";
// import { useNavigate } from "react-router";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import GitHubIcon from "@mui/icons-material/GitHub";
import { getImage } from "@modules/general/utils/getImage";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useNavigate } from "react-router";
import { rutasGeneral } from "@modules/general/router/routes";

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

  deployTitle = "Despliegue de Proyectos",
  deployText = "Coloca a funcionar tus aplicativos web, y disfruta de las siguientes características:",
  deployShareTitle = "Comparte",
  deployHTTPSTitle = "Seguridad",
  deployDBTitle = "Base de datos",
  deployLayersTitle = "Arquitectura dos capas",
  deployShareBody = "Compartir proyectos es importante porque permite colaborar con otros, recibir retroalimentación, generar oportunidades, demostrar tus habilidades y, además, puede inspirar a quienes te rodean.",
  deployHTTPSBody = "Protege la información que se transmite entre tu navegador y un sitio web mediante cifrado. Esto evita que terceros puedan interceptar o modificar datos sensibles, como contraseñas, tarjetas de crédito o información personal",
  deployDBBody = "Crear, administrar y consultar bases de datos desde cualquier lugar con conexión a internet, sin necesidad de instalar software localmente.",
  deployLayersBody = "Esta arquitectura facilita el desarrollo, la implementación y el mantenimiento del sistema, ya que separa claramente las responsabilidades.",

  portafolioTitle = "Portafolio",
  portafolioBody = "Crea un portafolio online donde se encuentren en tiempo real todos tus proyectos desplegados con Fireploy, y explora los de los demás. Genera oportunidades, demuestra tus habilidades, e inspira.",
  portafolioButton = "Explora portafolios",

  educacional = "Adaptada al ámbito académico",
  educacionalTitle1 = "Organización de cursos",
  educacionalBody1 = "Agrupa tus contenidos por niveles, temas o tecnologías. Facilita el aprendizaje estructurado para que cada curso tenga un recorrido claro y progresivo.",
  educacionalTitle2 = "Impulsa a tus alumnos",
  educacionalBody2 = "Dales acceso a aplicaciones prácticas, retos interactivos y proyectos reales. Motiva su crecimiento con experiencias de aprendizaje vivas y aplicables.",
  educacionalTitle3 = "Aprendizaje centrado en la práctica",
  educacionalBody3 = "Convierte cada clase en una oportunidad de experimentar. Los alumnos aprenden creando, probando y desplegando sus propias apps.",
  educacionalTitle4 = "Control y seguimiento del progreso",
  educacionalBody4 = "Sigue el avance de tus alumnos por curso, actividad y proyecto. Visualiza quién ha completado qué y personaliza el ritmo de enseñanza.",
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
    <Box>
      <Box sx={{ paddingX: { md: 4, xs: 2 }, height: "90vh" }}>
        <Principal />
      </Box>
      <Stack sx={{ backgroundColor: theme.palette.background.default }}>
        {/* <Secondary /> */}
        <Deploy />
      </Stack>
      <Stack sx={{ backgroundColor: "none" }}>
        <PortafolioSection />
      </Stack>
      <Stack sx={{ backgroundColor: theme.palette.background.default, marginBottom: -10 }}>
        <AcademicSection />
      </Stack>
    </Box>
  );
}

function Principal() {
  const theme = useTheme();
  // const navigate = useNavigate();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Grid2 container sx={{ display: "flex", alignItems: "center" }}>
        <Grid2 size={{ md: 5, xs: 12 }}>
          <Stack sx={{ height: "100%" }} spacing={8}>
            <Typography variant="h2" sx={{ fontWeight: "440", color: "white" }} color="secondary">
              {labelHome.princialContent}
            </Typography>
            <Stack
              direction={{ md: "row", xs: "column" }}
              justifyContent={{ md: "start", xs: "center" }}
              alignItems={"center"}
              gap={3}
            >
              <Box>
                <Button
                  variant="contained"
                  size={!matches ? "medium" : "large"}
                  endIcon={<GitHubIcon />}
                  sx={{ borderRadius: 2, backgroundColor: "rgb(64, 56, 56)" }}
                >
                  {labelHome.github}
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  size={!matches ? "medium" : "large"}
                  endIcon={<DescriptionIcon />}
                  sx={{ borderRadius: 2, backgroundColor: "rgb(64, 56, 56)" }}
                >
                  {labelHome.docs}
                </Button>
              </Box>
              <Box>
                <Button variant="contained" size={!matches ? "medium" : "large"}>
                  {labelHome.principalButton}
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Grid2>
        {matches && (
          <Grid2 size={{ md: 7, xs: 12 }}>
            <Box>
              <PrincipalAnimation />
            </Box>
          </Grid2>
        )}
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

function Deploy() {
  const content: [ReactNode, string, string][] = [
    [<CloudSyncIcon sx={{ fontSize: 56 }} />, labelHome.deployDBTitle, labelHome.deployDBBody],
    [
      <ContactPageIcon sx={{ fontSize: 56 }} />,
      labelHome.deployHTTPSTitle,
      labelHome.deployHTTPSBody,
    ],
    [<SchoolIcon sx={{ fontSize: 56 }} />, labelHome.deployLayersTitle, labelHome.deployLayersBody],
    [<SchoolIcon sx={{ fontSize: 56 }} />, labelHome.deployShareTitle, labelHome.deployShareBody],
  ];

  const navigate = useNavigate();

  function handleButton() {
    navigate(rutasGeneral.explorarProyectos);
  }

  return (
    <Box
      sx={{
        marginX: -10,
        padding: 10,
        color: "black",
        // border: "1px solid rgb(0,0,0,0.1)",
        borderRadius: 1,
      }}
    >
      <Stack spacing={6}>
        <Stack spacing={2}>
          <Stack direction={"row"} spacing={2} justifyContent={"center"} alignItems={"center"}>
            <Typography textAlign={"center"} variant="h3">
              {labelHome.deployTitle}
            </Typography>
            <CloudSyncIcon sx={{ fontSize: 64 }} />
          </Stack>
          <Typography textAlign={"center"}>{labelHome.deployText}</Typography>
        </Stack>

        <Grid2 container spacing={4} sx={{ paddingX: 10 }}>
          {content.map((x) => {
            return (
              <Grid2
                size={6}
                component={Paper}
                variant="dark"
                sx={{
                  border: "1px solid black",
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  {x[0]}
                  <Stack spacing={1}>
                    <Typography variant="h5">{x[1]}</Typography>
                    <Typography>{x[2]}</Typography>
                  </Stack>
                </Stack>
              </Grid2>
            );
          })}
        </Grid2>
        <Stack alignItems={"center"}>
          <Box>
            <Button variant="contained" color="primary" onClick={handleButton}>
              {"Explora Proyectos"}
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

function PortafolioSection() {
  const navigate = useNavigate();

  function handleButton() {
    navigate(rutasGeneral.explorarPortafolios);
  }

  return (
    <Grid2 container sx={{ color: "white", marginX: 20, padding: 4 }} spacing={4}>
      <Grid2 size={5}>
        <Box
          component={"img"}
          src={getImage["portafolio_home"].ruta ?? ""}
          sx={{ width: "100%", height: "300px", objectFit: "contain" }}
        />
      </Grid2>
      <Grid2 size={7}>
        <Stack spacing={3}>
          <Typography variant="h3">{labelHome.portafolioTitle}</Typography>
          <Typography variant="body1">{labelHome.portafolioBody}</Typography>
          <Stack alignItems={"start"}>
            <Box>
              <Button variant="contained" onClick={handleButton} color="secondary">
                {labelHome.portafolioButton}
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Grid2>
    </Grid2>
  );
}

function ControlledAccordions() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid2 container spacing={4}>
      <Grid2 size={{ md: 6, xs: 12 }}>
        <CustomAccordion
          body={labelHome.educacionalBody1}
          title={labelHome.educacionalTitle1}
          expanded={expanded}
          handleChange={handleChange}
          value={"1"}
        />
      </Grid2>
      <Grid2 size={{ md: 6, xs: 12 }}>
        <CustomAccordion
          body={labelHome.educacionalBody2}
          title={labelHome.educacionalTitle2}
          expanded={expanded}
          handleChange={handleChange}
          value={"2"}
        />
      </Grid2>
      <Grid2 size={{ md: 6, xs: 12 }}>
        <CustomAccordion
          body={labelHome.educacionalBody3}
          title={labelHome.educacionalTitle3}
          expanded={expanded}
          handleChange={handleChange}
          value={"3"}
        />
      </Grid2>
      <Grid2 size={{ md: 6, xs: 12 }}>
        <CustomAccordion
          body={labelHome.educacionalBody4}
          title={labelHome.educacionalTitle4}
          expanded={expanded}
          handleChange={handleChange}
          value={"4"}
        />
      </Grid2>
    </Grid2>
  );
}

type PropsCustomerAccordion = {
  expanded: string | false;
  handleChange: Function;
  title: string;
  body: string;
  value: string;
};
function CustomAccordion({ body, expanded, handleChange, title, value }: PropsCustomerAccordion) {
  const theme = useTheme();
  return (
    <Accordion expanded={expanded === value} onChange={handleChange(value)}>
      <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
        <Stack direction={"row"} spacing={2}>
          <Box
            sx={{
              height: "100%",
              width: "3px",
              backgroundColor:
                expanded == value ? theme.palette.success.main : theme.palette.action.hover,
            }}
          />
          <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ marginLeft: "18px" }}>{body}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

function AcademicSection() {
  return (
    <Stack spacing={3} alignItems={"center"} paddingY={4}>
      <Typography variant="h3">{labelHome.educacional}</Typography>
      <SchoolIcon sx={{ fontSize: 56 }} />
      <Grid2 container>
        <Grid2 size={12} sx={{ marginX: 20 }}>
          <ControlledAccordions />
        </Grid2>
      </Grid2>
    </Stack>
  );
}
