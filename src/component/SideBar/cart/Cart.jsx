import React from 'react'
import './Cart.scss'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import { deleteProductInCart } from '../../../redux/action'
import { useDispatch } from 'react-redux';
export const Cart = (props) => {
    let { handleCloseSideBarFromParent } = props
    let handleCloseSideBar = () => {
        handleCloseSideBarFromParent('close')
    }
    let dispatch = useDispatch()

    let arrProduct = useSelector((state => state.product.cart?.cartView))
    let total = useSelector((state => state.product.cart?.total))

    let handleDeleteProductFromCart = (index) => {
        deleteProductInCart(index, dispatch)
    }
    return (
        <div className="cart-container">
            <div className="top-content">
                <div className='cart-block'>
                    <span className='cart-title'>Giỏ hàng</span>
                    <span onClick={() => handleCloseSideBar()} className='close'>X</span>
                </div>
            </div>
            <div className="center-content">
                <div className="center-content-top">
                    {arrProduct && arrProduct.length > 0 && arrProduct.map((item, index) => {
                        return (
                            <div className="product-box">
                                <div style={{ backgroundImage: `url(${item.image})` }} className="image"></div>
                                <div className="conten-box">
                                    <div className="top-box">
                                        <div className='title'>{item.productTitle} {item.productCode}</div>
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
                <div className="center-content-bottom">
                    <span className='total-price'>TỔNG TIỀN: </span>
                    <span>
                        <NumberFormat
                            value={total}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'} />
                    </span>
                </div>
            </div>
            <div className="bottom-content">
                <div className="see-cart">
                    XEM GIỎ HÀNG
                </div>
                <div className="pay">
                    THANH TOÁN
                </div>
            </div>
        </div>
    )
}
