import React, { useEffect } from 'react'
import { Header } from '../../component/header/Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './HomePage.scss'
import { Banner } from '../../component/banner/Banner'
import { Products } from './products/Products'
import { Footer } from '../../component/footer/Footer'
// import { Watch } from './products/watch/Watch'
export const HomePage = () => {

    return (
        <div className="homePage-container">
            <Header />
            <Banner />
            {/* Quần áo */}
            <Products
                limitItem={8}
                productType={'clothes'}
                nameProduct={'Quần áo'}
            />
            {/* Đồng hồ */}
            <Products
                limitItem={8}
                productType={'watch'}
                nameProduct={'Đồng Hồ'}
            />
            {/* Móc khóa */}
            <Products
                limitItem={8}
                productType={'keyChain'}
                nameProduct={'Móc khóa'}
            />
            <Footer />
        </div>

    )
}
