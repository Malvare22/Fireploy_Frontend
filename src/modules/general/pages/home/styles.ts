import { SxProps } from "@mui/material";

export const styles : Record<'container', SxProps> = {
    container: {
        width: {md: '50%', xs: '90%'},
        padding: 6,
        paddingBottom: 0,
        '& > * > * > *' :{
            marginBottom: 8 
        }
    }
} 