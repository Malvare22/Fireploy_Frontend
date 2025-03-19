import { useState } from "react";

/**
 * Hook para el uso de filtros de información de <T>
 * @returns {Object}
 * @returns {Function} toggleFilter - función que aplica los filtros a nivel lógico
 * @returns {Function} filterData - datos con los filtros ya aplicados
 */
export const useFilters = <T extends object>() => {
  const [filters, setFilters] = useState<Record<string, string | undefined>>({});

  /**
   * Modificador de los filtros que se van a aplicar
   * @param key identificador del atributo sobre el que se aplica el filtro (puede ser anidado con "dot notation")
   * @param value valor que se va a aplicar sobre el identificador
   */
  const toggleFilter = (key: string, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value as string | undefined,
    }));
  };

  /**
   * Función que accede a valores anidados de un objeto dado un path en "dot notation"
   */
  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  /**
   * Función que aplica los filtros sobre los datos
   * @param data datos sobre los que se van a aplicar los filtros
   * @returns una copia de los datos con los filtros aplicados
   */
  const filterData = (data: T[]) => {
    return Object.entries(filters).reduce((filteredData, [key, value]) => {
      return filteredData.filter(
        (element) => value === undefined || getNestedValue(element, key) === value
      );
    }, data);
  };

  return { toggleFilter, filterData };
};
