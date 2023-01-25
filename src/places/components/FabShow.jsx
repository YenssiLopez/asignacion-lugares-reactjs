import { Button, Divider, Grid,  TextField,  Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import React from 'react';
import { GoogleMap, Marker, MarkerClusterer, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '300px',
  height: '300px'
};


export const FabShow = ({ fid, closeEventEdit }) => {
    const [lugar, setLugar] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [lat, setLat] = React.useState(0);
    const [lng, setLng] = React.useState(0);
    const [radio, setRadio] = React.useState('');
    const [tipo, setTipo] = React.useState('');
    const [referencia, setReferencia] = React.useState('');
    

    useEffect(() => {
    setLugar(fid.lugar);
    setEstado(fid.estado);
    setLat(fid.lat);
    setLng(fid.lng);
    setRadio(fid.radio);
  setTipo(fid.tipo);
  setReferencia(fid.referencia);

    } ,[] )

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyA9X7_abzjoL72GbnuF5k4EUQiabtIN9mY"
    });

  return (
    <div>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' noWrap component='div'> Places </Typography> 
            <Button  variant="outlined" color='error' sx={{ height: 40 }}  onClick={closeEventEdit}> Cancelar </Button>
        </Grid>
        <Box sx={{ m: 1 }}/>
      <Divider />

      <Box sx={{ m: 2 }}/>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
           <Typography variant="subtitle2" noWrap component='div'> Lugar: {lugar} </Typography> 
           <Typography variant="subtitle2" noWrap component='div'> Estado: {estado} </Typography>        
           <Typography variant="subtitle2" noWrap component='div'> Latitud y Longitud: {lat}, {lng}  </Typography>        
           <Typography variant="subtitle2" noWrap component='div'> Radio: {radio} </Typography>        
           <Typography variant="subtitle2" noWrap component='div'> Tipo: {tipo} </Typography>        
           <Typography variant="subtitle2" noWrap component='div'> Referencia: {referencia} </Typography>        

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
 
    </div>

  
  )
}
