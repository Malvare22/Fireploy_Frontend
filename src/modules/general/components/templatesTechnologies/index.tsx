import { REFERENCE_TO_SITES } from "@modules/general/enums/referencesToSites";
import { getImage } from "@modules/general/utils/getImage";
import { openInNewTab } from "@modules/general/utils/openTab";
import { TECNOLOGIES } from "@modules/proyectos/utils/technologies";
import { Box, Button, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import HelpIcon from "@mui/icons-material/Help";

type TemplatesTechnologiesProps = {
  mode?: "dark" | "light";
};

function TemplatesTechnologies({ mode = "dark" }: TemplatesTechnologiesProps) {
  return (
    <Box>
      <Stack spacing={3} sx={{ paddingX: { md: 10, xs: 2 } }}>
        <Stack spacing={3}>
          <Typography textAlign={"center"} variant={mode == "light" ? "h3" : "h4"}>
            {"Templates"}
          </Typography>
          <Typography textAlign={"center"}>
            {
              "Consisten en plantillas adaptadas al funcionamiento de despliegue automático de Fireploy, ideal que los uses al arrancar tu proyecto 😉"
            }
          </Typography>
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
                mode={mode}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", paddingX: 2, marginTop: 3 }}>
        <Typography variant="caption" maxWidth={"800px"} textAlign={"center"}>
          {
            "Fireploy no asume ninguna autoría sobre lo redactado en las descripciones de los frameworks y librerías plasmadas en esta vista, así como sus respectivas imágenes, dicha información fue extraída de sus sitios web oficiales y posee unicamente fines informativos y educativos."
          }
        </Typography>
      </Box>
    </Box>
  );
}

type PropsCardTecnology = {
  img: string;
  title: string;
  subtitle: string;
  urlDoc: string;
  urlOficialDoc: string;
  urlTemplate: string;
  mode: "light" | "dark";
};

function CardTecnology({
  img,
  subtitle,
  title,
  urlDoc,
  urlOficialDoc,
  urlTemplate,
  mode = "dark",
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
    <Paper variant={mode == "dark" ? "glass" : "dark"} sx={{ height: "100%" }}>
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

type FilteredKeys = keyof typeof TECNOLOGIES;

const tecnologies: [
  FilteredKeys,
  string,
  string,
  REFERENCE_TO_SITES,
  REFERENCE_TO_SITES,
  REFERENCE_TO_SITES | string,
][] = [
  [
    "Html",
    getImage["html5"].ruta,
    "Es el componente más básico de la Web. Define el significado y la estructura del contenido web. Además de HTML, generalmente se utilizan otras tecnologías para describir la apariencia/presentación de una página web (CSS) o la funcionalidad/comportamiento (JavaScript).",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_HTML,
    REFERENCE_TO_SITES.TEMPLATE_HTML,
  ],
  [
    "Angular",
    getImage["angular"].ruta,
    "Es un marco web que permite a los desarrolladores crear aplicaciones rápidas y confiables. Angular, gestionado por un equipo dedicado de Google, ofrece un amplio conjunto de herramientas, API y bibliotecas para simplificar y optimizar tu flujo de trabajo de desarrollo.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_ANGULAR,
    REFERENCE_TO_SITES.TEMPLATE_ANGULAR,
  ],
  [
    "React",
    getImage["react"].ruta,
    "React es una biblioteca. Te permite agrupar componentes, pero no prescribe cómo hacer el enrutamiento y la obtención de datos.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_REACT,
    REFERENCE_TO_SITES.TEMPLATE_REACT,
  ],
  [
    "Nextjs",
    getImage["nextjs"].ruta,
    "Utilizado por algunas de las empresas más grandes del mundo, Next.js le permite crear aplicaciones web de alta calidad con el poder de los componentes React",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_NEXTJS,
    REFERENCE_TO_SITES.TEMPLATE_NEXTJS,
  ],
  [
    "Nodejs",
    getImage["nodejs_banner"].ruta,
    "Node.js® es un entorno de ejecución de JavaScript multiplataforma, de código abierto y gratuito que permite a los desarrolladores crear servidores, aplicaciones web, herramientas de línea de comando y scripts.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_NODEJS,
    REFERENCE_TO_SITES.TEMPLATE_NODEJS, // Updated from original
  ],
  [
    "Expressjs",
    getImage["expressjs_banner"].ruta,
    "Express es un marco de aplicación web Node.js mínimo y flexible que proporciona un conjunto sólido de características para aplicaciones web y móviles.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_EXPRESSJS,
    REFERENCE_TO_SITES.TEMPLATE_EXPRESSJS,
  ],
  [
    "Nestjs",
    getImage["nest"].ruta,
    "NestJS es un framework para aplicaciones Node.js escalables y mantenibles. Está construido con TypeScript y utiliza los principios de la programación orientada a objetos y funcional. Ideal para desarrollar aplicaciones del lado del servidor modernas.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_NESTJS,
    REFERENCE_TO_SITES.TEMPLATE_NESTJS,
  ],
  [
    "Springboot",
    getImage["springboot"].ruta,
    "Spring Boot facilita la creación de aplicaciones independientes basadas en Spring y de nivel de producción que puedes simplemente ejecutar. La mayoría de las aplicaciones Spring Boot requieren una configuración mínima de Spring.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_SPRINGBOOT,
    REFERENCE_TO_SITES.TEMPLATE_SPRINGBOOT,
  ],
  [
    "Java",
    getImage["java"].ruta,
    "Java es un lenguaje de programación orientado a objetos ampliamente utilizado para construir aplicaciones robustas, seguras y portables. Su plataforma permite desarrollar desde aplicaciones móviles hasta sistemas empresariales.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_JAVA,
    REFERENCE_TO_SITES.TEMPLATE_JAVA,
  ],
  [
    "Django",
    getImage["django_banner"].ruta,
    "Django es un framework web de alto nivel basado en Python que fomenta el desarrollo rápido y un diseño limpio y pragmático. Desarrollado por desarrolladores experimentados, se encarga de gran parte de las complicaciones del desarrollo web, para que puedas concentrarte en escribir tu aplicación sin tener que reinventar la rueda. Es gratuito y de código abierto.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_DJANGO,
    REFERENCE_TO_SITES.TEMPLATE_DJANGO,
  ],
  [
    "Fastapi",
    getImage["fastAPI"].ruta,
    "FastAPI es un framework moderno, rápido (de alto rendimiento) para construir APIs con Python 3.7+ basado en las anotaciones de tipo estándar de Python. Está enfocado en la facilidad de uso, rendimiento y validación automática de datos.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_FASTAPI,
    REFERENCE_TO_SITES.TEMPLATE_FASTAPI,
  ],
  [
    "Php",
    getImage["php_banner"].ruta,
    "PHP es un lenguaje de programación del lado del servidor ampliamente usado para el desarrollo web. Permite crear sitios dinámicos y se integra fácilmente con bases de datos como MySQL. Es ideal para soluciones ligeras y personalizadas sin frameworks.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_PHP,
    REFERENCE_TO_SITES.TEMPLATE_PHP,
  ],
  [
    "Symfony",
    getImage["symfony_banner"].ruta,
    "Symfony es un conjunto de paquetes PHP, un marco de aplicaciones web, una filosofía y una comunidad, todos trabajando juntos en armonía.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_SYMFONY,
    REFERENCE_TO_SITES.TEMPLATE_SYMFONY,
  ],
  [
    "Laravel",
    getImage["laravel"].ruta,
    "Ofrece un ecosistema completo para desarrolladores web. Nuestro framework PHP de código abierto, productos, paquetes y kits de inicio ofrecen todo lo necesario para crear, implementar y supervisar aplicaciones web.",
    REFERENCE_TO_SITES.DOC_TEMPLATES,
    REFERENCE_TO_SITES.DOC_LARAVEL,
    REFERENCE_TO_SITES.TEMPLATE_LARAVEL,
  ],
];

export default TemplatesTechnologies;
