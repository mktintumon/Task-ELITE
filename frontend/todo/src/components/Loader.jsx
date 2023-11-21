import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loader() {
  return (
    <Box sx={{ width: '100%', marginTop: '4rem' , height:"1rem" }}>
    <LinearProgress color="warning" />
  </Box>
  );
}
