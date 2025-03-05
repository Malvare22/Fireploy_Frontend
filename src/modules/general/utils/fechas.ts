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
    let _fecha = fecha.split('-');
    return `${}/${}/${}`
};