import AxiosInstance from "./index"

const baseUrl = import.meta.env.VITE_BACKEND_URL

export const authenticate = async () => {
    window.open(`${baseUrl}/auth/google`, "_self");
}

export const signup = async (data) => {
    return await AxiosInstance.post('/auth/signup', data)
}

export const login = async (data) => {
    return await AxiosInstance.post('/auth/login', data)
}

export const logout = async () => {
    return await AxiosInstance.get('/auth/logout')
}

export const getMe = async () => {
    return await AxiosInstance.get("/auth/get-me")
}

export const updateProfile = async (data) => {
    return await AxiosInstance.put('/profile/update', data)
}

