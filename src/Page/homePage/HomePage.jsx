import React from 'react'
import { Header } from '../../component/header/Header'
import { SideBar } from '../../component/SideBar/SideBar'
import './HomePage.scss'
export const HomePage = () => {
    return (
        <div className="homePage-container">
            <Header />
            <SideBar />
        </div>

    )
}
