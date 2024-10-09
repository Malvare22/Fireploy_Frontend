import { Box, Button, Input } from "@mui/material";
import { styles } from "./styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";

interface Props {
  imgLoader: {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    img: string | null;
    setImg: React.Dispatch<string | null>
  };
};

function ImgLoader({imgLoader}: Props) {

  return (
    <Box sx={styles.container}>
      {imgLoader.img != null && <Box component={'img'} src={imgLoader.img} sx={styles.preview}/>}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Cambiar Imagen
        <Input sx={styles.hiddenInputFile} type="file" onChange={imgLoader.handleChange}/>
      </Button>
    </Box>
  );
}

export default ImgLoader;
