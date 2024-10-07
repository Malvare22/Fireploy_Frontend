import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
  interface Palette {
    customBlue: {
      main: string;
    };
    customRed: {
      main: string;
    };
    customGrey: {
      dark: string;
      light: string;
    };
  }

  interface PaletteOptions {
    customBlue?: {
      main: string;
    };
    customRed?: {
      main: string;
    };
    customGrey?: {
      dark: string;
      light: string;
    };
  }
  
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    customBlue: true;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    label: React.CSSProperties;
    inputMessage: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    label?: React.CSSProperties;
    inputMessage: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
  declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
      label: true;
      inputMessage: true;
    }
  }

  declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
      action: true;
      cancel: true;
    }
  }

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#EBE9F2',
      light: '#F1FAEE'
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
    customRed: {
      main: '#E63946'
    },
    customGrey: {
      dark: '#49454F',
      light: '#CCCCCC'
    }
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '80px',
      fontStyle: 'normal',
    },
    h2: {
      fontWeight: 600,
      fontSize: '50px',
      fontStyle: 'normal',
    },
    h5: {
      fontWeight: 600,
      fontStyle: 'normal',
    },
    body1: {
      fontWeight: 400,
      fontStyle: 'normal',
    },
    body2: {
      fontWeight: 500,
      fontStyle: 'normal',
    },
    subtitle1: {
      fontWeight: 300,
      fontStyle: 'normal',
    },
    subtitle2: {
      fontWeight: 300,
      fontStyle: 'italic',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none', // Evita que los botones estén en mayúsculas
    },
    label: {
      fontWeight: 600,
      fontSize: '26px',
      fontStyle: 'normal',
      fontFamily: 'Open Sans, sans-serif',
    },

    inputMessage:{
      fontWeight: 500,
      fontSize: '18px',
      fontStyle: 'normal',
      fontFamily: 'Open Sans, sans-serif',
      color: 'red',
      wordWrap: 'break-word'
    }
  },

  components: {
    // Name of the component
    // MuiButtonBase: {
    //   defaultProps: {
    //     color: 'red',        
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'action' },
              style: {
                borderWidth: '30px',
                fontSize: '20px',
                backgroundColor: 'black',
                color: 'white',
                minWidth: '100px'
              },
            },
            {
              props: { variant: 'cancel' },
              style: {
                borderWidth: '30px',
                fontSize: '20px',
                backgroundColor: 'gray',
                color: 'white',
                minWidth: '100px',
                marginRight: '24px'
              },
            },
          ],
        },
      },
    },
  },
});
