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
 * This hook manages the selected user in a search interface. It provides the state
 * of the currently selected user and a function to update the selected user.
 *
 * @returns {{
 *   selectUser: UsuarioCampoBusqueda | null, // The currently selected user, or null if no user is selected.
 *   setSelectUser: React.Dispatch<React.SetStateAction<UsuarioCampoBusqueda | null>> // Function to update the selected user.
 * }}
 */
export const useSearchUsers = () => {
  const [selectUser, setSelectUser] = useState<UsuarioCampoBusqueda | null>(null);

  return {
    selectUser, // The currently selected user, or null if no user is selected.
    setSelectUser, // Function to update the selected user.
  };
};
