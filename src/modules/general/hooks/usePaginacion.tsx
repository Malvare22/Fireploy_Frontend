import { useMemo, useState } from "react";

const usePaginacion = (cantidadPaginas: number) => {
  const [pagina, setPagina] = useState(1);

  const [datos, setDatos] = useState<any[]>([]);

  const totalPaginas = useMemo(() => {
    return Math.ceil(datos.length / cantidadPaginas);
  }, [datos]);

  const mostrarDatos = useMemo(() => {
    const left = (pagina - 1) * cantidadPaginas;

    return datos.slice(left, left + cantidadPaginas);
  }, [pagina, datos]);

  return {
    pagina,
    setPagina,
    mostrarDatos,
    totalPaginas,
    datos,
    setDatos,
  };
};

export default usePaginacion;
