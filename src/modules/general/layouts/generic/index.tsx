import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import PreLogin from '../prelogin';
import { styles } from './styles';


function Generic({children, title}: {children: ReactNode, title: string}) {

  return (
    <Box sx={styles.container}>
      {title && <Box sx={{textAlign: 'center', marginBottom: 4}}><Typography variant='h2'>{title}</Typography></Box>}
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        {children}
      </Box>
    </Box>
  );
}

export default Generic;
