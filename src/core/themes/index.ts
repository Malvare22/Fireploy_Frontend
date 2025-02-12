/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    backgroundX: {
      primary: string;
      secondary: string;
      panel: string;
    };
    icon: {
      primary: string;
    };
    customGrey: {
      main: string;
    };
    navbar: {
      main: string;
    };
    link: {
      main: string;
    };
    customRed: {
      main: string;
    };
  }

  interface PaletteOptions {
    backgroundX?: {
      primary?: string;
      secondary?: string;
      panel?: string;
    };
    icon?: {
      primary?: string;
      primaryDark?: string;
    };
    customGrey?: {
      main?: string;
    };
    navbar?: {
      main?: string;
    };
    link?: {
      main?: string;
    };
    customRed?: {
      main?: string;
    };
  }
}

// declare module '@mui/material/Button' {
//   interface ButtonPropsColorOverrides {
//     customBlue: true;
//   }
// }
declare module "@mui/material/styles" {
  interface TypographyVariants {
    // Variantes no bold
    h1?: React.CSSProperties;
    h2?: React.CSSProperties;
    h3?: React.CSSProperties;
    h4?: React.CSSProperties;
    h5?: React.CSSProperties;
    title?: React.CSSProperties;
    title2?: React.CSSProperties;
    body?: React.CSSProperties;
    caption?: React.CSSProperties;

    // Variantes bold
    h1Bold?: React.CSSProperties;
    h2Bold?: React.CSSProperties;
    h3Bold?: React.CSSProperties;
    h4Bold?: React.CSSProperties;
    h5Bold?: React.CSSProperties;
    titleBold?: React.CSSProperties;
    title2Bold?: React.CSSProperties;
    bodyBold?: React.CSSProperties;
    captionBold?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    // Variantes no bold
    h1?: React.CSSProperties;
    h2?: React.CSSProperties;
    h3?: React.CSSProperties;
    h4?: React.CSSProperties;
    h5?: React.CSSProperties;
    title?: React.CSSProperties;
    title2?: React.CSSProperties;
    body?: React.CSSProperties;
    caption?: React.CSSProperties;

    // Variantes bold
    h1Bold?: React.CSSProperties;
    h2Bold?: React.CSSProperties;
    h3Bold?: React.CSSProperties;
    h4Bold?: React.CSSProperties;
    h5Bold?: React.CSSProperties;
    titleBold?: React.CSSProperties;
    title2Bold?: React.CSSProperties;
    bodyBold?: React.CSSProperties;
    captionBold?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    // Variantes normales
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    title: true;
    title2: true;
    body: true;
    caption: true;

    // Variantes bold
    h1Bold: true;
    h2Bold: true;
    h3Bold: true;
    h4Bold: true;
    h5Bold: true;
    titleBold: true;
    title2Bold: true;
    bodyBold: true;
    captionBold: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
  }
  interface ButtonPropsColorOverrides {
    icon: true; // Agregamos "icon" como una opción válida
  }
}

declare module "@mui/material/Input" {
  interface InputProps {
    variant?: "primary" | "secondary";
  }
}

export const palette = {
  backgroundX: {
    primary: "#EEF1F6", // Color principal de fondo
    secondary: "#D2DAED", // Color secundario de fondo
    panel: "#F0F0F0", // Color de panel
  },
  icon: {
    primary: "#6471A5", // Color principal de íconos
    primaryDark: "#445180",
  },
  customGrey: {
    main: "#676262", // Color gris personalizado
  },
  navbar: {
    main: "#5D6E8C", // Color principal de navbar
  },
  link: {
    main: "#417CE3", // Color principal de enlaces
  },
  success: {
    main: "#6AAE72", // Color principal para éxito
  },
  customRed: {
    main: "#803E3E",
  },
};

export const theme = createTheme({
  palette: palette,
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "primary" },
          style: ({ theme }: { theme: any }) => ({
            borderRadius: 30,
            textTransform: "none",
            backgroundColor: theme.palette.icon.primary, // Usamos la paleta
            color: theme.palette.common.white, // Color de texto
            fontSize: theme.typography.h6.fontSize,
            fontFamily: theme.typography.h6.fontFamily,
            fontWeight: theme.typography.h5Bold.fontWeight,
            "&:hover": {
              backgroundColor: theme.palette.icon.primaryDark, // Usamos el color oscuro
            },
          }),
        },
      ],
    },
    MuiInput: {
      defaultProps: {
        variant: "primary",
      },
      styleOverrides: {
        root: ({ theme }: { theme: any }) => ({
          width: "100%",
          variants: [
            {
              props: { variant: "primary" },
              style: {
                fontSize: theme.typography.h5.fontSize,
                fontFamily: theme.typography.h5.fontFamily,
                fontWeight: theme.typography.h5.fontWeight,
              },
            },
            {
              props: { variant: "secondary" },
              style: {
                fontSize: theme.typography.title.fontSize,
                fontFamily: theme.typography.title.fontFamily,
                fontWeight: theme.typography.title.fontWeight,
              },
            },
          ],
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }: { theme: any }) => ({
          textDecoration: "none",
          color: "black",
          fontSize: theme.typography.h6.fontSize,
          fontFamily: theme.typography.h6.fontFamily,
          fontWeight: theme.typography.h6.fontWeight,
          cursor: "pointer",
        }),
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }: { theme: any }) => ({
          width: "100%",
          fontSize: theme.typography.h6.fontSize,
          fontFamily: theme.typography.h6.fontFamily,
          fontWeight: theme.typography.h6.fontWeight,
        }),
      },
    },

  },
});

