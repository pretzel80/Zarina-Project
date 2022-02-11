import React, {useEffect, useState} from 'react';
import {useParams, withRouter} from 'react-router-dom';
import {
    Grid,
    Container,
    Typography,
    Button,
    IconButton,
    Box, CardMedia, CardContent,
} from '@mui/material';
import axios from 'axios';
import NumberWithCommas
    from '../../components/NumberWithCommas/NumberWithCommas';
import ProductPageCarusel from './ProductPageCarusel';
import {useDispatch, useSelector} from 'react-redux';
import {increaseProdQty} from '../../helpers/CartAPI/index';
import {setCart, setCartQty} from '../Cart/index';
import CompleteSet from './CompleteSet';
import RecentlyViewed from './RecentlyViewed';
import {setFavoritesProducts} from '../ProductsPage';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const OneProductPage = props => {

    const params = useParams();
    const dispatch = useDispatch();
    const [oneProduct, setOneProduct] = useState({});
    const [errorId, setErrorId] = useState({});
    const [oneProductPrice, setOneProductPrice] = useState(0);
    const favorites = useSelector(
        state => state.productReducer.favoritesProducts,
    );
    const isAuth = useSelector(state => state.productReducer.isAuth);
    const cartQty = useSelector(state => state.cartReducer.cartQty);


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_HOST}/products/${params.id}`)
            .then(res => {
                setOneProduct(res.data);
                setOneProductPrice(res.data.currentPrice);
            }).catch((error => {
            setErrorId(error.message)
        }));
        window.scrollTo(0, 0);
    }, [params]);

    const addToCart = () => {
        dispatch(
            increaseProdQty(params.id, localStorage.getItem('token'), setCart),
        );
        dispatch(setCartQty(cartQty + 1));
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                mt: 3,
            }}
        >
            <Grid
                container
                spacing={2}
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: 'column',
                        sm: errorId.length ? 'column' : 'row',
                        md: errorId.length ? 'column' : 'row'
                    },
                    alignItems: {
                        xs: 'center',
                        sm: errorId.length ? 'center' : 'flex-start',
                        md: errorId.length ? 'center' : 'flex-start',
                    }
                }}
            >
                <CardMedia
                    component={"img"}
                    sx={{
                        margin: '0 auto',
                        width: {
                            xs: '95%',
                            sm: errorId.length ? '95%' : '50%',
                            md: errorId.length ? '95%' : '50%'
                        },
                        height: "max-content",
                    }}
                    {...(errorId.length
                        ? {src: require("../../assets/images/404product.jpg")}
                        : {image: `${oneProduct.imageUrls}`})
                    }
                    alt="complex"
                />
                <Grid
                    item
                    xs={12}
                    sm={errorId.length ? 12 : 6}
                    md={errorId.length ? 12 : 6}
                >
                    <Grid
                        item
                    >
                        <Grid>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                                sx={{
                                    fontSize: {
                                        xs: errorId.length ? 20 : 15,
                                        sm: errorId.length ? 25 : 20,
                                        md: errorId.length ? 30 : 25
                                    },
                                    fontWeight: "bold",
                                    fontFamily: 'Montserrat, sans-serif',
                                    textTransform: 'uppercase',
                                    color: '#000000',
                                    marginTop: {xs: 1, sm: 2, md: 8}
                                }}
                            >
                                {!errorId.length ? oneProduct.name : 'Product not found'}
                            </Typography>
                            {!errorId.length &&
                            <hr/>}
                            {!errorId.length &&
                            <Typography
                                variant="body2"
                                gutterBottom
                                sx={{
                                    color: '#A1A5AD',
                                }}
                            >
                                <Typography
                                    component={"span"}
                                    sx={{
                                        marginRight: {xs: 1, sm: 2, md: 3}
                                    }}
                                >
                                    itemNo:
                                </Typography>
                                {oneProduct.itemNo}
                            </Typography>}
                        </Grid>
                    </Grid>
                    {!errorId.length && <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: {xs: 1, sm: 2, md: 3},
                        }}
                    >
                        <CardContent
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                fontFamily: 'Montserrat',
                            }}
                        >
                            <NumberWithCommas number={oneProductPrice}/>
                        </CardContent>
                        {isAuth && (
                            <IconButton
                                aria-label="add to favorites"
                                onClick={() => {
                                    dispatch(setFavoritesProducts(oneProduct._id));
                                }}
                                sx={{padding: 0}}
                            >
                                <Typography
                                    sx={{
                                        mr: 1
                                    }}
                                >
                                    Add to
                                    wishlist
                                </Typography>
                                {favorites.includes(oneProduct._id)
                                    ?
                                    (<FavoriteIcon/>)
                                    :
                                    (<FavoriteBorderIcon/>)}
                            </IconButton>
                        )}
                    </Grid>}
                    {!errorId.length &&
                    <Button
                        variant="contained"
                        disableElevation
                        // color={'#002D50'}
                        sx={{
                            backgroundColor: '#002D50',
                            "&:hover": {
                                backgroundColor: '#002D50'
                            },
                            borderRadius: 0,
                            inlineSize: '-webkit-fill-available',
                            cursor: "pointer",
                            marginTop: {xs: 1, sm: 2, md: 3},
                            marginBottom: {xs: 1, sm: 2, md: 3},
                            borderTop: '#a7aabb solid 1px'
                        }}
                        onClick={addToCart}
                    >
                        ADD TO CART
                    </Button>}
                    {!errorId.length && <hr/>}
                    {!errorId.length && <Grid>
                        <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                            sx={{
                                color: '#000000',
                                marginTop: {xs: 1, sm: 1, md: 2},
                            }}
                        >
                            <Typography
                                sx={{
                                    marginTop: {xs: 1, sm: 1, md: 2},
                                }}
                            >
                                DETAILS
                            </Typography>
                            <ul
                                type="circle"
                                style={{paddingInlineStart: '17px'}}
                            >
                                <Box
                                    sx={{
                                        width: {
                                            xs: '50%',
                                            sm: '80%',
                                            md: '50%'
                                        },
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        component={"li"}
                                        sx={{
                                            marginRight: 2,
                                            color: '#000',
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            },
                                        }}
                                    >
                                        Brand:
                                    </Typography>
                                    <Typography
                                        component={"div"}
                                        sx={{
                                            color: '#002d50',
                                            textTransform: "uppercase",
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            },
                                        }}
                                    >
                                        {oneProduct.brand}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: {
                                            xs: '50%',
                                            sm: '80%',
                                            md: '50%'
                                        },
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        component={"li"}
                                        sx={{
                                            marginRight: 2,
                                            color: '#000',
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        Collections:
                                    </Typography>
                                    <Typography
                                        component={"div"}
                                        sx={{
                                            color: '#002d50',
                                            textTransform: "uppercase",
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        {oneProduct.collections}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: {
                                            xs: '50%',
                                            sm: '80%',
                                            md: '50%'
                                        },
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        component={"li"}
                                        sx={{
                                            marginRight: 2,
                                            color: '#000',
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        Categories:
                                    </Typography>
                                    <Typography
                                        component={"div"}
                                        sx={{
                                            color: '#002d50',
                                            textTransform: "uppercase",
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        {oneProduct.categories}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: {
                                            xs: '50%',
                                            sm: '80%',
                                            md: '50%'
                                        },
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        component={"li"}
                                        sx={{
                                            marginRight: 2,
                                            color: '#000',
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        Color:
                                    </Typography>
                                    <Typography
                                        component={"div"}
                                        sx={{
                                            color: '#002d50',
                                            textTransform: "uppercase",
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        {oneProduct.color}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: {
                                            xs: '50%',
                                            sm: '80%',
                                            md: '50%'
                                        },
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        component={"li"}
                                        sx={{
                                            marginRight: 2,
                                            color: '#000',
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        Size:
                                    </Typography>
                                    <Typography
                                        component={"div"}
                                        sx={{
                                            color: '#002d50',
                                            textTransform: "uppercase",
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        {oneProduct.sizes}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: {
                                            xs: '50%',
                                            sm: '80%',
                                            md: '50%'
                                        },
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        component={"li"}
                                        sx={{
                                            marginRight: 2,
                                            color: '#000',
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        Manufacturer:
                                    </Typography>
                                    <Typography
                                        component={"div"}
                                        sx={{
                                            color: '#002d50',
                                            textTransform: "uppercase",
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        {oneProduct.manufacturer}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: {
                                            xs: '50%',
                                            sm: '80%',
                                            md: '50%'
                                        },
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        component={"li"}
                                        sx={{
                                            marginRight: 2,
                                            color: '#000',
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        Seller:
                                    </Typography>
                                    <Typography
                                        component={"div"}
                                        sx={{
                                            color: '#002d50',
                                            textTransform: "uppercase",
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        {oneProduct.seller}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: {
                                            xs: '50%',
                                            sm: '80%',
                                            md: '50%'
                                        },
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography
                                        component={"li"}
                                        sx={{
                                            marginRight: 2,
                                            color: '#000',
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        Material:
                                    </Typography>
                                    <Typography
                                        component={"div"}
                                        sx={{
                                            color: '#002d50',
                                            textTransform: "uppercase",
                                            fontSize: {
                                                xs: '0.8rem',
                                                sm: '0.9rem',
                                                md: '1rem'
                                            }
                                        }}
                                    >
                                        {oneProduct.material}
                                    </Typography>
                                </Box>
                            </ul>
                        </Typography>
                    </Grid>}
                </Grid>
            </Grid>
            {!errorId.length && <Box
                paddingTop="50px"
                paddingBottom="30px"
            >
                <Typography
                    variant="h6"
                    align="center"
                    color="textPrimary"
                >
                    COMPLETE THE SET
                </Typography>
                <CompleteSet
                    completeCollection={oneProduct.collections}
                />
            </Box>}
            <Box
                paddingTop="50px"
                paddingBottom="30px"
            >
                <Typography
                    variant="h6"
                    align="center"
                    color="textPrimary"
                >
                    RECENTLY VIEWED
                </Typography>
                <RecentlyViewed/>
            </Box>
            <div>
                <Box
                    paddingTop="50px"
                    paddingBottom="30px"
                >
                    <Typography
                        variant="h6"
                        align="center"
                        color="textPrimary"
                    >
                        DISCOVER ZARINA LOOKS
                    </Typography>
                </Box>
                <ProductPageCarusel/>
            </div>
        </Container>
    );
};
export default withRouter(OneProductPage);
