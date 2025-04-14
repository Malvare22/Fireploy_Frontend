import { createTheme, responsiveFontSizes } from "@mui/material";

/**
 * Extending MUI's default theme to include a custom "terciary" color in the palette.
 */
declare module "@mui/material/styles" {
  /**
   * Interface extension for the `Palette` object to include a custom "terciary" color.
   */
  interface Palette {
    terciary: {
      main: string;
    };
  }

  /**
   * Interface extension for `PaletteOptions` to optionally define "terciary".
   */
  interface PaletteOptions {
    terciary?: {
      main: string;
    };
  }
}

/**
 * Returns a responsive MUI theme configuration with custom palette and typography settings.
 *
 * @constant {Theme} getTheme - Customized theme including primary, secondary, and custom terciary colors.
 */
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
