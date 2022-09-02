import React from 'react'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ProductManage.scss'
import { useState } from 'react';
import { createANewProduct, getAllProductService, deleteProductService } from '../../../service/userService'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const mdParser = new MarkdownIt(/* Markdown-it options */);
export const ProductManage = () => {
    let [productType, setProductType] = useState('keyChain')
    let [productTitle, setProductTitle] = useState('')
    let [productCode, setProductCode] = useState('')
    let [currentPrice, setCurrentPrice] = useState('')
    let [oldPrice, setOldPrice] = useState('')
    let [inStock, setInStock] = useState(true)
    let [arrSize, setArrSize] = useState([])
    let [arrImage, setArrImage] = useState([])
    let [contentMarkdown, setContentMarkdown] = useState('')
    let [contentHTML, setContentHTML] = useState('')
    let [count, setCount] = useState(1)

    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
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

    console.log('ssss', allProducts)
    ////Create new product
    let handleCreateNewProduct = async () => {
        setCount(++count)
        let newArrSize = arrSize.split("| |")
        let newArrImage = arrImage.split("| |")
        let res = await createANewProduct(
            {
                productType,
                productTitle,
                productCode,
                currentPrice,
                oldPrice,
                inStock,
                arrSize: newArrSize,
                arrImage: newArrImage,
                contentMarkdown,
                contentHTML,
            }
        )
        if (res && res.errCode === 0) {
            toast.success('Product has been created')
        }
        else {
            toast.success(`${res.errMessage}`)
        }


    }


    let handleEditProduct = () => {
        setCount(++count)
        console.log(arrSize)
        let arr = arrSize.split(",")
        console.log(typeof (arrSize))
        console.log('xxx', arr)
        console.log('ssss', typeof (arr))
    }
    let handleDeleteProduct = async (id) => {
        setCount(++count)
        let res = await deleteProductService(id)
        if (res && res.errCode === 0) {
            toast.success(`${res.errMessage}`)
        }
        else {
            toast.error(`${res.errMessage}`)
        }
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
                        <input
                            onChange={(e) => setProductTitle(e.target.value)}
                            type="text" className="form-control"
                        />
                    </div>
                    <div className="form-group col-2 ">
                        <label>Mã sản phẩm</label>
                        <input
                            onChange={(e) => setProductCode(e.target.value)}
                            type="text" className="form-control"
                        />
                    </div>
                    <div style={{ width: '15%' }} className="form-group col-2 ">
                        <label>Giá hiện tại</label>
                        <input
                            onChange={(e) => setCurrentPrice(e.target.value)}
                            type="text" className="form-control"
                        />
                    </div>
                    <div style={{ width: '15%' }} className="form-group col-2 ">
                        <label>Giá cũ</label>
                        <input
                            onChange={(e) => setOldPrice(e.target.value)}
                            type="text" className="form-control"
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
                    <textarea style={{ height: '100px' }}
                        onChange={(e) => setArrSize(e.target.value)}
                        type="text" className="form-control"
                    />
                </div>
                <div className="form-group col-12 ">
                    <label>Nhập 1 mảng link hình ảnh</label>
                    <textarea
                        onChange={(e) => setArrImage(e.target.value)}
                        style={{ height: '200px' }}
                        type="text" className="form-control"
                    />
                </div>


            </form>
            <div className='manage-product-editor'>
                <label>Mô tả sản phẩm</label>
                <MdEditor style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={handleEditorChange}
                    value={contentMarkdown}
                />

            </div>

            <div className='button-container'>
                <button onClick={() => handleCreateNewProduct()} className=' btn-add btn btn-primary'>Thêm sản phẩm</button>

                <button className=' btn-add btn btn-warning'>Lưu thay đổi</button>

                <button className=' btn-cancle btn btn-secondary'>Hủy</button>
            </div>


            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Loại sản phẩm</th>
                        <th scope="col">Tiêu đề sản phẩm</th>
                        <th scope="col">Tình trạng sản phẩm</th>
                        <th scope="col">Xử lý</th>
                    </tr>
                </thead>
                <tbody>
                    {allProducts && allProducts.length > 0 ? allProducts.map((item, index) => {
                        return (<tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.productType} </td>
                            <td> {item.productTitle} </td>
                            <td> {item.inStock === true ? 'Còn hàng' : 'Hết hàng'} </td>
                            <td>
                                <FontAwesomeIcon onClick={() => handleEditProduct(item)} style={{ marginRight: '30px' }} className='btn  btn-warning' icon={faPenToSquare} ></FontAwesomeIcon>
                                <FontAwesomeIcon onClick={() => handleDeleteProduct(item._id)} style={{ marginLeft: '30px' }} className='btn btn-danger' icon={faTrash}  ></FontAwesomeIcon>
                            </td>
                        </tr>)
                    }) : ''}
                </tbody>
            </table>

        </div>
    )
}
