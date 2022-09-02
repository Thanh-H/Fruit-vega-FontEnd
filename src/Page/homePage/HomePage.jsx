import React, { useEffect } from 'react'
import { Header } from '../../component/header/Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './HomePage.scss'
import { Banner } from '../../component/banner/Banner'
import { KeyChain } from './products/keyChain/KeyChain'
import { Footer } from '../../component/footer/Footer'
import { BackPack } from './products/backpack/BackPack'
export const HomePage = () => {

    return (
        <div className="homePage-container">
            <Header />
            <Banner />
            <BackPack />
            <KeyChain />
            <Footer />
        </div>

    )
}
