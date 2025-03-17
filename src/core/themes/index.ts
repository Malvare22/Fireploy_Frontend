import { createTheme, PaletteMode, responsiveFontSizes } from '@mui/material';

export const getTheme = (mode: PaletteMode) => responsiveFontSizes(createTheme( {
  palette: {
    mode: mode,
    primary: {
      main: '#7CB1CF',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#755993',
    },
    background: mode === "dark" 
      ? { default: "#121212", paper: "#1E1E1E" }
      : { default: "#ffffff", paper: "#f5f5f5" }
  },
  typography: {
    fontFamily: 'Open Sans',
  },
  shape: {
    borderRadius: 8,
  },
  
}));
