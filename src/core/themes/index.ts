import { createTheme, PaletteOptions, responsiveFontSizes } from "@mui/material";

/**
 * Extending MUI's default theme to include a custom "terciary" color in the palette.
 */
declare module "@mui/material/styles" {
  /**
   * Interface extension for the Palette object to include a custom "terciary" color.
   */
  interface Palette {
    terciary: {
      main: string;
    };
  }

  /**
   * Interface extension for PaletteOptions to optionally define "terciary".
   */
  interface PaletteOptions {
    terciary?: {
      main: string;
    };
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    glass: true;
    dark: true;
    light: true;
  }
}

const palette: PaletteOptions = {
  primary: {
    main: "rgb(60, 55, 147)", // #6C63FF
    contrastText: "rgb(255, 255, 255)",
  },
  secondary: {
    main: "rgb(21,21,21)", // #FF8A65
  },
  terciary: {
    main: "rgb(151, 60, 27)", // #C3D8FF
  },
  info: {
    main: "rgb(41, 61, 111)", // #A5BFFF
  },
  warning: {
    main: "rgb(255, 209, 103)", // #FFD180
  },
  background: {
    default: "#fff",
  },
  // success: {
  //   main: "rgb(67, 106, 68)",        // #81C784
  // },
  // error: {
  //   main: "rgb(91, 43, 43)",          // #EF5350
};

/**
 * Returns a responsive MUI theme configuration with custom palette and typography settings.
 *
 * @constant {Theme} getTheme - Customized theme including primary, secondary, and custom terciary colors.
 */
export const getTheme = responsiveFontSizes(
  createTheme({
    components: {
      MuiPaper: {
        defaultProps: {
          variant: "light",
        },
        variants: [
          {
            props: { variant: "glass" },
            style: {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: 4,
              padding: 4,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
            },
          },
          {
            props: { variant: "dark" },
            style: {
              backgroundColor: palette.secondary as string,
              color: "white",

              // Hace que todos los hijos hereden el color blanco
              "*": {
                color: "inherit",
              },

              // Para componentes MUI que usan color por defecto (ej: Typography, Icon)
              "& .MuiTypography-root, & .MuiSvgIcon-root, & .MuiIconButton-root, & .MuiButtonBase-root":
                {
                  color: "inherit",
                },
            },
          },
          {
            props: { variant: "light" },
            style: {
              borderRadius: 4,
              padding: 4,
              color: "black",
              "& .MuiTypography-root": {
                color: "inherit",
              },
            },
          },
        ],
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fill: "rgb(21,21,21)",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          icon: {
            fill: "white", // Esto aplica al ícono dentro del chip
          },
          deleteIcon: {
            fill: "white", // Esto aplica al ícono de eliminación si lo hay
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            "& .MuiSvgIcon-root": {
              fill: "white", // cambia el color del icono
            },
          },
          outlined: {
            "& .MuiTypography-root": {
              fill: "black",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
    },
    palette: palette,
    typography: {
      fontFamily: "Open Sans",
    },
    shape: {
      borderRadius: 8,
    },
  })
);
