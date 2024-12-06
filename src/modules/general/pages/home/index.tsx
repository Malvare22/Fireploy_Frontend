import { Box, Typography } from "@mui/material";
import img from "@modules/general/assets/LogoFireploy.png";
import react from "@modules/general/assets/react_logo.png";
import spring from "@modules/general/assets/spring_logo.png";
import nodejs from "@modules/general/assets/nodejs_logo.png";
import Grid from "@mui/material/Grid2";
import { ReactNode } from "react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';

function Home() {
  return (
    <Box sx={{ backgroundColor: "backgroundX.secondary", padding: 10, boxShadow: 5 }}>
      {/* Carta */}
      <Grid
        container
        sx={{ backgroundColor: "backgroundX.primary", padding: 5, borderRadius: 20,  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
      >
        <Grid size={7}>
          <Box sx={{marginBottom: 10}}>
            <Typography variant="h1Bold">
              Fireploy te permite despliegues al alcance de un click!
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4Bold">
              Dale acceso al publico a tu proyecto mediante tu propio smartphone
            </Typography>
          </Box>
        </Grid>

        <Grid size={5}>
          <Box
            component="img" // Renderiza como un <img>
            src={img} // Define el source de la imagen
            alt="Descripción de la imagen" // Texto alternativo
            sx={{ width: "100%", height: "auto" }} // Estilos opcionales
          />
        </Grid>
      </Grid>

      <Box sx={{display: 'flex', justifyContent: 'center', margin: 4}}>
        <Typography variant="h4Bold">¿Por qué preferir Fireploy?</Typography>
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Card
          title="Gestión de los proyectos web de tus materias"
          text="Gestión de los proyectos web de tus materias"
          icon={<AccessAlarmIcon/>}
        ></Card>
        <Card
          title="Despliegues"
          text="Automatiza el proceso de despliegue de tu aplicativo web"
          icon={<CloudCircleIcon/>}
        ></Card>
        <Card
          title="Portafolio"
          text="Crea tu portafolio automaticamente y gestionalo con tus proyectos representativos"
          icon={<DocumentScannerIcon/>}
        ></Card>
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'center', margin: 4}}>
        <Typography variant="h4Bold">Powered By</Typography>
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'space-between', paddingLeft: 60, paddingRight: 60, backgroundColor: "backgroundX.primary", marginLeft: -10, marginRight: -10, paddingTop: 5, paddingBottom: 5, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'}}>
        <Box
          component="img" // Renderiza como un <img>
          src={spring} // Define el source de la imagen
          alt="Descripción de la imagen" // Texto alternativo
          sx={{ width: "20%", height: "auto" }} // Estilos opcionales
        />
        <Box
          component="img" // Renderiza como un <img>
          src={nodejs} // Define el source de la imagen
          alt="Descripción de la imagen" // Texto alternativo
          sx={{ width: "20%", height: "auto"}} // Estilos opcionales
        />
        <Box
          component="img" // Renderiza como un <img>
          src={react} // Define el source de la imagen
          alt="Descripción de la imagen" // Texto alternativo
          sx={{ width: "10%", height: "auto" }} // Estilos opcionales
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
    <Box sx={{backgroundColor: "backgroundX.primary", margin: 4, padding: 3, width: 600, filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'}}>
      <Box>
        <Typography variant="h5Bold">{title}</Typography>
      </Box>
      <Box sx={{marginTop: 2, marginBottom: 2}}>
        <Typography variant="title2">{text}</Typography>
      </Box>
      <Box sx={{'& svg': {fontSize: 70}, display: 'flex', justifyContent: 'end', color: 'icon.primary'}}>{icon}</Box>
    </Box>
  );
};

export default Home;
