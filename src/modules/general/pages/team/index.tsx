import { getImage } from "@modules/general/utils/getImage";
import { Box, Grid2, IconButton, Stack, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { labelTeam } from "@modules/general/enums/labelTeam";

/**
 * Array of team member data.
 * Each item contains: [imagePath, name, LinkedIn URL, description]
 */
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

/**
 * Displays the team section including individual cards for each member.
 *
 * @component
 */
function TeamView() {
  return (
    <Stack spacing={3}>
      {/* Section title */}
      <Typography textAlign="center" variant="h4">
        {labelTeam.title}
      </Typography>

      {/* Section subtitle */}
      <Typography textAlign="center" variant="subtitle1">
        {labelTeam.content}
      </Typography>

      {/* Team cards layout */}
      <Grid2 container padding={2} display={"flex"} justifyContent={"center"} spacing={6}>
        <Grid2 size={{ md: 3, xs: 12 }}>
          <TeamCard member={labels[0]} />
        </Grid2>
        <Grid2 size={{ md: 3, xs: 12 }}>
          <TeamCard member={labels[1]} />
        </Grid2>
        <Grid2 size={{ md: 3, xs: 12 }}>
          <TeamCard member={labels[2]} />
        </Grid2>
      </Grid2>
    </Stack>
  );
}

/**
 * Props type definition for TeamCard.
 */
type TeamCardProps = {
  member: [string, string, string, string];
};

/**
 * Displays a card for a single team member, including image, name, and description.
 *
 * @component
 * @param {TeamCardProps} props - Props containing team member data.
 */
function TeamCard({ member }: TeamCardProps) {
  /**
   * Renders the LinkedIn corner icon.
   *
   * @function
   */
  const Corner = () => {
    return (
      <>
        {/* White corner background */}
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
        />
        {/* LinkedIn icon button */}
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          component="a"
          href={member[2]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </>
    );
  };

  return (
    <Stack spacing={2}>
      {/* Profile image */}
      <Box
        sx={{
          position: "relative",
          height: 400,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Box
          component="img"
          src={member[0]}
          sx={{
            width: "100%",
            height: 400,
            objectFit: "cover",
            objectPosition: "center 0%",
          }}
        />
        <Corner />
      </Box>

      {/* Name */}
      <Typography textAlign="center" variant="h6">
        {member[1]}
      </Typography>

      {/* Description */}
      <Typography variant="subtitle2">{member[3]}</Typography>
    </Stack>
  );
}

export default TeamView;
