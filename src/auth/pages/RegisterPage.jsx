import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';


export const RegisterPage = () => {
  return (
    <AuthLayout >
      <form>
          <Grid container className='box-shadow'

sx={{ 
  
     width: { sm: 450, md: 450 },
     backgroundColor: '#D9D9D9', 
     padding: 3, 
     borderRadius: 2 
 }}>
<Typography variant='h5' sx={{ mb: 1 }}>Crear Cuenta</Typography>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
              />
            </Grid>

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
              <Grid item xs={ 12 }>
                <Button variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='start'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            </Grid>
            <Grid container direction='row' justifyContent='start'>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                Ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
