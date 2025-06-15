import { getImage } from "@modules/general/utils/getImage";
import { Box, Grid, IconButton, keyframes, Stack, Typography, useTheme } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { labelTeam } from "@modules/general/enums/labelTeam";
import styles from "./team.module.css";
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
 * TeamView component – displays a visual introduction of the development team.
 * 
 * It renders individual cards for each team member showing their profile image,
 * name, description, and a LinkedIn link. The layout uses Material UI components
 * and custom animations/styles to enhance the visual presentation.
 * 
 * It includes:
 * - A header with the section title and description
 * - A responsive grid layout of team member cards
 * - Decorative wave background for stylistic purposes
 * 
 * @component
 * 
 * @returns {JSX.Element} A section containing information about the team
 * 
 * @example
 * ```tsx
 * <TeamView />
 * ```
 */
function TeamView() {
  const init = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }`;

  const theme = useTheme();
  const Wave = () => (
    <div className={styles.waveContainer}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill={theme.palette.primary.main}
          fillOpacity="1"
          d="M0,224L40,218.7C80,213,160,203,240,170.7C320,139,400,85,480,96C560,107,640,181,720,224C800,267,880,277,960,250.7C1040,224,1120,160,1200,144C1280,128,1360,160,1400,176L1440,192L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>
      <Box
        className={styles.waveBottomFill}
        sx={{ backgroundColor: theme.palette.primary.main }}
      ></Box>
    </div>
  );
  return (
    <Box sx={{ marginBottom: -10, color: "white" }}>
      <Stack spacing={5} sx={{ position: "relative", animation: `${init} 2s forwards` }} paddingX={4}>
        {/* Section title */}
        <Typography textAlign="center" variant="h3">
          {labelTeam.title}
        </Typography>

        {/* Section subtitle */}
        <Typography textAlign="center" variant="h6">
          {labelTeam.content}
        </Typography>

        {/* Team cards layout */}
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          padding={2}
          paddingBottom={6}
          spacing={6}
        >
          <Grid className={styles.card01} size={{ md: 4, xs: 12 }}>
            <TeamCard member={labels[0]} />
          </Grid>
          <Grid className={styles.card02} size={{ md: 4, xs: 12 }}>
            <TeamCard member={labels[1]} />
          </Grid>
          <Grid className={styles.card03} size={{ md: 4, xs: 12 }}>
            <TeamCard member={labels[2]} />
          </Grid>
        </Grid>
        <Wave />
      </Stack>
    </Box>
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
    <Stack spacing={2} alignItems={"center"} sx={{ color: "white", textAlign: "center" }}>
      {/* Profile image */}

      <Box
        sx={{
          position: "relative",
          maxWidth: "70%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={member[0]}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 4,
            filter: "drop-shadow(0px 0px 9px #9e9e9e)",
          }}
        />
        <Corner />
      </Box>

      {/* Name */}
      <Typography textAlign="center" variant="h6">
        {member[1]}
      </Typography>

      {/* Description */}
      <Typography variant="body2">{member[3]}</Typography>
    </Stack>
  );
}

export default TeamView;
