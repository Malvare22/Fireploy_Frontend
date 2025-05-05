import TextFieldSearch from "@modules/general/components/textFieldSearch";
import { getImage } from "@modules/general/utils/getImage";
import { TECNOLOGIES } from "@modules/proyectos/utils/docker";
import { Grid2, IconButton, Typography } from "@mui/material";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/system";
import { keyframes } from "@emotion/react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { openInNewTab } from "@modules/general/utils/openTab";
import useSearch from "@modules/general/hooks/useSearch";
import { useMemo } from "react";

export enum labelTecnologiesView {
  title = "Tecnologías",
  bodyPrincial = "Fireploy te permite desplegar en multiples tecnologías orientadas al desarrollo web",
  subTitle = "Templates",
  bodySecondary = "Consisten en plantillas adaptadas al funcionamiento de despliegue automático de Fireploy, ideal que los uses al arrancar tu proyecto 😉",
}

function TecnologiesView() {

  type FilteredKeys = Exclude<
    keyof typeof TECNOLOGIES,
    "Java" | "PHP" | "ExpressJs" | "NodeJS" | "SpringBoot" | "Symphony"
  >;
  const tecnologies: [FilteredKeys, string, string, string][] = [
    ["Angular", getImage["angular"].ruta, "Es un framework open source desarrollado en Typescript, enfocado en la creación de aplicaciones web de una sola página", ""],
    [
      "ReactJS",
      getImage["react"].ruta,
      "Es una librería de JavaScript, el cual permite agrupar componentes para la creación de interfaces de usuario dinámicas",
      "",
    ],
    ["NextJS", getImage["nextjs"].ruta, "Es un marco web de desarrollo de React, el cual permite funcionalidades desde el lado del servidor, como el renderizado de sitios en este", ""],
    ["Laravel", getImage["laravel"].ruta, "Es un framework para el desarrollo de sitios web con PHP, que busca la sintaxis expresiva y elegante", ""],
  ];

  const {filteredData, setSearchValue, searchValue} = useSearch();

  function searchFn(x: typeof tecnologies, s: string){
    return x.filter(([titulo]) => titulo.toLowerCase().includes(s.toLowerCase()));
  }

  const cardsFiltered = useMemo(()=> {
    return filteredData(tecnologies, searchFn);
  }, [searchValue])

  return (
    <Stack spacing={5}>
      <Box>
        <Stack spacing={3} >
          <Typography textAlign={'center'} variant="h3">{labelTecnologiesView.title}</Typography>
          <Typography textAlign={'center'} sx={{ paddingX: {md: 20, xs: 2} }} variant="h6">{labelTecnologiesView.bodyPrincial}</Typography>
          <Carousel />
        </Stack>
      </Box>
      <Stack spacing={3} sx={{ paddingX: {md: 20, xs: 2} }}>
        <Stack spacing={3}>
          <Typography textAlign={'center'} variant="h4">{labelTecnologiesView.subTitle}</Typography>
          <Typography textAlign={'center'}>{labelTecnologiesView.bodySecondary}</Typography>
        </Stack>
        <Stack spacing={3}>
          <Grid2 container sx={{ display: "flex", justifyContent: "end" }}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <TextFieldSearch setSearchValue={setSearchValue} fullWidth />
            </Grid2>
          </Grid2>
          <Grid2 container spacing={3}>
            {cardsFiltered.map(([title, img, text, url]) => (
              <Grid2 size={{ md: 6, xs: 12 }}>
                <CardTecnology img={img} subtitle={text} title={title} url={url} />
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default TecnologiesView;

function Carousel() {
  type FilteredKeys = Exclude<keyof typeof TECNOLOGIES, "Java">;
  const tecs: [FilteredKeys, string][] = [
    ["Angular", getImage["angular_banner"].ruta],
    ["ReactJS", getImage["react"].ruta],
    ["NextJS", getImage["nextjs_banner"].ruta],
    ["Laravel", getImage["laravel_banner"].ruta],
    ["SpringBoot", getImage["springboot_banner"].ruta],
    ["ExpressJs", getImage["expressjs_banner"].ruta],
    ["Symphony", getImage["symphony_banner"].ruta],
    ["PHP", getImage["php_banner"].ruta],
    ["NodeJS", getImage["nodejs_banner"].ruta],
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
          boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.25)',
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
              sx={{ height: { md: 70, xs: 40 }, objectFit: "contain" }}
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
  url: string;
};
function CardTecnology({ img, subtitle, title, url }: PropsCardTecnology) {
  return (
    <Grid2 container sx={{ overflow: "hidden", height: 200, borderRadius: 1, boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.15)'}} spacing={3} padding={0}>
      <Grid2 size={4}>
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
      </Grid2>
      <Grid2 size={8}>
        <Stack justifyContent="space-between" sx={{ height: "100%" }}>
          <Stack spacing={1}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body2">{subtitle}</Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
              <Typography variant="caption">by Fireploy</Typography>
              <RocketLaunchIcon />
            </Stack>
            <IconButton onClick={() => openInNewTab(url)}>
              <OpenInNewIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Grid2>
    </Grid2>
  );
}
