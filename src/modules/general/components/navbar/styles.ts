import { SxProps } from "@mui/material";

export const styles : Record<'container' | 'option' | 'buttonsContainer' | 'profileContainer' | 'profileOptionsContainer' | 'img', SxProps> = {
    container:{
        width: '100%',
        height: {lg:'100px'},
        backgroundColor: 'customGrey.dark',
        display: 'flex',
        flexDirection: {xs: 'column', lg: 'row'},
        justifyContent: {xs: 'center', lg:'space-between'},
        alignItems: 'center',
        paddingBottom: {xs: 4, lg: 0},
        paddingTop: {xs: 4, lg: 0},
    },
    option:{
        marginLeft: {md: 4},
        width: {xs: 300, md: 'auto'},
        marginBottom: {xs: 3, md: 0}
    },
    buttonsContainer:{
        display: 'flex',
        flexDirection: {xs: 'column', md: 'row'},
        alignContent: 'center',
        height: '100%',
        alignItems: 'center'
    },
    profileContainer: {
        maxWidth: '500px',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: {md: 1},
        margin: 3
    },
    profileOptionsContainer:{
        width: 320, maxWidth: '100%', position: 'absolute', right: 8,
        bottom: -110
    },
    img: {
        width: '48px',
        height: '48px',
        background: 'brown',
        borderRadius: 100
    }
} 