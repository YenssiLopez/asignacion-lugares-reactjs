import { Box, Divider, Drawer,  ListItemIcon, ListItemText, MenuItem, MenuList, Toolbar, Typography } from '@mui/material'
import { ListAltOutlined, MapOutlined, MapsUgcOutlined, PersonPinCircleOutlined, TurnedInNot } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector( state => state.auth );

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{ 
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        { displayName }
                    </Typography>
            </Toolbar>
            <Divider />
            
         
      <MenuList>
       
    


      <NavLink underline="none" to="../places/map"   >
        <MenuItem>
          <ListItemIcon>  <MapOutlined fontSize="small" /> </ListItemIcon>
          <ListItemText> Mapa </ListItemText>
        </MenuItem>  
        </NavLink>
        <Divider  />


        <NavLink underline="none" to="../places/list"   >
        <MenuItem>
          <ListItemIcon> <ListAltOutlined fontSize="small" /> </ListItemIcon>
          <ListItemText> Lista de Lugares  </ListItemText>
        </MenuItem>
       </NavLink>
        <Divider />

        <NavLink underline="none" to="/"   >
        <MenuItem>
          <ListItemIcon> <PersonPinCircleOutlined fontSize="small" /> </ListItemIcon>
          <ListItemText underline="none"> Lugares </ListItemText>
        </MenuItem>
        </NavLink>
        <Divider />







      </MenuList>


            
        </Drawer>

    </Box>
  )
}
