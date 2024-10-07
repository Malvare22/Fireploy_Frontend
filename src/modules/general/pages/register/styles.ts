import { SxProps } from "@mui/material";

export const styles : Record<'label'|'input' | 'buttonContainer', SxProps> = {
    label:{
       
    },
    input:{
        border: 'solid 2px black',
        width: '100%',
    },

    buttonContainer:{
        display: 'flex',
        justifyContent: 'end',
        marginTop: 4,
        marginBottom: 4,
        width: '100%'
    }
} 