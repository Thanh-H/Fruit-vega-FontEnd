import React from 'react'

export const test = () => {
    return (
        <div><div class="col-md-5 col-sm-12 col-xs-12 product-content-desc" id="detail-product">
            <div class="product-title">
                <h1>Quần tây nam slimfit viền túi QTA0033</h1>

                <span id="pro_sku">SKU: QTA003329DE</span>


            </div>
            <div class="product-price" id="price-preview"><span class="pro-price">350,000₫</span></div>

            <form id="add-item-form" action="/cart/add" method="post" class="variants clearfix">
                <div class="select clearfix">
                    <div class="selector-wrapper"><label for="product-select-option-0">Kích thước</label><span class="custom-dropdown custom-dropdown--white"><select class="single-option-selector custom-dropdown__select custom-dropdown__select--white" data-option="option1" id="product-select-option-0"><option value="29">29</option><option value="30">30</option><option value="34">34</option><option value="32">32</option><option value="36">36</option><option value="31">31</option></select></span></div><div class="selector-wrapper"><label for="product-select-option-1">Màu sắc</label><span class="custom-dropdown custom-dropdown--white"><select class="single-option-selector custom-dropdown__select custom-dropdown__select--white" data-option="option2" id="product-select-option-1"><option value="Đen">Đen</option></select></span></div><select id="product-select" name="id" style="display:none;">

                        <option data-title="29 / Đen" data-avaiable="true" value="1081815955">29 / Đen - 350,000₫</option>

                        <option data-title="30 / Đen" data-avaiable="true" value="1081815956">30 / Đen - 350,000₫</option>

                        <option data-title="34 / Đen" data-avaiable="true" value="1081815957">34 / Đen - 350,000₫</option>

                        <option data-title="32 / Đen" data-avaiable="true" value="1081815958">32 / Đen - 350,000₫</option>

                        <option data-title="36 / Đen" data-avaiable="true" value="1081815959">36 / Đen - 350,000₫</option>

                        <option data-title="31 / Đen" data-avaiable="true" value="1081815960">31 / Đen - 350,000₫</option>

                    </select>
                </div>
                <div class="select-swatch clearfix">















                    <div id="variant-swatch-0" class="swatch clearfix swarch-size" data-option="option1" data-option-index="0">










                        <a class="pull-right" style="margin: 10px 25px;" href="javascript:;" data-fancybox="" data-src="#pop-size">
                            CÁCH CHỌN SIZE
                        </a>
                        <div id="pop-size" style="display: none;" class="animated-modal">
                            <img class="hidden-xs" src="//theme.hstatic.net/1000096703/1000836887/14/size_chart_desktop.jpg?v=70" alt="">
                                <img class="visible-xs" src="//theme.hstatic.net/1000096703/1000836887/14/size_chart_mobile.jpg?v=70" alt="">
                                </div>

                                <div data-value="29" class="n-sd swatch-element 29">
                                    <input class="variant-0" id="swatch-0-29" type="radio" name="option1" value="29" data-vhandle="29" checked="">

                                        <label for="swatch-0-29" class="sd">
                                            <span>29</span>
                                        </label></div><div data-value="30" class="n-sd swatch-element 30">
                                    <input class="variant-0" id="swatch-0-30" type="radio" name="option1" value="30" data-vhandle="30" checked="">

                                        <label for="swatch-0-30">
                                            <span>30</span>
                                        </label></div><div data-value="31" class="n-sd swatch-element 31">
                                    <input class="variant-0" id="swatch-0-31" type="radio" name="option1" value="31" data-vhandle="31" checked="">

                                        <label for="swatch-0-31">
                                            <span>31</span>
                                        </label></div><div data-value="32" class="n-sd swatch-element 32">
                                    <input class="variant-0" id="swatch-0-32" type="radio" name="option1" value="32" data-vhandle="32" checked="">

                                        <label for="swatch-0-32">
                                            <span>32</span>
                                        </label></div><div data-value="34" class="n-sd swatch-element 34">
                                    <input class="variant-0" id="swatch-0-34" type="radio" name="option1" value="34" data-vhandle="34" checked="">

                                        <label for="swatch-0-34">
                                            <span>34</span>
                                        </label></div><div data-value="36" class="n-sd swatch-element 36">
                                    <input class="variant-0" id="swatch-0-36" type="radio" name="option1" value="36" data-vhandle="36" checked="">

                                        <label for="swatch-0-36">
                                            <span>36</span>
                                        </label></div></div>


















                        <div id="variant-swatch-1" class="swatch clearfix " data-option="option2" data-option-index="1">

                            <div class="header hide">Màu sắc:</div>
                            <div class="header"><span>Đen</span></div>
                            <div class="select-swap">





























































                                <div data-value="Đen" class="n-sd swatch-element color den">
                                    <input class="variant-1" id="swatch-1-den" type="radio" name="option2" value="Đen" data-vhandle="den" checked="">


                                        <label class="den sd" for="swatch-1-den">
                                            <span>Đen</span>
                                        </label>

                                </div>

















                            </div>

                        </div>


                    </div>
                    <div class="selector-actions">
                        <div class="quantity-area clearfix">
                            <input type="button" value="-" onclick="minusQuantity()" class="qty-btn">
                                <input type="text" id="quantity" name="quantity" value="1" min="1" class="quantity-selector">
                                    <input type="button" value="+" onclick="plusQuantity()" class="qty-btn">
                                    </div>
                                    <div class="wrap-addcart clearfix">
                                        <div class="row-flex">

                                            <button type="button" id="add-to-cart" class="add-to-cartProduct button btn-addtocart addtocart-modal" name="add"><span>Thêm vào giỏ</span></button>


                                        </div>

                                    </div>

                                </div>

                                <div class="product-action-bottom visible-xs">
                                    <div class="input-bottom">
                                        <input id="quan-input" type="number" value="1" min="1">
                                    </div>
                                    <button type="button" id="add-to-cartbottom" class="add-to-cartProduct add-cart-bottom button dark addtocart-modal" name="add"><span>Thêm vào giỏ</span></button>
                                </div>
                            </form>
                            <div class="product-description">
                                <div class="title-bl">
                                    <h2>Mô tả</h2>
                                </div>
                                <div class="description-content">
                                    <div class="description-productdetail">
                                        <p>Quần Tây nam Kenta với form dáng vừa vặn, sang trọng đầy lịch lãm, điểm nhấn viền ở túi trước và túi sau. Thích hợp mặc đi làm, đi chơi, lót trong sắc nét, tạo cảm giác thoải mái khi di chuyển, làm việc. Với ưu vải co giãn nhẹ, lót trong sắc nét và tinh tế, với mức giá bán cực kì hợp lý. Hiếu được nhu cầu của khách hàng, mặt trong của sản phẩm, các bạn có thể&nbsp;chỉnh sửa lại cho phù hợp với mọi vóc dáng.&nbsp;</p><p></p><div class="youtube-embed-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0px;"><iframe class="iframe-youtube-embed" width="640" height="360" src="https://www.youtube.com/embed/bIJA0MXqq_0" style="aspect-ratio: 16 / 9; width: 100%; height: 100%; position: absolute;" frameborder="0"></iframe></div><p></p><p><strong>Bảng size Quần tây:</strong></p><p>Size 29: Lưng 78cm, Dài 96cm, Ống 16cm, Mông 94cm</p><p>Size 30: Lưng 81cm, Dài 97cm, Ống 16.5cm, Mông 97cm</p><p>Size 31: Lưng 84cm, Dài 98cm, Ống 17cm, Mông 100cm</p><p>Size 32: Lưng 87cm, Dài 99cm, Ống 17.5cm, Mông 103cm</p><p>Size 34: Lưng 89cm, Dài 100cm, Ống 18cm, Mông 108cm</p><p>Size 36: Lưng 92cm, Dài 102cm, Ống 19cm, Mông 112cm</p><p><strong>Hướng dẫn bảo quản:</strong></p><p>- Không dùng hóa chất tẩy.</p><p>- Ủi ở nhiệt độ thích hợp, hạn chế dùng máy sấy.</p><p>- Giặt ở chế độ bình thường, với đồ có màu tương tự.</p><p><iframe width="334" height="594" src="https://www.youtube.com/embed/YG2gHFfW_Pc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></p>
                                    </div>
                                    <a href="javascript:void(0);" id="detail_more"><span class="btn-effect">Xem thêm</span></a>
                                </div>
                            </div>
                        </div></div>
                    )
}
