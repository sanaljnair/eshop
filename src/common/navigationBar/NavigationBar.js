import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));


const NavigationBar = (props) => {


    const page = props.page
    const isLoggedIn = props.isLoggedIn;
    const [isAdmin, SetIsAdmin] = useState(props.isAdmin);
    const [searchTerm, setSearchTerm] = useState('');

    // console.log('NavBar : page: ', page);
    // console.log('NavBar : isAdmin: ', isAdmin, typeof isAdmin);
    // console.log('NavBar : isLoggedin: ', isLoggedIn, typeof isLoggedIn);

    const RenderHome = () => {
        return (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button
                    key="Home"
                    sx={{ color: '#fff', textTransform: 'none', fontSize: 16 }}
                    component={Link} to="/"
                >
                    Home
                </Button>
            </Box>
        );
    }

    const RenderLogin = () => {
        return (
            <Box >
                <Button
                    variant="contained"
                    key="Login"
                    color="secondary"
                    component={Link} to="/signin"
                >
                    Login
                </Button>
            </Box>
        );
    };

    const RenderLogout = () => {

        return (
            <Box>
                <Button
                    variant="contained"
                    key="Logout"
                    color="secondary"
                    component={Link} to="/signin"
                >
                    Logout
                </Button>
            </Box>
        );
    };

    const RenderLoginLink = () => {
        return (
            <Box>
                <Button
                    key="signin"
                    sx={{ color: '#fff', textTransform: 'none', fontSize: 16 }}
                    component={Link} to="/signin"
                >
                    Login
                </Button>
            </Box>
        );

    };

    const RenderSignUp = () => {
        return (
            <Box>
                <Button
                    key="signin"
                    sx={{ color: '#fff', textTransform: 'none', fontSize: 16 }}
                    component={Link} to="/signup"
                >
                    SignUp
                </Button>
            </Box>
        );

    };

    const RenderAddProduct = () => {

        // console.log('inside RenderAddProduct component')
        return (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button
                    key="AddProduct"
                    sx={{ color: '#fff', textTransform: 'none', fontSize: 16 }}
                    component={Link} to='/signin'                                           // <- change here 
                >
                    Add Product
                </Button>
            </Box>
        );

    };

    const RenderAddProductAdmin = () => {

        // console.log('inside RenderAddProduct component')
        return (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button
                    key="AddProduct"
                    sx={{ color: '#fff', textTransform: 'none', fontSize: 16 }}
                    component={Link} to='/products/add'                                           // <- change here 
                >
                    Add Product
                </Button>
            </Box>
        );

    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.length >= 3 && page==='products') {
            props.onSearch(searchTerm); // Pass search term to products component
        }
        setSearchTerm(''); // Clear search bar after submit

    }


    const RenderLinks = () => {
        // console.log("renderLinks", page, isLoggedIn, isAdmin);

        switch (page) {
            case 'home':
                if (isLoggedIn === 'true') {

                    return (
                        <>
                            <RenderHome />
                            <RenderLogout />
                        </>
                    );
                } else {

                    return (
                        <>
                            <RenderHome />
                            <RenderAddProduct />
                            <RenderLogin />
                        </>
                    );
                }
            case 'signin':
                return (
                    <>
                        <RenderLoginLink />
                        <RenderSignUp />
                    </>
                );
            case 'products':
            case 'productDetails':
                if (isLoggedIn === 'true') {

                    if (isAdmin === 'true') {

                        return (
                            <>
                                <RenderHome />
                                <RenderAddProductAdmin />
                                <RenderLogout />
                            </>
                        );
                    } else {
                        return (
                            <>
                                <RenderHome />
                                <RenderLogout />
                            </>
                        );
                    }
                } else {
                    // console.log('products, Loged out');
                    return (
                        <>
                            <RenderHome />
                            <RenderAddProductAdmin />
                            <RenderLogin />
                        </>
                    );
                }
            default:
                return (
                    <>
                        <RenderHome />
                        <RenderAddProduct />
                        <RenderLogin />
                    </>
                );
        }
    };


    return (
        <AppBar position="static" sx={{ bgcolor: "#3f51b5" }}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center" width="100%">
                    <Grid container spacing={1} alignItems="center">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            component={Link} to="/"
                        >
                            <ShoppingCartIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            upGrad E-Shop
                        </Typography>
                    </Grid>
                    <Grid>
                        <form onSubmit={handleSearchSubmit }>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                />
                            </Search>
                        </form>

                    </Grid>
                    <Grid container spacing={3} alignItems="center">

                        <RenderLinks />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    );
}

export default NavigationBar;