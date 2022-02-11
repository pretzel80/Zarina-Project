import React from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';

export default function CarouselSlider({ slides }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <img alt="intresting slides" key={index} src={slide.imageUrl} />
      ))}
    </Slider>
  );
}
