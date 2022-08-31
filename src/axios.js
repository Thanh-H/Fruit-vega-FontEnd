
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,

});
instance.interceptors.response.use(
    (response) => {
        const { data } = response
        return response.data
    },

)
// instance.interceptors.request.use(config => {
//     config.headers.post['accessToken'] = 'Bearer';
//     return config;
// });
export default instance;
