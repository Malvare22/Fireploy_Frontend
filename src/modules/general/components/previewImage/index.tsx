import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface PreviewImageProps {
  image: string;
  setImage: React.Dispatch<string>;
}

export const usePreviewImage = (initialValue?: string) => {
  const [image, setImage] = useState<string>(initialValue ? initialValue : '');
  return {
    image,
    setImage,
  };
};

const PreviewImage: React.FC<PreviewImageProps> = ({ image, setImage }) => {

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtenemos el primer archivo seleccionado

    if (file && file.type.startsWith("image")) {
      // Crear una URL para la vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Establecemos la URL de la imagen
      };
      reader.readAsDataURL(file); // Leemos el archivo como URL de datos
    } else {
      alert("Por favor, selecciona un archivo de imagen.");
      setImage('');
    }
  };

  const handleRemoveImage = () => {
    setImage(''); // Limpiar la imagen
    if (ref.current) {
      ref.current.value = ""; // Limpiar la selección del archivo en el input
    }
  };

  const handleAddImage = () => {
    ref.current?.click();
  };

  const ref = useRef<null | HTMLInputElement>(null);

  return (
    <Box sx={{ width: "100%", border: "solid 1px rgba(0,0,0, .2)", padding: {md: 2} }}>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      {image ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, justifyContent: {xs: 'center', md: 'start'}, paddingY: {xs: 2, md: 0} }}>
          <img src={image} alt="Vista previa" height={96} width={96} />
          <Tooltip title="Borrar Imagen">
            <IconButton onClick={handleRemoveImage}>
              <DeleteIcon sx={{ fontSize: 48 }} />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <>
          <Tooltip title="Agregar Imagen">
            <IconButton onClick={handleAddImage}>
              <AddCircleIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Tooltip>
          <Typography variant="title2Bold" color="error">
            No se ha seleccionado ninguna imagen.
          </Typography>
        </>
      )}
    </Box>
  );
};

export default PreviewImage;
