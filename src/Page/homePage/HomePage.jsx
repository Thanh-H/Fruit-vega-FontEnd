import React, { useEffect } from 'react'
import { Header } from '../../component/header/Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './HomePage.scss'
import { Banner } from '../../component/banner/Banner'

export const HomePage = () => {

    return (
        <div className="homePage-container">
            <Header />
            <Banner />
        </div>

    )
}
