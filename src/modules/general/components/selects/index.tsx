import { useFilters } from "@modules/general/hooks/useFilters";
import useOrderSelect, { Order } from "@modules/general/hooks/useOrder";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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

/**
 * SelectOrders component – allows users to select ordering preferences for a given dataset.
 *
 * This component supports both single and multiple order selectors. When `type` is set to "multiple",
 * multiple order selectors are displayed for each sorting criterion. If `type` is "single", a single select
 * input is displayed for ordering. The component uses `useOrderSelect` to manage and apply the sorting order
 * to the provided data.
 *
 * @component
 *
 * @param {Array} sorterOptions - List of sorting options, each containing sorting `key`, `label`, and `options` for asc/desc.
 * @param {Array} data - The dataset that needs to be sorted.
 * @param {React.Dispatch} setRefineData - Function to update the filtered data after sorting.
 * @param {"multiple" | "single"} [type="multiple"] - Defines if multiple sorting options or a single one should be displayed.
 * @param {string} label - The label to display for the ordering controls.
 *
 * @returns {JSX.Element} A set of sorting controls (either multiple selects or one select).
 *
 * @example
 * ```tsx
 * <SelectOrders sorterOptions={sortOptions} data={data} setRefineData={setRefineData} />
 * ```
 */
export function SelectOrders<T extends Object>({
  sorterOptions,
  data,
  setRefineData,
  type = "multiple",
  label,
}: SelectOrderProps<T>) {
  const { handleOrder, order, orderDataFn, resetOrder } = useOrderSelect<T>();
  useEffect(() => {
    setRefineData(orderDataFn(data));
  }, [order]);
  if (type == "multiple")
    return (
      <Grid2 container spacing={2}>
        {sorterOptions?.map(({ key, options, label }) => (
          <Grid2 size={{ md: 4, xs: 12 }}>
            <FormControl size="small" key={key} fullWidth>
              <InputLabel>{label}</InputLabel>
              <Select
                label={key}
                onChange={(e) =>
                  handleOrder(key, e.target.value == "" ? undefined : (e.target.value as Order))
                }
                size="small"
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

/**
 * SelectFilters component – provides filters for refining the displayed dataset based on given criteria.
 *
 * The component renders a set of filter options that the user can choose from, which dynamically updates the
 * displayed data. It uses `useFilters` to manage the active filters and applies them to the data. Each filter can
 * have a group of options, and selecting an option refines the displayed results.
 *
 * @component
 *
 * @param {Array} filterOptions - List of filter options, where each option group contains a key, label, and options.
 * @param {React.Dispatch} setRefineData - Function to update the filtered data after applying the selected filters.
 * @param {Array} data - The dataset that needs to be filtered.
 *
 * @returns {JSX.Element} A set of filtering controls, such as dropdowns, for the dataset.
 *
 * @example
 * ```tsx
 * <SelectFilters filterOptions={filterOptions} data={data} setRefineData={setRefineData} />
 * ```
 */
export function SelectFilters<T extends Object>({
  filterOptions,
  setRefineData,
  data,
}: SelectFiltersProps<T>) {
  const { filterDataFn, handleFilter, filters } = useFilters<T>();

  const matches = useMediaQuery((theme) => theme.breakpoints.down("md"));

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
      {!matches &&
        showOptions.map(({ key, options, label }) => {
          return (
            <>
              <Grid2 size={3} key={key}>
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
            </>
          );
        })}

      {matches &&
        
          <Accordion sx={{width: "100%", padding: 0}}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Filtros</Typography>
            </AccordionSummary>
            <AccordionDetails>
             { showOptions.map(({ key, options, label }) => (
              <Grid2 size={12} key={key}>
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
              </Grid2>))}
            </AccordionDetails>
          </Accordion>
        }
    </Grid2>
  );
}
