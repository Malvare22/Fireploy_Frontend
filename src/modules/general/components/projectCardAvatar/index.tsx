import { Avatar, IconButton, Tooltip, AvatarGroup, Stack, AvatarProps } from "@mui/material";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { UsuarioCurso } from "@modules/materias/types/curso";
import { useNavigate } from "react-router";
import { rutasUsuarios } from "@modules/usuarios/router/router";

type Props = {
  usuario: UsuarioPortafolioCard;
} & AvatarProps;

/**
 * ProjectCardAvatar component – renders an avatar for a given user inside a tooltip and button.
 * When clicked, navigates to the user's portfolio page.
 *
 * Uses Material UI's Avatar, Tooltip, and IconButton components for UI rendering.
 * Supports all additional props accepted by MUI's Avatar component.
 *
 * @component
 *
 * @param {UsuarioPortafolioCard} usuario - The user object containing ID, name, and photo URL.
 * @param {...AvatarProps} rest - Additional props passed down to the Avatar component.
 *
 * @returns {JSX.Element} A clickable avatar wrapped in a tooltip that navigates to the user's portfolio.
 *
 * @example
 * ```tsx
 * <ProjectCardAvatar usuario={user} />
 * ```
 */
export const ProjectCardAvatar: React.FC<Props> = ({ usuario, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Tooltip title={usuario.nombres}>
      <IconButton onClick={() => navigate(rutasUsuarios.portafolio.replace(":id", usuario.id))}>
        <Avatar alt={usuario.nombres} src={usuario.foto} {...rest} />
      </IconButton>
    </Tooltip>
  );
};

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

  function handleButton(id: number) {
    navigate(rutasUsuarios.portafolio.replace(":id", id.toString()));
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
