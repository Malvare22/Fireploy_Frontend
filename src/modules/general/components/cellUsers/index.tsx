import { usersDummy } from "@core/test/data/users";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Props {
  usuario: (typeof usersDummy)[number];
  type: "autocomplete" | "list";
}

const CellUser: FC<Props> = ({ usuario, type }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component={"img"}
        src={usuario.fotoPerfil}
        sx={{
          width: type == "autocomplete" ? 64 : 96,
          height: type == "autocomplete" ? 64 : 96,
          marginRight: 2,
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", width: '100%', alignItems: 'center' }}>
        <Box>
          <Typography
            variant={(type != 'autocomplete') ? "titleBold" : 'body'}
            color={(type != 'autocomplete') ? "info.main" : ''}
          >{`${usuario.nombres} ${usuario.apellidos}`}</Typography>
        </Box>
        {type ==  'list' && <Box>
          <IconButton>
            <DeleteOutlineIcon sx={{fontSize: 32}}/>
          </IconButton>
        </Box>}
      </Box>
    </Box>
  );
};

export default CellUser;
