import TablaUsuarios from "@modules/usuarios/components/tablaUsuarios"
import { labelListarUsuarios } from "@modules/usuarios/enum/labelListarUsuarios"
import { Divider, Stack, Typography } from "@mui/material"

function ListarUsuarios() {
  return (
    <Stack spacing={3}>
      <Stack>
        <Typography variant="h4">{labelListarUsuarios.titulo}</Typography>
        <Divider/>
      </Stack>
      <TablaUsuarios/>
    </Stack>
  )
}

export default ListarUsuarios