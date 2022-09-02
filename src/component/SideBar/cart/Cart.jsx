import React from 'react'
import './Cart.scss'

export const Cart = (props) => {
    let { handleCloseSideBarFromParent } = props
    let handleCloseSideBar = () => {
        handleCloseSideBarFromParent('close')
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
                    Hiện chưa có sản phẩm
                </div>
                <div className="center-content-bottom">
                    <span className='total-price'>TỔNG TIỀN: </span> <span>0đ</span>
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
