import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, Box } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';


export const LoginPage = () => {
  return (
    <AuthLayout>
      <form>
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 5, sm: 10, md: 15 }}>
      <Grid item xs={6}>
      <img src="https://i.pinimg.com/originals/00/79/dd/0079dd9c8104030acd964cdc8a6e617e.jpg" height="500" width="500" />

      </Grid>
      <Grid item xs={6}>
    
      
          <Grid item
          className='box-shadow'

          sx={{ 
            
               width: {  },
               backgroundColor: '#D9D9D9', 
               padding: 3,
               borderRadius: 2 
           }}>
          <Typography variant='h5' sx={{ mb: 1 }}>Login</Typography>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button variant='contained' fullWidth>
                  Iniciar Sección
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button variant='contained' fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='start'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
          </Grid>
</Grid>
</Box>
        </form>

    </AuthLayout>
  )
}
