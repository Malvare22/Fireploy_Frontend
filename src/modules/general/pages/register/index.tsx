import { Box, Button, Card, FormControl, MenuItem, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styles } from './styles';
import InfoIcon from '@mui/icons-material/Info';
import { RegisterLabel } from '../../enums';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterNotification, RegisterSchemaType, registerSchema } from '../../utils/validations/registerSchema';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { mappedGenres } from '../../utils/validations/genre';
import NotificationMsg from '../../components/snackbar';
import { useState } from 'react';

function Register() {

  const [open, setOpen] = useState(true);

  const nT = 6;

  const {register, handleSubmit, formState: {errors}} = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema)
  });

  const genreOptions = Object.entries(mappedGenres).map(([key, value], i) => (<MenuItem key={i} value={key}>{value}</MenuItem>))

  const onSend = () => {
    
  };

  return (
    <Box sx={{
      width: '100%',
      backgroundColor: 'secondary.main',
      minHeight: '100vh',
      paddingTop: 4,
      paddingBottom: 4
    }}>
      <NotificationMsg init={open} msg={RegisterNotification[0]} status={false}></NotificationMsg>
      <Box sx={{textAlign: 'center', marginBottom: 4}}><Typography variant='h2'>{RegisterLabel.title}</Typography></Box>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Card sx={{
          width: '90%',
          backgroundColor: 'primary.light'
        }}>
          <form onSubmit={handleSubmit(data => console.log(data))}>
          <Grid container sx={{ height: '100%', padding: 4 }}>

            <Grid item xs={12} md={7}> 

              <Grid container alignContent={'center'} sx={{paddingRight: {md: 12}}} >

                {/* Fila */}
                <Grid item md={5} xs={12}>
                  <Typography variant='label'>{RegisterLabel.name}</Typography>
                </Grid>
                <Grid item md={7} xs={12} >
                  <TextField variant='outlined' sx={styles.input} {...register('name')}></TextField>
                  {errors.name?.message && <Typography variant='inputMessage'>{errors.name.message}</Typography>}
                </Grid>

                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.lastName}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                <TextField variant='outlined' sx={styles.input} {...register('lastName')}></TextField>
                {errors.lastName?.message && <Typography variant='inputMessage'>{errors.lastName.message}</Typography>}
                </Grid>

                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.email}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <TextField variant='outlined' sx={styles.input} {...register('email')}></TextField>
                  {errors.email?.message && <Typography variant='inputMessage'>{errors.email.message}</Typography>}
                </Grid>

                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.date}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <TextField variant='outlined' type='date' sx={styles.input} {...register('date')}></TextField>
                  {errors.date?.message && <Typography variant='inputMessage'>{errors.date.message}</Typography>}
                </Grid>


                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.password}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <TextField variant='outlined' type='password' sx={styles.input} {...register('password')}></TextField>
                  {errors.password?.message && <Typography variant='inputMessage'>{errors.password.message}</Typography>}
                </Grid>


                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.repeatPassword}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <TextField variant='outlined' type='password' sx={styles.input} {...register('passwordConfirm')}></TextField>
                  {errors.passwordConfirm?.message && <Typography variant='inputMessage'>{errors.passwordConfirm.message}</Typography>}
                </Grid>

                {/* Fila */}
                <Grid item md={5} xs={12} sx={{marginTop: nT}}>
                  <Typography variant='label'>{RegisterLabel.genre}</Typography>
                </Grid>
                <Grid item md={7} xs={12} sx={{marginTop: nT}}>
                  <Select variant='outlined' defaultValue={'M'} {...register('genre')} sx={styles.input}>
                    {genreOptions}
                  </Select>
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
            <Box sx={styles.buttonContainer}>
              <Button variant='cancel' href='/
              '>{RegisterLabel.cancel}</Button>
              <Button variant='action' type='submit'>{RegisterLabel.register}</Button>
            </Box>
          </Grid>
          </form>
        </Card>
      </Box>
    </Box>
  );
}

export default Register;
