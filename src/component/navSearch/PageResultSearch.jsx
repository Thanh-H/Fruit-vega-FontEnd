import React from 'react'
import '../../Page/homePage/products/Products.scss'
import { useEffect } from 'react'
import { useState } from 'react'
import NumberFormat from 'react-number-format';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getAllProductService } from '../../service/userService'
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import ReactPaginate from 'react-paginate'
import { SkipNextOutlined, SkipPreviousOutlined } from '@material-ui/icons'

export const PageResultSearch = (props) => {
    let { searchWord } = useParams()
    let [filterProduct, setFilterProduct] = useState()

    let limitItemFromParent = props.limitItem
    let productType = props.productType

    useEffect(() => {
        document.title = `Tìm "${searchWord}"`
        window.scrollTo(0, 0)
        let getAllProduct = async () => {
            let res = await getAllProductService()
            if (res && res.errCode === 0) {

                let allProducts = res.data
                let newFilter = allProducts.filter((item, index) => {
                    return removeVietnameseTones(item.productTitle.toLowerCase()).includes(removeVietnameseTones(searchWord.toLowerCase()))
                })
                if (searchWord === '') {
                    setFilterProduct([])
                }

                else {
                    setFilterProduct(newFilter)
                    setPageCount(Math.ceil(newFilter.length / productsPerPage))
                }
            }
        }
        getAllProduct()

    }, [searchWord])

    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }

    let navigate = useNavigate()
    let HandleRedirec = (item) => {
        navigate(`/Detail-product/${item._id}/${item.productType}`)
    }
    let gotoProductByType = (e) => {
        navigate(`/products/${productType}`)
    }

    // phân trang
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

    return (
        <>
            <Header />
            <div className="product-container ">
                <div className="product-top-content">
                    <h1 className="product-title">
                        Tìm kiếm <br /> <br />
                        <span style={{ fontSize: '16px', fontWeight: 'normal' }}>Có {filterProduct?.length} kết quả tìm kiếm cho: "{searchWord}" </span>
                    </h1>
                </div>
                <div className="product-item-container row">
                    {filterProduct && filterProduct.length > 0 && filterProduct.slice(fromItem, limitItem).map((item, index) => {
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
            <Footer />
        </>
    )
}
