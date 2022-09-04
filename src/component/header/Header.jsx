import './Header.scss'
// import logo from '../../assets/logo.PNG'
import React, { useState } from 'react'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faBars, faCartShopping, faMagnifyingGlass, faPager } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { SideBar } from '../SideBar/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import logo from './logo.svg'

export const Header = () => {
    let navigate = useNavigate()
    let goToHomePage = () => {
        navigate('/')
    }

    let [openMenuBar, setOpenMenuBar] = useState(false)
    let [openCart, setOpenCart] = useState(false)
    let [openUserPage, setOpenUserPage] = useState(false)
    let [openSearch, setOpenSearch] = useState(false)

    let userName = useSelector((state => state.auth.login.userInfor?.userName))
    let isAdmin = useSelector((state) => state.auth.login.userInfor?.isAdmin)

    let handleOpenMenu = (id) => {
        id === 'menu' && setOpenMenuBar(!openMenuBar)
        id === 'cart' && setOpenCart(!openCart)
        id === 'search' && setOpenSearch(!openSearch)
        if (id === 'close') {
            setOpenMenuBar(false)
            setOpenCart(false)
            setOpenSearch(false)
        }
        id === 'admin' && navigate('/system')
    }
    let handleGoToLoginPage = () => {
        navigate('/login')

    }


    return (
        <div className='home-header-container'>
            <div className='home-header-content-container'>
                <div className="home-header-content">
                    <div className='left-content'>
                        <a onClick={() => goToHomePage()} href="/#"></a>
                        <img className='header-logo' src={logo} />
                    </div>
                    <div className='center-content form-group'>
                        <input className='search-center' type="text" />
                        <div className="icon-glass">
                            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className='right-content'>
                        {isAdmin ? <div className="admin-page"
                            onClick={() => handleOpenMenu('admin')}>
                            <FontAwesomeIcon icon={faPager}></FontAwesomeIcon>
                            &nbsp;admin
                        </div> : ''}
                        {userName ? <div className='user-logged-in'>hi {userName} ! </div>
                            :
                            <div className="user-login"
                                onClick={() => handleGoToLoginPage()}>
                                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                            </div>}

                        <div className="search"
                            onClick={() => handleOpenMenu('search')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                        </div>
                        <div className="cart"
                            onClick={() => handleOpenMenu('cart')}>
                            <FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon>
                        </div>
                        <div className="menu"
                            onClick={() => handleOpenMenu('menu')}
                        >
                            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </div>
            <div className='clear-space'></div>
            <SideBar
                openCart={openCart}
                openSearch={openSearch}
                openMenuBar={openMenuBar}
                handleOpenMenu={handleOpenMenu}
            />
        </div>
    )
}
