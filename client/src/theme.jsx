import { ThemeProvider, createTheme } from '@mui/material';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#540D6E',
      light: '#8C15B7',
      dark: '#460B5B',
    },
    secondary: {
      main: '#3BCEAC',
      light: '#80FFDB',
      dark: '#64DFDF',
    },
    text: {
      primary: '#FFD23F',
      secondary: '#6930C3',
    }


  },
  typography: {
    fontFamily: [
      'Urbanist',
      'sans-serif'
    ].join(','),
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 200,
    }

  }
});

export default Theme;