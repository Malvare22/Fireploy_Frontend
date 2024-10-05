import { Box, Button, Input, Typography } from "@mui/material";
import { LoginLabel } from "../../enums";
import { styles } from "./styles";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoFireploy from '../../assets/LogoFireploy.png'

export default function Test() {
  return (<>
      <Box sx={styles.container}>

        <Typography variant="h1" color="white" sx={styles.title}>{LoginLabel.title}</Typography>

        <Box sx={styles.formContainer}>
          <Typography variant="h6">{LoginLabel.email}</Typography>
          <Typography variant="h6"><Input sx={styles.input}></Input></Typography>
          <Typography variant="h6">{LoginLabel.password}</Typography>
          <Typography variant="h6"><Input sx={styles.input}></Input></Typography>
        </Box>
        

        <Box sx={styles.footer}>
          <Typography variant="h6">{LoginLabel.forgetPassword}</Typography>
          <Typography variant="h6">{LoginLabel.createUser}</Typography>
          <Button sx={styles.button} endIcon={<ArrowForwardIosIcon/>} variant="contained" color="error">{LoginLabel.startSession}</Button>
        </Box>

      </Box>
      <Box>
        <Box>
          <img src={logoFireploy}></img>
        </Box>
      </Box>
      </>
  )
}
