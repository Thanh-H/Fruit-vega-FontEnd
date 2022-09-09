import axios from '../axios'

const handleLoginService = (email, password) => {
    return axios.post('/api/auth-login', { email: email, password: password })
}

const handleRegisterService = (userName, email, password, role) => {
    return axios.post('/api/auth-register', { userName: userName, email: email, password: password, role: role })
}

const handleLogOutService = (id, accessToken) => {
    return axios.post(`/api/auth-logout/${id}`, { accessToken: `Bearer ${accessToken}` },
    )
}

const getAllUserService = () => {
    return axios.get('/api/get-all-user',)
}

const deleteUserService = (id, accessToken) => {
    return axios.delete('/api/delete-user/' + id, { data: { accessToken: `Bearer ${accessToken}` } })
}

const updateUserService = (data) => {
    return axios.put('/api/update-userByAdmin/', data)
}

const createANewProduct = (data) => {
    return axios.post('/api/create-new-product', data)
}

const getAllProductService = () => {
    return axios.get('/api/get-all-products')
}

const deleteProductService = (id) => {
    return axios.delete('/api/delete-product/' + id)
}

const updateProductByIdService = (data) => {
    return axios.put('/api/update-product-by-id/', data)
}

const getProductByIdService = (id) => {
    return axios.get(`/api/get-product-by-id/${id}`)
}
const createANewOrder = (data) => {
    return axios.post('/api/create-new-order', data)
}

const getAllOrdersService = () => {
    return axios.get('/api/get-all-orders')
}

const confirmOrder = (id) => {
    return axios.put('/api/confirm-order', id)

}
const cancelOrder = (id) => {
    return axios.put('/api/cancel-order', id)

}

const deleteOrder = (id) => {
    return axios.delete('/api/delete-order/' + id)

}




export {
    handleLoginService, handleRegisterService, handleLogOutService, getAllUserService, deleteUserService,
    updateUserService, createANewProduct, getAllProductService, deleteProductService, updateProductByIdService,
    getProductByIdService, createANewOrder, getAllOrdersService, confirmOrder, cancelOrder, deleteOrder
}