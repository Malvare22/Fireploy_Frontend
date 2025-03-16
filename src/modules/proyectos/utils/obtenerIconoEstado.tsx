import React from "react";
import { EstadoEjecucionProyecto } from "../types/proyecto.estadoEjecucion";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SignalCellularNodataIcon from '@mui/icons-material/SignalCellularNodata';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

export const obtenerIconoEstado: Record<EstadoEjecucionProyecto, React.ReactNode> = {
    F: <SignalCellularNodataIcon/>,
    N: <SignalCellularAltIcon/>,
    E: <ErrorIcon/>,
    L: <HourglassBottomIcon/>,
  };