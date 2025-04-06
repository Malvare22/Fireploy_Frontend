import { createTheme, responsiveFontSizes } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    terciary: {
      main: string;
    };
  }

  interface PaletteOptions {
    terciary?: {
      main: string;
    };
  }
}

export const getTheme = responsiveFontSizes(
  createTheme({
    components: {},
    palette: {
      primary: {
        main: "#92AFE2",
        contrastText: "rgba(255,255,255,0.87)",
      },
      secondary: {
        main: "#4C5B61",
      },
      terciary: {
        main: "#A8D4AD",
      },
      info: {
        main: "#5a727f",
      },
      warning: {
        main: "#edad02",
      },
      success: {
        main: "#59bd5c",
      },
      error: {
        main: "#d05353",
      },
      background: {
        default: "white",
        paper: "#fff",
      },
    },
    typography: {
      fontFamily: "Open Sans",
    },
    shape: {
      borderRadius: 8,
    },
  })
);
