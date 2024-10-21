import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';


export default function EshopSnackbar(props) {

    const [snackBarstate, setSnackBarState] = React.useState({
        snackOpen: false,
        message: ''
    });

    const { snackOpen, message } = snackBarstate;

    const handleSnackBarClose = () => {
        setSnackBarState({ ...snackBarstate, snackOpen: false });
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={snackOpen}
            onClose={handleSnackBarClose}
            message={message}
            key={message}
            // autoHideDuration={6000}
            ContentProps={{
                sx: {
                    color: "black",
                    bgcolor: "lightgreen",
                    fontWeight: "bold",
                }
            }}
        />
    );

}