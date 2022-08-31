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
export {
    handleLoginService, handleRegisterService, handleLogOutService, getAllUserService, deleteUserService,
    updateUserService
}