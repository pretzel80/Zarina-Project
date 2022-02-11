import React, {useState, useEffect} from 'react';
import {useHistory, withRouter} from 'react-router-dom';

import {
    Grid,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    IconButton,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {fetchProducts} from '../../helpers/mainPageApi';
import {useDispatch, useSelector} from 'react-redux';
import {setFavoritesProducts} from '../ProductsPage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const useStyles = makeStyles(theme => ({
    productName: {
        minHeight: 40,
    },
    productCollections: {
        fontSize: 'x-small',
    },
    mainFeaturesPost: {
        position: 'relative',
        color: 'black',
        height: 400,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        height: 400,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundOverlay: 'rgba(0,0,0,5)',
    },

    mainFeaturesPostContent: {
        position: 'relative',
        background: 'white',
        opacity: 0.8,
        height: 400,
    },
    grid: {
        height: '100%',
        width: '100%',
        margin: '0px, auto',
    },

    mainLastPost: {
        width: '900px',
        height: '700px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        alignItems: 'right',
        position: 'absolute',
    },
    mainLastContainer: {
        fontSize: '14px',
        color: 'white',
        background: '#002D50',
        opacity: 0.9,
        fontFamily: 'Montserrat',
        width: '784px',
        height: '418px',
        alignItems: 'left',
        position: 'relative',
        justifyContent: 'center',
        verticalAlign: 'middle',
    },
    categoriesItem1: {
        width: '587px',
        height: '712px',
    },
    categoriesItem2: {
        width: '850px',
        height: '312px',
    },
    categoriesItem3: {
        width: '423px',
        height: '397px',
    },
}));

const CompleteSet = completeCollection => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const favorites = useSelector(
        state => state.productReducer.favoritesProducts,
    );
    const isAuth = useSelector(state => state.productReducer.isAuth);

    const getProducts = async () => {
        fetchProducts()
            .then(resp => setProducts(resp.data))
            .catch(err => console.log(err));
    };
    useEffect(() => {
        getProducts().then(() => {
        });
    }, []);

    return (
        <div>
            <Container xs={12} sm={6} md={3} maxWidth="md">
                <Grid container maxWidth="md" spacing={2}>
                    {products.length &&
                    products
                        .filter(
                            item =>
                                item.collections ===
                                `${completeCollection.completeCollection}`,
                        )
                        .slice(0, 4)
                        .map(card => (
                            <Grid
                                item
                                key={card.name}
                                xs={12}
                                sm={6}
                                md={3}
                                onClick={() => history.push(`/product/${card._id}`)}>
                                <Card
                                    style={{
                                        maxWidth: 345,
                                    }}>
                                    <Grid
                                        item
                                    >
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
                                            marginTop: '50px',
                                        }}
                                        component="img"
                                        height="240"
                                        width="100%"
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
                                            variant="body2"
                                            color="text.secondary"
                                            align="center">
                                            Price: {card.currentPrice}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </div>
    );
};

export default withRouter(CompleteSet);
