import { Box, ListItemButton, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

// Componente de Notificaciones
const Notificacions = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: { lg: 4 },
        cursor: "pointer",
        transition: "color 0.3s ease",
        // "&:hover": {
        //   color: "primary.main", // Cambia esto según tu tema
        // },
      }}
    >
      <ListItemButton
        onClick={() => {
          navigate("notifications");
        }}
      >
        <Typography variant="h5Bold" sx={{ marginRight: 1 }}>
          Notificaciones
        </Typography>
        <NotificationsIcon sx={{ fontSize: 24 }} />
      </ListItemButton>
    </Box>
  );
};
export default Notificacions;
