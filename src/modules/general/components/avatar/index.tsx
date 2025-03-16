import { Avatar, IconButton, Tooltip, SxProps, Theme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";

type Props = {
  usuario: UsuarioPortafolioCard;
  sx?: SxProps<Theme>;
};

const ProjectCardAvatar: React.FC<Props> = ({ usuario, sx }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title={usuario.nombres}>
      <IconButton
        onClick={() =>
          navigate(rutasUsuarios.verPortafolio.replace(":id", usuario.id))
        }
      >
        <Avatar alt={usuario.nombres} sx={sx} />
      </IconButton>
    </Tooltip>
  );
};

export default ProjectCardAvatar;
