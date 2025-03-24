import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import Logout from "@mui/icons-material/Logout";
import { AccountContext } from "@modules/general/context/accountContext";
import { useNavigate } from "react-router-dom";
import { rutasUsuarios } from "@modules/usuarios/router/router";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  
  const handleClose = (_event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate(rutasUsuarios.perfil);
    setAnchorEl(null);
  };

  const setLocalUser = React.useContext(AccountContext)?.setLocalUser;

  const localUser = React.useContext(AccountContext)?.localUser;

  const handleCloseSession = () => {
    localStorage.clear();
    if (setLocalUser) setLocalUser(null);
    navigate("/");
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
        }}
      >
        {/* <Button variant='contained' sx={{border: '1px solid white', padding: 1, borderRadius: 10, marginRight: 2}}><Stack direction={'row'} ><Typography sx={{ minWidth: 100 }}>Mi Perfil</Typography> <AccountCircleIcon/></Stack></Button> */}
        {/* <Divider sx={{backgroundColor: 'white', height: '50px', width:2}} orientation='vertical'/> */}
        <Typography
          variant="body1"
          fontWeight={"bold"}
          display={{ xs: "none", md: "flex" }}
          width={180}
        >
          {localUser?.nombre ?? ""}
        </Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 48, height: 48 }}
              src={localUser?.foto ?? ""}
            ></Avatar>
          </IconButton>
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
                right: 14,
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
        <MenuItem onClick={handleProfile}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseSession}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
