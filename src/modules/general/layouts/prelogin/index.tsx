import { Box, Grid2 as Grid } from "@mui/material"
import Footer from "../../components/footer"
import React from "react"
import { styles } from "./styles"

function PreLogin({children} : {children: React.ReactNode}) {
  return (
    <>
      <Box sx={styles.container}>
        {children}
      </Box>
      <Footer></Footer>
    </>
  )
}

export default PreLogin
