import { Box } from "@mui/material"
import React from "react"
import { styles } from "./styles"
import Footer from "../../components/footer"
import NavbarStudent from "../../components/navbar/student"

function Login({children} : {children: React.ReactNode}) {
  return (
    <>
      <NavbarStudent/>
      <Box sx={styles.container}>
        {children}
      </Box>
      <Footer></Footer>
    </>
  )
}

export default Login;
