import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrder";
import useSearch from "@modules/general/hooks/useSearch";
import { FormControl, Grid2, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { ReactNode, useMemo } from "react";
import TextFieldSearch from "../textFieldSearch";

type Props<T> = {
  data: T[];
  sorterOptions?: { key: string; label: [[string, Order], [string, Order], [string, Order]] }[];
  filterOptions?: { key: string; options: [string, (x: any) => boolean][] }[];
  children: ReactNode;
  setRefineData: React.Dispatch<T[]>;
  searchFn: (items: T[]) => T[];
};

function RefinePanel<T extends Object>({
  data,
  sorterOptions,
  filterOptions,
  children,
  setRefineData,
  searchFn,
}: Props<T>) {
  const { filteredData: applySearch, searchValue, setSearchValue } = useSearch();
  const { filterDataFn, handleFilter } = useFilters<T>();
  const { handleOrder, orderDataFn } = useOrderSelect<T>();

  const refineData = useMemo(() => {
    return setRefineData(filterDataFn(orderDataFn(applySearch(data, searchFn))));
  }, [data, filterDataFn, orderDataFn, searchValue]);

  return (
    <Stack spacing={3}>
      <Grid2 container>
        <TextFieldSearch setSearchValue={setSearchValue} />
      </Grid2>
      <Grid2>
        <Grid2>
          {sorterOptions?.map(({ key, label }) => (
            <FormControl key={key} fullWidth>
              <InputLabel>{key}</InputLabel>
              <Select label={key} onChange={(e) => handleOrder(key, e.target.value as Order)}>
                {label.map(([_label, value]) => (
                  <MenuItem key={_label} value={value}>
                    {_label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Grid2>
        <Grid2>
          <Grid2>
            {filterOptions?.map(({ key, options }) => (
              <FormControl key={key} fullWidth>
                <InputLabel>{key}</InputLabel>
                <Select
                  label={key}
                  onChange={(e) => {
                    const idx = (e.target.value as number) ?? 0;
                    try {
                      handleFilter(key, options[idx][1]);
                    } catch {
                      handleFilter(key, options[0][1]);
                    }
                  }}
                >
                  {options.map(([text], i) => {
                    return (
                      <MenuItem key={text} value={i}>
                        {text}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
      {children}
    </Stack>
  );
}
