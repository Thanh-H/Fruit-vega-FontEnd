import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.scss'
export const Banner = () => {
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 5000,
        cssEase: "ease-out",
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="banner-container">
            <Slider {...settings}>
                <div className='banner-item1'></div>
                <div className='banner-item2'></div>

            </Slider>
        </div>
    )
}
