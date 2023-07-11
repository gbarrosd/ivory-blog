import axios from "axios" 

export const publicAPI = axios.create({
    baseURL:"http://localhost:8000/api"
})

export const privateAPI = axios.create({
    baseURL:"http://localhost:8000/api"
})

privateAPI.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token')
    config.headers.token = `Bearer ${token}`
    return config
})
