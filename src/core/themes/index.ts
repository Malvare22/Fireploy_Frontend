import { createTheme, PaletteMode, responsiveFontSizes } from '@mui/material';

export const getTheme = (mode: PaletteMode) => responsiveFontSizes(createTheme( {
  palette: {
    mode: mode,
    primary: {
      main: 'rgba(63,133,181,0.67)',
    },
    secondary: {
      main: '#fb6303',
    },
    background: {
      default: '#fafafa', // Fondo predeterminado
      paper: '#ffffff',   // Fondo para componentes como Cards
    }
  },
  typography: {
    fontFamily: 'Open Sans',
  },
  shape: {
    borderRadius: 8,
  },
  
}));
