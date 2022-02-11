import React, { useEffect, useState } from 'react';
import { Typography, Box, Container } from '@mui/material';
import { fetchProducts, fetchSlides } from '../../helpers/mainPageApi';
import CarouselSlider from '../../components/CarouselSlider/CarouselSlider';
import MainPageCarusel from '../MainPage/MainPageCarusel';
import ExploreCategories from './ExploreCategories';
import SelectedCollections from './SelectedCollections';
import ZarinaValue from './ZarinaValue';
import {useDispatch} from "react-redux";

const MainPage = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [slides, setSlides] = useState([]);

  const getProducts = async () => {
    fetchProducts()
      .then(resp => setProducts(resp.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    fetchSlides(setSlides);
  }, []);

  return (
    <Box maxWidth="xl" minWidth="xs">
      <CarouselSlider slides={slides} />
      <Box paddingTop="50px" paddingBottom="30px">
        <Typography variant="h6" align="center" color="textPrimary">
          FEATURED
        </Typography>
      </Box>
      <MainPageCarusel products={products} />
      <Box paddingTop="50px" paddingBottom="30px">
        <Typography variant="h6" align="center" color="textPrimary">
          EXPLORE CATEGORIES
        </Typography>
      </Box>
      <ExploreCategories />
      <Box paddingTop="50px" paddingBottom="30px">
        <Typography variant="h6" align="center" color="textPrimary">
          SELECTED COLLECTIONS
        </Typography>
      </Box>
      <SelectedCollections />
      <Box paddingTop="50px" paddingBottom="30px">
        <Typography variant="h6" align="center" color="textPrimary">
          ZARINA - VALUE IS YOU
        </Typography>
      </Box>
      <ZarinaValue />
    </Box>
  );
};

export default MainPage;
