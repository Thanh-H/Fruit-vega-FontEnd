import axios from '../axios'

const handleLoginService = (email, password) => {
    return axios.post('/api/auth-login', { email: email, password: password })
}

const handleRegisterService = (userName, email, password) => {
    return axios.post('/api/auth-register', { userName: userName, email: email, password: password })
}

export {
    handleLoginService, handleRegisterService
}