import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import {  Navigation } from '../components';


const drawerWidth = 280;

export const PlacesLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

        <Navigation drawerWidth={ drawerWidth } />


        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />

            { children }
            
        </Box>
    </Box>
  )
}
