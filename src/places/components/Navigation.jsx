import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import TableChartIcon from '@mui/icons-material/TableChart';
import { ListAltOutlined, MapOutlined, LogoutOutlined} from '@mui/icons-material';
import { Box, CssBaseline, Divider, Grid, IconButton, Link,  List,  ListItem,  ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import  MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';

import { startLogout } from '../../store/auth';




const drawerWidth = 280;




const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const Navigation = () => {
  //Nombre de usuario 
const { displayName } = useSelector( state => state.auth );



//Cerrar sesión 
const dispatch = useDispatch();

const onLogout = () => {
    dispatch( startLogout() );
}

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container direction='row' justifyContent='space-between' alignItems='center'>
 <Link  underline="none"  component={ RouterLink }  color="inherit" to="/" >
        <List>
       
         
            
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {  <HomeIcon fontSize="small" /> }
                </ListItemIcon>
              </ListItemButton>
            
      
       </List>
       </Link>
          <Typography variant="h6" noWrap component="div">
            Lugares y Puntos
          </Typography>

          <IconButton 
                    color='error'
                    onClick={ onLogout }
                >
                    <LogoutOutlined />
                </IconButton>
                </Grid>

        </Toolbar>

      </AppBar>
      <Drawer variant="permanent" open={open}>
      
        <DrawerHeader>
          <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                    { displayName }
                    </Typography>
            </Toolbar>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

<Link underline="none" component={ RouterLink } color="inherit" to="../places/map">
        <List> 
          {['Mapa'].map((text) => (
          
          <ListItem key={text} disablePadding>
           
              
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                 >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  { <MapOutlined fontSize="small" /> }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
             
            

     </ListItem>
          ))}
       </List>
       </Link>
        <Divider />
<Link underline="none" component={ RouterLink } color="inherit" to="../places/list">
        <List>
          {['Lista de Lugares'].map((text) => (
           <ListItem key={text} disablePadding>
            
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {  <ListAltOutlined fontSize="small"   />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
          
            </ListItem>
          ))}
       </List>
       </Link>
        <Divider />

        <Link underline="none" component={ RouterLink } color="inherit" to="../places/card">
        <List>
          {['Tarjeta de Lugares'].map((text) => (
           <ListItem key={text} disablePadding>
            
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {  <TableChartIcon fontSize="small"   />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
          
            </ListItem>
          ))}
       </List>
       </Link>
        <Divider />
        <Link underline="none" component={ RouterLink } color="inherit" to="../places/search">
        <List>
          {['Buscar Lugar'].map((text) => (
           <ListItem key={text} disablePadding>
            
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {  <SearchIcon fontSize="small"   />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
          
            </ListItem>
          ))}
       </List>
       </Link>
        <Divider />
        

      </Drawer>
      <Box component="main" sx={{ flexGrow: 0, p:0 }}>
        <DrawerHeader />
        
      </Box>
    </Box>
    
  )
}
