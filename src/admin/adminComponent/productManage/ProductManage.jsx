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
import { faFloppyDisk, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const mdParser = new MarkdownIt(/* Markdown-it options */);
export const ProductManage = () => {
    let [id, setId] = useState()
    let [productType, setProductType] = useState('clothes')
    let [productTitle, setProductTitle] = useState('')
    let [productCode, setProductCode] = useState('')
    let [currentPrice, setCurrentPrice] = useState('')
    let [oldPrice, setOldPrice] = useState('')
    let [inStock, setInStock] = useState(true)
    let [arrSize, setArrSize] = useState('')
    let [arrColor, setArrColor] = useState('')
    let [contentMarkdown, setContentMarkdown] = useState('')
    let [contentHTML, setContentHTML] = useState('')
    let [count, setCount] = useState(1)
    let [isUpdate, setIsUpdate] = useState(false)

    let hanldeClearState = () => {
        // setId('')
        // setProductType("keyChain")
        // setProductTitle('')
        // setProductCode('')
        // setCurrentPrice('')
        // setOldPrice('')
        // setInStock(true)
        // setArrSize('')
        // setArrColor('')
        // setContentMarkdown('')
        // setContentHTML('')
        // setIsUpdate(false)
        // setArrImage([])

        // setTilteImg('')
        // setImage('')
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
                setAllProducts(res.data.reverse())
            }
        }
        getAllProduct()
    }, [count])

    /// Build data ArrImage
    ////
    let [arrImage, setArrImage] = useState([])

    let [titleImg, setTilteImg] = useState('')
    let [image, setImage] = useState('')

    let [titleImgEdit, setTilteImgEdit] = useState('')
    let [imageEdit, setImageEdit] = useState('')

    let [idImgCoppy, setIdImgCoppy] = useState(false)

    ////
    let handleAddImg = () => {
        if (image) {
            setArrImage([
                ...arrImage,
                {
                    id: Math.floor(Math.random() * 1000),
                    title: titleImg,
                    image: image
                }
            ])
        }

    }

    let handleEditImage = (image) => {
        setIdImgCoppy(image.id)
        setImageEdit(image.image)
        setTilteImgEdit(image.title)

    }

    let handleSaveImage = (image) => {
        setIdImgCoppy(null)
        if (imageEdit) {
            let arrImageCoppy = [...arrImage];
            let objIndex = arrImageCoppy.findIndex((item => item.id === image.id));
            arrImageCoppy[objIndex].image = imageEdit
            if (titleImgEdit) { arrImageCoppy[objIndex].title = titleImgEdit }
            setArrImage([...arrImageCoppy])
            toast.success('Edit image succeed!')
        }


    }
    let handleDeleteImage = (image) => {
        let deleteImage = arrImage.filter((item) => image.id !== item.id)
        setArrImage([...deleteImage])
    }

    ////Create new product
    let handleCreateNewProduct = async () => {
        let res = await createANewProduct(
            {
                productType,
                productTitle,
                productCode,
                currentPrice,
                oldPrice,
                inStock,
                arrSize,
                arrColor,
                arrImage,
                contentMarkdown,
                contentHTML,
            }
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
        setArrColor(item.arrColor.toString())
        setContentMarkdown(item.contentMarkdown)
        setArrImage(item.arrImage)


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
            arrColor,
            arrImage,
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
                            <option value={'clothes'}>Quần áo</option>
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
                <div className="row">
                    <div className="form-group col-6 ">
                        <label>Nhập 1 Mảng Size</label>
                        <input
                            value={arrSize}
                            placeholder="Ví dụ:   S,M,L,XL,XXL,XXL "
                            onChange={(e) => setArrSize(e.target.value)}
                            type="text" className="form-control" />
                    </div>
                    <div className="form-group col-6 ">
                        <label>Nhập 1 Mảng Màu </label>
                        <input
                            value={arrColor}
                            placeholder="Ví dụ:   đỏ,xanh,vàng "
                            onChange={(e) => setArrColor(e.target.value)}
                            type="text" className="form-control" />
                    </div>
                </div>
                <div className="form-group col-12 mt-3 ">
                    <div className="add-img-container">
                        <div className='content-container' >
                            <div>Thêm hình ảnh:</div>
                            <div className='content'>
                                <input value={titleImg} placeholder='tiêu đề ảnh' type="text" onChange={(e) => setTilteImg(e.target.value)} />
                                <input value={image} placeholder='đường link ảnh' type="url" onChange={(e) => setImage(e.target.value)} />
                                <div className="add-content ">
                                    <div onClick={() => handleAddImg()} className='btn btn-primary'>Thêm ảnh</div>
                                </div>
                            </div>
                        </div>
                        <div className='content-image' style={{ backgroundImage: `url(${image})` }}> </div>
                    </div>

                    <div className='arr-img-container'>{arrImage.map((item, index) => {
                        return <div className='content-container' key={index}> <div>Ảnh {index + 1} :</div>
                            <div className='content'>
                                <div className="btn-container">
                                    {idImgCoppy !== item.id ?
                                        <FontAwesomeIcon onClick={() => handleEditImage(item)} style={{ marginRight: '30px' }} className='btn  btn-warning' icon={faPenToSquare} />
                                        : <FontAwesomeIcon onClick={() => handleSaveImage(item)} style={{ marginRight: '30px' }} className='btn  btn-primary' icon={faFloppyDisk} />}
                                    <FontAwesomeIcon onClick={() => handleDeleteImage(item)} style={{ marginLeft: '50px' }} className='btn btn-danger' icon={faTrash} />
                                </div>
                                {idImgCoppy !== item.id ?
                                    <> <input disabled value={item.title} type="text" />
                                        <input disabled value={item.image} type="text" /> </>
                                    :
                                    <>    <input type="text" value={titleImgEdit} onChange={e => setTilteImgEdit(e.target.value)} />
                                        <input value={imageEdit} type="text" onChange={e => setImageEdit(e.target.value)} />  </>}
                                <div className='content-image' style={{ backgroundImage: `url(${item.image})` }}> </div>
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
                                <FontAwesomeIcon onClick={() => {
                                    window.scrollTo(0, 0)
                                    handleEditProduct(item)
                                }} style={{ marginRight: '30px' }} className='btn  btn-warning' icon={faPenToSquare} ></FontAwesomeIcon>
                                <FontAwesomeIcon onClick={() => handleDeleteProduct(item._id)} style={{ marginLeft: '30px' }} className='btn btn-danger' icon={faTrash}  ></FontAwesomeIcon>
                            </td>
                        </tr>)
                    }) : ''}
                </tbody>
            </table>


        </div >
    )
}
