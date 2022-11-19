import { Grid } from '@mui/material';


export const AuthLayout = ({ children }) => {
  return (
    
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: '#A0C1E8', padding: 4 }}
    >

            
            { children }

      

    </Grid>

  )
}
