import { getImage } from "@modules/general/utils/getImage";
import { TECNOLOGIES } from "@modules/proyectos/utils/technologies";
import { Typography } from "@mui/material";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/system";
import { keyframes } from "@emotion/react";
import TemplatesTechnologies from "@modules/general/components/templatesTechnologies";

export enum labelTecnologiesView {
  title = "Tecnologías",
  bodyPrincial = "Fireploy te permite desplegar en multiples tecnologías orientadas al desarrollo web"
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
          <TemplatesTechnologies/>
        </Stack>
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
