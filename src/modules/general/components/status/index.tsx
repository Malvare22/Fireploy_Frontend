import { Box, Stack, useTheme } from "@mui/material";

export type StatusProps = {
  status: 'A' | 'I';
};

const Status: React.FC<StatusProps> = ({ status }) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <Box
        sx={{
          width: 16,
          height: 16,
          backgroundColor:
            status == "A"
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
      <Box>{getStatus(status)}</Box>
    </Stack>
  );
};

function getStatus(status: StatusProps['status']){
  return status == 'A' ? 'Activo' : 'Inactivo';
}

export default Status;