import { Grid2 as Grid, Typography } from "@mui/material"
import { styles } from "./styles"
import LogoUFPS from '@modules/general/assets/LogoUFPS.png'
import { FooterLabel } from "@modules/general/enums"

function Footer() {
  return (
    <Grid container sx={styles.container}>
      <Grid size={{xs: 12, md: 2}} sx={styles.colum}>
        <img src={LogoUFPS} width={'100px'}></img>
      </Grid>
      <Grid size={{xs: 12, md: 6}} sx={styles.colum}>
        <Grid container>
          <Grid size={{xs: 12, md: 6}}>
            <Typography variant='h5'>{FooterLabel.developers}</Typography>
            <ul>
              <li>
                <Typography variant='h6'>{FooterLabel.dev1}</Typography>
              </li>
              <li>
                <Typography variant='h6'>{FooterLabel.dev2}</Typography>
              </li>
              <li>
                <Typography variant='h6'>{FooterLabel.dev3}</Typography>
              </li>
            </ul>
          </Grid>
          <Grid size={{xs: 12, md: 6}} sx={{
            marginLeft: {md: 12}
          }}>
            <Typography variant='h5'>{FooterLabel.contact}</Typography>
            <ul>
              <li>
                <Typography variant='h6'>{FooterLabel.telephone}</Typography>
              </li>
              <li>
                <Typography variant='h6'>{FooterLabel.email}</Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{xs: 12, md: 4}} sx={styles.colum}>
        <Typography variant='h6'>{FooterLabel.rights}</Typography>
      </Grid>
    </Grid>
  )
}

export default Footer
