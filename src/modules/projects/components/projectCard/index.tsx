import { Box, Card, IconButton, SxProps, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { styles } from "./styles"
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CSSProperties } from "react";

function ProjectCard() {

  const enum ProjectCardLabels{
    repository = 'Repositorio:',
    technologies = 'Tecnologías:',
    modality = 'Modalidad:',
    subject = 'Materia:',
    status = 'Status:',
    online = 'Online',
    offline = 'Offline'
  }

  return (
    <Card sx={styles.container}>
      <Box sx={styles.tittleContainer}>
        <Box sx={{width: {xs:'80%', md: 'auto'}}}><Typography variant="h5">Inserenskdfsd fnsdlfnsdf</Typography></Box>
        <IconButton sx={{margin: -1}}><SettingsIcon sx={{fontSize: 50}}/></IconButton>
      </Box>
      <Grid container sx={{
        height: '70%'
      }}>
        <Grid size={{md: 6, xs: 12}} sx={styles.imgContainer}>
          <Box component={'img'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSug15vrSt-6cY-AscmobynNAG-er0nGIUEJQ&s" sx={styles.img}></Box>
        </Grid>
        <Grid size={{md: 6, xs: 12}} sx={{paddingLeft: 3}}>
          <Box>
            <Box sx={{
              marginBottom: 3
            }}>
              <Typography variant="h6">{ProjectCardLabels.subject + ' ' + 'Administración'}</Typography>
            </Box>
            <Box sx={styles.technologiesContainer}>
              <Typography variant="cardLabel">{ProjectCardLabels.repository}</Typography>
              <Box component={'img'} src='https://cdn-icons-png.flaticon.com/512/25/25231.png' sx={styles.technology}/>
            </Box>
            <Box sx={styles.technologiesContainer}>
              <Typography variant="cardLabel">{ProjectCardLabels.technologies}</Typography>
              <Box component={'img'} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s' sx={styles.technology}/>
              <Box component={'img'} src='https://ih1.redbubble.net/image.4080393304.5605/st,small,507x507-pad,600x600,f8f8f8.jpg' sx={styles.technology}/>
              <Box component={'img'} src='https://w7.pngwing.com/pngs/956/695/png-transparent-mongodb-original-wordmark-logo-icon-thumbnail.png' sx={styles.technology}/>
            </Box>
            <Box sx={{
              marginBottom: 3
            }}>
              <Typography variant="cardLabel">{ProjectCardLabels.modality + ' ' + 'Individual'}</Typography>
            </Box>
            
          </Box>
        </Grid>
      </Grid>
      <Box sx={styles.statusContainer}>
        <Typography variant="h5">{ProjectCardLabels.status + ' ' + ProjectCardLabels.online}</Typography>
        <CircleIcon sx={{marginLeft: 1, fontSize: 30, fill: 'green'}}></CircleIcon>
      </Box>
      
    </Card>
  )
}

export function AddProjectCard(){

  return(
    <Card sx={styles.addContainer}>
      
      <IconButton><AddCircleOutlineIcon sx={{fontSize: 150}}/></IconButton>
    </Card>
  )
};

export default ProjectCard
