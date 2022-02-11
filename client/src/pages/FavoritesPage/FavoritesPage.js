import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../../helpers/mainPageApi';
import {setFavoritesProducts} from '../ProductsPage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {increaseProdQty} from '../../helpers/CartAPI';
import {setCart, setCartQty} from '../Cart';

const useStyles = makeStyles(theme => ({
    productCollections: {
        fontSize: 'x-small',
    },

    productName: {
        minHeight: 50,
        fontSize: 18,
        fontWeight: 'bold',
    },
    favoritesContainer: {
        marginBottom: 20,
    },
    productPrices: {
        fontSize: 20,
        fontWeight: 'bold',
    },
}));

const FavoritesPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuth = useSelector(state => state.productReducer.isAuth);
    const [products, setProducts] = useState([]);
    const favorites = useSelector(
        state => state.productReducer.favoritesProducts,
    );
    const cartQty = useSelector(state => state.cartReducer.cartQty);

    const getProducts = async () => {
        fetchProducts()
            .then(resp => setProducts(resp.data))
            .catch(err => console.log(err));
    };

    const addToCart = (id) => {
        dispatch(
            increaseProdQty(id, localStorage.getItem('token'), setCart),
        );
        dispatch(setCartQty(cartQty + 1));
    };

    useEffect(() => {
        getProducts().then(r => {
        });
    }, []);

    return (
        <Container
            className={classes.favoritesContainer}
            xs={12}
            sm={6}
            md={3}
            maxWidth="md"
        >
            <Typography
                sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    color: '#002D50',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                }}>
                Favorites products
            </Typography>
            <Grid
                container
                maxWidth="md"
                spacing={2}
            >
                {favorites.length ? (
                    products
                        .filter(item => favorites.includes(item._id))
                        .map(card => (
                            <Grid
                                item
                                key={card.name}
                                xs={12}
                                sm={6}
                                md={3}
                            >
                                <Card
                                    style={{
                                        maxWidth: 345,
                                    }}>
                                    <CardActionArea
                                        onClick={() => history.push(`/product/${card._id}`)}
                                    >
                                        <Grid item>
                                            {isAuth && (
                                                <IconButton
                                                    aria-label="add to favorites"
                                                    onClick={event => {
                                                        event.stopPropagation();
                                                        dispatch(setFavoritesProducts(card._id));
                                                    }}>
                                                    {favorites.includes(card._id) ? (
                                                        <FavoriteIcon/>
                                                    ) : (
                                                        <FavoriteBorderIcon/>
                                                    )}
                                                </IconButton>
                                            )}
                                        </Grid>
                                        <CardMedia
                                            style={{
                                                marginTop: '20px',
                                                width: '100%',
                                            }}
                                            component="img"
                                            image={`${card.imageUrls[0]}`}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h8"
                                                component="div"
                                                align="center"
                                                className={classes.productCollections}>
                                                {card.collections}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="h7"
                                                component="div"
                                                align="center"
                                                className={classes.productName}>
                                                {card.name}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                color="text.secondary"
                                                align="center">
                                                Price:
                                                <span
                                                    className={classes.productPrices}>
                          {' '}
                                                    {card.currentPrice}{' '}
                        </span>{' '}
                                                UAH
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <Button
                                        style={{
                                            backgroundColor: '#002D50',
                                            borderRadius: 0,
                                            marginTop: 2,
                                        }}
                                        variant="contained"
                                        disableElevation
                                        sx={{
                                            inlineSize: '-webkit-fill-available',
                                            cursor: "pointer",
                                            marginTop: 20,
                                            borderTop: '#a7aabb solid 1px'
                                        }}
                                        onClick={() => addToCart(card._id)}
                                        >
                                        ADD TO BAG
                                    </Button>
                                </Card>
                            </Grid>
                        ))
                ) : (
                    <Paper
                        sx={{
                            flex: 'auto',
                        }}>
                        <Typography
                            variant="h4"
                            component="div"
                            align="center"
                            sx={{
                                flex: 'auto',
                                margin: '20vh',
                            }}>
                            There are no products in the favorites
                        </Typography>
                    </Paper>
                )}
            </Grid>
        </Container>
    );
};

export default FavoritesPage;
