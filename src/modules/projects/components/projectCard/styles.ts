import { SxProps } from "@mui/material";

export const styles : Record<'container' | 'tittleContainer' | 'img' | 'imgContainer' | 'statusContainer' |'technologiesContainer' | 'technology' | 'addContainer', SxProps> = {
  container:{
    width: {xl: 650, lg: 500},
    height: {xl: 400, lg: 400},
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin : 2
  },
  tittleContainer: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },  
  imgContainer:{
    height: {lg:'100%', xs: '300px'}, marginTop: {xs: 2, md: 0}, marginBottom: {xs: 2, md: 0},paddingRight: {md: 2}
  },
  img:{
    width: '100%',      // Asegura que la imagen ocupe todo el ancho del div
    height: '100%',     // Asegura que la imagen ocupe todo el alto del div
    objectFit: 'cover', // Mantiene la proporción y cubre el div
  },
  statusContainer:{
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'end'
  },
  technologiesContainer: {
    marginBottom: 3,
    display: 'flex',
    alignItems: 'center'
  },
  technology:{
    height: 36, width: 36, marginLeft: 1,
    borderRadius: '100%'
  },
  addContainer:{
    width: {xl: 650, lg: 500, xs: '100%'},
    height: {xl: 400, lg: 400},
    padding: 4,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin : 2

  }
} 