export const validarFechaConLaActual = (fecha: string) => {
    try{
        const fechaTemporal = new Date(fecha);
        return fechaTemporal <= new Date();
    }
    catch(e){
        return false;
    }
};

export const obtenerFechaActual = () => {
    const fechaActual = ((new Date())).toISOString().slice(0,10);
    return fechaActual;
};

export const adaptarFechaBackend = (fecha: string) => {
    const _fecha = fecha.split('-');
    return `${_fecha[0]}-${_fecha[1]}-${_fecha[2].slice(0,2)}`
};