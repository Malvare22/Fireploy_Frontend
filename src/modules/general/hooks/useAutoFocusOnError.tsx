import { useEffect } from "react";
import { useFormContext, FieldValues } from "react-hook-form";

/**
 * Helper function to find the first error in a nested error object.
 * This function recursively traverses the error object and returns the path
 * to the first field with an error.
 *
 * @param errors - The error object from react-hook-form containing validation errors.
 * @returns The path to the first field with an error, or null if no errors are found.
 */
function findFirstError(errors: FieldValues): any {
  for (const key in errors) {
    if (errors[key] && typeof errors[key] === "object") {
      // If the error is an object, recursively search within it
      const nestedError = findFirstError(errors[key]);
      if (nestedError) {
        return `${key}.${nestedError}`;
      }
    } else if (errors[key]) {
      // If a direct error is found, return the key (field name)
      return key;
    }
  }
  return null;
}

/**
 * Custom component that automatically focuses on the first field with an error
 * when the form validation errors change. It uses `react-hook-form` to manage
 * form validation and focus handling.
 *
 * @returns null - This component does not render anything, it only manages focus.
 */
const AutoFocusOnError = <T extends FieldValues>() => {
  const {
    setFocus, // Function to set focus on a specific field
    formState: { errors }, // Errors from react-hook-form validation
  } = useFormContext<T>();

  useEffect(() => {
    // Find the first field with an error
    const firstError = findFirstError(errors);
    if (firstError) {
      // If an error is found, focus the corresponding field
      setFocus(firstError as any);
    }
  }, [errors, setFocus]); // Re-run the effect when `errors` or `setFocus` changes

  return null; // This component does not render anything
};

export default AutoFocusOnError;
