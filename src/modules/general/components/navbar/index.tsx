import { Box, Button, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography } from "@mui/material"
import { styles } from "./styles"
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { useState } from "react";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavbarLabel } from "../../enums/navbarLabel";
import { useNavigate } from "react-router-dom";

interface Props{
  type: number,

}

/**
 * type 0 administrator
 * type 1 teacher
 * type 2 student,
 * 
 */
function Navbar({type}: Props) {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.buttonsContainer}>
        {
          type == 0 && <>
            <Box><Button variant="navbarOption" href='/projects' sx={styles.option}>{NavbarLabel.projects}</Button></Box>
            <Box><Button variant="navbarOption" href='/subjects' sx={styles.option}>{NavbarLabel.subjects}</Button></Box>
            <Box><Button variant="navbarOption" href='/teachers' sx={styles.option}>{NavbarLabel.teachers}</Button></Box>
            <Box><Button variant="navbarOption" href='/students' sx={styles.option}>{NavbarLabel.students}</Button></Box>
          </>
        }
        {
          (type == 1 || type == 2) && <>
            <Box><Button variant="navbarOption" href='/myProjects' sx={styles.option}>{NavbarLabel.myProjects}</Button></Box>
            <Box><Button variant="navbarOption" href='/myPortfolio' sx={styles.option}>{NavbarLabel.myPortfolio}</Button></Box>
            <Box><Button variant="navbarOption" href='/otherPortfolios' sx={styles.option}>{NavbarLabel.otherPortfolios}</Button></Box>
          </>
        }
        {
          type == 2 && <>
            <Box><Button variant="navbarOption" href='/projects' sx={styles.option}>{NavbarLabel.projects}</Button></Box>
            <Box><Button variant="navbarOption" href='/subjects' sx={styles.option}>{NavbarLabel.subjects}</Button></Box>  
          </>
        }        
      </Box>
      <ProfileSection/>
    </Box>
  )
}

export default Navbar;

function ProfileSection(){

  const [open, setOpen] = useState(false);

  const handleButton = () => {
    setOpen(!open);
  };

  return(
    <Box sx={{position: 'relative'}}>
      <Box sx={styles.profileContainer}>
        <Box sx={styles.img}></Box>
        <Box>
          <Typography variant='h5' color='primary'>Alexander Rodriguez</Typography>
          <Typography variant='h6' color='customGrey.light'>Alexander Rodriguez</Typography>
        </Box>
        <Box>
          <IconButton onClick={handleButton}><ArrowCircleDownIcon sx={{
            fill: 'white',
            fontSize: 32,
            transform: open? 'rotate(180deg)':''
          }}/></IconButton>
        </Box>
      </Box>
      {open && <IconMenu/>}
    </Box>
  )
}

export function IconMenu() {

  const router = useNavigate();

  const handleOption = (href: string) => {
    router(href)
  };

  return (
    <Paper sx={styles.profileOptionsContainer}>
      <MenuList>
        <MenuItem onClick={()=> handleOption('/myProfile')}>
          <ListItemText><Typography variant="h6">{NavbarLabel.myProfile}</Typography></ListItemText>
          <ListItemIcon>
            <AccountCircleIcon/>
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={()=> handleOption('/')}>
          <ListItemText><Typography variant="h6" color='error'>{NavbarLabel.closeSession}</Typography></ListItemText>
          <ListItemIcon>
            <PowerSettingsNewIcon color="error"/>
          </ListItemIcon>
        </MenuItem>
        
      </MenuList>
    </Paper>
  );
}
