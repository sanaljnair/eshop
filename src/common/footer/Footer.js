import React from 'react';
import { Typography, Link, Box } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright'; // Import CopyrightIcon

const Footer = () => {
    return (
        <Box
            sx={{
                position: 'relative', // Ensure footer stays at the bottom
                bottom: 0,
                left: 0, // Align to the left
                width: '100%', // Span the entire width
                display: 'flex',
                justifyContent: 'center', // Center content horizontally
                alignItems: 'center', // Center content vertically (optional)
                padding: '1rem',
                backgroundColor: '#f5f5f5', // Optional background color
            }}

        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="textSecondary">
                    Upgrad ©
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    <Link href="https://www.upgrad.com" target="_blank" underline="always">
                        upgrad
                    </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">2021</Typography>
            </div>


        </Box>
    );
};

export default Footer;