import { useState } from "react";
import { FilterLabels } from "../types/filterLabels";
import CustomSelect from "../components/customSelect";
import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import Row from "../components/row";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

export const useFiltros = <T extends object>() => {
  const [filters, setFilters] = useState<Record<keyof T, string | undefined>>(
    {} as Record<keyof T, string | undefined>
  );

  const [filterLabels, setFilterLabels] = useState<FilterLabels<T>[] | null>(
    null
  );

  // Función para activar/desactivar un filtro
  const toggleFilter = (key: keyof T, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value, // Cambiar el valor booleano del filtro
    }));
  };

  const filterData = (data: T[]) => {
    let bufferData = data;
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const value = filters[key];
        bufferData = bufferData.filter(
          (element) => value == undefined || element[key] == value
        );
      }
    }

    return bufferData;
  };

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
                <Typography variant="titleBold" width={50}>
                  {element.text}
                </Typography>
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

  // Retornamos el estado y la función para actualizarlo.
  return { setFilterLabels, RenderFilters, toggleFilter, filterData };
};
