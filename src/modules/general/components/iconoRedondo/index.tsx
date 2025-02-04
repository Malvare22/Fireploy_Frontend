import { Box, IconButton, Tooltip } from "@mui/material";

const IconoRedondo: React.FC<{
  imagen: string;
  nombre: string;
  url?: string | null;
  dimensiones?: {
    height: number | string | { xs: number | string; md: number | string };
    width: number | string | { xs: number | string; md: number | string };
  };
}> = ({
  imagen,
  nombre,
  url,
  dimensiones = { height: { md: 32, xs: 24 }, width: { md: 32, xs: 24 } },
}) => {
  return (
    <Tooltip title={nombre}>
      <IconButton
        onClick={() => {
          if (url) window.open(url, "_blank");
        }}
      >
        <Box
          component={"img"}
          sx={{
            height: dimensiones?.height,
            width: dimensiones?.width,
            borderRadius: "100%",
          }}
          src={imagen}
        ></Box>
      </IconButton>
    </Tooltip>
  );
};

export default IconoRedondo;
