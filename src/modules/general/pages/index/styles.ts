import { SxProps } from "@mui/material";

export const styles : Record<'input' | 'container' | 'footer' | 'button' | 'title' | 'formContainer', SxProps> = {
    input: {
        backgroundColor: 'white',
        width: '100%',
        // fontSize: 14
    },
    container: {
        padding: 6,
        backgroundColor: 'customBlue.main',
        color: 'white',
        width: '30%'
    },
    footer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '> *':{
            margin: 0.5
        }
    },
    button: {
        borderRadius: '50px'
    },
    title: {
        textAlign: 'center'
    },
    formContainer: {
        margin: 1,
        '> *':{
            margin: 0.5
        }
    }
} 