import { Box, Divider, Drawer, MenuList, MenuItem, ListItemIcon,  Toolbar, Typography } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material';

export const SideBar = ({ drawerWidth = 240 }) => {
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
                    Fernando Herrera
                </Typography>
            </Toolbar>
            <Divider />
            <MenuList>
        <MenuItem>
          <ListItemIcon>
            
          </ListItemIcon>
          <Typography variant="inherit">A short message</Typography>
        </MenuItem>
        <MenuItem>
        <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
          <Typography variant="inherit">A very long text that overflows</Typography>
        </MenuItem>
        
      </MenuList>
            
        </Drawer>

    </Box>
  )
}
