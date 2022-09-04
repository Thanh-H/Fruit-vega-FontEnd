import React from 'react'
import './NavSystem.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { } from '@fortawesome/free-regular-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logOutUser } from '../../redux/action'
import { useDispatch, useSelector } from 'react-redux'


export const NavSystem = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let id = useSelector((state) => state.auth.login.userInfor?._id)
    let accessToken = useSelector((state => state.auth.login.userInfor?.accessToken))
    let userName = useSelector((state => state.auth.login.userInfor?.userName))

    let handleLogOut = () => {
        logOutUser(id, accessToken, dispatch, navigate)
    }
    return (
        <>
            <div className="topnav">
                <div className='admin-title'>Admin</div>
                <NavLink className="" to={`/system/user-manage/${id}`}>Người dùng</NavLink>
                <NavLink className="" to={`/system/product-manage/${id}`}>Sản phẩm</NavLink>
                <NavLink className="" to={`/system/order-manage/${id}`}>Đơn hàng</NavLink>
                <NavLink className="" to={`/system/history/${id}`}>Lịch sử</NavLink>
                <div className="user-name">hi {userName ? userName : ''}! </div>
                <div onClick={() => handleLogOut()} className="log-out">
                    <FontAwesomeIcon icon={faRightFromBracket} ></FontAwesomeIcon>
                </div>
            </div>
            <div className="boottom-nav"></div>
        </>
    )
}