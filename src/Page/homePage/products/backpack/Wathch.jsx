import React from 'react'
import '../Product.scss'
import { getAllProductService } from '../../../../service/userService'
import { useEffect } from 'react'
import { useState } from 'react'
import NumberFormat from 'react-number-format';
export const Watch = () => {
    let [allWatch, setAllWatch] = useState()
    useEffect(() => {
        let getAllProduct = async () => {
            let res = await getAllProductService()

            if (res && res.errCode === 0) {
                let allProducts = res.data
                let waths = allProducts.filter((item, index) => {
                    if (item.productType === 'watch') return item
                })
                setAllWatch(waths)
            }


        }
        getAllProduct()
    }, [])

    return (
        <div className="product-container ">
            <h1 className="product-title">
                <span>Đồng Hồ</span>
            </h1>
            <div className="product-item-container row">
                {allWatch && allWatch.length > 0 && allWatch.map((item, index) => {
                    return (<div key={index} className="product-item-content col-6 col-xl-3 col-md-4">
                        <div style={{ backgroundImage: `url(${item.arrImage[0]?.image})` }} className="content-top">
                            {item.oldPrice && <div className='sale'>   {Math.floor(((item.currentPrice) / (item.oldPrice)) * 100)}%</div>}
                        </div>
                        <div className="content-center">

                            {item.productTitle}
                        </div>
                        <div className="content-footer">
                            {!item.oldPrice ? <div className="box-price">
                                <NumberFormat
                                    value={item.currentPrice}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'} />
                            </div>
                                :
                                <div className="box-price-sale">
                                    <span className='curent-price'>
                                        <NumberFormat
                                            value={item.currentPrice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'đ'} />
                                    </span>
                                    <del className="old-price">
                                        <NumberFormat
                                            value={item.oldPrice}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'đ'} />
                                    </del>
                                </div>}
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}
