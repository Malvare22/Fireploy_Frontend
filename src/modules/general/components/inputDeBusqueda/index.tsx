import { Box } from "@mui/material";
import CustomInput from "../customInput";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

/**
 * Propiedades para el componente InputDeBusqueda.
 */
interface Props {
  /** Valor actual del campo de búsqueda. */
  search: string;
  /** Función para actualizar el estado del campo de búsqueda. */
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Componente de entrada de búsqueda con un icono de lupa.
 * Permite al usuario ingresar texto para realizar una búsqueda.
 * 
 * @param {Props} props - Propiedades del componente.
 * @returns {JSX.Element} - Componente de entrada de búsqueda con un icono.
 */
const InputDeBusqueda: React.FC<Props> = ({ search, setSearch }: Props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* Campo de entrada personalizado para la búsqueda */}
      <CustomInput
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        variant="secondary"
      />
      {/* Ícono de búsqueda */}
      <SearchIcon />
    </Box>
  );
};

export default InputDeBusqueda;
