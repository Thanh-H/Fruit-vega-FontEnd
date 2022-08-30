import React, { useState } from 'react'
import './Register.scss'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Footer } from '../../component/footer/Footer'
import { registerUSer } from "../../redux/action"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


export const Register = () => {
    let [userName, setUserName] = useState('')
    let [email, setEmai] = useState('')
    let [password, setPassword] = useState('')
    let [showPassword, setShowPassword] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let handleRegister = () => {
        registerUSer(userName, email, password, dispatch, navigate)
    }
    let hanleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    let handleKeydown = (e) => {
        if (e.key === 'Enter' || e.keycode === 13) {
            handleRegister()
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
                                <input placeholder='Họ Và Tên' type="text" className="from-control"
                                    onChange={(e) => { setUserName(e.target.value) }} />
                            </div>
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

                            <div className='footer'>
                                <button onClick={() => handleRegister()} className='btn btn-register'
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
