import React, { useState, useEffect } from 'react';

import {
    CssBaseline,
    Typography,
    Container,
} from '@mui/material';
import NavigationBar from '../../common/navigationBar/NavigationBar';



const Home = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin'));
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('access-token'));

    // console.log('Home page: isAdmin: ', isAdmin , typeof isAdmin);
    // console.log('Home page: isLoggedin: ', isLoggedIn, typeof isLoggedIn);
    // console.log('Home page: accessToken: ', accessToken);

    return (
        <>
            <NavigationBar page="home" isLoggedIn={isLoggedIn} isAdmin={isAdmin} />

            <Container component="main" maxWidth="xs" sx={{ marginTop: '50px',  minHeight: '85vh'  }}  >
                <CssBaseline />
                <div>

                    <Typography component="h1" variant="h5" textAlign={'center'}>
                        Welcome to upGrad E-Shop.
                    </Typography>
                    <Typography component="h1" variant="h5" textAlign={'center'}>
                        Please login to shop.
                    </Typography>


                </div>
            </Container>
        </>

    );
};

export default Home;