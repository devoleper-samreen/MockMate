import AxiosInstance from "./index"

const baseUrl = import.meta.env.VITE_BACKEND_URL

export const authenticate = async () => {
    window.open(`${baseUrl}/auth/google`, "_self");
}

export const logout = async () => {
    return await AxiosInstance.get('/auth/logout')

}