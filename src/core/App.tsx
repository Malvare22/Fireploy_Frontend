import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import './fonts/fonts.css'
import { ThemeProvider } from "@emotion/react"
import { theme } from "./themes"

function App() {

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
