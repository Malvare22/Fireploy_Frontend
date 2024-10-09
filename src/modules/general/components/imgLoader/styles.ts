import { SxProps } from "@mui/material";

export const styles : Record<'container' | 'hiddenInputFile' | 'preview', SxProps> = {
    hiddenInputFile:{
        display: 'none',
    },
    preview: {
        height: 100,
        width: 100,
        border: '1px solid black',
        marginRight: 2
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    }
} 