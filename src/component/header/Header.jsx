import './Header.scss'
import logo from '../../assets/logo.PNG'
import React from 'react'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const Header = () => {
    return (
        <div className='home-header-container'>
            <div className='home-header-content-container'>
                <div className="home-header-content">
                    <div className='left-content'>
                        <i className='fas fa-bars'></i>
                        <img className='header-logo' src={logo} />
                    </div>
                    <div className='center-content'>
                        <div className="child-content">
                            <div> Trái Cây </div>
                        </div>
                        <div className="child-content">
                            <div>Rau Xanh</div>
                        </div>
                        <div className="child-content">
                            <div>Hoa Tươi</div>
                        </div>

                    </div>
                    <div className='right-content'>
                        <div className="cart">
                            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                        </div>
                        <div className="cart">
                            <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                        </div>
                        <div className="user-login">
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                        </div>
                        <div className="menu">
                            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
