import { useState } from "react";

/**
 * Hook para el uso de filtros de información de <T>
 * @returns {Object}
 * @returns {Function} toggleFilter - función que aplica los filtros a nivel lógico
 * @returns {Function} filterData - datos con los filtros ya aplicados
 */
export const useFiltersByConditions = <T extends object>() => {
  // Se define correctamente el tipo de los filtros
  const [filters, setFilters] = useState<Record<string, (value: any) => boolean>>({});

  /**
   * Modificador de los filtros que se van a aplicar
   * @param key identificador del atributo sobre el que se aplica el filtro (puede ser anidado con "dot notation")
   * @param condition función que recibe un valor y devuelve un booleano
   */
  const toggleFilter = (key: string, condition: (value: any) => boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: condition,
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
  const filterData = (data: T[]): T[] => {
    return Object.entries(filters).reduce((filteredData, [key, condition]) => {
      return filteredData.filter((element) => condition(getNestedValue(element, key)));
    }, data);
  };

  return { toggleFilter, filterData, filters };
};
