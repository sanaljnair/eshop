import React, { useState, useEffect } from 'react';

import {
    CssBaseline,
    Typography,
    Container,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import NavigationBar from '../../common/navigationBar/NavigationBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';

const Products = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin'));
    // const [accessToken, setAccessToken] = useState(sessionStorage.getItem('access-token'));
    const [productList, setProductList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackBarstate, setSnackBarState] = React.useState({
        snackOpen: false,
        message: ''
    });

    const { snackOpen, message } = snackBarstate;

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');

    const navigate = useNavigate();

    async function getCategories() {

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

            sessionStorage.setItem("categories",data)

            // console.log(response.headers.get('x-auth-token'));
            console.log('get Categories Succesfull: ');
            // console.log('get category response data: ', data, 'typeof: ' , typeof(data));

        }
        catch (error) {
            console.log(error.message || 'An error occurred during get category list');
        } 
    }

    useEffect(() => { getCategories(); }, []);

    async function getProduts() {
        // console.log('*-------- inside getProducts -----------*')

        try {

            const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products/', {
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
            setProductList(data);
            // setProductList(productsData);

            // console.log(response.headers.get('x-auth-token'));
            console.log('get Products Succesfull');
            // console.log('get Products response data: ', data);

        }
        catch (error) {
            console.log(error.message || 'An error occurred during get product list');
        } finally {
            console.log('productList: ', productList);

        }

    }



    useEffect(() => { getProduts(); }, []);

    async function deleteProduct(product) {
        // console.log('*-------- inside deleteProduct -----------*')
        // console.log('deleting: ', product.id, product.name)

        try {

            const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/${product.id}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': sessionStorage.getItem('access-token'),
                }
            });

            // console.log('API request submited');

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            // console.log(response.headers.get('x-auth-token'));
            console.log('Delete Product Succesfull');

            setSnackBarState({
                snackOpen: true,
                message: `Product ${product.name} deleted successfully`
            });

        }
        catch (error) {
            console.log(error.message || 'An error occurred during delete product');
        } finally {
            console.log('productList: ', productList);

        }


    }

    const handleCategoryChange = (event, newCategory) => {
        // console.log('newCategory: ', newCategory);

        setSelectedCategory(newCategory);
        filterProducts(newCategory);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
        sortProducts(event.target.value);
    };

    const filterProducts = (category) => {
        if (category === 'all') {
            getProduts()
            setProductList(productList);
        } else {
            // getProduts()
            setProductList(productList.filter((product) => product.category === category));

        }
    };

    const handleSearch = (searchTerm) => {
        // Implement logic to filter products based on searchTerm
        const filteredProducts = productList.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProductList(filteredProducts);
    };

    const sortProducts = (sortBy) => {
        // const sortedProducts = [...products];
        const sortedProducts = [...productList];
        if (sortBy === 'default') {
            getProduts();
        } else if (sortBy === 'price-high') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'price-low') {
            sortedProducts.sort((a, b) => a.price - b.price);
        }
        setProductList(sortedProducts);
    };

    // navigate to productDetails page along with product id
    const navigateToProductDetails = (productID) => {

        console.log('product screen product.id: ', productID);
        navigate(`/productDetails/${productID}`);
    }

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleProductEdit = (product) => {

        console.log('calling product edit: ', product.id, product.name)
        sessionStorage.setItem('product', JSON.stringify(product));

        navigate(`/products/update`);

    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = (product) => {
        setOpen(false);
        deleteProduct(product);
    }

    const handleSnackBarClose = () => {
        setSnackBarState({ ...snackBarstate, snackOpen: false });
    }


    const ProductCard = ({ product }) => {


        return (

            <Card sx={{ maxWidth: 345, borderRadius: 4, width: '400px', height: ' 400px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} >
                <CardMedia
                    sx={{ height: 200 }}
                    image={product.imageUrl}
                    title={product.name}
                    component='img'
                />
                <CardContent sx={{ padding: '16px', height: 135 }}>
                    <Grid container justifyContent="space-between">
                        <Grid>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.name}
                            </Typography>

                        </Grid>
                        <Grid container justifyContent="space-between"  >
                            <CurrencyRupeeIcon fontSize="medium" />
                            <Typography gutterBottom variant="h6" component="div">
                                {product.price}
                            </Typography>

                        </Grid>

                    </Grid>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {product.description}
                    </Typography>


                </CardContent >
                <CardContent sx={{
                    m: 1, p: 1,
                    display: 'flex',
                    justifyContent: "space-between"
                }}>
                    <Grid>
                        <Button
                            size="small"
                            variant="contained"
                            sx={{ bgcolor: "#3f51b5" }}
                            onClick={() => navigateToProductDetails(product.id)}
                        >
                            BUY
                        </Button>
                    </Grid>

                    {isAdmin === 'true' ?
                        <Grid>
                            <IconButton aria-label="Edit" onClick={() => handleProductEdit(product)} >
                                <EditIcon />
                            </IconButton>


                            <IconButton aria-label="Delete" onClick={handleDialogOpen}>
                                <DeleteIcon />
                            </IconButton>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                overlayStyle={{ backgroundColor: 'transparent' }}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Confirm deletion of product!"}

                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to delete the product?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" color="primary" onClick={() => handleConfirmDelete(product)} autoFocus>
                                        OK
                                    </Button>
                                    <Button variant="outlined" onClick={handleClose}>CANCEL</Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                        :
                        <></>
                    }

                </CardContent >
            </Card>

        );

    }

    // console.log('products: isAdmin: ', isAdmin);

    return (
        <>
            <NavigationBar page="products" isLoggedIn={isLoggedIn} isAdmin={isAdmin} onSearch={handleSearch} />

            <Container width="100%" sx={{ marginTop: '30px', minHeight: '85vh' }}  >
                <CssBaseline />


                {/* <Typography component="h1" variant="h5" textAlign={'center'}>
                    Products Page will be designed here
                </Typography> */}

                <ToggleButtonGroup sx={{  marginLeft: '20%' }} value={selectedCategory} exclusive onChange={handleCategoryChange}>
                    <ToggleButton value="all">All</ToggleButton>

                    {categories.map((category) => (
                        <ToggleButton value={category} key={category}>{category}</ToggleButton>
                    ))}
                </ToggleButtonGroup>

                <br />
                <br />

                <FormControl size='medium' variant='outlined' sx={{ width: '200px' }}>
                    <InputLabel id="select-label">Sort-By</InputLabel>
                    <Select value={sortBy} label="Sort-By" onChange={handleSortByChange}>
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="price-high">Price: High to Low</MenuItem>
                        <MenuItem value="price-low">Price: Low to High</MenuItem>
                    </Select>

                </FormControl>

                <br />
                <br />

                <Grid container spacing={2} alignItems='center' >
                    {productList.map((product) => (
                        <Grid size={4} xs={12} sm={6} md={4} key={product.id} >
                            <div>
                                <ProductCard product={product} />
                            </div>

                        </Grid>
                    ))}

                </Grid>
            </Container>

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
                        bgcolor: "lightgreen",
                        fontWeight: "bold",
                    }
                }}
            />
        </>

    );
};

export default Products;