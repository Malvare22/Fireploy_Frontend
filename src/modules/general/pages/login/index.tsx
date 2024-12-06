import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';

const Login = () => {
    return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Paper elevation={3} sx={{ padding: 4, width: '400px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} textAlign="center">
                <Typography variant="h5" component="h1" gutterBottom>
                  Iniciar Sesión
                </Typography>
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  variant="outlined"
                  type="email"
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>
  
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth>
                  Iniciar sesión
                </Button>
              </Grid>
  
              <Grid item xs={12} textAlign="center" sx={{ marginTop: 2 }}>
                <Link href="#" variant="body2">
                  Olvidé mi contraseña
                </Link>
              </Grid>
  
              <Grid item xs={12} textAlign="center" sx={{ marginTop: 2 }}>
                <Link href="#" variant="body2">
                  Crear una cuenta
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Box>
    );
  };
  
  export default Login;