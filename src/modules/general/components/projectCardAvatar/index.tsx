import { Avatar,AvatarGroup } from "@mui/material";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { UsuarioCurso } from "@modules/materias/types/curso";


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
  
  
    return (
      <AvatarGroup max={6}>
        {integrantes.map((integrante) => (
          <Avatar alt={integrante.nombre} src={integrante.imagen} />
        ))}
      </AvatarGroup>
    );
 
};
