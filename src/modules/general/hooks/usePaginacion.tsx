import { useMemo, useState } from "react";

/**
 * Hook para la gestión de la segmentación de datos en diferentes páginas enfocado a tablas
 * @param cantidadPaginas el total de elementos que se va a mostrar por página en la tabla
 * @returns {number} pagina - página actual en que se encuentra la tabla
 * @returns {Function} setPagina - modificador de la página actual
 * @returns {unknown[]} mostrarDatos - los datos que se van a mostrar por página
 * @returns {number} totalPaginas - cantidad de páginas que va a tener
 * @returns {unknown[]} datos - datos mostrar en la tabla
 * @returns {Function} setDatos - modificador de los datos a mostrar
 */
const usePaginacion = (cantidadPaginas: number) => {

  const [pagina, setPagina] = useState(1);

  const [datos, setDatos] = useState<unknown[]>([]);

  /**
   * Estimación del total de páginas que va a tener la tabla
   * @returns cantidad de páginas
   */
  const totalPaginas = useMemo(() => {
    return Math.ceil(datos.length / cantidadPaginas);
  }, [datos, cantidadPaginas]);

  /**
   * @returns {unknown[]} datos que se encuentran en el intervalo actual
   * por ejemplo, si se encuentra en la página 2, y hay 5 datos por página,
   * se muestran los datos de la posición [5-9] (indexado de 0)
   */
  const mostrarDatos = useMemo(() => {
    const left = (pagina - 1) * cantidadPaginas;

    return datos.slice(left, left + cantidadPaginas);
  }, [pagina, datos, cantidadPaginas]);

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
