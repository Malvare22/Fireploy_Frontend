import { Avatar, IconButton, Tooltip, AvatarGroup, SxProps, Stack } from "@mui/material";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";

type Props = {
  usuario: UsuarioPortafolioCard;
  sx?: SxProps;
};

/**
 * ProjectCardAvatar component – renders a user avatar inside a tooltip and icon button.
 * 
 * This component displays the user's photo and name as a tooltip. Optionally, it supports
 * styling through the `sx` prop. Navigation to a user profile can be added via the commented logic.
 * 
 * @component
 * 
 * @param {UsuarioPortafolioCard} usuario - User data including name and avatar photo.
 * @param {SxProps} [sx] - Optional styling overrides for the Avatar component.
 * 
 * @returns {JSX.Element} An avatar wrapped in a tooltip and icon button.
 * 
 * @example
 * ```tsx
 * <ProjectCardAvatar usuario={usuario} sx={{ width: 40, height: 40 }} />
 * ```
 */
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

/**
 * ProjectCardMembers component – displays a group of user avatars for a project.
 * 
 * Depending on the number of users, this component renders either a horizontal stack of avatars (≤ 4)
 * or a compact AvatarGroup with a maximum display count (for > 4 members).
 * 
 * @component
 * 
 * @param {ProyectoCard["integrantes"]} integrantes - Array of project members to display.
 * 
 * @returns {JSX.Element} A visual list of user avatars for the project card.
 * 
 * @example
 * ```tsx
 * <ProjectCardMembers integrantes={proyecto.integrantes} />
 * ```
 */
export const ProjectCardMembers: React.FC<ProjectCardMembersProps> = ({ integrantes }) => {
  if (integrantes.length > 4) {
    return (
      <AvatarGroup max={4}>
        {integrantes.map((integrante) => (
          <Avatar alt={integrante.nombres} src={integrante.foto} />
        ))}
      </AvatarGroup>
    );
  } else
    return (
      <Stack direction={'row'} spacing={2}>
        {integrantes.map((integrante) => (
          <ProjectCardAvatar usuario={integrante} />
        ))}
      </Stack>
    );
};
