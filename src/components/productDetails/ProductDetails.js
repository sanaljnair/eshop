import React, { useState, useEffect } from 'react';

import {
    CssBaseline,
    Typography,
    Container,
    Card,
    CardMedia,
    TextField,
    Button,
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import NavigationBar from '../../common/navigationBar/NavigationBar';
import Box from '@mui/material/Box';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// 1) User will navigate form the products page to the product details page when the user clicks on the buy button on products page. 
// 2) Products page will pass the ProductID for the selected product as a prop to the product details page. 
// 3) Produt details page will refer to the session storage and get the isLoggedin, isAdmin and access-token
// 4) use commmon NavigationBar componenet and pass page="products"  isLoggedin={isLoggedin} and isAdmin={isAdmin} props. 
// 5) The Page will start with ToggleButtonGroup buttons. The application will fetch the list of categories from the API server and show the list of categories on the top. if the user clicks on all or any of the specific category he will be taken back to the products listing page and list the selected details. 
// 6) Using the ProductId passed from products listing page, and the access-token, fetch the productDetails using the provided API. 
// 7) Display the product details on the page. 
// 	- Product ismage is displayed using the productDetails.imageUrl on left laft of the screen
// 	- right half of the screen will neetly arage the following attributes. 
// 	- Product Name in H2 followed by Available Quanity: {productDetails.availableItems} inside a blue box with rounded edges 45%
// 	- show Category in the next line with caption Category and value {productDetails.category} in h5
// 	- after a break show {productDetails.description} in h6
// 	- after a break show material ui rupee icon followed by {productDetails.price} in H3 and red color text
// 	- add a input box with outlined edges and caption Enter Qunatity. use default value of 1 in the input field
// 	- a Button for PLACE ORDER in contained button . this will navigate to the order page.

// const productID = "66f7f44cea259f27abba20ea"

// const productDetails = {
//     "id": "66fe99ba69ee8833bb390ca21",
//     "name": "iPhone 12",
//     "category": "Electronics",
//     "price": 10000,
//     "description": "Its not a pant, its your partner",
//     "manufacturer": "Louis Phillipe",
//     "availableItems": 148,
//     "imageUrl": "https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg"
// };

// const categories1 = [
//     "Cooking",
//     "Clothing",
//     "Clothes",
//     "Electronics",
//     "Watches",
//     "Pants",
//     "Shoes",
//     "Sports",
//     "Perfumes"
// ]


const ProductDetails = () => {
    //     const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));
    //     const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin'));
    //     const [accessToken, setAccessToken] = useState(sessionStorage.getItem('access-token'));
    const [categories, setCategories] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [order, setOrder] = React.useState({});
    const [quantity, setQuantity] = useState(1);

    const [quantityError, setQuantityError] = React.useState(false);
    const [quantityErrorMessage, setQuantityErrorMessage] = React.useState('');

    const { productID } = useParams();

    // console.log('product details page: isAdmin: ', isAdmin);
    // console.log('products details page: isLoggedin: ', isLoggedIn);
    // console.log('products details page: accessToken: ', accessToken);
    console.log('products details page: productID: ', productID);



    const navigate = useNavigate();


    async function getCategories() {
        // console.log('*-------- inside getCategories  -----------*')

        try {

            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products/categories', {
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
            setCategories(data);

            // console.log(response.headers.get('x-auth-token'));
            console.log('get Categories Succesfull');
            console.log('get category response data: ', data);
            console.log('categories: ', categories);

        }
        catch (error) {
            console.log(error.message || 'An error occurred during login');
        }

    }

    useEffect(() => { getCategories(); }, []);

    //------------------------------

    async function fetchProductData() {
        // console.log('*-------- inside fetchProductData  -----------*')

        try {

            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${productID}`, {
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
            setProductDetails(data);

            // console.log(response.headers.get('x-auth-token'));
            console.log('get Product Details Succesfull');
            console.log('get Products response data: ', data);
            console.log('productDetails: ', productDetails);

        }
        catch (error) {
            console.log(error.message || 'An error occurred during login');
        }

    }

    useEffect(() => {
        if (!productID) return;

        fetchProductData();
    }, []);


    const handleCategoryChange = (event, newCategory) => {
        console.log('*----------- inside handleCategoryChange -------*')
        // console.log('newCategory: ', newCategory);

        setSelectedCategory(newCategory);
        // Navigate to products listing page with selected category

    };

    const handlePlaceOrder = () => {
        // Navigate to order page with product details and quantity
        console.log('*----------- inside handleCategoryChange -------*')

        if (!quantity) {
            setQuantityError(true);
            setQuantityErrorMessage('Please enter valid quantity')

        } else {
            setQuantityError(false);
            setQuantityErrorMessage('');

            const data = {
                "productDetails": productDetails,
                "order": {
                    "quantity": quantity,
                    "product" : productDetails.id,
                    "address": null
                }
            }
            

            navigate("/order", { state: data });


        }



    }

    const handleQualtityChange = (event) => {
        const { name, value } = event.target;

        setQuantity(value);
        setQuantityError(false);
        setQuantityErrorMessage('');

    }


    const RenderCategories = () => {

        return (<ToggleButtonGroup sx={{ marginTop: '30px', marginLeft: '10%' }} value={selectedCategory} exclusive onChange={handleCategoryChange}>
            <ToggleButton value="all">All</ToggleButton>

            {categories.map((category) => (
                <ToggleButton value={category} key={category}>{category}</ToggleButton>
            ))}
        </ToggleButtonGroup>
        );
    }

    const RenderProductDetails = () => {

        return (<Grid container spacing={2} justifyContent='space-evenly' alignItems="center">
            <Grid    >
                <Card >
                    <CardMedia

                        component="img"
                        alt={productDetails.name}
                        image={productDetails.imageUrl}
                        height="250"
                        width="250"
                    />
                </Card>
            </Grid>
            <Grid sx={{ marginTop: '50px', padding: '20px' }}>

                <div spacing={2}  >
                    <div style={{ display: 'flex' }}>
                        <Typography variant='h4' sx={{ maxWidth: 400 }}><b>{productDetails.name}</b></Typography>

                        <Box
                            sx={{
                                bgcolor: '#3f51b5',
                                boxShadow: 0,
                                borderRadius: 10,
                                p: 1,
                                minWidth: 200,
                                textAlign: 'center',
                                color: 'white',
                                marginLeft: 5,
                                maxHeight: 42
                            }}
                        >
                            Available Quanity : {productDetails.availableItems}
                        </Box>

                    </div>
                    <div >
                        <br />
                        <Typography variant='h6'>Category : <b>{productDetails.category}</b></Typography>
                        <br />
                        <Typography variant='body1' fontSize='large' sx={{ maxWidth: 500 }}><i>{productDetails.description}</i></Typography>
                        <br />
                        <div style={{ display: 'flex', alignItems: 'left' }}>

                            <CurrencyRupeeIcon fontSize='large' sx={{ color: 'red' }} />
                            <Typography gutterBottom variant="h4" color='red' sx={{ marginLeft: '4px', marginTop: '8px' }}>
                                {productDetails.price}
                            </Typography>
                        </div>
                        <br />
                        <TextField
                            label="Enter Quantity"
                            type="number"
                            value={quantity}
                            required
                            fullWidth
                            id="quantity"
                            name="quantity"
                            margin="normal"
                            onChange={handleQualtityChange}
                            error={quantityError}
                            helperText={quantityErrorMessage}
                        />
                        <Button
                            variant="contained"
                            sx={{ bgcolor: '#3f51b5' }}
                            onClick={handlePlaceOrder}>
                            PLACE ORDER
                        </Button>
                    </div>
                </div>
            </Grid>
        </Grid>);
    }


    return (
        <div  >
            <NavigationBar page="productDetails" isLoggedIn={sessionStorage.getItem('isLoggedIn')} isAdmin={sessionStorage.getItem('isAdmin')} />

            <Container sx={{ marginTop: '30px', minHeight: '85vh' }} >
                <CssBaseline />


                {categories ? <RenderCategories /> : <></>}

                <br />
                <br />

                {productDetails ? <RenderProductDetails /> : <></>}

            </Container >
        </div>
    );
};

export default ProductDetails;