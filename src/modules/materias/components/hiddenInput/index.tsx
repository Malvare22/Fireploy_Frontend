import { styled } from '@mui/material/styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function HiddenButton(props: Props) {

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

  return (
    <VisuallyHiddenInput {...props}/>
  )
}

export default HiddenButton