import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrder";
import useSearch from "@modules/general/hooks/useSearch";
import { FormControl, Grid2, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { ReactNode, useEffect } from "react";
import TextFieldSearch from "../textFieldSearch";

export type SorterOption = { key: string; label: [[string, Order], [string, Order], [string, Order]] }[]

export type FilterOption = { key: string; options: [string, (x: any) => boolean][] }[]

type Props<T> = {
  data: T[];
  sorterOptions?: SorterOption;
  filterOptions?: FilterOption;
  children: ReactNode;
  setRefineData: React.Dispatch<T[]>;
  searchOptions?: boolean;
  searchFn?: (items: T[]) => T[];
};

/**
 * RefinePanel is a generic React component that provides a unified interface 
 * for filtering, sorting, and searching through a dataset. It is designed to work 
 * with MUI components and leverages custom hooks to handle logic for search, filter, and order.
 *
 * @template T The type of the data items in the dataset.
 *
 * @param {T[]} data - The dataset to be refined through search, filters, and sorting.
 * 
 * @param {Object[]} [sorterOptions] - Optional list of sorting configuration options.
 * Each object must contain a `key` (string) and `label` (array of tuples) 
 * describing the sorting options. Each tuple contains a display label and an `Order` value.
 * Example: 
 * ```ts
 * [{ key: 'Name', label: [['A-Z', 'asc'], ['Z-A', 'desc']] }]
 * ```
 *
 * @param {Object[]} [filterOptions] - Optional list of filter configuration options.
 * Each object must contain a `key` (string) and `options` (array of tuples). 
 * Each tuple consists of a display text and a function used to filter the data.
 * Example:
 * ```ts
 * [{ key: 'Status', options: [['Active', item => item.active], ['Inactive', item => !item.active]] }]
 * ```
 *
 * @param {ReactNode} children - The children to render below the control panel (i.e. the actual content or table).
 *
 * @param {React.Dispatch<T[]>} setRefineData - A setter function to update the refined (filtered, sorted, searched) data.
 *
 * @param {boolean} [searchOptions] - If true, displays a search bar.
 *
 * @param {(items: T[]) => T[]} [searchFn] - Optional custom search function to further refine search behavior. Defaults to identity function.
 *
 * @returns {JSX.Element} The rendered UI including search input, filter dropdowns, sort dropdowns, and children content.
 *
 * @example
 * <RefinePanel
 *   data={items}
 *   sorterOptions={[
 *     { key: 'Price', label: [['Low to High', 'asc'], ['High to Low', 'desc']] }
 *   ]}
 *   filterOptions={[
 *     { key: 'Category', options: [['Books', item => item.type === 'book']] }
 *   ]}
 *   searchOptions
 *   setRefineData={setFilteredItems}
 * >
 *   <ItemList data={filteredItems} />
 * </RefinePanel>
 */
export default function RefinePanel<T extends Object>({
  data,
  sorterOptions,
  filterOptions,
  children,
  setRefineData,
  searchOptions,
  searchFn = (x) => {
    return x;
  },
}: Props<T>) {
  const { filteredData: applySearch, searchValue, setSearchValue } = useSearch();
  const { filterDataFn, handleFilter } = useFilters<T>();
  const { handleOrder, orderDataFn } = useOrderSelect<T>();

  useEffect(() => {
    setRefineData(filterDataFn(orderDataFn(applySearch(data, searchFn))));
  }, [data, filterDataFn, orderDataFn, searchValue]);

  return (
    <Stack spacing={3}>
      {searchOptions && (
        <Grid2 container>
          <Grid2 size={{ md: 4, xs: 12 }}>
            <TextFieldSearch setSearchValue={setSearchValue} />
          </Grid2>
        </Grid2>
      )}
      {sorterOptions && (
        <Grid2 container>
          <Grid2 size={{ md: 4, xs: 12 }}>
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
        </Grid2>
      )}
      {filterOptions && (
        <Grid2 container>
          <Grid2 size={{ md: 4, xs: 12 }}>
            {filterOptions?.map(({ key, options }) => {
              return (
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
                      if (!text) {
                      }
                      return (
                        <MenuItem key={text} value={i}>
                          {text}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            })}
          </Grid2>
        </Grid2>
      )}
      {children}
    </Stack>
  );
}
