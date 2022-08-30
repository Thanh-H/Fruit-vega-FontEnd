import React, { useState } from 'react'
import './Login.scss'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Footer } from '../../component/footer/Footer'
import { loginUser } from "../../redux/action"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { faL } from '@fortawesome/free-solid-svg-icons'
export const Login = () => {
    let [email, setEmai] = useState('')
    let [password, setPassword] = useState('')
    let [showPassword, setShowPassword] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let handleLogin = () => {
        loginUser(email, password, dispatch, navigate)
    }
    let hanleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    let handleKeydown = (e) => {
        if (e.key === 'Enter' || e.keycode === 13) {
            handleLogin()
        }
    }
    return (
        <>
            <div className='login-container  '>
                <div className="content-container row  container">
                    <div className="comtent-left col-6">
                        <h1 className="store-title">Trái Cây Bốn mùa</h1>
                        <p>Nơi cung cấp trái cây tươi ngon và an toàn cho mọi nhà</p>
                    </div>
                    <div className="content-right col-6 ">
                        <div className="form-container">
                            <div className="form-group ">
                                <input placeholder='Email' type="text" className="from-control"
                                    onChange={(e) => { setEmai(e.target.value) }} />
                            </div>
                            <div className=" form-group">
                                <input placeholder='Mật khẩu' type={showPassword == false ? "password" : "text"} className="from-control"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    onKeyDown={(e) => handleKeydown(e)}
                                />
                                {password !== '' ? <i onClick={() => hanleShowPassword()}>
                                    {showPassword === false ?
                                        <FontAwesomeIcon icon={faEye} /> :
                                        <FontAwesomeIcon icon={faEyeSlash} />}
                                </i> : ''}
                            </div>
                            <div className='btn-background'>
                                <button className='btn btn-login '
                                    onClick={() => handleLogin()}
                                > Đăng nhập</button>
                            </div>
                            <div className="forgot-password"> <a href="">Quên mật khẩu ?</a>  </div>
                            <div className='footer'>
                                <button className='btn btn-register'
                                >Tạo tài khoản mới</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
