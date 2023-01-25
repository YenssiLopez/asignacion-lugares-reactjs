import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';

import { blueTheme } from './';


export const AppTheme = ({ children }) => {
  return (
    <Box sx={{ my: 4 }}>
    <ThemeProvider theme={ blueTheme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      
      <CssBaseline />
      
      { children }
    
    </ThemeProvider>
     </Box>
  )
}
