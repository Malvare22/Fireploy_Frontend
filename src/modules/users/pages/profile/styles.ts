import { SxProps } from "@mui/material";

export const styles : Record<'container'| 'row' | 'label' | 'input' | 'hiddenInputFile' | 'buttonContainer' | 'imgContainer' | 'img' | 'select', SxProps> = {
    container:{
       width: {md: 1000, xs:'100%'},
       padding: {md: 8, xs: 4},

    },
    row:{
        display: {md: 'flex'},
        marginBottom: 4,
    },
    label:{
        width: {md: '30%'},
        wordBreak: 'break-word'
    },
    input:{
        width: '100%',
        fontSize: '30px',
    },
    hiddenInputFile:{
        display: 'none',
  
    },
    buttonContainer:{
        display: 'flex',
        justifyContent: 'center'
    },
    imgContainer:{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 4
    },
    img:{
        width: 120,
        height: 120
    },
    select:{
        width: '100%'
    }
} 