import { createTheme, PaletteMode, responsiveFontSizes } from "@mui/material";

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

export const getTheme = (mode: PaletteMode) =>
  responsiveFontSizes(
    createTheme({
      components: {
        MuiSelect: {
          variant: "outlined",
          size: "small",
        },
      },
      palette: {
        mode: mode,
        primary:
          mode == "light"
            ? {
                main: "#0A192F",
                contrastText: "rgba(255,255,255,0.87)",
              }
            : {
                main: "#92AFE2",
                contrastText: "rgba(255,255,255,0.87)",
              },
        secondary: {
          main: "#8e3110",
        },
        terciary: {
          main: "#757780",
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
        background:
          mode == "light"
            ? {
                default: "#fffbfb",
                paper: "#fff",
              }
            : {
                default: "#252323",
                paper: "#121212",
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
