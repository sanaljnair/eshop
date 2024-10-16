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
import Box from '@mui/material/Box';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link, useNavigate } from 'react-router-dom';


// const productsData = [{
//     "id": "66f50611a9fbd1113cdf98324",
//     "name": "cmf phone  123",
//     "category": "Electronics",
//     "price": 12000.0,
//     "description": "good camera, smart phone, good camera, smart phone, good camera, smart phone, good camera, smart phone, good camera, smart phone, ",
//     "manufacturer": "Nothing Else",
//     "availableItems": 20,
//     "imageUrl": "https://images.pexels.com/photos/336948/pexels-photo-336948.jpeg?cs=srgb&dl=pexels-solliefoto-336948.jpg&fm=jpg"
// },
// {
//     "id": "66f7f44cea259f27abba20ea4",
//     "name": "Adidas M1 shoes",
//     "category": "Clothing",
//     "price": 2300.0,
//     "description": "Nice & Comfort",
//     "manufacturer": "Adidas",
//     "availableItems": 200,
//     "imageUrl": "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
// },
// {
//     "id": "66fe99ba69ee8833bb390ca23",
//     "name": "Pants",
//     "category": "Pants",
//     "price": 9003.0,
//     "description": "Its not a pant, its your partner",
//     "manufacturer": "Louis Phillipe",
//     "availableItems": 100,
//     "imageUrl": "https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg"
// }, {
//     "id": "66f7f44cea259f27abba20ea2",
//     "name": "Adidas M1 shoes",
//     "category": "Clothing",
//     "price": 2200.0,
//     "description": "Nice & Comfort",
//     "manufacturer": "Adidas",
//     "availableItems": 200,
//     "imageUrl": "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
// },
// {
//     "id": "66fe99ba69ee8833bb390ca21",
//     "name": "Pants",
//     "category": "Pants",
//     "price": 9001.0,
//     "description": "Its not a pant, its your partner",
//     "manufacturer": "Louis Phillipe",
//     "availableItems": 100,
//     "imageUrl": "https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg"
// },
// {
//     "id": "66f7f44cea259f27abba20ea4",
//     "name": "Adidas M1 shoes",
//     "category": "Clothing",
//     "price": 2220.0,
//     "description": "Nice & Comfort",
//     "manufacturer": "Adidas",
//     "availableItems": 200,
//     "imageUrl": "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
// },
// {
//     "id": "66fe99ba69ee8833bb390ca23",
//     "name": "Pants",
//     "category": "Pants",
//     "price": 9012.0,
//     "description": "Its not a pant, its your partner",
//     "manufacturer": "Louis Phillipe",
//     "availableItems": 100,
//     "imageUrl": "https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg"
// }, {
//     "id": "66f7f44cea259f27abba20ea2",
//     "name": "Adidas M1 shoes",
//     "category": "Clothing",
//     "price": 2221.0,
//     "description": "Nice & Comfort",
//     "manufacturer": "Adidas",
//     "availableItems": 200,
//     "imageUrl": "https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg"
// },
// {
//     "id": "66fe99ba69ee8833bb390ca21",
//     "name": "Pants",
//     "category": "Pants",
//     "price": 9211.0,
//     "description": "Its not a pant, its your partner",
//     "manufacturer": "Louis Phillipe",
//     "availableItems": 100,
//     "imageUrl": "https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg"
// }
// ];

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

const Products = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn'));
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin'));
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('access-token'));
    const [productList, setProductList] = useState([]);
    const [categories, setCategories] = useState([]);


    // const [products, setProducts] = useState(productsData);
    // const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('price-high');

    const navigate = useNavigate();

    console.log('products page: isAdmin: ', isAdmin);
    console.log('products page: isLoggedin: ', isLoggedIn);
    console.log('products page: accessToken: ', accessToken);
    // const isLoggedIn = false;
    // const isAdmin = false;

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

            // console.log(response.headers.get('x-auth-token'));
            console.log('get Categories Succesfull');
            console.log('get category response data: ', data);

        }
        catch (error) {
            console.log(error.message || 'An error occurred during login');
        } finally {
            
            console.log('categories: ', categories);

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
            console.log('get Products response data: ', data);
            
        }
        catch (error) {
            console.log(error.message || 'An error occurred during login');
        } finally {
            console.log('productList: ', productList);
 
        }

    }

    useEffect(() => { getProduts(); }, []);

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
                            <IconButton aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
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

                <ToggleButtonGroup value={selectedCategory} exclusive onChange={handleCategoryChange}>
                    <ToggleButton value="all">All</ToggleButton>

                    {categories.map((category) => (
                        <ToggleButton value={category} key={category}>{category}</ToggleButton>
                    ))}
                </ToggleButtonGroup>

                <br />
                <br />

                <FormControl size='medium' variant='outlined' sx={{ width: '150px' }}>
                    <InputLabel id="demo-simple-select-label">Sort-By</InputLabel>
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
        </>

    );
};

export default Products;