import axios from '../axios'

const handleLoginService = (email, password) => {
    return axios.post('/api/auth-login', { email: email, password: password })
}

const handleRegisterService = (userName, email, password) => {
    return axios.post('/api/auth-register', { userName: userName, email: email, password: password })
}

const handleLogOutService = (id, accessToken) => {
    return axios.post(`/api/auth-logout/${id}`, { accessToken: `Bearer ${accessToken}` },
    )
}

const getAllUserService = (accessToken) => {
    return axios.get('/api/get-all-user', {
        headers: { accessToken: `Bearer ${accessToken}` },
    })
}
export {
    handleLoginService, handleRegisterService, handleLogOutService, getAllUserService
}