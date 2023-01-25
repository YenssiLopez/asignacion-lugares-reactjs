import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';


const containerStyle = {
    width:  '750px',
    height: '400px'
  };

 const center = {
      lat: 14.107142, lng: -87.201325
    }
export const FabMap = ({ closeEventMap }) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA9X7_abzjoL72GbnuF5k4EUQiabtIN9mY"
      });


    const [startCoords, setStartCoords] = useState( { lat: 14.107142, lng: -87.201325 }  )
  
    const handleMapClick = (e) => { 

      // Add the coordinates of the click to the path
      setStartCoords({  
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
      } ),[]
  }

  function createKey(startCoords) {
    return  ([
      startCoords.lat,
      startCoords.lng
  ])   
  }

      
console.log( startCoords )

  return (
    <div>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6' noWrap component='div'> Agregar un Nuevo Lugar </Typography> 
            <Button  variant="outlined" color='error' sx={{ height: 40 }}  onClick={closeEventMap}> Cancelar </Button>
        </Grid> 
        <Box sx={{ m: 1 }}/>
        
      <Divider />





    <Box sx={{ m: 2 }}/>
        <div className='map'>
        { isLoaded ? (
        <GoogleMap
        mapContainerStyle={containerStyle}
			  center={center}
        zoom={15}
        onClick={handleMapClick}
      >
             
<input
        type="text"
        name="startCoords"
        placeholder="Latitud y Longitud"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `290px`,
          height: `50px`,
          fontSize: `14px`,
          position: "absolute",
          left: "50%",
          marginLeft: "-120px"
        }}
        
        value={createKey(startCoords)}
        onChange={ (e) => setStartCoords( e.target.value) }
      />
      <Marker 
      draggable
      position={center}
      onDragStart={handleMapClick}
      onClick={handleMapClick}
      />
        
       <></>
      </GoogleMap>
  ) : <></>
   }
 </div>

   
    </div>

  )
}
