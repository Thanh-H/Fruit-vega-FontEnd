import React from 'react'
import './SubProduct.scss'
import { getAllProductService } from '../../../service/userService'
import { useEffect } from 'react'
import { useState } from 'react'
import NumberFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


export const SubProducts = (props) => {
    let { subProductType } = useParams()

    let limitItem = props.limitItem
    let nameProduct = props.nameProduct
    let [allProducts, setAllProducts] = useState()
    let [sortBy, setSortBy] = useState('outstanding')
    useEffect(() => {
        let getAllProduct = async () => {
            let res = await getAllProductService()
            if (res && res.errCode === 0) {
                let allProducts = res.data
                let productS = allProducts.filter((item, index) => {
                    if (item.subProductType === subProductType) return item
                })
                let allProductsCoppy = [...productS.reverse()]
                if (sortBy === 'outstanding') {
                    setAllProducts(allProductsCoppy)
                }
                if (sortBy === '1-n') {
                    let sortBy1ToN = allProductsCoppy.sort((a, b) => {
                        return a.currentPrice - b.currentPrice
                    })
                    setAllProducts(sortBy1ToN)
                }
                if (sortBy === 'n-1') {
                    let sortByNTo1 = allProductsCoppy.sort((a, b) => {
                        return b.currentPrice - a.currentPrice
                    })
                    setAllProducts(sortByNTo1)
                }
                if (sortBy === 'sale') {
                    let sortByNTo1 = allProductsCoppy.filter((item, index) => {
                        if (item.currentPrice && item.oldPrice) {
                            return item
                        }
                    })
                    setAllProducts(sortByNTo1)
                }

            }
        }
        getAllProduct()
    }, [sortBy, subProductType])

    let navigate = useNavigate()
    let HandleRedirec = (item) => {
        navigate(`/Detail-product/${item._id}/${item.productType}`)
    }
    let gotoProductByType = (e) => {
        navigate(`/products/sub-product/${subProductType}`)
    }

    return (
        <div className="product-container ">
            {nameProduct ? <div className="product-top-content">
                <h1 className="product-title">
                    <a href={`/products/sub-product/${subProductType}`}
                        onClick={(e) => {
                            e.preventDefault()
                            gotoProductByType(subProductType)
                        }}>{nameProduct}</a>

                </h1>
                <select onChange={(e) => { setSortBy(e.target.value) }}
                    value={sortBy} className="product-sort">
                    <option value="outstanding">Sản phẩm nổi bật</option>
                    <option value="1-n">Giá tăng dần</option>
                    <option value="n-1">Giá giảm dần</option>
                    <option value="sale">Đang Sale</option>
                </select>
            </div> : ''}
            <div className="product-item-container row">
                {allProducts && allProducts.length > 0 && allProducts.slice(0, limitItem).map((item, index) => {
                    return (<div key={index} className="product-item-content col-6 col-xl-3 col-md-4">
                        <div onClick={() => HandleRedirec(item)}
                            style={{ backgroundImage: `url(${item.arrImage[0]?.image})` }} className="content-top">
                            {item.oldPrice && <div className='sale'>   {Math.floor(100 - ((item.currentPrice) / (item.oldPrice)) * 100)}%</div>}
                        </div>
                        <div onClick={() => HandleRedirec(item)}
                            className="content-center">
                            {item.productTitle} {item.productCode}
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
                            {/* <div className="add-to-cart">Thêm vào giỏ </div> */}
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}
