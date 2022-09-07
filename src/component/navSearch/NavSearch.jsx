import React from 'react'
import { useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import './NavSearch.scss'


export const NavSearch = (props) => {
    let { filterProduct } = props

    useEffect(() => {

    }, [])
    let navigate = useNavigate()
    return (
        <div className='nav-search-container'>
            <div className="nav-search-content">
                <div className="body-content">
                    {filterProduct && filterProduct.length > 0 ? filterProduct.map((item, index) => {
                        return (<div key={index} className="body-content-item"
                            onClick={() => {
                                navigate(`/Detail-product/${item._id}/${item.productType}`)
                            }} >
                            <div className="body-item-left">
                                <div>{item.productTitle}</div>
                                <span >
                                    <NumberFormat
                                        value={item?.currentPrice}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'đ'} />
                                </span>
                            </div>
                            <div style={{ backgroundImage: `url(${item.arrImage[0].image})` }} className="body-item-right"></div>
                        </div>
                        )
                    }) : <div className='no-product-title'> Không có sản phẩm nào </div>}
                </div>
                <div className="footer-content">

                </div>
            </div>
        </div>
    )
}
