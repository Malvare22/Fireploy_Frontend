import { Box, Card, Typography } from "@mui/material";
import { UsuarioCampoBusqueda } from "../../hooks/useSearchUsers";
import ActionButton from "../actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";

/**
 * SelectUserFrame Component
 *
 * A card-style UI component used to display a selected user with their profile picture and name.
 * It also includes an action button to perform an operation such as removal or disabling.
 *
 * @component
 * @param {SelectUserFrameProps} props - Component props.
 * @param {UsuarioCampoBusqueda} props.user - The user data to be displayed.
 * @param {Function} props.onClick - The callback function triggered when the action button is clicked.
 * 
 * @returns {JSX.Element} A styled card showing the user's photo and name with an action button.
 *
 * @example
 * ```tsx
 * <SelectUserFrame user={usuario} onClick={() => handleRemove(usuario.id)} />
 * ```
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
