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

const createANewProduct = (data, accessToken) => {
    return axios.post('/api/create-new-product', { data, accessToken: `Bearer ${accessToken}` })
}

const getAllProductService = () => {
    return axios.get('/api/get-all-products')
}

const deleteProductService = (id, accessToken) => {
    return axios.delete('/api/delete-product/' + id, { data: { accessToken: `Bearer ${accessToken}` } })
}

const updateProductByIdService = (newData, accessToken) => {
    return axios.put('/api/update-product-by-id/', { data: newData, accessToken: `Bearer ${accessToken}` })
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

const confirmOrder = (id, accessToken) => {
    return axios.put('/api/confirm-order', { id: id, accessToken: `Bearer ${accessToken}` })

}
const cancelOrder = (id, accessToken) => {
    return axios.put('/api/cancel-order', { id: id, accessToken: `Bearer ${accessToken}` })

}

const deleteOrder = (id, accessToken) => {
    return axios.delete('/api/delete-order/' + id, { data: { accessToken: `Bearer ${accessToken}` } })

}




export {
    handleLoginService, handleRegisterService, handleLogOutService, getAllUserService, deleteUserService,
    updateUserService, createANewProduct, getAllProductService, deleteProductService, updateProductByIdService,
    getProductByIdService, createANewOrder, getAllOrdersService, confirmOrder, cancelOrder, deleteOrder
}