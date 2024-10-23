import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Box';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid2';
import Snackbar from '@mui/material/Snackbar';
import { spacing } from '@mui/system';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, TextField, } from '@mui/material';
import { useLocation } from "react-router-dom";
import NavigationBar from '../../common/navigationBar/NavigationBar';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const steps = ['Items', 'Select Address', 'Confirm Order'];

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        // width: '100%', // Make form fill available width
        marginTop: spacing(1),
    },
    submit: {
        margin: spacing(3, 0, 2),
    },
}));



export default function PlaceOrder() {
    const classes = useStyles();

    // access data passed to the Placeorder page
    const location = useLocation();
    const input = location.state;

    // console.log('inside order page: ');
    // console.log('order: ', input.order);
    // console.log('productDetails: ', input.productDetails);

    const productDetails = input.productDetails;

    // State variables for Stepper functions
    const [activeStep, setActiveStep] = React.useState(1);
    const [completed, setCompleted] = React.useState({ 0: true });
    const [addressList, setAddressList] = useState([]);
    const [address, setAddress] = React.useState('');
    const [order, setOrder] = React.useState(input.order);

    //State variables for Add Address Form elements and validations
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [city, setCity] = useState('');
    const [landmark, setLandmark] = useState('');
    const [street, setStreet] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [contactNumberError, setContactNumberError] = React.useState(false);
    const [contactNumberErrorMessage, setContactNumberErrorMessage] = React.useState('');
    const [cityError, setCityError] = React.useState(false);
    const [cityErrorMessage, setCityErrorMessage] = React.useState('');
    const [landmarkError, setLandmarkError] = React.useState(false);
    const [landmarkErrorMessage, setLandmarkErrorMessage] = React.useState('');
    const [streetError, setStreetError] = React.useState(false);
    const [streetErrorMessage, setStreetErrorMessage] = React.useState('');
    const [stateError, setStateError] = React.useState(false);
    const [stateErrorMessage, setStateErrorMessage] = React.useState('');
    const [zipcodeError, setZipcodeError] = React.useState(false);
    const [zipcodeErrorMessage, setZipcodeErrorMessage] = React.useState('');

    // State variables for snacBar functions
    const [snackBarstate, setSnackBarState] = React.useState({
        snackOpen: false,
        message: '',
        snackColor: 'lightgreen'
    });

    const { snackOpen, message } = snackBarstate;

    // Snacbar functions
    const handleSnackBarClose = () => {
        setSnackBarState({ ...snackBarstate, snackOpen: false });
    }

    const navigate = useNavigate();


    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    async function getAddress() {

        //for every rerender of the page, 
        //1) check if snackbar was open in local storage
        // const NewSnackBarState = sessionStorage.getItem("snackBarState");

        // console.log("NewSnackBarState : ", NewSnackBarState)

        // if (NewSnackBarState && NewSnackBarState.snackOpen === "true") {
        //     console.log('found snackbar open')
        //     setSnackBarState(NewSnackBarState);

        //     sessionStorage.removeItem("snackBarState");
        // }


        //2) get the List of address 

        try {

            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/addresses', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': sessionStorage.getItem('access-token'),
                }
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            setAddressList(data);

            // console.log(response.headers.get('x-auth-token'));
            console.log('get Categories Succesfull');
            console.log('get category response data: ', data);

        }
        catch (error) {
            console.log(error.message || 'An error occurred during get address list');
        }

    }


    useEffect(() => { getAddress(); }, []);

    // *--------------------------------------- Manage Form elements change ----------------------------******************
    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log('event.target:', event.target);
        // console.log('target name:', name);
        // console.log('target name:', event.target.name);

        if (name === 'name') {
            // console.log('name--');
            setName(value);
            setNameError(false);
            setNameErrorMessage('');
        } else if (name === 'contactNumber') {
            // console.log('contactNbr--');
            setContactNumber(value);
            setContactNumberError(false);
            setContactNumberErrorMessage('');
        } else if (name === 'city') {
            // console.log('city--');
            setCity(value)
            setCityError(false);
            setCityErrorMessage('');
        } else if (name === 'landmark') {
            setLandmark(value)
            setLandmarkError(false);
            setLandmarkErrorMessage('');
        } else if (name === 'street') {
            setStreet(value)
            setStreetError(false);
            setStreetErrorMessage('');
        } else if (name === 'state') {
            setState(value)
            setStateError(false);
            setStateErrorMessage('');
        } else if (name === 'zipcode') {
            setZipcode(value)
            setZipcodeError(false);
            setZipcodeErrorMessage('');
        }

    };


    // *--------------------------------------- Validate input field ----------------------------******************
    const validateInputs = () => {

        let isValid = true;

        if (!name) {
            setNameError(true);
            setNameErrorMessage('Please enter Name');
            isValid = false;
            return;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!contactNumber) {
            setContactNumberError(true);
            setContactNumberErrorMessage('please enter contact number');
            isValid = false;
            return;
        } else {
            setContactNumberError(false);
            setContactNumberErrorMessage('');
        }

        if (!city) {
            setCityError(true);
            setCityErrorMessage('Please enter city');
            isValid = false;
            return;
        } else {
            setCityError(false);
            setCityErrorMessage('');
        }

        if (!landmark) {
            setLandmarkError(true);
            setLandmarkErrorMessage('Please enter landmark');
            isValid = false;
            return;
        } else {
            setLandmarkError(false);
            setLandmarkErrorMessage('');
        }

        if (!street) {
            setStreetError(true);
            setStreetErrorMessage('Please enter street name');
            isValid = false;
            return;
        } else {
            setStreetError(false);
            setStreetErrorMessage('');
        }

        if (!state) {
            setStateError(true);
            setStateErrorMessage('Please enter state');
            isValid = false;
            return;
        } else {
            setStateError(false);
            setStateErrorMessage('');
        }

        if (!zipcode) {
            setZipcodeError(true);
            setZipcodeErrorMessage('Please enter zipcode');
            isValid = false;
            return;
        } else {
            setZipcodeError(false);
            setZipcodeErrorMessage('');
        }

        return isValid;

    }

    // *--------------------------------------- API Call for Adding New Address ----------------------------******************
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (nameError || contactNumberError || cityError || landmarkError || streetError || stateError || zipcodeError) {
            event.preventDefault();
            console.log(name, contactNumber, city, landmark, street, state, zipcode);
            return;


        }

        setIsLoading(true); // Show loading indicator

        // console.log('*----------- Making API Call for Adding Address --------------*')

        const body = {
            name,
            contactNumber,
            city,
            landmark,
            street,
            state,
            zipcode
        };

        // Clear any previous error message
        setErrorMessage(null);
        setSuccessMessage(null);

        try {

            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/addresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': sessionStorage.getItem('access-token'),
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            // const data = await response.json();

            console.log('Address Added successfuly!');
            // console.log('Response: ', data);

            setSuccessMessage(`Address Added succesfully`)

            setSnackBarState({
                snackOpen: true,
                message: `Address Added successfuly!`,
                snackColor: 'lightgreen'
            });

        } catch (error) {
            console.log(error.message || 'An error occurred during Add Address');
            setErrorMessage('An error occurred during Add Address');
        } finally {
            setIsLoading(false); // Hide loading indicator 

        }
    };

    // *--------------------------------------- API Call for Place Order ----------------------------******************

    const handlePlaceOrder = async (event) => {
        console.log('*----------- Making API Call for Place Order --------------*')
        console.log('Final Order', order);
        console.log('Final Order', JSON.stringify(order));

        event.preventDefault();


        try {

            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': sessionStorage.getItem('access-token'),
                },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();

            console.log('Order placed successfuly');
            console.log('Response: ', data);

            // sessionStorage.setItem("snackBarState", {
            //     snackOpen: true,
            //     message: `Address Added successfuly!`,
            //     snackColor: 'lightgreen'
            // });

            setSnackBarState({
                snackOpen: true,
                message: `Order placed successfuly!`,
                snackColor: 'lightgreen'
            });

            // Navigate to "/products"
            navigate("/products");


        } catch (error) {
            console.log(error.message || 'An error occurred during Add Address');
            setErrorMessage('An error occurred during Add Address');
        }
    }


    // *--------------------------------------- Page Navigation Functions ----------------------------******************

    // Navigate back to Product Details Page. 

    const handleBackToDetails = () => {
        navigate(`/productDetails/${order.product}`);
    }

    // *--------------------------------------- Sptepper Functions -------------------------------*****************

    const handleNext = () => {

        console.log('click next order', order);

        if (activeStep === 1 && !order.address) {
            console.log("Please select an Address");

            setSnackBarState({
                snackOpen: true,
                message: "Please select an Address",
                snackColor: "red"
            });

        } else {

            handleComplete();

            const newActiveStep =
                isLastStep() && !allStepsCompleted()
                    ? // It's the last step, but not all steps have been completed,
                    // find the first step that has been completed
                    steps.findIndex((step, i) => !(i in completed))
                    : activeStep + 1;
            setActiveStep(newActiveStep);
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {

        setCompleted({
            ...completed,
            [activeStep]: true,
        });
        // handleNext();                  
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    //     setCompleted({});
    // };

    const handleSelectChange = (event) => {

        const newAddress = event.target.value;
        setAddress(newAddress);
        console.log('newAddress: ', newAddress);

        let newOrder = order;
        newOrder.address = newAddress.id;
        console.log('newOrder: ', newOrder);

        setOrder(order);
        console.log('Order Address updated ', order);

    };

    const RenderPlaceOrder = () => {

        return (
            <div>
                <Box sx={{ pt: 1 }} />

                <Grid container spacing={2} justifyContent='space-between' alignItems="top">
                    <Grid size={8}>
                        <Box
                            sx={{
                                bgcolor: 'white',
                                p: 3,
                                pt: 5,
                                minWidth: 200,
                                textAlign: 'left',
                                height: 300
                            }}>

                            <Typography variant='h5' sx={{ maxWidth: 800 }}><b>{productDetails.name}</b></Typography>
                            <br />
                            <Typography variant='h6'>Quanity : <b>{order.quantity}</b></Typography>
                            <br />
                            <Typography variant='h6'>Category : <b>{productDetails.category}</b></Typography>
                            <br />
                            <Typography variant='body1' sx={{ maxWidth: 500 }}><i>{productDetails.description}</i></Typography>
                            <br />
                            <div style={{ display: 'flex', alignItems: 'left' }}>

                                <Typography gutterBottom variant="h5" color='red' sx={{ marginLeft: '4px', marginTop: '8px' }}>
                                    Total Price :
                                </Typography>

                                <CurrencyRupeeIcon fontSize='medium' sx={{ m: 1.5, color: 'red' }} />
                                <Typography gutterBottom variant="h5" color='red' sx={{ marginLeft: '4px', marginTop: '8px' }}>
                                    {productDetails.price * order.quantity}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid size={4}>
                        <Box
                            sx={{
                                bgcolor: 'white',
                                p: 3,
                                pt: 5,
                                minWidth: 200,
                                textAlign: 'left',
                                height: 300
                            }}>
                            <Typography variant='h5' sx={{ maxWidth: 800 }}><b>Address Details</b></Typography>
                            <br />
                            <Typography variant='body1'>{address.name}</Typography>
                            <Typography variant='body1'>Contact Number: {address.contactNumber}</Typography>
                            <Typography variant='body1'>{address.street}, {address.city}</Typography>
                            <Typography variant='body1'>{address.state}</Typography>
                            <Typography variant='body1'>{address.zipcode}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container paddingTop={2} spacing={3} justifyContent="space-evenly">
                    <Grid xs={12} >
                        <Button
                            color="primary"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1, fontSize: 14 }}
                        >
                            BACK
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handlePlaceOrder}
                            sx={{ mr: 1, bgcolor: "#3f51b5", fontSize: 14 }}
                        >
                            PLACE ORDER
                        </Button>

                    </Grid>
                </Grid>

            </div>
        );
    }

    const RenderSelectAddress = () => {
        return (
            <div className={classes.paper}>
                <CssBaseline />
                <Box sx={{ pt: 4, minWidth: '60%' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Address</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={address}
                            autoFocus
                            label="Address"
                            onChange={handleSelectChange}
                        >
                            {addressList.map((address) => (
                                <MenuItem value={address} key={address.id}>{address.name} --> {address.street}, {address.city} </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Typography sx={{ mt: 2 }}>
                    -OR-
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    Add Address
                </Typography>
                <Box sx={{ maxWidth: '40%' }}>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={handleChange}
                            error={nameError}
                            helperText={nameErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="contactNumber"
                            label="Contact Number"
                            name="contactNumber"
                            autoComplete="contactNumber"
                            value={contactNumber}
                            onChange={handleChange}
                            error={contactNumberError}
                            helperText={contactNumberErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="city"
                            name="city"
                            autoComplete="city"
                            value={city}
                            onChange={handleChange}
                            error={cityError}
                            helperText={cityErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="landmark"
                            label="landmark"
                            id="landmark"
                            autoComplete="landmark"
                            value={landmark}
                            onChange={handleChange}
                            error={landmarkError}
                            helperText={landmarkErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="street"
                            label="street"
                            id="street"
                            value={street}
                            onChange={handleChange}
                            error={streetError}
                            helperText={streetErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="state"
                            label="state"
                            name="state"
                            autoComplete="state"
                            value={state}
                            onChange={handleChange}
                            error={stateError}
                            helperText={stateErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="zipcode"
                            label="zipcode"
                            name="zipcode"
                            autoComplete="zipcode"
                            value={zipcode}
                            onChange={handleChange}
                            error={zipcodeError}
                            helperText={zipcodeErrorMessage}
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
                            {isLoading ? 'loading...' : 'SAVE ADDRESS'}
                        </Button>
                        <Grid container paddingTop={2} spacing={3} justifyContent="space-evenly">
                            <Grid xs={12} >
                                <Button
                                    color="primary"
                                    disabled={activeStep === 0}
                                    onClick={handleBackToDetails}
                                    sx={{ mr: 1, fontSize: 14 }}
                                >
                                    BACK
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mr: 1, bgcolor: "#3f51b5", fontSize: 14 }}
                                >
                                    NEXT
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid>
                            {successMessage ? (<Typography variant="h6" color='primary' align='center'>{successMessage}</Typography>) : (<></>)}
                            {errorMessage ? (<Typography variant="h6" color='error' align='center'>{errorMessage}</Typography>) : (<></>)}
                        </Grid>
                    </form>
                </Box>
            </div>

        );
    }

    return (
        <Box sx={{ bgcolor: '#F5F5F5' }}>
            <NavigationBar page="products" isLoggedIn={sessionStorage.getItem('isLoggedIn')} isAdmin={sessionStorage.getItem('isAdmin')} />

            <Container component="main" maxWidth="xs" sx={{ marginLeft: '10%', marginRight: '10%', marginTop: '30px', minHeight: '85vh' }}  >

                <Box sx={{ width: '100%' }}>
                    <Stepper nonLinear activeStep={activeStep} sx={{ padding: 1, borderRadius: 1, bgcolor: 'white' }}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        <React.Fragment>
                            {activeStep === 1 ?
                                <RenderSelectAddress />
                                :
                                (
                                    activeStep === 2 ?
                                        <RenderPlaceOrder />
                                        :
                                        <></>
                                )
                            }
                        </React.Fragment>
                    </div>
                </Box>
            </Container >
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackOpen}
                onClose={handleSnackBarClose}
                message={message}
                key={message}
                autoHideDuration={6000}
                ContentProps={{
                    sx: {
                        color: "black",
                        bgcolor: snackBarstate.snackColor,
                        fontWeight: "bold",
                    }
                }}
            />
        </Box >
    );
}