import { useState } from "react";

/**
 * Represents a user for the search functionality.
 * 
 * @typedef {Object} UsuarioCampoBusqueda
 * @property {string} foto - URL of the user's profile picture.
 * @property {string} nombreCompleto - Full name of the user.
 * @property {number} id - Unique identifier of the user.
 */
export type UsuarioCampoBusqueda = {
  foto: string;
  nombreCompleto: string;
  id: number;
};

/**
 * Custom hook for handling user selection in a search component.
 * 
 * @returns {Object} Hook return values.
 * @returns {UsuarioCampoBusqueda | null} selectUser - The currently selected user.
 * @returns {React.Dispatch<React.SetStateAction<UsuarioCampoBusqueda | null>>} setSelectUser - Function to update the selected user.
 */
export const useSearchUsers = () => {
  const [selectUser, setSelectUser] = useState<UsuarioCampoBusqueda | null>(null);

  return {
    selectUser,
    setSelectUser,
  };
};
