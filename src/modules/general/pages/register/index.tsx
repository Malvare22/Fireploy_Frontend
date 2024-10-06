import { Box, Button, Card, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styles } from './styles';
import InfoIcon from '@mui/icons-material/Info';
import { RegisterLabel } from '../../enums';
import { Link } from 'react-router-dom';

function Register() {

  const nT = 6;

  return (
    <Box sx={{
      width: '100%',
      backgroundColor: 'secondary.main',
      minHeight: '100vh',
      paddingTop: 4,
      paddingBottom: 4
    }}>
      <Box sx={{textAlign: 'center', marginBottom: 4}}><Typography variant='h2'>{RegisterLabel.title}</Typography></Box>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Card sx={{
          width: '90%',
          backgroundColor: 'primary.light'
        }}>
          <Grid container sx={{ height: '100%', padding: 4 }}>

            <Grid item xs={12} md={7}> 

              <Grid container alignContent={'center'} alignItems={'center'} sx={{paddingRight: {md: 12}}} >

                {/* Fila */}
                <Grid item md={5} xs={12}>
                  <Typography variant='label'>{RegisterLabel.name}</Typography>
                </Grid>
                <Grid item md={7} xs={12} >
                  <TextField variant='outlined' sx={styles.input}></TextField>
                </Grid>

                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.lastName}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <TextField variant='outlined' sx={styles.input}></TextField>
                </Grid>

                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.email}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <TextField variant='outlined' sx={styles.input}></TextField>
                </Grid>

                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.date}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <TextField variant='outlined' sx={styles.input}></TextField>
                </Grid>


                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.password}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <TextField variant='outlined' sx={styles.input}></TextField>
                </Grid>


                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.repeatPassword}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <TextField variant='outlined' sx={styles.input}></TextField>
                </Grid>

                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.genre}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <TextField variant='outlined' sx={styles.input}></TextField>
                </Grid>

              </Grid>
            </Grid>

            


            <Grid item xs={12} md={5}>

              <Card sx={{height: {md: '40%'}, marginTop: {xs: 6, md: 0} , padding: 1}}>
                <Grid container>

                  <Grid item xs={2}>
                    <InfoIcon sx={{textAlign: 'center', fontSize: '54px', fill: 'black'}}/>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant='h3'>{RegisterLabel.cardTitle}</Typography>
                    <br></br>
                    <Typography variant='h6'>{RegisterLabel.cardInformation}</Typography>
                  </Grid>

                </Grid>

              </Card>
              
            </Grid>
            <Grid xs={12} sx={styles.buttonContainer}>
              <Button variant='cancel' href='/
              '>{RegisterLabel.cancel}</Button>
              <Button variant='action'>{RegisterLabel.register}</Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
}

export default Register;
