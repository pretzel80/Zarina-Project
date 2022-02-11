import axios from 'axios';

export const fetchProducts = () => {
  return axios.get(`${process.env.REACT_APP_HOST}/products`);
};

export const fetchSlides = setSlides => {
  return axios
    .get(`${process.env.REACT_APP_HOST}/slides`)
    .then(res => setSlides(res.data));
};

export const fetchOneProduct = (itemNo, setProduct) => {
  return axios
    .get(`${process.env.REACT_APP_HOST}/products/${itemNo}`)
    .then(res => setProduct(res.data));
};
