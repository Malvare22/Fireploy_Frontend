import useSearch from "@modules/general/hooks/useSearch";
import TablaSolicitudes from "@modules/usuarios/components/promover";
import { labelSolicitudes } from "@modules/usuarios/enum/labelSolicitudes";
import { exampleSolicitudes } from "@modules/usuarios/types/solicitud.promover";
import { Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TextFieldSearch from "@modules/general/components/textFieldSearch";

function VistaSolicitudes() {

  const {searchValue, setSearchValue} = useSearch();

  return (
    <Stack spacing={3}>
      <Stack>
        <TextFieldSearch setSearchValue={setSearchValue} label={labelSolicitudes.buscarSolicitud}/>
      </Stack>
      <Typography variant="h4">{labelSolicitudes.solicitudes}</Typography>
    <TablaSolicitudes solicitudes={exampleSolicitudes}/>
    </Stack>
  )
}

export default VistaSolicitudes;