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
});
