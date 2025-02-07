import { Box, Typography } from "@mui/material";
import img from "@modules/general/assets/LogoFireploy.png";
import Grid from "@mui/material/Grid2";
import { ReactNode } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { imagenes } from "@modules/general/enums/imagenes";

function Home() {
  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 6 },
        boxShadow: 5,
        border: "black 2px solid",
      }}
      className="hola"
    >
      {/* Carta */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          container
          sx={{
            backgroundColor: "backgroundX.primary",
            padding: 5,
            borderRadius: 20,
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            width: "90%",
          }}
        >
          <Grid size={{ sm: 7, xs: 12 }}>
            <Box sx={{ marginBottom: { sm: 10, xs: 4 } }}>
              <Typography variant="h1Bold">
                Fireploy te permite despliegues al alcance de un click!
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4Bold">
                Dale acceso al publico a tu proyecto mediante tu propio
                smartphone
              </Typography>
            </Box>
          </Grid>

          <Grid
            size={{ sm: 5, xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img" // Renderiza como un <img>
              src={img} // Define el source de la imagen
              alt="Descripción de la imagen" // Texto alternativo
              sx={{ width: { xs: 200, md: "100%" }, height: "auto" }} // Estilos opcionales
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", margin: 4 }}>
        <Typography variant="h4Bold">¿Por qué preferir Fireploy?</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Card
          title="Gestión de los proyectos web de tus materias"
          text="Gestión de los proyectos web de tus materias"
          icon={<AccessAlarmIcon />}
        ></Card>
        <Card
          title="Despliegues"
          text="Automatiza el proceso de despliegue de tu aplicativo web"
          icon={<CloudCircleIcon />}
        ></Card>
        <Card
          title="Portafolio"
          text="Crea tu portafolio automaticamente y gestionalo con tus proyectos representativos"
          icon={<DocumentScannerIcon />}
        ></Card>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", margin: 4 }}>
        <Typography variant="h4Bold">Powered By</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          backgroundColor: "backgroundX.primary",
          paddingTop: 5,
          paddingBottom: 5,
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          justifyContent: "center",
          alignItems: "center",
          gap: { md: 30, xs: 6 },
        }}
      >
        <Box
          component="img" // Renderiza como un <img>
          src={imagenes.tecnologias.springBoot} // Define el source de la imagen
          alt="Descripción de la imagen" // Texto alternativo
          sx={{ width: 200, height: "auto" }} // Estilos opcionales
        />
        <Box
          component="img" // Renderiza como un <img>
          src={imagenes.tecnologias.react} // Define el source de la imagen
          alt="Descripción de la imagen" // Texto alternativo
          sx={{ width: 200, height: "auto" }} // Estilos opcionales
        />
        <Box
          component="img" // Renderiza como un <img>
          src={imagenes.tecnologias.nodeJS} // Define el source de la imagen
          alt="Descripción de la imagen" // Texto alternativo
          sx={{ width: 100, height: "auto" }} // Estilos opcionales
        />
      </Box>
    </Box>
  );
}

interface CardProps {
  title: string;
  text: string;
  icon?: ReactNode;
}

const Card: React.FC<CardProps> = ({ icon, text, title }: CardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "backgroundX.primary",
        padding: 3,
        width: { lg: 400, sm: 200, xs: 300 },
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        height: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box>
          <Typography variant="h5Bold">{title}</Typography>
        </Box>
        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Typography variant="title2">{text}</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          "& svg": { fontSize: 70 },
          display: "flex",
          justifyContent: "end",
          color: "icon.primary",
        }}
      >
        {icon}
      </Box>
    </Box>
  );
};

export default Home;
