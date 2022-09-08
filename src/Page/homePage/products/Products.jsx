import React from 'react'
import './Products.scss'
import { getAllProductService } from '../../../service/userService'
import { useEffect } from 'react'
import { useState } from 'react'
import NumberFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { SkipNextOutlined, SkipPreviousOutlined } from '@material-ui/icons'


export const Products = (props) => {
    let { id } = useParams()

    let limitItemFromParent = props.limitItem
    let productType = props.productType
    let nameProduct = props.nameProduct
    let [allProducts, setAllProducts] = useState()
    let [sortBy, setSortBy] = useState('outstanding')
    useEffect(() => {
        let getAllProduct = async () => {
            let res = await getAllProductService()
            if (res && res.errCode === 0) {
                let allProducts = res.data
                let productS = allProducts.filter((item, index) => {
                    if (item.productType === productType) return item
                })
                let allProductsCoppy = [...productS.reverse()]
                if (sortBy === 'outstanding') {
                    setAllProducts(allProductsCoppy)
                    setPageCount(Math.ceil(allProductsCoppy.length / productsPerPage))
                }
                if (sortBy === '1-n') {
                    let sortBy1ToN = allProductsCoppy.sort((a, b) => {
                        return a.currentPrice - b.currentPrice
                    })
                    setAllProducts(sortBy1ToN)
                    setPageCount(Math.ceil(sortBy1ToN.length / productsPerPage))
                }
                if (sortBy === 'n-1') {
                    let sortByNTo1 = allProductsCoppy.sort((a, b) => {
                        return b.currentPrice - a.currentPrice
                    })
                    setAllProducts(sortByNTo1)
                    setPageCount(Math.ceil(sortByNTo1.length / productsPerPage))
                }
                if (sortBy === 'sale') {
                    let sortByNTo1 = allProductsCoppy.filter((item, index) => {
                        if (item.currentPrice && item.oldPrice) {
                            return item
                        }
                    })
                    setAllProducts(sortByNTo1)
                    setPageCount(Math.ceil(sortByNTo1.length / productsPerPage))

                }
                // create related products
                let coppyProducts = [...productS.reverse()]
                if (id) {
                    let x = coppyProducts.filter((item, index) => { if (item._id !== id) return item }
                    )
                    setAllProducts(x)
                }
            }
        }
        getAllProduct()
    }, [sortBy, id, productType])

    let navigate = useNavigate()
    let HandleRedirec = (item) => {
        navigate(`/Detail-product/${item._id}/${item.productType}`)
    }
    let gotoProductByType = (e) => {
        navigate(`/products/${productType}`)
    }

    // Phân trang

    let [pageCount, setPageCount] = useState()
    let [pageNumber, setPageNumber] = useState(0);
    let productsPerPage = 12;

    let fromItem = 0
    let limitItem = 0
    fromItem = !limitItemFromParent ? pageNumber * productsPerPage : 0
    limitItem = !limitItemFromParent ? fromItem + productsPerPage : limitItemFromParent

    let changePage = ({ selected }) => {
        setPageNumber(selected)
        window.scrollTo(0, 0)
    }

    const displayProducts =
        allProducts && allProducts.length > 0 && allProducts?.slice(fromItem, limitItem).map((item, index) => {
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
        })




    return (
        <div className="product-container ">
            {nameProduct && <div className="product-top-content">
                <h1 className="product-title">
                    <a href={`/products/${productType}`}
                        onClick={(e) => {
                            e.preventDefault()
                            gotoProductByType(productType)
                        }}>{nameProduct}</a>

                </h1>
                <select onChange={(e) => { setSortBy(e.target.value) }}
                    value={sortBy} className="product-sort">
                    <option value="outstanding">Sản phẩm nổi bật</option>
                    <option value="1-n">Giá tăng dần</option>
                    <option value="n-1">Giá giảm dần</option>
                    <option value="sale">Đang Sale</option>
                </select>
            </div>}
            <div className="product-item-container row">
                {displayProducts}

            </div>
            {!limitItemFromParent && <ReactPaginate
                previousLabel={<SkipPreviousOutlined />}
                nextLabel={<SkipNextOutlined />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />}
        </div>
    )
}
