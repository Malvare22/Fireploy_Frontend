import { Avatar, IconButton, Tooltip } from "@mui/material"
import { UsuarioPortafolioCard } from ".."
import React from "react"

type Props= {
    usuario: UsuarioPortafolioCard
}
const ProjectCardAvatar: React.FC<Props> = ({usuario})  => {
  return (
    <Tooltip title={usuario.nombres}>
        <IconButton onClick={() => {}}>
        <Avatar alt={usuario.nombres} />
        </IconButton>
    </Tooltip>
  )
}

export default ProjectCardAvatar