import { Box } from "@mui/material"
import React from "react"
import { styles } from "./styles"
import Footer from "../../components/footer"
import Navbar from "../../components/navbar"

function Login({children} : {children: React.ReactNode}) {
  return (
    <>
      <Navbar  type={0}/>
      <Box sx={styles.container}>
        {children}
      </Box>
      <Footer></Footer>
    </>
  )
}

export default Login;
