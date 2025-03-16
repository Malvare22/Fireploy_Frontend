import { Avatar, Box, Button, Card, Container, CssBaseline, FormControlLabel, Grid2 as Grid, Link, makeStyles, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { labelLogin } from '@modules/general/enums/labelLogin';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const SignIn: React.FC = () => {

  return (
        <Card sx={{padding: 2, maxWidth: 1000}}>
      <CssBaseline />
      <div>
       <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3}}>
       <Avatar >
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {labelLogin.iniciarSesion}
        </Typography>
       </Box>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={labelLogin.correoElectronico}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={labelLogin.contrasenia}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{marginY: 3}}
           
          >
            {labelLogin.ingresar}
          </Button>
          <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'center'}>
              <Link href="#" variant="body2">
                {labelLogin.olvide}
              </Link>
              <Link href="#" variant="body2">
                {labelLogin.registrarse}
              </Link>
          </Stack>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Card>
  );
};

export default SignIn;