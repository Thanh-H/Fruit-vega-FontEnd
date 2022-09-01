import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import saurieng from '../../assets/baner/saurieng.jpg'
import hoatuoi from '../../assets/baner/hoatuoi.jpg'
import traicay from '../../assets/baner/traicay.webp'
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



                <img src={traicay} />
            </Slider>
        </div>
    )
}
