import React, { forwardRef } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import useSearch from "@modules/general/hooks/useSearch";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  /**
   * Sets the final value used for search execution, e.g., after clicking the button or pressing Enter.
   */
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
} & TextFieldProps;

/**
 * `TextFieldSearch` is a text input with a search button and buffered input logic.
 *
 * It captures user input and only commits it (via `setSearchValue`) when the search icon is clicked
 * or the Enter key is pressed. Internally uses `useSearch()` for debounce or buffer support.
 *
 * Accepts all standard `TextFieldProps`.
 *
 * @component
 * @example
 * ```tsx
 * const [search, setSearch] = useState("");
 * return <TextFieldSearch label="Buscar..." setSearchValue={setSearch} />;
 * ```
 *
 * @param {Props} props - Includes MUI `TextFieldProps` and `setSearchValue` callback.
 * @param {React.Ref<HTMLInputElement>} ref - Ref to the internal input element.
 * @returns {JSX.Element} Search input field with search trigger.
 */
const TextFieldSearch = forwardRef<HTMLInputElement, Props>(
  ({ setSearchValue, ...props }, ref) => {
    const { buffer, setBuffer } = useSearch();

    /** Trigger search on Enter key press */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setSearchValue(buffer);
      }
    };

    /** Trigger search on icon button click */
    const handleClick = () => {
      setSearchValue(buffer);
    };

    return (
      <TextField
        size="small"
        {...props}
        inputRef={ref}
        InputProps={{
          ...props.InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setBuffer(e.currentTarget.value)}
        value={buffer}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

export default TextFieldSearch;
