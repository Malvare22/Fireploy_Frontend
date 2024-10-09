import { SxProps } from "@mui/material";

export const styles : Record<'container'| 'row' | 'label' | 'input' | 'hiddenInputFile' | 'buttonContainer', SxProps> = {
    container:{
       width: 800,
       padding: 8
    },
    row:{
        display: {md: 'flex'},
        alignItems: 'center',
        marginBottom: 4
    },
    label:{
        width: {md: '30%'},
        wordBreak: 'break-word'
    },
    input:{
        width: '100%'
    },
    hiddenInputFile:{
        display: 'none',
  
    },
    buttonContainer:{
        display: 'flex',
        justifyContent: 'center'
    }
} 