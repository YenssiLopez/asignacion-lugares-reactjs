import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, CardMedia, Paper, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



export const Places = () => {
  return (
    <div>
    <Box sx={{ width: '100%' }}> 
    <Card sx={{ maxWidth: '100%' }}>
      <CardMedia
        sx={{ height: 300, width:1220 }}
        image="https://d500.epimg.net/cincodias/imagenes/2017/05/05/lifestyle/1493972078_448475_1493972405_noticia_normal.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lugares y puntos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Registra tus lugares favoritos en el cual puedes visitar.
        </Typography>
       <Typography variant="body2" color="text.secondary"> 
        Por atracción turística o atractivo turístico es un lugares que podrán estar disponible o no 
        disponible que podrad visitar, normalmente por su valor cultural exhibido o inherente, 
        su significancia histórica, su belleza,  aventura y diversión
        </Typography>
      </CardContent>
    </Card>
    <Box sx={{ m: 3 }}/>
    <Box sx={{ m: 2 }}/>
     <Typography variant="body2" color="text.secondary"> Formularios de los Puntos y Lugares </Typography>
     <Box sx={{ m: 2 }}/>
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Agregar un Lugar</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Puedes agregar tu lugar favorito de dos formas, ingresando las cordenadas o arrastrar el goblo de la Ubicación.
          </Typography>
          <Card>
       <CardMedia
         component="img"
         alt="Agregar"
         height="140"
         image="https://firebasestorage.googleapis.com/v0/b/composite-watch-374915.appspot.com/o/Agregar.jpg?alt=media&token=b0775f6a-f810-424d-a2fe-755a4bcfd6e5"
       />
     </Card>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Editar y Eliminar un Lugar</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Podras editar tu lugar favorito, ponerlo en disponble o no disponble agregarle más puntos de referencia. Y eliminar tu lugar favorito
          </Typography>
          <Card>
       <CardMedia
         component="img"
         alt="Editar"
         height="140"
         image="https://firebasestorage.googleapis.com/v0/b/composite-watch-374915.appspot.com/o/mostrar%20y%20eliminar.jpg?alt=media&token=c0f9f2f4-b3d3-46ba-bc7c-d87917cd8d5f"
       />
     </Card>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Mostrar Lugar</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Puedes ver un lugar especifico con las referencia y la ubicación del lugar.
          </Typography>
          <Card>
       <CardMedia
         component="img"
         alt="Editar"
         height="140"
         image="https://firebasestorage.googleapis.com/v0/b/composite-watch-374915.appspot.com/o/editar.jpg?alt=media&token=9728a67e-db38-4744-9df1-c2a83e35df9c"
       />
     </Card>
        </AccordionDetails>
      </Accordion>


</Box>
    </div>
  )
}
