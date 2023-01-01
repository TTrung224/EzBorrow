// do not mind this file
import axios from 'axios';
import Cookies from 'universal-cookie'

export const backendUrl = 'https://ezborrow-server.vercel.app'
// export const backendUrl = 'http://localhost:4500'
// export const backendUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:4500': 'https://ezborrow-server.vercel.app/'
export const axiosSetting = axios.create({
    baseURL: `${backendUrl}/`,
    headers: {"Donut": Cookies().get("token")},
    withCredentials: true
})
