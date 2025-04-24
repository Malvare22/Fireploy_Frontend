import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrder";
import { FormControl, Grid2, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useMemo } from "react";

export type SorterOptions = {
  key: string;
  label: [[string, Order], [string, Order], [string, Order]];
}[];

export type FilterOptions = {
  key: string;
  label: string;
  options: [string, (x: any) => boolean][];
}[];

type SelectOrderProps<T> = {
  sorterOptions: SorterOptions;
  setRefineData: React.Dispatch<React.SetStateAction<T[]>>; // Cambiado aquí
  data: T[];
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
}: SelectOrderProps<T>) {
  const { handleOrder, order, orderDataFn } = useOrderSelect<T>();

  useEffect(() => {
    setRefineData(orderDataFn(data));
  }, [order]);

  return (
    <Grid2 container>
      {sorterOptions?.map(({ key, label }) => (
        <Grid2 size={{ md: 4, xs: 12 }}>
          <FormControl key={key} fullWidth>
            <InputLabel>{key}</InputLabel>
            <Select
              label={key}
              onChange={(e) =>
                handleOrder(key, e.target.value == "" ? undefined : (e.target.value as Order))
              }
            >
              {label.map(([_label, value]) => (
                <MenuItem key={_label} value={!value ? "" : value}>
                  {_label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      ))}
    </Grid2>
  );
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
