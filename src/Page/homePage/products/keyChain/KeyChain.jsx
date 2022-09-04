import React from 'react'
import '../Product.scss'
import { getAllProductService } from '../../../../service/userService'
import { useEffect } from 'react'
import { useState } from 'react'
import NumberFormat from 'react-number-format';

export const KeyChain = () => {
    let [allKeyChains, setAllKeyChains] = useState()
    useEffect(() => {
        let getAllProduct = async () => {
            let res = await getAllProductService()
            if (res && res.errCode === 0) {
                let allProducts = res.data
                let keyChains = allProducts.filter((item, index) => {
                    if (item.productType === 'keyChain') return item
                })
                setAllKeyChains(keyChains)
            }

            console.log('chectttttttttt', res.data)
        }
        getAllProduct()
    }, [])

    console.log('checkxx', allKeyChains)
    return (
        <div className="product-container ">
            <h1 className="product-title">
                <span>Móc khóa</span>
            </h1>
            <div className="product-item-container row">
                {allKeyChains && allKeyChains.length > 0 && allKeyChains.map((item, index) => {
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
