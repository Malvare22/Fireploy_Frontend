import { SxProps } from "@mui/material";

export const styles : Record<'container' | 'colum', SxProps> = {
    container: {
        backgroundColor: 'customBlue.main',
        color: 'white',
        height: {md: '200px'},
        padding: {
            xs: 4
        },
        '> *': {
            marginBottom: 4
        }
    },
    colum:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
} 