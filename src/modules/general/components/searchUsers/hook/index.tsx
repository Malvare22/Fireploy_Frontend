import { useState } from "react";

export type UsuarioCampoBusqueda = {
  foto: string;
  nombreCompleto: string;
  id: number;
};

export const useSearchUsers = () => {
  const [selectUser, setSelectUser] = useState<UsuarioCampoBusqueda | null>(
    null
  );

  return {
    selectUser,
    setSelectUser,
  };
};
