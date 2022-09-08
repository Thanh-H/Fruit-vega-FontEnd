import './SideBar.scss'
import React, { useState } from 'react'
import { Login } from '../../Page/auth/Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOutUser } from '../../redux/action'
import { Cart } from './cart/Cart'
import { MenuSearch } from './search/MenuSearch'



export const SideBar = (props) => {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let id = useSelector((state) => state.auth.login.userInfor?._id)
    let accessToken = useSelector((state => state.auth.login.userInfor?.accessToken))

    let handleLogOut = () => {
        logOutUser(id, accessToken, dispatch, navigate)
    }

    let { openMenuBar, handleOpenMenu,
        openCart, openSearch } = props
    let userName = useSelector((state => state.auth.login.userInfor?.userName))
    let [showSubKeyChain, setShowSubKeyChain] = useState(false)
    let [showSubBalo, setShowSubBalo] = useState(false)
    let [showSubClothes, setShowSubClothes] = useState(false)

    let handleCloseSideBar = () => {
        handleOpenMenu('close')

    }

    let handleShowSubItem = (id) => {
        if (id === 'clothes') {
            setShowSubClothes(!showSubClothes)
            setShowSubBalo(false)
            setShowSubKeyChain(false)
        }
        if (id === 'keychain') {
            setShowSubKeyChain(!showSubKeyChain)
            setShowSubBalo(false)
            setShowSubClothes(false)
        }
        if (id === 'balo') {
            setShowSubBalo(!showSubBalo)
            setShowSubKeyChain(false)
            setShowSubClothes(false)
        }
    }
    let handleGoToLoginPage = () => {
        navigate('/login')
    }

    return (

        <>

            <div className="sidebar-container">
                <div onClick={() => handleCloseSideBar()} className={(openMenuBar || openCart || openSearch) ? "site-overlay" : ''}></div>
                <div className={(openMenuBar || openCart || openSearch) ? " sidebar-container-content sidebar-container-content-close" : "sidebar-container-content"}>
                    {openMenuBar === true && <div className="menu-container">
                        <div className="top-content">
                            {userName ? <div className='hi-user'>Xin chào, {userName} !</div>
                                : <div onClick={() => handleGoToLoginPage()} className="mobile">
                                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                                    &nbsp; Đăng nhập
                                </div>
                            }
                            <div className='menu-block'>
                                <span className='menu-title'>Menu</span>
                                <span onClick={() => handleCloseSideBar()} className='close'>X</span>
                            </div>

                        </div>
                        <div className="center-content">
                            <ul> <span onClick={() => navigate(`/products/clothes`)}>Quần áo</span> <i onClick={() => handleShowSubItem('clothes')}> < FontAwesomeIcon icon={showSubClothes === false ? faChevronDown : faChevronUp} /></i>
                                {showSubClothes === true ?
                                    <>  <li onClick={() => navigate(`/products/sub-product/trousers`)} >Quần </li>
                                        <li onClick={() => navigate(`/products/sub-product/shirt`)}>Áo</li>
                                        <li onClick={() => navigate(`/products/sub-product/coat`)}>Áo khoác</li>
                                    </> : ''}
                            </ul>
                            <ul> <span onClick={() => navigate(`/products/keyChain`)}>Móc khóa</span>  <i onClick={() => handleShowSubItem('keychain')}>< FontAwesomeIcon icon={showSubKeyChain === false ? faChevronDown : faChevronUp} /></i>
                                {showSubKeyChain === true ?
                                    <>  <li onClick={() => navigate(`/products/sub-product/key-plastic`)}>Móc khóa nhựa dẻo</li>
                                        <li onClick={() => navigate(`/products/sub-product/key-inox`)}>Móc khóa inox</li>
                                        <li onClick={() => navigate(`/products/sub-product/key-mika`)}>Móc khóa mika</li>
                                    </> : ''}
                            </ul>
                            <ul> <span onClick={() => navigate(`/products/watch`)}>Đồng Hồ</span> <i onClick={() => handleShowSubItem('balo')}> <FontAwesomeIcon icon={showSubBalo === false ? faChevronDown : faChevronUp} /> </i>
                                {showSubBalo === true ?
                                    <> <li onClick={() => navigate(`/products/sub-product/w-metal`)}>Đồng dây kim loại</li>
                                        <li onClick={() => navigate(`/products/sub-product/w-skin`)}>Đồng hồ dây da</li>
                                    </> : ''}
                            </ul>
                            <ul> <span>All</span> </ul>
                            <ul> <span>SALE</span> </ul>
                        </div>
                        <div className="bottom-content">
                            {userName && <div onClick={() => handleLogOut()}> Đăng xuất  <FontAwesomeIcon icon={faRightFromBracket} />  </div>}
                        </div>
                    </div>}


                    {openCart === true && <Cart handleCloseSideBarFromParent={handleCloseSideBar} />}
                    {openSearch === true && <MenuSearch handleCloseSideBarFromParent={handleCloseSideBar} />}
                </div>
            </div>

        </>
    )
}
