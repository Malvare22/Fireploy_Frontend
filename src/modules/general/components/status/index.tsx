import { EstadoCurso } from "@modules/materias/types/materia";
import { getUserStatus } from "@modules/usuarios/utils/usuario.map";
import { Box, Stack, useTheme } from "@mui/material";

type StatusProps = {
  estado: EstadoCurso;
};

const Status: React.FC<StatusProps> = ({ estado }) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <Box
        sx={{
          width: 16,
          height: 16,
          backgroundColor:
            estado == "A"
              ? theme.palette.success.main
              : theme.palette.error.main,
          borderRadius: "100%",
          animation: "blink 1s infinite alternate",
          "@keyframes blink": {
            "0%": { opacity: 1 },
            "50%": { opacity: 0.7 },
            "100%": { opacity: 1 },
          },
        }}
      />
      <Box>{getUserStatus.get(estado)}</Box>
    </Stack>
  );
};

export default Status;