// components: {
//   // Name of the component
//   // MuiButtonBase: {
//   //   defaultProps: {
//   //     color: 'red',
//   //   },
//   // },
//   MuiButton: {
//     styleOverrides: {
//       root: {
//         variants: [
//           {
//             props: { variant: 'action' },
//             style: {
//               borderWidth: '30px',
//               fontSize: '20px',
//               backgroundColor: 'black',
//               color: 'white',
//               minWidth: '100px'
//             },
//           },
//           {
//             props: { variant: 'cancel' },
//             style: {
//               borderWidth: '30px',
//               fontSize: '20px',
//               backgroundColor: 'gray',
//               color: 'white',
//               minWidth: '100px',
//               marginRight: '24px'
//             },
//           },
//           {
//             props: { variant: 'navbarOption' },
//             style: {
//               minHeight: '46px',
//               border: '1px white solid',
//               color: 'white',
//               fontSize: 20
//             },
//           },
//         ],
//       },
//     },
//   },
//   MuiTextField:{
//     styleOverrides: {
//       root: {
//         // border: 'solid 1px black',

//         width: '100%',
//       },
//     },
//   },
//   MuiOutlinedInput: {
//     styleOverrides: {
//       root: {
//         borderRadius: 10, // Mantén el borde redondeado si es necesario
//         fontSize:20,
//         '&:hover .MuiOutlinedInput-notchedOutline': {
//           borderColor: 'black', // Color del borde al hacer hover
//         },
//         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//           borderColor: 'black', // Color del borde cuando está enfocado
//         },
//       },
//       notchedOutline: {
//         borderColor: 'black', // Borde por defecto cuando no hay hover ni foco
//       },
//     },
//   },
// },
// });

// theme.typography.h1Bold = {
//   [theme.breakpoints.up('md')]: {
//     fontSize: '40px'
//   }
// }

theme.typography.h1 = {
  fontSize: "2.8rem", // ~61px
  fontWeight: "normal",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
};
theme.typography.h1Bold = {
  fontSize: "2.8rem", // ~61px
  fontWeight: "bold",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
};
theme.typography.h2 = {
  fontSize: "2.2rem", // ~49px
  fontWeight: "normal",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
};
theme.typography.h2Bold = {
  fontSize: "2.2rem", // ~49px
  fontWeight: "bold",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.4rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
};
theme.typography.h3 = {
  fontSize: "1.8rem", // ~39px
  fontWeight: "normal",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
};
theme.typography.h3Bold = {
  fontSize: "1.8rem", // ~39px
  fontWeight: "bold",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
};
theme.typography.h4 = {
  fontSize: "1.4rem", // ~31px
  fontWeight: "normal",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
};
theme.typography.h4Bold = {
  fontSize: "1.4rem", // ~31px
  fontWeight: "bold",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
};
theme.typography.h5 = {
  fontSize: "1.3rem", // ~25px
  fontWeight: "normal",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
};
theme.typography.h5Bold = {
  fontSize: "1.3rem", // ~25px
  fontWeight: "bold",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
};
theme.typography.title = {
  fontSize: "1.1rem", // ~20px
  fontWeight: "normal",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
};
theme.typography.titleBold = {
  fontSize: "1.1rem", // ~20px
  fontWeight: 600,
  fontFamily: "Open Sans",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
};
theme.typography.title2 = {
  fontSize: "1rem", // ~16px
  fontWeight: "normal",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem", // ~14px
  },
};
theme.typography.title2Bold = {
  fontSize: "1rem", // ~16px
  fontWeight: "bold",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
};
theme.typography.body = {
  fontSize: "0.9rem", // ~20px
  fontWeight: "normal",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.700rem",
  },
};
theme.typography.bodyBold = {
  fontSize: "0.9rem", // ~20px
  fontWeight: "bold",
  fontFamily: "Open Sans",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.700rem",
  },
};
theme.typography.caption = {
  fontSize: "0.8rem", // ~10px
  fontWeight: "normal",
  fontFamily: "Open Sans",
};
theme.typography.captionBold = {
  fontSize: "0.8rem", // ~10px
  fontWeight: "bold",
  fontFamily: "Open Sans",
};
