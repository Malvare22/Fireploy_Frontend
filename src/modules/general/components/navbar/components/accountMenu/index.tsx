import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { Fragment, useState } from "react";
import { Box, ListItemButton, Typography } from "@mui/material";

export const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <ListItemButton
            onClick={handleClick}
          >
            <ProfilePreview nombre="Rodrigo Malaver" foto="a" />
          </ListItemButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: "50%",
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} sx={{ width: 240 }}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} sx={{ width: 240 }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

interface ProfilePreviewProps {
  nombre: string;
  foto: string;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ nombre, foto }) => {
  return (
    // container
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginTop: {
          xs: -3,
          lg: 0,
        },
      }}
    >
      <Box
        sx={{
          width: { sm: 300, xs: 200 },
          textAlign: "center",
          wordBreak: "break-word",
          border: "1px solid black",
        }}
      >
        <Typography variant="h5Bold" sx={{ marginRight: 1 }}>
          {nombre}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 52,
          height: 52,
          backgroundColor: "gray",
          borderRadius: 100,
          marginLeft: 1,
        }}
      ></Box>
    </Box>
  );
};
