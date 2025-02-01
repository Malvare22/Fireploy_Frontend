import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import FaceIcon from '@mui/icons-material/Face';
import { LabelGeneral } from "@modules/general/enums/labelGeneral";

interface Props {
  ver?: boolean;
  handleVer?: () => void;
  editar?: boolean;
  handleEditar?: () => void;
  eliminar?: boolean;
  habilitar?: boolean;
  deshabilitar?: boolean;
  handleEstado?: () => void;
}
const IconosAccionesBasicas: React.FC<Props> = ({
  editar,
  handleEditar,
  eliminar,
  handleVer,
  ver,
  habilitar,
  deshabilitar,
  handleEstado
}) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {ver && (
        <Tooltip title={LabelGeneral.ver}>
          <IconButton onClick={handleVer}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      )}
      {editar && (
        <Tooltip title={LabelGeneral.editar}>
          <IconButton onClick={handleEditar}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      {eliminar && (
        <Tooltip title={LabelGeneral.eliminar}>
          <IconButton onClick={handleEstado}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {habilitar && (
        <Tooltip title={LabelGeneral.habilitar}>
          <IconButton onClick={handleEstado}>
            <FaceIcon />
          </IconButton>
        </Tooltip>
      )}
      {deshabilitar && (
        <Tooltip title={LabelGeneral.deshabilitar}>
          <IconButton onClick={handleEstado}>
            <FaceRetouchingOffIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default IconosAccionesBasicas;
