import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "@emotion/react"
import { theme } from "./themes"
// import '@/core/fonts/Open Sans/fonts.css'
import '@/core/fonts/OpenSans/fonts.css'
import { router } from "./router/router"
function App() {

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
