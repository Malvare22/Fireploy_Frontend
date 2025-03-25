import { useState } from "react";

export type Order = "asc" | "desc";

function useOrderSelect<T extends object>() {
  // Estado: cada propiedad tiene su propio orden independiente
  const [orderBy, setOrderBy] = useState<Record<string, Order | undefined>>({});

  /**
   * Función que accede a valores anidados de un objeto dado un path en "dot notation"
   */
  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  /**
   * Comparador para ordenar los datos en orden ascendente o descendente.
   * @param {T} a - Primer elemento a comparar.
   * @param {T} b - Segundo elemento a comparar.
   * @param {string} key - Clave por la que se ordena (puede ser anidada con "dot notation").
   * @param {Order} order - Orden actual ("asc" o "desc").
   * @returns {number} - Retorna -1 si `a < b`, 1 si `a > b`, 0 si son iguales.
   */
  function comparator(a: T, b: T, key: string, order: Order) {
    const valueA = getNestedValue(a, key);
    const valueB = getNestedValue(b, key);

    if (valueA < valueB) return order === "asc" ? -1 : 1;
    if (valueA > valueB) return order === "asc" ? 1 : -1;
    return 0;
  }

  /**
   * Retorna una función de comparación basada en múltiples criterios de ordenación.
   * @param {Record<string, Order | undefined>} orderBy - Objeto con claves y sus respectivos órdenes.
   * @returns {(a: T, b: T) => number} - Función de comparación.
   */
  function getComparator(orderBy: Record<string, Order | undefined>): (a: T, b: T) => number {
    return (a, b) => {
      for (const key of Object.keys(orderBy)) {
        const order = orderBy[key];
        if (order !== undefined) {
          const comparison = comparator(a, b, key, order);
          if (comparison !== 0) return comparison;
        }
      }
      return 0;
    };
  }

  /**
   * Función para manejar el cambio de ordenación de una propiedad.
   * Si la propiedad ya está ordenada, cambia entre "asc" y "desc".
   * Si se pasa `undefined`, se elimina la ordenación por esa propiedad.
   * @param {string} property - La propiedad por la que se ordena (puede ser anidada con "dot notation").
   * @param {Order | undefined} order - El orden a aplicar ("asc", "desc" o `undefined` para eliminar).
   */
  const handleRequestSort = (property: string, order: Order | undefined) => {
    setOrderBy((prevOrderBy) => ({
      ...prevOrderBy,
      [property]: order,
    }));
  };

  /**
   * Función para ordenar los datos.
   * @param {T[]} array - Los datos a ordenar.
   * @returns {T[]} - Los datos ordenados.
   */
  const stableSort = (array: T[]) => {
    const activeOrderBy = Object.fromEntries(
      Object.entries(orderBy).filter(([_, order]) => order !== undefined)
    );

    if (Object.keys(activeOrderBy).length === 0) return array;

    const comparator = getComparator(activeOrderBy);
    return array.slice().sort(comparator);
  };

  return {
    orderBy,
    handleRequestSort,
    stableSort,
    setOrderBy
  };
}

export default useOrderSelect;