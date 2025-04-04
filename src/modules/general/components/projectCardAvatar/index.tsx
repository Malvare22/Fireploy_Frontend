import {
  Avatar,
  IconButton,
  Tooltip,
  AvatarGroup,
  SxProps,
} from "@mui/material";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";

type Props = {
  usuario: UsuarioPortafolioCard;
  sx?: SxProps;
};

export const ProjectCardAvatar: React.FC<Props> = ({ usuario, sx }) => {
  // const navigate = useNavigate();

  return (
    <Tooltip title={usuario.nombres}>
      <IconButton
      // onClick={() =>
      //   navigate(rutasUsuarios.verPortafolio.replace(":id", usuario.id))
      // }
      >
        <Avatar alt={usuario.nombres} src={usuario.foto} sx={sx} />
      </IconButton>
    </Tooltip>
  );
};

type ProjectCardMembersProps = {
  integrantes: ProyectoCard["integrantes"];
};

export const ProjectCardMembers: React.FC<ProjectCardMembersProps> = ({
  integrantes,
}) => {
  if (integrantes.length > 4) {
    return (
      <AvatarGroup max={4}>
        {integrantes.map((integrante) => (
          <Avatar alt={integrante.nombres} src={integrante.foto} />
        ))}
      </AvatarGroup>
    );
  } else
    return integrantes.map((integrante) => (
      <ProjectCardAvatar usuario={integrante}/>
    ));
};
