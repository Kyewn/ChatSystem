import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#37b7ac',
      light: '#84e0d8',
      dark: '#2e827b',
      contrastText: '#f2f2f2',
    },
    secondary: {
      main: '#cecece',
      light: '#f4f4f4',
      dark: '#939393',
    },
  },
  spacing: [4, 8, 12, 16, 24, 32],
});

export default theme;
