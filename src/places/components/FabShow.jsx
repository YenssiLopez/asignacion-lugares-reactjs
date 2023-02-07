import { Button, Divider, Grid,  TextField,  Typography, Box, DialogTitle, DialogContent, List, ListItem, ListItemText, ListItemIcon, IconButton, Card, CardMedia } from '@mui/material';
import { useEffect } from 'react';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { GoogleMap, Marker, MarkerClusterer, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '300px',
  height: '300px'
};


export const FabShow = ({ fid, closeEventShow, actualizarEstadoPlaces }) => {
    const [lugar, setLugar] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [lat, setLat] = React.useState(0);
    const [lng, setLng] = React.useState(0);
    const [radio, setRadio] = React.useState('');
    const [tipo, setTipo] = React.useState('');
    const [referencia, setReferencia] = React.useState([]);
    const [rango, setRango] = React.useState('');
    const [url, setUrl] = React.useState('');

    useEffect(() => {
    setLugar(fid.lugar);
    setEstado(fid.estado);
    setLat(fid.lat);
    setLng(fid.lng);
    setRadio(fid.radio);
  setTipo(fid.tipo);
  setReferencia(fid.referencia);
  setRango(fid.rango)
  setUrl(fid.url);
    } ,[] )

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyA9X7_abzjoL72GbnuF5k4EUQiabtIN9mY"
    });

    
          const deletereferencia = (id) => {
          
          const updatreferencia = referencia.filter((elem, ind) => {  return ind != id; });
          
          setReferencia(updatreferencia);
          }
    
    
        const onSavePlace = async ( e ) => {
            e.preventDefault();
    
            const placeCollection = doc(FirebaseDB, "points", fid.id);
            const data = { estado:estado, lat:Number(lat), lng:Number(lng), lugar:lugar, radio:radio, referencia:referencia, tipo:tipo, rango:rango };
            await updateDoc(placeCollection, data);
            actualizarEstadoPlaces();
            closeEventShow();
    
        };

  return (
    <div>
             <DialogTitle>

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' noWrap component='div'> Places </Typography> 
            <Button  variant="outlined" color='error' sx={{ height: 40 }}  onClick={ onSavePlace }> Cancelar </Button>
        </Grid>
</DialogTitle>
        <Box sx={{ m: 1 }}/>
      <Divider />
      
      <DialogContent>

      <Box sx={{ m: 2 }}/>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
           <Typography variant="subtitle2" noWrap component='div'> Lugar: {lugar} </Typography> 
           <Typography variant="subtitle2" noWrap component='div'> Estado: {estado} </Typography>        
           <Typography variant="subtitle2" noWrap component='div'> Latitud y Longitud: {lat}, {lng}  </Typography>        
           <Typography variant="subtitle2" noWrap component='div'> Radio: {radio} </Typography>  
           <Typography variant="subtitle2" noWrap component='div'> Rango: {rango} </Typography>
           <Typography variant="subtitle2" noWrap component='div'> Tipo: {tipo} </Typography>    
           <Typography variant="subtitle2" noWrap component='div'> Referencia: </Typography>       
           <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
{referencia.map( (elem, ind) => {
     return <ListItem key={ind} alignItems="flex-start" >
        <ListItemText primary={elem}  />
        <ListItemIcon >
        <IconButton onClick={() => deletereferencia(ind)} color="error"> 
           <DeleteIcon />
           </IconButton>
        </ListItemIcon>
        <Divider variant="middle" />         
      </ListItem>
      
        } )
      
    }
     
     
    </List>
    <Card>
       <CardMedia
         component="img"
         alt={lugar}
         height="140"
         width="200"
         image={url}
       />
       </Card> 

        </Grid>
        <Grid item xs={6}>
        <div className='map'>
        { isLoaded ? (
        <GoogleMap
        mapContainerStyle={containerStyle}
			  center={ { lat, lng } } 
        zoom={15}
      >
        <Marker  position={ { lat, lng } } />

        
       <></>
      </GoogleMap>
  ) : <></>
   }
 </div>

         
          <></>

        </Grid>
      </Grid>
    </Box>
    </DialogContent>

    </div>

  
  )
}
