import { useState } from "react";

/**
 * Hook personalizado `usePreviewImage` para gestionar la vista previa de una imagen.
 *
 * @param {string} [initialValue] - Valor inicial de la imagen (URL o base64).
 * @returns {{
 *   image: string;
 *   setImage: React.Dispatch<React.SetStateAction<string>>;
 * }} Estado y función para actualizar la imagen.
 */
export const usePreviewImage = (initialValue?: string) => {
  // Estado para almacenar la imagen
  const [image, setImage] = useState<string>(initialValue ? initialValue : "");

  return {
    image,
    setImage,
  };
};
