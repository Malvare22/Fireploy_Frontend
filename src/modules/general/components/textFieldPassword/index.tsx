import { forwardRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * A password input field with a toggle button to show or hide the password.
 * It extends the default MUI `TextField` component.
 *
 * @component
 * @param {TextFieldProps} props - Props passed to the MUI `TextField` component.
 * @param {React.Ref<HTMLInputElement>} ref - Reference to the input element.
 * @returns {JSX.Element} The password input field with a visibility toggle button.
 */
const TextFieldPassword = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Toggles the visibility of the password.
     */
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
      <TextField
        {...props} // Pass all TextField props
        inputRef={ref} // Assign ref to the internal input
        type={showPassword ? "text" : "password"} // Change input type
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default TextFieldPassword;
