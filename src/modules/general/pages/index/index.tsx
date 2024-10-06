import { Box, Button, Input, Typography } from "@mui/material";
import { LoginLabel } from "../../enums";
import { styles } from "./styles";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoFireploy from '../../assets/LogoFireploy.png'
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

export default function Test() {
  return (<><Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box sx={styles.polygon}></Box>
        <Box sx={styles.img}>
          <img style={{
            'width': '400px'
          }} src={LogoFireploy}></img>
        </Box>
      </Box>
      <Box sx={styles.formContainer}>
        

        <Typography variant="h1" color="white" sx={styles.title}>{LoginLabel.title}</Typography>

        <Box sx={styles.form}>
          <Typography variant="h6">{LoginLabel.email}</Typography>
          <Typography variant="h6"><Input sx={styles.input}></Input></Typography>
          <Typography variant="h6">{LoginLabel.password}</Typography>
          <Typography variant="h6"><Input sx={styles.input}></Input></Typography>
          <Box sx={styles.buttonsContainer}>
            <Button startIcon={<GoogleIcon/>} sx={styles.googleButton} variant="contained">{LoginLabel.googleText}</Button>
            <Button sx={styles.button} endIcon={<ArrowForwardIosIcon/>} variant="contained" color="error">{LoginLabel.startSession}</Button>
          </Box>
        </Box>
        

        <Box sx={styles.footer}>
          <Typography variant="h6" component={Link} to={'/forgetPassword'} sx={{ textDecoration: 'none', color: 'inherit' }}>{LoginLabel.forgetPassword}</Typography>
          <Typography variant="h6" component={Link} to={'/forgetPassword'} sx={{ textDecoration: 'none', color: 'inherit' }}>{LoginLabel.createUser}</Typography>          
        </Box>

      </Box>
      
      </Box>
      <Footer></Footer>
      
      </>
  )
}
