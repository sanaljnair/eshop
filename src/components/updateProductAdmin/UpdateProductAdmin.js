import React, { useState } from 'react';

import {
    Button,
    CssBaseline,
    TextField,
    Typography,
    Container,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid2';
import { spacing } from '@mui/system';
import NavigationBar from '../../common/navigationBar/NavigationBar';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';


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

const UpdateProductAdmin = () => {
    const classes = useStyles();
    const product = useState(JSON.parse(sessionStorage.getItem('product')));

    console.log('product: ', product.id, product.name);


    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(parseInt(product.price));
    const [description, setDescription] = useState(product.description);
    const [manufacturer, setManufacturer] = useState(product.manufacturer);
    const [availableItems, setAvailableItems] = useState(parseInt(product.availableItems));
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');
    const [categoryError, setCategoryError] = React.useState(false);
    const [categoryErrorMessage, setCategoryErrorMessage] = React.useState('');
    const [priceError, setPriceError] = React.useState(false);
    const [priceErrorMessage, setPriceErrorMessage] = React.useState('');
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [descriptionErrorMessage, setDescriptionMessage] = React.useState('');
    const [manufacturerError, setManufacturerError] = React.useState(false);
    const [manufacturerErrorMessage, setManufacturerErrorMessage] = React.useState('');
    const [availableItemsError, setAvailableItemsError] = React.useState(false);
    const [availableItemsErrorMessage, setAvailableItemsMessage] = React.useState('');
    const [imageUrlError, setImageUrlError] = React.useState(false);
    const [imageUrlErrorMessage, setImageUrlMessage] = React.useState('');

    const [snackBarstate, setSnackBarState] = React.useState({
        snackOpen: false,
        message: ''
    });

    const { snackOpen, message } = snackBarstate;

    const navigate = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setName(value);
            setNameError(false);
            setNameErrorMessage('');
        } else if (name === 'category') {
            setCategory(value);
            setCategoryError(false);
            setCategoryErrorMessage('');
        } else if (name === 'price') {
            setPrice(parseInt(value))
            setPriceError(false);
            setPriceErrorMessage('');
        } else if (name === 'description') {
            setDescription(value)
            setDescriptionError(false);
            setDescriptionMessage('');
        } else if (name === 'manufacturer') {
            setManufacturer(value)
            setManufacturerError(false);
            setManufacturerErrorMessage('');
        } else if (name === 'availableItems') {
            setAvailableItems(parseInt(value))
            setAvailableItemsError(false);
            setAvailableItemsMessage('');
        } else if (name === 'imageUrl') {
            setImageUrl(value)
            setImageUrlError(false);
            setImageUrlMessage('');
        }

    };

    const priceRegex = /^\d+$/;

    const validateInputs = () => {

        let isValid = true;

        if (!name) {
            setNameError(true);
            setNameErrorMessage('Please enter product Name');
            isValid = false;
            return;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!category) {
            setCategoryError(true);
            setCategoryErrorMessage('please enter prodct category');
            isValid = false;
            return;
        } else {
            setCategoryError(false);
            setCategoryErrorMessage('');
        }

        if (!priceRegex.test(price)) {
            setPriceError(true);
            setPriceErrorMessage('Price should be a whole number');
            isValid = false;
            return;
        } else {
            setPriceError(false);
            setPriceErrorMessage('');
        }

        if (!description) {
            setDescriptionError(true);
            setDescriptionMessage('Please enter product description');
            isValid = false;
            return;
        } else {
            setDescriptionError(false);
            setDescriptionMessage('');
        }

        if (!manufacturer) {
            setManufacturerError(true);
            setManufacturerErrorMessage('Please enter manufacturer name');
            isValid = false;
            return;
        } else {
            setManufacturerError(false);
            setManufacturerErrorMessage('');
        }

        if (!priceRegex.test(availableItems)) {
            setAvailableItemsError(true);
            setAvailableItemsMessage('Item count should be a whole number');
            isValid = false;
            return;
        } else {
            setAvailableItemsError(false);
            setAvailableItemsMessage('');
        }

        if (!imageUrl) {
            setImageUrlError(true);
            setImageUrlMessage('Please enter image url');
            isValid = false;
            return;
        } else {
            setImageUrlError(false);
            setImageUrlMessage('');
        }

        return isValid;

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (nameError || categoryError || priceError || descriptionError || manufacturerError || availableItemsError || imageUrlError) {
            event.preventDefault();
            console.log(name, category, price, price, manufacturer, availableItems, imageUrl);
            return;


        }

        setIsLoading(true); // Show loading indicator

        // console.log('*----------- Making API Call for Product Update --------------*')
        // console.log('product id: ', product.id)

        const body = {
            name,
            category,
            price,
            description,
            manufacturer,
            availableItems,
            imageUrl
        };

        // Clear any previous error message
        setErrorMessage(null);
        setSuccessMessage(null);

        try {

            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': sessionStorage.getItem('access-token'),
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();

            console.log('Product update successful!');
            console.log('Response: ', data);

            setSuccessMessage(`Product ${product.name} modified succesfully`)

            setSnackBarState({
                snackOpen: true,
                message: `Product ${product.name} modified succesfully`
            });

            console.log('waiting for snack Bar');

            // setTimeout(() => {
            //     console.log('waiting for snack Bar');

            // }, 5000);


            // navigate to products page
            navigate('/products');

        } catch (error) {
            console.log(error.message || 'An error occurred during product udpate');
            setErrorMessage('An error occurred during product udpate');
        } finally {
            setIsLoading(false); // Hide loading indicator 

        }
    };


    const handleSnackBarClose = () => {
        setSnackBarState({ ...snackBarstate, snackOpen: false });
    }

    return (
        <>
            {/* NavigationBar called with required props */}
            <NavigationBar page="products" isLoggedIn={sessionStorage.getItem('isLoggedIn')} isAdmin={sessionStorage.getItem('isAdmin')} />

            <Container component="main" maxWidth="xs" sx={{ marginTop: '30px', minHeight: '85vh' }}  >
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Modify Product
                    </Typography>
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
                            id="category"
                            label="category"
                            name="category"
                            autoComplete="category"
                            value={category}
                            onChange={handleChange}
                            error={categoryError}
                            helperText={categoryErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="price"
                            name="price"
                            autoComplete="price"
                            value={price}
                            onChange={handleChange}
                            error={priceError}
                            helperText={priceErrorMessage}
                        // color={emailError ? 'error' : 'primary'}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="description"
                            id="password"
                            autoComplete="description"
                            value={description}
                            onChange={handleChange}
                            error={descriptionError}
                            helperText={descriptionErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="manufacturer"
                            label="manufacturer"
                            type="manufacturer"
                            id="manufacturer"
                            value={manufacturer}
                            onChange={handleChange}
                            error={manufacturerError}
                            helperText={manufacturerErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="availableItems"
                            label="availableItems"
                            name="availableItems"
                            autoComplete="availableItems"
                            value={availableItems}
                            onChange={handleChange}
                            error={availableItemsError}
                            helperText={availableItemsErrorMessage}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="imageUrl"
                            label="imageUrl"
                            name="imageUrl"
                            autoComplete="imageUrl"
                            value={imageUrl}
                            onChange={handleChange}
                            error={imageUrlError}
                            helperText={imageUrlErrorMessage}
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
                            {isLoading ? 'loading...' : 'MODIFY PRODUCT'}
                        </Button>
                        <Grid container spacing={3} justifyContent="right">
                            <Grid xs={12} >
                                <Button
                                    key="cancel update"
                                    color="secondary"
                                    sx={{ textTransform: 'none', fontSize: 14 }}
                                    component={Link} to="/products"
                                >
                                    Cancel
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
        </>

    );
};

export default UpdateProductAdmin;