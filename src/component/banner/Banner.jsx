import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.scss'
export const Banner = () => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="banner-container">
            <Slider {...settings}>
                <div className='banner-item'></div>
            </Slider>
        </div>
    )
}
