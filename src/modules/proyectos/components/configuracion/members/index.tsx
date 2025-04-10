import { ProjectCardAvatar } from "@modules/general/components/projectCardAvatar";
import { labelConfiguracion } from "@modules/proyectos/enum/labelConfiguracion";
import { UsuarioPortafolioCard, usuarioPrueba } from "@modules/usuarios/types/usuario.portafolio";
import { Box, Button, Divider, IconButton, Stack, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const Members = () => {
  const theme = useTheme();

  return (
    <Stack spacing={0}>
      <Stack>
        <Stack marginBottom={2} direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5">{labelConfiguracion.colaboradores}</Typography>
          <Button variant="contained" size="small">
            {labelConfiguracion.invitarIntegrantes}
          </Button>
        </Stack>
        <Typography variant="body1" marginBottom={3}>
          {labelConfiguracion.colaboradoresParrafo}
        </Typography>
        <Divider />
      </Stack>
      <Divider />
      <Box sx={{ padding: 2, backgroundColor: theme.palette.action.hover }}>
        <TextField placeholder={labelConfiguracion.filtrarColaboradores} />
      </Box>
      <Divider />
      <Typography padding={2}>{labelConfiguracion.cuenta}</Typography>
      <Divider />
      <CardMember member={usuarioPrueba} />
      <Divider />
    </Stack>
  );
};

type CardMemberProps = {
  member: UsuarioPortafolioCard;
};
const CardMember: React.FC<CardMemberProps> = ({ member }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      spacing={1}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={2}
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <ProjectCardAvatar usuario={member} sx={{ width: 48, height: 48 }} />
        <Typography variant="h6">{member.nombres}</Typography>
        <Typography
          padding={1}
          variant="subtitle2"
          sx={{
            backgroundColor: theme.palette.success.main,
            color: theme.palette.primary.main,
            borderRadius: 2,
          }}
        >
          {labelConfiguracion.eresTu}
        </Typography>
      </Stack>
      <Stack>
        <Tooltip title={labelConfiguracion.opciones} placement="top">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};