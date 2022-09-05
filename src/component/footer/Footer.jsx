import React from 'react'
import './Footer.scss'
export const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='top-content row'>
                <div className="about-us col-3"></div>
                <div className="about-us col-3"></div>
            </div>
            <div className="footer-content">
                <div className="footer-title">
                    <p>&copy; 2022 ICING<br /> Đường link github của tôi <a target='_blank' href='https://github.com/Thanh-H?tab=repositories'>click</a> </p>
                </div>
            </div>
        </div>
    )
}
