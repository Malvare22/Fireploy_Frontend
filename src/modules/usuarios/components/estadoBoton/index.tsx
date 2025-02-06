import { EstadoEjecucionProyecto } from "@modules/projects/types/proyecto.estadoEjecucion";
import { obtenerColorEstado } from "@modules/projects/utils/obtenerColorEstado";
import { obtenerEstado } from "@modules/projects/utils/obtenerEstado copy";
import { obtenerIconoEstado } from "@modules/projects/utils/obtenerIconoEstado";
import { Button } from "@mui/material";
import React from "react";

const EstadoBoton: React.FC<{
  estado: EstadoEjecucionProyecto;
  url: string;
}> = ({ estado, url }) => {
  const abrirNuevaVentana = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: obtenerColorEstado(estado) }}
      endIcon={obtenerIconoEstado[estado]}
      disabled={estado != "N"}
      onClick={() => {
        estado == "N" ? abrirNuevaVentana() : null;
      }}
    >
      {obtenerEstado[estado]}
    </Button>
  );
};

export default EstadoBoton;
