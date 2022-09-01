import React, { useEffect } from 'react'
import { Header } from '../../component/header/Header'
import { SideBar } from '../../component/SideBar/SideBar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './HomePage.scss'
export const HomePage = () => {

    return (
        <div className="homePage-container">
            <Header />
            <SideBar />
        </div>

    )
}
