import { Box, Paper } from '@mui/material'
import React from 'react'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export const Places = () => {
  return (
    <div>
    <Box sx={{ width: '100%' }}> 
    <Paper sx={{ width: '100%' }}>
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

    </Paper>
</Box>
    </div>
  )
}
