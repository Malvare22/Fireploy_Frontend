import { Avatar, IconButton, Tooltip, AvatarGroup, Stack } from "@mui/material";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { UsuarioCurso } from "@modules/materias/types/curso";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";
import { useAuth } from "@modules/general/context/accountContext";
import { rutasGeneral } from "@modules/general/router/routes";
import { Usuario } from "@modules/usuarios/types/usuario";


type ProjectCardMembersProps = {
  integrantes: UsuarioCurso[];
};

/**
 * ProjectCardMembers component – displays a list of course members as avatars.
 * Renders a grouped avatar view when there are more than 4 members,
 * otherwise shows individual avatars with tooltips.
 *
 * @component
 *
 * @param {UsuarioCurso[]} integrantes - Array of course members with names and image URLs.
 *
 * @returns {JSX.Element} A row of avatars or an avatar group depending on the number of members.
 *
 * @example
 * ```tsx
 * <ProjectCardMembers integrantes={curso.integrantes} />
 * ```
 */
export const ProjectCardMembers: React.FC<ProjectCardMembersProps> = ({ integrantes }) => {
  const navigate = useNavigate();

  const { id } = useAuth().accountInformation;

  function handleButton(idUser: number) {
    if (id != -1) navigate(rutasUsuarios.portafolio.replace(":id", idUser.toString()));
    else navigate(rutasGeneral.portafolioPorUsuario.replace(":id", idUser.toString()));
  }

  if (integrantes.length > 4) {
    return (
      <AvatarGroup max={4}>
        {integrantes.map((integrante) => (
          <Avatar alt={integrante.nombre} src={integrante.imagen} />
        ))}
      </AvatarGroup>
    );
  } else
    return (
      <Stack direction={"row"} spacing={2}>
        {integrantes.map((integrante) => (
          <Tooltip title={integrante.nombre}>
            <IconButton onClick={() => handleButton(integrante.id)}>
              <Avatar src={integrante.imagen} />
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    );
};
