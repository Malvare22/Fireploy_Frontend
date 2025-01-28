import AutocompleteUsers from "@modules/general/components/autocompleteUsers";
import CellUser from "@modules/general/components/cellUsers";
import { Box, Divider, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import AlertDialog from "@modules/general/components/alertDialog";
import { TypeUsuario, usersDummy } from "@modules/usuarios/test/data/usuarios.prueba";

function Collaborators() {
  const [userToAdd, setUserToAdd] = useState<TypeUsuario | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const handleUser = (usuario: TypeUsuario) => {
    setUserToAdd(usuario);
    setOpen(true);
  };

  return (
    <Box>
      <Typography variant="h3Bold">Colaboradores</Typography>

      <Divider sx={{ marginBottom: 3 }} />
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <SearchIcon sx={{ marginRight: 2 }} />
        <AutocompleteUsers onChange={handleUser} />
      </Box>

      <Box sx={{ backgroundColor: "backgroundX.panel" }}>
        {usersDummy.map((user) => (
          <Box sx={{ padding: 2, border: "1px solid rgba(0, 0, 0, .1)" }}>
            <CellUser usuario={user} type="list" />
          </Box>
        ))}
      </Box>
      {userToAdd && <AlertDialog open={open} setOpen={setOpen} title="¿Desea agregar al TypeUsuario?">
        <CellUser usuario={userToAdd} type="preview" />
      </AlertDialog>}
    </Box>
  );
}

export default Collaborators;
