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
// import axios from 'axios'; // Import axios for API calls
import Grid from '@mui/material/Grid2';
import { spacing } from '@mui/system';
import NavigationBar from '../../common/navigationBar/NavigationBar';
import { Link } from 'react-router-dom';



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
        width: '100%', // Make form fill available width
        marginTop: spacing(1),
    },
    submit: {
        margin: spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ContactNbr, setContactNbr] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [firstNameError, setFirstNameError] = React.useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState(false);
    const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
    const [contactNbrError, setContactNbrError] = React.useState(false);
    const [contactNbrErrorMessage, setContactNbrErrorMessage] = React.useState('');

    // const isLoggedIn = false;
    // const isAdmin = false;



    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // Improved email validation

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
            setEmailError(false);
            setEmailErrorMessage('');
        } else if (name === 'password') {
            setPassword(value);
            setPasswordError(false);
            setPasswordErrorMessage('');
        } else if (name === 'firstName') {
            setFirstName(value)
            setFirstNameError(false);
            setFirstNameErrorMessage('');
        } else if (name === 'lastName') {
            setLastName(value)
            setLastNameError(false);
            setLastNameErrorMessage('');
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value)
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMessage('');
        } else if (name === 'ContactNbr') {
            setContactNbr(value)
            setContactNbrError(false);
            setContactNbrErrorMessage('');
        }

    };

    const validateInputs = () => {

        let isValid = true;

        if (!firstName) {
            setFirstNameError(true);
            setFirstNameErrorMessage('Please enter First Name');
            isValid = false;
            // console.log("invalid First Name")
            return;
        } else {
            setFirstNameError(false);
            setFirstNameErrorMessage('');
        }

        if (!lastName) {
            setLastNameError(true);
            setLastNameErrorMessage('Please enter Last Name');
            isValid = false;
            return;
        } else {
            setLastNameError(false);
            setLastNameErrorMessage('');
        }

        if (!emailRegex.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address');
            isValid = false;
            // console.log("invalid Email")
            return;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password should be atleast 6 charecters');
            isValid = false;
            return;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMessage('Passwords do not Match');
            isValid = false;
            console.log('Passwrods do not match')
            return;
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMessage('');
        }

        if (!ContactNbr) {
            setContactNbrError(true);
            setContactNbrErrorMessage('Please enter Contact Number');
            isValid = false;
            return;
        } else {
            setContactNbrError(false);
            setContactNbrErrorMessage('');
        }

        return isValid;

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (firstNameError || lastNameError || emailError || passwordError || confirmPasswordError || contactNbrError) {
            event.preventDefault();
            console.log(firstName, lastName, email, password, confirmPassword, ContactNbr);
            return;


        }

        setIsLoading(true); // Show loading indicator

        // console.log('Making API Call for user Signup')
        // console.log('firstName: ', firstName);
        // console.log('lastName: ', lastName);
        // console.log('email: ', email);
        // console.log('password: ', password);
        // console.log('confirmPassword: ', confirmPassword);
        // console.log('ContactNbr: ', ContactNbr);

        const contactNumber = ContactNbr;

        const body = {
            firstName,
            lastName,
            email,
            password,
            contactNumber
        };

        // Clear any previous error message
        setErrorMessage(null);
        setSuccessMessage(null);

        try {

            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();

            console.log('Sugn Up  successful!');
            console.log('Response: ', data);

            setSuccessMessage('User is Succesfully Signed Up')

        } catch (error) {
            console.log(error.message || 'An error occurred during Sign up');
            setErrorMessage('An error occurred during Sign up');
        } finally {
            setIsLoading(false); // Hide loading indicator 

        }
    };

    return (
        <>
            {/* NavigationBar called with required props */}
            <NavigationBar page="signin" isLoggedIn={sessionStorage.getItem('isLoggedIn')} isAdmin={sessionStorage.getItem('isAdmin')} />

            <Container component="main" maxWidth="xs" sx={{ marginTop: '30px', minHeight: '85vh' }}  >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                            value={firstName}
                            onChange={handleChange}
                            error={firstNameError}
                            helperText={firstNameErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            value={lastName}
                            onChange={handleChange}
                            error={lastNameError}
                            helperText={lastNameErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChange}
                            error={emailError}
                            helperText={emailErrorMessage}
                        // color={emailError ? 'error' : 'primary'}
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
                            error={passwordError}
                            helperText={passwordErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="confirmPassword"
                            id="confirmPassword"
                            // autoComplete="current-password"
                            value={confirmPassword}
                            onChange={handleChange}
                            error={confirmPasswordError}
                            helperText={confirmPasswordErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="ContactNbr"
                            label="Contact Number"
                            name="ContactNbr"
                            autoComplete="ContactNbr"
                            value={ContactNbr}
                            onChange={handleChange}
                            error={contactNbrError}
                            helperText={contactNbrErrorMessage}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // color="primary"
                            sx={{ bgcolor: "#3f51b5" }}
                            className={classes.submit}
                            disabled={isLoading}
                            onClick={validateInputs}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                        <Grid container spacing={3} justifyContent="right">
                            <Grid xs={12} >
                                <Button
                                    key="Login"
                                    color="secondary"
                                    sx={{ textTransform: 'none', fontSize: 14 }}
                                    component={Link} to="/signin"
                                >
                                    Already have an account Sign in.
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid>
                            {successMessage ? (<Typography variant="h6" color='primary' align='center'>{successMessage}</Typography>) : (<></>)}
                            {errorMessage ? (<Typography variant="h6" color='error' align='center'>{errorMessage}</Typography>) : (<></>)}
                        </Grid>
                    </form>
                </div>
            </Container>
        </>

    );
};

export default SignUp;