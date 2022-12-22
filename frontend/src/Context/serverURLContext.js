// do not mind this file
import axios from 'axios';
export const backendUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:4500': 'mysite.com'
export const axiosSetting = axios.create({
    baseURL: `${backendUrl}/`,
    withCredentials: true
})