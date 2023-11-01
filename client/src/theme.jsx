import { ThemeProvider, createTheme } from "@mui/material";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#8338EC",
    },
    secondary: {
      main: "#FB5607",
    },
  },
  typography: {
    fontFamily: ["Urbanist", "sans-serif"].join(","),
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
  },
});

export default Theme;
