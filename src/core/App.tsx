import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import { ThemeProvider } from "@emotion/react"
import { theme } from "./themes"
import './fonts/Open Sans/fonts.css'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
