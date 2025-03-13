import { Box, Card, Typography } from "@mui/material";
import { UsuarioCampoBusqueda } from "../searchUsers/hook";
import ActionButton from "../actionButton";
import { actionButtonTypes } from "@modules/general/types/actionButtons";

const SelectUserFrame: React.FC<{
  user: UsuarioCampoBusqueda;
  onClick: () => void;
}> = ({ user, onClick }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box component={"img"} sx={{ width: 24, height: 24, marginRight: 2 }} />
        <Box>
          <Typography>{user.nombreCompleto}</Typography>
        </Box>
      </Box>
      <Box>
        <ActionButton mode={actionButtonTypes.deshabilitar} onClick={onClick} />
      </Box>
    </Card>
  );
};

export default SelectUserFrame;
