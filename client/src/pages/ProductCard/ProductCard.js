import React from 'react';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import {useHistory} from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NumberWithCommas
    from '../../components/NumberWithCommas/NumberWithCommas';
import {increaseProdQty} from '../../helpers/CartAPI';
import {setCart, setCartQty} from '../Cart';
import {useDispatch, useSelector} from 'react-redux';
import {setFavoritesProducts} from '../ProductsPage';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const ProductCard = ({product, keyCart}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const favorites = useSelector(
        state => state.productReducer.favoritesProducts,
    );
    const isAuth = useSelector(state => state.productReducer.isAuth);
    const cartQty = useSelector(state => state.cartReducer.cartQty);

    const addToCart = (event, id) => {
        event.stopPropagation()
        dispatch(
            increaseProdQty(id, localStorage.getItem('token'), setCart),
        );
        dispatch(setCartQty(cartQty + 1));
    };

    return (
        <Grid
            container
            justifyContent="space-around"
        >
            <Card
                sx={{
                    minWidth: {
                        xs: 170,
                        sm: 135,
                        md: 185
                    },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: 1,
                    border: '1px solid #E9EBF5',
                }}>
                {isAuth && (
                    <IconButton
                        aria-label="add to favorites"
                        onClick={(event) => {
                            event.stopPropagation();
                            dispatch(setFavoritesProducts(product._id));
                        }}
                        sx={{
                            alignSelf: 'self-end',
                            right: '1vw',
                            top: '1vw',
                            zIndex: '1000'
                        }}
                    >
                        {favorites.includes(product._id) ? (
                            <FavoriteIcon/>
                        ) : (
                            <FavoriteBorderIcon/>
                        )}
                    </IconButton>
                )}
                <CardMedia
                    component="img"
                    sx={{
                        minWidth: {
                            xs: 150,
                            sm: 130,
                            md: 130
                        },
                    }}
                    image={`${product.imageUrls}`}
                />
                <CardContent
                    onClick={() => history.push(`/product/${product._id}`)}
                >
                    <Typography
                        variant={'h5'}
                        component={'h3'}
                        sx={{
                            flexGrow: 1,
                            textAlign: 'center',
                            fontFamily: 'Montserrat',
                            minHeight: {
                                xs: 100,
                                sm: 140,
                                md: 150
                            },
                            minWidth: {
                                xs: 140,
                                sm: 125,
                                md: 125
                            },
                            fontSize: {
                                xs: 20,
                                sm: 21,
                                md: 22
                            },
                            fontWeight: 'bold',
                        }}>
                        {product.name}
                    </Typography>
                    <Typography
                        variant={'body1'}
                        component={'div'}
                        sx={{
                            textAlign: 'center',
                            fontFamily: 'Montserrat',
                            fontSize: {
                                xs: 21,
                                sm: 21,
                                md: 21
                            },
                        }}>
                        <div>
                            <NumberWithCommas number={product.currentPrice}/>
                        </div>
                    </Typography>
                </CardContent>
                {(keyCart !== false ) && <Button
                    style={{
                        backgroundColor: '#002D50',
                        borderRadius: 0,
                        maxWidth: {
                            xs: 130,
                            sm: 170,
                            md: 230
                        },
                    }}
                    variant="contained"
                    disableElevation
                    sx={{inlineSize: '-webkit-fill-available'}}
                    onClick={(event) => addToCart(event, product._id)}
                >
                    ADD TO BAG
                </Button>}
            </Card>
        </Grid>
    );
};
