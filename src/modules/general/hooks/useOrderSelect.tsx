import { useState } from "react";

function useOrderSelect<T extends object>() {
  type Order = "asc" | "desc";

  // Estado: cada propiedad tiene su propio orden independiente
  const [orderBy, setOrderBy] = useState<Record<keyof T, Order>>({} as Record<keyof T, Order>);

  /**
   * Comparador para ordenar los datos en orden descendente.
   * @param {T} a - Primer elemento a comparar.
   * @param {T} b - Segundo elemento a comparar.
   * @param {keyof T} key - Clave por la que se ordena.
   * @param {Order} order - Orden actual ("asc" o "desc").
   * @returns {number} - Retorna -1 si `a < b`, 1 si `a > b`, 0 si son iguales.
   */
  function comparator(a: T, b: T, key: keyof T, order: Order) {
    if (a[key] < b[key]) return order === "asc" ? 1 : -1;
    if (a[key] > b[key]) return order === "asc" ? -1 : 1;
    return 0;
  }

  /**
   * Retorna una función de comparación basada en múltiples criterios de ordenación.
   * @param {Record<keyof T, Order>} orderBy - Objeto con claves y sus respectivos órdenes.
   * @returns {(a: T, b: T) => number} - Función de comparación.
   */
  function getComparator(orderBy: Record<keyof T, Order>): (a: T, b: T) => number {
    return (a, b) => {
      for (const key of Object.keys(orderBy) as (keyof T)[]) {
        const order = orderBy[key];
        const comparison = comparator(a, b, key, order);
        if (comparison !== 0) return comparison;
      }
      return 0;
    };
  }

  /**
   * Función para manejar el cambio de ordenación de una propiedad.
   * Si la propiedad ya está ordenada, cambia entre "asc" y "desc".
   * Si no está, se añade con "asc".
   * @param {keyof T} property - La propiedad por la que se ordena.
   */
  const handleRequestSort = (property: keyof T, order: Order) => {
    setOrderBy((prevOrderBy) => ({
      ...prevOrderBy,
      [property]: order,
    }));
  };

  /**
   * Función para eliminar una propiedad de la ordenación.
   * @param {keyof T} property - La propiedad a eliminar.
   */
  const removeSortProperty = (property: keyof T) => {
    setOrderBy((prevOrderBy) => {
      const newOrderBy = { ...prevOrderBy };
      delete newOrderBy[property];
      return newOrderBy;
    });
  };

  /**
   * Función para ordenar los datos.
   * @param {T[]} array - Los datos a ordenar.
   * @returns {T[]} - Los datos ordenados.
   */
  const stableSort = (array: T[]) => {
    if (Object.keys(orderBy).length === 0) return array;
    const comparator = getComparator(orderBy);
    return array.slice().sort(comparator);
  };

  return {
    orderBy,
    handleRequestSort,
    removeSortProperty,
    stableSort,
  };
}

export default useOrderSelect;
