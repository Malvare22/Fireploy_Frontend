import AnimatedCard from "@modules/general/components/animatedCard";
import {
  Imagenes,
  obtenerImagen,
} from "@modules/general/components/roundedIcon/utils";
import { Box, Card, Stack, Typography, useTheme } from "@mui/material";

type CardTecnologiaProps = {
  tecnologia: keyof typeof Imagenes;
};
const CardTecnologia: React.FC<CardTecnologiaProps> = ({ tecnologia }) => {
  const theme = useTheme();
  function getColor() {
    const palette = theme.palette;
    switch (tecnologia) {
      case "mongodb":
        return palette.success.light;
      case "mysql":
        return palette.warning.light;
      case "nodejs":
        return palette.success.light;
      case "react":
        return palette.info.light;

      default:
        return palette.info.light;
    }
  }

  return (
    <AnimatedCard
      sx={{
        display: "inline-block",
        width: "fit-content",
        padding: 2,
        backgroundColor: getColor(),
        color: "white",
      }}
    >
      <Stack direction={{md: "row"}} alignItems={"center"} spacing={2}>
        <Typography
          variant="body1"
          fontWeight={"bold"}
          display={"inline-block"}
        >
          {obtenerImagen[tecnologia].nombre}
        </Typography>
        <Card
          sx={{
            padding: 1,
            minWidth: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component={"img"}
            sx={{ height: 32 }}
            src={obtenerImagen[tecnologia].ruta}
          />
        </Card>
      </Stack>
    </AnimatedCard>
  );
};

export default CardTecnologia;
