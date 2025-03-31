import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { Repositorio } from "@modules/proyectos/types/repositorio";
import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CancelIcon from "@mui/icons-material/Cancel";
import { useFormContext } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";

const EnviromentVariables: React.FC<{ edit?: boolean }> = ({
  edit = false,
}) => {
  const theme = useTheme();

  const {
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<Repositorio>();

  function handleAdd() {
    setValue("variables", [
      ...getValues("variables"),
      { nombre: "NUEVA_VARIABLE", valor: "Value" },
    ]);
  }

  function Row({
    variable,
    pos,
  }: {
    variable: Repositorio["variables"][number];
    pos: number;
  }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSave = async () => {
      setValue(`variables.${pos}`, buffer);
      setDisable(true);
    };

    const [disable, setDisable] = useState(true);

    const [buffer, setBuffer] =
      useState<Repositorio["variables"][number]>(variable);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      key: keyof typeof buffer
    ) => {
      setBuffer({ ...buffer, [key]: e.currentTarget.value });
    };

    function handleCancel() {
      handleClose();
      setBuffer(variable);
      setDisable(true);
    }

    function handleRemove() {
      setValue(
        "variables",
        getValues("variables").filter((_element, i) => {
          return i != pos;
        })
      );
    }

    return (
      <Stack position={"relative"}>
        <Grid2 container marginY={3} paddingX={disable ? 2 : 0} spacing={2}>
          <Grid2 size={6}>
            {disable ? (
              <Typography sx={{ wordBreak: "break-all", marginRight: 2 }}>
                {buffer.nombre}
              </Typography>
            ) : (
              <TextField
                value={buffer.nombre}
                onChange={(e) => handleChange(e, "nombre")}
                size="small"
                error={!!errors.variables?.[pos]?.nombre}
                helperText={errors.variables?.[pos]?.nombre?.message}
                fullWidth
              />
            )}
          </Grid2>
          <Grid2 size={6}>
            {disable ? (
              <Typography sx={{ wordBreak: "break-all", marginRight: 3 }}>
                {buffer.valor}
              </Typography>
            ) : (
              <Box marginRight={6}>
                <TextField
                value={buffer.valor}
                onChange={(e) => handleChange(e, "valor")}
                size="small"
                error={!!errors.variables?.[pos]?.valor}
                helperText={errors.variables?.[pos]?.valor?.message}
                fullWidth
              />
              </Box>
            )}
          </Grid2>
        </Grid2>
        <Divider />
        <Box
          sx={{
            position: "absolute",
            right: 3,
            top: "25%",
          }}
        >
          {!disable ? (
            <Box sx={{display: 'flex', flexDirection: 'column', marginTop: -2, alignItems:'center'}}>
              <IconButton onClick={handleSave}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CancelIcon />
              </IconButton>
            </Box>
          ) : (
            <>
              <IconButton onClick={handleClick} disabled={!edit}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => setDisable(false)}>
                  <EditIcon />
                </MenuItem>
                <MenuItem onClick={handleRemove}>
                  <DeleteIcon />
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Stack>
    );
  }

  return (
    <Stack>
      <Box sx={{ backgroundColor: theme.palette.action.hover, padding: 2 }}>
        <Grid2 container>
          <Grid2 size={6}>
            <Typography>
              {labelConfiguracion.variablesDeEntornoNombre}
            </Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography>
              {labelConfiguracion.variablesDeEntornoValor}
            </Typography>
          </Grid2>
        </Grid2>
      </Box>
      <Divider />
      {watch("variables").map((variable, i) => (
        <Row variable={variable} pos={i} />
      ))}
      {edit && (
        <Box marginY={2}>
          <Button variant="contained" size="small" onClick={handleAdd}>
            {labelConfiguracion.agregar}
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default EnviromentVariables;
