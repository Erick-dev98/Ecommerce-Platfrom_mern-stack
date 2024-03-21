import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from './data';

const ProductCarousel = ({ products }) => {
  return (
    <div>
        <Carousel
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          customTransition="all .5"
          //customTransition="all 500ms ease" 
          transitionDuration={1000}
          >
          {products}
        </Carousel>
    </div>
  )
}

export default ProductCarousel