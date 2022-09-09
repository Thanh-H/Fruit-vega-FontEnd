import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Slider from "react-slick"
import { toast } from 'react-toastify'
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import { Footer } from '../../../../component/footer/Footer'
import { Header } from '../../../../component/header/Header'
import { createProductInCart } from '../../../../redux/action'
import { getProductByIdService } from '../../../../service/userService'
import { Products } from '../Products'
import './DetailProduct.scss'


export const DetailProduct = () => {

    let productType = (useParams().type)
    let { id } = useParams()
    let [detailProduct, setDetailProduct] = useState()
    let [quantity, SetQuantity] = useState(1)
    let [changeColorSize, setChangeColorSize] = useState()
    let [changeColorColor, setChangeColorColor] = useState()

    let [chooseSize, setChooseSize] = useState()
    let [chooseColor, setChooseColor] = useState()
    let [openCart, setOpenCart] = useState(false)

    let dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {

        let getDetailProduct = async () => {
            let res = await getProductByIdService(id)
            if (res && res.errCode === 0) {
                setDetailProduct(res.data)
                document.title = `${res.data?.productTitle}`
            }
        }
        getDetailProduct()
        document.title = `${detailProduct?.productTitle}`
    }, [id])

    let buildDataProductForCart = () => {
        let description = `${chooseSize}/${chooseColor}`
        if (!chooseSize) { description = `${chooseColor}` }
        if (!chooseColor) { description = `${chooseSize}` }
        if (!chooseColor && !chooseSize) { description = `` }
        let dataProductForCart = {
            id: detailProduct._id,
            productType: detailProduct.productType,
            productTitle: detailProduct.productTitle,
            image: detailProduct.arrImage[0].image,
            productCode: detailProduct.productCode,
            description: description,
            price: detailProduct.currentPrice,
            quantity: quantity

        }
        return dataProductForCart
    }

    let handleAddToCard = () => {
        let data = buildDataProductForCart()
        if (detailProduct.productType === 'clothes') {
            if (!chooseSize) {
                toast.error('Vui lòng chọn size')
            }
            if (!chooseColor) {
                toast.error('Vui lòng chọn màu')
            }
            if (chooseColor && chooseSize) {
                createProductInCart(data, dispatch)
                setOpenCart(!openCart)
            }
        } else {
            createProductInCart(data, dispatch)
            setOpenCart(!openCart)
        }



    }
    let closeCart = () => {
        setOpenCart(false)
    }


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className=' custom-next-arrow '
                onClick={onClick}>
                <FontAwesomeIcon
                    icon={faChevronRight}
                />
            </div>
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className=' custom-prev-arrow '
                onClick={onClick}>
                <FontAwesomeIcon
                    icon={faChevronLeft}
                />
            </div>
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
        <div>
            <div className='detail-product-container'>
                <Header
                    openCart={openCart}
                    closeCartFromDetailPro={closeCart} />

                <div className="row">
                    <div className="top-content ">
                        <div className="content-left-container col-md-6 col-12">
                            <div className='content-left'>
                                <Slider {...settings}>
                                    {detailProduct?.arrImage && detailProduct?.arrImage.length > 0 && detailProduct?.arrImage.slice(0, 10).map((item, index) => {
                                        return (<div key={index} className='array-image'>
                                            <img src={item.image} alt="" />
                                        </div>)
                                    })}
                                </Slider>
                            </div>
                        </div>
                        <div className="content-right-container col-md-6 col-12">
                            <div className="content-right">
                                <div className='content-right-header'>
                                    <h2 className='product-name'> {detailProduct?.productTitle}</h2>
                                    <span>{detailProduct?.productCode}</span>
                                </div>
                                <div className="content-right-body">
                                    {!detailProduct?.oldPrice ? <div className="price">
                                        <span className='child-price'>
                                            <NumberFormat
                                                value={detailProduct?.currentPrice}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'đ'} />
                                        </span>
                                    </div>
                                        :
                                        <div className="box-price-sale">
                                            {detailProduct?.oldPrice && <div className='sale'>   {Math.floor(100 - ((detailProduct.currentPrice) / (detailProduct.oldPrice)) * 100)}%</div>}
                                            <span className='curent-price'>
                                                <NumberFormat
                                                    value={detailProduct?.currentPrice}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'đ'} />
                                            </span>
                                            <del className="old-price">
                                                <NumberFormat
                                                    value={detailProduct?.oldPrice}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'đ'} />
                                            </del>
                                        </div>}
                                    {detailProduct && detailProduct.arrSize && detailProduct.arrSize[0] !== '' && detailProduct.arrSize.length > 0 && <div className="size">
                                        <div className="size-block-left">
                                            {detailProduct && detailProduct.arrSize && detailProduct.arrSize[0] !== '' && detailProduct.arrSize.length > 0 ? detailProduct.arrSize.map((item, index) => {
                                                return (
                                                    <div key={index} className="size-item-container">
                                                        <label className={changeColorSize === index && 'active'}
                                                            onClick={() => {
                                                                setChangeColorSize(index)
                                                                setChooseSize(item)
                                                            }} >{item}</label>
                                                    </div>
                                                )
                                            })
                                                : ''}
                                            <div className="how-to-choose-size">CÁCH CHỌN SIZE</div>
                                        </div>

                                    </div>}

                                    <div className="color">
                                        {detailProduct && detailProduct.arrColor[0] !== '' && detailProduct.arrColor && detailProduct.arrColor.length > 0 ? detailProduct.arrColor.map((item, index) => {
                                            return (
                                                <div className="color-container">
                                                    <label className={changeColorColor === index && 'active'}
                                                        onClick={() => {
                                                            setChangeColorColor(index)
                                                            setChooseColor(item)
                                                        }} > {item} </label>
                                                </div>
                                            )
                                        }) : ''}

                                    </div>
                                </div>
                                <div className="add-to-cart-container">
                                    <div className="choose-quantity">
                                        <button onClick={() => quantity > 1 && SetQuantity(--quantity)} className='subtraction'>-</button>
                                        <input value={quantity} disabled type="text" />
                                        <button onClick={() => SetQuantity(++quantity)} className='addition'>+</button>
                                    </div>
                                    <div onClick={() => { handleAddToCard() }} className="add-to-cart">Thêm vào giỏ</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="description">
                    <div dangerouslySetInnerHTML={{ __html: detailProduct?.contentHTML }}></div>
                </div>
                <div className=" related-products">
                    <h2 className='related-products-title'> <span>Sản phẩm liên quan</span> </h2>
                    <Products
                        limitItem={4}
                        productType={`${productType}`}
                    />
                </div>


            </div>
            <Footer />
        </div>
    )
}
