import React from 'react';

import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Box, Container, createTheme, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
declare module '@mui/material/styles' {
  // allow configuration using `createTheme`
  interface ThemeOptions {
    primary?: {
      turquoise?: string;
      steelBlue?: string;
      yellow?: string;
      white?: string;
    };
    secondary?: {
      orangeRed?: string;
      teal?: string;
      yellowDark?: string;
    }
  }
}
const theme = createTheme({
  primary: {
    turquoise: "#53C2C2",
    steelBlue: "#335C6E",
    yellow: "#FABD33",
    white: "#FFFFFF"
  },
  secondary: {
    orangeRed: "#F76434",
    teal: "#4AA088",
    yellowDark: "#FAAD00",
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Box maxHeight="100vh">
        <Grid container spacing={0}>
          <Grid
            height={"100vh"}
            bgcolor={(theme) => theme.primary.steelBlue}
            md={2}
            sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            
            <Sidebar />
          </Grid>
          <Grid md={9}>
            <h1>Hi</h1>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
