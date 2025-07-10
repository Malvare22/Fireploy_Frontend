import { getImage } from "@modules/general/utils/getImage";
import { TECNOLOGIES } from "@modules/proyectos/utils/technologies";
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/system";
import { keyframes } from "@emotion/react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { openInNewTab } from "@modules/general/utils/openTab";
import HelpIcon from "@mui/icons-material/Help";

export enum labelTecnologiesView {
  title = "Tecnologías",
  bodyPrincial = "Fireploy te permite desplegar en multiples tecnologías orientadas al desarrollo web",
  subTitle = "Templates",
  bodySecondary = "Consisten en plantillas adaptadas al funcionamiento de despliegue automático de Fireploy, ideal que los uses al arrancar tu proyecto 😉",
}

/**
 * TecnologiesView component – Renders a section showcasing technologies available for deployment.
 * Includes introductory text, a carousel banner, and a grid of technology cards.
 *
 * This component provides an overview of technologies supported by Fireploy,
 * highlighting templates and links to documentation and repositories.
 *
 * @component
 *
 * @returns A layout section containing information about deployable technologies and associated resources.
 *
 * @example
 * ```tsx
 * <TecnologiesView />
 * ```
 */
function TecnologiesView() {
  const init = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }`;

  type FilteredKeys = keyof typeof TECNOLOGIES;
  const tecnologies: [FilteredKeys, string, string, string, string, string][] = [
    [
      "Html",
      getImage["html5"].ruta,
      "Es el componente más básico de la Web. Define el significado y la estructura del contenido web. Además de HTML, generalmente se utilizan otras tecnologías para describir la apariencia/presentación de una página web (CSS) o la funcionalidad/comportamiento (JavaScript).",
      "http://fireploy.online:3001/docs/introduccion",
      "https://developer.mozilla.org/es/docs/Web/HTML",
      "https://github.com/Fireploy/Html-Template",
    ],
    [
      "Angular",
      getImage["angular"].ruta,
      "Es un marco web que permite a los desarrolladores crear aplicaciones rápidas y confiables. Angular, gestionado por un equipo dedicado de Google, ofrece un amplio conjunto de herramientas, API y bibliotecas para simplificar y optimizar tu flujo de trabajo de desarrollo.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://angular.dev/",
      "https://github.com/Fireploy/Angular-Template",
    ],
    [
      "React",
      getImage["react"].ruta,
      "React es una biblioteca. Te permite agrupar componentes, pero no prescribe cómo hacer el enrutamiento y la obtención de datos.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://es.react.dev/",
      "https://github.com/Fireploy/React-Template",
    ],
    [
      "Nextjs",
      getImage["nextjs"].ruta,
      "Utilizado por algunas de las empresas más grandes del mundo, Next.js le permite crear aplicaciones web de alta calidad con el poder de los componentes React",
      "http://fireploy.online:3001/docs/introduccion",
      "https://nextjs.org/",
      "https://github.com/Fireploy/NextJS-Template",
    ],
    [
      "Nodejs",
      getImage["nodejs_banner"].ruta,
      "Node.js® es un entorno de ejecución de JavaScript multiplataforma, de código abierto y gratuito que permite a los desarrolladores crear servidores, aplicaciones web, herramientas de línea de comando y scripts.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://nodejs.org/es",
      "https://github.com/Fireploy/React-Template",
    ],

    [
      "Expressjs",
      getImage["expressjs_banner"].ruta,
      "Express es un marco de aplicación web Node.js mínimo y flexible que proporciona un conjunto sólido de características para aplicaciones web y móviles.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://expressjs.com/",
      "https://github.com/Fireploy/Express-Template",
    ],
    [
      "Nestjs",
      getImage["nest"].ruta,
      "NestJS es un framework para aplicaciones Node.js escalables y mantenibles. Está construido con TypeScript y utiliza los principios de la programación orientada a objetos y funcional. Ideal para desarrollar aplicaciones del lado del servidor modernas.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://nestjs.com/",
      "https://github.com/Fireploy/NestJS-Template",
    ],
    [
      "Springboot",
      getImage["springboot"].ruta,
      "Spring Boot facilita la creación de aplicaciones independientes basadas en Spring y de nivel de producción que puedes simplemente ejecutar. La mayoría de las aplicaciones Spring Boot requieren una configuración mínima de Spring.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://spring.io/projects/spring-boot",
      "https://github.com/Fireploy/SpringBoot-Template",
    ],
    [
      "Java",
      getImage["java"].ruta,
      "Java es un lenguaje de programación orientado a objetos ampliamente utilizado para construir aplicaciones robustas, seguras y portables. Su plataforma permite desarrollar desde aplicaciones móviles hasta sistemas empresariales.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://www.oracle.com/java/",
      "https://github.com/Fireploy/Java-Template",
    ],

    [
      "Django",
      getImage["django_banner"].ruta,
      "Django es un framework web de alto nivel basado en Python que fomenta el desarrollo rápido y un diseño limpio y pragmático. Desarrollado por desarrolladores experimentados, se encarga de gran parte de las complicaciones del desarrollo web, para que puedas concentrarte en escribir tu aplicación sin tener que reinventar la rueda. Es gratuito y de código abierto.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://www.djangoproject.com/",
      "",
    ],
    [
      "Fastapi",
      getImage["fastAPI"].ruta,
      "FastAPI es un framework moderno, rápido (de alto rendimiento) para construir APIs con Python 3.7+ basado en las anotaciones de tipo estándar de Python. Está enfocado en la facilidad de uso, rendimiento y validación automática de datos.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://fastapi.tiangolo.com/",
      "https://github.com/Fireploy/FastAPI-Template",
    ],

    [
      "Php",
      getImage["php_banner"].ruta,
      "PHP es un lenguaje de programación del lado del servidor ampliamente usado para el desarrollo web. Permite crear sitios dinámicos y se integra fácilmente con bases de datos como MySQL. Es ideal para soluciones ligeras y personalizadas sin frameworks.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://www.php.net/",
      "https://github.com/Fireploy/PHP-Template",
    ],
    [
      "Symfony",
      getImage["symfony_banner"].ruta,
      "Symfony es un conjunto de paquetes PHP, un marco de aplicaciones web, una filosofía y una comunidad, todos trabajando juntos en armonía.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://symfony.com/",
      "https://github.com/Fireploy/Symfony-Template",
    ],
    [
      "Laravel",
      getImage["laravel"].ruta,
      "Ofrece un ecosistema completo para desarrolladores web. Nuestro framework PHP de código abierto, productos, paquetes y kits de inicio ofrecen todo lo necesario para crear, implementar y supervisar aplicaciones web.",
      "http://fireploy.online:3001/docs/introduccion",
      "https://laravel.com/",
      "https://github.com/Fireploy/Laravel-Template",
    ],
  ];

  return (
    <Stack spacing={5} sx={{ animation: `${init} 2s`, color: "white" }}>
      <Box>
        <Stack spacing={3}>
          <Typography textAlign={"center"} variant="h3">
            {labelTecnologiesView.title}
          </Typography>
          <Typography textAlign={"center"} sx={{ paddingX: { md: 20, xs: 2 } }} variant="h6">
            {labelTecnologiesView.bodyPrincial}
          </Typography>
          <Carousel />
        </Stack>
      </Box>
      <Stack spacing={3} sx={{ paddingX: { md: 10, xs: 2 } }}>
        <Stack spacing={3}>
          <Typography textAlign={"center"} variant="h4">
            {labelTecnologiesView.subTitle}
          </Typography>
          <Typography textAlign={"center"}>{labelTecnologiesView.bodySecondary}</Typography>
        </Stack>
        <Grid container spacing={3}>
          {tecnologies.map(([title, img, text, myDoc, oficialDoc, template]) => (
            <Grid size={{ md: 6, xs: 12 }}>
              <CardTecnology
                img={img}
                subtitle={text}
                title={title}
                urlDoc={myDoc}
                urlOficialDoc={oficialDoc}
                urlTemplate={template}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", paddingX: 2 }}>
        <Typography variant="caption" maxWidth={"800px"} textAlign={"center"}>
          {
            "Fireploy no asume ninguna autoría sobre lo redactado en las descripciones de los frameworks y librerías plasmadas en esta vista, así como sus respectivas imágenes, dicha información fue extraída de sus sitios web oficiales y posee unicamente fines informativos y educativos."
          }
        </Typography>
      </Box>
    </Stack>
  );
}

export default TecnologiesView;

/**
 * Carousel component – Displays a scrolling carousel of technology banners.
 * The carousel continuously scrolls banners horizontally to showcase various technologies.
 *
 * This component is responsive and adjusts the animation speed based on the screen size.
 *
 * @component
 *
 * @returns {JSX.Element} A horizontally scrolling carousel of technology banners.
 *
 * @example
 * ```tsx
 * <Carousel />
 * ```
 */
function Carousel() {
  type FilteredKeys = keyof typeof TECNOLOGIES;
  const tecs: [FilteredKeys, string][] = [
    ["Angular", getImage["angular_banner"].ruta],
    ["React", getImage["react"].ruta],
    ["Nextjs", getImage["nextjs_banner"].ruta],
    ["Laravel", getImage["laravel_banner"].ruta],
    ["Springboot", getImage["springboot_banner"].ruta],
    ["Expressjs", getImage["expressjs_banner"].ruta],
    ["Symfony", getImage["symfony_banner"].ruta],
    ["Php", getImage["php_banner"].ruta],
    ["Nodejs", getImage["nodejs_banner"].ruta],
    ["Django", getImage["django_banner"].ruta],
    ["Html", getImage["html5"].ruta],
    ["Nestjs", getImage["nest_banner"].ruta],
    ["Java", getImage["java_banner"].ruta],
    ["Fastapi", getImage["fastapi_banner"].ruta],
  ];

  const scrollRightToLeft = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.25)",
          paddingY: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { md: 10, xs: 4 },
            animation: `${scrollRightToLeft} ${matches ? "30s" : "20s"} linear infinite`,
            width: "fit-content",
          }}
        >
          {[...tecs, ...tecs].map((img, idx) => (
            <Box
              key={idx}
              component="img"
              src={img[1]}
              sx={{ height: { md: 60, xs: 40 }, objectFit: "contain" }}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}

type PropsCardTecnology = {
  img: string;
  title: string;
  subtitle: string;
  urlDoc: string;
  urlOficialDoc: string;
  urlTemplate: string;
};

/**
 * CardTecnology component – Displays a card for a single technology with an image, title, description, and external link.
 * The card includes the technology's image, a short description, and a link to more details about the technology.
 *
 * @component
 *
 * @param {string} img - The image source URL for the technology.
 * @param {string} title - The title of the technology.
 * @param {string} subtitle - A brief description of the technology.
 * @param {string} url - The URL for the technology's details.
 *
 * @returns {JSX.Element} A card with technology information and a link to more details.
 *
 * @example
 * ```tsx
 * <CardTecnology img="react.png" title="React" subtitle="A JavaScript library for building UIs" url="https://React.org" />
 * ```
 */
function CardTecnology({
  img,
  subtitle,
  title,
  urlDoc,
  urlOficialDoc,
  urlTemplate,
}: PropsCardTecnology) {
  function handleSupport() {
    openInNewTab(urlDoc);
  }

  function handleTemplate() {
    openInNewTab(urlTemplate);
  }

  function handleOfficial() {
    openInNewTab(urlOficialDoc);
  }

  return (
    <Paper variant="glass" sx={{ height: "100%" }}>
      <Grid container sx={{ overflow: "hidden", height: "inherit" }} spacing={3} padding={0}>
        <Grid size={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: 1,
              boxSizing: "border-box",
            }}
          >
            <Box
              component="img"
              src={img}
              alt={title}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                width: "auto",
                height: "auto",
              }}
            />
          </Box>
        </Grid>
        <Grid size={8}>
          <Stack spacing={2} sx={{ height: "100%" }} justifyContent={"space-between"}>
            <Stack spacing={1}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography variant="h4">{title}</Typography>
                <IconButton onClick={handleSupport}>
                  <HelpIcon sx={{ color: "white" }} />
                </IconButton>
              </Stack>
              <Typography variant="body2">{subtitle}</Typography>
            </Stack>
            <Stack spacing={1} sx={{ paddingBottom: 2 }}>
              <Box>
                <Button
                  endIcon={<RocketLaunchIcon />}
                  onClick={handleTemplate}
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 2 }}
                >
                  <Typography variant="caption">{"Get Template by Fireploy"}</Typography>
                </Button>
              </Box>
              <Box>
                <Button
                  endIcon={<OpenInNewIcon />}
                  onClick={handleOfficial}
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: 2 }}
                >
                  <Typography variant="caption">{"Ver Documentación oficial"}</Typography>
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
