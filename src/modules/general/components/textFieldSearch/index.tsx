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
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
} & TextFieldProps;

/**
 * TextFieldSearch component – a controlled text input field with an integrated search icon button,
 * designed for performing search operations via keyboard (Enter key) or button click.
 * 
 * It uses an internal buffer from a custom hook to manage input state before committing
 * the value via the `setSearchValue` function, enabling delayed or validated search triggers.
 * 
 * @component
 * 
 * @param {Function} setSearchValue - A state setter function that receives the current input value
 * when a search is triggered (e.g., on Enter key or search button click).
 * 
 * @param {Object} [props] - Additional props forwarded to the underlying Material UI `TextField`,
 * such as label, placeholder, variant, etc.
 * 
 * @returns {Visual element} A text input field with a search icon button and Enter key functionality.
 * 
 * @example
 * ```tsx
 * <TextFieldSearch
 *   label="Search projects"
 *   setSearchValue={setSearch}
 *   placeholder="Type to search..."
 * />
 * ```
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
