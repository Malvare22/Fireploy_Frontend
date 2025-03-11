import { useState } from "react";
import { FilterLabels } from "../types/filterLabels";
import CustomSelect from "../components/customSelect";
import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import Row from "../components/row";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

/**
 * Hook para el uso de filtros en las tablas de datos de tipo <T>
 * @returns {Object}
 * @returns {Function} setFilters - Función para establecer los pertinentes filtros
 * @returns {Component} RenderFilters - parte visual de los filtros para su uso
 * @returns {Function} toggleFilters - función que aplica los filtros a nivel lógico
 * @returns {Function} filterData - datos con los filtros ya aplicados
 */
export const useFiltros = <T extends object>() => {
  const [filters, setFilters] = useState<Record<keyof T, string | undefined>>(
    {} as Record<keyof T, string | undefined>
  );

  const [filterLabels, setFilterLabels] = useState<FilterLabels<T>[] | null>(
    null
  );

  /**
   * Modificador de los filtros que se van a aplicar
   * @param key identificador del atributo sobre el que se aplica el filtro
   * @param value valor que se va a aplicar sobre el identificador
   */
  const toggleFilter = (key: keyof T, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value as T[keyof T],
    }));
  };

  /**
   * Función que aplica los filtros sobre los datos
   * @param data datos sobre los que se van a aplicar los filtros
   * @returns una copia de los datos con los filtros aplicados
   */
  const filterData = (data: T[]) => {
    return Object.entries(filters).reduce((filteredData, [key, value]) => {
      return filteredData.filter(
        (element) => value === undefined || element[key as keyof T] === value
      );
    }, data);
  };

  /**
   * Componente de los filtros disponibles a renderizar, así cómo de las respectivas opciones a seleccionar
   * @returns
   */
  const RenderFilters = () => {
    if (filterLabels)
      return (
        <Box
          sx={{
            marginY: { md: 4 },
            display: "flex",
            flexDirection: { lg: "row", xs: "column" },
            gap: 3,
            marginRight: 10,
          }}
        >
          {filterLabels.map((element, key) => {
            return (
              <Row sx={{ marginY: { xs: 1, md: 0 } }} key={key}>
                <Typography variant="titleBold">{element.text}</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CustomSelect
                    variantDelta="secondary"
                    value={filters[element.key]}
                    style={{ width: 200 }}
                  >
                    {element.labels.map((label) => (
                      <MenuItem
                        value={label.value}
                        onClick={() => toggleFilter(element.key, label.value)}
                      >
                        {label.text}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                  {
                    <IconButton
                      sx={{
                        visibility:
                          filters[element.key] == undefined ? "hidden" : "",
                      }}
                      onClick={() => toggleFilter(element.key, undefined)}
                    >
                      <DoDisturbOnIcon />
                    </IconButton>
                  }
                </Box>
              </Row>
            );
          })}
        </Box>
      );

    return <></>;
  };

  return { setFilterLabels, RenderFilters, toggleFilter, filterData };
};
