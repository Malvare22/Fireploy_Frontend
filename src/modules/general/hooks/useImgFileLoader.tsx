import { useState } from "react";
import { handleImageChange } from "../utils/previewImg";

function useImgFileLoader() {
  const [img, setImg] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageChange(event, setImg);
  };

  return {
    img,
    setImg,
    handleChange,
  };
}

export default useImgFileLoader;
