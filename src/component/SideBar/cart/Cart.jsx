import React, { useState } from 'react'
import './Cart.scss'
import { useSelector } from 'react-redux'
import NumberFormat from 'react-number-format';
import { deleteProductInCart } from '../../../redux/action'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import dataProvince from '../../../assets/local.json'
import Select from 'react-select';
import { useEffect } from 'react';
import { useRef } from 'react';
import { createANewOrder } from '../../../service/userService'
import { toast } from 'react-toastify';



export const Cart = (props) => {

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { handleCloseSideBarFromParent } = props

    let [isShowFormOrder, setIsShowFromOrder] = useState(false)
    let [isShowOderInfor, setIsShowOrtherInfor] = useState(true)

    let handleCloseSideBar = () => {
        handleCloseSideBarFromParent('close')
    }


    let arrProduct = useSelector((state => state.product.cart?.cartView))
    let total = useSelector((state => state.product.cart?.total))
    let quantity = useSelector((state => state.product.cart?.quantity))

    let handleDeleteProductFromCart = (index) => {
        deleteProductInCart(index, dispatch)
    }

    // Build data select-province begin :

    let [selectedProvince, setSelectedProvince] = useState(null)
    let [selectedDistrict, setSelectedDistrict] = useState(null)
    let [selectedvillage, setSelectedvillage] = useState(null)

    const optionsProvince = []
    const [optionsDistrict, setOptionsDistrict] = useState([])
    const [optionsVillage, setOptionsVillage] = useState([])
    dataProvince.map((item, index) => {
        let obj = {}
        obj.value = item.name
        obj.label = item.name
        optionsProvince.push(obj)
    })

    let handleBuildDistrict = () => {
        let optionsDistrict = []
        let dataDictrict = dataProvince.filter((item, index) =>
            item.name === selectedProvince.value
        )
        dataDictrict[0].districts.map((item, index) => {
            let obj = {}
            obj.value = item.name
            obj.label = item.name
            optionsDistrict.push(obj)
            setOptionsDistrict(optionsDistrict)
        })
    }
    let handleBuildVillage = () => {
        let optionsVillage = []
        let dataDictrict = dataProvince.filter((item, index) =>
            item.name === selectedProvince.value
        )

        let dataVillage = dataDictrict[0].districts.filter((item, index) =>
            item.name === selectedDistrict.value
        )

        dataVillage[0].wards.map((item, index) => {
            let obj = {}
            obj.value = item.name
            obj.label = item.name
            optionsVillage.push(obj)
            setOptionsVillage(optionsVillage)
        })
    }

    // Build data select-province end.


    // Build data order for send request to sever BEGIN:
    let [nameCustomer, setNameCustomer] = useState()
    let [emailCustomer, setEmailCustomer] = useState()
    let [subAddress, setSubAddress] = useState()
    let [phoneNumber, setPhoneNumber] = useState()
    let [note, setNote] = useState()

    let handleOrder = async () => {
        let DataOder = {
            arrProduct: arrProduct,
            nameCustomer: nameCustomer,
            emailCustomer: emailCustomer,
            phoneNumber: phoneNumber,
            quantity: quantity,
            total: total,
            address: `${subAddress}, ${selectedvillage.value}, ${selectedDistrict.value}, ${selectedProvince.value}`,
            note: note
        }
        console.log(DataOder)
        let res = await createANewOrder(DataOder)
        if (res && res.errCode === 0) {
            toast.success('Chúc mừng bạn đã đặt hàng thành công, Vui lòng đợi 1 cuộc điện thoại xác nhận từ cửa hàng chúng tôi,xin cảm ơn')
            navigate('/')
        }
        else {
            toast.error('Lỗi rồi, vui lòng thử lại')
        }

    }


    const disPlayFormOrder = isShowFormOrder && <div className="form-order-container">
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
            <input onChange={(e) => setNameCustomer(e.target.value)} placeholder='Họ và tên' className='form-control' type="text" />
            <input onChange={(e) => setEmailCustomer(e.target.value)} placeholder='Email' className='form-control' type="text" />
            <input onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Số điện thoại' className='form-control' type="text" />
            <input onChange={(e) => setSubAddress(e.target.value)} placeholder='Địa chỉ' className='form-control' type="text" />
            <Select
                className='select-container'
                placeholder='Tỉnh / thành'
                defaultValue={selectedProvince}
                onChange={setSelectedProvince}
                options={optionsProvince}
            />

            <Select className='select-container'
                placeholder='Quận / huyện'
                defaultValue={selectedDistrict}
                onChange={setSelectedDistrict}
                onFocus={handleBuildDistrict}
                options={optionsDistrict}
            />
            <Select className='select-container'
                placeholder='Phường / xã'
                defaultValue={selectedvillage}
                onChange={setSelectedvillage}
                onFocus={handleBuildVillage}
                options={optionsVillage}
            />
            <input onChange={(e) => setNote(e.target.value)} placeholder='Ghi chú' className='form-control' type="text" />


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
    </div>


    return (
        <div className="cart-container">
            <div className="top-content">
                <div className='cart-block'>
                    <span className='cart-title'>{!isShowFormOrder ? ' Giỏ hàng' : 'Thanh toán'}</span>
                    <span onClick={() => handleCloseSideBar()} className='close'>X</span>
                </div>
            </div>
            {isShowOderInfor && <div className="center-content">
                <div className="center-content-top">
                    {arrProduct && arrProduct.length > 0 && arrProduct.map((item, index) => {
                        return (
                            <div key={index} className="product-box">
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

                {!isShowFormOrder && <div className="center-content-bottom">

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

            {!isShowFormOrder && <div className="bottom-content">

                <div onClick={() => {
                    setIsShowOrtherInfor(false)
                    setIsShowFromOrder(true)
                }} className="pay">
                    THANH TOÁN
                </div>
            </div>}

            {disPlayFormOrder}

        </div >
    )
}
