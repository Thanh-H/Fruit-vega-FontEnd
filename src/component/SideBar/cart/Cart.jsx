import React, { useState } from 'react'
import './Cart.scss'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import { deleteProductInCart } from '../../../redux/action'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
export const Cart = (props) => {
    let { handleCloseSideBarFromParent } = props

    let [isShowFromOrder, setIsShowFromOrder] = useState(false)
    let [isShowOderInfor, setIsShowOrtherInfor] = useState(true)

    let handleCloseSideBar = () => {
        handleCloseSideBarFromParent('close')
    }
    let dispatch = useDispatch()

    let arrProduct = useSelector((state => state.product.cart?.cartView))
    let total = useSelector((state => state.product.cart?.total))

    let handleDeleteProductFromCart = (index) => {
        deleteProductInCart(index, dispatch)
    }

    let navigate = useNavigate()
    let handleOrder = () => {
        navigate('/')
    }
    console.log(arrProduct)
    return (
        <div className="cart-container">
            <div className="top-content">
                <div className='cart-block'>
                    <span className='cart-title'>{!isShowFromOrder ? ' Giỏ hàng' : 'Thanh toán'}</span>
                    <span onClick={() => handleCloseSideBar()} className='close'>X</span>
                </div>
            </div>
            {isShowOderInfor && <div className="center-content">
                <div className="center-content-top">
                    {arrProduct && arrProduct.length > 0 && arrProduct.map((item, index) => {
                        return (
                            <div className="product-box">
                                <div onClick={() => navigate(`/Detail-product/${item.id}/${item.productType}`)} style={{ backgroundImage: `url(${item.image})` }} className="image"></div>
                                <div className="conten-box">
                                    <div className="top-box">
                                        <div onClick={() => navigate(`/Detail-product/${item.id}/${item.productType}`)} className='title'>{item.productTitle} {item.productCode}</div>
                                        <span onClick={() => handleDeleteProductFromCart(index)} className='delete'>x</span>
                                    </div>
                                    <div className="desciption"> {item.description}</div>
                                    <div className="footter-box">
                                        <div className="quantity">{item.quantity}</div>
                                        <div className="price">
                                            <NumberFormat
                                                value={item?.price}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'đ'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                    {arrProduct && arrProduct.length > 0 ? '' : <h6>Hiện chưa có sản phẩm</h6>}
                </div>

                {!isShowFromOrder && <div className="center-content-bottom">

                    <span className='total-price'>TỔNG TIỀN: </span>
                    <span>
                        <NumberFormat
                            value={total}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'} />
                    </span>
                </div>}
            </div>}
            {!isShowFromOrder && <div className="bottom-content">

                <div onClick={() => {
                    setIsShowOrtherInfor(false)
                    setIsShowFromOrder(true)
                }} className="pay">
                    THANH TOÁN
                </div>
            </div>}

            {isShowFromOrder && <div className="form-order-container">
                <div className="form-order-header">
                    <div className="show-hide-order-infor">
                        <div className='toggle-show-hide-oder-infor' onClick={() => setIsShowOrtherInfor(!isShowOderInfor)} >
                            <i> <FontAwesomeIcon icon={faCartShopping} /></i>
                            {isShowOderInfor ? 'Ẩn thông tin đơn hàng' : 'hiện thông tin đơn hàng'}</div>
                        <div>
                            <NumberFormat
                                value={total}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'} />

                        </div>
                    </div>
                    <div className="form-order-discount-code">
                        <input placeholder='Mã giảm giá' className='form-control' type="text" />
                        <div className='btn btn-secondary'>Sử dụng</div>
                    </div>
                    <h5 className='form-order-title'>  Thông tin giao hàng</h5>

                </div>
                <div className="form-group form-order-body">
                    <input placeholder='Họ và tên' className='form-control' type="text" />
                    <input placeholder='Email' className='form-control' type="text" />
                    <input placeholder='Số điện thoại' className='form-control' type="text" />
                    <input placeholder='Địa chỉ' className='form-control' type="text" />
                    <input placeholder='Tỉnh / thành' className='form-control' type="text" />
                    <input placeholder='Quận / huyện' className='form-control' type="text" />
                    <input placeholder='Phường / xã' className='form-control' type="text" />
                    <input placeholder='Ghi chú' className='form-control' type="text" />
                </div>
                <div className="footer-btn mt-3">
                    <div onClick={() => handleOrder()} className=" btn-top btn btn-primary">
                        Hoàn tất đơn hàng
                    </div>

                    <div onClick={() => {
                        setIsShowFromOrder(false)
                        setIsShowOrtherInfor(true)
                    }} className="  btn btn-warning btn-bottom">
                        Giỏ hàng
                    </div>
                </div>
            </div>}

        </div >
    )
}
