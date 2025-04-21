import { getImage } from "@modules/general/utils/getImage";
import { Box, Card, Grid2, IconButton, Stack, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export enum labelTeam {
  title = "Conoce a nuestro equipo de trabajo",
  content = "Fireploy se encuentra desarrollado por tres estudiantes de Ingeniería de Sistemas de la UFPS",
}

const labels: [string, string, string, string][] = [
  [
    getImage["team01"].ruta,
    "José Julian Alvarez Reyes",
    "https://www.linkedin.com/in/jose-julian-alvarez-reyes-4040b5321/",
    "Tengo experiencia en la creación y gestión de bases de datos relacionales (MySQL) y no relacionales (MongoDB), así como en desarrollo backend con tecnologías como Node.js y Express.js. Domino lenguajes como Java, JavaScript, TypeScript, y tengo conocimientos en C++. Además, manejo sistemas de control de versiones como GIT.",
  ],
  [
    getImage["team02"].ruta,
    "Julian Quiroz García",
    "https://www.linkedin.com/in/julian-quiroz-garcia-a4994b2a8/",
    "Experimentado en maratones de programación ICPC a nivel nacional y regional. Poseo conocimientos en desarrollo Backend (Express.js, Node.js), Frontend, y diseño de bases de datos relacionales.",
  ],
  [
    getImage["team03"].ruta,
    "Rodrigo Andrés Malaver Suárez",
    "https://www.linkedin.com/in/rodrigo-andr%C3%A9s-malaver-su%C3%A1rez-9b211a204/",
    "Desarrollador Frontend, experimentado en ReactJS junto a Typescript, participé en maratones de programación ICPC a nivel nacional y regional. Cuento con conocimientos en Bases de Datos SQL y NoSQL",
  ],
];

function TeamView() {
  return (
    <Stack spacing={3}>
      <Typography textAlign='center' variant="h4">{labelTeam.title}</Typography>
      <Typography textAlign='center' variant="subtitle1">{labelTeam.content}</Typography>
      <Grid2 container padding={2} display={"flex"} justifyContent={"center"} spacing={6}>
        <Grid2 size={{md: 3, xs: 12}}>
          <TeamCard member={labels[0]} />
        </Grid2>
        <Grid2 size={{md: 3, xs: 12}}>
          <TeamCard member={labels[1]} />
        </Grid2>
        <Grid2 size={{md: 3, xs: 12}}>
          <TeamCard member={labels[2]} />
        </Grid2>
      </Grid2>
    </Stack>
  );
}

type TeamCardProps = {
  member: [string, string, string, string];
};
function TeamCard({ member }: TeamCardProps) {
  const Corner = () => {
    return (
      <>
        <Box
          sx={{
            borderRadius: "100% 0% 0% 100% / 0% 100% 0% 100%",
            position: "absolute",
            top: 0,
            width: 60,
            height: 60,
            right: 0,
            backgroundColor: "white",
          }}
        ></Box>
        <IconButton sx={{ position: "absolute", top: 0, right: 0 }}>
          <LinkedInIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </>
    );
  };

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          position: "relative",
          height: 400,
          overflow: "hidden", // Asegura que el exceso de imagen se recorte
          width: "100%", // Opcional: define un ancho si es necesario
        }}
      >
        <Box
          component="img"
          src={member[0]}
          sx={{
            width: "100%",
            height: 400,
            objectFit: "cover", // Cubre el área sin deformarse
            objectPosition: "center 0%",
          }}
        />
        <Corner />
      </Box>
      <Typography textAlign={"center"} variant="h6">
        {member[1]}
      </Typography>
      <Typography variant="subtitle2">{member[3]}</Typography>
    </Stack>
  );
}
export default TeamView;
