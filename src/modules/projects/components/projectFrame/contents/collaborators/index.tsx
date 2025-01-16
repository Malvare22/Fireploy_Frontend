import { usersDummy } from "@core/test/data/users";
import AutocompleteUsers from "@modules/general/components/autocompleteUsers";
import CellUser from "@modules/general/components/cellUsers";
import { Box, Divider, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Collaborators() {
  return (
    <Box>
      <Typography variant="h3Bold">Colaboradores</Typography>

      <Divider sx={{ marginBottom: 3 }} />
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <SearchIcon sx={{ marginRight: 2 }} />
        <AutocompleteUsers />
      </Box>

      <Box sx={{ backgroundColor: "backgroundX.panel" }}>
        {usersDummy.map((user) => (
          <Box sx={{ padding: 2, border: "1px solid rgba(0, 0, 0, .1)" }}>
            <CellUser usuario={user} type="list" />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Collaborators;
