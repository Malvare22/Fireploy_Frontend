import { Box, IconButton, Tooltip } from "@mui/material";

const RedSocialIcon: React.FC<{
  imagen: string;
  nombre: string;
  url?: string | null;
}> = ({ imagen, nombre, url }) => {
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
            height: { md: 32, xs: 16 },
            width: { md: 32, xs: 16 },
            borderRadius: "100%",
          }}
          src={imagen}
        ></Box>
      </IconButton>
    </Tooltip>
  );
};

export default RedSocialIcon;
