import React, { useState } from 'react';

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Typography,
    Container,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Grid from '@mui/material/Grid2';
import { spacing } from '@mui/system';
import NavigationBar from '../../common/navigationBar/NavigationBar';
import { Link, useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: 'red',
    },
    form: {
        width: '100%',  
        marginTop: spacing(1),
    },
    submit: {
        margin: spacing(3, 0, 2),
    },
}));

const Signin = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    sessionStorage.setItem('isLoggedIn', false);
    sessionStorage.setItem('access-token', null);
    // sessionStorage.setItem('data', {});
    sessionStorage.setItem('isAdmin', false);

    const navigate = useNavigate();

    // Email validation regular expression
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;  

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
            setErrorMessage(''); // Clear error on input change
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        // Show loading indicator
        setIsLoading(true); 
        const username = email;

        // console.log('Making API Call')
        // console.log('username: ', username);
        // console.log('password: ', password);

        const body = {
            username,
            password,
        };

        // Clear any previous error message
        setLoginErrorMessage(null);
        setLoginSuccessMessage(null);

        try {

            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signin', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();

            //log all values received in the headers
            // response.headers.forEach((value, key) => {
            //     console.log(`${key} ==> ${value}`);
            //   });
            
            console.log('x-auth-token: ', response.headers.get('x-auth-token'));

            // const token = response.headers.get('x-auth-token');
            // workaround to use constant token as backend needs configuration to respond with token.
            const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyOTY3ODM2MSwiZXhwIjoxNzI5Njg2NzYxfQ.MuoN_YHEsTWdtHwQy1iQapV9XHUQp-Ax-M5VYKtad74oQBS1i8aQ8EQN18x6U5XFBbdNtn7A4ekzlR5SHjerHg';

            console.log('Login successful!');
            setLoginSuccessMessage('Login successful!');

            console.log('Response: ', data);
            console.log('token: ', token);

            setIsLoggedIn(true);
            if (data.roles.includes('ADMIN')) {
                setIsAdmin(true);
                sessionStorage.setItem('isAdmin', true);
            }
            //   Store token (consider using localStorage or a stte management library)
            // console.log('is Admin', isAdmin);
            // console.log('is Logged In ', isLoggedIn);

            sessionStorage.setItem('isLoggedIn', true);
            sessionStorage.setItem('access-token', token);
            sessionStorage.setItem('data', data);

            // Login successful, navigate to products page
            navigate('/products');

        } catch (error) {
            console.log(error.message || 'An error occurred during login');
            setLoginErrorMessage('An error occurred during login');
        } finally {
            setIsLoading(false); // Hide loading indicator          

        }
    };

    return (
        <>
            {/* NavigationBar called with required props */}
            <NavigationBar page="signin" isLoggedIn={isLoggedIn} isAdmin={isAdmin} />

            <Container component="main" maxWidth="xs" sx={{ marginTop: '30px', minHeight: '85vh' }} >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} >
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleChange}
                            error={!!errorMessage}
                            helperText={errorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // color="primary"
                            sx={{ bgcolor: "#3f51b5" }}
                            className={classes.submit}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                        <Grid container spacing={3}>
                            <Grid xs={12}>
                                <Button
                                    key="Login"
                                    color="secondary"
                                    sx={{ textTransform: 'none', fontSize: 14 }}
                                    component={Link} to="/signUp"
                                >
                                    Don't have and account Signup
                                </Button>
                            </Grid>
                        </Grid>
                        <div>

                            {loginErrorMessage ? (<Typography variant="h6" color='error' align='center'>{loginErrorMessage}</Typography>) : <></>}
                            {loginSuccessMessage ? (<Typography variant="h6" color='primary' align='center'>{loginSuccessMessage}</Typography>) : <></>}

                        </div>
                    </form>
                </div>
            </Container>
        </>

    );
};

export default Signin;