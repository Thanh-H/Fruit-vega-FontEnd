import React from 'react'
import './Footer.scss'

export const Footer = () => {
    return (
        <div className='footer-container'>
            <div className="footer-top">
                <div className="footer-container ">
                    <div className="row content-container">

                        <div className="col-12 col-lg-4">
                            <ul className="list-link-footer-top">
                                <h5> Thông tin</h5>
                                <li>Giới thiệu <a href=""> </a></li>
                                <li>Gọi mua hàng<a href=""> 123456789 </a>(8h00 - 22h00)</li>
                                <li>Liên hệ công ty  <a href=""> </a></li>
                                <li>Đối tác <a href=""> </a></li>
                            </ul>
                        </div>
                        <div className="col-12 col-lg-4">
                            <ul className="list-link-footer-top">
                                <h5>  Chính sách</h5>
                                <li><a href="">   Chính sách đổi hàng  </a></li>
                                <li><a href=""> Chính sách bảo hành  </a></li>
                                <li><a href="">Chính sách bảo mật </a></li>
                                <li><a href="">   Chính sách hoàn tiền </a></li>
                            </ul>
                        </div>

                        <div className="col-12 col-lg-4">
                            <ul className="list-link-footer-top">
                                <h5>  FAQ</h5>
                                <li><a href=""> Thanh toán và vận chuyển </a></li>
                                <li><a href=""> Hướng dẫn chọn size </a></li>
                                <li><a href=""> Kiểm tra thông tin đơn hàng </a></li>
                                <li><a href=""> Câu hỏi thường gặp </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-content">
                <div className="footer-title">
                    <p>&copy; 2022 ICING<br /> Đường link github của tôi <a target='_blank' href='https://github.com/Thanh-H?tab=repositories'>click</a> </p>
                </div>
            </div>
        </div>
    )
}
