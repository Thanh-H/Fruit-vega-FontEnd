import React from 'react'
import { useEffect } from 'react'
import { Header } from '../../../../component/header/Header'
import { Products } from '../Products'
import { getProductByIdService } from '../../../../service/userService'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './DetailProduct.scss'
import { Footer } from '../../../../component/footer/Footer'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export const DetailProduct = () => {
    let productType = (useParams().type)
    let { id } = useParams()
    let [detailProduct, setDetailProduct] = useState()

    useEffect(() => {
        let getDetailProduct = async () => {
            let res = await getProductByIdService(id)
            if (res && res.errCode === 0) {
                setDetailProduct(res.data)
            }
        }
        getDetailProduct()
    }, [id])


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <FontAwesomeIcon
                icon={faAngleRight}
                className=' custom-next-arrow '
                onClick={onClick}
            />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <FontAwesomeIcon
                icon={faAngleLeft}
                className='custom-prev-arrow'
                onClick={onClick}
            />
        );
    }

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dotsClass: "slick-dots slick-thumb",
    };

    return (
        <div className='detail-product-container'>
            <Header />
            <div className="row">
                <div className="top-content row">
                    <div className="content-left  col-md-6 col-12">
                        <Slider {...settings}>
                            {detailProduct?.arrImage && detailProduct?.arrImage.length > 0 && detailProduct?.arrImage.map((item, index) => {
                                return (<div key={index} className='array-image'>
                                    <img src={item.image} alt="" />
                                </div>)
                            })}

                        </Slider>
                    </div>
                    <div className="content-right col-md-6 col-12">


                    </div>
                </div>
            </div>
            <div className="row related-products">
                <h2 className='related-products-title'>Sản phẩm liên quan</h2>
                <Products
                    limitItem={4}
                    productType={`${productType}`}
                />
            </div>
            <Footer />

        </div>
    )
}
