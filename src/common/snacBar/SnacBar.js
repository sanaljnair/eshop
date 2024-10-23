import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function EshopSnackbar({open, handleClose, message, severity}) {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    return (
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );

    // return (
    //     <Snackbar
    //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //         open={open}
    //         onClose={onClose}
    //         message={message}
    //         severity={severity}
    //         autoHideDuration={6000}
    //         // key={message}
    //         // ContentProps={{
    //         //     sx: {
    //         //         color: "black",
    //         //         bgcolor: "lightgreen",
    //         //         fontWeight: "bold",
    //         //     }
    //         // }}
    //     />
    // );

}

