// src/theme.js
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Option 1: If you included the font via HTML link
const theme = createTheme({
  typography: {
    // fontFamily: 'Roboto, Arial, sans-serif',
    fontFamily: 'Montserrat',
  },
  palette: {
    primary: {
      // main: '#1976d2',
      main: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: red.A400,
    },
  },
});

// Option 2: If you installed the font via npm
/*
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: red.A400,
    },
  },
});
*/

export default theme;
