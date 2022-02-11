import React, { useRef } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const looks = [
  {
    itemNo: 1,
    name: 'look1',
    categories: 'rings',
    imageUrls:
      'https://res.cloudinary.com/teamhands/image/upload/v1635863211/Jewelry%20shop/looks/27_hmodrd.png',
    color: 'gold',
    sizes: 'all',
    brand: 'Zarina',
  },
  {
    itemNo: 2,
    name: 'look2',
    categories: 'bracelets',
    imageUrls:
      'https://res.cloudinary.com/teamhands/image/upload/v1635863212/Jewelry%20shop/looks/34_wpdlgv.png',
    color: 'gold',
    sizes: 'all',
    brand: 'Zarina',
  },
  {
    itemNo: 3,
    name: 'look3',
    categories: 'necklaces',
    imageUrls:
      'https://res.cloudinary.com/teamhands/image/upload/v1635863216/Jewelry%20shop/looks/35_hh1xwr.png',

    color: 'gold',
    sizes: 'all',
    brand: 'Zarina',
  },
  {
    itemNo: 4,
    name: 'look1',
    categories: 'rings',
    imageUrls:
      'https://res.cloudinary.com/teamhands/image/upload/v1635863213/Jewelry%20shop/looks/8_nfq8oi.png',
    color: 'gold',
    sizes: 'all',
    brand: 'Zarina',
  },
  {
    itemNo: 5,
    name: 'look2',
    categories: 'bracelets',
    imageUrls:
      'https://res.cloudinary.com/teamhands/image/upload/v1635863213/Jewelry%20shop/looks/31_ytysh2.png',
    color: 'gold',
    sizes: 'all',
    brand: 'Zarina',
  },
  {
    itemNo: 6,
    name: 'look4',
    categories: 'necklaces',
    imageUrls:
      'https://res.cloudinary.com/teamhands/image/upload/v1635863212/Jewelry%20shop/looks/37_fzwzxm.png',
    color: 'gold',
    sizes: 'all',
    brand: 'Zarina',
  },
];

const settings = {
  infinite: true,
  speed: 2000,
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  dots: false,

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1008,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ProductPageCarusel = () => {
  const sliderRef = useRef(null);

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '-50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20,
          boxShadow: '0 1px 3px rgb(0 0 0 / 10%)',
          width: 35,
          height: 35,
          color: 'gray',
          border: '0,5px, solid gray',
          cursor: 'pointer',
        }}
        onClick={() => sliderRef.current.slickPrev()}>
        <ArrowBackIos />
      </div>
      <Slider ref={sliderRef} {...settings}>
        {looks
          .map(element => (
            <div key={element.itemNo}>
              <img
                alt="look better"
                style={{
                  width: '97%',
                  objectFit: 'contain',
                  height: 466,
                  marginBottom: 15,
                }}
                src={`${element.imageUrls}`}
              />
            </div>
          ))}
      </Slider>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20,
          boxShadow: '0 1px 3px rgb(0 0 0 / 10%)',
          width: 35,
          height: 35,
          color: 'gray',
          border: '0,5px, solid gray',
          cursor: 'pointer',
        }}
        onClick={() => sliderRef.current.slickNext()}>
        <ArrowForwardIos />
      </div>
    </div>
  );
};

export default ProductPageCarusel;
