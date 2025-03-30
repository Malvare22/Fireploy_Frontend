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
} & TextFieldProps; // Permite que acepte todas las props de TextField

const TextFieldSearch = forwardRef<HTMLInputElement, Props>(
  ({ setSearchValue, ...props }, ref) => {
    const { buffer, setBuffer } = useSearch();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setSearchValue(buffer);
      }
    };

    const handleClick = () => {
      setSearchValue(buffer);
    };

    return (
      <TextField
        size="small"
        {...props} // Pasa todas las props de TextField
        inputRef={ref} // Asigna la ref al input interno
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
