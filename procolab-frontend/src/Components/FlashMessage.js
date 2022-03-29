import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FlashMessage(props1) {
 

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props1.open} autoHideDuration={1000} onClose={props1.handleClose}>
        <Alert onClose={props1.handleClose} severity={props1.severity} sx={{ width: '100%' }}>
          {props1.errorMessage}
        </Alert>
      </Snackbar>
      
    </Stack>
  );
}