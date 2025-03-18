import { createTheme, PaletteMode, responsiveFontSizes } from "@mui/material";

export const getTheme = (mode: PaletteMode) =>
  responsiveFontSizes(
    createTheme({
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
          main: '#8e3110',
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
      },
      typography: {
        fontFamily: "Open Sans",
      },
      shape: {
        borderRadius: 8,
      },
    })
  );
