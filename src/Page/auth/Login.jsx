import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../../component/footer/Footer'
import { loginUser } from "../../redux/action"
import './Register.scss'
import logo from '../../assets/LOGO.svg'
import { IsLoading } from '../../component/isLoading/IsLoading'
import { toast } from 'react-toastify'


export const Login = () => {
    useEffect(() => {
        document.title = 'T-shop Đăng nhập'
    }, [])

    let isFetching = useSelector((state) => state.auth.login?.isFetching)

    let [email, setEmai] = useState('')
    let [password, setPassword] = useState('')
    let [showPassword, setShowPassword] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let handleLogin = () => {
        var isValid = true
        if (!email) {
            toast.warning('Vui lòng nhập địa chỉ email')
            isValid = false
        }
        if (!password) {
            toast.warning('Vui lòng nhập mật khẩu')
            isValid = false
        }

        if (isValid === true) { loginUser(email, password, dispatch, navigate) }
    }

    let hanleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    let handleKeydown = (e) => {
        if (e.key === 'Enter' || e.keycode === 13) {
            handleLogin()
        }
    }

    let handleGoToRegister = () => {
        navigate('/register')
    }
    let handleGoToHomePage = () => {
        navigate('/')
    }
    return (
        <>

            <div className='login-container  '>
                {isFetching && <IsLoading />}
                <div className="content-container row  container">
                    <div className="comtent-left col-6">
                        <img src={logo} onClick={() => handleGoToHomePage()} className="store-title" />
                        <p>Đăng nhập để nhận nhiều mã giảm giá ^^</p>
                    </div>
                    <div className="content-right col-6 ">
                        <div className="form-container">
                            <div className="form-group ">
                                <input placeholder='Email' type="email" className="from-control"
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
                                    onClick={() => handleGoToRegister()}
                                >Tạo tài khoản mới</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
