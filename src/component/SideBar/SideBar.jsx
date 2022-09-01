import './SideBar.scss'
import React, { useState } from 'react'
import { Login } from '../../Page/auth/Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux'

export const SideBar = (props) => {
    let userName = useSelector((state => state.auth.login.userInfor?.userName))
    let [showSubKeyChain, setShowSubKeyChain] = useState(false)
    let [showSubBalo, setShowSubBalo] = useState(false)
    let { openMenuBar, handleOpenMenu,
        openCart, openUserPage } = props

    let handleCloseSideBar = () => {
        handleOpenMenu('close')
    }

    let handleShowSubItem = (id) => {
        if (id === 'keychain') {
            setShowSubKeyChain(!showSubKeyChain)
            setShowSubBalo(false)
        }
        if (id === 'balo') {
            setShowSubBalo(!showSubBalo)
            setShowSubKeyChain(false)
        }
    }
    console.log(showSubKeyChain, showSubBalo)

    return (

        <>
            {openMenuBar || openCart || openUserPage ?
                <div className="sidebar-container">
                    <div onClick={() => handleCloseSideBar()} className="site-overlay"></div>
                    <div className="sidebar-container-content">
                        <div className="menu-container">
                            <div className="top-content">
                                {userName ? <ul className='hi-user'>hi {userName} !</ul>
                                    : <ul className="mobile">
                                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                        &nbsp; Đăng nhập
                                    </ul>
                                }
                                <div className='menu-block'>
                                    <span className='menu-title'>Menu</span>
                                    <span className='close'>X</span>
                                </div>

                            </div>
                            <div className="center-content">
                                <ul> <span>Móc khóa</span>  <i onClick={() => handleShowSubItem('keychain')}>< FontAwesomeIcon icon={showSubKeyChain === false ? faChevronDown : faChevronUp} /></i>
                                    {showSubKeyChain === true ?
                                        <>  <li>Móc khóa nhựa dẻo</li>
                                            <li>Móc khóa inox</li>
                                            <li>Móc khóa mika</li>
                                        </> : ''}
                                </ul>
                                <ul> <span>Balo</span> <i onClick={() => handleShowSubItem('balo')}> <FontAwesomeIcon icon={showSubBalo === false ? faChevronDown : faChevronUp} /> </i>
                                    {showSubBalo === true ?
                                        <> <li>Balo học sinh</li>
                                            <li>Balo Laptop</li>
                                        </> : ''}
                                </ul>
                                <ul> <span>Túi xách</span> <i> <FontAwesomeIcon icon={faChevronDown} /></i> </ul>
                                <ul> <span>All</span> </ul>
                                <ul> <span>SALE</span> </ul>
                            </div>
                            <div className="bottom-content">
                                {userName && <ul>Đăng xuất</ul>}
                            </div>
                        </div>
                    </div>
                </div>
                : ''}
        </>
    )
}
