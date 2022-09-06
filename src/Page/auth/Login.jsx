import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../../component/footer/Footer'
import { loginUser } from "../../redux/action"
// import './Login.scss'

export const Login = () => {
    let [email, setEmai] = useState('')
    let [password, setPassword] = useState('')
    let [showPassword, setShowPassword] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let handleLogin = () => {
        var isValid = true
        let arr = [email, password]
        for (let i = 0; i < arr.length; i++) {

            if (arr[i] === '') {
                alert('missing parameter')
                isValid = false
                break;
            }

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
                <div className="content-container row  container">
                    <div className="comtent-left col-6">
                        <h1 onClick={() => handleGoToHomePage()} className="store-title">ICING</h1>
                        <p>Phụ Kiện thời trang</p>
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
