import React, { useRef } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { Grid, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoritesProducts } from '../ProductsPage';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const settings = {
  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  arrows: false,

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1008,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: false,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};
const MainPageCarusel = ({ products }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const favorites = useSelector(
    state => state.productReducer.favoritesProducts,
  );
  const sliderRef = useRef(null);
  const isAuth = useSelector(state => state.productReducer.isAuth);

  return (
    <Box>
      {/* <div
                style={{
                    top: 'auto',
                    bottom: 'auto',
                    left: '-50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 20,
                    boxShadow: '0 1px 3px rgb(0 0 0 / 10%)',
                    width: 35,
                    height: 35,
                    color: 'gray',
                    cursor: 'pointer',
                }}
                onClick={() => sliderRef.current.slickPrev()}
            >
                <ArrowBackIos/>
            </div> */}
      <Slider
        style={{
          width: '100%',
          position: 'relative',
          cursor: 'pointer',
        }}
        ref={sliderRef}
        {...settings}>
        {products.map(item => (
          <div
            key={item.itemNo}
            style={{
              width: '280px',
              margin: '0 auto',
            }}>
            <Grid
              item
              style={{
                position: 'relative',
              }}>
              {isAuth && (
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    dispatch(setFavoritesProducts(item._id));
                  }}
                  sx={{
                    position: 'absolute',
                    top: '5px',
                    left: '25px',
                    zIndex: 100,
                  }}>
                  {favorites.includes(item._id) ? (
                    <FavoriteIcon />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              )}
            </Grid>
            <img
              style={{
                width: '95%',
                height: 390,
                objectFit: 'contain',
                border: '1px solid #E9EBF5',
                textDecoration: 'none',
              }}
              alt={'#'}
              src={item.imageUrls}
              onClick={() => history.push(`/product/${item._id}`)}
            />
            <div>
              <p
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '17px',
                  fontStyle: 'bold',
                  marginTop: '20px',
                }}>
                {item.name}
              </p>
              <p
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: '15px',
                  fontStyle: 'uppercase',
                  marginTop: '15px',
                  marginBottom: '25px',
                }}>
                {item.currentPrice} UAH
              </p>
            </div>
          </div>
        ))}
      </Slider>
      {/* <div
                style={{
                    // top: 'auto',
                    // bottom: 'auto',
                    // // right: '-50px',
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    // marginRight: 20,
                    // boxShadow: '0 1px 3px rgb(0 0 0 / 10%)',
                    // width: 35,
                    // height: 35,
                    color: 'gray',
                    border: '0,5px, solid gray',
                    cursor: 'pointer',
                }}
                onClick={() => sliderRef.current.slickNext()}
            >
                <ArrowForwardIos/>
            </div> */}
    </Box>
  );
};
export default MainPageCarusel;
