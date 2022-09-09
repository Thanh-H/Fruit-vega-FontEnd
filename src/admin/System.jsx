import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NavSystem } from './adminComponent/NavSystem';
import { ProductManage } from './adminComponent/productManage/ProductManage';
import { UserManage } from './adminComponent/userManage/UserManage';
import { useSelector } from 'react-redux'
import { OrderManage } from './adminComponent/orderManage/OrderManage';


export const System = () => {
    let id = useSelector((state) => state.auth.login.userInfor?._id)
    return (
        <>
            <NavSystem />
            <Routes>
                <Route path="/user-manage/:id" element={<UserManage />} />
                <Route path="/product-manage/:id" element={<ProductManage />} />
                <Route path="/order-manage/:id" element={<OrderManage />} />
            </Routes>
        </>
    )
}
