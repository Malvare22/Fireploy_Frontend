import { styled } from '@mui/material/styles';
import React, { forwardRef } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

/**
 * HiddenButton component – a visually hidden HTML input element, typically used
 * for accessibility or file upload triggers styled through custom UI.
 * 
 * It uses Material UI's `styled` utility to apply accessibility-friendly styles
 * that hide the element from view while keeping it operable by screen readers and
 * programmatic interactions.
 * 
 * @component
 * 
 * @param {object} props - Standard HTML input attributes to be passed to the hidden input element.
 * 
 * @returns {JSX.Element} A hidden input element suitable for use in custom interactive components.
 * 
 * @example
 * ```tsx
 * <label htmlFor="upload-button">
 *   <Button component="span">Upload File</Button>
 * </label>
 * <HiddenButton
 *   id="upload-button"
 *   type="file"
 *   onChange={handleFileChange}
 * />
 * ```
 */
const HiddenButton = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <VisuallyHiddenInput {...props} ref={ref} />;
});

export default HiddenButton;
