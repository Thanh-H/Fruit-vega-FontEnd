import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { Products } from '../../homePage/products/Products'
import { Header } from '../../../component/header/Header'
import { Footer } from '../../../component/footer/Footer'
import { SubProducts } from '../subProduct/SubProduct'

export const ProductBySubType = () => {

    let subProductType = (useParams().subProductType)
    let [nameProduct, setNameProduct] = useState()
    useEffect(() => {
        if (subProductType === 'w-skin') {
            setNameProduct('Đồng hồ dây da')
        }
        if (subProductType === 'w-metal') {
            setNameProduct('Đồng hồ kim loại')
        }
        if (subProductType === 'trousers') {
            setNameProduct('Quần')
        }
        if (subProductType === 'shirt') {
            setNameProduct('Áo')
        }
        if (subProductType === 'coat') {
            setNameProduct('Áo khoác')
        }
        if (subProductType === 'key-plastic') {
            setNameProduct('Móc khóa nhựa dẻo')
        }
        if (subProductType === 'key-inox') {
            setNameProduct('Móc khóa inox')
        }
        if (subProductType === 'key-mika') {
            setNameProduct('Móc khóa mika')
        }
    }, [subProductType])
    return (
        <div className='product-by-type-container'>
            <Header />
            <SubProducts
                subProductType={`${subProductType}`}
                nameProduct={`${nameProduct}`}
            />
            <Footer />
        </div>
    )
}
