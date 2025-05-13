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

const HiddenButton = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <VisuallyHiddenInput {...props} ref={ref} />;
});

export default HiddenButton;
