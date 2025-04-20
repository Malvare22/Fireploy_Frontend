import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Box, Button, Stack, SxProps, Typography, useTheme } from "@mui/material";
import styles from "./home.module.css";
import {
  BracesAsteriskIcon,
  DatabaseFillGearIcon,
  PaletteIcon,
  PersonBoundingBoxIcon,
  PersonLinesFillIcon,
} from "@modules/general/components/customIcons";

export enum labelHome {
  princialContent = "Despliega tus aplicativos web con unos clicks y compártelos con los de los demás",
  princialButtonText = "Registrarme",
}
export default function Home() {
  const theme = useTheme();

  return (
    // Frame
    <Stack>
      <Princial />
    </Stack>
  );
}

function Princial() {
  return (
    <Stack spacing={3} alignItems={"center"}>
      <PrincipalAnimation />
      <Typography variant="h4">{labelHome.princialContent}</Typography>
      <Box>
        <Button variant="contained">{labelHome.princialButtonText}</Button>
      </Box>
    </Stack>
  );
}
function PrincipalAnimation() {
  const totalSpikes = 16;
  const radius = 120;

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
    <Box className={styles.container}>
      <Box className={styles.containerRaysWrapper}>
        <Box className={styles.containerRays}>{rays}</Box>
      </Box>
      <Box className={styles.sun} />
      <Box className={styles.iconContainer}>
        <RocketLaunchIcon sx={{fontSize: 96}} className={styles.icon} />
      </Box>
      <Box>
        <DatabaseFillGearIcon sx={{ fontSize: 48 }} className={styles.iconElement} />
        <BracesAsteriskIcon sx={{ fontSize: 48 }} className={styles.iconElement} />
        <PaletteIcon sx={{ fontSize: 48 }} className={styles.iconElement} />
        <PersonLinesFillIcon sx={{ fontSize: 48 }} className={styles.iconElement} />
      </Box>
      <Box height="100%" width="100%">
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
  );
}
