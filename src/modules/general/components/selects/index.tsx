import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrder";
import { FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useMemo } from "react";

export type SorterOptions = {
  key: string;
  label: string;
  options: { asc: string; desc: string; defaultValue?: string };
}[];

export type FilterOptions = {
  key: string;
  label: string;
  options: [string, (x: any) => boolean][];
}[];

type SelectOrderProps<T> = {
  sorterOptions: SorterOptions;
  setRefineData: React.Dispatch<React.SetStateAction<T[]>>;
  label?: string;
  data: T[];
  type?: "multiple" | "single";
};

type SelectFiltersProps<T> = {
  filterOptions: FilterOptions;
  setRefineData: React.Dispatch<React.SetStateAction<T[]>>; // Cambiado aquí
  data: T[];
};

export function SelectOrders<T extends Object>({
  sorterOptions,
  data,
  setRefineData,
  type = "multiple",
  label,
}: SelectOrderProps<T>) {
  const { handleOrder, order, orderDataFn, resetOrder } = useOrderSelect<T>();
  useEffect(() => {
    console.log("A");
    setRefineData(orderDataFn(data));
  }, [order]);
  if (type == "multiple")
    return (
      <Grid2 container>
        {sorterOptions?.map(({ key, options, label }) => (
          <Grid2 size={{ md: 4, xs: 12 }}>
            <FormControl key={key} fullWidth>
              <InputLabel>{label}</InputLabel>
              <Select
                label={key}
                onChange={(e) =>
                  handleOrder(key, e.target.value == "" ? undefined : (e.target.value as Order))
                }
              >
                <MenuItem value={"asc"}>{options.asc}</MenuItem>
                <MenuItem value={"desc"}>{options.desc}</MenuItem>
                <MenuItem value={""}>{options.defaultValue || ""}</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
        ))}
      </Grid2>
    );
  else {
    return (
      <TextField
        select
        label={label || "No Aplicar"}
        defaultValue={"_none_"}
        fullWidth
        size="small"
        onChange={(e) => {
          const value = e.target.value;
          resetOrder();
          if (value === "_none_") {
            return;
          }

          const parsed: { key: string; value: Order } = JSON.parse(value as string);
          handleOrder(parsed.key, parsed.value);
        }}
      >
        {sorterOptions?.map(({ options, key }) => [
          <MenuItem
            key={`${key}-asc`} // Key única sin JSON.stringify
            value={JSON.stringify({ key, value: "asc" })}
          >
            {options.asc}
          </MenuItem>,
          <MenuItem
            key={`${key}-desc`} // Key única sin JSON.stringify
            value={JSON.stringify({ key, value: "desc" })}
          >
            {options.desc}
          </MenuItem>,
        ])}
        <MenuItem value="_none_">No Aplicar</MenuItem>
      </TextField>
    );
  }
}

export function SelectFilters<T extends Object>({
  filterOptions,
  setRefineData,
  data,
}: SelectFiltersProps<T>) {
  const { filterDataFn, handleFilter, filters } = useFilters<T>();

  const showOptions = useMemo(() => {
    return filterOptions.map((optionGroup) => ({
      ...optionGroup,
      options: optionGroup.options.concat([["No Aplicar", (_x: any) => true]]),
    }));
  }, [filterOptions]);

  useEffect(() => {
    setRefineData(filterDataFn(data));
  }, [filters]);

  return (
    <Grid2 container spacing={2}>
      {showOptions.map(({ key, options, label }) => {
        return (
          <Grid2 size={{ md: 3, xs: 12 }} key={key}>
            <FormControl fullWidth>
              <InputLabel>{label}</InputLabel>
              <Select
                label={label}
                onChange={(e) => {
                  const idx = parseInt(e.target.value ? (e.target.value as string) : "0");
                  handleFilter(key, options[idx][1]);
                }}
                defaultValue={options.length - 1}
                size="small"
              >
                {options.map(([text], i) => {
                  return (
                    <MenuItem key={text} value={i}>
                      {[text]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid2>
        );
      })}
    </Grid2>
  );
}
