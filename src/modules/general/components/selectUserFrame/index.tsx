import { Box, Card, Typography } from "@mui/material";
import { UsuarioCampoBusqueda } from "../../hooks/useSearchUsers";
import ActionButton from "../actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";

/**
 * Component that displays the selected user's information along with an action button.
 * 
 * @param {Object} props - Component properties.
 * @param {UsuarioCampoBusqueda} props.user - Selected user data.
 * @param {() => void} props.onClick - Function executed when the action button is clicked.
 * @returns {JSX.Element} The `SelectUserFrame` component.
 */
const SelectUserFrame: React.FC<{ user: UsuarioCampoBusqueda; onClick: () => void }> = ({ user, onClick }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* User Profile Picture */}
        <Box
          component="img"
          src={user.foto}
          alt={user.nombreCompleto}
          sx={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        {/* User Name */}
        <Typography variant="body1">{user.nombreCompleto}</Typography>
      </Box>

      {/* Action Button */}
      <ActionButton mode={actionButtonTypes.deshabilitar} onClick={onClick} />
    </Card>
  );
};

export default SelectUserFrame;
