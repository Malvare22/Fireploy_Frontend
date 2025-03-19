import { useState } from 'react'

function useOrderSelect<T extends object>() {

  const [data, setData] = useState<T[] | undefined>(undefined);

  type Order = "asc" | "desc";

  const [order, setOrder] = useState<Order>("asc");

  const [orderBy, setOrderBy] = useState<(keyof T)[]>([]);

  /**
   * Comparador para ordenar los datos en orden descendente.
   *
   * @param {T} a - Primer elemento a comparar.
   * @param {T} b - Segundo elemento a comparar.
   * @param {keyof T} orderBy - Clave por la que se ordena.
   * @returns {number} - Retorna -1 si `a < b`, 1 si `a > b`, 0 si son iguales.
   */
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  /**
   * Retorna una función de comparación basada en el orden seleccionado.
   *
   * @param {"asc" | "desc"} order - Orden de la tabla ("asc" o "desc").
   * @param {keyof T[]} orderBy - Claves por las que se ordena.
   * @returns {(a: T, b: T) => number} - Función de comparación.
   */
  function getComparator(
    order: Order,
    orderBy: (keyof T)[]
  ): (a: T, b: T) => number {
    return (a, b) => {
      for (const key of orderBy) {
        const comparison = descendingComparator(a, b, key);
        if (comparison !== 0) {
          return order === "desc" ? comparison : -comparison;
        }
      }
      return 0;
    };
  }

  /**
   * Función para manejar el cambio de ordenación.
   *
   * @param {keyof T} property - La propiedad por la que se ordena.
   */
  const handleRequestSort = (property: keyof T) => {
    const isAsc = orderBy.includes(property) && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy((prevOrderBy) => {
      if (prevOrderBy.includes(property)) {
        return prevOrderBy.filter((key) => key !== property);
      } else {
        return [...prevOrderBy, property];
      }
    });
  };

  /**
   * Función para ordenar los datos.
   *
   * @param {T[]} array - Los datos a ordenar.
   * @returns {T[]} - Los datos ordenados.
   */
  const stableSort = (array: T[]) => {
    if (!orderBy.length) return array;
    const comparator = getComparator(order, orderBy);
    return array.slice().sort(comparator);
  };

  return {
    data,
    setData,
    order,
    orderBy,
    handleRequestSort,
    stableSort,
  };
}

export default useOrderSelect;