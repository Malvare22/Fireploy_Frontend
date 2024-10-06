import { SxProps } from "@mui/material";

export const styles : Record<'input' | 'container' | 'footer' | 'button' | 'title' | 'form' | 'formContainer' | 'polygon' | 'imgContainer' | 'img' | 'googleButton' | 'buttonsContainer', SxProps> = {
    input: {
        backgroundColor: 'white',
        width: '100%',
        // fontSize: 14
    },
    container: {
        display: {md: 'flex'},
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        height: {md: '100vh'},
        backgroundColor: 'secondary.light'
        // width: '100vw',
        // alignItems: 'center'
    },
    footer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '> *':{
            marginBottom: 2
        },
        marginBottom: 4
    },
    button: {
        borderRadius: '50px',
        height: '50px',
        width: '200px',
        marginLeft: 2
    },
    googleButton: {
        borderRadius: '50px',
        backgroundColor: 'white',
        height: '50px'
    },
    title: {
        marginTop: 4,
        textAlign: 'center'
    },
    form: {
        padding: 4,
    },
    buttonsContainer: {
        textAlign: 'center',
        display: {md: 'flex'},
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 4
        
    },
    formContainer:{
        backgroundColor: 'customBlue.main',
        color: 'white',
        height: {xs: '100vh', md : '90%'},
        width: {xs: '100%', md: '35%'},
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    imgContainer:{
        position: 'relative',
        display: {xs: 'none', md: 'flex'},
        visibility: {xs: 'hidden', md: 'visible'},
        alignContent: 'center',
        justifyContent: 'center',
        margin: '6%',
    },

    polygon: {
        
        backgroundColor: 'secondary.main',
        clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        width: '500px',
        height: '450px',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'girar 18s linear infinite',

    },
    img: {
        
        position: 'absolute', // Hace que el contenido esté en la misma posición
        top: '50%', // Centra el contenido verticalmente
        left: '50%', // Centra el contenido horizontalmente
        transform: 'translate(-50%, -50%)', // Ajusta la posición para centrar
        zIndex: 1, // Asegura que el contenido esté encima
        
    }
} 