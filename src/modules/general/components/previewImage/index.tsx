import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

/**
 * Propiedades del componente `PreviewImage`.
 * 
 * @property {string} image - URL o base64 de la imagen a mostrar.
 * @property {React.Dispatch<string>} setImage - Función para actualizar la imagen.
 * @property {"proyecto" | "usuario"} [type="usuario"] - Tipo de imagen, afecta el diseño.
 */
interface PreviewImageProps {
  image: string;
  setImage: React.Dispatch<string>;
  type?: "proyecto" | "usuario";
}

/**
 * Componente `PreviewImage` que permite visualizar, agregar y eliminar una imagen.
 * 
 * @param {PreviewImageProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que muestra la imagen y botones de acción.
 */
const PreviewImage: React.FC<PreviewImageProps> = ({
  image,
  setImage,
  type = "usuario",
}) => {
  /**
   * Maneja el cambio de imagen cuando el usuario selecciona un archivo.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} event - Evento de cambio del input de archivo.
   */
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
      setImage("");
    }
  };

  /**
   * Maneja la eliminación de la imagen actual.
   */
  const handleRemoveImage = () => {
    setImage(""); // Limpiar la imagen
    if (ref.current) {
      ref.current.value = ""; // Limpiar la selección del archivo en el input
    }
  };

  /**
   * Activa el input de archivo para seleccionar una nueva imagen.
   */
  const handleAddImage = () => {
    ref.current?.click();
  };

  // Referencia al input de archivo
  const ref = useRef<null | HTMLInputElement>(null);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      {image ? (
        <Box
          sx={{
            display: "flex",
            flexDirection:
              type == "proyecto" ? { xs: "column", md: "row" } : "row",
            alignItems: "center",
            gap: 3,
            justifyContent: { xs: "center", md: "start" },
          }}
        >
          <Box
            component={'img'}
            src={image}
            alt="Vista previa"
            sx={{
              width: type != 'proyecto' ?  96 : {xs: 178, md: 256},
              height: type != 'proyecto' ?  96 : {xs: 112, md: 156},
            }}
          />
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
