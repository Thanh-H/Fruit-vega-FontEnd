import React from 'react'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ProductManage.scss'
import { useState } from 'react';
import { createANewProduct, getAllProductService, deleteProductService, updateProductByIdService } from '../../../service/userService'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const mdParser = new MarkdownIt(/* Markdown-it options */);
export const ProductManage = () => {
    let [id, setId] = useState()
    let [productType, setProductType] = useState('keyChain')
    let [productTitle, setProductTitle] = useState('')
    let [productCode, setProductCode] = useState('')
    let [currentPrice, setCurrentPrice] = useState('')
    let [oldPrice, setOldPrice] = useState('')
    let [inStock, setInStock] = useState(true)
    let [arrSize, setArrSize] = useState('')
    let [contentMarkdown, setContentMarkdown] = useState('')
    let [contentHTML, setContentHTML] = useState('')
    let [count, setCount] = useState(1)
    let [isUpdate, setIsUpdate] = useState(false)
    let [isChangeText, setIsChangeText] = useState(true)

    let hanldeClearState = () => {
        setId('')
        setProductType("keyChain")
        setProductTitle('')
        setProductCode('')
        setCurrentPrice('')
        setOldPrice('')
        setInStock(true)
        setArrSize('')
        setContentMarkdown('')
        setContentHTML('')
        setImgLength(0)
        setIsUpdate(false)
    }

    function handleEditorChange({ html, text }) {
        setContentMarkdown(text)
        setContentHTML(html)
    }
    let [allProducts, setAllProducts] = useState([])
    useEffect(() => {
        let getAllProduct = async () => {
            let res = await getAllProductService()

            if (res && res.errCode === 0) {
                setAllProducts(res.data)
            }
        }
        getAllProduct()
    }, [count])

    ///  Begin build data image
    let [getQtyImg, SetGetQtyImg] = useState() // set variable to get quantity
    let [imgLength, setImgLength] = useState() // set variable to set length array Image and title image
    let handeleConverStringToNumber = () => {
        let number = parseInt(getQtyImg)
        if (number > 12) {
            number = 12
            setImgLength(number)
        } if (number > 0) { setImgLength(number) }
        else { setImgLength(0) }
    }
    let whenKeyEnterDown = (e) => {
        if (e.key === 'Enter' || e.keycode === 13) {
            handeleConverStringToNumber()
        }
    }
    let [arrImg, setArrImg] = useState({})  // set variable to build object image
    let [tileImg, setTitleImg] = useState({}) //set variable to build object title image
    let handleBeginBuilDataImg = (id, value) => {
        if (value) {
            setIsChangeText(false)
        }
        if (id === 0) { setArrImg({ ...arrImg, img1: value }) }
        if (id === 1) { setArrImg({ ...arrImg, img2: value }) }
        if (id === 2) { setArrImg({ ...arrImg, img3: value }) }
        if (id === 3) { setArrImg({ ...arrImg, img4: value }) }
        if (id === 4) { setArrImg({ ...arrImg, img5: value }) }
        if (id === 5) { setArrImg({ ...arrImg, img6: value }) }
        if (id === 6) { setArrImg({ ...arrImg, img7: value }) }
        if (id === 7) { setArrImg({ ...arrImg, img8: value }) }
        if (id === 8) { setArrImg({ ...arrImg, img9: value }) }
        if (id === 9) { setArrImg({ ...arrImg, img10: value }) }
        if (id === 10) { setArrImg({ ...arrImg, img11: value }) }
        if (id === 11) { setArrImg({ ...arrImg, img12: value }) }
        if (id === 12) { setArrImg({ ...arrImg, img13: value }) }
        //////////////////////
        if (id === '0a') { setTitleImg({ ...tileImg, titleImg1: value, }) }
        if (id === '1a') { setTitleImg({ ...tileImg, titleImg2: value, }) }
        if (id === '2a') { setTitleImg({ ...tileImg, titleImg3: value, }) }
        if (id === '3a') { setTitleImg({ ...tileImg, titleImg4: value, }) }
        if (id === '4a') { setTitleImg({ ...tileImg, titleImg5: value, }) }
        if (id === '5a') { setTitleImg({ ...tileImg, titleImg6: value, }) }
        if (id === '6a') { setTitleImg({ ...tileImg, titleImg7: value, }) }
        if (id === '7a') { setTitleImg({ ...tileImg, titleImg8: value, }) }
        if (id === '8a') { setTitleImg({ ...tileImg, titleImg9: value, }) }
        if (id === '9a') { setTitleImg({ ...tileImg, titleImg10: value, }) }
        if (id === '10a') { setTitleImg({ ...tileImg, titleImg11: value, }) }
        if (id === '11a') { setTitleImg({ ...tileImg, titleImg12: value, }) }
        if (id === '12a') { setTitleImg({ ...tileImg, titleImg13: value, }) }


    }

    let [arrImage, setArrImage] = useState(['1'])
    let [arrTitleImage, setArrTitleImage] = useState(['1'])
    let endBuidDataImage = () => {
        let BuildArrImage = Object.entries(arrImg).map(([k, v]) => [v].toString()); // convert object to array
        let BuildArrTitleImage = Object.entries(tileImg).map(([k, v]) => [v].toString()); // convert object to array
        setArrImage(BuildArrImage)
        setArrTitleImage(BuildArrTitleImage)
    }
    //// END build data image

    ////Create new product
    let handleCreateNewProduct = async () => {
        let newData = {
            productType,
            productTitle,
            productCode,
            currentPrice,
            oldPrice,
            inStock,
            arrSize,
            arrImage,
            arrTitleImage,
            contentMarkdown,
            contentHTML,
        }
        let res = await createANewProduct(

        )
        if (res && res.errCode === 0) {
            setCount(++count)
            toast.success('Product has been created')
            hanldeClearState()
        }
        if (res && res.errCode !== 0) {
            toast.error(`${res.errMessage}`)
        } if (!res) {
            toast.error('create product failed! Plz, try againt')
        }
    }

    //// Edit Product
    let handleEditProduct = (item) => {
        setId(item._id)
        setIsUpdate(true)
        setCount(++count)
        setProductType(item.productType)
        setProductTitle(item.productTitle)
        setProductCode(item.productCode)
        setCurrentPrice(item.currentPrice)
        setOldPrice(item.oldPrice)
        setInStock(item.inStock)
        setArrSize(item.arrSize.toString())
        setContentMarkdown(item.contentMarkdown)
        setImgLength(item.arrImage.length)
        setArrImage(item.arrImage)
        setArrTitleImage(item.arrTitleImage)

    }


    let handleUpdateProduct = async () => {
        let res = await updateProductByIdService({
            id,
            productType,
            productTitle,
            productCode,
            currentPrice,
            oldPrice,
            inStock,
            arrSize,
            arrImage,
            arrTitleImage,
            contentMarkdown,
            contentHTML,
        })
        if (res && res.errCode === 0) {
            setCount(++count)
            toast.success('Product has been update')
            hanldeClearState()
        }
        if (res && res.errCode !== 0) {
            toast.error(`${res.errMessage}`)
        } if (!res) {
            toast.error('update product failed! Plz, try againt')
        }
    }
    ////Delete Product
    let handleDeleteProduct = async (id) => {
        let res = await deleteProductService(id)
        if (res && res.errCode === 0) {
            setCount(++count)
            toast.success(`${res.errMessage}`)
        }
        else {
            toast.error(`${res.errMessage}`)
        }
    }

    let handleCancel = () => {
        hanldeClearState()
    }

    return (
        <div className="user-manage-container">
            <form >
                <div className="row">
                    <div className="form-group col-2">
                        <label >Loại sản phẩm</label>
                        <select value={productType} className="form-select"
                            onChange={(e) => setProductType(e.target.value)}  >
                            <option value={'keyChain'}>Móc khóa</option>
                            <option value={'watch'}>Đồng Hồ</option>
                        </select>
                    </div>
                    <div className="form-group col-3 ">
                        <label>Tiêu đề sản phẩm</label>
                        <input value={productTitle}
                            onChange={(e) => setProductTitle(e.target.value)}
                            type="text" className="form-control"
                        />
                    </div>
                    <div className="form-group col-2 ">
                        <label>Mã sản phẩm</label>
                        <input value={[productCode]}
                            onChange={(e) => setProductCode(e.target.value)}
                            type="text" className="form-control"
                        />
                    </div>
                    <div style={{ width: '15%' }} className="form-group col-2 ">
                        <label>Giá hiện tại</label>
                        <input value={currentPrice}
                            onChange={(e) => setCurrentPrice(e.target.value)}
                            type="number" className="form-control"
                        />
                    </div>
                    <div style={{ width: '15%' }} className="form-group col-2 ">
                        <label>Giá cũ</label>
                        <input value={oldPrice}
                            onChange={(e) => setOldPrice(e.target.value)}
                            type="number" className="form-control"
                        />
                    </div>
                    <div style={{ width: '11%' }} className="form-group col-1 ">
                        <label>Tình trạng</label>
                        <select value={inStock} className="form-select"
                            onChange={(e) => setInStock(e.target.value)}  >
                            <option value={true}>Còn hàng</option>
                            <option value={false}>Hết hàng</option>
                        </select>
                    </div>

                </div>

                <div className="form-group col-12 ">
                    <label>Nhập 1 Mảng Size</label>
                    <input
                        value={arrSize}
                        placeholder="Ví dụ:   S,M,L,XL,XXL,XXL "
                        onChange={(e) => setArrSize(e.target.value)}
                        type="text" className="form-control" />
                </div>
                <div className="form-group col-12 mt-3 ">
                    <label>Nhập số lượng ảnh: </label> &nbsp;
                    <input style={{ width: '100px', height: '36px', textAlign: 'center' }}
                        onChange={(e) => SetGetQtyImg(e.target.value)}
                        onKeyDown={(e) => whenKeyEnterDown(e)}
                        type="number"
                    />  &nbsp; <div onClick={() => handeleConverStringToNumber()} className='btn btn-primary'>ok</div>

                    <div className='arr-img-container'>{Array.from(Array(imgLength), (e, i) => {
                        return <div className='content-container' key={i}> <div>Ảnh {i + 1}</div>
                            <div className='content'>
                                <input value={isChangeText === true && isUpdate === true && arrTitleImage && arrTitleImage.length > 0 ? arrTitleImage.filter((item, index) => { if (index === i) return item }) : undefined} placeholder='tiêu đề ảnh' type="text" onChange={(e) => {
                                    handleBeginBuilDataImg(i + 'a', e.target.value)
                                    endBuidDataImage()
                                }} />
                                <input value={isChangeText === true && isUpdate === true && arrImage && arrImage.length > 0 ? arrImage.filter((item, index) => { if (index === i) return item.toString() }) : undefined} placeholder='đường link ảnh' type="text" onChange={(e) => {
                                    handleBeginBuilDataImg(i, e.target.value)
                                    endBuidDataImage()
                                }} />
                                {arrImage && arrImage.length > 0 && arrImage.map((item, index) => { if (index === i) return <div key={index} className='content-image' style={{ backgroundImage: `url(${index === i ? item : null})` }}> </div> })}
                            </div>
                        </div>
                    })}</div>
                </div>


            </form >
            <div className='manage-product-editor'>
                <label>Mô tả sản phẩm</label>
                <MdEditor style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown}
                />

            </div>

            <div className='button-container'>
                {isUpdate === false ? <button onClick={() => handleCreateNewProduct()} className=' btn-add btn btn-primary'>Thêm sản phẩm</button>
                    :
                    <button onClick={() => handleUpdateProduct()} className=' btn-add btn btn-warning'>Lưu thay đổi</button>}

                <button onClick={() => handleCancel()} className=' btn-cancle btn btn-secondary'>Hủy</button>
                <button className=' btn-cancle btn btn-secondary'>build</button>
            </div>


            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Loại sản phẩm</th>
                        <th scope="col">Tiêu đề sản phẩm</th>
                        <th scope="col">Mã sản phẩm</th>
                        <th scope="col">Tình trạng sản phẩm</th>
                        <th style={{ textAlign: 'center' }} scope="col">Xử lý</th>
                    </tr>
                </thead>
                <tbody>
                    {allProducts && allProducts.length > 0 ? allProducts.map((item, index) => {
                        return (<tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.productType} </td>
                            <td> {item.productTitle} </td>
                            <td> {item.productCode ? item.productCode : 0} </td>
                            <td> {item.inStock === true ? 'Còn hàng' : 'Hết hàng'} </td>
                            <td style={{ textAlign: 'center' }}>
                                <FontAwesomeIcon onClick={() => handleEditProduct(item)} style={{ marginRight: '30px' }} className='btn  btn-warning' icon={faPenToSquare} ></FontAwesomeIcon>
                                <FontAwesomeIcon onClick={() => handleDeleteProduct(item._id)} style={{ marginLeft: '30px' }} className='btn btn-danger' icon={faTrash}  ></FontAwesomeIcon>
                            </td>
                        </tr>)
                    }) : ''}
                </tbody>
            </table>


        </div >
    )
}
