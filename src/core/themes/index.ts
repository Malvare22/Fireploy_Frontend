import { createTheme, PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => createTheme( {
  palette: {
    mode: mode,
    primary: {
      main: 'rgba(63,133,181,0.67)',
    },
    secondary: {
      main: '#fb6303',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
  },
  shape: {
    borderRadius: 8,
  },
});
