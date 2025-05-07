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
 * TextFieldPassword Component
 *
 * A reusable password input field based on MUI's `TextField`.
 * Includes a toggle button to show or hide the password.
 *
 * Accepts all standard `TextFieldProps`.
 *
 * @component
 * @example
 * ```tsx
 * <TextFieldPassword
 *   label="Password"
 *   variant="outlined"
 *   fullWidth
 * />
 * ```
 *
 * @param {TextFieldProps} props - Props to pass down to the MUI TextField.
 * @param {React.Ref<HTMLInputElement>} ref - Optional ref to the input element.
 * @returns {JSX.Element} The password input component with visibility toggle.
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
