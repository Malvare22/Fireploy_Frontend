import { createTheme } from "@mui/material";
declare module '@mui/material/styles' {
  interface Palette {
    customBlue: {
      main: string;
    };
  }

  interface PaletteOptions {
    customBlue?: {
        main: string;
    },
    customRed?:{
        main: string;
    },
    customGrey?:{
        dark: string,
        light: string
    }
  }
}

export const theme = createTheme({
  palette: {
    primary: {
        main: '#FFFFFF'
    },
    secondary: {
        main: '#EBE9F2',
        light:'#F1FAEE'
    },
    success: {
      main: '#66bb6a',
    },
    error: {
      main: '#f44336',
    },
    customBlue: {
      main: '#457B9D', 
    },
    customRed:{
        main: '#E63946'
    },
    customGrey:{
        dark: '#49454F',
        light: '#CCCCCC'
    }
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    h1: {
      fontWeight: 700, // Bold
      fontStyle: 'normal',
      fontSize: 80
    },
    h2: {
      fontWeight: 600, // SemiBold
      fontStyle: 'normal',
    },
    body1: {
      fontWeight: 400, // Regular
      fontStyle: 'normal',
    },
    body2: {
      fontWeight: 500, // Medium
      fontStyle: 'normal',
    },
    subtitle1: {
      fontWeight: 300, // Light
      fontStyle: 'normal',
    },
    subtitle2: {
      fontWeight: 300, // LightItalic
      fontStyle: 'italic',
    },
    button: {
      fontWeight: 600, // SemiBold
      textTransform: 'none', // Evita que los botones estén en mayúsculas
    },
  },
});
