import { Box } from "@mui/material"
import React from "react"
import { styles } from "./styles"
import Footer from "../../components/footer"

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
