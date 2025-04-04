import React, { forwardRef } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import useSearch from "@modules/general/hooks/useSearch";
import SearchIcon from "@mui/icons-material/Search";

/**
 * Props for the `TextFieldSearch` component.
 * Extends MUI's `TextFieldProps` to allow all standard TextField properties.
 */
type Props = {
  /**
   * Function to update the search value when the user presses Enter or clicks the search button.
   */
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
} & TextFieldProps;

/**
 * A search input field with an integrated search button.
 * Allows users to type a search query and trigger a search by pressing Enter or clicking the search icon.
 *
 * @component
 * @param {Props} props - The component props, including `setSearchValue` and all standard `TextField` props.
 * @param {React.Ref<HTMLInputElement>} ref - Reference to the input element.
 * @returns {JSX.Element} A search input field with a search button.
 */
const TextFieldSearch = forwardRef<HTMLInputElement, Props>(
  ({ setSearchValue, ...props }, ref) => {
    const { buffer, setBuffer } = useSearch();

    /**
     * Handles the Enter key press event to trigger the search.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setSearchValue(buffer);
      }
    };

    /**
     * Handles the click event of the search button to trigger the search.
     */
    const handleClick = () => {
      setSearchValue(buffer);
    };

    return (
      <TextField
        size="small"
        {...props} // Pass all TextField props
        inputRef={ref} // Assign ref to the internal input
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setBuffer(e.currentTarget.value as string)}
        value={buffer}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

export default TextFieldSearch;
